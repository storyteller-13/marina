"""Tests for scripts/sync-blog-posts.py."""

from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
SCRIPT = REPO / "scripts" / "sync-blog-posts.py"


def _load_mod():
    spec = importlib.util.spec_from_file_location("sync_blog_posts", SCRIPT)
    assert spec is not None and spec.loader is not None
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def test_parse_front_matter_empty_and_crlf() -> None:
    mod = _load_mod()
    assert mod.parse_front_matter("no front matter") == {}
    assert mod.parse_front_matter("---\r\ntitle: Hi\r\n---\r\nbody") == {"title": "Hi"}


def test_parse_front_matter_skips_invalid_lines() -> None:
    mod = _load_mod()
    content = "---\n: skipped-empty-key\nno-colon-here\ntitle: Keep\n---\n"
    assert mod.parse_front_matter(content) == {"title": "Keep"}


def test_slug_to_title() -> None:
    mod = _load_mod()
    assert mod.slug_to_title("idea-nullstar") == "Idea Nullstar"


def test_main_syncs_posts_and_drafts(tmp_path: Path, monkeypatch, capsys) -> None:
    mod = _load_mod()
    posts_dir = tmp_path / "posts"
    drafts_dir = tmp_path / "drafts"
    posts_dir.mkdir()
    drafts_dir.mkdir()

    (posts_dir / "newer.md").write_text(
        "---\ntitle: New\ndate: 2024-02-01\nsubtitle: s\n---\nbody\n",
        encoding="utf-8",
    )
    (posts_dir / "older.md").write_text(
        "---\ntitle: Old\ndate: 2020-01-01\n---\n",
        encoding="utf-8",
    )
    (posts_dir / "no-meta.md").write_text("just text\n", encoding="utf-8")

    (drafts_dir / "wip.md").write_text(
        "---\ntitle: Draft\ndate: 2023-05-01\nstatus: notes\n---\n",
        encoding="utf-8",
    )
    (drafts_dir / "bare.md").write_text("no meta\n", encoding="utf-8")

    monkeypatch.setattr(mod, "POSTS_DIR", posts_dir)
    monkeypatch.setattr(mod, "DRAFTS_DIR", drafts_dir)
    monkeypatch.setattr(mod, "INDEX_FILE", tmp_path / "posts.json")
    monkeypatch.setattr(mod, "DRAFTS_INDEX_FILE", tmp_path / "drafts.json")

    mod.main()
    out = capsys.readouterr().out
    assert "Synced 3 posts" in out
    assert "Synced 2 drafts" in out

    posts = json.loads((tmp_path / "posts.json").read_text(encoding="utf-8"))
    assert [p["slug"] for p in posts] == ["newer", "older", "no-meta"]
    assert posts[0]["subtitle"] == "s"
    assert posts[2]["title"] == "No Meta"
    assert posts[2]["date"] == ""

    drafts = json.loads((tmp_path / "drafts.json").read_text(encoding="utf-8"))
    assert [d["slug"] for d in drafts] == ["wip", "bare"]
    assert drafts[0]["status"] == "notes"
    assert drafts[1]["title"] == "Bare"


def test_main_without_drafts_dir(tmp_path: Path, monkeypatch) -> None:
    mod = _load_mod()
    posts_dir = tmp_path / "posts"
    posts_dir.mkdir()
    (posts_dir / "only.md").write_text("---\ntitle: Only\n---\n", encoding="utf-8")

    monkeypatch.setattr(mod, "POSTS_DIR", posts_dir)
    monkeypatch.setattr(mod, "DRAFTS_DIR", tmp_path / "missing-drafts")
    monkeypatch.setattr(mod, "INDEX_FILE", tmp_path / "posts.json")
    monkeypatch.setattr(mod, "DRAFTS_INDEX_FILE", tmp_path / "drafts.json")

    mod.main()
    assert json.loads((tmp_path / "drafts.json").read_text(encoding="utf-8")) == []


def test_cli_entrypoint() -> None:
    result = subprocess.run(
        [sys.executable, str(SCRIPT)],
        cwd=REPO,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stdout + result.stderr
    assert "Synced" in result.stdout
    assert (REPO / "public" / "blog" / "posts.json").is_file()

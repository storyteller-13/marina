"""Tests for scripts/sync-blog-posts.py."""

from __future__ import annotations

import importlib.util
import json
import shutil
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
    monkeypatch.setattr(mod, "POST_PAGES_DIR", tmp_path)

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
    monkeypatch.setattr(mod, "POST_PAGES_DIR", tmp_path)

    mod.main()
    assert (tmp_path / "only.html").is_file()
    assert json.loads((tmp_path / "drafts.json").read_text(encoding="utf-8")) == []


def test_cli_entrypoint(tmp_path: Path) -> None:
    """Run the script as a CLI on a copy of the site, so the test never rewrites the repo."""
    (tmp_path / "scripts").mkdir()
    shutil.copy(SCRIPT, tmp_path / "scripts" / SCRIPT.name)
    shutil.copytree(REPO / "public" / "blog" / "posts", tmp_path / "public" / "blog" / "posts")
    (tmp_path / "public" / "pages").mkdir()
    shutil.copy(REPO / "public" / "pages" / "post.html", tmp_path / "public" / "pages" / "post.html")

    result = subprocess.run(
        [sys.executable, str(tmp_path / "scripts" / SCRIPT.name)],
        cwd=tmp_path,
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stdout + result.stderr
    assert "Synced" in result.stdout
    assert (tmp_path / "public" / "blog" / "posts.json").is_file()
    assert any((tmp_path / "public" / "blog").glob("*.html"))


def test_collect_entries_sorts_by_real_date(tmp_path: Path) -> None:
    mod = _load_mod()
    for slug, date in [("sept", "2026; 9; 30"), ("oct", "2026; 10; 1"), ("none", ""), ("bad", "someday")]:
        front = f"---\ndate: {date}\n---\n" if date else ""
        (tmp_path / f"{slug}.md").write_text(front, encoding="utf-8")
    # String sorting would put "2026; 9; 30" after "2026; 10; 1".
    assert [e["slug"] for e in mod.collect_entries(tmp_path)][:2] == ["oct", "sept"]
    assert {e["slug"] for e in mod.collect_entries(tmp_path)[2:]} == {"none", "bad"}


TEMPLATE = """<head>
\t<meta charset="utf-8">
\t<meta property="og:type" content="website">
\t<meta property="og:title" content="Site">
\t<meta property="og:url" content="https://x/pages/post.html">
\t<meta property="og:image" content="https://x/i.png">
\t<title>Site</title>
\t<link rel="canonical" href="https://x/pages/post.html">
</head>"""


def test_render_post_page_fills_metadata() -> None:
    mod = _load_mod()
    content = (
        '---\ntitle: A "quoted" <title>\nsubtitle: Sub & more\n---\n'
        "```\n![in code](/no.webp)\n```\n![first](/blog/assets/a.webp) ![second](/b.webp)\n"
    )
    page = mod.render_post_page(TEMPLATE, "my-post", content)
    assert "<title>A &quot;quoted&quot; &lt;title&gt; · Marina von Steinkirch</title>" in page
    assert '<meta property="og:type" content="article">' in page
    assert '<meta property="og:title" content="A &quot;quoted&quot; &lt;title&gt;">' in page
    assert '<meta property="og:url" content="https://marina.nullstar.fun/blog/my-post.html">' in page
    assert '<link rel="canonical" href="https://marina.nullstar.fun/blog/my-post.html">' in page
    assert '<meta property="og:image" content="https://marina.nullstar.fun/blog/assets/a.webp">' in page
    assert '<meta name="description" content="Sub &amp; more">' in page
    assert '<meta property="og:description" content="Sub &amp; more">' in page
    assert '<meta name="post-slug" content="my-post">' in page
    assert mod.GENERATED_MARK in page


def test_render_post_page_defaults() -> None:
    mod = _load_mod()
    page = mod.render_post_page(TEMPLATE, "plain-post", "![remote](https://cdn.test/x.png)")
    assert "<title>Plain Post · Marina von Steinkirch</title>" in page
    assert '<meta property="og:image" content="https://cdn.test/x.png">' in page
    assert 'name="description"' not in page

    bare = mod.render_post_page(TEMPLATE, "bare", "text only")
    assert '<meta property="og:image" content="https://marina.nullstar.fun/images/steinkirch.png">' in bare


def test_render_post_page_requires_template_tags() -> None:
    mod = _load_mod()
    try:
        mod.render_post_page("<head></head>", "x", "")
    except ValueError as error:
        assert "post template is missing" in str(error)
    else:  # pragma: no cover
        raise AssertionError("expected ValueError")


def test_write_post_pages_removes_only_stale_generated_pages(tmp_path: Path, capsys) -> None:
    mod = _load_mod()
    posts, pages = tmp_path / "posts", tmp_path / "pages"
    posts.mkdir()
    pages.mkdir()
    template = tmp_path / "post.html"
    template.write_text(TEMPLATE, encoding="utf-8")
    (posts / "keep.md").write_text("---\ntitle: Keep\n---\n", encoding="utf-8")
    (pages / "gone.html").write_text(f"<head>{mod.GENERATED_MARK}</head>", encoding="utf-8")
    (pages / "hand-written.html").write_text("<p>mine</p>", encoding="utf-8")

    assert mod.write_post_pages(posts, pages, template) == 1
    assert "Wrote 1 post pages" in capsys.readouterr().out
    assert sorted(p.name for p in pages.iterdir()) == ["hand-written.html", "keep.html"]

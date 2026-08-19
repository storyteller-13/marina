"""Tests for scripts/lint-html-br.js."""

import os
import subprocess
from pathlib import Path
from typing import Dict, Optional

REPO = Path(__file__).resolve().parents[1]
SCRIPT = REPO / "scripts" / "lint-html-br.js"


def _run(
    *, cwd: Path, env: Optional[Dict[str, str]] = None
):
    return subprocess.run(
        ["node", str(SCRIPT)],
        cwd=cwd,
        env=env if env is not None else os.environ,
        capture_output=True,
        text=True,
        check=False,
    )


def test_lint_html_br_passes_on_repo() -> None:
    """Public tree uses canonical <br> only."""
    result = _run(cwd=REPO)
    assert result.returncode == 0, result.stdout + result.stderr


def test_lint_html_br_detects_non_canonical(tmp_path: Path) -> None:
    """Non-canonical br forms fail until fixed."""
    (tmp_path / "x.html").write_text("<p>a<br/>b</p>\n", encoding="utf-8")
    env = {**os.environ, "MARINA_HTML_BR_LINT_ROOT": str(tmp_path)}

    result = _run(cwd=REPO, env=env)
    assert result.returncode == 1
    assert "non-canonical" in result.stdout

    fix = subprocess.run(
        ["node", str(SCRIPT), "--fix"],
        cwd=REPO,
        env=env,
        capture_output=True,
        text=True,
        check=False,
    )
    assert fix.returncode == 0
    assert (tmp_path / "x.html").read_text(encoding="utf-8") == "<p>a<br>b</p>\n"

    ok = _run(cwd=REPO, env=env)
    assert ok.returncode == 0

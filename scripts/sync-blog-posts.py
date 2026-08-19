#!/usr/bin/env python3
"""Sync blog metadata from markdown front matter into posts.json and drafts.json."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
POSTS_DIR = ROOT / "public" / "blog" / "posts"
INDEX_FILE = ROOT / "public" / "blog" / "posts.json"
DRAFTS_DIR = ROOT / "public" / "blog" / "drafts"
DRAFTS_INDEX_FILE = ROOT / "public" / "blog" / "drafts.json"


FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---\n", re.DOTALL)


def parse_front_matter(content: str) -> dict[str, str]:
    match = FRONT_MATTER_RE.match(content.replace("\r\n", "\n"))
    if not match:
        return {}

    out: dict[str, str] = {}
    for line in match.group(1).split("\n"):
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        key = key.strip()
        value = value.strip()
        if key:
            out[key] = value
    return out


def slug_to_title(slug: str) -> str:
    return slug.replace("-", " ").strip().title()


def main() -> None:
    posts = []
    for md_file in sorted(POSTS_DIR.glob("*.md")):
        slug = md_file.stem
        meta = parse_front_matter(md_file.read_text(encoding="utf-8"))
        posts.append(
            {
                "slug": slug,
                "title": meta.get("title", slug_to_title(slug)),
                "date": meta.get("date", ""),
                "subtitle": meta.get("subtitle", ""),
            }
        )

    # Newest first if date exists; otherwise keep stable at the end.
    posts.sort(key=lambda p: (p["date"] != "", p["date"]), reverse=True)

    INDEX_FILE.write_text(
        json.dumps(posts, indent=2, ensure_ascii=True) + "\n",
        encoding="utf-8",
    )
    print(f"Synced {len(posts)} posts -> {INDEX_FILE}")

    drafts = []
    if DRAFTS_DIR.is_dir():
        for md_file in sorted(DRAFTS_DIR.glob("*.md")):
            slug = md_file.stem
            meta = parse_front_matter(md_file.read_text(encoding="utf-8"))
            drafts.append(
                {
                    "slug": slug,
                    "title": meta.get("title", slug_to_title(slug)),
                    "date": meta.get("date", ""),
                    "subtitle": meta.get("subtitle", ""),
                    "status": meta.get("status", ""),
                }
            )

    drafts.sort(key=lambda d: (d["date"] != "", d["date"]), reverse=True)

    DRAFTS_INDEX_FILE.write_text(
        json.dumps(drafts, indent=2, ensure_ascii=True) + "\n",
        encoding="utf-8",
    )
    print(f"Synced {len(drafts)} drafts -> {DRAFTS_INDEX_FILE}")


if __name__ == "__main__":
    main()

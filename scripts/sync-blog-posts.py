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


def collect_entries(directory: Path, extra_keys: tuple[str, ...] = ()) -> list[dict[str, str]]:
    """Index entries for every markdown file in directory, newest first (undated last)."""
    entries = []
    if directory.is_dir():
        for md_file in sorted(directory.glob("*.md")):
            slug = md_file.stem
            meta = parse_front_matter(md_file.read_text(encoding="utf-8"))
            entry = {
                "slug": slug,
                "title": meta.get("title", slug_to_title(slug)),
                "date": meta.get("date", ""),
                "subtitle": meta.get("subtitle", ""),
            }
            entry.update({key: meta.get(key, "") for key in extra_keys})
            entries.append(entry)

    entries.sort(key=lambda e: (e["date"] != "", e["date"]), reverse=True)
    return entries


def write_index(index_file: Path, entries: list[dict[str, str]], label: str) -> None:
    index_file.write_text(json.dumps(entries, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")
    print(f"Synced {len(entries)} {label} -> {index_file}")


def main() -> None:
    write_index(INDEX_FILE, collect_entries(POSTS_DIR), "posts")
    write_index(DRAFTS_INDEX_FILE, collect_entries(DRAFTS_DIR, ("status",)), "drafts")


if __name__ == "__main__":  # pragma: no cover
    main()

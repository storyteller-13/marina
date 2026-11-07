#!/usr/bin/env python3
"""Sync blog metadata from markdown front matter.

Writes posts.json and drafts.json (the blog list reads only these), and one HTML page per post at
public/blog/<slug>.html: a copy of pages/post.html carrying that post's title, description,
canonical URL and preview image, so shared links and search engines see the right post.
"""

from __future__ import annotations

import html
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POSTS_DIR = ROOT / "public" / "blog" / "posts"
INDEX_FILE = ROOT / "public" / "blog" / "posts.json"
DRAFTS_DIR = ROOT / "public" / "blog" / "drafts"
DRAFTS_INDEX_FILE = ROOT / "public" / "blog" / "drafts.json"
POST_TEMPLATE = ROOT / "public" / "pages" / "post.html"
POST_PAGES_DIR = ROOT / "public" / "blog"

SITE_URL = "https://marina.nullstar.fun"
SITE_NAME = "Marina von Steinkirch"
DEFAULT_IMAGE = "/images/steinkirch.png"
# Marks generated pages, so stale ones (for deleted posts) can be removed safely.
GENERATED_MARK = '<meta name="generator" content="scripts/sync-blog-posts.py">'


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


DATE_RE = re.compile(r"^(\d{4})[;\-/]\s*(\d{1,2})[;\-/]\s*(\d{1,2})$")


def date_key(date: str) -> tuple[int, int, int] | None:
    """(year, month, day) for "YYYY; M; D" or "YYYY-MM-DD", so 2026; 9; 1 sorts before 2026; 10; 1."""
    match = DATE_RE.match(date.strip())
    return tuple(int(part) for part in match.groups()) if match else None


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

    # Newest first by real date; undated (or unparseable) last. The sort is stable, so ties keep file order.
    entries.sort(key=lambda e: (date_key(e["date"]) is not None, date_key(e["date"]) or (0, 0, 0)), reverse=True)
    return entries


def write_index(index_file: Path, entries: list[dict[str, str]], label: str) -> None:
    index_file.write_text(json.dumps(entries, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")
    print(f"Synced {len(entries)} {label} -> {index_file}")


def first_image(markdown: str) -> str:
    """Source of the first markdown image outside code fences, or ""."""
    in_code = False
    for line in markdown.split("\n"):
        if line.strip().startswith("```"):
            in_code = not in_code
        elif not in_code and (match := re.search(r"!\[[^\]]*\]\(([^)\s]+)", line)):
            return match.group(1)
    return ""


def absolute_url(url: str) -> str:
    return url if re.match(r"https?://", url) else f"{SITE_URL}/{url.lstrip('/')}"


def _replace_once(pattern: str, replacement: str, text: str) -> str:
    new, count = re.subn(pattern, lambda _m: replacement, text, count=1)
    if count != 1:
        raise ValueError(f"post template is missing {pattern!r}")
    return new


def render_post_page(template: str, slug: str, content: str) -> str:
    """The post template with this post's metadata filled in."""
    meta = parse_front_matter(content)
    title = meta.get("title") or slug_to_title(slug)
    description = meta.get("subtitle", "")
    url = f"{SITE_URL}/blog/{slug}.html"
    image = absolute_url(first_image(content) or DEFAULT_IMAGE)
    esc = html.escape  # quotes too, so values are safe inside attributes

    page = _replace_once(r"<title>[^<]*</title>", f"<title>{esc(title)} · {SITE_NAME}</title>", template)
    page = _replace_once(r'<meta property="og:type" content="[^"]*">', '<meta property="og:type" content="article">', page)
    page = _replace_once(r'<meta property="og:title" content="[^"]*">', f'<meta property="og:title" content="{esc(title)}">', page)
    page = _replace_once(r'<meta property="og:url" content="[^"]*">', f'<meta property="og:url" content="{esc(url)}">', page)
    page = _replace_once(r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{esc(image)}">', page)
    page = _replace_once(r'<link rel="canonical" href="[^"]*">', f'<link rel="canonical" href="{esc(url)}">', page)
    extra = [
        GENERATED_MARK,
        f'<meta name="post-slug" content="{esc(slug)}">',
        '<meta name="twitter:card" content="summary_large_image">',
    ]
    if description:
        extra += [
            f'<meta name="description" content="{esc(description)}">',
            f'<meta property="og:description" content="{esc(description)}">',
        ]
    head = '<meta charset="utf-8">' + "".join(f"\n\t{tag}" for tag in extra)
    return _replace_once(r'<meta charset="utf-8">', head, page)


def write_post_pages(posts_dir: Path, pages_dir: Path, template_file: Path) -> int:
    """Write <slug>.html for every post and delete generated pages whose post is gone."""
    template = template_file.read_text(encoding="utf-8")
    slugs = set()
    for md_file in sorted(posts_dir.glob("*.md")):
        slugs.add(md_file.stem)
        page = render_post_page(template, md_file.stem, md_file.read_text(encoding="utf-8"))
        (pages_dir / f"{md_file.stem}.html").write_text(page, encoding="utf-8")
    for stale in pages_dir.glob("*.html"):
        if stale.stem not in slugs and GENERATED_MARK in stale.read_text(encoding="utf-8"):
            stale.unlink()
    print(f"Wrote {len(slugs)} post pages -> {pages_dir}")
    return len(slugs)


def main() -> None:
    write_index(INDEX_FILE, collect_entries(POSTS_DIR), "posts")
    write_index(DRAFTS_INDEX_FILE, collect_entries(DRAFTS_DIR, ("status",)), "drafts")
    write_post_pages(POSTS_DIR, POST_PAGES_DIR, POST_TEMPLATE)


if __name__ == "__main__":  # pragma: no cover
    main()

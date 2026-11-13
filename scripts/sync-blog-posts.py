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
import subprocess
import xml.etree.ElementTree as ET
from datetime import UTC, date, datetime, time
from email.utils import format_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POSTS_DIR = ROOT / "public" / "blog" / "posts"
INDEX_FILE = ROOT / "public" / "blog" / "posts.json"
DRAFTS_DIR = ROOT / "public" / "blog" / "drafts"
DRAFTS_INDEX_FILE = ROOT / "public" / "blog" / "drafts.json"
FEED_FILE = ROOT / "public" / "index.xml"
POST_TEMPLATE = ROOT / "public" / "pages" / "post.html"
POST_PAGES_DIR = ROOT / "public" / "blog"
RENDERER = ROOT / "scripts" / "render-blog-posts.js"

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


def date_key(date_text: str) -> tuple[int, int, int] | None:
    """Return a validated (year, month, day), so 2026; 9; 1 sorts before 2026; 10; 1."""
    match = DATE_RE.match(date_text.strip())
    if not match:
        return None
    parts = tuple(int(part) for part in match.groups())
    try:
        date(*parts)
    except ValueError:
        return None
    return parts


def slug_to_title(slug: str) -> str:
    return slug.replace("-", " ").strip().title()


def collect_entries(directory: Path, extra_keys: tuple[str, ...] = ()) -> list[dict[str, str]]:
    """Index entries for every markdown file in directory, newest first (undated last)."""
    entries = []
    if directory.is_dir():
        for md_file in sorted(directory.glob("*.md")):
            slug = md_file.stem
            meta = parse_front_matter(md_file.read_text(encoding="utf-8"))
            if meta.get("date") and date_key(meta["date"]) is None:
                raise ValueError(
                    f"{md_file}: invalid date {meta['date']!r}; use YYYY; M; D, YYYY-MM-DD, or YYYY/MM/DD"
                )
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


def write_rss_feed(entries: list[dict[str, str]], feed_file: Path) -> None:
    """Write a small RSS 2.0 feed from the public post index."""
    ET.register_namespace("atom", "http://www.w3.org/2005/Atom")
    rss = ET.Element("rss", {"version": "2.0"})
    channel = ET.SubElement(rss, "channel")
    ET.SubElement(channel, "title").text = SITE_NAME + " — Technical Notes"
    ET.SubElement(channel, "link").text = SITE_URL
    ET.SubElement(channel, "description").text = "Technical notes by Marina von Steinkirch"
    ET.SubElement(channel, "language").text = "en-us"
    ET.SubElement(channel, "{http://www.w3.org/2005/Atom}link", {
        "href": f"{SITE_URL}/index.xml", "rel": "self", "type": "application/rss+xml",
    })

    for entry in entries:
        item = ET.SubElement(channel, "item")
        url = f"{SITE_URL}/blog/{entry['slug']}.html"
        ET.SubElement(item, "title").text = entry["title"]
        ET.SubElement(item, "link").text = url
        ET.SubElement(item, "guid", {"isPermaLink": "true"}).text = url
        key = date_key(entry["date"])
        if key:
            published = datetime.combine(date(*key), time.min, tzinfo=UTC)
            ET.SubElement(item, "pubDate").text = format_datetime(published, usegmt=True)
        if entry["subtitle"]:
            ET.SubElement(item, "description").text = entry["subtitle"]

    ET.indent(rss, space="  ")
    feed_file.write_bytes(b'<?xml version="1.0" encoding="utf-8"?>\n' + ET.tostring(rss, encoding="utf-8"))
    print(f"Wrote RSS feed -> {feed_file}")


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


def _replace_inner(pattern: str, inner: str, text: str) -> str:
    """Replace an element's inner HTML while preserving its opening and closing tags."""
    new, count = re.subn(pattern, lambda match: match.group(1) + inner + match.group(2), text, count=1)
    if count != 1:
        raise ValueError(f"post template is missing {pattern!r}")
    return new


def _replace_empty_element(pattern: str, inner: str, text: str) -> str:
    """Fill an empty template element without matching nested tags in the inserted content."""
    new, count = re.subn(pattern, lambda match: match.group(1) + inner + match.group(2), text, count=1)
    if count != 1:
        raise ValueError(f"post template is missing empty element {pattern!r}")
    return new


def render_post_page(template: str, slug: str, content: str, rendered_body: str = "") -> str:
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
    page = _replace_inner(r'(<h1 id="post-title"[^>]*>)[\s\S]*?(</h1>)', esc(title), page)
    date_markup = ""
    if meta.get("date"):
        key = date_key(meta["date"])
        iso = "-".join(f"{part:02d}" if index else str(part) for index, part in enumerate(key or ()))
        date_markup = f'<p id="post-date" class="blog-post-meta"><time datetime="{iso}">{esc(meta["date"])}</time></p>'
    page = _replace_once(r'<p id="post-date"[^>]*>[\s\S]*?</p>', date_markup, page)
    subtitle_markup = f'<p id="post-subtitle" class="blog-post-subtitle">{esc(description)}</p>' if description else '<p id="post-subtitle" class="blog-post-subtitle"></p>'
    page = _replace_once(r'<p id="post-subtitle"[^>]*>[\s\S]*?</p>', subtitle_markup, page)
    if not description:
        page = page.replace('class="markdown-body entry-content f5 blog-post-page"', 'class="markdown-body entry-content f5 blog-post-page blog-post-page--no-subtitle"', 1)
    page = _replace_once(
        r'<div id="post-content" class="blog-post-content markdown-body">',
        '<div id="post-content" class="blog-post-content markdown-body" data-rendered="true">',
        page,
    )
    page = _replace_empty_element(r'(<div id="post-content"[^>]*>)[\s\r\n\t]*(</div>)', rendered_body, page)
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
    markdown_files = sorted(posts_dir.glob("*.md"))
    result = subprocess.run(
        ["node", str(RENDERER), *(str(path) for path in markdown_files)],
        check=True, capture_output=True, text=True, cwd=ROOT,
    )
    rendered = json.loads(result.stdout)
    slugs = set()
    for md_file in markdown_files:
        slugs.add(md_file.stem)
        content = md_file.read_text(encoding="utf-8")
        page = render_post_page(template, md_file.stem, content, rendered[md_file.stem])
        (pages_dir / f"{md_file.stem}.html").write_text(page, encoding="utf-8")
    for stale in pages_dir.glob("*.html"):
        if stale.stem not in slugs and GENERATED_MARK in stale.read_text(encoding="utf-8"):
            stale.unlink()
    print(f"Wrote {len(slugs)} post pages -> {pages_dir}")
    return len(slugs)


def main() -> None:
    posts = collect_entries(POSTS_DIR)
    write_index(INDEX_FILE, posts, "posts")
    write_index(DRAFTS_INDEX_FILE, collect_entries(DRAFTS_DIR, ("status",)), "drafts")
    write_rss_feed(posts, FEED_FILE)
    write_post_pages(POSTS_DIR, POST_PAGES_DIR, POST_TEMPLATE)


if __name__ == "__main__":  # pragma: no cover
    main()

"use strict";

/* global assetUrl, escapeHtml, parseFrontMatter -- from blog-common.js, loaded first */

/** Emphasis inside a fragment that has already been escaped. */
function applyEmphasis(html) {
  return html
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

/**
 * Inline markdown -> HTML. Code spans, images and links are swapped for placeholders before
 * anything else runs, so their contents are never re-parsed: `a*b*` stays literal inside code,
 * and a `*` in a URL can't put <em> into an href.
 */
function parseInline(text) {
  // Slot tokens use a private-use character that is stripped from the input, so text can't forge one.
  const MARK = "\uE000";
  const slots = [];
  const slot = (html, raw = "") => `${MARK}${slots.push({ html, raw }) - 1}${MARK}`;
  const SLOT = new RegExp(`${MARK}(\\d+)${MARK}`, "g");
  const resolve = (html) => html.replace(SLOT, (_, n) => slots[Number(n)].html);
  const plain = (text) => text.replace(SLOT, (_, n) => slots[Number(n)].raw);

  let src = text.replaceAll(MARK, "");
  src = src.replace(/`([^`]+)`/g, (_, code) => slot(`<code>${escapeHtml(code)}</code>`, code));
  src = src.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, imgSrc) =>
    slot(`<img src="${escapeHtml(imgSrc.trim())}" alt="${escapeHtml(plain(alt))}" loading="lazy" decoding="async">`));
  src = src.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label, href) =>
    slot(`<a target="_blank" rel="noopener noreferrer" href="${escapeHtml(href)}">${resolve(applyEmphasis(escapeHtml(label)))}</a>`));
  src = src.replace(/<br\s*\/?>/gi, () => slot("<br>"));

  return resolve(applyEmphasis(escapeHtml(src)));
}

/** The last line of the "our rules" disclaimer; the post summary goes right after it. */
const DISCLAIMER_MARKER = "living notes that I change as I fancy";

/** Heading text without markdown/html syntax: links and images keep their label, tags and emphasis marks are dropped. */
function plainHeadingText(text) {
  return text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[*_`]/g, "")
    .trim();
}

/** URL-safe id for a heading; keeps letters and digits in any script (e.g. japanese). */
function slugify(text) {
  return plainHeadingText(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

/**
 * Links to the post's main sections: the highest heading level after the disclaimer
 * that has at least two headings (some posts use # for parts, others start at ##).
 * Each one lists the headings exactly one level below it as indented subitems.
 */
function renderSummary(headings) {
  const levels = [...new Set(headings.map((h) => h.level))].sort((a, b) => a - b);
  const level = levels.find((l) => headings.filter((h) => h.level === l).length >= 2);
  if (!level) return "";

  const link = (h) => `<a href="#${h.id}">${escapeHtml(plainHeadingText(h.text))}</a>`;
  const sections = [];
  for (const h of headings) {
    if (h.level === level) sections.push({ heading: h, subitems: [] });
    else if (h.level === level + 1 && sections.length) sections.at(-1).subitems.push(h);
  }
  const items = sections
    .map(({ heading, subitems }) => {
      const nested = subitems.map((h) => `<li>${link(h)}</li>`).join("");
      return `<li>${link(heading)}${nested && `<ul>${nested}</ul>`}</li>`;
    })
    .join("");
  const label = escapeHtml("Summary");
  return [
    "<br><br>",
    `<nav class="post-summary" aria-label="${label}"><p><strong>${label}</strong></p><ul>${items}</ul></nav>`,
    "<br><br>",
  ].join("\n");
}

/** A list item line: indentation, marker ("-", "*" or "1."), text. */
const LIST_ITEM = /^(\s*)([-*]|\d+\.)\s+(.*)$/;

/**
 * Consume consecutive list item lines starting at `start`. Deeper-indented items nest
 * inside the item above them; a top-level item of the other list type ends the block.
 * Returns the HTML lines and the index of the first line after the block.
 */
function parseListBlock(lines, start) {
  const items = [];
  let i = start;
  while (i < lines.length) {
    const m = lines[i].match(LIST_ITEM);
    if (!m) break;
    const item = { indent: m[1].replace(/\t/g, "    ").length, ordered: /\d/.test(m[2]), text: m[3].trim() };
    if (items.length && item.indent <= items[0].indent && item.ordered !== items[0].ordered) break;
    items.push(item);
    i += 1;
  }

  // Render items[from, to) that sit at items[from]'s depth; anything deeper nests under the item above it.
  function render(from, to) {
    const parts = [];
    let k = from;
    while (k < to) {
      const item = items[k];
      let end = k + 1;
      while (end < to && items[end].indent > item.indent) end += 1;
      const nested = end > k + 1 ? render(k + 1, end).join("") : "";
      parts.push(`<li>${parseInline(item.text)}${nested}</li>`);
      k = end;
    }
    const tag = items[from].ordered ? "ol" : "ul";
    return [`<${tag}>`, ...parts, `</${tag}>`];
  }

  return { html: render(0, items.length), next: i };
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  let inCode = false;
  const headings = [];
  const usedIds = new Map();
  let summaryAt = -1;

  function uniqueId(text) {
    const base = slugify(text);
    const count = usedIds.get(base) || 0;
    usedIds.set(base, count + 1);
    return count ? `${base}-${count + 1}` : base;
  }

  function splitTableRow(row) {
    const trimmedRow = row.trim();
    if (!trimmedRow.startsWith("|") || !trimmedRow.endsWith("|")) {
      return null;
    }
    return trimmedRow
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim());
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (!inCode) {
        const codeLang = trimmed.slice(3).trim();
        const cls = codeLang ? ` class="language-${escapeHtml(codeLang)}"` : "";
        out.push(`<pre><code${cls}>`);
        inCode = true;
      } else {
        out.push("</code></pre>");
        inCode = false;
      }
      i += 1;
      continue;
    }

    if (inCode) {
      out.push(escapeHtml(line));
      i += 1;
      continue;
    }

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      const level = trimmed.match(/^#+/)[0].length;
      const text = trimmed.replace(/^#{1,6}\s+/, "");
      const id = uniqueId(text);
      if (summaryAt !== -1) headings.push({ level, id, text });
      out.push(`<h${level} id="${escapeHtml(id)}">${parseInline(text)}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^>\s+/.test(trimmed)) {
      const quote = trimmed.replace(/^>\s+/, "");
      out.push(`<blockquote><p>${parseInline(quote)}</p></blockquote>`);
      i += 1;
      continue;
    }

    if (LIST_ITEM.test(line)) {
      const block = parseListBlock(lines, i);
      out.push(...block.html);
      i = block.next;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      out.push("<hr>");
      i += 1;
      continue;
    }

    const standaloneImage = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (standaloneImage) {
      const alt = standaloneImage[1];
      const src = standaloneImage[2].trim();
      out.push(`<p><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"></p>`);
      i += 1;
      continue;
    }

    const headerCells = splitTableRow(trimmed);
    const separatorLine = i + 1 < lines.length ? lines[i + 1].trim() : "";
    const separatorCells = splitTableRow(separatorLine);
    const isTableSeparator = separatorCells && separatorCells.length === headerCells?.length
      && separatorCells.every((cell) => /^:?-{3,}:?$/.test(cell));

    if (headerCells && isTableSeparator) {
      out.push("<table>");
      out.push("<thead><tr>");
      for (const cell of headerCells) out.push(`<th>${parseInline(cell)}</th>`);
      out.push("</tr></thead>");

      i += 2; // skip header + separator
      const bodyRows = [];
      while (i < lines.length) {
        const rowCells = splitTableRow(lines[i].trim());
        if (!rowCells || rowCells.length !== headerCells.length) break;
        bodyRows.push(rowCells);
        i += 1;
      }

      if (bodyRows.length) {
        out.push("<tbody>");
        for (const row of bodyRows) {
          out.push("<tr>");
          for (const cell of row) out.push(`<td>${parseInline(cell)}</td>`);
          out.push("</tr>");
        }
        out.push("</tbody>");
      }
      out.push("</table>");
      continue;
    }

    const paragraphLines = [trimmed];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6}\s+|>\s+|(-|\*)\s+|\d+\.\s+|```|---+$)/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i].trim());
      i += 1;
    }
    // Preserve author line breaks inside paragraphs in rendered posts.
    out.push(`<p>${parseInline(paragraphLines.join("\n")).replace(/\n/g, "<br>")}</p>`);
    if (summaryAt === -1 && paragraphLines.some((l) => l.includes(DISCLAIMER_MARKER))) {
      summaryAt = out.length;
    }
  }

  if (inCode) out.push("</code></pre>");
  if (summaryAt !== -1) {
    const summary = renderSummary(headings);
    if (summary) out.splice(summaryAt, 0, summary);
  }
  return out.join("\n");
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function enhanceCodeBlocks(root) {
  if (!root) {
    return;
  }
  root.querySelectorAll("pre").forEach((pre) => {
    if (pre.closest(".blog-code-wrap")) {
      return;
    }
    const code = pre.querySelector("code");
    if (!code) {
      return;
    }

    // The markdown renderer leaves a newline on each side of the code; it would show as a blank line.
    code.textContent = code.textContent.replace(/^\n|\n$/g, "");

    const wrap = document.createElement("div");
    wrap.className = "blog-code-wrap";
    const toolbar = document.createElement("div");
    toolbar.className = "blog-code-toolbar";

    const langMatch = code.className.match(/language-(\S+)/);
    let lang = langMatch ? langMatch[1] : "";

    // Colour the code (code-highlight.js): by its fence tag, or by detecting Python / TypeScript / ... when
    // untagged. Emoji tags (notes, math) and unknown tags stay plain. The detected language becomes the label.
    const highlighter = globalThis.MarinaHighlight;
    if (highlighter) {
      const kind = lang ? highlighter.normalizeLanguage(lang) : highlighter.detectLanguage(code.textContent);
      if (kind) {
        code.innerHTML = highlighter.highlightCode(code.textContent, kind);
        code.classList.add("blog-code-highlighted");
        lang = lang || kind;
      }
    }

    if (lang) {
      const label = document.createElement("span");
      label.className = "blog-code-lang";
      label.textContent = lang;
      toolbar.append(label);
    }

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "blog-code-copy";
    btn.setAttribute("aria-label", "Copy code to clipboard");
    btn.textContent = "Copy";

    btn.addEventListener("click", async () => {
      const ok = await copyToClipboard(code.textContent);
      btn.textContent = ok ? "Copied!" : "Copy failed";
      setTimeout(() => {
        btn.textContent = "Copy";
      }, 2200);
    });

    toolbar.append(btn);
    pre.parentNode.insertBefore(wrap, pre);
    wrap.append(toolbar, pre);
  });
}

/** Posts render after page load, so a shared #section link has to be scrolled to by hand. */
function scrollToHashTarget() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (target) target.scrollIntoView();
}

/** "2026; 11; 6" or "2026-11-06" -> "2026-11-06" (for <time datetime>), or "" if unparseable. */
function isoDate(date) {
  const m = date.trim().match(/^(\d{4})[;\-/]\s*(\d{1,2})[;\-/]\s*(\d{1,2})$/);
  return m ? `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}` : "";
}

/** Show the post's date under its title, written as in the front matter; hide the line when there is none. */
function renderPostDate(dateRoot, date) {
  if (!dateRoot) return;
  const time = dateRoot.querySelector("time");
  const text = (date || "").trim();
  time.textContent = text;
  const iso = isoDate(text);
  if (iso) time.setAttribute("datetime", iso);
  else time.removeAttribute("datetime");
  dateRoot.hidden = !text;
}

async function loadPost() {
  // Generated per-post pages (blog/<slug>.html) name their post in a meta tag; pages/post.html takes ?post=.
  const slug = document.querySelector('meta[name="post-slug"]')?.content
    || new URLSearchParams(window.location.search).get("post");
  const titleRoot = document.getElementById("post-title");
  const subtitleRoot = document.getElementById("post-subtitle");
  const contentRoot = document.getElementById("post-content");
  const articleRoot = titleRoot?.closest(".blog-post-page");

  if (!slug || !titleRoot || !subtitleRoot || !contentRoot) {
    if (contentRoot) contentRoot.innerHTML = `<p>${"Missing post slug."}</p>`;
    return;
  }

  const mdPath = assetUrl(`blog/posts/${encodeURIComponent(slug)}.md`);

  try {
    // "no-cache": revalidate (ETag) on each visit rather than re-download the post.
    const postResponse = await fetch(mdPath, { cache: "no-cache" });
    if (!postResponse.ok) {
      throw new Error("Could not load post content.");
    }
    const markdown = await postResponse.text();
    const { meta, body } = parseFrontMatter(markdown);

    titleRoot.textContent = meta.title || slug.replace(/-/g, " ");
    document.title = `${titleRoot.textContent} · Marina von Steinkirch`;
    renderPostDate(document.getElementById("post-date"), meta.date);
    subtitleRoot.textContent = meta.subtitle || "";
    subtitleRoot.style.display = meta.subtitle ? "block" : "none";
    if (articleRoot) {
      articleRoot.classList.toggle("blog-post-page--no-subtitle", !meta.subtitle);
    }
    contentRoot.innerHTML = markdownToHtml(body);
    enhanceCodeBlocks(contentRoot);
    scrollToHashTarget();
  } catch (error) {
    contentRoot.innerHTML = `<p class="blog-error">${escapeHtml(error.message)}</p>`;
  }
}

window.addEventListener("DOMContentLoaded", loadPost);

globalThis.MarinaBlogPost = {
  assetUrl,
  escapeHtml,
  parseInline,
  parseFrontMatter,
  markdownToHtml,
  plainHeadingText,
  slugify,
  renderSummary,
  scrollToHashTarget,
  copyToClipboard,
  enhanceCodeBlocks,
  isoDate,
  renderPostDate,
  loadPost,
};

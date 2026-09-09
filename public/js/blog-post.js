"use strict";

/** Resolve /blog/... against site root (parent of /pages/) so fetches work under subpaths. */
function assetUrl(pathFromSiteRoot) {
  const clean = pathFromSiteRoot.replace(/^\//, "");
  return new URL(clean, new URL("../", window.location.href)).href;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Placeholder so literal `<br>` in markdown survives escapeHtml and becomes a line break. */
const INLINE_BR_TOKEN = "@@MARINA_INLINE_BR@@";

function parseInline(text) {
  const imagePlaceholders = [];
  const withImageSlots = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    const id = imagePlaceholders.length;
    imagePlaceholders.push({ alt, src: src.trim() });
    return `@@MARINA_IMG_${id}@@`;
  });

  const withBrSlots = withImageSlots.replace(/<br\s*\/?>/gi, INLINE_BR_TOKEN);

  let html = escapeHtml(withBrSlots);
  imagePlaceholders.forEach((img, i) => {
    const safeSrc = escapeHtml(img.src);
    const safeAlt = escapeHtml(img.alt);
    html = html.split(`@@MARINA_IMG_${i}@@`).join(`<img src="${safeSrc}" alt="${safeAlt}">`);
  });

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a target="_blank" rel="noopener noreferrer" href="$2">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.split(INLINE_BR_TOKEN).join("<br>");
  return html;
}

function parseFrontMatter(markdown) {
  const normalized = markdown.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return { meta: {}, body: markdown };
  }

  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    return { meta: {}, body: markdown };
  }

  const rawMeta = normalized.slice(4, end).split("\n");
  const meta = {};
  rawMeta.forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) meta[key] = value;
  });

  const body = normalized.slice(end + 5);
  return { meta, body };
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  let inCode = false;
  let codeLang = "";

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
        codeLang = trimmed.slice(3).trim();
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
      out.push(`<h${level}>${parseInline(text)}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^>\s+/.test(trimmed)) {
      const quote = trimmed.replace(/^>\s+/, "");
      out.push(`<blockquote><p>${parseInline(quote)}</p></blockquote>`);
      i += 1;
      continue;
    }

    if (/^(-|\*)\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^(-|\*)\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^(-|\*)\s+/, ""));
        i += 1;
      }
      out.push("<ul>");
      for (const item of items) out.push(`<li>${parseInline(item)}</li>`);
      out.push("</ul>");
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i += 1;
      }
      out.push("<ol>");
      for (const item of items) out.push(`<li>${parseInline(item)}</li>`);
      out.push("</ol>");
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
      out.push(`<p><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"></p>`);
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
  }

  if (inCode) out.push("</code></pre>");
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

    const wrap = document.createElement("div");
    wrap.className = "blog-code-wrap";
    const toolbar = document.createElement("div");
    toolbar.className = "blog-code-toolbar";

    const langMatch = code.className.match(/language-(\S+)/);
    const lang = langMatch ? langMatch[1] : "";
    const label = document.createElement("span");
    label.className = "blog-code-lang";
    label.textContent = lang || "code";

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

    toolbar.append(label, btn);
    pre.parentNode.insertBefore(wrap, pre);
    wrap.append(toolbar, pre);
  });
}

async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("post");
  const titleRoot = document.getElementById("post-title");
  const subtitleRoot = document.getElementById("post-subtitle");
  const contentRoot = document.getElementById("post-content");
  const articleRoot = titleRoot?.closest(".blog-post-page");

  if (!slug || !titleRoot || !subtitleRoot || !contentRoot) {
    if (contentRoot) contentRoot.innerHTML = "<p>Missing post slug.</p>";
    return;
  }

  const mdPath = assetUrl(`blog/posts/${encodeURIComponent(slug)}.md`);

  try {
    const postResponse = await fetch(mdPath, { cache: "no-store" });
    if (!postResponse.ok) {
      throw new Error("Could not load post content.");
    }
    const markdown = await postResponse.text();
    const { meta, body } = parseFrontMatter(markdown);

    titleRoot.textContent = meta.title || slug.replace(/-/g, " ");
    subtitleRoot.textContent = meta.subtitle || "";
    subtitleRoot.style.display = meta.subtitle ? "block" : "none";
    if (articleRoot) {
      articleRoot.classList.toggle("blog-post-page--no-subtitle", !meta.subtitle);
    }
    contentRoot.innerHTML = markdownToHtml(body);
    enhanceCodeBlocks(contentRoot);
  } catch (error) {
    contentRoot.innerHTML = `<p class="blog-error">${escapeHtml(error.message)}</p>`;
  }
}

window.addEventListener("DOMContentLoaded", loadPost);

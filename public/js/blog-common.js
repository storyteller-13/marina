"use strict";

/**
 * Helpers shared by the blog list (blog.js) and post page (blog-post.js).
 * Load this script before either of them.
 */

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

function tx(key, fallback) {
  if (window.MarinaI18n && typeof window.MarinaI18n.t === "function") {
    return window.MarinaI18n.t(key);
  }
  return fallback;
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

  const meta = {};
  normalized.slice(4, end).split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    if (key) meta[key] = line.slice(idx + 1).trim();
  });

  return { meta, body: normalized.slice(end + 5) };
}

// Page-wide, like top-level functions in a classic script (also when loaded as a module in tests).
Object.assign(globalThis, { assetUrl, escapeHtml, tx, parseFrontMatter });

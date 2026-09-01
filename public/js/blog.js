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

  return { meta, body: normalized.slice(end + 5) };
}

async function loadBlog() {
  const listRoot = document.getElementById("blog-post-list");

  if (!listRoot) {
    return;
  }

  try {
    const response = await fetch(assetUrl("blog/posts.json"), { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Could not load Technical Notes index.");
    }

    const posts = await response.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      listRoot.innerHTML = '<p class="color-fg-muted">No posts yet.</p>';
      return;
    }

    const rendered = await Promise.all(posts.map(async (post) => {
      const slug = post.slug || "";
      const safeSlug = encodeURIComponent(slug);
      let title = post.title || slug.replace(/-/g, " ");
      let date = post.date || "";

      try {
        const postResponse = await fetch(assetUrl(`blog/posts/${safeSlug}.md`), { cache: "no-store" });
        if (postResponse.ok) {
          const markdown = await postResponse.text();
          const { meta } = parseFrontMatter(markdown);
          title = meta.title || title;
          date = meta.date || date;
        }
      } catch {
        // keep fallback title/date from posts index
      }

      return { safeSlug, title, date };
    }));

    rendered.sort((a, b) => {
      const aTime = Date.parse(a.date || "");
      const bTime = Date.parse(b.date || "");
      if (!Number.isNaN(aTime) && !Number.isNaN(bTime) && aTime !== bTime) {
        return bTime - aTime;
      }

      const aSlugNum = Number(a.safeSlug);
      const bSlugNum = Number(b.safeSlug);
      if (!Number.isNaN(aSlugNum) && !Number.isNaN(bSlugNum) && aSlugNum !== bSlugNum) {
        return bSlugNum - aSlugNum;
      }

      return b.safeSlug.localeCompare(a.safeSlug);
    });

    rendered.forEach((post) => {
      const line = document.createElement("p");
      line.className = "blog-line";
      const safeDate = escapeHtml(post.date || "");
      const safeTitle = escapeHtml(post.title || "");
      line.innerHTML = `<a class="blog-line-link" href="post.html?post=${post.safeSlug}"><span class="blog-line-date">${safeDate}</span>; ${safeTitle}</a>`;
      listRoot.appendChild(line);
    });
  } catch (error) {
    listRoot.innerHTML = `<p class="blog-error">${escapeHtml(error.message)}</p>`;
  }
}

async function loadDrafts() {
  const draftRoot = document.getElementById("blog-draft-list");

  if (!draftRoot) {
    return;
  }

  try {
    const response = await fetch(assetUrl("blog/drafts.json"), { cache: "no-store" });
    if (!response.ok) {
      draftRoot.innerHTML = '<p class="blog-draft-empty">Could not load drafts list.</p>';
      return;
    }

    const indexEntries = await response.json();
    if (!Array.isArray(indexEntries) || indexEntries.length === 0) {
      draftRoot.innerHTML = '<p class="blog-draft-empty">Nothing listed here yet.</p>';
      return;
    }

    const rendered = await Promise.all(indexEntries.map(async (entry) => {
      if (typeof entry === "string") {
        const title = entry.trim();
        return title ? { statusLabel: "wip", title, date: "", slug: "" } : null;
      }

      const slug = entry.slug || "";
      const safeSlug = encodeURIComponent(slug);
      let title = entry.title || slug.replace(/-/g, " ");
      let date = entry.date || "";
      let status = entry.status || "";

      if (slug) {
        try {
          const draftResponse = await fetch(assetUrl(`blog/drafts/${safeSlug}.md`), { cache: "no-store" });
          if (draftResponse.ok) {
            const markdown = await draftResponse.text();
            const { meta } = parseFrontMatter(markdown);
            title = meta.title || title;
            date = meta.date || date;
            status = meta.status || status;
          }
        } catch {
          // keep fallback fields from drafts index
        }
      }

      const statusLabel = status || date || "wip";
      return { statusLabel, title, date, slug };
    }));

    const rows = rendered.filter((row) => row && (row.title || "").trim());
    rows.sort((a, b) => {
      const aTime = Date.parse(a.date || "");
      const bTime = Date.parse(b.date || "");
      if (!Number.isNaN(aTime) && !Number.isNaN(bTime) && aTime !== bTime) {
        return bTime - aTime;
      }

      return (b.slug || "").localeCompare(a.slug || "");
    });
    if (rows.length === 0) {
      draftRoot.innerHTML = '<p class="blog-draft-empty">Nothing listed here yet.</p>';
      return;
    }

    draftRoot.replaceChildren();
    rows.forEach((row) => {
      const line = document.createElement("p");
      line.className = "blog-line blog-draft-line";
      const safeStatus = escapeHtml(row.statusLabel || "wip");
      const safeTitle = escapeHtml(row.title || "");
      line.innerHTML = `<span class="blog-draft-row"><span class="blog-line-date">${safeStatus}</span>; <span class="blog-draft-title">${safeTitle}</span></span>`;
      draftRoot.appendChild(line);
    });
  } catch (error) {
    draftRoot.innerHTML = `<p class="blog-error">${escapeHtml(error.message)}</p>`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadBlog();
  loadDrafts();
});

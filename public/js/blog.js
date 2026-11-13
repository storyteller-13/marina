"use strict";

/* global assetUrl, escapeHtml -- from blog-common.js, loaded first */

const EMPTY_DRAFTS_HTML = '<p class="blog-draft-empty">Nothing listed here yet.</p>';

/**
 * Fetch one of the JSON indexes that `make blog` builds from the posts' front matter.
 * "no-cache" revalidates with the server (ETag) on every visit instead of re-downloading.
 */
async function fetchIndex(path) {
  const response = await fetch(assetUrl(path), { cache: "no-cache" });
  if (!response.ok) return null;
  const entries = await response.json();
  if (!Array.isArray(entries)) {
    throw new Error("Index response must be an array.");
  }
  return entries;
}

async function loadBlog() {
  const listRoot = document.getElementById("blog-post-list");

  if (!listRoot) {
    return;
  }

  try {
    const posts = await fetchIndex("blog/posts.json");
    if (!posts) {
      throw new Error("Could not load Technical Notes index.");
    }
    if (posts.length === 0) {
      listRoot.innerHTML = '<p class="color-fg-muted">No posts yet.</p>';
      return;
    }

    const rendered = posts.map((post) => {
      if (!post || typeof post !== "object" || Array.isArray(post)
        || typeof post.slug !== "string" || !post.slug
        || !/^[A-Za-z0-9_-]+$/.test(post.slug)
        || (post.title !== undefined && typeof post.title !== "string")
        || (post.date !== undefined && typeof post.date !== "string")) {
        throw new Error("Technical Notes index contains an invalid entry.");
      }
      const slug = post.slug;
      return {
        safeSlug: encodeURIComponent(slug),
        title: post.title || slug.replace(/-/g, " "),
        date: post.date || "",
      };
    });

    rendered.forEach((post) => {
      const line = document.createElement("p");
      line.className = "blog-line";
      const safeDate = escapeHtml(post.date);
      const safeTitle = escapeHtml(post.title);
      line.innerHTML = `<a class="blog-line-link" href="/blog/${post.safeSlug}.html"><span class="blog-line-date">${safeDate}</span>; ${safeTitle}</a>`;
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
    const indexEntries = await fetchIndex("blog/drafts.json");
    if (!indexEntries) {
      draftRoot.innerHTML = '<p class="blog-draft-empty">Could not load drafts list.</p>';
      return;
    }

    const rows = indexEntries
      .map((entry) => {
        if (typeof entry === "string") {
          return { statusLabel: "wip", title: entry.trim(), date: "", slug: "" };
        }
        if (!entry || typeof entry !== "object" || Array.isArray(entry)
          || ["slug", "title", "date", "status"].some((key) => entry[key] !== undefined && typeof entry[key] !== "string")) {
          throw new Error("Drafts index contains an invalid entry.");
        }
        const slug = entry.slug || "";
        const date = entry.date || "";
        return {
          statusLabel: entry.status || date || "wip",
          title: entry.title || slug.replace(/-/g, " "),
          date,
          slug,
        };
      })
      .filter((row) => row.title.trim());
    if (rows.length === 0) {
      draftRoot.innerHTML = EMPTY_DRAFTS_HTML;
      return;
    }

    draftRoot.replaceChildren();
    rows.forEach((row) => {
      const line = document.createElement("p");
      line.className = "blog-line blog-draft-line";
      const safeStatus = escapeHtml(row.statusLabel);
      const safeTitle = escapeHtml(row.title);
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

globalThis.MarinaBlog = {
  assetUrl,
  escapeHtml,
  loadBlog,
  loadDrafts,
};

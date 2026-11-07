"use strict";

/* global assetUrl, escapeHtml -- from blog-common.js, loaded first */

/** Parse post dates, including site format "YYYY; MM; DD". */
function parsePostDate(dateStr) {
  if (!dateStr) return NaN;
  const raw = String(dateStr).trim();

  const semicolon = raw.match(/^(\d{4});\s*(\d{1,2});\s*(\d{1,2})$/);
  if (semicolon) {
    const [, y, m, d] = semicolon;
    return Date.UTC(Number(y), Number(m) - 1, Number(d));
  }

  const time = Date.parse(raw);
  return Number.isNaN(time) ? NaN : time;
}

function compareByDateThenSlug(a, b, aSlug, bSlug) {
  const aTime = parsePostDate(a);
  const bTime = parsePostDate(b);
  const aHasDate = !Number.isNaN(aTime);
  const bHasDate = !Number.isNaN(bTime);

  if (aHasDate && bHasDate && aTime !== bTime) {
    return bTime - aTime;
  }
  if (aHasDate !== bHasDate) {
    return aHasDate ? -1 : 1;
  }

  const aSlugNum = Number(aSlug);
  const bSlugNum = Number(bSlug);
  if (!Number.isNaN(aSlugNum) && !Number.isNaN(bSlugNum) && aSlugNum !== bSlugNum) {
    return bSlugNum - aSlugNum;
  }

  return String(bSlug || "").localeCompare(String(aSlug || ""));
}

const EMPTY_DRAFTS_HTML = '<p class="blog-draft-empty">Nothing listed here yet.</p>';

/**
 * Fetch one of the JSON indexes that `make blog` builds from the posts' front matter.
 * "no-cache" revalidates with the server (ETag) on every visit instead of re-downloading.
 */
async function fetchIndex(path) {
  const response = await fetch(assetUrl(path), { cache: "no-cache" });
  if (!response.ok) return null;
  const entries = await response.json();
  return Array.isArray(entries) ? entries : [];
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
      const slug = post.slug || "";
      return {
        safeSlug: encodeURIComponent(slug),
        title: post.title || slug.replace(/-/g, " "),
        date: post.date || "",
      };
    });

    rendered.sort((a, b) => compareByDateThenSlug(a.date, b.date, a.safeSlug, b.safeSlug));

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
    rows.sort((a, b) => compareByDateThenSlug(a.date, b.date, a.slug, b.slug));
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
  parsePostDate,
  compareByDateThenSlug,
  loadBlog,
  loadDrafts,
};

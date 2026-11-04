"use strict";

/* global assetUrl, escapeHtml, tx, parseFrontMatter -- from blog-common.js, loaded first */

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

/** Front matter of a markdown file, or {} when it can't be loaded (the index entry is the fallback). */
async function fetchMeta(path) {
  try {
    const response = await fetch(assetUrl(path), { cache: "no-store" });
    return response.ok ? parseFrontMatter(await response.text()).meta : {};
  } catch {
    return {};
  }
}

function emptyDraftsHtml() {
  return `<p class="blog-draft-empty" data-i18n="blog.draftsEmpty">${escapeHtml(tx("blog.draftsEmpty", "Nothing listed here yet."))}</p>`;
}

async function loadBlog() {
  const listRoot = document.getElementById("blog-post-list");

  if (!listRoot) {
    return;
  }

  try {
    const response = await fetch(assetUrl("blog/posts.json"), { cache: "no-store" });
    if (!response.ok) {
      throw new Error(tx("blog.indexError", "Could not load Technical Notes index."));
    }

    const posts = await response.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      listRoot.innerHTML = `<p class="color-fg-muted" data-i18n="blog.empty">${escapeHtml(tx("blog.empty", "No posts yet."))}</p>`;
      return;
    }

    const rendered = await Promise.all(posts.map(async (post) => {
      const slug = post.slug || "";
      const safeSlug = encodeURIComponent(slug);
      const meta = await fetchMeta(`blog/posts/${safeSlug}.md`);
      return {
        safeSlug,
        title: meta.title || post.title || slug.replace(/-/g, " "),
        date: meta.date || post.date || "",
      };
    }));

    rendered.sort((a, b) => compareByDateThenSlug(a.date, b.date, a.safeSlug, b.safeSlug));

    rendered.forEach((post) => {
      const line = document.createElement("p");
      line.className = "blog-line";
      const safeDate = escapeHtml(post.date);
      const safeTitle = escapeHtml(post.title);
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
      draftRoot.innerHTML = `<p class="blog-draft-empty" data-i18n="blog.draftsError">${escapeHtml(tx("blog.draftsError", "Could not load drafts list."))}</p>`;
      return;
    }

    const indexEntries = await response.json();
    if (!Array.isArray(indexEntries) || indexEntries.length === 0) {
      draftRoot.innerHTML = emptyDraftsHtml();
      return;
    }

    const rendered = await Promise.all(indexEntries.map(async (entry) => {
      if (typeof entry === "string") {
        const title = entry.trim();
        return title ? { statusLabel: "wip", title, date: "", slug: "" } : null;
      }

      const slug = entry.slug || "";
      const meta = slug ? await fetchMeta(`blog/drafts/${encodeURIComponent(slug)}.md`) : {};
      const title = meta.title || entry.title || slug.replace(/-/g, " ");
      const date = meta.date || entry.date || "";
      const statusLabel = meta.status || entry.status || date || "wip";
      return { statusLabel, title, date, slug };
    }));

    const rows = rendered.filter((row) => row && row.title.trim());
    rows.sort((a, b) => compareByDateThenSlug(a.date, b.date, a.slug, b.slug));
    if (rows.length === 0) {
      draftRoot.innerHTML = emptyDraftsHtml();
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
  tx,
  parseFrontMatter,
  parsePostDate,
  compareByDateThenSlug,
  loadBlog,
  loadDrafts,
};

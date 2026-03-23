"use strict";

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
    const response = await fetch("/blog/posts.json", { cache: "no-store" });
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
        const postResponse = await fetch(`/blog/posts/${safeSlug}.md`, { cache: "no-store" });
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

    rendered.forEach((post) => {
      const line = document.createElement("p");
      line.className = "blog-line";
      const safeDate = escapeHtml(post.date || "");
      const safeTitle = escapeHtml(post.title || "");
      line.innerHTML = `<a class="blog-line-link" href="/pages/post.html?post=${post.safeSlug}">${safeDate}; ${safeTitle}</a>`;
      listRoot.appendChild(line);
    });
  } catch (error) {
    listRoot.innerHTML = `<p class="blog-error">${escapeHtml(error.message)}</p>`;
  }
}

window.addEventListener("DOMContentLoaded", loadBlog);

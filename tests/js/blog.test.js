"use strict";

const { resetDom } = require("./helpers");

function jsonResponse(body, ok = true) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(typeof body === "string" ? body : JSON.stringify(body)),
  });
}

function textResponse(body, ok = true) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(body),
  });
}

beforeEach(() => {
  resetDom();
  jest.resetModules();
  window.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("helpers: assetUrl, escapeHtml, tx, parseFrontMatter", () => {
  require("../../public/js/blog.js");
  const { assetUrl, escapeHtml, tx, parseFrontMatter } = window.MarinaBlog;

  expect(assetUrl("/blog/posts.json")).toBe("http://localhost/blog/posts.json");
  expect(escapeHtml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&#39;");
  expect(tx("blog.empty", "fallback")).toBe("fallback");

  window.MarinaI18n = { t: 1 };
  expect(tx("blog.empty", "fallback")).toBe("fallback");

  window.MarinaI18n = { t: (key) => `t:${key}` };
  expect(tx("blog.empty", "fallback")).toBe("t:blog.empty");

  expect(parseFrontMatter("hello")).toEqual({ meta: {}, body: "hello" });
  expect(parseFrontMatter("---\ntitle only")).toEqual({
    meta: {},
    body: "---\ntitle only",
  });
  const parsed = parseFrontMatter("---\r\n: skip\nnope\ntitle: Hi\n---\nbody");
  expect(parsed.meta).toEqual({ title: "Hi" });
  expect(parsed.body).toBe("body");
});

test("loadBlog and loadDrafts return when roots are missing", async () => {
  require("../../public/js/blog.js");
  await window.MarinaBlog.loadBlog();
  await window.MarinaBlog.loadDrafts();
  expect(window.fetch).not.toHaveBeenCalled();
});

test("loadBlog renders sorted posts and fetch fallbacks", async () => {
  document.body.innerHTML = '<div id="blog-post-list"></div>';
  window.fetch.mockImplementation((url) => {
    if (String(url).endsWith("posts.json")) {
      return jsonResponse([
        { slug: "10", title: "from-index", date: "2020-01-01" },
        { slug: "2", title: "two", date: "2020-01-01" },
        { slug: "zeta", title: "z", date: "" },
        { slug: "alpha", title: "a", date: "" },
        { slug: "fresh", title: "old-title", date: "2021-01-01" },
        { slug: "", title: "empty-slug", date: "2019-01-01" },
        { slug: "untitled-post", date: "2018-01-01" },
        { slug: "keep-meta", title: "keep", date: "2017-01-01" },
      ]);
    }
    if (String(url).includes("fresh.md")) {
      return textResponse("---\ntitle: Fresh\ndate: 2024-01-01\n---\n");
    }
    if (String(url).includes("keep-meta.md")) {
      return textResponse("---\nsubtitle: only\n---\n");
    }
    if (String(url).includes("10.md")) {
      return Promise.reject(new Error("network"));
    }
    return textResponse("nope", false);
  });

  require("../../public/js/blog.js");
  await window.MarinaBlog.loadBlog();

  const hrefs = [...document.querySelectorAll(".blog-line-link")].map((a) => a.getAttribute("href"));
  expect(hrefs).toContain("post.html?post=fresh");
  expect(hrefs.indexOf("post.html?post=10")).toBeLessThan(hrefs.indexOf("post.html?post=2"));
  expect(hrefs.indexOf("post.html?post=zeta")).toBeLessThan(hrefs.indexOf("post.html?post=alpha"));
  expect(document.body.innerHTML).toContain("Fresh");
  expect(document.body.innerHTML).toContain("untitled post");
  expect(document.body.innerHTML).toContain("keep");

  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ not: "array" }),
  });
  await window.MarinaBlog.loadBlog();
  expect(document.getElementById("blog-post-list").textContent).toContain("No posts yet.");
});

test("loadBlog empty index, http error, and json throw", async () => {
  document.body.innerHTML = '<div id="blog-post-list"></div>';
  const root = () => document.getElementById("blog-post-list");

  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([]),
  });
  require("../../public/js/blog.js");
  await window.MarinaBlog.loadBlog();
  expect(root().textContent).toContain("No posts yet.");

  window.fetch.mockResolvedValueOnce({ ok: false });
  await window.MarinaBlog.loadBlog();
  expect(root().querySelector(".blog-error")).not.toBeNull();

  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.reject(new Error("boom")),
  });
  await window.MarinaBlog.loadBlog();
  expect(root().textContent).toContain("boom");
});

test("loadDrafts covers string entries, meta fetch, empty and errors", async () => {
  document.body.innerHTML = '<div id="blog-draft-list"></div>';
  const root = () => document.getElementById("blog-draft-list");

  window.fetch.mockImplementation((url) => {
    if (String(url).endsWith("drafts.json")) {
      return jsonResponse([
        "  listed draft  ",
        "   ",
        { slug: "alpha", title: "A", date: "2020-01-01", status: "" },
        { slug: "beta", title: "B", date: "2024-01-01" },
        { slug: "gamma", title: "G", date: "2024-01-01" },
        { slug: "untitled-draft" },
        { title: "no-slug" },
        { slug: "throws" },
        { slug: "empty-meta", title: "keep-draft", date: "2019-01-01", status: "queued" },
      ]);
    }
    if (String(url).includes("beta.md")) {
      return textResponse("---\ntitle: Beta\ndate: 2025-01-01\nstatus: editing\n---\n");
    }
    if (String(url).includes("empty-meta.md")) {
      return textResponse("---\n---\n");
    }
    if (String(url).includes("throws.md")) {
      return Promise.reject(new Error("nope"));
    }
    return textResponse("missing", false);
  });

  require("../../public/js/blog.js");
  await window.MarinaBlog.loadDrafts();
  expect(document.body.innerHTML).toContain("untitled draft");
  expect(document.body.innerHTML).toContain("Beta");
  expect(document.body.innerHTML).toContain("editing");
  expect(document.body.innerHTML).toContain("keep-draft");
  expect(document.body.innerHTML).toContain("queued");

  window.fetch.mockResolvedValueOnce({ ok: false });
  await window.MarinaBlog.loadDrafts();
  expect(root().textContent).toContain("Could not load drafts list.");

  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ not: "array" }),
  });
  await window.MarinaBlog.loadDrafts();
  expect(root().textContent).toContain("Nothing listed here yet.");

  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve([]),
  });
  await window.MarinaBlog.loadDrafts();
  expect(root().textContent).toContain("Nothing listed here yet.");

  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(["   ", { title: "   " }]),
  });
  await window.MarinaBlog.loadDrafts();
  expect(root().textContent).toContain("Nothing listed here yet.");

  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.reject(new Error("draft-boom")),
  });
  await window.MarinaBlog.loadDrafts();
  expect(root().textContent).toContain("draft-boom");
});

test("DOMContentLoaded boots both loaders", async () => {
  document.body.innerHTML = '<div id="blog-post-list"></div><div id="blog-draft-list"></div>';
  window.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([]),
    text: () => Promise.resolve(""),
  });
  require("../../public/js/blog.js");
  window.dispatchEvent(new Event("DOMContentLoaded"));
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(window.fetch).toHaveBeenCalled();
});

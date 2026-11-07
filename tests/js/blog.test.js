"use strict";

const { resetDom } = require("./helpers");

function jsonResponse(body, ok = true) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(body),
    text: () => Promise.resolve(typeof body === "string" ? body : JSON.stringify(body)),
  });
}

beforeEach(() => {
  resetDom();
  jest.resetModules();
  require("../../public/js/blog-common.js"); // the pages load it before blog.js / blog-post.js
  window.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("helpers: assetUrl, escapeHtml, parseFrontMatter", () => {
  require("../../public/js/blog.js");
  const { assetUrl, escapeHtml, parsePostDate } = window.MarinaBlog;
  const { parseFrontMatter } = globalThis; // shared helper from blog-common.js

  expect(assetUrl("/blog/posts.json")).toBe("http://localhost/blog/posts.json");
  expect(escapeHtml(`&<>"'`)).toBe("&amp;&lt;&gt;&quot;&#39;");
  expect(parseFrontMatter("hello")).toEqual({ meta: {}, body: "hello" });
  expect(parseFrontMatter("---\ntitle only")).toEqual({
    meta: {},
    body: "---\ntitle only",
  });
  const parsed = parseFrontMatter("---\r\n: skip\nnope\ntitle: Hi\n---\nbody");
  expect(parsed.meta).toEqual({ title: "Hi" });
  expect(parsed.body).toBe("body");

  expect(Number.isNaN(parsePostDate(""))).toBe(true);
  expect(Number.isNaN(parsePostDate("not-a-date"))).toBe(true);
  expect(parsePostDate("2026; 09; 16")).toBe(Date.UTC(2026, 8, 16));
  expect(parsePostDate("2024-01-01")).toBe(Date.parse("2024-01-01"));
});

test("loadBlog and loadDrafts return when roots are missing", async () => {
  require("../../public/js/blog.js");
  await window.MarinaBlog.loadBlog();
  await window.MarinaBlog.loadDrafts();
  expect(window.fetch).not.toHaveBeenCalled();
});

test("loadBlog renders the index alone, sorted, with one revalidating request", async () => {
  document.body.innerHTML = '<div id="blog-post-list"></div>';
  window.fetch.mockImplementation(() => jsonResponse([
    { slug: "10", title: "ten", date: "2020-01-01" },
    { slug: "2", title: "two", date: "2020-01-01" },
    { slug: "zeta", title: "z", date: "" },
    { slug: "alpha", title: "a", date: "" },
    { slug: "fresh", title: "Fresh <b>", date: "2024-01-01" },
    { title: "empty-slug", date: "2019-01-01" },
    { slug: "untitled-post", date: "2018-01-01" },
    { slug: "semicolon-old", title: "old semi", date: "2026; 09; 06" },
    { slug: "semicolon-new", title: "new semi", date: "2026; 09; 16" },
  ]));

  require("../../public/js/blog.js");
  await window.MarinaBlog.loadBlog();

  // Titles and dates come from posts.json; the posts themselves are not downloaded.
  expect(window.fetch).toHaveBeenCalledTimes(1);
  expect(window.fetch).toHaveBeenCalledWith("http://localhost/blog/posts.json", { cache: "no-cache" });

  const hrefs = [...document.querySelectorAll(".blog-line-link")].map((a) => a.getAttribute("href"));
  expect(hrefs[0]).toBe("/blog/semicolon-new.html");
  expect(hrefs.indexOf("/blog/semicolon-new.html")).toBeLessThan(hrefs.indexOf("/blog/semicolon-old.html"));
  expect(hrefs.indexOf("/blog/fresh.html")).toBeLessThan(hrefs.indexOf("/blog/10.html"));
  expect(hrefs.indexOf("/blog/10.html")).toBeLessThan(hrefs.indexOf("/blog/2.html"));
  expect(hrefs.indexOf("/blog/zeta.html")).toBeLessThan(hrefs.indexOf("/blog/alpha.html"));
  expect(document.body.innerHTML).toContain("Fresh &lt;b&gt;");
  expect(document.body.innerHTML).toContain("untitled post");
  expect(document.body.innerHTML).toContain("empty-slug");

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

test("loadDrafts covers string entries, index fields, empty and errors", async () => {
  document.body.innerHTML = '<div id="blog-draft-list"></div>';
  const root = () => document.getElementById("blog-draft-list");

  window.fetch.mockImplementation(() => jsonResponse([
    "  listed draft  ",
    "   ",
    { slug: "alpha", title: "A", date: "2020-01-01", status: "" },
    { slug: "beta", title: "Beta", date: "2025-01-01", status: "editing" },
    { slug: "gamma", title: "G", date: "2024-01-01" },
    { slug: "untitled-draft" },
    { title: "no-slug" },
    { slug: "queued-one", title: "keep-draft", date: "2019-01-01", status: "queued" },
  ]));

  require("../../public/js/blog.js");
  await window.MarinaBlog.loadDrafts();
  expect(window.fetch).toHaveBeenCalledTimes(1);
  const text = root().textContent;
  expect(text).toContain("wip; listed draft");
  expect(text).toContain("untitled draft");
  expect(text).toContain("editing; Beta");
  expect(text).toContain("2020-01-01; A");
  expect(text).toContain("queued; keep-draft");
  expect(text.indexOf("Beta")).toBeLessThan(text.indexOf("G"));

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

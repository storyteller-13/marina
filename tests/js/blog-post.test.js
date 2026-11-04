"use strict";

const { resetDom } = require("./helpers");

beforeEach(() => {
  resetDom();
  jest.resetModules();
  window.fetch = jest.fn();
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test("helpers and markdown conversion cover every syntax path", () => {
  require("../../public/js/blog-post.js");
  const api = window.MarinaBlogPost;

  expect(api.assetUrl("blog/x.md")).toBe("http://localhost/blog/x.md");
  expect(api.escapeHtml("&")).toBe("&amp;");
  expect(api.tx("blog.copy", "Copy")).toBe("Copy");
  window.MarinaI18n = { t: 1 };
  expect(api.tx("blog.copy", "Copy")).toBe("Copy");
  window.MarinaI18n = { t: (key) => `i:${key}` };
  expect(api.tx("blog.copy", "Copy")).toBe("i:blog.copy");

  expect(api.parseFrontMatter("x")).toEqual({ meta: {}, body: "x" });
  expect(api.parseFrontMatter("---\nno-end")).toEqual({ meta: {}, body: "---\nno-end" });
  expect(api.parseFrontMatter("---\n: e\nskip\ntitle: T\n---\nB").meta).toEqual({ title: "T" });

  const html = api.markdownToHtml(
    [
      "# H1 with ![pic](https://img.test/a.png) and <br/> and `code` and [link](https://ex.test) and **b** and *i*",
      "",
      "> a quote",
      "",
      "- ul a",
      "* ul b",
      "",
      "1. one",
      "2. two",
      "",
      "---",
      "",
      "![solo](https://img.test/b.png)",
      "",
      "```",
      "plain",
      "```",
      "",
      "```js",
      "const x = 1;",
      "```",
      "",
      "| A | B |",
      "| --- | ---: |",
      "| 1 | 2 |",
      "",
      "| Only |",
      "| --- |",
      "",
      "| Two | Cols |",
      "| --- |",
      "hello after mismatch",
      "",
      "| H |",
      "| -- |",
      "",
      "not a table",
      "|no-end",
      "no-start|",
      "",
      "still a para",
      "and another line",
      "## Next heading",
      "",
      "```",
      "unclosed",
    ].join("\n"),
  );

  expect(html).toContain('<h1 id="h1-with-pic-and-and-code-and-link-and-b-and-i">');
  expect(html).toContain("<img src=\"https://img.test/a.png\"");
  expect(html).toContain("<br>");
  expect(html).toContain("<blockquote>");
  expect(html).toContain("<ul>");
  expect(html).toContain("<ol>");
  expect(html).toContain("<hr>");
  expect(html).toContain("<table>");
  expect(html).toContain("<tbody>");
  expect(html).toContain("language-js");
  expect(html).toContain("<p>still a para<br>and another line</p>");
  expect(html).toContain('<h2 id="next-heading">Next heading</h2>');
  expect(html).not.toContain("post-summary");
  expect(html).toContain("</code></pre>");
});

const DISCLAIMER = [
  "As always, please remember our rules:",
  "",
  "**🤖 If these notes look cool to you, it's your ✦moral duty✦ to read the original resources.**",
  "**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**",
];

test("adds a summary of the main sections right below the disclaimer", () => {
  require("../../public/js/blog-post.js");
  const api = window.MarinaBlogPost;

  const html = api.markdownToHtml([
    "# Before the rules",
    "",
    ...DISCLAIMER,
    "",
    "<br>",
    "",
    "# 👻 Part I — The [Wire](https://ex.test)",
    "## detail",
    "# Part II & *more*",
    "## detail",
    "##### P.S. not a main section",
  ].join("\n"));

  const [before, after] = html.split("living notes that I change as I fancy.</strong></p>");
  expect(before).not.toContain("post-summary");
  expect(after.startsWith('\n<br><br>\n<nav class="post-summary" aria-label="Summary">')).toBe(true);
  expect(after).toContain(
    '<ul><li><a href="#part-i-the-wire">👻 Part I — The Wire</a></li>'
    + '<li><a href="#part-ii-more">Part II &amp; more</a></li></ul></nav>\n<br><br>\n<p><br></p>',
  );
  // repeated headings get unique ids, and every summary link has a target
  expect(after).toContain('<h2 id="detail">');
  expect(after).toContain('<h2 id="detail-2">');
  expect(html).toContain('<h1 id="before-the-rules">');
  expect(html.match(/post-summary/g)).toHaveLength(1);
});

test("summary uses the first heading level with two or more sections, or is skipped", () => {
  require("../../public/js/blog-post.js");
  const api = window.MarinaBlogPost;

  const nested = api.markdownToHtml([...DISCLAIMER, "## Only one", "### A", "### B"].join("\n"));
  expect(nested).toContain('<li><a href="#a">A</a></li><li><a href="#b">B</a></li>');
  expect(nested).not.toContain('href="#only-one"');

  expect(api.markdownToHtml([...DISCLAIMER, "## Lonely"].join("\n"))).not.toContain("post-summary");
  expect(api.markdownToHtml(["## A", "## B"].join("\n"))).not.toContain("post-summary");

  window.MarinaI18n = { t: (key) => (key === "blog.summary" ? "まとめ" : key) };
  expect(api.markdownToHtml([...DISCLAIMER, "## A", "## B"].join("\n"))).toContain("<strong>まとめ</strong>");
});

test("heading text helpers strip markdown and html, with a fallback id", () => {
  require("../../public/js/blog-post.js");
  const api = window.MarinaBlogPost;

  expect(api.plainHeadingText(" ![x](a.png) [y](https://b) <br> **z** `c` ")).toBe("x y  z c");
  expect(api.slugify("Chapter 1. An Introduction!")).toBe("chapter-1-an-introduction");
  expect(api.slugify("ゴースト ✦ 幽霊")).toBe("ゴースト-幽霊");
  expect(api.slugify("✦ ✦")).toBe("section");
  expect(api.renderSummary([])).toBe("");
});

test("scrollToHashTarget scrolls to a rendered heading from the url hash", () => {
  require("../../public/js/blog-post.js");
  const api = window.MarinaBlogPost;
  document.body.innerHTML = '<h2 id="ゴースト">x</h2>';
  const target = document.getElementById("ゴースト");
  target.scrollIntoView = jest.fn();

  window.location.hash = "";
  api.scrollToHashTarget();
  window.location.hash = "#missing";
  api.scrollToHashTarget();
  expect(target.scrollIntoView).not.toHaveBeenCalled();

  window.location.hash = `#${encodeURIComponent("ゴースト")}`;
  api.scrollToHashTarget();
  expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
  window.location.hash = "";
});

test("enhanceCodeBlocks wraps, copies, and skips already wrapped / empty pre", async () => {
  require("../../public/js/blog-post.js");
  const { enhanceCodeBlocks, copyToClipboard } = window.MarinaBlogPost;

  enhanceCodeBlocks(null);

  document.body.innerHTML = `
    <div class="blog-code-wrap"><pre><code>already</code></pre></div>
    <pre class="empty"></pre>
    <pre><code class="language-js">const a = 1;</code></pre>
    <pre><code>plain</code></pre>
  `;
  enhanceCodeBlocks(document.body);
  expect(document.querySelectorAll(".blog-code-wrap")).toHaveLength(3);
  expect(document.querySelector(".blog-code-lang").textContent).toBe("js");
  const plainWrap = [...document.querySelectorAll(".blog-code-wrap")].find((w) =>
    w.querySelector("code")?.textContent === "plain"
  );
  expect(plainWrap.querySelector(".blog-code-lang")).toBeNull();

  navigator.clipboard = { writeText: jest.fn().mockResolvedValue(undefined) };
  const timeouts = [];
  jest.spyOn(global, "setTimeout").mockImplementation((fn) => {
    timeouts.push(fn);
    return 0;
  });
  const labeled = document.querySelector(".language-js").closest(".blog-code-wrap");
  const copyBtn = labeled.querySelector(".blog-code-copy");
  copyBtn.click();
  await Promise.resolve();
  await Promise.resolve();
  expect(copyBtn.textContent).toBe("Copied!");
  timeouts[0]();
  expect(copyBtn.textContent).toBe("Copy");

  navigator.clipboard.writeText.mockRejectedValue(new Error("denied"));
  document.execCommand = jest.fn().mockReturnValue(false);
  const plainBtn = document.querySelectorAll(".blog-code-copy")[1];
  plainBtn.click();
  await Promise.resolve();
  await Promise.resolve();
  expect(plainBtn.textContent).toBe("Copy failed");
  timeouts[1]();
  expect(plainBtn.textContent).toBe("Copy");

  document.execCommand = jest.fn().mockReturnValue(true);
  expect(await copyToClipboard("ok")).toBe(true);
  document.execCommand = jest.fn(() => {
    throw new Error("no");
  });
  expect(await copyToClipboard("x")).toBe(false);

  delete navigator.clipboard;
  document.execCommand = jest.fn().mockReturnValue(true);
  expect(await copyToClipboard("y")).toBe(true);
});

test("loadPost handles missing nodes, missing slug, fetch errors, and success", async () => {
  require("../../public/js/blog-post.js");
  const { loadPost } = window.MarinaBlogPost;

  await loadPost();

  document.body.innerHTML = '<div id="post-content"></div>';
  window.history.replaceState({}, "", "/pages/post.html");
  await loadPost();
  expect(document.getElementById("post-content").textContent).toContain("Missing post slug.");

  document.body.innerHTML = `
    <p id="post-subtitle"></p>
    <div id="post-content"></div>
  `;
  window.history.replaceState({}, "", "/pages/post.html?post=hello");
  await loadPost();
  expect(document.getElementById("post-content").textContent).toContain("Missing post slug.");

  document.body.innerHTML = `
    <article class="blog-post-page">
      <h1 id="post-title"></h1>
      <p id="post-subtitle"></p>
      <div id="post-content"></div>
    </article>
  `;
  window.history.replaceState({}, "", "/pages/post.html?post=hello");
  window.fetch.mockResolvedValueOnce({ ok: false });
  await loadPost();
  expect(document.getElementById("post-content").textContent).toContain("Could not load post content.");

  window.fetch.mockResolvedValueOnce({
    ok: true,
    text: () => Promise.resolve("---\ntitle: Hello\nsubtitle: sub\n---\n\n```js\n1\n```\n"),
  });
  await loadPost();
  expect(document.getElementById("post-title").textContent).toBe("Hello");
  expect(document.getElementById("post-subtitle").style.display).toBe("block");
  expect(document.querySelector(".blog-post-page--no-subtitle")).toBeNull();
  expect(document.querySelector(".blog-code-wrap")).not.toBeNull();

  document.body.innerHTML = `
    <h1 id="post-title"></h1>
    <p id="post-subtitle"></p>
    <div id="post-content"></div>
  `;
  window.fetch.mockResolvedValueOnce({
    ok: true,
    text: () => Promise.resolve("no front matter"),
  });
  await loadPost();
  expect(document.getElementById("post-title").textContent).toBe("hello");
  expect(document.getElementById("post-subtitle").style.display).toBe("none");
});

test("DOMContentLoaded loads the post", async () => {
  document.body.innerHTML = `
    <h1 id="post-title"></h1>
    <p id="post-subtitle"></p>
    <div id="post-content"></div>
  `;
  window.history.replaceState({}, "", "/pages/post.html?post=x");
  window.fetch.mockResolvedValue({
    ok: true,
    text: () => Promise.resolve("# Hi"),
  });
  require("../../public/js/blog-post.js");
  window.dispatchEvent(new Event("DOMContentLoaded"));
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(document.getElementById("post-title").textContent).toBe("x");
});

"use strict";

const { resetDom } = require("./helpers");

beforeEach(() => {
  resetDom();
  jest.resetModules();
  require("../../public/js/blog-common.js"); // the pages load it before blog.js / blog-post.js
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
    '<ul><li><a href="#part-i-the-wire">👻 Part I — The Wire</a><ul><li><a href="#detail">detail</a></li></ul></li>'
    + '<li><a href="#part-ii-more">Part II &amp; more</a><ul><li><a href="#detail-2">detail</a></li></ul></li></ul></nav>'
    + '\n<br><br>\n<p><br></p>',
  );
  // repeated headings get unique ids, and every summary link has a target
  expect(after).toContain('<h2 id="detail">');
  expect(after).toContain('<h2 id="detail-2">');
  expect(html).toContain('<h1 id="before-the-rules">');
  expect(html.match(/post-summary/g)).toHaveLength(1);
});

test("summary nests only the headings one level below each main section", () => {
  require("../../public/js/blog-post.js");
  const api = window.MarinaBlogPost;

  const html = api.markdownToHtml([
    ...DISCLAIMER,
    "### Orphan",
    "## Before any part",
    "# One",
    "## One.a",
    "### Too deep",
    "## One.b",
    "# Two",
    "### Skipped level",
  ].join("\n"));

  expect(html).toContain(
    '<ul><li><a href="#one">One</a><ul>'
    + '<li><a href="#one-a">One.a</a></li><li><a href="#one-b">One.b</a></li></ul></li>'
    + '<li><a href="#two">Two</a></li></ul></nav>',
  );
  expect(html).not.toContain('href="#too-deep"');
  expect(html).not.toContain('href="#skipped-level"');
  expect(html).not.toContain('href="#before-any-part"');
  expect(html).not.toContain('href="#orphan"');
});

test("summary uses the first heading level with two or more sections, or is skipped", () => {
  require("../../public/js/blog-post.js");
  const api = window.MarinaBlogPost;

  const nested = api.markdownToHtml([...DISCLAIMER, "## Only one", "### A", "### B"].join("\n"));
  expect(nested).toContain('<li><a href="#a">A</a></li><li><a href="#b">B</a></li>');
  expect(nested).not.toContain('href="#only-one"');

  expect(api.markdownToHtml([...DISCLAIMER, "## Lonely"].join("\n"))).not.toContain("post-summary");
  expect(api.markdownToHtml(["## A", "## B"].join("\n"))).not.toContain("post-summary");
  expect(api.markdownToHtml([...DISCLAIMER, "## A", "## B"].join("\n"))).toContain("<strong>Summary</strong>");
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
  expect(document.title).toBe("Hello · Marina von Steinkirch");
  expect(window.fetch).toHaveBeenLastCalledWith("http://localhost/blog/posts/hello.md", { cache: "no-cache" });
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

test("the post date shows under the title, with a machine-readable datetime", async () => {
  require("../../public/js/blog-post.js");
  const { isoDate, renderPostDate, loadPost } = window.MarinaBlogPost;

  expect(isoDate("2026; 11; 6")).toBe("2026-11-06");
  expect(isoDate(" 2026-10-01 ")).toBe("2026-10-01");
  expect(isoDate("2026/1/2")).toBe("2026-01-02");
  expect(isoDate("someday")).toBe("");

  document.body.innerHTML = `
    <h1 id="post-title"></h1>
    <p id="post-date" hidden><time></time></p>
    <p id="post-subtitle"></p>
    <div id="post-content"></div>
  `;
  const dateRoot = document.getElementById("post-date");
  const time = dateRoot.querySelector("time");
  window.history.replaceState({}, "", "/pages/post.html?post=dated");
  window.fetch.mockResolvedValueOnce({ ok: true, text: () => Promise.resolve("---\ntitle: T\ndate: 2026; 11; 13\n---\nbody") });
  await loadPost();
  expect(dateRoot.hidden).toBe(false);
  expect(time.textContent).toBe("2026; 11; 13");
  expect(time.getAttribute("datetime")).toBe("2026-11-13");

  // A date that isn't a calendar date is still shown, without a datetime.
  renderPostDate(dateRoot, "soon");
  expect(time.textContent).toBe("soon");
  expect(time.hasAttribute("datetime")).toBe(false);
  expect(dateRoot.hidden).toBe(false);

  // No date: the line is hidden.
  renderPostDate(dateRoot, undefined);
  expect(dateRoot.hidden).toBe(true);

  // Pages without the date element still load.
  renderPostDate(null, "2026; 1; 1");
});

test("a generated post page names its post in a meta tag", async () => {
  require("../../public/js/blog-post.js");
  document.head.innerHTML = '<meta name="post-slug" content="from_meta">';
  document.body.innerHTML = `
    <h1 id="post-title"></h1>
    <p id="post-subtitle"></p>
    <div id="post-content"></div>
  `;
  window.history.replaceState({}, "", "/blog/from_meta.html?post=ignored");
  window.fetch.mockResolvedValueOnce({ ok: true, text: () => Promise.resolve("---\ntitle: Meta\n---\nbody") });
  await window.MarinaBlogPost.loadPost();
  expect(window.fetch).toHaveBeenLastCalledWith("http://localhost/blog/posts/from_meta.md", { cache: "no-cache" });
  expect(document.getElementById("post-title").textContent).toBe("Meta");
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

test("post images load lazily", () => {
  require("../../public/js/blog-post.js");
  const { markdownToHtml, parseInline } = window.MarinaBlogPost;
  expect(markdownToHtml("![a](https://img.test/a.png)")).toContain('loading="lazy"');
  expect(parseInline("see ![a](https://img.test/a.png) here")).toContain('loading="lazy"');
});

test("code blocks do not start with a blank line", () => {
  require("../../public/js/blog-post.js");
  const { markdownToHtml, enhanceCodeBlocks } = window.MarinaBlogPost;
  document.body.innerHTML = markdownToHtml("```js\nconst a = 1;\n```");
  enhanceCodeBlocks(document.body);
  expect(document.querySelector("code").textContent).toBe("const a = 1;");
});

test("parseInline leaves code spans, link targets and image alts unparsed", () => {
  require("../../public/js/blog-post.js");
  const { parseInline } = window.MarinaBlogPost;

  expect(parseInline("use `a*b*c` and `__init__`")).toBe("use <code>a*b*c</code> and <code>__init__</code>");
  expect(parseInline("see `[x](https://y.com)`")).toBe("see <code>[x](https://y.com)</code>");
  expect(parseInline("`<b>`")).toBe("<code>&lt;b&gt;</code>");
  expect(parseInline("[docs](https://ex.com/a*b*c)")).toBe(
    '<a target="_blank" rel="noopener noreferrer" href="https://ex.com/a*b*c">docs</a>'
  );
  expect(parseInline("**[`c` *l*](https://c.d)**")).toBe(
    '<strong><a target="_blank" rel="noopener noreferrer" href="https://c.d"><code>c</code> <em>l</em></a></strong>'
  );
  expect(parseInline("![alt `x` *y*](/a.png)")).toBe('<img src="/a.png" alt="alt x *y*" loading="lazy" decoding="async">');
  expect(parseInline("a<br>b <BR /> c")).toBe("a<br>b <br> c");
  // A private-use slot marker in the text can't be used to forge or loop placeholders.
  expect(parseInline("x \uE0000\uE000 `\uE0000\uE000`")).toBe("x 0 <code>0</code>");
});

test("markdownToHtml nests indented list items", () => {
  require("../../public/js/blog-post.js");
  const { markdownToHtml } = window.MarinaBlogPost;

  const html = markdownToHtml(
    ["- one", "  - nested", "    - deeper", "  - nested2", "- two", "", "1. a", "2. b", "\t- sub", "- after ol"].join("\n")
  );
  expect(html).toBe([
    "<ul>",
    "<li>one<ul><li>nested<ul><li>deeper</li></ul></li><li>nested2</li></ul></li>",
    "<li>two</li>",
    "</ul>",
    "<ol>",
    "<li>a</li>",
    "<li>b<ul><li>sub</li></ul></li>",
    "</ol>",
    "<ul>",
    "<li>after ol</li>",
    "</ul>",
  ].join("\n"));

  // A list indented as a whole stays one flat list.
  expect(markdownToHtml("    1. x\n    2. y")).toBe("<ol>\n<li>x</li>\n<li>y</li>\n</ol>");
});

test("code blocks are coloured by their tag, or by detecting the language when untagged", () => {
  require("../../public/js/code-highlight.js");
  require("../../public/js/blog-post.js");
  const { markdownToHtml, enhanceCodeBlocks } = window.MarinaBlogPost;
  document.body.innerHTML = markdownToHtml([
    "```bash", "npm ci", "```",
    "```", "from mem0 import MemoryClient", "client = MemoryClient()", "```",
    "```💡", "- a note, not code", "```",
    "```", "score = (0.4 * similarity)", "```",
  ].join("\n"));
  enhanceCodeBlocks(document.body);

  const blocks = [...document.querySelectorAll(".blog-code-wrap")];
  const label = (b) => b.querySelector(".blog-code-lang")?.textContent ?? null;
  expect(blocks.map(label)).toEqual(["bash", "python", "💡", null]);
  expect(blocks[0].querySelector('.tok-fn').textContent).toBe("npm");
  expect(blocks[1].querySelector("code").classList.contains("blog-code-highlighted")).toBe(true);
  expect(blocks[1].querySelector(".tok-kw").textContent).toBe("from");
  // The copied text is the original code, not the markup.
  expect(blocks[1].querySelector("code").textContent).toBe("from mem0 import MemoryClient\nclient = MemoryClient()");
  expect(blocks[2].querySelector("[class^=tok-]")).toBeNull();
  expect(blocks[3].querySelector("[class^=tok-]")).toBeNull();
});

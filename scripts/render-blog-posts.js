"use strict";

/* Render Markdown with the same parser used by the browser, for static post pages. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const context = vm.createContext({
  window: {
    location: { href: "https://marina.nullstar.fun/blog/render.html", hash: "" },
    addEventListener() {},
  },
});

for (const file of ["public/js/blog-common.js", "public/js/blog-post.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
}

const renderer = context.MarinaBlogPost;
const output = {};
for (const inputPath of process.argv.slice(2)) {
  const markdown = fs.readFileSync(inputPath, "utf8");
  const { body } = renderer.parseFrontMatter(markdown);
  output[path.basename(inputPath, ".md")] = renderer.markdownToHtml(body);
}

process.stdout.write(JSON.stringify(output));

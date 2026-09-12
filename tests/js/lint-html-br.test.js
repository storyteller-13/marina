"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { walk, normalizeBrTags, getPublicDir, runCli } = require("../../scripts/lint-html-br.js");

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "marina-br-"));
}

afterEach(() => {
  delete process.env.MARINA_HTML_BR_LINT_ROOT;
  process.exitCode = 0;
});

test("normalizeBrTags rewrites every non-canonical form", () => {
  expect(normalizeBrTags("a</br>b<br/>c<br />d<BR>e<Br>f<bR>g<br  >h<br>i")).toBe(
    "ab<br>c<br>d<br>e<br>f<br>g<br>h<br>i",
  );
});

test("walk skips missing dirs and non-html files, recurses into folders", () => {
  expect(walk(path.join(os.tmpdir(), "marina-missing-br-dir"))).toEqual([]);

  const root = tmpDir();
  fs.mkdirSync(path.join(root, "nested"));
  fs.writeFileSync(path.join(root, "ok.html"), "<p>a<br>b</p>\n");
  fs.writeFileSync(path.join(root, "nested", "note.md"), "x<br/>y\n");
  fs.writeFileSync(path.join(root, "skip.txt"), "<br/>\n");

  const files = walk(root).sort();
  expect(files).toEqual([
    path.join(root, "nested", "note.md"),
    path.join(root, "ok.html"),
  ]);
});

test("getPublicDir uses env override and default public/", () => {
  const root = tmpDir();
  process.env.MARINA_HTML_BR_LINT_ROOT = root;
  expect(getPublicDir()).toBe(path.resolve(root));
  delete process.env.MARINA_HTML_BR_LINT_ROOT;
  expect(getPublicDir()).toBe(path.join(__dirname, "..", "..", "public"));
});

test("runCli reports and fixes non-canonical tags", () => {
  const root = tmpDir();
  const file = path.join(root, "x.html");
  fs.writeFileSync(file, "<p>a<br/>b</p>\n");
  process.env.MARINA_HTML_BR_LINT_ROOT = root;

  const logs = [];
  const write = jest.spyOn(process.stdout, "write").mockImplementation((chunk) => {
    logs.push(String(chunk));
    return true;
  });

  expect(runCli(["node", "lint"])).toBe(1);
  expect(process.exitCode).toBe(1);
  expect(logs.join("")).toContain("non-canonical");
  expect(fs.readFileSync(file, "utf8")).toBe("<p>a<br/>b</p>\n");

  process.exitCode = 0;
  logs.length = 0;
  expect(runCli(["node", "lint", "--fix"])).toBe(1);
  expect(process.exitCode).toBe(0);
  expect(logs.join("")).toContain("fixed:");
  expect(fs.readFileSync(file, "utf8")).toBe("<p>a<br>b</p>\n");

  logs.length = 0;
  expect(runCli(["node", "lint"])).toBe(0);
  expect(logs.join("")).toBe("");

  process.env.MARINA_HTML_BR_LINT_ROOT = root;
  expect(runCli()).toBe(0);
  write.mockRestore();
});

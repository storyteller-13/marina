"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const grammar = require("../../scripts/check-grammar.js");

/** Minimal stand-in for a Harper Lint object. */
function fakeLint(kind, start, problem, message = `${kind} message`) {
  return {
    lint_kind: () => kind,
    span: () => ({ start }),
    get_problem_text: () => problem,
    message: () => message,
  };
}

function tempPosts(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "grammar-"));
  for (const [name, text] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), text);
  return dir;
}

afterEach(() => {
  jest.restoreAllMocks();
});

test("postFiles lists markdown posts in order and tolerates a missing folder", () => {
  const dir = tempPosts({ "b.md": "", "a.md": "", "notes.txt": "" });
  expect(grammar.postFiles(dir)).toEqual([path.join(dir, "a.md"), path.join(dir, "b.md")]);
  expect(grammar.postFiles(path.join(dir, "missing"))).toEqual([]);
  expect(grammar.postFiles().every((file) => file.endsWith(".md"))).toBe(true);
});

test("lineAndColumn is 1-based", () => {
  expect(grammar.lineAndColumn("abc", 0)).toEqual({ line: 1, column: 1 });
  expect(grammar.lineAndColumn("ab\ncd\nef", 7)).toEqual({ line: 3, column: 2 });
});

test("toFindings drops the noisy categories and keeps the rest", () => {
  const text = "first line\nit's is wrong";
  const findings = grammar.toFindings("post.md", text, [
    fakeLint("Spelling", 0, "first"),
    fakeLint("Grammar", 11, "it's is", "Drop the repeated verb form"),
  ]);
  expect(findings).toEqual([{
    file: "post.md", line: 2, column: 1, kind: "Grammar", message: "Drop the repeated verb form", problem: "it's is",
  }]);
  expect([...grammar.IGNORED_KINDS]).toEqual(expect.arrayContaining(["Spelling", "Readability", "Capitalization"]));
});

test("formats findings for people and for GitHub Actions", () => {
  const finding = {
    file: path.join("/repo", "public", "x.md"), line: 3, column: 7, kind: "Usage", message: "50% off\nnext", problem: "1990’s",
  };
  expect(grammar.formatFinding(finding, "/repo")).toBe(`${path.join("public", "x.md")}:3:7  Usage  50% off\nnext  ("1990’s")`);
  expect(grammar.formatAnnotation(finding, "/repo")).toBe(
    `::notice file=${path.join("public", "x.md")},line=3,col=7,title=grammar (Usage)::50%25 off%0Anext ("1990’s")`,
  );
  expect(grammar.formatAnnotation({ ...finding, message: "a\r\nb" }, "/repo")).toContain("::a%0D%0Ab (");
  expect(grammar.formatFinding({ ...finding, file: path.join(process.cwd(), "y.md") })).toMatch(/^y\.md:3:7 /);
  expect(grammar.formatAnnotation({ ...finding, file: path.join(process.cwd(), "y.md") })).toMatch(/^::notice file=y\.md,/);
});

test("runCheck reports findings per file, skips non-markdown, and can annotate", async () => {
  const dir = tempPosts({ "a.md": "has has value", "b.md": "fine" });
  const lint = jest.fn(async (text) => (text.startsWith("has") ? [fakeLint("Repetition", 0, "has has")] : []));
  const lines = [];

  const count = await grammar.runCheck({
    lint,
    files: [path.join(dir, "a.md"), path.join(dir, "b.md"), path.join(dir, "image.webp")],
    annotate: true,
    write: (line) => lines.push(line),
  });

  expect(count).toBe(1);
  expect(lint).toHaveBeenCalledTimes(2);
  expect(lines[0]).toMatch(/a\.md:1:1 {2}Repetition/);
  expect(lines[1]).toMatch(/^::notice file=.*a\.md,line=1,col=1,/);
  expect(lines[2]).toBe("grammar: 1 suggestion(s) in 2 file(s) — advisory only, nothing is blocked.");

  const plain = [];
  await grammar.runCheck({ lint, files: [path.join(dir, "a.md")], write: (line) => plain.push(line) });
  expect(plain.some((line) => line.startsWith("::notice"))).toBe(false);
});

test("runCheck defaults to every post and to stdout", async () => {
  const write = jest.spyOn(process.stdout, "write").mockImplementation(() => true);
  const count = await grammar.runCheck({ lint: async () => [] });
  expect(count).toBe(0);
  expect(write).toHaveBeenLastCalledWith(`grammar: no suggestions in ${grammar.postFiles().length} file(s).\n`);
});

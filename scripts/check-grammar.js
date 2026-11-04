#!/usr/bin/env node
/**
 * Advisory grammar check for blog posts, using Harper (offline, no Java or network).
 * Lists likely mistakes as `file:line:col  kind  message` and always exits 0 — it never blocks a commit or CI.
 *
 *   node scripts/check-grammar.js                 # every post in public/blog/posts
 *   node scripts/check-grammar.js a.md b.md       # just these files (what pre-commit passes)
 *
 * Inside GitHub Actions each finding is also emitted as a `::notice` annotation on the file.
 */
const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "public", "blog", "posts");

/**
 * Harper categories that are mostly noise for these notes (names, jargon, quoted book text,
 * long sentences, ALL-CAPS headings), so they are not reported.
 */
const IGNORED_KINDS = new Set([
  "Capitalization",
  "Formatting",
  "Readability",
  "Spelling",
  "Style",
  "Typo",
  "WordChoice",
]);

function postFiles(dir = POSTS_DIR) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => path.join(dir, name));
}

/** 1-based line and column of a character offset. */
function lineAndColumn(text, offset) {
  const before = text.slice(0, offset).split("\n");
  return { line: before.length, column: before[before.length - 1].length + 1 };
}

/** Plain findings from Harper lints, without the ignored categories. */
function toFindings(file, text, lints) {
  return lints
    .filter((lint) => !IGNORED_KINDS.has(lint.lint_kind()))
    .map((lint) => ({
      file,
      ...lineAndColumn(text, lint.span().start),
      kind: lint.lint_kind(),
      message: lint.message(),
      problem: lint.get_problem_text(),
    }));
}

function formatFinding(finding, cwd = process.cwd()) {
  const where = `${path.relative(cwd, finding.file)}:${finding.line}:${finding.column}`;
  return `${where}  ${finding.kind}  ${finding.message}  ("${finding.problem}")`;
}

/** GitHub Actions workflow command; message text must escape %, CR and LF. */
function formatAnnotation(finding, cwd = process.cwd()) {
  const escape = (value) => String(value).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  const file = path.relative(cwd, finding.file);
  return `::notice file=${file},line=${finding.line},col=${finding.column},title=grammar (${finding.kind})::${escape(`${finding.message} ("${finding.problem}")`)}`;
}

/**
 * @param {Object} options
 * @param {(text: string) => Promise<Object[]>} options.lint - Harper lints for a markdown document.
 * @param {string[]} [options.files] - markdown files; defaults to every post.
 * @param {boolean} [options.annotate] - also print GitHub Actions annotations.
 * @param {(line: string) => void} [options.write]
 * @returns {Promise<number>} number of findings (the script still exits 0).
 */
async function runCheck({ lint, files = [], annotate = false, write = (line) => process.stdout.write(`${line}\n`) }) {
  const targets = (files.length ? files : postFiles()).filter((file) => file.endsWith(".md"));
  let count = 0;

  for (const file of targets) {
    const text = fs.readFileSync(file, "utf8");
    for (const finding of toFindings(file, text, await lint(text))) {
      write(formatFinding(finding));
      if (annotate) write(formatAnnotation(finding));
      count += 1;
    }
  }

  write(count
    ? `grammar: ${count} suggestion(s) in ${targets.length} file(s) — advisory only, nothing is blocked.`
    : `grammar: no suggestions in ${targets.length} file(s).`);
  return count;
}

module.exports = { IGNORED_KINDS, postFiles, lineAndColumn, toFindings, formatFinding, formatAnnotation, runCheck };

/* istanbul ignore next -- loads the Harper WebAssembly linter (ES module) for the CLI */
if (require.main === module) {
  (async () => {
    const { LocalLinter } = await import("harper.js");
    const { binaryInlined } = await import("harper.js/binaryInlined");
    const linter = new LocalLinter({ binary: binaryInlined });
    await runCheck({
      lint: (text) => linter.lint(text, { language: "markdown" }),
      files: process.argv.slice(2),
      annotate: process.env.GITHUB_ACTIONS === "true",
    });
  })().catch((error) => {
    // Advisory: report a broken checker without failing the commit or the build.
    process.stderr.write(`grammar check skipped: ${error.message}\n`);
  });
}

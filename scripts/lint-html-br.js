#!/usr/bin/env node
/**
 * Enforce a single form of line-break void elements in public HTML/Markdown:
 * always `<br>`, never `<br/>`, `<br />`, `</br>`, or `<BR>`-style variants.
 */
const fs = require("fs");
const path = require("path");

const publicDir = process.env.MARINA_HTML_BR_LINT_ROOT
  ? path.resolve(process.env.MARINA_HTML_BR_LINT_ROOT)
  : path.join(__dirname, "..", "public");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) {
    return out;
  }
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(p, out);
    } else if (/\.(html|md)$/i.test(ent.name)) {
      out.push(p);
    }
  }
  return out;
}

function normalizeBrTags(content) {
  return (
    content
      // mistaken closing tag (invalid HTML)
      .replace(/<\/\s*br\s*>/gi, "")
      // XHTML-style void
      .replace(/<br\s*\/\s*>/gi, "<br>")
      // `<BR>`, `<Br>`, `<br  >`, etc. (no attributes)
      .replace(/<([bB])([rR])\s*>/g, "<br>")
  );
}

const fix = process.argv.includes("--fix");
const files = walk(publicDir);
let bad = 0;

for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  const after = normalizeBrTags(before);
  if (before === after) {
    continue;
  }
  bad += 1;
  if (fix) {
    fs.writeFileSync(file, after, "utf8");
    process.stdout.write(`fixed: ${path.relative(process.cwd(), file)}\n`);
  } else {
    process.stdout.write(
      `non-canonical <br> usage: ${path.relative(process.cwd(), file)}\n` +
        "  run: node scripts/lint-html-br.js --fix\n",
    );
  }
}

if (bad && !fix) {
  process.exitCode = 1;
}

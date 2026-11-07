"use strict";

/**
 * vercel.json headers and the HTML they protect: the CSP forbids inline script and inline style,
 * so no page may rely on either.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const config = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf8"));

function htmlFiles(dir = path.join(ROOT, "public")) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((ent) => {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) return htmlFiles(p);
    return ent.name.endsWith(".html") ? [p] : [];
  });
}

function header(name) {
  const all = config.headers.find((h) => h.source === "/(.*)");
  return all.headers.find((h) => h.key === name)?.value;
}

test("vercel.json sends security headers on every path", () => {
  expect(header("X-Content-Type-Options")).toBe("nosniff");
  // matrix.nullstar.fun embeds this site in an iframe, so framing is restricted via CSP instead of denied.
  expect(header("X-Frame-Options")).toBeUndefined();
  expect(header("Strict-Transport-Security")).toContain("max-age=63072000");
  const csp = header("Content-Security-Policy");
  expect(csp).toContain("default-src 'self'");
  expect(csp).toContain("script-src 'self';");
  expect(csp).not.toContain("unsafe-inline");
  expect(csp).toContain("frame-ancestors 'self' https://matrix.nullstar.fun");
});

test("pages have no inline scripts, handlers, styles or javascript: URLs", () => {
  const files = htmlFiles();
  expect(files.length).toBeGreaterThan(3);
  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const rel = path.relative(ROOT, file);
    expect([rel, html.match(/\son[a-z]+="/)?.[0]]).toEqual([rel, undefined]);
    expect([rel, html.match(/\sstyle="/)?.[0]]).toEqual([rel, undefined]);
    expect([rel, html.match(/<style[\s>]/)?.[0]]).toEqual([rel, undefined]);
    expect([rel, html.includes("javascript:")]).toEqual([rel, false]);
    for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
      expect([rel, /\ssrc="/.test(attrs), body.trim()]).toEqual([rel, true, ""]);
    }
  }
});

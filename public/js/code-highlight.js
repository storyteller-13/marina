"use strict";

/**
 * A small syntax highlighter for the blog's code blocks. It is served from the site itself, so it
 * works under the strict CSP (no third-party scripts).
 *
 *   detectLanguage(text)      -> "python" | "typescript" | "javascript" | "rust" | "bash" | "json" | "", for untagged blocks
 *   normalizeLanguage(tag)    -> the language a fence tag means ("py" -> "python"), or "" if unsupported
 *   highlightCode(text, lang) -> escaped HTML with <span class="tok-*"> around tokens
 *
 * Token classes: kw (keyword), str, com (comment), num, const (True/null...), builtin, type, fn (call or
 * command), title (name being defined), dec (decorator), var (shell variable), flag (--option), key.
 */

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeCode = (text) => text.replace(/[&<>"']/g, (c) => ESCAPES[c]);
const words = (list) => new Set(list.split(/\s+/));

const PYTHON = {
  rules: [
    ["com", /#[^\n]*/y],
    ["str", /[rRbBuUfF]{0,2}(?:"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$))/y],
    ["str", /[rRbBuUfF]{0,2}(?:"(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?)/y],
    ["dec", /@[A-Za-z_][\w.]*/y],
    ["num", /(?:0[xob][\da-f_]+|\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?j?)/iy],
  ],
  keywords: words(`and as assert async await break class continue def del elif else except finally for from
    global if import in is lambda nonlocal not or pass raise return try while with yield match case`),
  constants: words("True False None"),
  builtins: words(`self cls print len range dict list str int float bool set tuple super isinstance open
    enumerate zip map filter sorted min max sum any all type object Exception ValueError TypeError KeyError`),
  types: words(""),
  titleAfter: words("def class"),
  calls: true,
  capitalTypes: true,
};

const TYPESCRIPT = {
  rules: [
    ["com", /\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/y],
    ["str", /`(?:[^`\\]|\\[\s\S])*`?/y],
    ["str", /"(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?/y],
    ["dec", /@[A-Za-z_$][\w$.]*/y],
    ["num", /(?:0[xob][\da-f_]+|\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?n?)/iy],
  ],
  keywords: words(`abstract as async await break case catch class const continue debugger declare default
    delete do else enum export extends finally for from function get if implements import in instanceof
    interface keyof let namespace new of private protected public readonly return satisfies set static
    super switch throw try type typeof var void while with yield`),
  constants: words("true false null undefined this NaN Infinity"),
  builtins: words("console window document JSON Math Object process require module globalThis"),
  types: words("string number boolean any unknown never object symbol bigint Promise Record Partial Array Map Set Date Error"),
  titleAfter: words("function class interface type enum"),
  calls: true,
  capitalTypes: true,
};

const RUST = {
  rules: [
    ["com", /\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/y],
    ["str", /b?r#*"[\s\S]*?"#*|b?"(?:[^"\\]|\\[\s\S])*"?/y],
    ["str", /b?'(?:\\.|[^\\'\n])'/y],
    ["type", /'[A-Za-z_]\w*/y],
    ["dec", /#!?\[[^\]\n]*\]?/y],
    ["num", /(?:0[xob][\da-f_]+|\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?)(?:[iu](?:8|16|32|64|128|size)|f32|f64)?/iy],
  ],
  keywords: words(`as async await break const continue crate dyn else enum extern fn for if impl in let loop match mod
    move mut pub ref return static struct super trait type unsafe use where while`),
  constants: words("true false self Self None Some Ok Err"),
  builtins: words(""),
  types: words("i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 bool char str String Vec Option Result Box Rc Arc HashMap"),
  titleAfter: words("fn struct enum trait mod"),
  calls: true,
  macros: true,
  capitalTypes: true,
};

const BASH = {
  rules: [
    ["com", /(?<![^\s])#[^\n]*/y],
    ["str", /"(?:[^"\\]|\\[\s\S])*"?|'[^']*'?/y],
    ["var", /\$(?:\{[^}\n]*\}?|\(|[\w@#?$!*-]+)/y],
    ["flag", /(?<=\s)--?\w[\w-]*/y],
  ],
  ident: /[A-Za-z_][\w.+-]*/y,
  keywords: words("if then else elif fi for while until do done case esac in function return export local readonly select"),
  constants: words("true false"),
  builtins: words("echo cd source alias set unset exit eval exec read printf test"),
  types: words(""),
  titleAfter: words("function"),
  commands: true,
};

const JSON_SPEC = {
  rules: [
    ["key", /"(?:[^"\\\n]|\\.)*"(?=\s*:)/y],
    ["str", /"(?:[^"\\\n]|\\.)*"?/y],
    ["num", /-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/iy],
  ],
  keywords: words(""),
  constants: words("true false null"),
  builtins: words(""),
  types: words(""),
  titleAfter: words(""),
};

const YAML = {
  rules: [
    ["com", /(?<![^\s])#[^\n]*/y],
    ["key", /(?<=(?:^|\n)[ \t]*(?:-[ \t]+)?)[\w.-]+(?=:(?:[ \t]|\n|$))/y],
    ["str", /"(?:[^"\\\n]|\\.)*"?|'[^'\n]*'?/y],
    ["num", /-?\d+(?:\.\d+)?(?![\w.])/y],
  ],
  keywords: words(""),
  constants: words("true false null yes no"),
  builtins: words(""),
  types: words(""),
  titleAfter: words(""),
};

const INI = {
  rules: [
    ["com", /(?<=(?:^|\n)[ \t]*)[;#][^\n]*/y],
    ["title", /(?<=(?:^|\n)[ \t]*)\[[^\]\n]*\]/y],
    ["key", /(?<=(?:^|\n)[ \t]*)[\w.-]+(?=[ \t]*=)/y],
    ["str", /"(?:[^"\\\n]|\\.)*"?|'[^'\n]*'?/y],
    ["num", /-?\d+(?:\.\d+)?(?![\w.])/y],
  ],
  keywords: words(""),
  constants: words("true false"),
  builtins: words(""),
  types: words(""),
  titleAfter: words(""),
};

const SPECS = { python: PYTHON, typescript: TYPESCRIPT, javascript: TYPESCRIPT, rust: RUST, bash: BASH, json: JSON_SPEC, yaml: YAML, ini: INI };

const ALIASES = {
  py: "python", python: "python", python3: "python",
  ts: "typescript", typescript: "typescript", tsx: "typescript",
  js: "javascript", javascript: "javascript", jsx: "javascript", mjs: "javascript", node: "javascript",
  rs: "rust", rust: "rust",
  sh: "bash", bash: "bash", shell: "bash", zsh: "bash", console: "bash",
  json: "json", jsonc: "json",
  yaml: "yaml", yml: "yaml",
  ini: "ini", toml: "ini", cfg: "ini", conf: "ini",
};

function normalizeLanguage(tag) {
  return ALIASES[String(tag || "").trim().toLowerCase()] || "";
}

const DEFAULT_IDENT = /[A-Za-z_$][\w$]*/y;

/** True when the word at `start` begins a shell command: first on its line, or after | ; & ( ` or a $ prompt. */
function atCommandStart(text, start) {
  let j = start - 1;
  while (j >= 0 && (text[j] === " " || text[j] === "\t")) j -= 1;
  return j < 0 || "\n|;&(`$".includes(text[j]);
}

function classifyWord(spec, word, prevWord, text, start) {
  if (spec.keywords.has(word)) return "kw";
  if (spec.constants.has(word)) return "const";
  if (spec.titleAfter.has(prevWord)) return "title";
  if (spec.builtins.has(word)) return "builtin";
  if (spec.types.has(word)) return "type";
  if (spec.commands && atCommandStart(text, start)) return "fn";
  const after = text.slice(start + word.length, start + word.length + 40);
  if (spec.calls && /^\s*\(/.test(after)) return "fn";
  if (spec.macros && after.startsWith("!")) return "fn"; // println!(...), vec![...]
  if (spec.capitalTypes && /^[A-Z][a-z\d]/.test(word)) return "type";
  return "";
}

function highlightCode(text, lang) {
  const spec = SPECS[normalizeLanguage(lang)];
  if (!spec) return escapeCode(text);
  const ident = spec.ident || DEFAULT_IDENT;
  const out = [];
  let i = 0;
  let prevWord = "";
  const push = (cls, value) => out.push(cls ? `<span class="tok-${cls}">${escapeCode(value)}</span>` : escapeCode(value));

  while (i < text.length) {
    const rule = spec.rules.find(([, re]) => {
      re.lastIndex = i;
      return re.test(text) && re.lastIndex > i;
    });
    if (rule) {
      const end = rule[1].lastIndex;
      push(rule[0], text.slice(i, end));
      i = end;
      prevWord = "";
      continue;
    }
    ident.lastIndex = i;
    const match = ident.exec(text);
    if (match) {
      const word = match[0];
      push(classifyWord(spec, word, prevWord, text, i), word);
      prevWord = word;
      i += word.length;
      continue;
    }
    const ch = text[i];
    if (!/\s/.test(ch)) prevWord = "";
    push("", ch);
    i += 1;
  }
  return out.join("");
}

const count = (re, text) => (text.match(re) || []).length;

/**
 * Name the language of an untagged code block, or "" when it isn't clearly one we know.
 * Conservative on purpose: pseudocode, diagrams, math and prose stay plain.
 */
function detectLanguage(text) {
  const src = String(text || "");
  const lines = src.split("\n").filter((l) => l.trim());
  if (!lines.length) return "";
  // Textbook pseudocode (AIMA style: "function GENETIC-ALGORITHM(...) returns", "x ← ...") is not code.
  if (/←/.test(src) || /^\s*(?:function|procedure)\s+[A-Z][A-Z\d]*-[A-Z-]*\s*\(/m.test(src)) return "";
  // Box-drawing diagrams ("──▶", "│", "└──") are not code either.
  if (count(/[\u2500-\u257F\u25B6]/g, src) > 3) return "";

  const trimmed = src.trim();
  if (/^[[{]/.test(trimmed)) {
    try {
      JSON.parse(trimmed);
      return "json";
    } catch {
      /* not JSON; keep looking */
    }
  }

  const py =
    3 * count(/^\s*def \w+\s*\(.*\)\s*(?:->\s*[^:]+)?:\s*$/gm, src) +
    3 * count(/^\s*class \w+(?:\(.*\))?:\s*$/gm, src) +
    3 * count(/^\s*from [\w.]+ import /gm, src) +
    2 * count(/^\s*import [\w.]+(?:\s+as\s+\w+)?\s*$/gm, src) +
    2 * Math.min(count(/\bself\.\w/g, src), 2) +
    2 * Math.min(count(/^\s*(?:if|elif|for|while|with|try|except|else)\b[^\n]*:\s*$/gm, src), 2) +
    Math.min(count(/\b(?:None|True|False)\b/g, src), 2) +
    Math.min(count(/\bprint\(/g, src), 1) +
    Math.min(count(/^\s*@\w+/gm, src), 1) +
    // keyword arguments, f(name=value), don't exist in JS/TS; "# " comment lines
    2 * Math.min(count(/[(,]\s*[a-z_]\w*=(?!=)/g, src), 2) +
    Math.min(count(/^\s*#\s/gm, src), 2);

  const ts =
    3 * count(/^\s*(?:export\s+)?(?:interface\s+\w+|type\s+\w+\s*(?:<[^>]*>)?\s*=)/gm, src) +
    3 * Math.min(count(/\w\??\s*:\s*(?:string|number|boolean|void|any|unknown|Promise<|Record<)/g, src), 2) +
    2 * Math.min(count(/\b(?:const|let|var)\s+[\w{[]/g, src), 2) +
    2 * Math.min(count(/=>/g, src), 2) +
    2 * count(/^\s*import\s[^\n]*\bfrom\s+['"]|\brequire\(['"]/gm, src) +
    2 * count(/^\s*(?:export\s+)?(?:async\s+)?function\s*\w*\s*\([^)]*\)[^\n]*\{/gm, src) +
    Math.min(count(/;\s*$/gm, src), 2) +
    Math.min(count(/\bconsole\.\w+/g, src), 1);

  const rust =
    3 * count(/^\s*(?:pub\s+)?(?:async\s+)?fn\s+\w+/gm, src) +
    3 * count(/^\s*(?:pub\s+)?use\s+[\w:]+::/gm, src) +
    3 * count(/^\s*(?:pub\s+)?(?:struct|enum|trait|impl)\b[^\n]*\{?\s*$/gm, src) +
    2 * Math.min(count(/\blet\s+mut\b|&mut\b|&self\b|\w!\(|\bSome\(|\bOk\(/g, src), 2) +
    3 * Math.min(count(/\w::\w/g, src), 1) + // a::b paths never appear in JS/TS or Python
    3 * Math.min(count(/\b[A-Z]\w*\s*\{\s*\w+:/g, src), 2) + // struct literals: Position { x: 0.0 }
    Math.min(count(/\w::\w/g, src), 2);
  if (rust >= 3 && rust >= py && rust >= ts) return "rust";

  if (Math.max(py, ts) >= 3 && py !== ts) {
    if (py > ts) return "python";
    const typed =
      /^\s*(?:export\s+)?(?:interface|type)\s+\w+|\w\??\s*:\s*(?:string|number|boolean|void|any|unknown|Promise<|Record<)|\b(?:const|let|var)\s+\w+\s*:\s*[A-Za-z]/m;
    return typed.test(src) ? "typescript" : "javascript";
  }

  const shellLine = /^\s*(?:\$\s+)?(?:npm|npx|pnpm|yarn|pip3?|uv|brew|git|cd|curl|wget|docker|sudo|apt(?:-get)?|make|python3?|cargo|go|kubectl|export|echo|mkdir|ls|cat|chmod|source|ssh|tar|unzip)\b/;
  if (lines.filter((l) => shellLine.test(l)).length / lines.length >= 0.6) return "bash";
  return "";
}

globalThis.MarinaHighlight = { normalizeLanguage, detectLanguage, highlightCode };

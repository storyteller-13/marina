"use strict";

require("../../public/js/code-highlight.js");

const { normalizeLanguage, detectLanguage, highlightCode } = globalThis.MarinaHighlight;
const tok = (cls, text) => `<span class="tok-${cls}">${text}</span>`;
const plainText = (html) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

test("normalizeLanguage maps fence tags to supported languages", () => {
  expect(normalizeLanguage("py")).toBe("python");
  expect(normalizeLanguage(" TypeScript ")).toBe("typescript");
  expect(normalizeLanguage("tsx")).toBe("typescript");
  expect(normalizeLanguage("js")).toBe("javascript");
  expect(normalizeLanguage("rs")).toBe("rust");
  expect(normalizeLanguage("shell")).toBe("bash");
  expect(normalizeLanguage("yml")).toBe("yaml");
  expect(normalizeLanguage("toml")).toBe("ini");
  expect(normalizeLanguage("jsonc")).toBe("json");
  expect(normalizeLanguage("💡")).toBe("");
  expect(normalizeLanguage(undefined)).toBe("");
});

test("highlightCode escapes everything and leaves unknown languages plain", () => {
  expect(highlightCode('<b> & "x"', "nope")).toBe("&lt;b&gt; &amp; &quot;x&quot;");
  expect(highlightCode("", "python")).toBe("");
});

test("python tokens", () => {
  const src = [
    "@dataclass",
    "class Memory(BaseModel):",
    '    """Doc',
    '    string"""',
    "    def add(self, text: str, n=0x1F, x=1.5e3) -> None:",
    "        # keep it",
    "        print(f'{text}', b\"raw\", len(text))",
    "        return True and value",
    "x = '''never closed",
  ].join("\n");
  const html = highlightCode(src, "python");
  expect(plainText(html)).toBe(src);
  expect(html).toContain(tok("dec", "@dataclass"));
  expect(html).toContain(`${tok("kw", "class")} ${tok("title", "Memory")}`);
  expect(html).toContain(tok("type", "BaseModel"));
  expect(html).toContain(tok("str", "&quot;&quot;&quot;Doc\n    string&quot;&quot;&quot;"));
  expect(html).toContain(`${tok("kw", "def")} ${tok("title", "add")}`);
  expect(html).toContain(tok("builtin", "self"));
  expect(html).toContain(tok("num", "0x1F"));
  expect(html).toContain(tok("num", "1.5e3"));
  expect(html).toContain(tok("const", "None"));
  expect(html).toContain(tok("com", "# keep it"));
  expect(html).toContain(tok("str", "f&#39;{text}&#39;"));
  expect(html).toContain(tok("str", "b&quot;raw&quot;"));
  expect(html).toContain(tok("builtin", "print"));
  expect(html).toContain(tok("const", "True"));
  expect(html).toContain(" value");
  expect(html).toContain(tok("str", "&#39;&#39;&#39;never closed"));
});

test("typescript / javascript tokens", () => {
  const src = [
    "/* block */ // line",
    "@Component()",
    "export interface Agent { name: string }",
    "const run = async (n: number): Promise<void> => {",
    "  console.log(`hi ${n}`, 'a', \"b\", 10n, 3.5);",
    "  return new Agent(null);",
    "};",
    "function go() {}",
  ].join("\n");
  const html = highlightCode(src, "typescript");
  expect(plainText(html)).toBe(src);
  expect(html).toContain(tok("com", "/* block */"));
  expect(html).toContain(tok("com", "// line"));
  expect(html).toContain(tok("dec", "@Component"));
  expect(html).toContain(`${tok("kw", "interface")} ${tok("title", "Agent")}`);
  expect(html).toContain(tok("type", "string"));
  expect(html).toContain(tok("type", "Promise"));
  expect(html).toContain(tok("builtin", "console"));
  expect(html).toContain(tok("fn", "log"));
  expect(html).toContain(tok("str", "`hi ${n}`"));
  expect(html).toContain(tok("num", "10n"));
  expect(html).toContain(tok("const", "null"));
  expect(html).toContain(`${tok("kw", "function")} ${tok("title", "go")}`);
  expect(highlightCode("const a = 1;", "javascript")).toContain(tok("kw", "const"));
});

test("rust tokens", () => {
  const src = [
    "#[derive(Debug)]",
    "pub struct Pos<'a> { x: f32 }",
    "fn main() {",
    "    let c = 'x';",
    '    let s = r#"raw"#;',
    '    println!("{}", 42u64);',
    "    let v = Vec::new();",
    "}",
  ].join("\n");
  const html = highlightCode(src, "rust");
  expect(plainText(html)).toBe(src);
  expect(html).toContain(tok("dec", "#[derive(Debug)]"));
  expect(html).toContain(`${tok("kw", "struct")} ${tok("title", "Pos")}`);
  expect(html).toContain(tok("type", "&#39;a"));
  expect(html).toContain(tok("type", "f32"));
  expect(html).toContain(tok("str", "&#39;x&#39;"));
  expect(html).toContain(tok("str", "r#&quot;raw&quot;#"));
  expect(html).toContain(tok("fn", "println"));
  expect(html).toContain(tok("num", "42u64"));
  expect(html).toContain(tok("type", "Vec"));
  expect(html).toContain(tok("fn", "new"));
});

test("bash tokens", () => {
  const src = [
    "# install",
    'brew install --cask iterm2 -v "x y" \'z\'',
    "export PATH=$HOME/bin:${PATH} && echo $(date) | grep -i done",
    "$ npm ci",
    "if true; then cd ~; fi # trailing",
    "curl https://x.io/a#frag",
  ].join("\n");
  const html = highlightCode(src, "bash");
  expect(plainText(html)).toBe(src);
  expect(html).toContain(tok("com", "# install"));
  expect(html).toContain(tok("fn", "brew"));
  expect(html).toContain(tok("flag", "--cask"));
  expect(html).toContain(tok("flag", "-v"));
  expect(html).toContain(tok("str", "&quot;x y&quot;"));
  expect(html).toContain(tok("str", "&#39;z&#39;"));
  expect(html).toContain(tok("kw", "export"));
  expect(html).toContain(tok("var", "$HOME"));
  expect(html).toContain(tok("var", "${PATH}"));
  expect(html).toContain(tok("builtin", "echo"));
  expect(html).toContain(`${tok("var", "$(")}${tok("fn", "date")}`);
  expect(html).toContain(tok("fn", "grep"));
  expect(html).toContain(tok("fn", "npm"));
  expect(html).toContain(tok("const", "true"));
  expect(html).toContain(tok("com", "# trailing"));
  expect(html).toContain("x.io/a#frag");
});

test("json, yaml and ini tokens", () => {
  const json = highlightCode('{"name": "marina", "n": -1.5e2, "ok": true, "x": null}', "json");
  expect(json).toContain(tok("key", "&quot;name&quot;"));
  expect(json).toContain(tok("str", "&quot;marina&quot;"));
  expect(json).toContain(tok("num", "-1.5e2"));
  expect(json).toContain(tok("const", "true"));

  const yamlSrc = "# ci\non:\n  push:\n    branches: [main]\njobs:\n  - name: 'x' # note\n    retries: 3\n    fast: true\n    say: \"hi\"";
  const yaml = highlightCode(yamlSrc, "yaml");
  expect(plainText(yaml)).toBe(yamlSrc);
  expect(yaml).toContain(tok("com", "# ci"));
  expect(yaml).toContain(tok("key", "on"));
  expect(yaml).toContain(tok("key", "branches"));
  expect(yaml).toContain(tok("key", "name"));
  expect(yaml).toContain(tok("str", "&#39;x&#39;"));
  expect(yaml).toContain(tok("num", "3"));
  expect(yaml).toContain(tok("const", "true"));
  expect(yaml).toContain(tok("str", "&quot;hi&quot;"));

  const iniSrc = "; c\n[core]\neditor = vim\n# more\nport = 8080\nname = \"x\"\non = true";
  const ini = highlightCode(iniSrc, "ini");
  expect(plainText(ini)).toBe(iniSrc);
  expect(ini).toContain(tok("com", "; c"));
  expect(ini).toContain(tok("title", "[core]"));
  expect(ini).toContain(tok("key", "editor"));
  expect(ini).toContain(tok("num", "8080"));
  expect(ini).toContain(tok("str", "&quot;x&quot;"));
  expect(ini).toContain(tok("const", "true"));
});

test("detectLanguage recognises python, typescript, javascript, rust, bash and json", () => {
  expect(detectLanguage("from mem0 import MemoryClient\nclient = MemoryClient()")).toBe("python");
  expect(detectLanguage("def f(x):\n    return x")).toBe("python");
  expect(detectLanguage("# save it\nmem.add(\n    text,\n    user_id=uid,\n    infer=False,\n)")).toBe("python");
  expect(detectLanguage("interface A { x: string }\nconst a: A = { x: '1' };")).toBe("typescript");
  expect(detectLanguage("const memorizer: SubAgent = {\n  mode: 'fork',\n};")).toBe("typescript");
  expect(detectLanguage('import { join } from "node:path";\nconst p = join("a", "b");')).toBe("javascript");
  expect(detectLanguage("use std::time::Duration;\nfn main() {}")).toBe("rust");
  expect(detectLanguage("let mut s = Schedule::default();")).toBe("rust");
  expect(detectLanguage("let p = world.spawn((Position { x: 0.0 }, Velocity { x: 1.0 }));")).toBe("rust");
  expect(detectLanguage("brew install lima\nlimactl start")).toBe("");
  expect(detectLanguage("$ npm ci\nnpm test\n")).toBe("bash");
  expect(detectLanguage('{"a": [1, 2]}')).toBe("json");
});

test("detectLanguage leaves pseudocode, diagrams, prose, ties and empty blocks plain", () => {
  expect(detectLanguage("")).toBe("");
  expect(detectLanguage(null)).toBe("");
  expect(detectLanguage("  \n ")).toBe("");
  expect(detectLanguage("function TREE-SEARCH(problem) returns a solution\n\tloop do")).toBe("");
  expect(detectLanguage("x ← RANDOM(population)\ndef f():\n  pass")).toBe("");
  expect(detectLanguage("raw ──▶ Extract ──▶ Load\n  │      │\n  └──────┘")).toBe("");
  expect(detectLanguage("{ not: json")).toBe("");
  expect(detectLanguage("score = (0.4 * similarity) + recency")).toBe("");
  expect(detectLanguage("1. Tokenization; split text\n2. BPE")).toBe("");
  // Equal Python and JS evidence: don't guess.
  expect(detectLanguage("from a import b\nconst x = 1;")).toBe("");
});

# marina

<br>

* static site for **marina.nullstar.fun**
* content lives in `public/` and is served as-is

## running this page locally

<br>

```bash
make server
```

then open [localhost:8037](http://localhost:8037).

<br>

## pre-commit (tests + linters)

<br>

- a pre-commit hook runs **tests** (pytest), **Python linter** (Ruff), **JS linter** (ESLint), and **`scripts/lint-html-br.js`** (canonical `<br>` only in `public/**/*.html` and `public/**/*.md`). HTML validation is disabled (requires Java); run manually: `html5validator public/` if needed.
- setup: `pip install -r requirements-dev.txt` (or `pip install pre-commit`), then `pre-commit install`. Node.js required for the ESLint hook.
- run manually: `make test`, `make lint`, or `pre-commit run --all-files`.

<br>

## tests and lint

<br>

- tests: `tests/test_lint_html_br.py` (pytest). Run: `make test`.
- lint: `make lint` runs Ruff, ESLint, and the `html-br` pre-commit hook (`scripts/lint-html-br.js`).
- CI: GitHub Action runs `pre-commit run --all-files` on push/PR to main/master (see `.github/workflows/ci.yml`).

<br>

## layout

<br>

- `public/` — static assets (HTML, CSS, JS, images).
- `make blog-sync` or `make blog-link` — same command: regenerates `public/blog/posts.json` and `public/blog/drafts.json` from `public/blog/posts/*.md` and `public/blog/drafts/*.md` (see `scripts/sync-blog-posts.py`).
- `eslint.config.js` — ESLint flat config (JS). Ruff used for Python (no config file; pre-commit + CI).

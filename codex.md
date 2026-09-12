# marina — project codex

Short reference for how this repo is built and run.

## commands

| Command | What it does |
|--------|----------------|
| `make server` | Serve site at http://localhost:8037 |
| `make test` | Pytest + Jest; both require 100% coverage |
| `make lint` | Ruff + ESLint + Stylelint + html `<br>` check via pre-commit |

## pre-commit

On each commit, in order: **test** (pytest + jest, 100% coverage) → **html-br** → **stylelint** → **ruff** → **eslint**.

- Install: `pip install -r requirements-dev.txt && npm install && pre-commit install`
- Run all hooks: `pre-commit run --all-files`

## structure

- **public/** — static site (HTML, CSS, JS, images). Served as-is.
- **scripts/lint-html-br.js** — enforce canonical `<br>` in `public/**/*.html` and `public/**/*.md`.
- **scripts/sync-blog-posts.py** — rebuild `posts.json` / `drafts.json` from markdown.
- **tests/** — pytest (`test_*.py`) and Jest (`tests/js/*.test.js`).
- **requirements-dev.txt** — pytest, pytest-cov, pre-commit, ruff.
- **package.json** — Jest, ESLint, Stylelint, jsdom.

## conventions

- Python: Ruff (no project config). Coverage via `pyproject.toml` (fail under 100%).
- JS: ESLint, see `eslint.config.js`. Coverage via `jest.config.js` (fail under 100%).
- CSS: Stylelint, see `stylelint.config.js` (ignores minified vendor CSS).
- CI: `.github/workflows/ci.yml` runs `npm ci` then pre-commit on push/PR to main/master.

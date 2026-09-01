# marina — project codex

Short reference for how this repo is built and run.

## commands

| Command | What it does |
|--------|----------------|
| `make server` | Serve site at http://localhost:8037 |
| `make test` | Run pytest in `tests/` |
| `make lint` | Ruff + ESLint + html `<br>` check via pre-commit |

## pre-commit

On each commit, in order: **test** → **html-br** → **ruff** → **eslint**.

- Install: `pip install -r requirements-dev.txt` then `pre-commit install`
- Run all hooks: `pre-commit run --all-files`

## structure

- **public/** — static site (HTML, CSS, JS, images). Served as-is.
- **scripts/lint-html-br.js** — enforce canonical `<br>` in `public/**/*.html` and `public/**/*.md`.
- **tests/** — pytest (e.g. `test_lint_html_br.py`).
- **requirements-dev.txt** — pytest, pre-commit, ruff (for local/CI).

## conventions

- Python: Ruff (no project config). JS: ESLint, see `eslint.config.js`.
- CI: `.github/workflows/ci.yml` runs pre-commit on push/PR to main/master.

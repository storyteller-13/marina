.PHONY: setup install server test lint grammar blog check-generated check clean

PORT ?= 8037
PYTHON := python3

setup: install

install:
	python3 -m pip install -r requirements-dev.txt
	npm install
	pre-commit install

server:
	@echo "👾 starting development server on http://localhost:$(PORT)"
	cd public && $(PYTHON) -m http.server $(PORT) --bind 127.0.0.1

test:
	python3 -m pytest tests/ -v
	npm test

lint:
	pre-commit run ruff-check --all-files
	pre-commit run eslint --all-files
	pre-commit run html-br --all-files
	pre-commit run html-validate --all-files
	pre-commit run stylelint --all-files

grammar:
	node scripts/check-grammar.js

blog:
	python3 scripts/sync-blog-posts.py

check-generated:
	@set -eu; \
	before=$$(mktemp); after=$$(mktemp); \
	trap 'rm -f "$$before" "$$after"' EXIT; \
	snapshot() { \
		find public/blog -maxdepth 1 -type f \
			\( -name '*.html' -o -name 'posts.json' -o -name 'drafts.json' \) \
			-print0 | sort -z | xargs -0 -r sha256sum; \
		sha256sum public/index.xml; \
	}; \
	snapshot > "$$before"; \
	$(PYTHON) scripts/sync-blog-posts.py; \
	snapshot > "$$after"; \
	if ! cmp -s "$$before" "$$after"; then \
		echo "Generated blog output is stale; run 'make blog' and include the results."; \
		exit 1; \
	fi

check: blog lint test grammar check-generated

clean:
	rm -rf node_modules .pytest_cache .ruff_cache .mypy_cache .pre-commit-cache \
		.coverage .coverage.* coverage htmlcov dist build *.egg-info .eggs
	find . -type d -name '__pycache__' -prune -exec rm -rf {} +
	find . -type f \( -name '*.py[cod]' -o -name '*.pyo' \) -delete

.PHONY: setup install server test lint grammar blog check-generated clean

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
	pre-commit run stylelint --all-files

grammar:
	node scripts/check-grammar.js

blog:
	python3 scripts/sync-blog-posts.py

check-generated: blog
	git diff --exit-code -- public/blog/posts.json public/blog/drafts.json public/blog/*.html public/index.xml

clean:
	rm -rf node_modules .pytest_cache .ruff_cache .mypy_cache .pre-commit-cache \
		.coverage .coverage.* coverage htmlcov dist build *.egg-info .eggs
	find . -type d -name '__pycache__' -prune -exec rm -rf {} +
	find . -type f \( -name '*.py[cod]' -o -name '*.pyo' \) -delete

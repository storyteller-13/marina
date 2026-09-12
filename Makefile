.PHONY: setup server test lint blog

setup:
	python3 -m pip install -r requirements-dev.txt
	npm install
	pre-commit install

server:
	@echo "server running at http://localhost:8037"
	cd public && python3 -m http.server 8037

test:
	python3 -m pytest tests/ -v
	npm test

lint:
	pre-commit run ruff --all-files
	pre-commit run eslint --all-files
	pre-commit run html-br --all-files
	pre-commit run stylelint --all-files

# Rebuild public/blog/posts.json and public/blog/drafts.json from markdown under posts/ and drafts/.
blog:
	python3 scripts/sync-blog-posts.py

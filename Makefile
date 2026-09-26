.PHONY: setup server test lint blog clean

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

clean:
	rm -rf node_modules .pytest_cache .ruff_cache .mypy_cache .pre-commit-cache \
		.coverage .coverage.* coverage htmlcov dist build *.egg-info .eggs
	find . -type d -name '__pycache__' -prune -exec rm -rf {} +
	find . -type f \( -name '*.py[cod]' -o -name '*.pyo' \) -delete

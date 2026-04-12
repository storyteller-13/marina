.PHONY: server test lint blog-sync blog-link
server:
	cd public && python3 -m http.server 8037
	echo "server running at http://localhost:8037"

test:
	python3 -m pytest tests/ -v

lint:
	pre-commit run ruff --all-files
	pre-commit run eslint --all-files
	pre-commit run html-br --all-files

# Rebuild public/blog/posts.json and public/blog/drafts.json from markdown under posts/ and drafts/.
blog-sync blog-link:
	python3 scripts/sync-blog-posts.py

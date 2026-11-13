# Working in this repository

This is a static website. Read the README before making structural changes.

## Source of truth

- Edit published posts in `public/blog/posts/*.md`; edit the home page in `public/index.html`.
- Treat `public/blog/*.html`, `public/blog/posts.json`, `public/blog/drafts.json`, and `public/index.xml` as generated files. Change their source/template or generator, then run `make blog`.
- Keep build-time and browser Markdown behavior aligned: `scripts/render-blog-posts.js` invokes the parser in `public/js/blog-post.js`.
- Preserve the existing CSP in `vercel.json`; pages must not add inline scripts, event handlers, or styles.

## Useful commands

- `make server` serves the site locally.
- `make blog` regenerates post pages, indexes, and RSS.
- `make check-generated` rebuilds and reports stale generated output.
- `make test`, `make lint`, and `make grammar` run the project checks; grammar output is advisory.

## Change discipline

- Keep changes focused and preserve the author's voice and existing visual language when editing content.
- When changing a generator, update its existing tests and any generated artifacts affected by the change.
- Add or update tests for changed behavior; avoid tests that depend on network access or mutate the working tree.
- Check `git status` before finishing so generated or unrelated files are accounted for.

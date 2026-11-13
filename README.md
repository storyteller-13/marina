# Marina's Technical Notes

Static personal site for [marina.nullstar.fun](https://marina.nullstar.fun), with a hand-authored home page and a Markdown-driven blog.

## Local development

Requirements: Python 3.12+, Node.js 24+, npm, and pre-commit.

```sh
make install       # install Python/Node development tools and Git hooks
make blog          # regenerate indexes, RSS, and static post pages
make server        # serve public/ at http://localhost:8037
make test          # Python and JavaScript test suites
make lint          # linters and HTML conventions
make grammar       # advisory spelling/grammar suggestions
make check-generated # regenerate and fail if generated artifacts are stale
```

Set `PORT` to change the local server port, for example `make server PORT=9000`.

## Where things live

- `public/index.html`: hand-authored home page.
- `public/blog/posts/*.md`: source of published blog posts and their front matter.
- `public/blog/drafts/*.md`: local draft index inputs.
- `public/js/blog-post.js`: browser Markdown renderer and post enhancements. Build-time rendering uses this same parser.
- `scripts/sync-blog-posts.py`: builds post/draft indexes, the RSS feed, and one static HTML page per post.
- `scripts/render-blog-posts.js`: invokes the shared browser parser from Node for build-time rendering.
- `public/blog/*.html`, `public/blog/posts.json`, `public/blog/drafts.json`, and `public/index.xml`: generated outputs; edit their source/template instead.
- `public/pages/post.html`: shared shell/template for generated post pages and legacy `?post=` loading.
- `public/css/`: site styling; `public/images/` and `public/blog/assets/`: media.
- `tests/`: Python and Jest coverage; `.github/workflows/ci.yml` runs pre-commit and checks generated output.

## Publishing a post change

Edit the Markdown source, then run `make blog` and include the resulting generated files in the same change. `make check-generated` confirms the committed indexes, feed, and pages match their sources. Published posts are statically rendered, so they remain readable and indexable without client-side JavaScript; browser JavaScript adds code highlighting, copy buttons, and hash scrolling.

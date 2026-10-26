# Search and AI Discovery Refresh

**Status:** Staged for review. No release checkpoint or publication has been created.

## What changed

The public discovery layer now treats every canonical page as a first-class crawlable document. The production build generates a canonical sitemap, an AI-readable `llms.txt` inventory, a generated article-metadata source, and one static HTML metadata shell for each indexable public route. Search crawlers that do not execute JavaScript receive the same page-specific title, description, canonical URL, Open Graph data, Twitter metadata, language signals, and JSON-LD as browser clients.

The route inventory covers **25 non-article public pages** and **26 active articles**, for **51 canonical crawlable URLs**. Legacy article URLs remain excluded from the sitemap and continue to issue 301 redirects to their canonical replacements. Confirmation pages, the error route, and non-public legacy paths are excluded from the sitemap and receive `noindex, nofollow, noarchive` metadata and an `X-Robots-Tag` response header when served dynamically.

## Crawler access and AI discovery

`robots.txt` allows public crawling while excluding only `/api/`, `/__manus__/`, and `/404`. It now makes explicit access declarations for major search engines and AI retrieval systems, including Google, Bing, Apple, OpenAI, Anthropic, Perplexity, Meta, Mistral, Cohere, You.com, and Common Crawl. The canonical XML sitemap is referenced directly.

`llms.txt` is now generated from the active public route and article libraries. It describes the delivery model, makes the Catalys and actio relationship clear, uses the approved Energy Advantage data-capability wording, links every canonical page and active article, and gives current public contact details.

## Metadata and structured data

Each crawlable page receives a current Canadian English (`en-CA`) document language declaration, canonical URL, `hreflang` alternatives, robots directives, Open Graph tags, Twitter card tags, and a Schema.org graph for the organization, website, and page. Articles also receive article-specific Open Graph properties and Article JSON-LD, including publication details, author, section, tags, and image data.

## Validation completed

- `npx tsc --noEmit` passed.
- `pnpm build` passed and regenerated all discovery artifacts.
- Production-mode local responses passed for representative core pages, an article, the author page, an ICP page, confirmation pages, a missing page, and the legacy article redirect.
- Every active article was verified in `sitemap.xml`.
- The sitemap contains 51 canonical crawlable URLs, and the production output contains 51 corresponding pre-rendered metadata shells.
- Robots directives, sitemap, and `llms.txt` return the appropriate content types in production mode.
- `git diff --check` passed.

## Release state

The published baseline remains `7a0e52db` until an explicit publication instruction is given.

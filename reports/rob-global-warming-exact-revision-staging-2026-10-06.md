# Exact Rob Kirkby Article Revision: Staging Record

**Date:** 6 October 2026  
**Status:** Staged only. Not published.

## Scope

Updated the existing Rob Kirkby article at:

`/articles/why-global-warming-is-accelerating`

The title, subtitle, body text, section headings, byline identity, and eight source labels now match the supplied `pasted_content_8.txt` draft. No editorial rewriting was applied.

## Preserved Public Surfaces

- Canonical article URL and Rob Kirkby author route
- Existing documentary hero visual and Open Graph image
- Article sharing, related reading, and route-navigation features
- Existing evidence URLs, matched to the supplied source list
- Existing category and discovery tags

## Metadata and Discovery

- The article remains authored by **Rob Kirkby, Founder and CEO**.
- `updatedAt` is set to **2026-10-06** so crawlable article metadata and Schema.org output signal the revision.
- Reading time remains **6 min read**, calculated from the supplied 1,276-word body at the existing 200 words-per-minute convention.
- Sitemap, LLM inventory, generated SEO metadata, canonical metadata shells, Open Graph tags, and Article schema were regenerated during the production build.

## Exact-Copy Validation

A content-validation script loaded the article through the application data layer and compared its normalized sections and source labels against the supplied draft:

- **19** article sections matched
- **8** source labels matched
- Article title and subtitle matched
- Rob Kirkby’s byline and Founder and CEO role matched

Whitespace between paragraphs is rendered as editorial spacing; no words, punctuation, headings, or source labels were changed.

## Validation Completed

- `pnpm run generate:discovery` passed
- `npx tsc --noEmit` passed
- `pnpm test` passed: 5 files, 24 tests
- `pnpm build` passed
- `git diff --check` passed
- Production-server validation passed: HTTP 200, canonical URL, `article:modified_time` set to `2026-10-06`, and exact revised source labels present
- Desktop and mobile full-page visual review completed

## Publication Decision

No release checkpoint has been created. Publish only after an explicit instruction to release this staged revision.

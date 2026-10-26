# Article Freshness, Reading Progress, and Direct Sharing

**Status:** Staged for review. No publication checkpoint has been created.

## Delivered changes

Every current article now carries an editorial review date of **22 September 2026**. The public article header distinguishes the original publication date from the visible **Last updated** date, so readers can see that the research has been reviewed without obscuring its original context.

The same review date is now included in each article's Open Graph `article:modified_time`, Schema.org `dateModified`, generated crawler metadata, and sitemap `lastmod` value. The canonical decision guide was checked in the production server and returned the expected review date alongside its canonical URL.

The existing reading-progress bar remains fixed at the top of each article. Its colour and transition now match the navy-and-gold editorial system, it retains accessible progress semantics, and it disables transition motion for readers who prefer reduced motion.

The existing Copy link action has been made explicit and robust across article sharing surfaces. It copies the clean canonical article URL rather than a URL containing a query string or campaign parameter, preserves analytics attribution, and announces success to assistive technology. LinkedIn, X, native sharing, the floating desktop controls, and copied article excerpts now use the same canonical URL source.

During mobile review, the duplicate floating action stack overlapped the article headline. It is now hidden below 768 pixels because the fully labelled header sharing controls and article-end sharing module remain available there. Desktop floating controls remain available after a reader has progressed through an article.

## Validation

| Check | Result |
|---|---|
| TypeScript | Passed |
| Unit tests | Passed: 9 tests across 4 files |
| Production build | Passed |
| Generated article metadata | `modifiedTime: 2026-09-22` for all 26 articles |
| Sitemap | Canonical article `lastmod` values updated to `2026-09-22` |
| Production crawler response | Confirmed 200 response, canonical URL, `article:modified_time`, and Schema.org `dateModified` |
| Desktop review | Passed: header metadata, progress indicator, and visible copy-link control fit the editorial layout |
| Mobile review | Passed after removing overlapping floating controls; header content is unobstructed |

## Publication note

This is a content-freshness and sharing enhancement only. It does not alter article claims, authorship, source attribution, or the existing canonical article route structure.

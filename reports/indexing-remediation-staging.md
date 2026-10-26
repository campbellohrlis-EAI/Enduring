# Search Console Indexing Remediation

**Status:** Staged for review. No live publication checkpoint has been created.

## Finding

The Search Console notification combines two different types of URL exclusion:

| Search Console reason | Intended status | Public handling after remediation |
|---|---|---|
| **Page with redirect** | Intended for retired article and legacy decision URLs | Server returns a permanent `301` to the matching canonical route. Legacy URLs remain out of the sitemap. |
| **Excluded by `noindex` tag** | Intended for private form-success and error routes | Server returns both a page-level `noindex, nofollow, noarchive` directive and an `X-Robots-Tag` response header. These URLs remain out of the sitemap. |

The underlying deployment defect was separate: the static host was returning the generic homepage HTML shell for clean public URLs. That meant public article and sector pages could present a homepage title and canonical URL to crawlers, while the intended server redirects and response headers were not active.

## Remediation

The project has been upgraded to the managed Node-backed WebDev runtime. The public Express server remains the route authority and now:

- serves route-specific crawler-visible metadata for every known public route;
- returns a `404` plus `noindex` for unknown pages;
- issues permanent `301` redirects for legacy articles, `/investment-case`, and known trailing-slash variants;
- applies `noindex, nofollow, noarchive` as both HTML metadata and an `X-Robots-Tag` header for `/partners/thank-you` and `/checklist/thank-you`;
- proxies existing `/manus-storage/...` media paths through the managed runtime, preserving all current image references; and
- retains the verified Google Search Console HTML tag in the shared document head.

The new managed capability supplies its database, authentication, storage, and tRPC framework. The existing public site remains a public marketing site and does not require visitor sign-in or new data behaviour.

## Acceptance checks

| Route or behaviour | Expected result | Result |
|---|---|---|
| `/` | 200, homepage title, indexable canonical | Passed |
| `/about` | 200, About title, indexable canonical | Passed |
| `/articles/from-thousands-of-options-to-one-decision` | 200, article title, article canonical | Passed |
| `/partners/thank-you` | 200, noindex metadata and `X-Robots-Tag` | Passed |
| `/articles/from-options-to-one-decision` | 301 to canonical decision-guide article | Passed |
| `/investment-case` | 301 to `/services` | Passed |
| `/about/` | 301 to `/about` | Passed |
| `/manus-storage/ea-logo-v5_4fa83e5f.webp` | 307 managed-media redirect | Passed |
| TypeScript, unit tests, production build, diff checks | Clean | Passed |

`pnpm test` now includes unit coverage for crawler-path normalisation, canonical trailing-slash handling, and legacy redirect selection.

## Search Console actions after publication

1. In **Pages**, open each affected exclusion reason and review its URL samples. The URLs above are intentional if they match a form-success, missing, or retired route.
2. Click **Validate Fix** only after the published Node runtime is live. Search Console will recrawl and may take time to clear historical samples.
3. In **URL Inspection**, test the canonical decision guide and a sector page. Confirm that the rendered title and canonical URL match the inspected route.
4. Leave form-success and error URLs as noindex. Their exclusion is correct and protects conversion-flow pages from search results.
5. Keep submitting `https://enduringadvantage.com/sitemap.xml`, which contains only canonical public pages.

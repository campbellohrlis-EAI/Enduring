# Article Trust and Indexing Review

**Status:** Staged for review. This work has not been published.

## Article integrity

The article at `/articles/seven-of-nine-planetary-boundaries-business-decision` has been restored to the supplied draft. Its title is **“Seven of Nine”**, and the original headings, prose, quotations, figures, capitalization, and closing line have been preserved. The delivery work around the draft remains in place: it is dated **22 September 2026**, attributed to **Campbell Ohrlis, VP Partnerships**, listed in the research archive, included in the sitemap and `llms.txt`, and supported with canonical, Open Graph, Article schema, and source-citation metadata. The visible supplementary evidence-sources panel has been withheld so it does not alter the submitted article presentation.

A substantive author section now appears immediately before the related-reading area. It links to Campbell’s author profile and LinkedIn profile, and the Article schema identifies his name, current role, profile URL, image, professional affiliation, and LinkedIn URL. The contextual related-reading module is now explicitly curated for this article, linking to research on natural capital, corporate water dependency, and location-risk heat-map layers.

## Search Console review

Google Search Console’s **Discovered, currently not indexed** group contains **23 URLs**. The group was first detected on **19 September 2026**, while the report was last updated on **18 September 2026**. Every listed URL shows **Last crawled: N/A** in the report. The group includes the public research archive, several articles, and core routes such as About, actio, Buildings, Industrial, Partners, Scorecard, Suppliers, and Transportation.

A live response audit confirms that all 23 affected URLs return **HTTP 200**, declare a self-referential canonical URL, and carry `index, follow` robots directives. They are valid public routes rather than redirects, error pages, or intentionally excluded forms. This indicates a crawl-discovery queue rather than a technical blocking condition.

| Check | Result | Interpretation |
|---|---|---|
| Sitemap-listed routes | 23 of 23 live routes audited | Google can discover each through the sitemap |
| HTTP status | 200 for every audited URL | No availability barrier |
| Canonical URL | Self-referential for every audited URL | No canonical conflict identified |
| Robots directive | `index, follow` for every audited URL | No indexing block identified |
| Search Console crawl state | Last crawled: N/A | Google has not yet selected these URLs for crawling |

## Recommended next steps

First, allow Google time to process the newly published Node-backed metadata delivery and refreshed sitemap. The Search Console report is delayed, and its displayed dates predate the latest article and metadata work. The new article has already been inspected live and submitted for indexing; it may show as indexed only after Google returns to crawl it.

Second, resubmit `https://enduringadvantage.com/sitemap.xml` in Search Console once the published update is live. This is a notification step, not a correction to a malformed sitemap. Do not use **Validate Fix** on the discovered-not-indexed group because the site does not currently expose a technical defect for Google to validate.

Third, use Search Console’s individual **Request indexing** action sparingly for the highest-priority entry points: the home page, Research & Insights archive, Services, About, the new Seven of Nine article, and the highest-value sector pages. This focuses Google’s finite crawl attention on the pages that then distribute internal links to the rest of the site.

Finally, revisit the report after two to three weeks. If the same URLs still show **Last crawled: N/A**, review the sitemap read timestamp, crawl statistics, internal-link depth, and the live Googlebot response again. If Google has crawled a page but still has not indexed it, that becomes a content-selection question and should be assessed separately from this crawl-queue state.

## Validation completed

TypeScript compilation, the full automated test suite, and the production build passed. Production metadata validation confirmed the article’s HTTP 200 response, canonical URL, publication and modified dates, and the enhanced Campbell author entity in server-rendered structured data. Desktop and mobile full-page reviews confirmed the original article copy, author section, and related-reading presentation.

The supporting live audit is available in `reports/discovered-not-indexed-live-audit.tsv` for internal traceability.

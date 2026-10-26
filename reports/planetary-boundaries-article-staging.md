# Planetary Boundaries Article Staging

**Status:** Staged for review. No publication checkpoint has been created.

## Article

The new article is titled **“Seven of Nine Planetary Boundaries Are Breached. What Does That Mean for the Next Business Decision?”** It is available on the staged route `/articles/seven-of-nine-planetary-boundaries-business-decision` and is dated **22 September 2026**. The public byline is **Campbell Ohrlis, VP Partnerships**.

The supplied draft was recast in Canadian English for the Enduring Advantage editorial voice. It preserves the central urgency while treating the Planetary Boundaries framework as business-risk context, not as a generic initiative list. The article remains specific about the one-action approach: identify the materially relevant decision, test the available evidence, and choose an environmental action that clears the customer’s financial criterion.

The published claims are linked to primary sources in an on-page **Evidence base** panel. The PIK source confirms that seven of nine boundaries are transgressed and that all seven are at their highest recorded levels of transgression. CDP’s corrected 2026 disclosure analysis supports the US$714 billion projected-impact figure, the 48 percent two-year timing figure, and the comparison between median risk and mitigation costs. The evidence notes are retained in `reports/planetary-boundaries-source-notes.md`.

## Discovery implementation

The article is a canonical public route with a crawlable production response. It is listed in `sitemap.xml` with its managed image, in `llms.txt`, and in the Articles research archive through its Climate Risk, Nature Risk, Planetary Boundaries, Physical Risk, CFO Strategy, and Capital Allocation tags. Existing related-reading logic selects matching research automatically.

Search metadata includes the canonical URL, article title and description, Open Graph and X metadata, publication and modification dates of 22 September 2026, `en-CA` language information, Article JSON-LD, FAQ JSON-LD in the client experience, and citation objects for the PIK, CDP, and Planetary Health Check sources. The managed NASA Scientific Visualization Studio image has been uploaded to WebDev storage and is confirmed as a production JPEG response.

## Validation

| Check | Result |
|---|---|
| Source review | Passed against PIK, CDP, and Planetary Health Check primary materials |
| TypeScript | Passed |
| Unit tests | Passed: 12 tests across 5 files |
| Production build | Passed |
| Generated discovery output | Passed: 27 active articles and 52 canonical routes |
| Production crawler response | Passed: 200 response, canonical URL, publication and update metadata, structured citation data |
| Managed image delivery | Passed: production JPEG response, 33,178 bytes |
| Desktop visual review | Passed: headline, evidence panel, related reading, and documentary visual fit the editorial layout |
| Mobile visual review | Passed: article hierarchy and reading flow remain intact |

## Additional preview correction

The managed-media proxy removed during the Node runtime upgrade was restored in `vite.config.ts`. Development preview images now resolve through the same signed-media pattern used in production, so visual verification is no longer performed against broken preview assets.

# Staging report: Rob Kirkby article and author discovery

**Date:** 5 October 2026  
**Status:** Staged and validated. Not published.

## Scope completed

- Added the supplied article at the canonical route:
  - `/articles/why-global-warming-is-accelerating`
- Preserved the supplied body copy without editorial rewriting.
- Attributed the article to **Rob Kirkby, Founder and CEO** with the explicit authored byline retained.
- Set the public publication and update date to **5 October 2026**, a Monday publication date consistent with the site editorial schedule.
- Added a concise six-minute reading-time estimate, source list, article tags, share controls, related reading, image metadata, and JSON-LD Article metadata.

## Evidence mapping

The article preserves its numbered citations and now provides linked sources in the public evidence panel and crawler metadata.

Primary-source checks completed for key claims:

| Article claim area | Validation source | Finding |
|---|---|---|
| Recent acceleration in human-induced warming and the contribution of reduced aerosol cooling | [Forster et al., *Indicators of Global Climate Change 2025*](https://essd.copernicus.org/articles/18/3889/2026/) | Reports human-induced warming of 1.37°C in 2025 and a 0.27°C-per-decade rate across 2016–2025; identifies high greenhouse-gas emissions and reduced aerosol cooling as material drivers. |
| 2025 energy-related CO₂ growth | [International Energy Agency, *Global Energy Review 2026*](https://www.iea.org/reports/global-energy-review-2026/co2-emissions) | Reports around 0.4% growth in 2025, approximately 38.4 Gt total energy-related CO₂ emissions, and a new record high. |
| Climate impacts on land and ocean carbon sinks | [Global Carbon Budget 2025 FAQs](https://globalcarbonbudget.org/gcb-2025/the-global-carbon-budget-faqs-2025/) | Reports that climate change weakened land and ocean sinks and that they remain important absorbers of human CO₂ emissions. |

The public source list also retains the supplied WMO, NASA, IPCC, and U.S. Department of Energy references.

## Rob Kirkby discovery route

- Added an indexable author route: `/articles/author/rob-kirkby`
- The author page now lists both Rob Kirkby articles:
  1. *The Oceans Are Taking the Heat*
  2. *Why Global Warming Is Accelerating*
- Both Rob Kirkby article bylines link to this author route.
- The existing Articles archive already contains a Rob Kirkby author filter and author-route link. It now reports two articles.
- The author route avoids an invented social-profile URL while retaining Rob’s approved photo, role, and research biography.

## Search and AI discovery

- Added canonical page metadata, Open Graph fields, article publication/update metadata, source citations, author entity data, and structured-data author URL.
- Added the article and author route to the generated `sitemap.xml` and `llms.txt` inventory.
- Generated production metadata returned:
  - **HTTP 200** for the article and author route
  - Canonical URL, 5 October 2026 publication metadata, citation, and Rob Kirkby author schema for the article
  - Canonical URL and index/follow robots directives for the author route

## Validation

- `pnpm run generate:discovery` passed.
- `npx tsc --noEmit` passed.
- `pnpm test` passed: **24 tests across 5 files**.
- `pnpm build` passed, including 55 crawlable metadata shells.
- `git diff --check` passed.
- Desktop and mobile visual reviews passed for the article and Rob Kirkby author route.

## Publication status

No live publication was performed. The completed change set is ready for explicit approval to publish.

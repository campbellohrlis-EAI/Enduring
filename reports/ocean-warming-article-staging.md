# Ocean-Warming Article Staging

**Status:** Staged for review. No publication checkpoint has been created.

## Article

| Field | Staged value |
|---|---|
| Title | *The Oceans Are Taking the Heat* |
| Canonical URL | `https://enduringadvantage.com/articles/the-oceans-are-taking-the-heat` |
| Byline | Rob Kirkby, Founder and CEO, Enduring Advantage |
| Published | 30 September 2026 |
| Last updated | 1 October 2026 |
| Category | Climate Risk |
| Primary discovery tags | Ocean Warming, Climate Risk, Physical Risk, Resilience, Coastal Risk, Climate Science |

## Content and visual treatment

- Preserved the supplied article body, section sequence, numbered source references and Rob Kirkby byline.
- Added the user-supplied IAP ocean-heat chart as a full-width inline evidence figure, immediately after the lead visual. Its caption keeps the stated attribution: **“Chart by Enduring Advantage using IAP data. [15]”**
- Retained a NASA scientific ocean-current and temperature visual as the lead image.
- Added a visible linked evidence list for readers, covering the full 16-source reference set.
- Added three curated related readings on ocean acidification, location risk and water dependency.

## Search and AI discovery

The article is included in every required public discovery surface:

- Server-rendered canonical, title, description, Open Graph and X metadata.
- `article:published_time` (`2026-09-30`) and `article:modified_time` (`2026-10-01`).
- Article structured data with Rob Kirkby’s author entity, job title, lead image, article section, topic keywords and citations.
- XML sitemap with the canonical route, image entry and `lastmod` date.
- `llms.txt` inventory for AI-readable site discovery.
- Article archive author filter and profile image mapping for Rob Kirkby.

## Evidence review

Primary or authoritative sources were checked for the central ocean-heat, ENSO, climate-state, marine-heatwave, fisheries and storm-risk statements. See [ocean-warming source notes](./ocean-warming-source-notes.md) for the claim-to-source record.

## Validation completed

- `pnpm run generate:discovery`
- `npx tsc --noEmit`
- `pnpm test`
- `pnpm build`
- `git diff --check`
- Desktop and mobile full-page visual review of the article
- Production-response checks for HTTP 200, canonical URL, article dates, citation metadata, sitemap, AI inventory and the user-supplied chart asset

## Publication state

The work remains **staged only**. Publish it only after explicit approval.

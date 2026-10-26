# Ocean-Warming Article Revision: Staging Record

**Article:** *The Oceans Are Taking the Heat*  
**Canonical route:** `/articles/the-oceans-are-taking-the-heat`  
**Author:** Rob Kirkby, Founder and CEO  
**Revised:** 5 October 2026  
**Status:** Staged, not published

## Scope delivered

- Replaced the article body with the supplied Rob Kirkby draft.
- Preserved the canonical URL, original 30 September 2026 publication date, Rob Kirkby byline, author bio, article-share controls, related reading, existing documentary hero, and supplied IAP ocean-heat chart.
- Updated the visible and structured `dateModified` value to 5 October 2026.
- Retained the article’s discovery tags: Ocean Warming, Climate Risk, Physical Risk, Resilience, Coastal Risk, and Climate Science.

## Draft-integrity check

All **72 non-empty body and heading lines** from the supplied text are present in the article source. No editorial rewriting was applied to the supplied draft.

## Sources and citation support

The supplied 16-reference source list is rendered as linked sources on the article page and included in article structured data for crawlers.

| Evidence area | Source checked | Result |
|---|---|---|
| Ocean heat and energy imbalance | World Meteorological Organization, *State of the Global Climate 2025* | Supports the report’s statement that the ocean has absorbed heat equivalent to about 18 times annual human energy use each year over the past two decades. |
| Ocean heat as a climate indicator | NASA, *Ocean Warming: Earth Indicator* | Supports the description that about 90% of excess heat from planetary warming has been absorbed by the ocean. |
| Satellite observations and El Niño | Futura Sciences, *El Niño’s Power Surged: What Satellites Reveal About Earth’s Dramatic Changes* | Supports the supplied satellite-observation reference and its discussion of Sentinel-3 observations, El Niño strength, and an approximately 4 mm annual sea-level-rise rate. |

## Validation completed

- `pnpm run generate:discovery`
- `npx tsc --noEmit`
- `pnpm test` — **20 tests passed**
- `pnpm build` — completed successfully; **53 canonical crawlable metadata shells** prerendered
- Source audit confirming all supplied body and heading lines remain present
- Production response audit confirming HTTP 200, canonical URL, publication date, updated date, author identity, and linked citations
- Desktop and mobile visual review of the revised article header, byline, sharing controls, update date, and responsive layout

## Publication note

The revised article is staged only. Publishing requires an explicit release instruction.

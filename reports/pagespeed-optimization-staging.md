# PageSpeed Optimization Staging Report

**Status:** Staged for review. No production publication checkpoint has been created.

## Baseline and diagnosis

The provided PageSpeed Insights report identified poor Core Web Vitals on both mobile and desktop. The public PageSpeed API returned HTTP 429 during the independent baseline attempt, so the supplied report was used as the scoring reference and the project was measured locally with production build artefacts.

The primary delivery issues found were a 3.52 MB monolithic client bundle, a 374 KB HTML document with a 367 KB inline Manus runtime, third-party analytics and tag-manager scripts on the critical path, a stale preloaded hero asset, and no-store behaviour on the managed-media redirect. The full client application, article library, supplier directory, command palette, and all sector dossiers were eagerly included in the initial path.

## Implemented changes

| Area | Change | Performance effect |
|---|---|---|
| Route delivery | Converted all public pages to React lazy imports. | The homepage no longer downloads articles, supplier data, matrix data, or sector dossiers before they are needed. |
| Discovery UI | Deferred the command palette, reading-list drawer, and supplier sign-in modal. | Large search, article, and authentication interfaces load only after a user requests them. |
| Critical HTML | Removed the production Manus inline runtime. | The generated homepage document fell from **374,079 bytes** to **7,245 bytes**. |
| Third parties | Replaced render-critical Google and Umami tags with a consent-gated analytics loader. | Analytics remains available after consent without competing with the first render. |
| Hero media | Removed the stale CloudFront preload and preloaded the exact responsive WebP source set used by Home. | The LCP image is discovered early at the appropriate responsive size. |
| Caching | Applied immutable caching to hashed assets and 15-minute caching to the versioned managed-media redirect. | Reduces repeat requests and resolves the prior `no-store` redirect behaviour. |
| First paint | Removed the 1.2-second full-screen PageLoader hold. | Content is no longer intentionally delayed before first render. |
| Provider scope | Moved toast rendering to the supplier route and removed unnecessary global tooltip and theme wrappers. | Reduced initial JavaScript and main-thread work. |

## Measured output change

| Measure | Before | After | Change |
|---|---:|---:|---:|
| Homepage HTML | 374,079 B | 7,245 B | **-98.1%** |
| Homepage HTML, gzip | ~107 KB | 2,063 B | **-98%** |
| Initial client entry, gzip | 763,030 B | 136,388 B | **-82.1%** |
| Initial client entry, uncompressed | 3,524,646 B | 465,132 B | **-86.8%** |

The article library (270 KB), supplier data (1.19 MB), sector dossier (143 KB), and route-specific interfaces now compile as deferred chunks rather than initial homepage payload.

## Validation completed

- `npx tsc --noEmit` passed.
- `pnpm test` passed.
- `pnpm build` passed.
- The public production metadata shells for 52 canonical routes were regenerated.
- Automated invariant checks confirmed that the built homepage excludes the Manus runtime, legacy hero preload, gtag, GTM, and Umami requests; includes the responsive hero preload; preserves lazy route imports; and retains the updated cache rules.
- Desktop and mobile screenshots were reviewed for Home, Services, Articles, and Supplier Directory. No visual regressions were observed.

## Expected PageSpeed outcome

A new PageSpeed run after publication should show materially less JavaScript transfer and execution, lower render blocking from third parties, a substantially smaller initial document, and improved LCP discovery. Scores remain lab measurements and may vary by test run, cache state, network, and origin conditions. The site should be re-tested through the supplied PageSpeed Insights URL after the new release is deployed.

## Recommended follow-up after release

Run PageSpeed Insights once the deployment is live, then use Search Console Core Web Vitals data over the following field-data window to assess actual visitor improvement. If the homepage still identifies LCP as constrained, the next targeted optimization is an AVIF hero source set, contingent on verification that the managed media pipeline delivers AVIF consistently.

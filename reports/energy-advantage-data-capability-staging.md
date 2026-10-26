# Energy Advantage Data-Capability Wording Correction

**Status:** Staged for review. No publication checkpoint was created.

## Approved framing applied

Every public reference that combines **Energy Advantage** with a thirty-year tenure or data claim now describes a capability rather than suggesting that the company owns or relies on a thirty-year-old dataset. The standardized construction is:

> **Energy Advantage’s thirty years of experience managing, collating, collecting and administering data.**

Where the context concerns physical operations, the wording specifies **operating data**. This retains the relevant experience claim while making the distinction between customer-held data and Energy Advantage’s data-management capability explicit.

## Updated public surfaces

The correction was applied in the Home, About, Services, actio, Partners, Questions, Diagnostic, and Coach Model pages, as well as the article-author bio records. Static SEO metadata and the machine-readable `llms.txt` inventory were corrected at the same time. The sitemap contains no Energy Advantage tenure or data-copy claim and required no change.

## Validation

A source audit found no remaining public use of the retired verb sequence or an uncaveated "30 years of data" construction. `npx tsc --noEmit`, `pnpm build`, and `git diff --check` all passed. Full-page desktop and mobile reviews of the revised About and Partners pages found the revised copy rendered without visible clipping or layout regressions.

## Release state

The working tree contains this staging correction and its checklist update only. The current published baseline remains `00e76551` until a future explicit publication instruction.

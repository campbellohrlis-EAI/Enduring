# Enduring Advantage full messaging release

**Status:** Ready for publication

**Scope:** The supplied site-edit brief, the explicitly requested retirement of the public Supplier Directory, and the previously staged Rob Kirkby reading-route engagement work.

## Applied positioning

- Defines Enduring Advantage as **a software enabled, managed sustainability decision partner for CFOs**.
- Sets the mandate: find the sustainability moves that pay best, help clients deliver them in the right order, then report savings and environmental results as work proceeds.
- Centres the value proposition on financial return first and positive environmental impact as the condition that makes the financial outcome possible.
- Presents the work as a delivery model, not a list, dashboard, generic roadmap, or pre-selected quick win.
- Standardizes the exact six-step sequence where process detail is shown: **Assess, Collect, Identify, Plan, Deliver, Report and repeat**.
- Makes the first conversation principal-to-principal and aligns booking paths to **Request My 30-Minute Triage**.

## Page and route changes

| Surface | Release update |
|---|---|
| Home | Reframed the hero, buyer/outcome statement, two financial and environmental gates, first-call expectations, six-step process, data capability, proof, and CTA hierarchy. |
| Services | Reworked the managed process, vendor-neutral structure, plan/delivery/reporting model, related-party disclosure, commercial language, and six-step route. |
| About | Reframed company definition, ownership transparency, Energy Advantage capability wording, actio role, six-step process, Coach model, and call routing. |
| actio | Clarified that Catalys develops and owns actio; it organizes client, provider, and jurisdictional context but does not choose vendors or approve spend. |
| Diagnostic, Questions, Scorecard, Contact | Clarified first-engagement scope, available-data start, commercial confirmation points, outputs, and triage booking route. |
| CFO and sector pages | Added the CFO buyer/outcome framing and aligned all shared sector content to the six-step managed decision process. |
| Partners and Coach Model | Reworked delivery-accountability, coach, data, commercial confirmation, and vendor-neutral language. |
| Articles and author pages | Preserved the supplied Rob Kirkby article update and adds the staged Rob reading route: share controls, local completion progress, and related climate-risk reading. |
| Navigation and footer | Standardized the booking CTA and replaced public directory discovery with the Sustainability Playing Field. |
| Sustainability Playing Field | Added `/playing-field` as the public evidence, provider-options, and jurisdictional-reality decision surface. |
| Supplier Directory | Removed from public source, navigation, sitemap, AI inventory, structured data, and editable-content exports. `/suppliers` is a permanent redirect to `/playing-field`. |
| SEO and AI discovery | Updated per-route metadata, sitemap, `llms.txt`, global search, static crawler shells, and the legacy redirect map. |

## Explicit public confirmation markers

The following need leadership confirmation before their placeholders can be replaced with public commitments:

1. **Diagnostic:** public price, fee range, and standard delivery timing.
2. **Measurement and verification:** named provider and reporting frequency.
3. **Playing Field scope:** number of products, services, software solutions, and jurisdictions covered.
4. **Partner model:** commercial structure, certification or qualification requirements, and tier terms.
5. **Extended tagline:** whether to publish “at speed, at scale”.

## Validation completed

- `npx tsc --noEmit` passed.
- `pnpm test` passed: 6 files and 28 tests.
- `pnpm build` passed and prerendered 55 canonical metadata shells.
- Crawler checks confirmed canonical HTTP 200 responses for Home, Services, Playing Field, and Rob Kirkby’s author route.
- `/suppliers` returns an HTTP 301 redirect to `/playing-field`.
- Sitemap and AI inventory include `/playing-field` and exclude `/suppliers`.
- Desktop and 390px mobile visual checks passed for Home, Services, About, Playing Field, CFO, Industrial, Diagnostic, and Rob’s author route, including the full reading-route engagement panel.

# Round 6 Full-Site Audit: Staging Handoff

**Status:** Ready for review. This is a staging revision only. **No checkpoint has been created and no production change has been published.**

**Staging site:** <https://3000-i3r6rhg8h8d8q5vgrd1yw-f03758c1.us1.manus.computer>

## Scope completed

The supplied Round 6 audit was applied across the public content system, including the contact journey, Services and Scorecard, all eight sector pages, the article library and canonical article route, the Coach Model, Supplier Directory, navigation labels, author presentation, footer terminology, public metadata, and the machine-readable inventory.

| Audit area | Completed staging change | Result |
|---|---|---|
| Contact promise | Replaced the claim that the firm can identify the highest-value action in 30 minutes with the supplied decision, data, and Diagnostic wording. | The call is now positioned as a triage, not a free Diagnostic. |
| Services output | Replaced the Diagnostic’s former ranked-map language with the supplied **One next action** description. | Ranking remains a method, not a list handed to the client. |
| Decision article | Updated the visible title to **How Do You Get From Thousands of Options to One Funded Decision?** and migrated the canonical slug. | Legacy links redirect to the new canonical route. |
| Scorecard | Removed the unavailable case-example offer, updated the urgency opening, and replaced the unsupported failure-rate claim. | The page is now evidence-led and aligned with the one-action model. |
| Audience pages | Corrected scope language, named both gates where missing, standardised ranking by financial return, pressure labels, direct close promises, and **The Next Best Thing** naming. | All eight audience routes now follow the same decision logic. |
| Claims and research | Added or retained publisher-year attribution for the audited data claims and reconciled conflicting regulation wording. | The cited language matches the supporting source notes. |
| Supplier Directory | Removed curated framing, added Financing Partner classification, withheld imported contact and location fields from public cards pending verification, validated outbound URLs, fixed the four audited source locations, and added the requested closing field-versus-answer disclosure. | The public directory is positioned as discovery material, not a recommendation list. |
| Cross-site consistency | Standardised the primary first-meeting CTA, Campbell’s visible role, actio platform labelling, author presentation, and the A15 data-capability wording. | Repeated public labels now use the approved terminology. |

## Immediate corrections

| Page or surface | Applied correction |
|---|---|
| `/contact` | Uses the supplied statement that 30 minutes clarifies the decision, identifies the data needed, and tests whether a material opportunity is likely. It now states that nobody can name the action before reviewing the client’s numbers and that this is what the Diagnostic is for. |
| `/services` | The Diagnostic deliverable now reads: “One next action, the single move that outranks everything else, with the numbers behind it and the funding routes available to it.” |
| `/articles/from-thousands-of-options-to-one-decision` | Uses the supplied thousands-of-options title. The former `/articles/from-options-to-one-decision` route is preserved as a redirect. |
| `/scorecard` | Replaces “case example” with a relevant Enduring Advantage article on the blocking condition. Its opening stakes panel and decision-condition explanation now use the supplied CFO-facing language. |
| `/coach-model` | Uses the A15 operating-data phrase rather than the retired independent-management wording. |
| Article presentation | Removes the duplicate upper article biography, retains the dedicated author panel, removes the stray comma before pull-quote attributions, and standardises Campbell’s displayed role as **VP, Commercial Strategy**. |

## Audience-page alignment

The sector routes now retain their audience-specific operating context while sharing the core method. Buildings, real estate, and industrial pages no longer invite a single asset or plant where the approved scope is portfolio-level. Real estate, municipalities, and First Nations now name the two admission gates. Buildings, industrial, and transportation rank surviving options by **financial return, measured the way the client measures it**. All eight routes label the third pressure **Pollution and waste** and use **The Next Best Thing** for the Step 03 output.

The CFO comparison question no longer invents the number “eleven.” Research teasers now describe observable exposures and decision consequences rather than promising outcomes or using the retired unsourced sustainable-capital figure. The two accidental lowercase sentence starts on municipalities and agriculture were corrected.

The final audience source audit also found one remaining hedged agriculture close. It now states directly that Enduring Advantage will say whether there is a material agricultural opportunity and what would be required to prove it.

## Research and credibility changes

The audited research wording now identifies its source where a numeric external claim remains. The global land-degradation wording is attributed to UNCCD’s 2022 *Global Land Outlook 2* and describes global land rather than agricultural land. The non-financial-data wording identifies EY’s 2024 *Global Corporate Reporting Survey*. The ocean-acidification wording identifies NOAA and retains its source-aligned pH and acidity framing. [1] [2] [3]

The conflicting regulatory position was reconciled. The public copy now states that mandatory disclosure is arriving in some jurisdictions and stalling in others, so the profit case must stand on its own. The remaining public research claims were tightened where a source could not be retained.

## Supplier Directory safeguards

The Supplier Directory now describes itself as a map of the field, not a curated recommendation set. It retains the vendor-neutrality disclosure and adds the requested closing clarification:

> **This is the field, not the answer.** Which of these belongs in your business is a question about your data, not about this directory.

Imported email addresses and unverified location details are withheld from public supplier cards. Four raw records called out in the audit have been corrected or reduced to a region-only fallback: Madison, United States; Aachen, Germany; Montreal, Canada; and Europe for the record with no clean city-country verification. The directory also includes the new **Financing Partner** category.

## Visual and technical QA

| Check | Outcome |
|---|---|
| TypeScript | `npx tsc --noEmit` passed. |
| Production build | `pnpm build` passed. The known bundle-size advisory remains an optimisation opportunity, not a build error. |
| Source audit | Retired A15 wording, old Campbell role titles, former article route references, old Scorecard case-example promise, ranked-map Diagnostic wording, curated-directory language, and the Trending Soon placeholder were not found in public source. |
| Desktop review | Contact, Services, Scorecard, Supplier Directory, Industrial, Transportation, and the canonical decision guide render with the corrected hierarchy and copy. |
| Mobile review | Contact, Scorecard, Supplier Directory, and the canonical decision guide remain legible and navigable at 375 px width. |
| Canonical route | The new thousands-of-options decision-guide URL renders correctly; the old URL is configured as a redirect. |
| Final focused audit | Confirmed no remaining retired role labels, A15 wording, unqualified supplier-location strings, or superseded triage labels in the relevant public sources. |

The desktop and mobile reviews confirmed that the restored Contact promise fits its existing form composition, the Scorecard stakes panel remains readable, the Supplier Directory disclaimer remains clear, and the canonical article title no longer truncates the decision premise to one hundred options.

## Deliberately not changed

The following items were explicitly identified by the audit as decisions for Rob rather than copy fixes, so they remain unchanged:

| Item | Reason left unchanged |
|---|---|
| Public anonymised client proof | Requires a verified, approved result and disclosure decision. No testimonial, case study, savings figure, or client outcome was fabricated. |
| Public Diagnostic price signal | Requires commercial approval. |
| Supplier-directory category mix | The directory is still heavily weighted toward decarbonisation. A public framing decision or a sourced data-expansion programme is needed before changing this. |
| First Nations “Arrange a conversation” label | Retained as the audit’s expressly approved deliberate exception. |
| Municipal “Asset Renewal, Sequenced and Funded” title | Retained as an approved expression of the one-action-at-a-time sequencing model. |

## Changed public-source surfaces

`Contact.tsx`, `Services.tsx`, `Scorecard.tsx`, `Home.tsx`, `About.tsx`, `Actio.tsx`, `Questions.tsx`, `Partners.tsx`, `CoachModel.tsx`, `Diagnostic.tsx`, `SupplierDirectory.tsx`, `ArticleDetail.tsx`, `Articles.tsx`, `AuthorPage.tsx`, `Navigation.tsx`, `Footer.tsx`, `ActioExplainer.tsx`, `icpPageData.ts`, `articlesData.ts`, `decisionGuidanceSeries.ts`, `supplyChainArticle.ts`, `suppliersData.ts`, `server/index.ts`, `server/seo.ts`, and `client/public/sitemap.xml`.

## References

[1] [EY, *2024 Global Corporate Reporting Survey*](https://www.ey.com/en_gl/insights/financial-accounting-advisory-services/corporate-reporting-survey)

[2] [United Nations Convention to Combat Desertification, *Global Land Outlook 2*](https://www.unccd.int/resources/global-land-outlook/glo2)

[3] [National Oceanic and Atmospheric Administration, *Ocean Acidification*](https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification)

# PDF Formatting Diagnosis

## Observed issues

The fillable decision checklist uses generous vertical spacing within each decision card, while the note line and completion checkbox sit too low relative to their associated prompt. The visual separation makes the checkbox read as detached from the decision note rather than as the completion control for the step.

The Partner Onboarding Checklist uses a similarly loose list rhythm. Its checkboxes align with the first line of each item, but the item copy wraps with more vertical air than a compact one-page working checklist needs. The lower portion of the page has substantial unused space, which confirms that the checklist can be tightened without compromising legibility.

## Correction approach

1. Reduce paragraph leading and inter-item spacing while keeping body type readable at print scale.
2. Move decision-note rules and completion checkboxes upward into a shared baseline inside each fillable decision card.
3. Use fixed, compact step-card geometry so all six fillable variants remain one page with consistently aligned controls.
4. Tighten the Partner checklist row spacing and rebalance the four sections vertically, preserving its one-page format and readable checkbox targets.

## First correction review

The fillable freight worksheet now has tighter body leading, and its note rule and completion checkbox share the same lower baseline in each card. The prompt, note, and box relationship is substantially clearer.

The first Partner checklist revision exposed the Typst `box` expression as literal content inside the padded checkbox container, which caused the generated document to spill to a second page. The checkbox expression must remain in code mode inside the content block before visual review can continue.

## Final visual verification

The repaired Partner Onboarding Checklist is back to one page. Its checkbox marks render cleanly, align with the first line of each entry, and the tighter list rhythm improves scanability without reducing legibility.

The municipal supply-chain worksheet, which carries the longest prompts, remains one page. Prompt leading is tighter, and the decision-note line and completion checkbox now align horizontally inside every card. The same shared generator correction applies across all five fillable variants.

# Checklist Activity-Signal Data Audit

**Audit date:** 2026-09-22  
**Decision:** Keep the public activity signal deferred. No public social-proof statement has been added.

## Scope

The outstanding checklist item permitted an activity signal only when it could be supported by verified, aggregated checklist-download data. The audit reviewed the current application code, installed first-party database schema, and available analytics integration surfaces.

## Findings

| Evidence surface | Finding | Suitable for a public activity signal? |
|---|---|---|
| Client analytics | The site emits checklist form-start, form-submit, PDF-download, and supply-chain checklist-download events to the configured analytics endpoint. These are event writes only. | No. The application has no read API or reviewed aggregate report proving a count. |
| Application database | The managed runtime currently contains the framework user schema only. No checklist-download, conversion, or aggregate activity table is implemented. | No. There is no first-party aggregate to query or verify. |
| Public UI | No activity ticker, numerical download claim, or “recent activity” message is currently rendered. | Correct current state. No claim is being made. |
| Form and lead services | Checklist capture and external reporting integrations can collect operational lead data, but no current, privacy-safe aggregate report was provided or connected for this audit. | No. Do not infer counts from a form implementation or event configuration. |

## Conclusion

There is **no verified aggregate download volume available inside the current project** that could support a public activity signal. Adding a ticker, a recent-download statement, or a numerical proof marker would therefore risk fabricated social proof.

The item is closed as an explicit deferral, not as a completed front-end feature. Reconsider it only when a responsible owner supplies a documented aggregate from the analytics platform, Formspree, or the designated lead-tracking sheet, along with a privacy review confirming that the wording does not identify or expose individual visitors.

## Future activation standard

Before adding any activity signal, retain a dated source report that states the aggregation window, total, source system, and approved public wording. Prefer an aggregate such as “Decision checklist resources were requested N times this quarter” only where N is independently auditable and the statement does not imply client endorsement, outcome, or recency beyond the evidence.

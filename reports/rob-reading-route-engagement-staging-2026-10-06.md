# Rob Kirkby Reading-Route Engagement: Staging Record

**Date:** 6 October 2026  
**Status:** Staged only. The previously published exact-copy article revision remains unchanged.

## Delivered behaviour

Rob Kirkby’s author route at `/articles/author/rob-kirkby#rob-reading-route` now provides two share actions, for LinkedIn and X. Each uses a canonical author-route URL with route-specific UTM attribution: `utm_campaign=reading_route` and `utm_content=rob-climate-risk`. The share actions emit a `reading_route_shared` analytics event without loading tracking scripts until consent is available.

The route now has a private, browser-local completion indicator. When a reader reaches at least 96 per cent of either linked route article, the route records that article as complete in local storage and emits `reading_route_article_completed`. Progress is displayed as a semantic progress bar and as a clear “n of 2 reads completed” label. The state is limited to the route’s two current articles and ignores malformed or stale local values.

The bottom of Rob’s author page now contains a three-card related-reading panel. It ranks non-Rob articles by shared climate-risk focus, then by Climate Risk category, to continue readers into relevant research without repeating route articles.

## Validation

TypeScript passed. The Vitest suite passed with 28 tests across 6 files, including new deterministic tests for author-route URL attribution and private completion storage. The production build and discovery generation passed, as did `git diff --check`.

Desktop and mobile full-page review confirmed that the hero, reading route, semantic progress control, LinkedIn and X actions, Rob’s two article cards, and related-reading panel remain readable and responsive. A direct browser-console storage check was unavailable in the connected browser, so final completion-state validation is covered by the new storage unit tests and route mapping tests.

## Publication decision

These engagement enhancements are staged separately from the already published exact article copy. They have not been released because no publication request was made for this separate feature set.

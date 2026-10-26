import fs from 'node:fs';
import path from 'node:path';

const projectRoot = '/home/ubuntu/enduring-advantage';
const outputPath = path.join(projectRoot, 'Enduring_Advantage_Editable_Website_Copy.md');

function loadSections(filePath, fieldName) {
  const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return payload.results
    .filter((result) => !result.error && result.output?.[fieldName])
    .map((result) => result.output[fieldName].trim())
    .map((section) => section
      .replace(/^## Route: \/supply-chain$/m, '## Route: /articles/topic/supply-chain')
      .replace(/^## Route: \/case-study$/m, '## Route: /case-studies/:slug')
      .replace(/^## Route: \/who-we-help\/\[audience-slug\]$/m, '## Routes: /cfo; /municipalities; /first-nations; /agriculture; /real-estate'))
    .filter(Boolean);
}

const pageSections = loadSections('/home/ubuntu/extract_page_copy.json', 'section_markdown');
const structuredSections = loadSections('/home/ubuntu/extract_structured_copy.json', 'section_markdown');
const legacySections = loadSections('/home/ubuntu/extract_legacy_library_copy.json', 'section_markdown');

const sharedCopy = `# Shared Site Copy

## Header navigation

**Primary links:** Services; Scorecard; Partners; About; FAQ; Articles; Who We Help; Request Triage.

**Articles menu:** All articles & research; Supply Chain research & tools.

**Six-part decision guidance:**

1. Which solution works here?
2. What is the right order worth?
3. From options to one decision
4. Can our team work out what goes first?
5. What an actionable plan contains
6. How fast can you know what to do next?

**Who We Help:** CFOs & Finance; Municipalities; First Nations; Agriculture; Real Estate.

**Request Triage menu:** Request Triage; Fill out a contact form; Book directly in my calendar; Pick a time that works, no waiting for confirmation.

## Universal consultation panel

### Start a conversation

## Have a decision you need to make?

Bring the site, portfolio, or operational question to a 30-minute triage. We will clarify the decision and whether a material opportunity is likely.

**CTA:** Request My 30-Minute Triage

## Footer

The environmental polycrisis is forcing companies to act at the worst possible time. We cut through the choice overload, pinpoint the Next Best Thing for the bottom line, and get it done. No equipment sales. No referral fees. We do not profit from which solution wins.

### Footer navigation

| Section | Labels |
|---|---|
| Services | How It Works; The Opportunity; Business Case; actio Platform; Sustainability Playing Field |
| Resources | Articles & Research; Contact Us; Book a Consultation |
| Who We Help | CFOs & Finance; Municipalities; First Nations; Agriculture; Real Estate |
| Company | Become a Partner; About Us; The Coach Model; Questions; Energy Advantage; Catalys; actio platform |

## Global contact copy

- **Email:** partnerships@enduringadvantage.com
- **Phone:** 1-800-697-3456
`;

const document = `# Enduring Advantage: Editable Website Copy

> **Offline editing edition**
>
> This document consolidates the current visitor-facing copy from the public website, including page content, dynamic article libraries, audience-specific content, checklist language, topic-cloud labels, and shared navigation/footer wording. It intentionally omits implementation code, styles, asset URLs, analytics, and internal configuration.

## How to use this document

Each main page or content collection is clearly labeled. You can edit prose, headings, CTAs, form language, article copy, and FAQ text directly in this Markdown file. When returning edits for implementation, keep the route or section heading in place so changes can be mapped back to the correct page.

---

${sharedCopy}

---

# Public Page Copy

${pageSections.join('\n\n---\n\n')}

---

# Structured Editorial, Audience, and Resource Copy

${structuredSections.join('\n\n---\n\n')}

---

# Topic Cloud and Curated Research Copy

${legacySections.join('\n\n---\n\n')}

---

## Export coverage note

This export is generated from the current public page components and the content libraries that supply dynamic articles, audience pages, checklist controls, research cards, and matrix labels. Navigation, footer, and reusable consultation language are collected once in the shared-site section to prevent duplicated edits.
`;

fs.writeFileSync(outputPath, document.replace(/\n{3,}/g, '\n\n'));
console.log(`${outputPath}\n${Buffer.byteLength(document, 'utf8')} bytes\n${pageSections.length} page sections, ${structuredSections.length} structured sections, ${legacySections.length} legacy-library sections`);

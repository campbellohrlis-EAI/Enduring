export const CHECKLIST_PDF_VARIANTS = {
  cfo: {
    label: 'CFO and finance leaders',
    file: '/manus-storage/ea-six-step-decision-checklist-cfo_2030a3c4.pdf',
    detail: 'Capital criteria, competing uses of capital, finance review, and verification.',
    route: '/cfo',
    audienceLabel: 'Explore the CFO decision page',
    nextArticle: '/articles/what-an-actionable-plan-contains',
    nextArticleLabel: 'What an actionable plan contains',
  },
  municipal: {
    label: 'Municipal leaders',
    file: '/manus-storage/ea-six-step-decision-checklist-municipal_071637ac.pdf',
    detail: 'Asset renewal, service levels, council readiness, procurement, and funding context.',
    route: '/municipalities',
    audienceLabel: 'Explore the municipal decision page',
    nextArticle: '/articles/can-our-team-work-out-what-goes-first',
    nextArticleLabel: 'Can our team work out what goes first?',
  },
  realEstate: {
    label: 'Real estate leaders',
    file: '/manus-storage/ea-six-step-decision-checklist-real-estate_3d17d89d.pdf',
    detail: 'Portfolio decisions, tenant context, capex timing, and property performance.',
    route: '/real-estate',
    audienceLabel: 'Explore the real estate decision page',
    nextArticle: '/articles/which-solution-works-here',
    nextArticleLabel: 'Which solution works here?',
  },
} as const;

export type ChecklistSector = keyof typeof CHECKLIST_PDF_VARIANTS;

export const CHECKLIST_ROLE_OPTIONS = [
  'CFO / VP Finance',
  'CEO / Owner',
  'COO / Operations leader',
  'Municipal CAO / Senior staff',
  'Asset manager / Property manager',
  'Sustainability / ESG leader',
  'Advisor / Consultant',
  'Other',
];

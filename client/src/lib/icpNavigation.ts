// Shared navigation labels are intentionally kept separate from the full sector dossiers.
// This lets the global navigation stay lightweight while each sector route loads its
// complete decision content only when it is requested.

export const icpNavigationItems = [
  { navLabel: 'CFOs & Finance', route: '/cfo' },
  { navLabel: 'Municipalities', route: '/municipalities' },
  { navLabel: 'First Nations', route: '/first-nations' },
  { navLabel: 'Agriculture & Food', route: '/agriculture' },
  { navLabel: 'Real Estate & Infrastructure', route: '/real-estate' },
  { navLabel: 'Buildings', route: '/buildings' },
  { navLabel: 'Industrial Operations', route: '/industrial' },
  { navLabel: 'Transportation & Logistics', route: '/transportation' },
] as const;

export type IcpNavigationItem = (typeof icpNavigationItems)[number];

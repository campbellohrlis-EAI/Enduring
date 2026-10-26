// Set SITE_MODE to 'live' to restore the full Enduring Advantage framework.
// Public pages, routing, content, and discovery sources remain intact while this
// switch presents the temporary coming-soon holding page.
export const SITE_MODE = 'coming-soon' as const;

export const IS_COMING_SOON = SITE_MODE === 'coming-soon';

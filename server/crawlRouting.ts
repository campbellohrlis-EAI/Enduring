// Legacy article URLs remain unavailable while the Campbell Ohrlis articles are
// held for editorial review. Do not redirect crawlers or readers into a removed
// document route.
export const LEGACY_ARTICLE_REDIRECTS: Record<string, string> = {};

export const LEGACY_PAGE_REDIRECTS: Record<string, string> = {
  '/investment-case': '/services',
  '/suppliers': '/playing-field',
};

export function normalizeCrawlPath(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

export function getPermanentRedirect(pathname: string) {
  const normalizedPath = normalizeCrawlPath(pathname);
  return LEGACY_ARTICLE_REDIRECTS[normalizedPath] ?? LEGACY_PAGE_REDIRECTS[normalizedPath];
}

export function shouldCanonicalizeTrailingSlash(pathname: string, isKnownPublicRoute: (route: string) => boolean) {
  const normalizedPath = normalizeCrawlPath(pathname);
  return pathname !== normalizedPath && isKnownPublicRoute(normalizedPath);
}

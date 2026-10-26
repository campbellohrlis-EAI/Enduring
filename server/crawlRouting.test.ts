import { describe, expect, it } from 'vitest';
import {
  getPermanentRedirect,
  normalizeCrawlPath,
  shouldCanonicalizeTrailingSlash,
} from './crawlRouting';

describe('crawl routing', () => {
  it('normalizes only non-root trailing slashes', () => {
    expect(normalizeCrawlPath('/')).toBe('/');
    expect(normalizeCrawlPath('/about/')).toBe('/about');
    expect(normalizeCrawlPath('/articles/from-options-to-one-decision///')).toBe('/articles/from-options-to-one-decision');
  });

  it('does not redirect held article URLs into removed document routes', () => {
    expect(getPermanentRedirect('/articles/from-options-to-one-decision')).toBeUndefined();
    expect(getPermanentRedirect('/articles/from-options-to-one-decision/')).toBeUndefined();
    expect(getPermanentRedirect('/investment-case')).toBe('/services');
    expect(getPermanentRedirect('/services')).toBeUndefined();
  });

  it('canonicalizes known public paths but not unknown paths', () => {
    const knownRoutes = new Set(['/about', '/articles/why-global-warming-is-accelerating']);
    const isKnownPublicRoute = (route: string) => knownRoutes.has(route);

    expect(shouldCanonicalizeTrailingSlash('/about/', isKnownPublicRoute)).toBe(true);
    expect(shouldCanonicalizeTrailingSlash('/about', isKnownPublicRoute)).toBe(false);
    expect(shouldCanonicalizeTrailingSlash('/missing/', isKnownPublicRoute)).toBe(false);
  });
});

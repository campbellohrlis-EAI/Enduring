import { describe, expect, it } from 'vitest';
import { STATIC_SEO, getStaticSeo, injectStaticSeo } from './seo';
import { IS_COMING_SOON } from '../shared/siteMode';

const SHELL = `<!doctype html><html><head>
  <title>Original</title>
  <meta name="description" content="Original description" />
  <meta name="robots" content="index" />
  <meta name="googlebot" content="index" />
  <meta name="bingbot" content="index" />
  <link rel="canonical" href="https://enduringadvantage.com/old" />
  <link rel="alternate" href="https://enduringadvantage.com/old" hreflang="en-CA" />
  <link rel="alternate" href="https://enduringadvantage.com/old" hreflang="x-default" />
</head><body></body></html>`;

describe('site-mode metadata', () => {
  it('returns metadata appropriate to the active public-site mode', () => {
    if (IS_COMING_SOON) {
      expect(getStaticSeo('/')).toMatchObject({
        title: 'Coming Soon',
        noIndex: true,
      });
      expect(getStaticSeo('/playing-field')).toMatchObject({
        title: 'Coming Soon',
        noIndex: true,
      });
      expect(getStaticSeo('/articles/why-global-warming-is-accelerating')).toMatchObject({
        title: 'Coming Soon',
        noIndex: true,
      });
      return;
    }

    expect(getStaticSeo('/')).toMatchObject({
      title: 'Profitable Sustainability, the Right Things in the Right Order | Enduring Advantage',
    });
    expect(getStaticSeo('/')).not.toHaveProperty('noIndex', true);
    expect(getStaticSeo('/playing-field')).toMatchObject({
      title: 'The Sustainability Playing Field',
    });
  });

  it('injects the active site mode’s robots directive and canonical URL', () => {
    const rendered = injectStaticSeo(SHELL, '/playing-field');

    if (IS_COMING_SOON) {
      expect(rendered).toContain('<title>Coming Soon | Enduring Advantage</title>');
      expect(rendered).toContain('<meta name="robots" content="noindex, nofollow, noarchive" />');
      expect(rendered).toContain('<meta name="googlebot" content="noindex, nofollow, noarchive" />');
      expect(rendered).toContain('<link rel="canonical" href="https://enduringadvantage.com/" />');
      expect(rendered).not.toContain('Sustainability Playing Field');
      return;
    }

    expect(rendered).toContain('<title>The Sustainability Playing Field | Enduring Advantage</title>');
    expect(rendered).toContain('<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />');
    expect(rendered).toContain('<link rel="canonical" href="https://enduringadvantage.com/playing-field" />');
  });

  it('retains the original framework metadata in reserve for later reactivation', () => {
    expect(STATIC_SEO['/playing-field']).toMatchObject({
      title: 'The Sustainability Playing Field',
    });
  });
});

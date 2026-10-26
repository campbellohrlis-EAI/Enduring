import { describe, expect, it } from 'vitest';
import { campbellArticlesHeldForReview, getArticleBySlug } from './articlesData';

const SLUG = 'seven-of-nine-planetary-boundaries-business-decision';
const OCEAN_SLUG = 'the-oceans-are-taking-the-heat';
const GLOBAL_WARMING_SLUG = 'why-global-warming-is-accelerating';
const POLYCRISIS_SLUG = 'the-polycrisis-what-your-clients-advisors-need-to-know';

describe('planetary boundaries article', () => {
  const heldArticle = campbellArticlesHeldForReview.find((article) => article.slug === SLUG);

  it('keeps the approved author, role, and current publication date in the review inventory', () => {
    expect(heldArticle).toMatchObject({
      slug: SLUG,
      author: 'Campbell Ohrlis',
      authorTitle: 'VP Partnerships',
      date: '2026-09-22',
      updatedAt: '2026-09-22',
      authorUrl: '/articles/author/campbell-ohrlis',
      authorLinkedIn: 'https://www.linkedin.com/in/campbellohrlis/',
      showSources: false,
    });
  });

  it('does not expose the held article through the public route inventory', () => {
    expect(getArticleBySlug(SLUG)).toBeUndefined();
  });

  it('includes source references and discovery tags', () => {
    const article = heldArticle;

    expect(article?.sources).toHaveLength(3);
    expect(article?.tags).toEqual(expect.arrayContaining(['Climate Risk', 'Nature Risk', 'Planetary Boundaries']));
  });

  it('preserves the supplied article wording without an added evidence panel', () => {
    const article = heldArticle;
    const copy = article?.sections.map((section) => section.content).join('\n') ?? '';

    expect(article?.title).toBe('Seven of Nine');
    expect(copy).toContain('Earth runs on nine systems that keep it stable. Scientists call them planetary boundaries.');
    expect(copy).toContain('Customers are a key to addressing planetary boundaries. They need to up their game.');
    expect(copy).toContain('Enduring Advantage helps customers dramatically improve their environmental AND financial performance.');
    expect(copy).not.toContain('[1]');
    expect(article?.showSources).toBe(false);
  });
});

describe('ocean-warming article', () => {
  it('preserves the intended Rob Kirkby byline and editorial dates', () => {
    expect(getArticleBySlug(OCEAN_SLUG)).toMatchObject({
      slug: OCEAN_SLUG,
      title: 'The Oceans Are Taking the Heat',
      author: 'Rob Kirkby',
      authorTitle: 'Founder and CEO',
      date: '2026-09-30',
      updatedAt: '2026-10-05',
      preserveAuthorByline: true,
    });
  });

  it('retains the supplied analysis, evidence chart, sources, and discovery tags', () => {
    const article = getArticleBySlug(OCEAN_SLUG);
    const copy = article?.sections.map((section) => section.content).join('\n') ?? '';
    const chart = article?.sections.find((section) => section.type === 'image');

    expect(copy).toContain('After 45 years working in energy, I look at climate change through a fairly simple lens.');
    expect(copy).toContain('Energy has to go somewhere.');
    expect(copy).toContain('The ocean has been protecting us');
    expect(chart).toMatchObject({
      image: '/manus-storage/ocean-heat-content-iap-chart_c4c18cac.jpeg',
      imageCaption: expect.stringContaining('Chart by Enduring Advantage using IAP data'),
    });
    expect(article?.sources).toHaveLength(16);
    expect(article?.sources).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: 'Futura Sciences, El Niño’s Power Surged: What Satellites Reveal About Earth’s Dramatic Changes' }),
    ]));
    expect(article?.tags).toEqual(expect.arrayContaining(['Ocean Warming', 'Climate Risk', 'Physical Risk']));
  });
});

describe('global-warming article', () => {
  it('preserves Rob Kirkby’s supplied byline, dates, and author discovery route', () => {
    expect(getArticleBySlug(GLOBAL_WARMING_SLUG)).toMatchObject({
      slug: GLOBAL_WARMING_SLUG,
      title: 'Why Global Warming Is Accelerating',
      author: 'Rob Kirkby',
      authorTitle: 'Founder and CEO',
      authorUrl: '/articles/author/rob-kirkby',
      date: '2026-10-05',
      updatedAt: '2026-10-06',
      preserveAuthorByline: true,
    });
  });

  it('retains the supplied evidence-led analysis and source list', () => {
    const article = getArticleBySlug(GLOBAL_WARMING_SLUG);
    const copy = article?.sections.map((section) => section.content).join('\n') ?? '';

    expect(copy).toContain('Greenhouse gas concentrations are now rising at a rate unprecedented in human civilization');
    expect(copy).toContain('Cleaner air has removed a temporary shield');
    expect(copy).toContain('What this means for decision makers');
    expect(copy).toContain('The pendulum has swung far away from taking serious action on climate change and other major environmental issues, especially in the US. Look for it to swing back hard.');
    expect(copy).toContain('Then we ensure implement occurs, and we measure the impact.');
    expect(article?.sources).toHaveLength(8);
    expect(article?.sources).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: 'Forster et al., Indicators of Global Climate Change 2025' }),
      expect.objectContaining({ label: 'International Energy Agency, Global Energy Review 2026, CO2 emissions' }),
      expect.objectContaining({ label: 'IPCC, AR6 Synthesis Report, Summary for Policymakers' }),
    ]));
    expect(article?.tags).toEqual(expect.arrayContaining(['Climate Risk', 'Physical Risk', 'Energy Transition']));
  });
});

describe('Homepage evidence teaser article', () => {
  it('keeps the polycrisis explainer available with its primary evidence sources', () => {
    expect(getArticleBySlug(POLYCRISIS_SLUG)).toMatchObject({
      title: 'The Polycrisis, in Plain Words',
      author: 'Enduring Advantage',
      readTime: '5 min read',
      updatedAt: '2026-10-21',
    });

    expect(getArticleBySlug(POLYCRISIS_SLUG)?.sources).toEqual(expect.arrayContaining([
      expect.objectContaining({ label: 'CDP, Extreme Weather Risk Is Reshaping the Global Economy' }),
      expect.objectContaining({ label: 'IEA, World Energy Investment 2025 Executive Summary' }),
    ]));
  });
});

// =============================================================================
// ENDURING ADVANTAGE, Articles Index Page
// Sage Editorial design: cream background, editorial card grid
// Two card types: image-backed (light) + brand card (dark slate)
// Typography: Cormorant Garamond display + Nunito Sans body
// =============================================================================

import React, { useState, useMemo, useEffect } from 'react';
import { useSEO, organizationSchema } from '@/hooks/useSEO';
import { Link, useLocation } from 'wouter';
import { useForm } from '@formspree/react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { articles } from '@/lib/articlesData';
import { ArrowRight, Check, Clock, Calendar, Loader2, Mail, Tag } from 'lucide-react';

// Derive all unique tags across all articles, sorted by frequency
const allTags: string[] = (() => {
  const freq: Record<string, number> = {};
  articles.forEach((a) => (a.tags ?? []).forEach((t) => { freq[t] = (freq[t] ?? 0) + 1; }));
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
})();

const PINNED_FILTER_TAGS = ['Supply Chain'];
const orderedTags = [
  ...PINNED_FILTER_TAGS.filter((tag) => allTags.includes(tag)),
  ...allTags.filter((tag) => !PINNED_FILTER_TAGS.includes(tag)),
];
const PRIORITIZED_TOPIC_COUNT = 5;

// Current named research authors with published profile imagery.
const principalAuthors = [
  { name: 'Rob Kirkby', photo: '/manus-storage/RobKirkby_402e0e7f.jpeg', slug: 'rob-kirkby' },
];

// Pre-compute article counts per principal author
const authorArticleCount: Record<string, number> = Object.fromEntries(
  principalAuthors.map((a) => [a.name, articles.filter((art) => art.author === a.name).length])
);

// Map author name → photo for use in cards
const authorPhotoMap: Record<string, string> = Object.fromEntries(
  principalAuthors.map((a) => [a.name, a.photo])
);

const PRIORITY_BRIEFING_SLUG = '';
// Intentionally empty until a verified GA4 share-ranking export is available.
// This prevents social-proof claims from being published ahead of real engagement data.
const VERIFIED_MOST_SHARED_SLUGS: string[] = [];
const TRENDING_SOON_WATCHLIST_SLUGS = [
  'the-oceans-are-taking-the-heat',
  'why-global-warming-is-accelerating',
];

const SECTOR_READING_ROUTES = [
  {
    id: 'cfo',
    label: 'CFO & finance leaders',
    detail: 'Capital discipline, risk visibility, and the order of investment.',
    slugs: ['what-is-the-right-order-worth', 'scope-3-the-cfo-imperative', 'natural-capital-the-balance-sheet-risk-most-cfos-are-not-measuring'],
  },
  {
    id: 'municipalities',
    label: 'Municipal leaders',
    detail: 'Service continuity, defensible evidence, and practical delivery choices.',
    slugs: ['which-solution-works-here', 'the-data-defensibility-problem-why-96-percent-of-cfos-cant-stand-behind-their-sustainability-numbers', 'what-an-actionable-plan-contains'],
  },
  {
    id: 'first-nations',
    label: 'First Nations & community leadership',
    detail: 'A decision route for leaders balancing long-term stewardship and action.',
    slugs: ['which-solution-works-here', 'can-our-team-work-out-what-goes-first', 'how-fast-can-you-know-what-to-do-next'],
  },
  {
    id: 'agriculture',
    label: 'Agriculture & food',
    detail: 'Water, soil, and supply-chain exposure that needs commercial attention.',
    slugs: ['soil-health-the-hidden-supply-chain-risk', 'water-scarcity-corporate-water-dependency', 'ocean-acidification-the-marine-supply-chain-risk'],
  },
  {
    id: 'real-estate',
    label: 'Real estate & infrastructure',
    detail: 'Location risk, operating exposure, and asset-level resilience choices.',
    slugs: ['strategic-location-planning-the-risk-cfos-are-not-pricing', 'location-risk-heat-map-layers', 'water-scarcity-corporate-water-dependency'],
  },
  {
    id: 'channel-partners',
    label: 'Channel partners',
    detail: 'Client-ready research for advisors, accountants, and industry associations.',
    slugs: ['the-polycrisis-what-your-clients-advisors-need-to-know', 'tnfd-what-financial-advisors-need-to-know', 'how-sustainability-consultants-help-improve-your-supply-chain'],
  },
  {
    id: 'industrial',
    label: 'Industrial operations',
    detail: 'Process, operating exposure, supply continuity, and plant-level decision order.',
    slugs: ['what-is-the-right-order-worth', 'the-accountability-gap-why-sustainability-strategies-gather-dust', 'how-sustainability-consultants-help-improve-your-supply-chain'],
  },
  {
    id: 'transportation',
    label: 'Transportation & logistics',
    detail: 'Fleet, route, depot, supply-chain, and network resilience decisions.',
    slugs: ['how-sustainability-consultants-help-improve-your-supply-chain', 'strategic-location-planning-the-risk-cfos-are-not-pricing', 'what-an-actionable-plan-contains'],
  },
] as const;

const availableSectorReadingRoutes = SECTOR_READING_ROUTES.filter((route) => (
  route.slugs.some((slug) => articles.some((article) => article.slug === slug))
));

export default function Articles() {
  const [location] = useLocation();
  useSEO({
    title: 'Research & Insights',
    description: 'Original research for finance leaders and operational decision-makers on the environmental polycrisis, nature risk, location risk, and how to turn sustainability into a profit centre. The Right Things in the Right Order.',
    canonicalPath: '/articles',
    ogType: 'website',
    ogImage: 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/og-social-share-TjcXvbM8Zm8Zo3haX98724.png',
    jsonLd: [
      organizationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Enduring Advantage Research & Insights',
        description:
          'Original research on sustainability strategy, ESG disclosure, carbon accounting, and profitable environmental performance.',
        url: 'https://enduringadvantage.com/articles',
        publisher: {
          '@type': 'Organization',
          name: 'Enduring Advantage',
          url: 'https://enduringadvantage.com',
        },
      },
    ],
  });

  const [activeTag, setActiveTag] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tag');
  });
  const [activeAuthor, setActiveAuthor] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
  });
  const [activeSector, setActiveSector] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('sector');
  });
  const [showAllTopics, setShowAllTopics] = useState(false);

  // Sync query filters when navigation updates the Articles route.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActiveTag(params.get('tag'));
    setActiveSector(params.get('sector'));
  }, [location]);

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (activeTag) result = result.filter((a) => (a.tags ?? []).includes(activeTag));
    if (activeAuthor) result = result.filter((a) => a.author === activeAuthor);
    if (activeCategory) result = result.filter((a) => a.category === activeCategory);
    const selectedRoute = availableSectorReadingRoutes.find((route) => route.id === activeSector);
    if (selectedRoute) result = result.filter((article) => selectedRoute.slugs.includes(article.slug as never));
    return result;
  }, [activeTag, activeAuthor, activeCategory, activeSector]);

  const priorityBriefing = articles.find((article) => article.slug === PRIORITY_BRIEFING_SLUG);
  const mostSharedArticles = VERIFIED_MOST_SHARED_SLUGS
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is (typeof articles)[0] => Boolean(article));
  const trendingSoonWatchlist = TRENDING_SOON_WATCHLIST_SLUGS
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article): article is (typeof articles)[0] => Boolean(article));
  // Featured = first featured article in filtered set, fallback to first.
  // The priority briefing remains a separate editorial entry point rather than a repeated card.
  const featured = filteredArticles.find((article) => article.featured && article.slug !== priorityBriefing?.slug)
    ?? filteredArticles.find((article) => article.slug !== priorityBriefing?.slug);
  const rest = featured
    ? filteredArticles.filter((article) => article.slug !== featured.slug && article.slug !== priorityBriefing?.slug)
    : [];
  const prioritizedTopics = orderedTags.slice(0, PRIORITIZED_TOPIC_COUNT);
  const visibleTopics = showAllTopics
    ? orderedTags
    : activeTag && !prioritizedTopics.includes(activeTag)
      ? [...prioritizedTopics, activeTag]
      : prioritizedTopics;
  const firstResearchSet = rest.slice(0, 6);
  const remainingResearch = rest.slice(6);

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      <Navigation />

      {/* Page header */}
      <section
        style={{
          background: 'var(--color-slate-deep)',
          paddingTop: '7rem',
          paddingBottom: '4rem',
        }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end" style={{ gap: 'clamp(2rem, 5vw, 4.5rem)' }}>
          <div style={{ maxWidth: '720px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: '100px',
                padding: '0.3rem 1rem',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                }}
              >
                Evidence That Informs Better Decisions
              </span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: 'var(--color-cream)',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
              }}
            >
              The Research Behind the Right Answer.
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'rgba(250,247,242,0.65)',
                maxWidth: '560px',
              }}
            >
              Thousands of sustainability options compete for your attention. Most of them are wrong for your organization. This research library exists to help CFOs cut through the noise, understand which initiatives deliver the strongest business case, and know what questions to ask before committing capital. Every piece is written for leaders who treat sustainability as a financial performance opportunity, not a compliance cost.
            </p>
          </div>
          <ResearchArchiveArtifact />
          </div>

          {/* Tag filter chips */}
          <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.4)', marginRight: '0.25rem' }}>
              <Tag size={11} /> Filter
            </span>
            {visibleTopics.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: activeTag === tag ? 800 : 600,
                  padding: '0.32rem 0.55rem',
                  borderRadius: 0,
                  border: activeTag === tag
                    ? '1.5px solid rgba(134,239,172,0.7)'
                    : '1px solid rgba(250,247,242,0.18)',
                  background: activeTag === tag
                    ? 'rgba(201,168,76,0.35)'
                    : 'rgba(250,247,242,0.06)',
                  color: activeTag === tag ? '#C9A84C' : 'rgba(250,247,242,0.65)',
                  cursor: 'pointer',
                  transition: 'all 0.15s cubic-bezier(0.23,1,0.32,1)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={(e) => {
                  if (activeTag !== tag) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.12)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.9)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTag !== tag) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.06)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.65)';
                  }
                }}
              >
                {tag}
              </button>
            ))}
            {orderedTags.length > PRIORITIZED_TOPIC_COUNT && (
              <button
                onClick={() => setShowAllTopics((current) => !current)}
                aria-expanded={showAllTopics}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.3rem 0.7rem',
                  borderRadius: '100px',
                  border: '1px solid rgba(201,168,76,0.46)',
                  background: 'rgba(201,168,76,0.08)',
                  color: '#F0D070',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                {showAllTopics ? 'Show fewer themes' : `View all ${orderedTags.length} themes`}
              </button>
            )}
            {(activeTag || activeAuthor || activeCategory || activeSector) && (
              <button
                onClick={() => { setActiveTag(null); setActiveAuthor(null); setActiveCategory(null); setActiveSector(null); }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  padding: '0.3rem 0.85rem',
                  borderRadius: '100px',
                  border: '1px solid rgba(250,247,242,0.12)',
                  background: 'transparent',
                  color: 'rgba(250,247,242,0.35)',
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                Clear ✕
              </button>
            )}
          </div>

          {/* Author filter chips */}
          <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.4)', marginRight: '0.25rem' }}>
              By author
            </span>
            {principalAuthors.map((author) => {
              const isActive = activeAuthor === author.name;
              return (
                <React.Fragment key={author.name}>
                <button
                  onClick={() => setActiveAuthor(isActive ? null : author.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 700 : 500,
                    padding: '0.25rem 0.75rem 0.25rem 0.35rem',
                    borderRadius: '100px',
                    border: isActive
                      ? '1.5px solid rgba(134,239,172,0.7)'
                      : '1px solid rgba(250,247,242,0.18)',
                    background: isActive
                      ? 'rgba(201,168,76,0.35)'
                      : 'rgba(250,247,242,0.06)',
                    color: isActive ? '#C9A84C' : 'rgba(250,247,242,0.65)',
                    cursor: 'pointer',
                    transition: 'all 0.15s cubic-bezier(0.23,1,0.32,1)',
                  }}
                >
                  <img
                    src={author.photo}
                    alt={author.name}
                    width="22"
                    height="22"
                    loading="lazy"
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0,
                      boxShadow: isActive ? '0 0 0 1.5px #C9A84C' : '0 0 0 1.5px rgba(250,247,242,0.3)',
                    }}
                  />
                  {author.name}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '18px',
                      height: '18px',
                      borderRadius: '100px',
                      padding: '0 4px',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      background: isActive ? 'rgba(134,239,172,0.25)' : 'rgba(250,247,242,0.12)',
                      color: isActive ? '#C9A84C' : 'rgba(250,247,242,0.5)',
                    }}
                  >
                    {authorArticleCount[author.name] ?? 0}
                  </span>
                </button>
                {/* Link to author landing page */}
                <a
                  href={`/articles/author/${author.slug}`}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600,
                    color: 'rgba(250,247,242,0.3)', textDecoration: 'none',
                    letterSpacing: '0.04em',
                    transition: 'color 0.12s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.65)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.3)'; }}
                >
                  ↗
                </a>
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </section>

      {/* Sector routes, shown only while their underlying research is public. */}
      {availableSectorReadingRoutes.length > 0 && <section aria-labelledby="sector-reading-routes" style={{ background: '#F0EDE6', borderBottom: '1px solid #DED5C5', padding: '2.4rem 0' }}>
        <div className="container">
          <div className="flex flex-wrap items-end justify-between" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <p style={{ color: '#A9832C', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.45rem' }}>Choose your context</p>
              <h2 id="sector-reading-routes" style={{ color: 'var(--color-slate-deep)', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.55rem, 3vw, 2.2rem)', lineHeight: 1.08, margin: 0 }}>Start with the pressures closest to your sector.</h2>
            </div>
            {activeSector && <button onClick={() => setActiveSector(null)} style={{ background: 'none', border: 'none', color: '#0D3349', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 800, padding: 0 }}>Clear sector route</button>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ gap: '1px', background: '#D8CEBC', border: '1px solid #D8CEBC' }}>
            {availableSectorReadingRoutes.map((route, index) => {
              const selected = activeSector === route.id;
              return (
                <button
                  key={route.id}
                  onClick={() => setActiveSector(selected ? null : route.id)}
                  aria-pressed={selected}
                  className="text-left"
                  style={{ background: selected ? '#0D3349' : '#FAF7F2', border: 'none', cursor: 'pointer', minHeight: '154px', padding: '1.2rem', transition: 'background 180ms cubic-bezier(0.23, 1, 0.32, 1), transform 180ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                  onMouseEnter={(event) => { if (!selected) { event.currentTarget.style.background = '#FFFDF8'; event.currentTarget.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={(event) => { if (!selected) { event.currentTarget.style.background = '#FAF7F2'; event.currentTarget.style.transform = 'translateY(0)'; } }}
                >
                  <span style={{ color: selected ? '#F0D070' : '#A9832C', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.12em', marginBottom: '0.6rem' }}>{String(index + 1).padStart(2, '0')}</span>
                  <span style={{ color: selected ? '#FAF7F2' : 'var(--color-slate-deep)', display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.08rem', fontWeight: 700, lineHeight: 1.12 }}>{route.label}</span>
                  <span style={{ color: selected ? 'rgba(250,247,242,0.68)' : '#66767A', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.74rem', lineHeight: 1.5, marginTop: '0.55rem' }}>{route.detail}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>}

      {/* Priority editorial briefing, a curated entry point before the wider research library */}
      {priorityBriefing && (
        <section style={{ padding: '2.75rem 0 0' }}>
          <div className="container">
            <div
              className="grid grid-cols-1 lg:grid-cols-[minmax(230px,0.72fr)_minmax(0,1.48fr)]"
              style={{ boxShadow: '0 10px 38px rgba(13,51,73,0.11)' }}
            >
              <div style={{ background: 'var(--color-slate-deep)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.78)', color: '#F0D070', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '1.15rem' }}>01</div>
                  <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.7rem' }}>Latest research briefing</p>
                  <h2 style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.55rem, 2.8vw, 2.15rem)', lineHeight: 1.07, margin: 0 }}>A live view of systemic risk.</h2>
                </div>
                  <p style={{ color: 'rgba(250,247,242,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', lineHeight: 1.65, margin: '1.5rem 0 0' }}>A focused briefing that connects physical exposure with the financial and operating decisions that need attention now.</p>
              </div>

              <Link href={`/articles/${priorityBriefing.slug}`} style={{ background: '#FFFDF8', padding: 'clamp(1.55rem, 3.5vw, 2.65rem)', textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '254px', border: '1px solid #DED5C5', transition: 'background 180ms cubic-bezier(0.23, 1, 0.32, 1), transform 180ms cubic-bezier(0.23, 1, 0.32, 1)' }} onMouseEnter={(event) => { event.currentTarget.style.background = '#FFFFFF'; event.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(event) => { event.currentTarget.style.background = '#FFFDF8'; event.currentTarget.style.transform = 'translateY(0)'; }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <span style={{ color: '#A9832C', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{priorityBriefing.category}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#64757A', fontFamily: 'var(--font-body)', fontSize: '0.72rem' }}><Calendar size={12} /> {priorityBriefing.date}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#64757A', fontFamily: 'var(--font-body)', fontSize: '0.72rem' }}><Clock size={12} /> Estimated {priorityBriefing.readTime}</span>
                  </div>
                  <h3 style={{ color: 'var(--color-slate-deep)', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.42rem, 2.5vw, 2rem)', lineHeight: 1.12, margin: '0 0 0.85rem', maxWidth: '720px' }}>{priorityBriefing.title}</h3>
                  <p style={{ color: '#53656A', fontFamily: 'var(--font-body)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0, maxWidth: '760px' }}>{priorityBriefing.excerpt}</p>
                </div>
                <span style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, marginTop: '1.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>Read the latest briefing <ArrowRight size={14} /></span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Most Shared, shown only with verified rankings rather than manufactured popularity */}
      <section aria-labelledby="most-shared-heading" style={{ padding: '3.25rem 0 0' }}>
        <div className="container">
          <div style={{ background: '#0D3349', borderTop: '3px solid #C9A84C', boxShadow: '0 10px 30px rgba(13,51,73,0.11)', padding: 'clamp(1.55rem, 3vw, 2.45rem)' }}>
            <div className="flex flex-wrap items-end justify-between" style={{ gap: '1.25rem', marginBottom: mostSharedArticles.length ? '1.5rem' : 0 }}>
              <div style={{ maxWidth: '690px' }}>
                <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.55rem' }}>Selected Reading</p>
                <h2 id="most-shared-heading" style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.65rem, 3vw, 2.35rem)', lineHeight: 1.08, margin: 0 }}>
                  {mostSharedArticles.length ? 'Research readers are putting in front of their teams.' : 'Current research briefings.'}
                </h2>
              </div>
              <div style={{ alignItems: 'center', border: '1px solid rgba(201,168,76,0.45)', color: '#F0D070', display: 'inline-flex', fontFamily: 'var(--font-body)', fontSize: '0.73rem', fontWeight: 800, gap: '0.45rem', letterSpacing: '0.07em', padding: '0.42rem 0.68rem', textTransform: 'uppercase' }}>
                {mostSharedArticles.length ? <Tag size={13} /> : <span className="animate-pulse motion-reduce:animate-none" style={{ background: '#F0D070', borderRadius: '50%', display: 'inline-block', height: '7px', width: '7px' }} />}
                {mostSharedArticles.length ? 'Verified share signals' : 'Collecting signals'}
              </div>
            </div>

            {mostSharedArticles.length ? (
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1px', background: 'rgba(250,247,242,0.18)', border: '1px solid rgba(250,247,242,0.18)' }}>
                {mostSharedArticles.map((article, index) => (
                  <Link key={article.slug} href={`/articles/${article.slug}`} style={{ background: 'rgba(250,247,242,0.06)', color: '#FAF7F2', padding: '1.2rem', textDecoration: 'none' }}>
                    <span style={{ color: '#F0D070', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '0.65rem' }}>{String(index + 1).padStart(2, '0')} · MOST SHARED</span>
                    <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.18rem', fontWeight: 700, lineHeight: 1.13 }}>{article.title}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div>
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] md:items-end" style={{ gap: '1.2rem', marginTop: '1.1rem' }}>
                <div>
                  <p style={{ color: 'rgba(250,247,242,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0, maxWidth: '680px' }}>Start with these research briefings, selected for decision questions that recur across sectors.</p>
                </div>
                <Link href="/articles" style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}>Browse research <ArrowRight size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /></Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '0.65rem', marginTop: '1.25rem' }}>
                {trendingSoonWatchlist.map((article, index) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    style={{ background: 'rgba(250,247,242,0.055)', border: '1px solid rgba(250,247,242,0.14)', color: '#FAF7F2', minHeight: '138px', padding: '1rem', textDecoration: 'none', transform: 'translateY(0)', transition: 'background 180ms cubic-bezier(0.23, 1, 0.32, 1), border-color 180ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 180ms cubic-bezier(0.23, 1, 0.32, 1), transform 180ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                    onMouseEnter={(event) => { event.currentTarget.style.background = 'rgba(201,168,76,0.16)'; event.currentTarget.style.borderColor = 'rgba(201,168,76,0.62)'; event.currentTarget.style.boxShadow = '0 10px 22px rgba(0,0,0,0.18)'; event.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={(event) => { event.currentTarget.style.background = 'rgba(250,247,242,0.055)'; event.currentTarget.style.borderColor = 'rgba(250,247,242,0.14)'; event.currentTarget.style.boxShadow = 'none'; event.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <span style={{ color: '#F0D070', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.11em', marginBottom: '0.6rem', textTransform: 'uppercase' }}>Signal watch {String(index + 1).padStart(2, '0')}</span>
                    <span style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.08rem', fontWeight: 700, lineHeight: 1.1 }}>{article.title}</span>
                    <span style={{ color: 'rgba(250,247,242,0.62)', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, marginTop: '0.65rem' }}>Read research <ArrowRight size={12} style={{ display: 'inline', verticalAlign: '-2px' }} /></span>
                  </Link>
                ))}
              </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured article, wide card */}
      {!featured ? (
        <section style={{ padding: '6rem 0', textAlign: 'center' }}>
          <div className="container">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'rgba(30,45,47,0.45)' }}>
              No articles match this filter. <button onClick={() => { setActiveTag(null); setActiveAuthor(null); setActiveCategory(null); setActiveSector(null); }} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer', fontWeight: 600 }}>Clear filter</button>
            </p>
          </div>
        </section>
      ) : (
      <section style={{ padding: '4rem 0 0' }}>
        <div className="container">
          <Link href={`/articles/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(30,45,47,0.12)',
                cursor: 'pointer',
                transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s cubic-bezier(0.23,1,0.32,1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 16px 56px rgba(30,45,47,0.18)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 8px 40px rgba(30,45,47,0.12)';
              }}
            >
              {/* Image half */}
              <div style={{ position: 'relative', minHeight: '380px', overflow: 'hidden' }}>
                <img
                  src={featured.heroImage}
                  alt={featured.heroAlt}
                  width="800"
                  height="380"
                  loading="eager"
                  fetchPriority="high"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    inset: 0,
                    transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(30,45,47,0.3) 0%, transparent 60%)',
                  }}
                />
                {/* Category badge + Featured badge over image */}
                <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      background: '#C9A84C',
                      borderRadius: '100px',
                      padding: '0.25rem 0.85rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#fff',
                      }}
                    >
                      {featured.category}
                    </span>
                  </div>
                  <div
                    style={{
                      background: 'rgba(234,179,8,0.9)',
                      borderRadius: '100px',
                      padding: '0.25rem 0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <span style={{ fontSize: '0.6rem' }}>★</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#fff',
                      }}
                    >
                      Featured
                    </span>
                  </div>
                </div>
              </div>

              {/* Text half */}
              <div
                style={{
                  background: 'var(--color-slate-deep)',
                  padding: '3rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        color: 'rgba(250,247,242,0.45)',
                      }}
                    >
                      <Calendar size={13} />
                      {featured.date}
                    </span>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.8rem',
                        color: 'rgba(250,247,242,0.45)',
                      }}
                    >
                      <Clock size={13} />
                      {featured.readTime}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      fontWeight: 700,
                      color: 'var(--color-cream)',
                      lineHeight: 1.2,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {featured.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      lineHeight: 1.75,
                      color: 'rgba(250,247,242,0.6)',
                    }}
                  >
                    {featured.excerpt}
                  </p>

                  {/* Tag pills on featured card */}
                  {featured.tags && featured.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.25rem' }}>
                      {featured.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            padding: '0.2rem 0.65rem',
                            borderRadius: '100px',
                            background: 'rgba(201,168,76,0.15)',
                            color: 'rgba(134,239,172,0.85)',
                            border: '1px solid rgba(201,168,76,0.35)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '2rem',
                  }}
                >
                  {/* Author mini-chip */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {authorPhotoMap[featured.author] ? (
                      <img
                        src={authorPhotoMap[featured.author]}
                        alt={featured.author}
                        width="28"
                        height="28"
                        loading="lazy"
                        style={{
                          width: '28px', height: '28px',
                          borderRadius: '50%', objectFit: 'cover',
                          boxShadow: '0 0 0 2px rgba(134,239,172,0.4)',
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: 'rgba(201,168,76,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.6rem', fontWeight: 700, color: '#C9A84C',
                      }}>
                        EA
                      </div>
                    )}
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(250,247,242,0.5)' }}>
                      {featured.author}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#C9A84C',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    Read article <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
      )}

      {/* Remaining articles, 2-column grid */}
      <section style={{ padding: '3rem 0 6rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2rem',
              marginTop: '2rem',
            }}
          >
            {firstResearchSet.map((article, idx) => (
              <ArticleCard key={article.slug} article={article} dark={idx % 2 === 1} onAuthorClick={(author) => setActiveAuthor(activeAuthor === author ? null : author)} />
            ))}
          </div>

          {remainingResearch.length > 0 && (
            <div
              className="grid grid-cols-1 lg:grid-cols-[minmax(240px,0.82fr)_minmax(0,1.5fr)]"
              style={{ margin: '3rem 0', boxShadow: '0 10px 36px rgba(13,51,73,0.1)' }}
            >
              <div style={{ background: 'var(--color-slate-deep)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.76)', color: '#F0D070', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '1.1rem' }}>02</div>
                  <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.7rem' }}>A reading route</p>
                  <h2 style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.55rem, 3vw, 2.15rem)', lineHeight: 1.07, margin: 0 }}>Follow the decision before the detail.</h2>
                </div>
                <Link href="/articles" style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, textDecoration: 'none', marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>Browse the research library <ArrowRight size={14} /></Link>
              </div>
              <div style={{ background: '#F2F0EA', border: '1px solid #DED5C5', borderLeft: '4px solid #71896F', padding: 'clamp(1.6rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#567059', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>Research map</p>
                  <h3 style={{ color: 'var(--color-slate-deep)', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.45rem, 2.5vw, 2rem)', lineHeight: 1.12, margin: '0 0 0.85rem' }}>Move from exposure to a next action that can hold up.</h3>
                  <p style={{ color: '#53656A', fontFamily: 'var(--font-body)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0, maxWidth: '720px' }}>Use the library as a decision sequence: establish the financial frame, inspect the operational or supply-chain exposure, then test what deserves to be done first.</p>
                </div>
                <div className="flex flex-wrap items-center" style={{ gap: '0.55rem', marginTop: '1.5rem' }}>
                  {['Financial frame', 'Material exposure', 'Accountable action'].map((step, index) => (
                    <React.Fragment key={step}>
                      <span style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800, padding: '0.35rem 0.65rem', border: '1px solid #B7C5B8', background: '#FAF7F2' }}>{String(index + 1).padStart(2, '0')} · {step}</span>
                      {index < 2 && <ArrowRight size={13} color="#A9832C" aria-hidden="true" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {remainingResearch.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '2rem',
              }}
            >
              {remainingResearch.map((article, idx) => (
                <ArticleCard key={article.slug} article={article} dark={idx % 2 === 0} onAuthorClick={(author) => setActiveAuthor(activeAuthor === author ? null : author)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ResearchArchiveArtifact() {
  const evidenceSteps = [
    { number: '01', label: 'Financial case', detail: 'The capital logic that needs to hold.' },
    { number: '02', label: 'System exposure', detail: 'The operating risk that changes the order.' },
    { number: '03', label: 'Delivery path', detail: 'The action that can be made accountable.' },
  ];

  return (
    <aside aria-label="The Enduring Advantage research decision map" style={{ background: 'linear-gradient(145deg, rgba(250,247,242,0.1), rgba(250,247,242,0.035))', border: '1px solid rgba(201,168,76,0.36)', borderTop: '3px solid #C9A84C', boxShadow: '0 16px 34px rgba(0,0,0,0.16)', padding: '1.25rem', position: 'relative' }}>
      <div aria-hidden="true" style={{ background: 'rgba(113,137,111,0.45)', height: '64%', left: '28px', position: 'absolute', top: '61px', width: '1px' }} />
      <div className="flex items-start justify-between" style={{ gap: '1rem', marginBottom: '1.25rem', position: 'relative' }}>
        <div>
          <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', margin: '0 0 0.4rem', textTransform: 'uppercase' }}>Research map</p>
          <h2 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.35rem', lineHeight: 1.06, margin: 0 }}>Evidence before the next commitment.</h2>
        </div>
        <span style={{ alignItems: 'center', border: '1px solid rgba(201,168,76,0.65)', borderRadius: '50%', color: '#F0D070', display: 'inline-flex', flex: '0 0 36px', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, height: '36px', justifyContent: 'center' }}>EA</span>
      </div>
      <div style={{ display: 'grid', gap: '0.8rem', position: 'relative' }}>
        {evidenceSteps.map((step) => (
          <div key={step.number} style={{ alignItems: 'center', display: 'grid', gap: '0.75rem', gridTemplateColumns: '32px minmax(0, 1fr)' }}>
            <span style={{ alignItems: 'center', background: '#0D3349', border: '1px solid rgba(201,168,76,0.7)', borderRadius: '50%', color: '#F0D070', display: 'inline-flex', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 800, height: '30px', justifyContent: 'center', width: '30px' }}>{step.number}</span>
            <div>
              <p style={{ color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 800, margin: 0 }}>{step.label}</p>
              <p style={{ color: 'rgba(250,247,242,0.58)', fontFamily: 'var(--font-body)', fontSize: '0.7rem', lineHeight: 1.45, margin: '0.18rem 0 0' }}>{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <p style={{ borderTop: '1px solid rgba(250,247,242,0.15)', color: 'rgba(250,247,242,0.6)', fontFamily: 'var(--font-body)', fontSize: '0.71rem', lineHeight: 1.45, margin: '1.1rem 0 0', paddingTop: '0.85rem' }}>A research system for finance, operations, supply chains, and place-based risk.</p>
    </aside>
  );
}

function BriefingNewsletterForm() {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [state, handleSubmit] = useForm('xwvgzqae');
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const emailError = emailTouched && !emailIsValid
    ? (email.trim() ? 'Enter a valid work email address.' : 'Enter your work email to receive the digest.')
    : null;

  const submitNewsletter = (event: React.FormEvent<HTMLFormElement>) => {
    if (!emailIsValid) {
      event.preventDefault();
      setEmailTouched(true);
      return;
    }
    handleSubmit(event);
  };

  if (state.succeeded) {
    return (
      <div role="status" style={{ alignItems: 'center', color: '#0D3349', display: 'flex', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, gap: '0.55rem', margin: 0, padding: '0.35rem 0' }}>
        <span style={{ alignItems: 'center', background: '#E4EFE5', borderRadius: '50%', display: 'inline-flex', height: '28px', justifyContent: 'center', width: '28px' }}><Check size={15} color="#567059" /></span>
        <span>You&apos;re on the Research Digest list. Watch your inbox for the next briefing.</span>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submitNewsletter} style={{ alignItems: 'flex-start', display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
      <input type="hidden" name="form_type" value="Research Digest Signup" />
      <input type="hidden" name="source" value="Articles priority briefing" />
      <label className="sr-only" htmlFor="articles-briefing-email">Work email</label>
      <div style={{ flex: '1 1 210px' }}>
        <input
          aria-describedby={emailError ? 'articles-briefing-email-error' : undefined}
          aria-invalid={Boolean(emailError)}
          id="articles-briefing-email"
          name="email"
          type="email"
          required
          value={email}
          onBlur={() => setEmailTouched(true)}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@organization.com"
          style={{ background: '#FFFFFF', border: `1px solid ${emailError ? '#B66A6A' : '#C9A84C'}`, color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.84rem', outline: 'none', padding: '0.72rem 0.85rem', width: '100%' }}
        />
        {emailError && <span id="articles-briefing-email-error" role="alert" style={{ color: '#A64545', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.71rem', lineHeight: 1.35, marginTop: '0.32rem' }}>{emailError}</span>}
        {state.errors && <span role="alert" style={{ color: '#A64545', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.71rem', lineHeight: 1.35, marginTop: '0.32rem' }}>We could not add you right now. Please try again.</span>}
      </div>
      <button type="submit" disabled={state.submitting} aria-live="polite" className="inline-flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 hover:brightness-110" style={{ background: '#0D3349', border: 'none', color: '#FAF7F2', cursor: state.submitting ? 'wait' : 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 800, minHeight: '42px', opacity: state.submitting ? 0.72 : 1, padding: '0.72rem 0.95rem', whiteSpace: 'nowrap' }}>
        {state.submitting ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <Mail size={14} aria-hidden="true" />} {state.submitting ? 'Adding you…' : 'Receive research'}
      </button>
    </form>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({ article, dark, onAuthorClick }: { article: (typeof articles)[0]; dark: boolean; onAuthorClick?: (author: string) => void }) {
  return (
    <Link href={`/articles/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: dark
            ? '0 4px 24px rgba(30,45,47,0.18)'
            : '0 4px 24px rgba(30,45,47,0.08)',
          background: dark ? 'var(--color-slate-deep)' : '#fff',
          cursor: 'pointer',
          transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1), box-shadow 0.25s cubic-bezier(0.23,1,0.32,1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = 'translateY(-4px)';
          el.style.boxShadow = dark
            ? '0 12px 40px rgba(30,45,47,0.28)'
            : '0 12px 40px rgba(30,45,47,0.14)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = 'translateY(0)';
          el.style.boxShadow = dark
            ? '0 4px 24px rgba(30,45,47,0.18)'
            : '0 4px 24px rgba(30,45,47,0.08)';
        }}
      >
        {/* Cover image */}
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={article.heroImage}
            alt={article.heroAlt}
            width="600"
            height="200"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(0.23,1,0.32,1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: dark
                ? 'linear-gradient(180deg, transparent 40%, rgba(30,45,47,0.6) 100%)'
                : 'linear-gradient(180deg, transparent 50%, rgba(30,45,47,0.15) 100%)',
            }}
          />
          {/* Category badge + optional Featured badge */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <div
              style={{
                background: '#C9A84C',
                borderRadius: '100px',
                padding: '0.2rem 0.75rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                {article.category}
              </span>
            </div>
            {article.featured && (
              <div
                style={{
                  background: 'rgba(234,179,8,0.9)',
                  borderRadius: '100px',
                  padding: '0.2rem 0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <span style={{ fontSize: '0.55rem', color: '#fff' }}>★</span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#fff',
                  }}
                >
                  Featured
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card body */}
        <div
          style={{
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: dark ? 'rgba(250,247,242,0.4)' : 'rgba(30,45,47,0.4)',
              }}
            >
              <Calendar size={12} />
              {article.date}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: dark ? 'rgba(250,247,242,0.4)' : 'rgba(30,45,47,0.4)',
              }}
            >
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: 700,
              color: dark ? 'var(--color-cream)' : 'var(--color-slate-deep)',
              lineHeight: 1.25,
              marginBottom: '0.85rem',
            }}
          >
            {article.title}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: dark ? 'rgba(250,247,242,0.55)' : 'rgba(30,45,47,0.6)',
              flexGrow: 1,
            }}
          >
            {article.excerpt}
          </p>

          {/* Tag pills */}
          {article.tags && article.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '1.25rem' }}>
              {article.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '100px',
                    background: dark ? 'rgba(201,168,76,0.18)' : 'rgba(201,168,76,0.1)',
                    color: dark ? '#C9A84C' : '#C9A84C',
                    border: dark ? '1px solid rgba(201,168,76,0.3)' : '1px solid rgba(201,168,76,0.2)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider + CTA */}
          <div
            style={{
              marginTop: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: dark
                ? '1px solid rgba(250,247,242,0.1)'
                : '1px solid rgba(30,45,47,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <button
              onClick={(e) => { e.preventDefault(); onAuthorClick?.(article.author); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.45rem',
                background: 'none', border: 'none', padding: 0, cursor: onAuthorClick ? 'pointer' : 'default',
              }}
            >
              {authorPhotoMap[article.author] ? (
                <img
                  src={authorPhotoMap[article.author]}
                  alt={article.author}
                  width="24"
                  height="24"
                  loading="lazy"
                  style={{
                    width: '24px', height: '24px',
                    borderRadius: '50%', objectFit: 'cover',
                    boxShadow: dark
                      ? '0 0 0 1.5px rgba(134,239,172,0.35)'
                      : '0 0 0 1.5px rgba(201,168,76,0.35)',
                  }}
                />
              ) : (
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: dark ? 'rgba(201,168,76,0.25)' : 'rgba(201,168,76,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.55rem', fontWeight: 700,
                  color: dark ? '#C9A84C' : '#C9A84C',
                  flexShrink: 0,
                }}>
                  EA
                </div>
              )}
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: dark ? 'rgba(250,247,242,0.4)' : 'rgba(30,45,47,0.4)',
                }}
              >
                {article.author}
              </span>
            </button>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#C9A84C',
              }}
            >
              Read <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

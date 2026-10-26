// =============================================================================
// ENDURING ADVANTAGE, Author Landing Page
// Sage Editorial design: cream background, principal bio header, article grid
// Route: /articles/author/:slug  (slug = kebab-case author name)
// =============================================================================

import { useMemo } from 'react';
import { Link, useRoute } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';
import { articles } from '@/lib/articlesData';
import AuthorReadingRoute from '@/components/AuthorReadingRoute';
import AuthorRelatedReading from '@/components/AuthorRelatedReading';
import { AUTHOR_READING_ROUTES } from '@/lib/readingRoutes';
import { ArrowLeft, ArrowRight, Clock, Calendar, Linkedin } from 'lucide-react';
import NotFound from './NotFound';

// ── Principal author data ─────────────────────────────────────────────────────
const PRINCIPALS: Record<string, {
  name: string;
  slug: string;
  title: string;
  photo: string;
  linkedin?: string;
  bio: string;
  shortBio: string;
}> = {
  'rob-kirkby': {
    name: 'Rob Kirkby',
    slug: 'rob-kirkby',
    title: 'Founder and CEO',
    photo: '/manus-storage/RobKirkby_402e0e7f.jpeg',
    bio: 'Rob Kirkby is Founder and CEO of Enduring Advantage. His research examines the physical climate signals that need to inform today’s operating, capital, and resilience decisions.',
    shortBio: 'Research on climate risk, energy systems, and the decisions leaders need to make before changing conditions become operating constraints.',
  },
};

// Map author name → photo for article cards
const authorPhotoMap: Record<string, string> = {
  'Rob Kirkby': '/manus-storage/RobKirkby_402e0e7f.jpeg',
};

export default function AuthorPage() {
  const [, params] = useRoute('/articles/author/:slug');
  const slug = params?.slug ?? '';
  const principal = PRINCIPALS[slug];

  const authorArticles = useMemo(
    () => articles.filter((a) => principal && a.author === principal.name),
    [principal]
  );

  useSEO({
    title: principal ? `${principal.name}, Research & Insights` : 'Author',
    description: principal ? principal.shortBio : '',
    canonicalPath: `/articles/author/${slug}`,
    ogType: 'website',
    ogImage: principal ? `https://enduringadvantage.com${principal.photo}` : undefined,
  });

  if (!principal) return <NotFound />;

  const featured = authorArticles.find((a) => a.featured) ?? authorArticles[0];
  const rest = featured ? authorArticles.filter((a) => a.slug !== featured.slug) : [];
  const readingRoute = AUTHOR_READING_ROUTES[slug];
  const readingRouteArticles = (readingRoute?.articles ?? []).flatMap((routeArticle) => {
    const article = authorArticles.find((item) => item.slug === routeArticle.slug);
    return article ? [{ article, note: routeArticle.note }] : [];
  });
  const routeSlugs = new Set((readingRoute?.articles ?? []).map((routeArticle) => routeArticle.slug));
  const routeTags = new Set(readingRouteArticles.flatMap(({ article }) => article.tags ?? []));
  const relatedReading = slug === 'rob-kirkby'
    ? articles
      .filter((article) => article.author !== principal.name && !routeSlugs.has(article.slug))
      .map((article, index) => ({
        article,
        index,
        score: (article.tags ?? []).filter((tag) => routeTags.has(tag)).length * 4
          + (article.category === 'Climate Risk' ? 2 : 0),
      }))
      .sort((left, right) => right.score - left.score || left.index - right.index)
      .slice(0, 3)
      .map(({ article }) => article)
    : [];

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      <Navigation />

      {/* ── Hero / bio header ─────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-slate-deep)',
          paddingTop: '7rem',
          paddingBottom: '4rem',
        }}
      >
        <div className="container" style={{ maxWidth: '860px' }}>
          {/* Back link */}
          <Link href="/articles">
            <a
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
                color: 'rgba(250,247,242,0.45)', textDecoration: 'none',
                marginBottom: '2.5rem',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.8)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.45)'; }}
            >
              <ArrowLeft size={13} /> All articles
            </a>
          </Link>

          {/* Principal card */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
            <img
              src={principal.photo}
              alt={principal.name}
              width="96"
              height="96"
              loading="eager"
              fetchPriority="high"
              style={{
                width: '96px', height: '96px',
                borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
                boxShadow: '0 0 0 3px #C9A84C, 0 0 0 6px rgba(201,168,76,0.25)',
              }}
            />
            <div style={{ flex: 1, minWidth: '220px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: '#C9A84C', marginBottom: '0.5rem',
                }}
              >
                Research & Insights by
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  color: 'var(--color-cream)', lineHeight: 1.1,
                  marginBottom: '0.4rem',
                }}
              >
                {principal.name}
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'rgba(250,247,242,0.45)', marginBottom: '1.25rem',
                }}
              >
                {principal.title}, Enduring Advantage
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.75,
                  color: 'rgba(250,247,242,0.65)', maxWidth: '560px',
                  marginBottom: '1.25rem',
                }}
              >
                {principal.bio}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {principal.linkedin && (
                  <a
                    href={principal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                      fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700,
                      color: '#5ba3f5', textDecoration: 'none',
                      padding: '0.4rem 0.9rem', borderRadius: '6px',
                      border: '1.5px solid rgba(91,163,245,0.3)',
                      background: 'rgba(91,163,245,0.08)',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(91,163,245,0.15)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(91,163,245,0.08)'; }}
                  >
                    <Linkedin size={14} />
                    Connect on LinkedIn
                  </a>
                )}
                <span
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                    color: 'rgba(250,247,242,0.35)',
                  }}
                >
                  {authorArticles.length} article{authorArticles.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curated author reading route ───────────────────────────────────── */}
      {readingRoute && readingRouteArticles.length > 0 && (
        <AuthorReadingRoute
          authorSlug={slug}
          route={readingRoute}
          routeArticles={readingRouteArticles}
        />
      )}

      {/* ── Article grid ──────────────────────────────────────────────────── */}
      {authorArticles.length === 0 ? (
        <section style={{ padding: '6rem 0', textAlign: 'center' }}>
          <div className="container">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'rgba(30,45,47,0.45)' }}>
              No articles published yet.
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <section style={{ padding: '4rem 0 2rem' }}>
              <div className="container" style={{ maxWidth: '900px' }}>
                <Link href={`/articles/${featured.slug}`}>
                  <a
                    style={{
                      display: 'grid',
                      gridTemplateColumns: featured.ogImage ? '1fr 1fr' : '1fr',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 40px rgba(30,45,47,0.12)',
                      textDecoration: 'none',
                      transition: 'transform 0.2s cubic-bezier(0.23,1,0.32,1)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                  >
                    {featured.ogImage && (
                      <div
                        style={{
                          backgroundImage: `url(${featured.ogImage})`,
                          backgroundSize: 'cover', backgroundPosition: 'center',
                          minHeight: '280px',
                        }}
                      />
                    )}
                    <div
                      style={{
                        background: 'var(--color-slate-deep)',
                        padding: '2.5rem',
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                          <span
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.4rem',
                              fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                              color: 'rgba(250,247,242,0.45)',
                            }}
                          >
                            <Calendar size={12} /> {featured.date}
                          </span>
                          <span
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.4rem',
                              fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                              color: 'rgba(250,247,242,0.45)',
                            }}
                          >
                            <Clock size={12} /> {featured.readTime}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700,
                              letterSpacing: '0.08em', textTransform: 'uppercase',
                              padding: '0.2rem 0.6rem', borderRadius: '100px',
                              background: 'rgba(201,168,76,0.3)', color: '#C9A84C',
                            }}
                          >
                            Featured
                          </span>
                        </div>
                        <h2
                          style={{
                            fontFamily: 'var(--font-display)', fontWeight: 700,
                            fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                            color: 'var(--color-cream)', lineHeight: 1.2,
                            marginBottom: '1rem',
                          }}
                        >
                          {featured.title}
                        </h2>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                            lineHeight: 1.7, color: 'rgba(250,247,242,0.6)',
                          }}
                        >
                          {featured.excerpt}
                        </p>
                      </div>
                      <div
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                          marginTop: '1.75rem',
                          color: '#C9A84C',
                          fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
                        }}
                      >
                        Read article <ArrowRight size={14} />
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            </section>
          )}

          {/* Rest */}
          {rest.length > 0 && (
            <section style={{ padding: '2rem 0 6rem' }}>
              <div className="container" style={{ maxWidth: '900px' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {rest.map((article) => (
                    <Link key={article.slug} href={`/articles/${article.slug}`}>
                      <a
                        style={{
                          display: 'block', textDecoration: 'none',
                          background: '#fff',
                          border: '1px solid rgba(30,45,47,0.08)',
                          borderRadius: '14px',
                          overflow: 'hidden',
                          boxShadow: '0 2px 12px rgba(30,45,47,0.06)',
                          transition: 'transform 0.18s cubic-bezier(0.23,1,0.32,1), box-shadow 0.18s ease',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.transform = 'translateY(-3px)';
                          el.style.boxShadow = '0 8px 30px rgba(30,45,47,0.12)';
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.transform = 'translateY(0)';
                          el.style.boxShadow = '0 2px 12px rgba(30,45,47,0.06)';
                        }}
                      >
                        {article.ogImage && (
                          <div
                            style={{
                              height: '160px',
                              backgroundImage: `url(${article.ogImage})`,
                              backgroundSize: 'cover', backgroundPosition: 'center',
                            }}
                          />
                        )}
                        <div style={{ padding: '1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <span
                              style={{
                                display: 'flex', alignItems: 'center', gap: '0.35rem',
                                fontFamily: 'var(--font-body)', fontSize: '0.75rem',
                                color: 'rgba(30,45,47,0.4)',
                              }}
                            >
                              <Calendar size={11} /> {article.date}
                            </span>
                            <span
                              style={{
                                display: 'flex', alignItems: 'center', gap: '0.35rem',
                                fontFamily: 'var(--font-body)', fontSize: '0.75rem',
                                color: 'rgba(30,45,47,0.4)',
                              }}
                            >
                              <Clock size={11} /> {article.readTime}
                            </span>
                          </div>
                          <h3
                            style={{
                              fontFamily: 'var(--font-display)', fontWeight: 700,
                              fontSize: '1.1rem', color: 'var(--color-slate-deep)',
                              lineHeight: 1.3, marginBottom: '0.6rem',
                            }}
                          >
                            {article.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                              color: 'rgba(30,45,47,0.55)', lineHeight: 1.65,
                              marginBottom: '1.25rem',
                            }}
                          >
                            {article.excerpt}
                          </p>
                          {/* Tags */}
                          {article.tags && article.tags.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                              {article.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  style={{
                                    fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 600,
                                    letterSpacing: '0.04em', padding: '0.15rem 0.55rem',
                                    borderRadius: '100px',
                                    background: 'rgba(201,168,76,0.1)',
                                    color: '#C9A84C',
                                    border: '1px solid rgba(201,168,76,0.2)',
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {/* Footer */}
                          <div
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              paddingTop: '1rem',
                              borderTop: '1px solid rgba(30,45,47,0.08)',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              {authorPhotoMap[article.author] && (
                                <img
                                  src={authorPhotoMap[article.author]}
                                  alt={article.author}
                                  width="22"
                                  height="22"
                                  loading="lazy"
                                  style={{
                                    width: '22px', height: '22px',
                                    borderRadius: '50%', objectFit: 'cover',
                                    boxShadow: '0 0 0 1.5px rgba(201,168,76,0.35)',
                                  }}
                                />
                              )}
                              <span
                                style={{
                                  fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600,
                                  color: 'rgba(30,45,47,0.4)',
                                }}
                              >
                                {article.author}
                              </span>
                            </div>
                            <span
                              style={{
                                display: 'flex', alignItems: 'center', gap: '0.35rem',
                                fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600,
                                color: '#C9A84C',
                              }}
                            >
                              Read <ArrowRight size={12} />
                            </span>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {slug === 'rob-kirkby' && (
        <AuthorRelatedReading authorName={principal.name} articles={relatedReading} />
      )}

      <Footer />
    </div>
  );
}

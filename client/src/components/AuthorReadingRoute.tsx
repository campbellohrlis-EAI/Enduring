import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, Linkedin, X as XIcon } from 'lucide-react';
import type { Article } from '@/lib/articlesData';
import { getTrackedPageShareUrl } from '@/lib/articlePresentation';
import { getCompletedReadingRouteArticleSlugs, type ReadingRoute } from '@/lib/readingRoutes';
import { trackEvent } from '@/lib/analytics';

type RouteArticle = { article: Article; note: string };

export default function AuthorReadingRoute({
  authorSlug,
  route,
  routeArticles,
}: {
  authorSlug: string;
  route: ReadingRoute;
  routeArticles: RouteArticle[];
}) {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>(() => getCompletedReadingRouteArticleSlugs(route.id));

  useEffect(() => {
    const syncProgress = () => setCompletedSlugs(getCompletedReadingRouteArticleSlugs(route.id));
    syncProgress();
    window.addEventListener('storage', syncProgress);
    window.addEventListener('focus', syncProgress);
    return () => {
      window.removeEventListener('storage', syncProgress);
      window.removeEventListener('focus', syncProgress);
    };
  }, [route.id]);

  const routeUrl = useMemo(() => `/articles/author/${authorSlug}#${route.anchor}`, [authorSlug, route.anchor]);
  const completionPercent = routeArticles.length > 0
    ? Math.round((completedSlugs.length / routeArticles.length) * 100)
    : 0;
  const shareSummary = `${route.heading} ${route.intro}`;

  const shareRoute = (channel: 'linkedin' | 'x') => {
    const trackedUrl = getTrackedPageShareUrl(routeUrl, channel, {
      campaign: 'reading_route',
      content: route.id,
    });

    trackEvent('reading_route_shared', {
      event_category: 'engagement',
      event_label: `${route.id}_${channel}`,
      author_slug: authorSlug,
      share_channel: channel,
    });

    if (channel === 'linkedin') {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(trackedUrl)}`,
        '_blank',
        'noopener,noreferrer,width=600,height=500',
      );
      return;
    }

    window.open(
      `https://x.com/intent/tweet?url=${encodeURIComponent(trackedUrl)}&text=${encodeURIComponent(shareSummary)}`,
      '_blank',
      'noopener,noreferrer,width=600,height=500',
    );
  };

  return (
    <section id={route.anchor} style={{ background: '#F0EDE6', borderBottom: '1px solid #DED5C5', padding: '3.5rem 0', scrollMarginTop: '88px' }}>
      <div className="container grid grid-cols-1 lg:grid-cols-[minmax(220px,0.78fr)_minmax(0,1.65fr)]" style={{ maxWidth: '1080px', gap: '2rem', alignItems: 'stretch' }}>
        <div style={{ background: 'var(--color-slate-deep)', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.75)', color: '#F0D070', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '1.25rem' }}>01</div>
            <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>{route.label}</p>
            <h2 style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.15rem)', lineHeight: 1.06, margin: 0 }}>{route.heading}</h2>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ color: 'rgba(250,247,242,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', lineHeight: 1.65, margin: 0 }}>{route.intro}</p>

            <div style={{ borderTop: '1px solid rgba(201,168,76,0.35)', marginTop: '1.35rem', paddingTop: '1rem' }}>
              <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', margin: '0 0 0.5rem', textTransform: 'uppercase' }}>Route progress</p>
              <div
                aria-label="Reading route progress"
                aria-valuemax={routeArticles.length}
                aria-valuemin={0}
                aria-valuenow={completedSlugs.length}
                aria-valuetext={`${completedSlugs.length} of ${routeArticles.length} reads completed`}
                role="progressbar"
                style={{ background: 'rgba(250,247,242,0.16)', height: '6px', overflow: 'hidden' }}
              >
                <div style={{ background: '#C9A84C', height: '100%', transition: 'width 180ms cubic-bezier(0.23, 1, 0.32, 1)', width: `${completionPercent}%` }} />
              </div>
              <p style={{ color: 'rgba(250,247,242,0.72)', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, margin: '0.55rem 0 0' }}>
                {completedSlugs.length} of {routeArticles.length} read{routeArticles.length !== 1 ? 's' : ''} completed
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginTop: '1.1rem' }}>
              <button aria-label="Share this reading route on LinkedIn" onClick={() => shareRoute('linkedin')} style={{ alignItems: 'center', background: 'rgba(250,247,242,0.06)', border: '1px solid rgba(201,168,76,0.5)', color: '#FAF7F2', cursor: 'pointer', display: 'inline-flex', fontFamily: 'var(--font-body)', fontSize: '0.74rem', fontWeight: 800, gap: '0.4rem', padding: '0.52rem 0.7rem' }} type="button">
                <Linkedin size={14} aria-hidden="true" /> LinkedIn
              </button>
              <button aria-label="Share this reading route on X" onClick={() => shareRoute('x')} style={{ alignItems: 'center', background: 'rgba(250,247,242,0.06)', border: '1px solid rgba(201,168,76,0.5)', color: '#FAF7F2', cursor: 'pointer', display: 'inline-flex', fontFamily: 'var(--font-body)', fontSize: '0.74rem', fontWeight: 800, gap: '0.4rem', padding: '0.52rem 0.7rem' }} type="button">
                <XIcon size={13} aria-hidden="true" /> Share on X
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1px', background: '#D8CEBC', border: '1px solid #D8CEBC' }}>
          {routeArticles.map(({ article, note }, index) => {
            const complete = completedSlugs.includes(article.slug);
            return (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                style={{ background: '#FAF7F2', padding: '1.45rem', textDecoration: 'none', display: 'flex', flexDirection: 'column', minHeight: '178px', transition: 'background 180ms cubic-bezier(0.23, 1, 0.32, 1), transform 180ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                onMouseEnter={(event) => { event.currentTarget.style.background = '#FFFDF8'; event.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(event) => { event.currentTarget.style.background = '#FAF7F2'; event.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span style={{ alignItems: 'center', color: complete ? '#4C8A63' : '#A9832C', display: 'inline-flex', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, gap: '0.3rem', letterSpacing: '0.12em', marginBottom: '0.7rem' }}>
                  {complete ? <Check size={14} aria-hidden="true" /> : `0${index + 1}`} {complete ? 'Completed' : ''}
                </span>
                <h3 style={{ color: 'var(--color-slate-deep)', fontFamily: 'var(--font-display)', fontSize: '1.18rem', lineHeight: 1.13, margin: '0 0 0.6rem' }}>{article.title}</h3>
                <p style={{ color: '#53656A', fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.55, margin: '0 0 1rem' }}>{note}</p>
                <span style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.76rem', fontWeight: 800, marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>{complete ? 'Read again' : 'Read article'} <ArrowRight size={13} /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

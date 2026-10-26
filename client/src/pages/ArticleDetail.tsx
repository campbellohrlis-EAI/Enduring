// =============================================================================
// ENDURING ADVANTAGE, Article Detail Page
// Navy-and-gold editorial design: cream background, financial decision-led article body
// Lead image left-aligned with text wrap on desktop
// Typography: Cormorant Garamond display + Nunito Sans body
// =============================================================================

import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { useForm, ValidationError } from '@formspree/react';
import { useSEO, articleSchema, organizationSchema, buildFAQSchema } from '@/hooks/useSEO';
import { createEmailShareDetails, createLinkedInReadyPost, createXReadyPost, formatArticleDate, getTrackedArticleShareUrl } from '@/lib/articlePresentation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BrandBreadcrumbs from '@/components/BrandBreadcrumbs';
import MobileConsultationBar from '@/components/MobileConsultationBar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getArticleBySlug, getArticleReplacementSlug, articles, ArticleSection, type Article } from '@/lib/articlesData';
import { CHECKLIST_PDF_VARIANTS, CHECKLIST_ROLE_OPTIONS, type ChecklistSector } from '@/lib/checklistData';
import { ArrowLeft, ArrowRight, Clock, Calendar, Download, Linkedin, Link2, Check, ChevronUp, Printer, RefreshCw, Share2, Bookmark, BookmarkCheck, Loader2, Mail, X as XIcon } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { getCompletedReadingRouteArticleSlugs, getReadingRoutesForArticle, markReadingRouteArticleComplete } from '@/lib/readingRoutes';
import NotFound from './NotFound';
import { trackArticleShared, trackChecklistFormStarted, trackChecklistFormSubmitted, trackEvent, trackSupplyChainChecklistDownloaded } from '@/lib/analytics';

const CAMPBELL_GUIDANCE_SLUGS = new Set([
  'which-solution-works-here',
  'what-is-the-right-order-worth',
  'from-thousands-of-options-to-one-decision',
  'how-sustainability-consultants-help-improve-your-supply-chain',
]);

const DECISION_GUIDANCE_SEQUENCE = [
  'which-solution-works-here',
  'what-is-the-right-order-worth',
  'from-thousands-of-options-to-one-decision',
  'can-our-team-work-out-what-goes-first',
  'what-an-actionable-plan-contains',
  'how-fast-can-you-know-what-to-do-next',
];

const RELATED_ARTICLE_OVERRIDES: Record<string, string[]> = {
  'seven-of-nine-planetary-boundaries-business-decision': [
    'natural-capital-the-balance-sheet-risk-most-cfos-are-not-measuring',
    'water-scarcity-corporate-water-dependency',
    'location-risk-heat-map-layers',
  ],
  'the-oceans-are-taking-the-heat': [
    'ocean-acidification-the-marine-supply-chain-risk',
    'location-risk-heat-map-layers',
    'water-scarcity-corporate-water-dependency',
  ],
  'how-sustainability-consultants-help-improve-your-supply-chain': [
    'nature-loss-the-supply-chain-risk-cfos-are-not-pricing',
    'soil-health-the-hidden-supply-chain-risk',
    'water-scarcity-corporate-water-dependency',
  ],
};

async function copyTextToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const input = document.createElement('textarea');
    input.value = value;
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(input);
    return copied;
  }
}

function ShareConfirmation({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div
      className="article-share-feedback"
      aria-live="polite"
      role="status"
      style={{
        position: 'fixed',
        zIndex: 10010,
        right: '5.75rem',
        bottom: '1.25rem',
        maxWidth: 'min(360px, calc(100vw - 2.5rem))',
        background: '#0D3349',
        border: '1px solid rgba(201,168,76,0.7)',
        boxShadow: '0 12px 32px rgba(13,51,73,0.28)',
        color: '#FAF7F2',
        fontFamily: 'var(--font-body)',
        fontSize: '0.78rem',
        fontWeight: 700,
        lineHeight: 1.45,
        padding: '0.72rem 0.9rem',
      }}
    >
      {message}
    </div>
  );
}

type SocialPreviewChannel = 'linkedin' | 'x';
type ArticleShareSurface = 'article_header' | 'article_end' | 'floating_action';

function SocialSharePreviewModal({
  open,
  onOpenChange,
  channel,
  slug,
  title,
  excerpt,
  tags,
  surface,
  onShared,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channel: SocialPreviewChannel;
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  surface: ArticleShareSurface;
  onShared: (message: string) => void;
}) {
  const isX = channel === 'x';
  const createDraft = () => (isX
    ? createXReadyPost({ title, excerpt, tags })
    : createLinkedInReadyPost({ slug, title, excerpt, tags }));
  const [draft, setDraft] = useState(createDraft);

  useEffect(() => {
    if (open) setDraft(createDraft());
  }, [open, channel, slug, title, excerpt, tags]);

  const openComposer = () => {
    const trackedUrl = getTrackedArticleShareUrl(slug, channel);
    trackArticleShared(slug, channel, surface);

    if (isX) {
      window.open(
        `https://x.com/intent/tweet?url=${encodeURIComponent(trackedUrl)}&text=${encodeURIComponent(draft)}`,
        '_blank',
        'noopener,noreferrer,width=600,height=500',
      );
      onShared('X composer opened with your edited draft and tracked article link.');
    } else {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(trackedUrl)}`,
        '_blank',
        'noopener,noreferrer,width=600,height=500',
      );
      void copyTextToClipboard(draft).then((didCopy) => {
        if (didCopy) onShared('LinkedIn composer opened and your edited post was copied to the clipboard.');
      });
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[calc(100vh-2rem)] overflow-y-auto border-0 p-0 sm:max-w-2xl"
        style={{ background: '#0D3349', boxShadow: '0 24px 72px rgba(13,51,73,0.45)' }}
      >
        <div style={{ borderTop: '3px solid #C9A84C', padding: '1.35rem 1.4rem 1.2rem' }}>
          <DialogHeader>
            <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Share preview</p>
            <DialogTitle style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.02em', paddingRight: '1.8rem' }}>
              {isX ? 'Refine your X post' : 'Refine your LinkedIn post'}
            </DialogTitle>
            <DialogDescription style={{ color: 'rgba(250,247,242,0.72)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', lineHeight: 1.55 }}>
              {isX
                ? 'Edit the post below. The tracked article link will be added separately in the X composer.'
                : 'Edit the post below. It will be copied when LinkedIn opens, together with the tracked article link already included in the draft.'}
            </DialogDescription>
          </DialogHeader>

          <label htmlFor={`social-share-draft-${channel}`} style={{ display: 'block', color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.09em', margin: '1.15rem 0 0.45rem', textTransform: 'uppercase' }}>
            Your post
          </label>
          <textarea
            id={`social-share-draft-${channel}`}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={isX ? 8 : 11}
            maxLength={isX ? 256 : undefined}
            style={{
              width: '100%',
              resize: 'vertical',
              background: 'rgba(250,247,242,0.08)',
              border: '1px solid rgba(201,168,76,0.45)',
              borderRadius: '4px',
              boxSizing: 'border-box',
              color: '#FAF7F2',
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              lineHeight: 1.55,
              minHeight: isX ? '10rem' : '13rem',
              outline: 'none',
              padding: '0.8rem 0.9rem',
            }}
            onFocus={(event) => { event.currentTarget.style.borderColor = '#F0D070'; }}
            onBlur={(event) => { event.currentTarget.style.borderColor = 'rgba(201,168,76,0.45)'; }}
          />
          <p aria-live="polite" style={{ color: isX && draft.length > 260 ? '#F0D070' : 'rgba(250,247,242,0.55)', fontFamily: 'var(--font-body)', fontSize: '0.72rem', margin: '0.45rem 0 0' }}>
            {isX ? `${draft.length}/256 characters. Space is reserved for the tracked link.` : 'The tracked article link is included in the draft.'}
          </p>

          <DialogFooter style={{ marginTop: '1.25rem' }}>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              style={{ background: 'transparent', border: '1px solid rgba(250,247,242,0.25)', color: 'rgba(250,247,242,0.78)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, padding: '0.65rem 1rem' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={openComposer}
              style={{ background: '#C9A84C', border: '1px solid #C9A84C', color: '#0D3349', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, padding: '0.65rem 1rem' }}
            >
              {isX ? 'Open X composer' : 'Open LinkedIn'}
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function openEmailComposer({ slug, title, excerpt }: { slug: string; title: string; excerpt?: string }) {
  const { subject, body } = createEmailShareDetails({ slug, title, excerpt });
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function getRelatedArticleMatchLabel(currentArticle: Article, candidate: Article) {
  const sharedTags = (candidate.tags ?? []).filter((tag) => (currentArticle.tags ?? []).includes(tag));
  if (sharedTags.length > 0) return `Shared focus: ${sharedTags.slice(0, 2).join(' · ')}`;
  if (candidate.category === currentArticle.category) return `Also in ${candidate.category}`;
  return 'Selected decision support reading';
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const article = getArticleBySlug(slug ?? '');
  const [readProgress, setReadProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const articleBodyRef = useRef<HTMLElement>(null);
  const { bookmarks, isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    const replacement = getArticleReplacementSlug(slug ?? '');
    if (replacement) setLocation(`/articles/${replacement}`, { replace: true });
  }, [slug, setLocation]);

  // Reading progress bar + back-to-top visibility, tracks scroll through the article body
  useEffect(() => {
    const onScroll = () => {
      const body = articleBodyRef.current;
      if (!body) return;
      const rect = body.getBoundingClientRect();
      const bodyHeight = body.offsetHeight;
      const windowH = window.innerHeight;
      // How far we've scrolled into the body (0 at top of body, 1 at bottom)
      const scrolled = Math.max(0, -rect.top);
      const total = Math.max(1, bodyHeight - windowH);
      const progress = Math.min(1, scrolled / total);
      setReadProgress(progress);
      // Show back-to-top button after 40% of the article has been scrolled
      setShowBackToTop(progress >= 0.4);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!article || readProgress < 0.96) return;

    getReadingRoutesForArticle(article.slug).forEach((route) => {
      const completed = getCompletedReadingRouteArticleSlugs(route.id);
      if (completed.includes(article.slug)) return;

      markReadingRouteArticleComplete(route.id, article.slug);
      trackEvent('reading_route_article_completed', {
        event_category: 'engagement',
        event_label: `${route.id}_${article.slug}`,
        article_slug: article.slug,
        route_id: route.id,
      });
    });
  }, [article, readProgress]);

  if (!article) return <NotFound />;
  const isCampbellGuidancePost = CAMPBELL_GUIDANCE_SLUGS.has(article.slug);
  const currentArticleIsSaved = isBookmarked(article.slug);
  const toggleCurrentArticleBookmark = () => toggleBookmark({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    readTime: article.readTime,
    date: article.date,
  });
  const seriesIndex = DECISION_GUIDANCE_SEQUENCE.indexOf(article.slug);
  const previousInSeries = seriesIndex > 0 ? getArticleBySlug(DECISION_GUIDANCE_SEQUENCE[seriesIndex - 1]) : undefined;
  const nextInSeries = seriesIndex >= 0 && seriesIndex < DECISION_GUIDANCE_SEQUENCE.length - 1
    ? getArticleBySlug(DECISION_GUIDANCE_SEQUENCE[seriesIndex + 1])
    : undefined;

  // Curated reading path where a topic needs specific follow-on research; otherwise rank by shared decision topics and editorial category.
  const related = (() => {
    const override = RELATED_ARTICLE_OVERRIDES[article.slug]
      ?.map((relatedSlug) => getArticleBySlug(relatedSlug))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
    if (override?.length) return override;

    const others = articles.filter((a) => a.slug !== article.slug);
    const scored = others.map((a, index) => {
      const sharedTags = (a.tags ?? []).filter((tag) => (article.tags ?? []).includes(tag));
      return {
        article: a,
        score: (sharedTags.length * 4) + (a.category === article.category ? 2 : 0),
        index,
      };
    });
    scored.sort((a, b) => b.score - a.score || a.index - b.index);
    return scored.slice(0, 3).map((s) => s.article);
  })();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useSEO({
    title: article.title,
    description: article.subtitle,
    canonicalPath: `/articles/${article.slug}`,
    ogImage: article.ogImage ?? article.heroImage,
    ogType: 'article',
    article: {
      publishedTime: article.date,
      modifiedTime: article.updatedAt,
      author: article.author,
      tags: article.tags,
      section: article.category,
    },
    jsonLd: [
      articleSchema(article),
      organizationSchema,
      ...(article.faq && article.faq.length > 0 ? [buildFAQSchema(article.faq)] : []),
    ],
  });

  return (
    <div className="pb-20 md:pb-0" style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Reading progress bar, fixed at top, visible and announced as article-reading feedback */}
      <div
        role="progressbar"
        aria-label="Article reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(readProgress * 100)}
        aria-valuetext={`${Math.round(readProgress * 100)}% read`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          zIndex: 9999,
          background: 'rgba(139,163,120,0.15)',
          pointerEvents: 'none',
        }}
      >
        <div
          className="article-reading-progress-fill"
          style={{
            height: '100%',
            width: `${readProgress * 100}%`,
            background: '#C9A84C',
            transition: 'width 0.18s cubic-bezier(0.23, 1, 0.32, 1)',
            boxShadow: '0 0 8px rgba(201,168,76,0.6)',
          }}
        />
      </div>
      <Navigation />

      {/* Article header */}
      <header
        style={{
          background: 'var(--color-slate-deep)',
          paddingTop: '7rem',
          paddingBottom: '3.5rem',
        }}
      >
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <BrandBreadcrumbs inverse items={[{ label: 'Home', href: '/' }, { label: 'Research & Insights', href: '/articles' }, { label: article.title }]} />
          </div>

          {/* Category + meta */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'rgba(201,168,76,0.85)',
                borderRadius: '100px',
                padding: '0.25rem 0.9rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#fff',
              }}
            >
              {article.category}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'rgba(250,247,242,0.4)',
              }}
            >
              <Calendar size={13} aria-hidden="true" /> Published <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            </span>
            <span
              title={`Editorially reviewed on ${formatArticleDate(article.updatedAt ?? article.date)}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'rgba(250,247,242,0.72)',
              }}
            >
              <RefreshCw size={13} aria-hidden="true" /> Last updated <time dateTime={article.updatedAt ?? article.date}>{formatArticleDate(article.updatedAt ?? article.date)}</time>
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'rgba(250,247,242,0.4)',
              }}
            >
              <Clock size={13} /> Estimated {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-cream)',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}
          >
            {article.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'rgba(250,247,242,0.6)',
              maxWidth: '680px',
              marginBottom: '2rem',
            }}
          >
            {article.subtitle}
          </p>

          {seriesIndex >= 0 && <SeriesProgressTracker currentIndex={seriesIndex} />}

          {/* Tag pills */}
          {article.tags && article.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/articles?tag=${encodeURIComponent(tag)}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '100px',
                    background: 'rgba(201,168,76,0.2)',
                    color: 'rgba(134,239,172,0.85)',
                    border: '1px solid rgba(201,168,76,0.35)',
                    textDecoration: 'none',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.35)';
                    (e.currentTarget as HTMLElement).style.color = '#C9A84C';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.2)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(134,239,172,0.85)';
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Social share buttons */}
          <ShareButtons authorName={article.author} slug={article.slug} title={article.title} excerpt={article.linkedInExcerpt ?? article.excerpt} tags={article.tags} />
          <button
            type="button"
            aria-pressed={currentArticleIsSaved}
            aria-label={currentArticleIsSaved ? `Remove ${article.title} from your reading list` : `Save ${article.title} for later`}
            onClick={toggleCurrentArticleBookmark}
            className="inline-flex items-center gap-2 active:scale-95"
            style={{ background: currentArticleIsSaved ? 'rgba(201,168,76,0.28)' : 'rgba(250,247,242,0.08)', border: `1px solid ${currentArticleIsSaved ? 'rgba(201,168,76,0.7)' : 'rgba(250,247,242,0.2)'}`, color: currentArticleIsSaved ? '#F0D070' : 'rgba(250,247,242,0.78)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, marginTop: '1rem', padding: '0.48rem 0.82rem', transition: 'background 180ms cubic-bezier(0.23, 1, 0.32, 1), border-color 180ms cubic-bezier(0.23, 1, 0.32, 1), color 180ms cubic-bezier(0.23, 1, 0.32, 1), transform 160ms cubic-bezier(0.23, 1, 0.32, 1)' }}
            onMouseEnter={(event) => { if (!currentArticleIsSaved) { event.currentTarget.style.background = 'rgba(201,168,76,0.18)'; event.currentTarget.style.borderColor = 'rgba(201,168,76,0.58)'; event.currentTarget.style.color = '#F0D070'; } }}
            onMouseLeave={(event) => { if (!currentArticleIsSaved) { event.currentTarget.style.background = 'rgba(250,247,242,0.08)'; event.currentTarget.style.borderColor = 'rgba(250,247,242,0.2)'; event.currentTarget.style.color = 'rgba(250,247,242,0.78)'; } }}
          >
            {currentArticleIsSaved ? <BookmarkCheck size={15} strokeWidth={2.2} /> : <Bookmark size={15} strokeWidth={2.2} />}
            {currentArticleIsSaved ? 'Saved to reading list' : 'Save for later'}
          </button>
        </div>
      </header>

      {/* Article body */}
      <article ref={articleBodyRef as React.RefObject<HTMLElement>} style={{ padding: '4rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          {/* Lead image, left-aligned with text wrapping on desktop */}
          <div
            style={{
              float: 'left',
              width: 'clamp(260px, 40%, 380px)',
              marginRight: '2.5rem',
              marginBottom: '1.5rem',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 6px 32px rgba(30,45,47,0.12)',
            }}
          >
            <img
              src={article.heroImage}
              alt={article.heroAlt}
              width="800"
              height="260"
              loading="eager"
              fetchPriority="high"
              style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Sections */}
          {article.sections.map((section, i) => (
            <SectionBlock key={i} section={section} />
          ))}

          {/* Clearfix */}
          <div style={{ clear: 'both' }} />

          {article.showSources !== false && article.sources && article.sources.length > 0 && (
            <aside
              aria-labelledby="article-sources-heading"
              style={{
                background: 'rgba(201,168,76,0.07)',
                borderLeft: '3px solid #C9A84C',
                clear: 'both',
                marginTop: '2.75rem',
                padding: '1.25rem 1.35rem',
              }}
            >
              <p style={{ color: '#9B7D2B', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.12em', margin: '0 0 0.35rem', textTransform: 'uppercase' }}>Evidence base</p>
              <h2 id="article-sources-heading" style={{ color: 'var(--color-slate-deep)', fontFamily: 'var(--font-display)', fontSize: '1.35rem', lineHeight: 1.2, margin: '0 0 0.7rem' }}>Sources</h2>
              <ol style={{ color: 'rgba(30,45,47,0.78)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0, paddingLeft: '1.2rem' }}>
                {article.sources.map((source) => (
                  <li key={source.url} style={{ marginBottom: '0.35rem', paddingLeft: '0.15rem' }}>
                    <a href={source.url} target="_blank" rel="noreferrer" style={{ color: '#0D3349', textDecorationColor: 'rgba(201,168,76,0.8)', textUnderlineOffset: '3px' }}>{source.label}</a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>
      </article>

      {/* Author bio and trust context */}
      <section
        aria-labelledby="article-author-heading"
        style={{
          background: '#fff',
          borderTop: '1px solid rgba(30,45,47,0.1)',
          borderBottom: '1px solid rgba(30,45,47,0.1)',
          padding: '3rem 0',
        }}
      >
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ background: '#F7F3EC', borderLeft: '3px solid #C9A84C', padding: 'clamp(1.35rem, 3vw, 2rem)' }}>
            <p style={{ color: '#9B7D2B', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.12em', margin: '0 0 1rem', textTransform: 'uppercase' }}>About the author</p>
            <div style={{ alignItems: 'flex-start', display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
              <div
                style={{
                  width: '76px',
                  height: '76px',
                  borderRadius: '50%',
                  background: '#C9A84C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                  boxShadow: '0 0 0 3px #C9A84C, 0 0 0 5px rgba(201,168,76,0.18)',
                }}
              >
                {article.authorPhoto ? (
                  <img
                    src={article.authorPhoto}
                    alt={article.author}
                    width="76"
                    height="76"
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                    {article.author === 'Enduring Advantage' ? 'EA' : article.author.split(' ').map((name: string) => name[0]).join('')}
                  </span>
                )}
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <h2 id="article-author-heading" style={{ color: 'var(--color-slate-deep)', fontFamily: 'var(--font-display)', fontSize: '1.55rem', lineHeight: 1.1, margin: '0 0 0.25rem' }}>{article.author}</h2>
                <p style={{ color: '#7A5C18', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', margin: '0 0 0.85rem', textTransform: 'uppercase' }}>{article.authorTitle}, Enduring Advantage</p>
                <p style={{ color: 'rgba(30,45,47,0.76)', fontFamily: 'var(--font-body)', fontSize: '0.93rem', lineHeight: 1.68, margin: '0 0 1rem', maxWidth: '620px' }}>{article.authorBio ?? `${article.author} contributes research and decision guidance for Enduring Advantage.`}</p>
                <div style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {article.authorUrl && (
                    <Link href={article.authorUrl} style={{ alignItems: 'center', color: '#0D3349', display: 'inline-flex', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, gap: '0.35rem', textDecoration: 'none' }}>
                      Read {article.author.split(' ')[0]}'s research profile <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                  {article.authorLinkedIn && (
                    <a href={article.authorLinkedIn} target="_blank" rel="noopener noreferrer" style={{ alignItems: 'center', color: '#0D3349', display: 'inline-flex', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, gap: '0.35rem', textDecoration: 'none' }}>
                      <Linkedin size={14} aria-hidden="true" /> Connect on LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isCampbellGuidancePost && <CampbellAuthorContact />}

      {seriesIndex >= 0 && (
        <SeriesArticleNavigation
          currentIndex={seriesIndex}
          total={DECISION_GUIDANCE_SEQUENCE.length}
          previousArticle={previousInSeries}
          nextArticle={nextInSeries}
        />
      )}

      {article.slug === 'how-fast-can-you-know-what-to-do-next' && <ChecklistDownloadGate />}

      {/* ── TOPIC-MATCHED SCORECARD MODULE ───────────────────────────────── */}
      {(() => {
        const cat = article.category ?? '';
        const tags = (article.tags ?? []).map((t: string) => t.toLowerCase());
        let dimension = 'B';
        let headline = 'Is your investment case ready for board approval?';
        let body = 'The CFO Sustainability Investment Readiness Scorecard identifies the condition most likely to block your next decision, baseline quality, financial clarity, market neutrality, financing readiness, or execution accountability.';
        if (/Advisory|Independence|conflict/i.test(cat) || tags.some((t: string) => t.includes('advisory') || t.includes('independence') || t.includes('conflict'))) {
          dimension = 'C'; headline = 'Was your option set defined independently?';
          body = 'Market neutrality is the condition most often missing when a sustainability recommendation comes from an organization that earns revenue from the selected solution. The Scorecard identifies whether this is the leading gap in your current decision.';
        } else if (/Capital|Financing|Finance/i.test(cat) || tags.some((t: string) => t.includes('finance') || t.includes('financing') || t.includes('capital'))) {
          dimension = 'D'; headline = 'Is your financing path defined before the investment decision?';
          body = 'Financing requirements introduced late can force rework or weaken confidence. The Scorecard identifies whether financing readiness is the leading gap in your current initiative.';
        } else if (/Risk|Disclosure|Regulation|Regulatory/i.test(cat) || tags.some((t: string) => t.includes('csrd') || t.includes('tcfd') || t.includes('disclosure') || t.includes('regulation'))) {
          dimension = 'A'; headline = 'Can your baseline withstand regulatory scrutiny?';
          body = 'A strong project can still lose credibility when scope, period, source systems, or ownership are unclear. The Scorecard identifies whether baseline defensibility is the leading gap in your current initiative.';
        } else if (/Accountability|Execution/i.test(cat) || tags.some((t: string) => t.includes('accountability') || t.includes('execution') || t.includes('results'))) {
          dimension = 'E'; headline = 'Is ownership built into your implementation plan?';
          body = 'A report is not a control system. The Scorecard identifies whether execution accountability is the leading gap, before implementation begins.';
        }
        const dimLabels: Record<string, string> = { A: 'Baseline Defensibility', B: 'Financial Clarity', C: 'Market Neutrality', D: 'Financing Readiness', E: 'Execution Accountability' };
        return (
          <section style={{ background: '#F0EDE6', borderTop: '1px solid #E0D8CC', padding: '3rem 0' }}>
            <div className="container" style={{ maxWidth: '860px' }}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 340px' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.75rem' }}>
                    Readiness Scorecard, {dimLabels[dimension]}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-slate-deep)', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                    {headline}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#4A5E60', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {body}
                  </p>
                  <Link
                    to="/scorecard"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-cream)', background: 'var(--color-slate-deep)', padding: '10px 20px', textDecoration: 'none', transition: 'opacity 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                  >
                    Start the Scorecard <ArrowRight size={14} />
                  </Link>
                </div>
                <div style={{ flex: '0 1 220px', background: 'white', border: '1px solid #E0D8CC', borderTop: '3px solid #C9A84C', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' }}>
                    <span aria-hidden="true" style={{ width: '2rem', height: '2rem', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-slate-deep)', color: '#C9A84C', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', border: '1px solid rgba(201,168,76,0.65)' }}>{dimension}</span>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7A8E90', margin: 0 }}>Decision check</p>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {['15 questions across 5 dimensions', 'Immediate on-page result', 'Evidence checklist included', 'No sales call required'].map((item) => (
                      <li key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: '#C9A84C', flexShrink: 0, marginTop: '2px' }}>✓</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#4A5E60' }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })()}
      {/* Newsletter CTA */}
      <section style={{ background: '#F0EDE6', borderTop: '1px solid #E0D8CC', borderBottom: '1px solid #E0D8CC', padding: '3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              flexWrap: 'wrap',
              background: 'var(--color-slate-deep)',
              borderTop: '3px solid #C9A84C',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            }}
          >
            <div style={{ flex: '1 1 320px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: 'rgba(250,247,242,0.7)', marginBottom: '0.5rem' }}>
                Research Digest
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: '#FAF7F2', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                Receive new research from Enduring Advantage
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(250,247,242,0.7)', lineHeight: 1.6 }}>
                New articles, regulatory updates, and investment insights, no noise, no sales pitches.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {article.slug === 'how-sustainability-consultants-help-improve-your-supply-chain' && <FreightProcurementChecklistDownload />}

      {/* Dynamic related reading and article-end sharing */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-articles-heading"
          style={{
            background: 'var(--color-slate-deep)',
            padding: '4.5rem 0 5rem',
          }}
        >
          <div className="container">
            {/* Section header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                marginBottom: '2.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
                borderBottom: '1px solid rgba(250,247,242,0.1)',
                paddingBottom: '1.25rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#C9A84C',
                    marginBottom: '0.35rem',
                  }}
                >
                  Continue Reading
                </p>
                <h2
                  id="related-articles-heading"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--color-cream)',
                    margin: 0,
                  }}
                >
                  Related Articles
                </h2>
              </div>
              <Link
                href="/articles"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#C9A84C',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-cream)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#C9A84C')}
              >
                All articles <ArrowRight size={14} />
              </Link>
            </div>

            <div
              style={{
                alignItems: 'center',
                background: 'rgba(250,247,242,0.055)',
                border: '1px solid rgba(201,168,76,0.3)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                justifyContent: 'space-between',
                marginBottom: '1.75rem',
                padding: '1rem 1.15rem',
              }}
            >
              <div style={{ maxWidth: '390px' }}>
                <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.12em', margin: '0 0 0.3rem', textTransform: 'uppercase' }}>Keep the decision moving</p>
                <p style={{ color: 'rgba(250,247,242,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.84rem', lineHeight: 1.55, margin: 0 }}>Share this research with the colleagues who need the same evidence before the next decision meeting.</p>
              </div>
              <ShareButtons authorName={article.author} slug={article.slug} title={article.title} excerpt={article.linkedInExcerpt ?? article.excerpt} tags={article.tags} label="Share this research" surface="article_end" />
            </div>

            {/* Cards grid, 3 columns on desktop */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {related.map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <article
                    style={{
                      background: 'rgba(250,247,242,0.04)',
                      border: '1px solid rgba(250,247,242,0.1)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(250,247,242,0.08)';
                      el.style.borderColor = 'rgba(139,163,120,0.4)';
                      el.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(250,247,242,0.04)';
                      el.style.borderColor = 'rgba(250,247,242,0.1)';
                      el.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Cover image */}
                    <div style={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                      <img
                        src={a.heroImage}
                        alt={a.heroAlt}
                        width="400"
                        height="160"
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '160px',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.35s ease',
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.04)')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
                      />
                      {/* Category pill overlay */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '0.75rem',
                          left: '0.75rem',
                          background: 'rgba(15,30,20,0.75)',
                          backdropFilter: 'blur(6px)',
                          color: '#C9A84C',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(139,163,120,0.3)',
                        }}
                      >
                        {a.category}
                      </span>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '1.25rem 1.25rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', lineHeight: 1.4, margin: '0 0 0.7rem', textTransform: 'uppercase' }}>
                        {getRelatedArticleMatchLabel(article, a)}
                      </p>
                      {/* Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          color: 'var(--color-cream)',
                          lineHeight: 1.35,
                          marginBottom: '0.65rem',
                          margin: '0 0 0.65rem',
                        }}
                      >
                        {a.title}
                      </h3>

                      {/* Excerpt */}
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.82rem',
                          color: 'rgba(250,247,242,0.6)',
                          lineHeight: 1.6,
                          margin: '0 0 1rem',
                          flex: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {a.excerpt}
                      </p>

                      {/* Tag pills */}
                      {a.tags && a.tags.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                          {a.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              style={{
                                background: 'rgba(139,163,120,0.15)',
                                border: '1px solid rgba(139,163,120,0.25)',
                                color: '#C9A84C',
                                fontFamily: 'var(--font-body)',
                                fontSize: '0.6rem',
                                fontWeight: 600,
                                letterSpacing: '0.06em',
                                padding: '0.2rem 0.55rem',
                                borderRadius: '3px',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Meta row: read time + arrow */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '1px solid rgba(250,247,242,0.08)',
                          paddingTop: '0.85rem',
                          marginTop: 'auto',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.72rem',
                            color: 'rgba(250,247,242,0.45)',
                          }}
                        >
                          <Clock size={11} />
                          {a.readTime}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: '#C9A84C',
                          }}
                        >
                          Read article <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <MobileConsultationBar context={article.category} />

      {/* ── Floating action buttons (Bookmark + Share + Back to Top) ── */}
      <div
        className="article-floating-actions"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        <BookmarkFAB
          visible={showBackToTop}
          saved={isBookmarked(article.slug)}
          onToggle={toggleCurrentArticleBookmark}
          onOpenDrawer={() => setDrawerOpen(true)}
          savedCount={bookmarks.length}
        />
        <ShareFAB visible={readProgress >= 0.12} slug={article.slug} title={article.title} excerpt={article.linkedInExcerpt ?? article.excerpt} tags={article.tags} />
        <BackToTopButton visible={showBackToTop} />
      </div>

      {/* ── Reading List Drawer ── */}
      <ReadingListDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        bookmarks={bookmarks}
        onRemove={(slug) =>
          toggleBookmark({
            slug,
            title: '',
            excerpt: '',
            category: '',
            readTime: '',
            date: '',
          })
        }
      />
    </div>
  );
}

// ─── Bookmark FAB ──────────────────────────────────────────────────────────────

function BookmarkFAB({
  visible,
  saved,
  onToggle,
  onOpenDrawer,
  savedCount,
}: {
  visible: boolean;
  saved: boolean;
  onToggle: () => void;
  onOpenDrawer: () => void;
  savedCount: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const handleToggle = () => {
    onToggle();
    if (!saved) {
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1800);
    }
  };

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.22s cubic-bezier(0.23,1,0.32,1), transform 0.22s cubic-bezier(0.23,1,0.32,1)',
        pointerEvents: visible ? 'auto' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.45rem',
      }}
    >
      {/* Tooltip */}
      <div
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.03em',
          color: '#FAF7F2',
          background: 'rgba(20,36,38,0.88)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(250,247,242,0.12)',
          borderRadius: '5px',
          padding: '0.3rem 0.65rem',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.97)',
          transition: 'opacity 0.18s cubic-bezier(0.23,1,0.32,1), transform 0.18s cubic-bezier(0.23,1,0.32,1)',
          pointerEvents: 'none',
        }}
      >
        {justSaved ? 'Saved to reading list!' : saved ? 'Saved, view list' : 'Save to reading list'}
      </div>

      {/* Button */}
      <div style={{ position: 'relative' }}>
        <button
          aria-label={saved ? 'Remove from reading list' : 'Save to reading list'}
          onClick={saved ? onOpenDrawer : handleToggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setPressed(false); }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: saved
              ? 'rgba(201,168,76,0.9)'
              : hovered
              ? 'rgba(201,168,76,0.25)'
              : 'var(--color-slate-deep)',
            border: saved
              ? '1px solid rgba(134,239,172,0.35)'
              : '1px solid rgba(250,247,242,0.18)',
            boxShadow: hovered
              ? '0 0 0 4px rgba(201,168,76,0.2), 0 6px 24px rgba(30,45,47,0.36)'
              : '0 4px 18px rgba(30,45,47,0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: saved ? '#fff' : hovered ? '#C9A84C' : 'rgba(250,247,242,0.7)',
            transform: pressed ? 'scale(0.93)' : justSaved ? 'scale(1.08)' : 'scale(1)',
            transition:
              'background 0.2s cubic-bezier(0.23,1,0.32,1), box-shadow 0.18s cubic-bezier(0.23,1,0.32,1), transform 0.15s cubic-bezier(0.23,1,0.32,1), color 0.18s, border-color 0.18s',
          }}
        >
          {saved ? <BookmarkCheck size={18} strokeWidth={2} /> : <Bookmark size={18} strokeWidth={2} />}
        </button>

        {/* Saved-count badge */}
        {savedCount > 0 && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#C9A84C',
              border: '2px solid var(--color-slate-deep)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: '0.6rem',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1,
              pointerEvents: 'none',
            }}
          >
            {savedCount > 9 ? '9+' : savedCount}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Reading List Drawer ────────────────────────────────────────────────────────

function ReadingListDrawer({
  open,
  onClose,
  bookmarks,
  onRemove,
}: {
  open: boolean;
  onClose: () => void;
  bookmarks: import('@/hooks/useBookmarks').BookmarkedArticle[];
  onRemove: (slug: string) => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: 'rgba(15,28,30,0.55)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.25s cubic-bezier(0.23,1,0.32,1)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-label="Reading list"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 10001,
          width: 'min(420px, 92vw)',
          background: 'var(--color-slate-deep)',
          borderLeft: '1px solid rgba(250,247,242,0.1)',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem 1.5rem 1.25rem',
            borderBottom: '1px solid rgba(250,247,242,0.1)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <BookmarkCheck size={18} strokeWidth={2} style={{ color: '#C9A84C' }} />
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--color-cream)',
                margin: 0,
              }}
            >
              Reading List
            </h2>
            {bookmarks.length > 0 && (
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#C9A84C',
                  background: 'rgba(201,168,76,0.2)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '100px',
                  padding: '0.15rem 0.55rem',
                }}
              >
                {bookmarks.length}
              </span>
            )}
          </div>
          <button
            aria-label="Close reading list"
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(250,247,242,0.07)',
              border: '1px solid rgba(250,247,242,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(250,247,242,0.6)',
              transition: 'background 0.15s, color 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.14)';
              (e.currentTarget as HTMLElement).style.color = '#FAF7F2';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.07)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.6)';
            }}
          >
            <XIcon size={15} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: bookmarks.length === 0 ? '3rem 1.5rem' : '1rem 1.5rem',
          }}
        >
          {bookmarks.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                textAlign: 'center',
              }}
            >
              <Bookmark size={36} strokeWidth={1.5} style={{ color: 'rgba(250,247,242,0.2)' }} />
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'rgba(250,247,242,0.4)',
                  lineHeight: 1.6,
                  maxWidth: '240px',
                }}
              >
                No saved articles yet. Click the bookmark icon while reading to save articles here.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {bookmarks.map((b) => (
                <div
                  key={b.slug}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '1rem',
                    background: 'rgba(250,247,242,0.04)',
                    border: '1px solid rgba(250,247,242,0.08)',
                    borderRadius: '8px',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.07)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.04)')}
                >
                  {/* Article info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: '#C9A84C',
                          background: 'rgba(201,168,76,0.18)',
                          borderRadius: '3px',
                          padding: '0.15rem 0.45rem',
                        }}
                      >
                        {b.category}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.68rem',
                          color: 'rgba(250,247,242,0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        <Clock size={10} /> {b.readTime}
                      </span>
                    </div>
                    <Link
                      href={`/articles/${b.slug}`}
                      onClick={onClose}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--color-cream)',
                        textDecoration: 'none',
                        lineHeight: 1.3,
                        display: 'block',
                        marginBottom: '0.35rem',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#C9A84C')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-cream)')}
                    >
                      {b.title}
                    </Link>
                    {b.excerpt && (
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.78rem',
                          color: 'rgba(250,247,242,0.5)',
                          lineHeight: 1.5,
                          margin: '0 0 0.4rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {b.excerpt}
                      </p>
                    )}
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.68rem',
                        color: 'rgba(250,247,242,0.3)',
                      }}
                    >
                      Saved {new Date(b.savedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Remove button */}
                  <button
                    aria-label={`Remove ${b.title} from reading list`}
                    onClick={() => onRemove(b.slug)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'transparent',
                      border: '1px solid rgba(250,247,242,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'rgba(250,247,242,0.35)',
                      flexShrink: 0,
                      transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                      marginTop: '0.1rem',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(200,60,60,0.2)';
                      (e.currentTarget as HTMLElement).style.color = '#f87171';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,60,60,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.35)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,247,242,0.1)';
                    }}
                  >
                    <XIcon size={12} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {bookmarks.length > 0 && (
          <div
            style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid rgba(250,247,242,0.1)',
              flexShrink: 0,
            }}
          >
            <Link
              href="/articles"
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#C9A84C',
                textDecoration: 'none',
                padding: '0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(201,168,76,0.3)',
                background: 'rgba(201,168,76,0.1)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.2)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)')}
            >
              Browse all articles <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Share FAB ─────────────────────────────────────────────────────────────────

function ShareFAB({
  visible,
  slug,
  title,
  excerpt,
  tags,
}: {
  visible: boolean;
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [previewChannel, setPreviewChannel] = useState<SocialPreviewChannel | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2600);
  };

  const shareEmail = () => {
    trackArticleShared(slug, 'email', 'floating_action');
    openEmailComposer({ slug, title, excerpt });
    showFeedback('Your email app is opening with a tracked article link.');
  };

  const copyLink = async () => {
    const didCopy = await copyTextToClipboard(getTrackedArticleShareUrl(slug, 'copy_link'));
    if (didCopy) {
      trackArticleShared(slug, 'copy_link', 'floating_action');
      setCopied(true);
      showFeedback('Tracked article link copied to your clipboard.');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Sub-action button style factory
  const subBtn = (bg: string, hoverBg: string): React.CSSProperties => ({
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: bg,
    border: '1px solid rgba(250,247,242,0.18)',
    boxShadow: '0 3px 12px rgba(30,45,47,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#fff',
    transition: 'background 0.15s, transform 0.12s cubic-bezier(0.23,1,0.32,1), box-shadow 0.15s',
    flexShrink: 0,
  });

  // The 3 child actions stagger in from below
  const actions: { label: string; onClick: () => void; bg: string; hoverBg: string; icon: React.ReactNode }[] = [
    {
      label: copied ? 'Copied!' : 'Copy link',
      onClick: copyLink,
      bg: copied ? 'rgba(201,168,76,0.85)' : 'rgba(40,58,60,0.92)',
      hoverBg: 'rgba(201,168,76,0.75)',
      icon: copied ? <Check size={15} strokeWidth={2.5} /> : <Link2 size={15} strokeWidth={2} />,
    },
    {
      label: 'Share on X',
      onClick: () => setPreviewChannel('x'),
      bg: 'rgba(20,20,20,0.92)',
      hoverBg: 'rgba(40,40,40,0.95)',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'Share on LinkedIn',
      onClick: () => setPreviewChannel('linkedin'),
      bg: 'rgba(10,102,194,0.88)',
      hoverBg: 'rgba(10,102,194,1)',
      icon: <Linkedin size={15} strokeWidth={2} />,
    },
    {
      label: 'Share by email',
      onClick: shareEmail,
      bg: 'rgba(128,104,42,0.92)',
      hoverBg: 'rgba(162,130,45,0.98)',
      icon: <Mail size={15} strokeWidth={2} />,
    },
  ];

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.22s cubic-bezier(0.23,1,0.32,1), transform 0.22s cubic-bezier(0.23,1,0.32,1)',
        pointerEvents: visible ? 'auto' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.45rem',
        position: 'relative',
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      {/* Staggered sub-action buttons, fan upward on open */}
      <div
        id={`article-share-actions-${slug}`}
        aria-hidden={!open}
        style={{
          position: 'absolute',
          right: 0,
          bottom: 'calc(100% + 0.45rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.45rem',
        }}
      >
        {actions.map((action, i) => {
          // Stagger: each button delays 40ms more than the previous
          const delay = open ? `${i * 40}ms` : `${(actions.length - 1 - i) * 30}ms`;
          return (
            <div
              key={action.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                // Slide up and fade in
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.92)',
                transition: `opacity 0.2s cubic-bezier(0.23,1,0.32,1) ${delay}, transform 0.2s cubic-bezier(0.23,1,0.32,1) ${delay}`,
                pointerEvents: open ? 'auto' : 'none',
              }}
            >
              {/* Tooltip label, appears to the left of the button */}
              <div
                aria-hidden="true"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: '#FAF7F2',
                  background: 'rgba(20,36,38,0.88)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  border: '1px solid rgba(250,247,242,0.12)',
                  borderRadius: '4px',
                  padding: '0.25rem 0.55rem',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  letterSpacing: '0.02em',
                }}
              >
                {action.label}
              </div>
              <button
                aria-label={action.label}
                onClick={action.onClick}
                tabIndex={open ? 0 : -1}
                style={subBtn(action.bg, action.hoverBg)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = action.hoverBg;
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(30,45,47,0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = action.bg;
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 3px 12px rgba(30,45,47,0.3)';
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(0.92)';
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
                }}
              >
                {action.icon}
              </button>
            </div>
          );
        })}
      </div>

      {/* Main Share trigger button */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.45rem',
        }}
      >
        {/* Tooltip */}
        <div
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.03em',
            color: '#FAF7F2',
            background: 'rgba(20,36,38,0.88)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(250,247,242,0.12)',
            borderRadius: '5px',
            padding: '0.3rem 0.65rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
            opacity: btnHovered && !open ? 1 : 0,
            transform: btnHovered && !open ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.97)',
            transition: 'opacity 0.18s cubic-bezier(0.23,1,0.32,1), transform 0.18s cubic-bezier(0.23,1,0.32,1)',
            pointerEvents: 'none',
          }}
        >
          Share article
        </div>
        <button
          aria-label="Share this article"
          aria-controls={`article-share-actions-${slug}`}
          aria-expanded={open}
          onClick={() => setOpen((isOpen) => !isOpen)}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          onMouseDown={() => setBtnPressed(true)}
          onMouseUp={() => setBtnPressed(false)}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: open || btnHovered ? '#2a5c3f' : 'var(--color-slate-deep)',
            border: '1px solid rgba(250,247,242,0.18)',
            boxShadow:
              open || btnHovered
                ? '0 0 0 4px rgba(201,168,76,0.2), 0 6px 24px rgba(30,45,47,0.36)'
                : '0 4px 18px rgba(30,45,47,0.28)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: open || btnHovered ? '#C9A84C' : 'rgba(250,247,242,0.7)',
            transform: btnPressed ? 'scale(0.93)' : open ? 'rotate(15deg) scale(1)' : 'scale(1)',
            transition:
              'background 0.18s cubic-bezier(0.23,1,0.32,1), box-shadow 0.18s cubic-bezier(0.23,1,0.32,1), transform 0.18s cubic-bezier(0.23,1,0.32,1), color 0.18s',
          }}
        >
          <Share2 size={18} strokeWidth={2} />
        </button>
      </div>
      <SocialSharePreviewModal
        open={previewChannel !== null}
        onOpenChange={(nextOpen) => { if (!nextOpen) setPreviewChannel(null); }}
        channel={previewChannel ?? 'linkedin'}
        slug={slug}
        title={title}
        excerpt={excerpt}
        tags={tags}
        surface="floating_action"
        onShared={showFeedback}
      />
      <ShareConfirmation message={feedback} />
    </div>
  );
}

// ─── Back to Top Button ──────────────────────────────────────────────────────

function BackToTopButton({ visible }: { visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <div
      style={{
        // Parent wrapper handles fixed positioning
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.22s cubic-bezier(0.23,1,0.32,1), transform 0.22s cubic-bezier(0.23,1,0.32,1)',
        pointerEvents: visible ? 'auto' : 'none',
        // Tooltip anchor
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.45rem',
      }}
    >
      {/* Tooltip, slides up from above the button */}
      <div
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.03em',
          color: '#FAF7F2',
          background: 'rgba(20,36,38,0.88)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(250,247,242,0.12)',
          borderRadius: '5px',
          padding: '0.3rem 0.65rem',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
          // Animate tooltip in/out
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.97)',
          transition: 'opacity 0.18s cubic-bezier(0.23,1,0.32,1), transform 0.18s cubic-bezier(0.23,1,0.32,1)',
          pointerEvents: 'none',
        }}
      >
        Back to top
      </div>

      {/* Button */}
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: hovered ? '#3d7a52' : '#C9A84C',
          border: '1px solid rgba(250,247,242,0.18)',
          // Glow intensifies on hover
          boxShadow: hovered
            ? '0 0 0 4px rgba(201,168,76,0.22), 0 6px 24px rgba(30,45,47,0.36)'
            : '0 4px 18px rgba(30,45,47,0.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#fff',
          // Press scale
          transform: pressed ? 'scale(0.93)' : 'scale(1)',
          transition:
            'background 0.18s cubic-bezier(0.23,1,0.32,1), box-shadow 0.18s cubic-bezier(0.23,1,0.32,1), transform 0.14s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <ChevronUp size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ─── Share Buttons ───────────────────────────────────────────────────────────

function CampbellAuthorContact() {
  return (
    <section style={{ background: '#FAF7F2', padding: '0 0 3.5rem' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center" style={{ background: '#0D3349', border: '1px solid rgba(201,168,76,0.35)', padding: 'clamp(1.5rem, 4vw, 2.25rem)' }}>
          <img
            src="/manus-storage/CampbellOhrlis_da1d067a.jpeg"
            alt="Campbell Ohrlis"
            width="84"
            height="84"
            loading="lazy"
            style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 0 0 3px #C9A84C', margin: 0 }}
          />
          <div>
            <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', margin: 0 }}>About the author</p>
            <h2 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.55rem, 2.4vw, 2rem)', fontWeight: 600, lineHeight: 1.12, margin: '0.45rem 0' }}>Campbell Ohrlis</h2>
            <p style={{ color: 'rgba(250,247,242,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.93rem', lineHeight: 1.62, maxWidth: '610px', margin: 0 }}>Campbell is VP Partnerships at Enduring Advantage. He helps leadership teams turn a crowded market of environmental options into one defensible next decision.</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <a href="mailto:partnerships@enduringadvantage.com" className="inline-flex items-center justify-center transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: '#C9A84C', color: '#FAF7F2', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.84rem', padding: '0.78rem 1rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>Email our team</a>
            <a href="https://www.linkedin.com/in/campbellohrlis/" target="_blank" rel="noreferrer" style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.79rem', fontWeight: 700, textDecoration: 'none' }}>Connect on LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FreightProcurementChecklistDownload() {
  const checklistUrl = '/manus-storage/ea-six-step-decision-checklist-freight-procurement_76c16cae.pdf';

  return (
    <section style={{ background: '#F0EDE6', padding: '3.5rem 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div style={{ alignItems: 'center', background: '#0D3349', border: '1px solid rgba(201,168,76,0.36)', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', padding: 'clamp(1.5rem, 4vw, 2.3rem)' }}>
          <div style={{ flex: '1 1 360px' }}>
            <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Companion worksheet</p>
            <h2 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600, lineHeight: 1.12, margin: '0.5rem 0' }}>Freight &amp; Procurement Decision Checklist</h2>
            <p style={{ color: 'rgba(250,247,242,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0, maxWidth: '620px' }}>A fillable one-page worksheet to screen materiality, test commercial leverage, examine freight and procurement levers, and bring one defensible next move to the decision owner.</p>
          </div>
          <a href={checklistUrl} target="_blank" rel="noreferrer" onClick={() => trackSupplyChainChecklistDownloaded('freight_procurement', 'supply_chain_article')} className="inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: '#C9A84C', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, padding: '0.88rem 1.05rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <Download size={16} /> Open fillable PDF
          </a>
        </div>
      </div>
    </section>
  );
}

function SeriesArticleNavigation({
  currentIndex,
  total,
  previousArticle,
  nextArticle,
}: {
  currentIndex: number;
  total: number;
  previousArticle?: ReturnType<typeof getArticleBySlug>;
  nextArticle?: ReturnType<typeof getArticleBySlug>;
}) {
  return (
    <section aria-label="Six-part decision guidance series navigation" style={{ background: '#F0EDE6', borderTop: '1px solid #E0D8CC', borderBottom: '1px solid #E0D8CC', padding: '2.5rem 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <div>
            <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', margin: 0 }}>Six-part decision guidance series</p>
            <h2 style={{ color: 'var(--color-slate-deep)', fontFamily: 'var(--font-display)', fontSize: '1.55rem', fontWeight: 700, lineHeight: 1.15, margin: '0.35rem 0 0' }}>Continue through the sequence</h2>
          </div>
          <span style={{ color: '#4A5E60', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700 }}>Article {currentIndex + 1} of {total}</span>
        </div>
        <nav aria-label="Previous and next article" className="grid gap-3 md:grid-cols-2">
          {previousArticle ? (
            <Link href={`/articles/${previousArticle.slug}`} className="group" style={{ background: '#FAF7F2', border: '1px solid rgba(13,51,73,0.14)', display: 'block', minHeight: '126px', padding: '1.15rem 1.25rem', textDecoration: 'none', transition: 'transform 0.18s cubic-bezier(0.23,1,0.32,1), border-color 0.18s, box-shadow 0.18s' }}>
              <span style={{ alignItems: 'center', color: '#C9A84C', display: 'flex', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, gap: '0.35rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}><ArrowLeft size={14} /> Previous article</span>
              <span style={{ color: 'var(--color-slate-deep)', display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.25, marginTop: '0.6rem' }}>{previousArticle.title}</span>
            </Link>
          ) : (
            <div style={{ background: 'rgba(13,51,73,0.035)', border: '1px dashed rgba(13,51,73,0.16)', color: '#7A8E90', fontFamily: 'var(--font-body)', fontSize: '0.86rem', minHeight: '126px', padding: '1.15rem 1.25rem' }}>
              <span style={{ color: '#C9A84C', display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Start here</span>
              This is the first article in the series.
            </div>
          )}
          {nextArticle ? (
            <Link href={`/articles/${nextArticle.slug}`} className="group" style={{ background: '#0D3349', border: '1px solid rgba(201,168,76,0.48)', display: 'block', minHeight: '126px', padding: '1.15rem 1.25rem', textDecoration: 'none', transition: 'transform 0.18s cubic-bezier(0.23,1,0.32,1), border-color 0.18s, box-shadow 0.18s' }}>
              <span style={{ alignItems: 'center', color: '#F0D070', display: 'flex', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, gap: '0.35rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Next article <ArrowRight size={14} /></span>
              <span style={{ color: '#FAF7F2', display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.25, marginTop: '0.6rem' }}>{nextArticle.title}</span>
            </Link>
          ) : (
            <Link href="/articles/topic/hiring-advisory" style={{ background: '#0D3349', border: '1px solid rgba(201,168,76,0.48)', display: 'block', minHeight: '126px', padding: '1.15rem 1.25rem', textDecoration: 'none' }}>
              <span style={{ alignItems: 'center', color: '#F0D070', display: 'flex', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, gap: '0.35rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Series complete <ArrowRight size={14} /></span>
              <span style={{ color: '#FAF7F2', display: 'block', fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.25, marginTop: '0.6rem' }}>Explore the full Hiring &amp; Advisory collection</span>
            </Link>
          )}
        </nav>
      </div>
    </section>
  );
}

function SeriesProgressTracker({ currentIndex }: { currentIndex: number }) {
  return (
    <nav aria-label={`Decision guidance series progress: article ${currentIndex + 1} of ${DECISION_GUIDANCE_SEQUENCE.length}`} style={{ marginBottom: '1.65rem', maxWidth: '640px' }}>
      <div style={{ alignItems: 'center', display: 'flex', gap: '0.6rem', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
        <span style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Six-part decision guidance</span>
        <span style={{ color: 'rgba(250,247,242,0.58)', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700 }}>Step {currentIndex + 1} of {DECISION_GUIDANCE_SEQUENCE.length}</span>
      </div>
      <ol style={{ alignItems: 'center', display: 'flex', gap: '0.35rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {DECISION_GUIDANCE_SEQUENCE.map((slug, index) => {
          const linkedArticle = getArticleBySlug(slug);
          const isCurrent = index === currentIndex;
          const isComplete = index < currentIndex;
          const stepLabel = linkedArticle?.title ?? `Article ${index + 1}`;
          const circle = (
            <span
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`${isCurrent ? 'Current article' : isComplete ? 'Completed article' : 'Upcoming article'}: ${stepLabel}`}
              title={stepLabel}
              style={{
                alignItems: 'center',
                background: isCurrent ? '#C9A84C' : isComplete ? 'rgba(201,168,76,0.34)' : 'rgba(250,247,242,0.1)',
                border: isCurrent ? '1px solid #F0D070' : isComplete ? '1px solid rgba(201,168,76,0.68)' : '1px solid rgba(250,247,242,0.2)',
                borderRadius: '999px',
                color: isCurrent ? '#0D3349' : isComplete ? '#F0D070' : 'rgba(250,247,242,0.6)',
                display: 'inline-flex',
                flex: '0 0 28px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.67rem',
                fontWeight: 800,
                height: '28px',
                justifyContent: 'center',
                lineHeight: 1,
                transition: 'transform 0.18s cubic-bezier(0.23,1,0.32,1), background 0.18s, border-color 0.18s',
                width: '28px',
              }}
            >
              {index + 1}
            </span>
          );
          return (
            <li key={slug} style={{ alignItems: 'center', display: 'contents' }}>
              {isCurrent || !linkedArticle ? circle : (
                <Link href={`/articles/${slug}`} aria-label={`Go to step ${index + 1}: ${stepLabel}`} style={{ display: 'inline-flex', textDecoration: 'none' }} onMouseEnter={(event) => { event.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(event) => { event.currentTarget.style.transform = 'translateY(0)'; }}>
                  {circle}
                </Link>
              )}
              {index < DECISION_GUIDANCE_SEQUENCE.length - 1 && <span aria-hidden="true" style={{ background: index < currentIndex ? 'rgba(201,168,76,0.6)' : 'rgba(250,247,242,0.18)', flex: '1 1 12px', height: '1px', maxWidth: '74px', minWidth: '10px' }} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function ChecklistDownloadGate() {
  const [sector, setSector] = useState<ChecklistSector>('cfo');
  const [, setLocation] = useLocation();
  const [state, handleSubmit] = useForm('mzepleow');
  const formStarted = useRef(false);
  const hasRedirected = useRef(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const selected = CHECKLIST_PDF_VARIANTS[sector];
  const successPath = `/checklist/thank-you?sector=${sector}`;
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const emailError = emailTouched && !emailIsValid
    ? (email.trim() ? 'Enter a valid work email address.' : 'Enter your work email to unlock the checklist.')
    : null;
  const completedSteps = emailIsValid ? 2 : 1;

  useEffect(() => {
    if (!state.succeeded || hasRedirected.current) return;
    hasRedirected.current = true;
    setLocation(successPath, { replace: true });
  }, [setLocation, state.succeeded, successPath]);

  useEffect(() => {
    if (state.errors) {
      setSubmissionError('We could not send your checklist request. Please try again, or email our team directly and we will send the right version.');
    }
  }, [state.errors]);

  const trackFormStart = () => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackChecklistFormStarted(sector);
  };

  const submitChecklistRequest = (event: React.FormEvent<HTMLFormElement>) => {
    if (!emailIsValid) {
      event.preventDefault();
      setEmailTouched(true);
      return;
    }
    const data = new FormData(event.currentTarget);
    const role = String(data.get('role') ?? '').trim() || 'not_provided';
    setSubmissionError(null);
    trackChecklistFormSubmitted(sector, role);
    handleSubmit(event);
  };

  return (
    <section style={{ background: '#FAF7F2', borderBottom: '1px solid #E0D8CC', padding: '3.25rem 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div className="grid gap-7 md:grid-cols-[1fr_minmax(290px,0.85fr)] md:items-start" style={{ background: '#0D3349', border: '1px solid rgba(201,168,76,0.48)', boxShadow: '0 14px 30px rgba(13,51,73,0.14)', padding: 'clamp(1.5rem, 4vw, 2.4rem)' }}>
          <div>
            <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', margin: 0 }}>Take the framework with you</p>
            <h2 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.65rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.12, margin: '0.5rem 0 0.7rem' }}>Get the fillable checklist for your sector</h2>
            <p style={{ color: 'rgba(250,247,242,0.72)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, maxWidth: '500px' }}>Choose the version that matches your decision context. Each PDF is fillable, print-ready, and structured around the six steps in this series.</p>
            <div style={{ borderLeft: '2px solid #C9A84C', color: 'rgba(250,247,242,0.62)', fontFamily: 'var(--font-body)', fontSize: '0.8rem', lineHeight: 1.6, marginTop: '1.5rem', maxWidth: '510px', paddingLeft: '0.9rem' }}>We use your email to deliver this resource and to follow up only where relevant to the decision context you selected.</div>
          </div>
          <form noValidate onSubmit={submitChecklistRequest} onFocusCapture={trackFormStart} style={{ background: 'rgba(250,247,242,0.06)', border: '1px solid rgba(250,247,242,0.16)', padding: '1.2rem' }}>
              <input type="hidden" name="form_type" value="Six-Step Decision Checklist Download" />
              <input type="hidden" name="selected_sector" value={selected.label} />
              <input type="hidden" name="selected_asset" value={selected.file} />
              <input type="hidden" name="_next" value={`${window.location.origin}${successPath}`} />
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: 'rgba(250,247,242,0.72)', display: 'flex', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, justifyContent: 'space-between', letterSpacing: '0.04em', marginBottom: '0.42rem', textTransform: 'uppercase' }}>
                  <span>Request progress</span>
                  <span>{completedSteps} of 2 complete</span>
                </div>
                <div aria-label={`Checklist request progress: ${completedSteps} of 2 required steps complete`} aria-valuemax={2} aria-valuemin={0} aria-valuenow={completedSteps} role="progressbar" style={{ background: 'rgba(250,247,242,0.18)', height: '4px', overflow: 'hidden' }}>
                  <div style={{ background: '#C9A84C', height: '100%', transition: 'width 180ms cubic-bezier(0.23, 1, 0.32, 1)', width: `${completedSteps * 50}%` }} />
                </div>
              </div>
              <label htmlFor="checklist-sector" style={{ color: '#FAF7F2', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.76rem', fontWeight: 700, marginBottom: '0.4rem' }}>Choose your decision context</label>
              <select id="checklist-sector" name="sector" value={sector} onChange={(event) => setSector(event.target.value as keyof typeof CHECKLIST_PDF_VARIANTS)} style={{ background: '#FAF7F2', border: '1px solid rgba(201,168,76,0.65)', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.9rem', marginBottom: '0.8rem', padding: '0.72rem', width: '100%' }}>
                {Object.entries(CHECKLIST_PDF_VARIANTS).map(([key, option]) => <option key={key} value={key}>{option.label}</option>)}
              </select>
              <p style={{ color: 'rgba(250,247,242,0.56)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', lineHeight: 1.5, margin: '-0.2rem 0 0.85rem' }}>{selected.detail}</p>
              <label htmlFor="checklist-email" style={{ color: '#FAF7F2', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.76rem', fontWeight: 700, marginBottom: '0.4rem' }}>Work email</label>
              <input aria-describedby={emailError ? 'checklist-email-error' : undefined} aria-invalid={Boolean(emailError)} id="checklist-email" name="email" onBlur={() => setEmailTouched(true)} onChange={(event) => setEmail(event.target.value)} required type="email" value={email} placeholder="you@organization.com" style={{ background: '#FAF7F2', border: `1px solid ${emailError ? '#F5A3A3' : emailIsValid ? '#78B98C' : 'rgba(201,168,76,0.65)'}`, color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.9rem', marginBottom: '0.35rem', padding: '0.72rem', width: '100%' }} />
              {emailError && <p id="checklist-email-error" role="alert" style={{ color: '#FFD2D2', fontFamily: 'var(--font-body)', fontSize: '0.74rem', lineHeight: 1.4, margin: '0.1rem 0 0.45rem' }}>{emailError}</p>}
              {emailTouched && emailIsValid && <p style={{ color: '#B9E8C5', fontFamily: 'var(--font-body)', fontSize: '0.74rem', lineHeight: 1.4, margin: '0.1rem 0 0.45rem' }}>Work email looks good.</p>}
              <ValidationError prefix="Email" field="email" errors={state.errors} />
              <label htmlFor="checklist-role" style={{ color: '#FAF7F2', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.76rem', fontWeight: 700, marginBottom: '0.4rem', marginTop: '0.7rem' }}>Role <span style={{ color: 'rgba(250,247,242,0.5)', fontWeight: 500 }}>(optional)</span></label>
              <select id="checklist-role" name="role" defaultValue="" style={{ background: '#FAF7F2', border: '1px solid rgba(201,168,76,0.65)', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.9rem', padding: '0.72rem', width: '100%' }}>
                <option value="">Select a role</option>
                {CHECKLIST_ROLE_OPTIONS.map((role) => <option key={role} value={role}>{role}</option>)}
              </select>
              <button type="submit" disabled={state.submitting} aria-live="polite" className="inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: '#C9A84C', border: 'none', color: '#0D3349', cursor: state.submitting ? 'wait' : 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, marginTop: '0.75rem', opacity: state.submitting ? 0.72 : 1, padding: '0.8rem 1rem', width: '100%' }}>
                {state.submitting ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Download size={16} />} {state.submitting ? 'Preparing your download…' : 'Get the fillable checklist'}
              </button>
              {submissionError && (
                <div role="alert" style={{ background: 'rgba(203, 77, 77, 0.16)', border: '1px solid rgba(255, 166, 166, 0.58)', color: '#FFE4E4', fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.55, marginTop: '0.8rem', padding: '0.72rem 0.8rem' }}>
                  {submissionError} <a href="mailto:partnerships@enduringadvantage.com?subject=Six-Step%20Decision%20Checklist" style={{ color: '#F0D070', fontWeight: 700 }}>Email our team</a>.
                </div>
              )}
              <p style={{ color: 'rgba(250,247,242,0.48)', fontFamily: 'var(--font-body)', fontSize: '0.68rem', lineHeight: 1.5, margin: '0.75rem 0 0' }}>By requesting the checklist, you agree to our <a href="/privacy" style={{ color: '#F0D070' }}>Privacy Policy</a>.</p>
              <p style={{ color: 'rgba(250,247,242,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.72rem', lineHeight: 1.55, margin: '0.75rem 0 0' }}>After submission, you will land on your sector’s download page straight away and receive an email with the complete fillable checklist set for your internal team.</p>
            </form>
        </div>
      </div>
    </section>
  );
}

function ShareButtons({
  authorName,
  slug,
  title,
  excerpt,
  tags,
  label = `Share ${authorName}’s research`,
  surface = 'article_header',
}: {
  authorName: string;
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  label?: string;
  surface?: 'article_header' | 'article_end';
}) {
  const [copied, setCopied] = useState(false);
  const [excerptCopied, setExcerptCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [previewChannel, setPreviewChannel] = useState<SocialPreviewChannel | null>(null);
  const canUseNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2600);
  };

  const shareNative = async () => {
    if (!canUseNativeShare) return;
    try {
      await navigator.share({ title, text: excerpt ?? title, url: getTrackedArticleShareUrl(slug, 'native_share') });
      trackArticleShared(slug, 'native_share', surface);
    } catch {
      // A dismissed native share sheet is not an error state for the reader.
    }
  };

  const shareEmail = () => {
    trackArticleShared(slug, 'email', surface);
    openEmailComposer({ slug, title, excerpt });
    showFeedback('Your email app is opening with a tracked article link.');
  };

  const copyLink = async () => {
    const didCopy = await copyTextToClipboard(getTrackedArticleShareUrl(slug, 'copy_link'));
    if (didCopy) {
      trackArticleShared(slug, 'copy_link', surface);
      setCopied(true);
      showFeedback('Tracked article link copied to your clipboard.');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyExcerpt = async () => {
    const didCopy = await copyTextToClipboard(createLinkedInReadyPost({ slug, title, excerpt, tags }));
    if (didCopy) {
      trackArticleShared(slug, 'copy_excerpt', surface);
      setExcerptCopied(true);
      showFeedback('LinkedIn post text copied to your clipboard.');
      setTimeout(() => setExcerptCopied(false), 2200);
    }
  };

  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.78rem',
    fontWeight: 600,
    borderRadius: '6px',
    padding: '0.45rem 0.9rem',
    cursor: 'pointer',
    border: '1px solid rgba(250,247,242,0.2)',
    background: 'rgba(250,247,242,0.08)',
    color: 'rgba(250,247,242,0.75)',
    transition: 'background 0.15s, color 0.15s',
    letterSpacing: '0.02em',
  };

  return (
    <div style={{ display: 'grid', gap: excerpt ? '0.9rem' : 0 }}>
      <span aria-live="polite" className="sr-only">{copied ? 'Canonical article link copied to clipboard.' : ''}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#F0D070', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700 }}>{label}</span>
        {canUseNativeShare && (
          <button type="button" onClick={() => void shareNative()} aria-label={`Share ${title} with an app on this device`} style={btnBase} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.22)'; (e.currentTarget as HTMLElement).style.color = '#F0D070'; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.75)'; }}>
            <Share2 size={13} strokeWidth={2} /> Share
          </button>
        )}
        <button
          type="button"
          onClick={() => setPreviewChannel('linkedin')}
          style={btnBase}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,102,194,0.35)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.75)'; }}
        >
          <Linkedin size={13} strokeWidth={2} /> LinkedIn
        </button>
        <button
          type="button"
          onClick={() => setPreviewChannel('x')}
          style={btnBase}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.45)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.75)'; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.903-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          X (Twitter)
        </button>
        <button
          type="button"
          onClick={shareEmail}
          style={btnBase}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.22)'; (e.currentTarget as HTMLElement).style.color = '#F0D070'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.75)'; }}
        >
          <Mail size={13} strokeWidth={2} /> Email
        </button>
        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? `Canonical link for ${title} copied to clipboard` : `Copy the canonical link for ${title}`}
          style={{ ...btnBase, background: copied ? 'rgba(201,168,76,0.35)' : 'rgba(250,247,242,0.08)', color: copied ? '#a8d5b5' : 'rgba(250,247,242,0.75)' }}
          onMouseEnter={(e) => { if (!copied) { (e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.15)'; } }}
          onMouseLeave={(e) => { if (!copied) { (e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.08)'; } }}
        >
          {copied ? <Check size={13} strokeWidth={2.5} /> : <Link2 size={13} strokeWidth={2} />}
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
      {excerpt && (
        <div style={{ maxWidth: '680px', borderLeft: '2px solid #C9A84C', padding: '0.65rem 0 0.65rem 0.9rem', background: 'rgba(250,247,242,0.04)' }}>
          <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.64rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.35rem' }}>LinkedIn-ready excerpt</p>
          <p style={{ color: 'rgba(250,247,242,0.78)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', lineHeight: 1.55, margin: '0 0 0.5rem' }}>{excerpt}</p>
          <button type="button" onClick={copyExcerpt} style={{ ...btnBase, padding: '0.3rem 0.65rem', fontSize: '0.7rem', borderColor: 'rgba(201,168,76,0.4)', color: '#F0D070' }}>
            {excerptCopied ? <Check size={12} /> : <Link2 size={12} />} {excerptCopied ? 'Excerpt copied' : 'Copy post text'}
          </button>
        </div>
      )}
      <SocialSharePreviewModal
        open={previewChannel !== null}
        onOpenChange={(nextOpen) => { if (!nextOpen) setPreviewChannel(null); }}
        channel={previewChannel ?? 'linkedin'}
        slug={slug}
        title={title}
        excerpt={excerpt}
        tags={tags}
        surface={surface}
        onShared={showFeedback}
      />
      <ShareConfirmation message={feedback} />
    </div>
  );
}

// ─── Newsletter Form ───────────────────────────────────────────────────────────

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        style={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#FAF7F2',
          padding: '0.75rem 1.25rem',
          background: 'rgba(250,247,242,0.15)',
          borderRadius: '8px',
        }}
      >
        <Check size={16} strokeWidth={2.5} /> You’re on the list.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ flex: '0 0 auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          padding: '0.65rem 1rem',
          borderRadius: '6px',
          border: '1px solid rgba(250,247,242,0.3)',
          background: 'rgba(250,247,242,0.12)',
          color: '#FAF7F2',
          outline: 'none',
          minWidth: '220px',
        }}
      />
      <button
        type="submit"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          fontWeight: 700,
          padding: '0.65rem 1.25rem',
          borderRadius: '6px',
          background: 'var(--color-slate-deep)',
          color: '#FAF7F2',
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '0.02em',
          transition: 'opacity 0.15s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
      >
        Subscribe
      </button>
    </form>
  );
}

// ─── Section renderer ─────────────────────────────────────────────────────────

function SectionBlock({ section }: { section: ArticleSection }) {
  if (section.type === 'subheading') {
    return (
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.65rem',
          fontWeight: 700,
          color: 'var(--color-slate-deep)',
          lineHeight: 1.25,
          marginTop: '2.75rem',
          marginBottom: '1rem',
          clear: 'none',
        }}
      >
        {section.content}
      </h2>
    );
  }

  if (section.type === 'body') {
    // Split on double newlines for paragraphs
    const paragraphs = (section.content ?? '').split('\n\n').filter(Boolean);
    return (
      <>
        {paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              lineHeight: 1.85,
              color: 'rgba(30,45,47,0.82)',
              marginBottom: '1.5rem',
            }}
          >
            {para}
          </p>
        ))}
      </>
    );
  }

  if (section.type === 'image' && section.image) {
    return (
      <figure
        style={{
          clear: 'both',
          margin: '2.35rem 0',
          border: '1px solid rgba(13,51,73,0.14)',
          background: '#fff',
          boxShadow: '0 10px 28px rgba(13,51,73,0.09)',
        }}
      >
        <img
          src={section.image}
          alt={section.imageAlt ?? ''}
          loading="lazy"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        {section.imageCaption && (
          <figcaption
            style={{
              borderTop: '3px solid #C9A84C',
              color: 'rgba(30,45,47,0.72)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              lineHeight: 1.6,
              padding: '0.85rem 1rem',
            }}
          >
            {section.imageCaption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (section.type === 'pullquote') {
    return (
      <blockquote
        style={{
          clear: 'both',
          margin: '2.5rem 0',
          padding: '2rem 2.5rem',
          background: 'var(--color-slate-deep)',
          borderRadius: '8px',
          borderLeft: '4px solid #C9A84C',
          position: 'relative',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            fontWeight: 600,
            fontStyle: 'italic',
            color: 'var(--color-cream)',
            lineHeight: 1.5,
            marginBottom: section.attribution ? '1rem' : 0,
          }}
        >
          &ldquo;{section.content}&rdquo;
        </p>
        {section.attribution && (
          <cite
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontStyle: 'normal',
              color: 'rgba(250,247,242,0.5)',
              display: 'block',
            }}
          >
            {section.attribution}
          </cite>
        )}
      </blockquote>
    );
  }

  if (section.type === 'stat-row' && section.stats) {
    return (
      <div
        style={{
          clear: 'both',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
          margin: '2.5rem 0',
          padding: '2rem',
          background: 'rgba(201,168,76,0.06)',
          borderRadius: '8px',
          border: '1px solid rgba(201,168,76,0.15)',
        }}
      >
        {section.stats.map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.25rem',
                fontWeight: 700,
                color: '#C9A84C',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                color: 'rgba(30,45,47,0.6)',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

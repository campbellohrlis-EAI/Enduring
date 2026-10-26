// =============================================================================
// ENDURING ADVANTAGE, Article Card Component
// Sage Editorial design: cream cards, sage green accents, Cormorant headlines
// Includes: bookmark/save-for-later toggle on both featured and standard variants
// =============================================================================

import { categoryTextColors, categoryBgColors } from '@/lib/data';
import type { Article } from '@/lib/data';
import { ExternalLink, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '@/contexts/BookmarkContext';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'standard';
}

function BookmarkButton({ article }: { article: Article }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const saved = isBookmarked(article.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(article);
      }}
      title={saved ? 'Remove from reading list' : 'Save to reading list'}
      aria-label={saved ? 'Remove from reading list' : 'Save to reading list'}
      className="flex items-center justify-center rounded-full transition-all duration-200 active:scale-90"
      style={{
        width: '30px',
        height: '30px',
        background: saved ? 'rgba(201,168,76,0.12)' : 'rgba(250,247,242,0.85)',
        border: `1.5px solid ${saved ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.15)'}`,
        color: saved ? '#C9A84C' : 'oklch(0.55 0.02 200)',
        flexShrink: 0,
        backdropFilter: 'blur(4px)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.15)';
        (e.currentTarget as HTMLElement).style.color = '#C9A84C';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = saved
          ? 'rgba(201,168,76,0.12)'
          : 'rgba(250,247,242,0.85)';
        (e.currentTarget as HTMLElement).style.color = saved
          ? '#C9A84C'
          : 'oklch(0.55 0.02 200)';
      }}
    >
      {saved
        ? <BookmarkCheck size={14} strokeWidth={2.2} />
        : <Bookmark size={14} strokeWidth={2.2} />
      }
    </button>
  );
}

export default function ArticleCard({ article, variant = 'standard' }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <div
        className="group rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
        style={{
          background: '#fff',
          boxShadow: '0 2px 12px rgba(30,45,47,0.08)',
          border: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        {article.imageUrl && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden block"
            style={{ height: '200px' }}
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, transparent 40%, rgba(30,45,47,0.6) 100%)',
              }}
            />
            {/* Bookmark button overlaid on image */}
            <div className="absolute top-3 right-3">
              <BookmarkButton article={article} />
            </div>
          </a>
        )}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="topic-tag"
              style={{
                background: categoryBgColors[article.categoryColor] || '#f1f5f9',
                color: categoryTextColors[article.categoryColor] || '#334155',
              }}
            >
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: '#C9A84C', fontFamily: 'var(--font-body)' }}>
              <Clock size={11} />
              {article.readTime}
            </span>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <h3
              className="text-xl leading-snug mb-3 group-hover:opacity-80 transition-opacity"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-slate-deep)',
                fontWeight: 600,
              }}
            >
              {article.title}
            </h3>
            <p
              className="text-sm leading-relaxed mb-4 line-clamp-3"
              style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.45 0.02 200)' }}
            >
              {article.excerpt}
            </p>
          </a>
          <div className="flex items-center justify-between mt-auto">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ fontFamily: 'var(--font-body)', color: '#C9A84C' }}
            >
              {article.source}
            </span>
            <div className="flex items-center gap-2">
              <BookmarkButton article={article} />
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium transition-all duration-200 group-hover:gap-2"
                style={{ color: '#C9A84C', fontFamily: 'var(--font-body)' }}
              >
                Read Article <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard variant
  return (
    <div
      className="group flex gap-4 p-4 rounded-lg transition-all duration-200"
      style={{
        border: '1px solid transparent',
        borderRadius: '0.5rem',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = '#fff';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(30,45,47,0.08)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.15)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'transparent';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
      }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="topic-tag"
            style={{
              background: categoryBgColors[article.categoryColor] || '#f1f5f9',
              color: categoryTextColors[article.categoryColor] || '#334155',
            }}
          >
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: '#C9A84C', fontFamily: 'var(--font-body)' }}>
            <Clock size={10} />
            {article.readTime}
          </span>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4
            className="text-base leading-snug mb-1.5 group-hover:opacity-75 transition-opacity line-clamp-2"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-slate-deep)',
              fontWeight: 600,
            }}
          >
            {article.title}
          </h4>
          <p
            className="text-xs leading-relaxed line-clamp-2 mb-2"
            style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.52 0.02 200)' }}
          >
            {article.excerpt}
          </p>
        </a>
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-body)', color: '#C9A84C' }}
          >
            {article.source}
          </span>
          <div className="flex items-center gap-2">
            <BookmarkButton article={article} />
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ExternalLink size={12} style={{ color: '#C9A84C' }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

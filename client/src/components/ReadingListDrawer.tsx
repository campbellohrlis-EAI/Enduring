// =============================================================================
// ENDURING ADVANTAGE, Reading List Drawer
// Slide-in panel showing all bookmarked articles
// Sage Editorial design: cream background, sage green accents
// =============================================================================

import { X, BookmarkCheck, ExternalLink, Trash2, BookOpen } from 'lucide-react';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { categoryBgColors, categoryTextColors } from '@/lib/data';

interface ReadingListDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function ReadingListDrawer({ open, onClose }: ReadingListDrawerProps) {
  const { bookmarks, toggleBookmark, clearBookmarks } = useBookmarks();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 70,
          background: 'rgba(20,32,34,0.45)',
          backdropFilter: 'blur(3px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s cubic-bezier(0.23,1,0.32,1)',
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 80,
          width: '100%',
          maxWidth: '420px',
          background: 'var(--color-cream)',
          boxShadow: '-8px 0 40px rgba(30,45,47,0.18)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{
            borderBottom: '1px solid rgba(201,168,76,0.12)',
            background: '#fff',
          }}
        >
          <div className="flex items-center gap-2.5">
            <BookmarkCheck size={18} style={{ color: '#C9A84C' }} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--color-slate-deep)',
              }}
            >
              Reading List
            </span>
            {bookmarks.length > 0 && (
              <span
                className="inline-flex items-center justify-center rounded-full text-xs font-bold"
                style={{
                  width: '20px',
                  height: '20px',
                  background: '#C9A84C',
                  color: '#FAF7F2',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {bookmarks.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {bookmarks.length > 0 && (
              <button
                onClick={clearBookmarks}
                title="Clear all bookmarks"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium transition-all duration-200 hover:opacity-70"
                style={{
                  color: 'oklch(0.52 0.02 200)',
                  fontFamily: 'var(--font-body)',
                  background: 'rgba(201,168,76,0.06)',
                }}
              >
                <Trash2 size={12} />
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded transition-all duration-200 hover:opacity-70 active:scale-90"
              style={{
                width: '32px',
                height: '32px',
                background: 'rgba(201,168,76,0.08)',
                color: 'var(--color-slate-deep)',
              }}
              aria-label="Close reading list"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Article list */}
        <div className="flex-1 overflow-y-auto">
          {bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-8 text-center gap-4">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '64px',
                  height: '64px',
                  background: 'rgba(201,168,76,0.08)',
                }}
              >
                <BookOpen size={28} style={{ color: '#C9A84C', opacity: 0.5 }} />
              </div>
              <div>
                <p
                  className="font-semibold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-slate-deep)', fontSize: '1.05rem' }}
                >
                  Your reading list is empty
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.52 0.02 200)' }}
                >
                  Click the bookmark icon on any article to save it here for later.
                </p>
              </div>
            </div>
          ) : (
            <ul className="divide-y" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
              {bookmarks.map((article) => (
                <li key={article.id} className="px-5 py-4 group">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="topic-tag"
                          style={{
                            background: categoryBgColors[article.categoryColor] || '#f1f5f9',
                            color: categoryTextColors[article.categoryColor] || '#334155',
                            fontSize: '0.62rem',
                            padding: '0.2rem 0.55rem',
                          }}
                        >
                          {article.category}
                        </span>
                        <span
                          className="text-xs"
                          style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.6 0.02 200)' }}
                        >
                          {article.readTime}
                        </span>
                      </div>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link"
                      >
                        <h4
                          className="text-sm leading-snug mb-1 group-hover/link:opacity-70 transition-opacity"
                          style={{
                            fontFamily: 'var(--font-display)',
                            color: 'var(--color-slate-deep)',
                            fontWeight: 600,
                          }}
                        >
                          {article.title}
                        </h4>
                      </a>
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ fontFamily: 'var(--font-body)', color: '#C9A84C' }}
                        >
                          {article.source}
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-60"
                            style={{ color: '#C9A84C', fontFamily: 'var(--font-body)' }}
                          >
                            Read <ExternalLink size={10} />
                          </a>
                          <button
                            onClick={() => toggleBookmark(article)}
                            title="Remove bookmark"
                            className="transition-all duration-200 hover:opacity-60 active:scale-90"
                            style={{ color: 'oklch(0.6 0.02 200)' }}
                            aria-label="Remove from reading list"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        {bookmarks.length > 0 && (
          <div
            className="px-6 py-4 text-xs text-center"
            style={{
              borderTop: '1px solid rgba(201,168,76,0.1)',
              fontFamily: 'var(--font-body)',
              color: 'oklch(0.6 0.02 200)',
              background: '#fff',
            }}
          >
            Saved articles are stored in your browser and will persist across visits.
          </div>
        )}
      </div>
    </>
  );
}

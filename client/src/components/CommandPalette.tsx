// =============================================================================
// ENDURING ADVANTAGE, Command Palette (⌘K / Ctrl+K)
// Enduring Advantage editorial design: cream, navy, and gold decision research.
// Searches current articles, sector routes, and Sustainability Playing Field topics.
// Highlights matching text in all result fields
// =============================================================================

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { articles } from '@/lib/articlesData';
import { COLUMNS, CELL_META } from '@/lib/matrixData';
import { FileText, LayoutGrid, ExternalLink, Search, CornerDownLeft, Building2 } from 'lucide-react';
import { icpNavigationItems } from '@/lib/icpNavigation';
import { useLocation } from 'wouter';

// Category colour map (mirrors research section)
const CAT_COLOR: Record<string, string> = {
  business: '#1e40af',
  climate:  '#065f46',
  finance:  '#92400e',
  policy:   '#334155',
  nature:   '#3f6212',
};
const CAT_BG: Record<string, string> = {
  business: '#dbeafe',
  climate:  '#d1fae5',
  finance:  '#fef3c7',
  policy:   '#f1f5f9',
  nature:   '#ecfccb',
};

// ---------------------------------------------------------------------------
// Highlight helper, splits `text` around all occurrences of `query` and
// wraps each match in a <mark> styled span.
// ---------------------------------------------------------------------------
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            style={{
              background: 'rgba(201,168,76,0.22)',
              color: 'var(--color-slate-deep)',
              borderRadius: '2px',
              padding: '0 1px',
              fontWeight: 700,
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

interface CommandPaletteProps {
  onMatrixSelect?: (label: string, searchTerms: string[]) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function CommandPalette({ onMatrixSelect, open: controlledOpen, onOpenChange }: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [, navigate] = useLocation();

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = (v: boolean) => {
    setInternalOpen(v);
    onOpenChange?.(v);
    if (!v) setInputValue('');
  };

  // ⌘K / Ctrl+K global shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open]);

  const handleArticleSelect = useCallback((url: string) => {
    setOpen(false);
    navigate(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const handleSectorSelect = useCallback((route: string) => {
    setOpen(false);
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  const handleMatrixSelect = useCallback(
    (label: string) => {
      setOpen(false);
      const meta = CELL_META[label];
      if (meta && onMatrixSelect) {
        onMatrixSelect(label, meta.searchTerms);
      } else {
        navigate('/services#playing-field');
      }
      setTimeout(() => {
        document.getElementById(onMatrixSelect ? 'research' : 'playing-field')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    },
    [navigate, onMatrixSelect],
  );

  // Build flat matrix cell list
  const matrixCells = useMemo(
    () =>
      COLUMNS.flatMap((col) =>
        col.items.map((item) => ({
          label: item,
          column: col.heading,
          color: col.color,
          description: CELL_META[item]?.description ?? '',
        })),
      ),
    [],
  );

  // Trim query for highlighting (cmdk handles actual filtering)
  const query = inputValue.trim();

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search insights, sectors, and decision topics…"
          value={inputValue}
          onValueChange={setInputValue}
        />
        <CommandList>
          <CommandEmpty>
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <Search size={28} style={{ color: '#C9A84C', margin: '0 auto 10px', opacity: 0.5 }} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-slate-deep)', opacity: 0.7 }}>
                No results found for <strong>"{query}"</strong>
              </p>
            </div>
          </CommandEmpty>

          {/* ── Current research library ── */}
          <CommandGroup heading="Research insights">
            {articles.map((article) => (
              <CommandItem
                key={article.slug}
                value={`${article.title} ${article.excerpt} ${article.category} ${(article.tags ?? []).join(' ')}`}
                onSelect={() => handleArticleSelect(`/articles/${article.slug}`)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', width: '100%', padding: '2px 0' }}>
                  {/* Icon */}
                  <div
                    style={{
                      width: '28px', height: '28px', borderRadius: '6px', flexShrink: 0, marginTop: '1px',
                      background: 'rgba(201,168,76,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <FileText size={13} style={{ color: '#A8882E' }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-slate-deep)', flex: 1 }}>
                        <Highlight text={article.title} query={query} />
                      </span>
                      <ExternalLink size={11} style={{ color: '#C9A84C', flexShrink: 0 }} />
                      <span className="cmd-enter-hint" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.65rem', color: '#C9A84C', background: 'rgba(201,168,76,0.1)', borderRadius: '4px', padding: '1px 5px', flexShrink: 0, opacity: 0, transition: 'opacity 120ms' }}>
                        <CornerDownLeft size={9} /> open
                      </span>
                    </div>

                    {/* Excerpt snippet, only shown when there is a query that matches it */}
                    {query && article.excerpt.toLowerCase().includes(query.toLowerCase()) && (
                      <p
                        style={{
                          fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                          color: '#64748b', margin: '2px 0 3px',
                          overflow: 'hidden', display: '-webkit-box',
                          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        }}
                      >
                        <Highlight text={article.excerpt} query={query} />
                      </p>
                    )}

                    {/* Meta row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, color: '#A8882E', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        <Highlight text={article.category} query={query} />
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#94a3b8' }}>
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Sectors we serve">
            {icpNavigationItems.map((sector) => (
              <CommandItem key={sector.route} value={sector.navLabel} onSelect={() => handleSectorSelect(sector.route)} style={{ cursor: 'pointer' }}>
                <Building2 size={14} style={{ color: '#A8882E', marginRight: '10px', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: 650, color: 'var(--color-slate-deep)' }}>{sector.navLabel}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* ── Matrix Cells ── */}
          <CommandGroup heading="Sustainability Playing Field">
            <CommandItem value="Sustainability Playing Field client provider jurisdictional data decision field" onSelect={() => handleSectorSelect('/playing-field')} style={{ cursor: 'pointer' }}>
              <LayoutGrid size={14} style={{ color: '#A8882E', marginRight: '10px', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: 750, color: 'var(--color-slate-deep)' }}>Explore the full Sustainability Playing Field</span>
            </CommandItem>
            {matrixCells.map((cell) => (
              <CommandItem
                key={`matrix-${cell.label}`}
                value={`${cell.label} ${cell.column} ${cell.description}`}
                onSelect={() => handleMatrixSelect(cell.label)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', width: '100%', padding: '2px 0' }}>
                  {/* Icon */}
                  <div
                    style={{
                      width: '28px', height: '28px', borderRadius: '6px', flexShrink: 0, marginTop: '1px',
                      background: `${cell.color}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <LayoutGrid size={13} style={{ color: cell.color }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Label row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-slate-deep)', flex: 1 }}>
                        <Highlight text={cell.label} query={query} />
                      </span>
                      <span className="cmd-enter-hint" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.65rem', color: '#C9A84C', background: 'rgba(201,168,76,0.1)', borderRadius: '4px', padding: '1px 5px', flexShrink: 0, opacity: 0, transition: 'opacity 120ms' }}>
                        <CornerDownLeft size={9} /> filter
                      </span>
                    </div>

                    {/* Column + description row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600,
                          padding: '1px 7px', borderRadius: '999px',
                          background: `${cell.color}18`, color: cell.color,
                        }}
                      >
                        <Highlight text={cell.column} query={query} />
                      </span>
                      {cell.description && (
                        <span
                          style={{
                            fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#94a3b8',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            maxWidth: '340px',
                          }}
                        >
                          <Highlight text={cell.description} query={query} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>

        {/* Footer hint */}
        <div
          style={{
            padding: '8px 14px', borderTop: '1px solid rgba(201,168,76,0.12)',
            display: 'flex', alignItems: 'center', gap: '16px',
            background: 'rgba(201,168,76,0.03)',
          }}
        >
          {[
            { key: '↑↓', label: 'navigate' },
            { key: '↵', label: 'select' },
            { key: 'esc', label: 'close' },
          ].map(({ key, label }) => (
            <span key={key} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{
                fontFamily: 'var(--font-body)', fontSize: '0.68rem', padding: '1px 5px',
                borderRadius: '4px', background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C',
              }}>
                {key}
              </kbd>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#94a3b8' }}>{label}</span>
            </span>
          ))}
          {query && (
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#94a3b8' }}>
              Searching for <strong style={{ color: '#C9A84C' }}>"{query}"</strong>
            </span>
          )}
        </div>
      </CommandDialog>
    </>
  );
}

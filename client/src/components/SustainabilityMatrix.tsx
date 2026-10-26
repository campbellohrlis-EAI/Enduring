// =============================================================================
// ENDURING ADVANTAGE, Sustainability Playing Field Matrix
// 6 columns × 6 rows from the Catalys framework
// Sage Editorial design: cream cards, sage green column headers, deep slate text
// Each cell has a Radix tooltip showing a brief description + article count
// Data sourced from shared @/lib/matrixData
// =============================================================================

import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronRight, Download, Loader2, Share2 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { articles } from '@/lib/data';
import { COLUMNS, CELL_META, MATRIX_SECTORS, type MatrixSectorKey } from '@/lib/matrixData';
import { Link } from 'wouter';

interface SustainabilityMatrixProps {
  onTopicSelect?: (label: string, searchTerms: string[]) => void;
}

const MATRIX_BRIEFING_URLS: Record<MatrixSectorKey, string> = {
  all: '/manus-storage/decision-matrix-briefing-all_c4ce669b.pdf',
  cfo: '/manus-storage/decision-matrix-briefing-cfo_45ecb9aa.pdf',
  municipalities: '/manus-storage/decision-matrix-briefing-municipalities_eadac7a1.pdf',
  firstNations: '/manus-storage/decision-matrix-briefing-first-nations_b45020ad.pdf',
  agriculture: '/manus-storage/decision-matrix-briefing-agriculture_97919994.pdf',
  realEstate: '/manus-storage/decision-matrix-briefing-real-estate_b03b1414.pdf',
  buildings: '/manus-storage/decision-matrix-briefing-buildings_b11fa214.pdf',
  industrial: '/manus-storage/decision-matrix-briefing-industrial_7a6ff025.pdf',
  transportation: '/manus-storage/decision-matrix-briefing-transportation_d3fc8493.pdf',
};
const JOINT_INDUSTRIAL_TRANSPORTATION_BRIEFING_URL = '/manus-storage/main_fa362ecf.pdf';

function validSectorKey(value: string | null): MatrixSectorKey {
  return MATRIX_SECTORS.some((sector) => sector.key === value) ? value as MatrixSectorKey : 'all';
}

function readLensState() {
  if (typeof window === 'undefined') return { sector: 'all' as MatrixSectorKey, compare: null as MatrixSectorKey | null };
  const params = new URLSearchParams(window.location.search);
  const sector = validSectorKey(params.get('sector'));
  const requestedCompare = validSectorKey(params.get('compare'));
  const compare = requestedCompare !== 'all' && requestedCompare !== sector ? requestedCompare : null;
  return { sector, compare };
}

// Count articles that match any of the cell's search terms (checks tags AND free text)
function countArticles(searchTerms: string[]): number {
  const lowerTerms = searchTerms.map((t) => t.toLowerCase());
  return articles.filter((a) => {
    if (a.tags && a.tags.some((tag) => lowerTerms.includes(tag.toLowerCase()))) return true;
    const haystack = `${a.title} ${a.excerpt} ${a.category} ${a.source}`.toLowerCase();
    return lowerTerms.some((term) => haystack.includes(term));
  }).length;
}

export default function SustainabilityMatrix({ onTopicSelect }: SustainabilityMatrixProps) {
  const [selectedSectorKey, setSelectedSectorKey] = useState<MatrixSectorKey>(() => readLensState().sector);
  const [comparisonSectorKey, setComparisonSectorKey] = useState<MatrixSectorKey | null>(() => readLensState().compare);
  const [activeMobileColumn, setActiveMobileColumn] = useState(COLUMNS[0].heading);
  const [shareStatus, setShareStatus] = useState('');
  const [exportState, setExportState] = useState<'idle' | 'opening' | 'ready'>('idle');
  const selectedSector = MATRIX_SECTORS.find((sector) => sector.key === selectedSectorKey) ?? MATRIX_SECTORS[0];
  const comparisonSector = comparisonSectorKey ? MATRIX_SECTORS.find((sector) => sector.key === comparisonSectorKey) ?? null : null;
  const visibleColumns = useMemo(() => {
    const prioritized = new Set([
      ...selectedSector.priorityColumns,
      ...(comparisonSector?.priorityColumns ?? []),
    ]);
    return COLUMNS.filter((column) => prioritized.has(column.heading));
  }, [selectedSector, comparisonSector]);
  const selectedMobileColumn = visibleColumns.find((column) => column.heading === activeMobileColumn) ?? visibleColumns[0];
  const sharedPriorityTopics = useMemo(() => comparisonSector
    ? selectedSector.priorityTopics.filter((topic) => comparisonSector.priorityTopics.includes(topic))
    : [], [selectedSector, comparisonSector]);
  const selectedOnlyTopics = useMemo(() => comparisonSector
    ? selectedSector.priorityTopics.filter((topic) => !comparisonSector.priorityTopics.includes(topic))
    : [], [selectedSector, comparisonSector]);
  const comparisonOnlyTopics = useMemo(() => comparisonSector
    ? comparisonSector.priorityTopics.filter((topic) => !selectedSector.priorityTopics.includes(topic))
    : [], [selectedSector, comparisonSector]);
  const isIndustrialTransportationComparison = Boolean(
    comparisonSector
    && [selectedSectorKey, comparisonSector.key].includes('industrial')
    && [selectedSectorKey, comparisonSector.key].includes('transportation')
  );
  const exportUrl = isIndustrialTransportationComparison
    ? JOINT_INDUSTRIAL_TRANSPORTATION_BRIEFING_URL
    : MATRIX_BRIEFING_URLS[selectedSectorKey];
  const exportLabel = isIndustrialTransportationComparison
    ? 'Open joint comparison briefing (PDF)'
    : `Open ${selectedSector.briefingTitle} (PDF)`;

  const buildLensUrl = (sectorKey = selectedSectorKey, compareKey = comparisonSectorKey) => {
    const url = new URL(window.location.href);
    url.searchParams.set('sector', sectorKey);
    if (compareKey && compareKey !== sectorKey && compareKey !== 'all') url.searchParams.set('compare', compareKey);
    else url.searchParams.delete('compare');
    url.hash = 'playing-field';
    return url.toString();
  };

  const replaceLensUrl = (sectorKey: MatrixSectorKey, compareKey: MatrixSectorKey | null) => {
    if (typeof window !== 'undefined') window.history.replaceState({}, '', buildLensUrl(sectorKey, compareKey));
  };

  useEffect(() => {
    const onPopState = () => {
      const lens = readLensState();
      setSelectedSectorKey(lens.sector);
      setComparisonSectorKey(lens.compare);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const selectSector = (sectorKey: MatrixSectorKey) => {
    const nextSector = MATRIX_SECTORS.find((sector) => sector.key === sectorKey) ?? MATRIX_SECTORS[0];
    const nextColumns = COLUMNS.filter((column) => nextSector.priorityColumns.includes(column.heading));
    const nextComparison = comparisonSectorKey === sectorKey ? null : comparisonSectorKey;
    setSelectedSectorKey(sectorKey);
    setComparisonSectorKey(nextComparison);
    setActiveMobileColumn(nextColumns[0]?.heading ?? COLUMNS[0].heading);
    replaceLensUrl(sectorKey, nextComparison);
  };

  const selectComparisonSector = (nextValue: string) => {
    const nextComparison = nextValue ? validSectorKey(nextValue) : null;
    setComparisonSectorKey(nextComparison && nextComparison !== selectedSectorKey ? nextComparison : null);
    replaceLensUrl(selectedSectorKey, nextComparison && nextComparison !== selectedSectorKey ? nextComparison : null);
  };

  const shareCurrentLens = async () => {
    const url = buildLensUrl();
    const lensLabel = comparisonSector ? `${selectedSector.label} + ${comparisonSector.label}` : selectedSector.label;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${lensLabel} Sustainability Playing Field`, text: `Explore this sector-prioritized Sustainability Playing Field.`, url });
        setShareStatus('Share sheet opened for this decision-map lens.');
      } else {
        await navigator.clipboard.writeText(url);
        setShareStatus('Shareable link copied to your clipboard.');
      }
    } catch {
      setShareStatus('Sharing was cancelled. The selected lens remains available in this page URL.');
    }
  };

  const confirmExport = () => {
    setExportState('opening');
    window.setTimeout(() => setExportState('ready'), 550);
  };



  return (
    <section
      id="playing-field"
      className="py-20"
      style={{ background: 'oklch(0.97 0.008 152)' }}
    >
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-widest block mb-3"
              style={{ color: '#C9A84C', fontFamily: 'var(--font-body)' }}
            >
              Framework
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 600,
                color: 'var(--color-slate-deep)',
                lineHeight: 1.15,
              }}
            >
              The Sustainability
              <br />
              <em style={{ color: '#C9A84C' }}>Playing Field</em>
            </h2>
            <p
              className="mt-4 max-w-2xl mx-auto text-base leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.45 0.02 200)' }}
            >
              A comprehensive map of every sustainability dimension a business must navigate, from
              operational efficiency and decarbonization to brand enhancement and risk management.
              Hover or focus any cell for context and research, then select it to explore the field.
            </p>
            <div style={{ maxWidth: '900px', margin: '1.65rem auto 0', borderTop: '1px solid rgba(13,51,73,0.14)', borderBottom: '1px solid rgba(13,51,73,0.14)', padding: '1rem 0' }}>
              <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Prioritize the decision matrix by sector">
                <span style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.11em', textTransform: 'uppercase', marginRight: '0.35rem' }}>Prioritize for</span>
                {MATRIX_SECTORS.map((sector) => {
                  const isSelected = sector.key === selectedSectorKey;
                  return (
                    <button
                      key={sector.key}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => selectSector(sector.key)}
                      style={{
                        background: isSelected ? '#0D3349' : 'transparent',
                        border: `1px solid ${isSelected ? '#0D3349' : 'rgba(13,51,73,0.22)'}`,
                        color: isSelected ? '#FAF7F2' : '#0D3349',
                        fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
                        padding: '0.45rem 0.68rem', borderRadius: '999px', transition: 'background 180ms cubic-bezier(0.23,1,0.32,1), color 180ms cubic-bezier(0.23,1,0.32,1), border-color 180ms cubic-bezier(0.23,1,0.32,1)',
                      }}
                    >
                      {sector.shortLabel}
                    </button>
                  );
                })}
              </div>
              <p style={{ color: 'rgba(13,51,73,0.66)', fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.55, margin: '0.75rem auto 0', maxWidth: '760px' }}>
                <strong style={{ color: '#0D3349' }}>{selectedSector.label}:</strong> {selectedSector.summary}{' '}
                {selectedSector.route && <Link href={selectedSector.route} style={{ color: '#0D3349', fontWeight: 700, textDecorationColor: '#C9A84C', textUnderlineOffset: '3px' }}>See the sector route.</Link>}
              </p>
              <div className="mt-4 flex flex-col items-center justify-center gap-3 md:flex-row">
                <label className="flex items-center gap-2" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700 }}>
                  Compare with
                  <select
                    value={comparisonSectorKey ?? ''}
                    onChange={(event) => selectComparisonSector(event.target.value)}
                    style={{ background: '#FFFFFF', color: '#0D3349', border: '1px solid rgba(13,51,73,0.25)', borderRadius: '999px', padding: '0.45rem 1.75rem 0.45rem 0.7rem', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700 }}
                  >
                    <option value="">No comparison</option>
                    {MATRIX_SECTORS.filter((sector) => sector.key !== 'all' && sector.key !== selectedSectorKey).map((sector) => (
                      <option key={sector.key} value={sector.key}>{sector.label}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={shareCurrentLens}
                  className="inline-flex items-center gap-2 active:scale-95"
                  style={{ color: '#0D3349', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.04em', border: '1px solid rgba(13,51,73,0.25)', padding: '0.5rem 0.72rem', borderRadius: '999px', transition: 'background 180ms cubic-bezier(0.23,1,0.32,1)' }}
                >
                  <Share2 size={14} strokeWidth={2.2} /> Share this lens
                </button>
                <a
                  href={exportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={confirmExport}
                  className="inline-flex items-center gap-2 active:scale-95"
                  style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.04em', textDecoration: 'none', borderBottom: '1px solid #C9A84C', padding: '0.5rem 0 0.18rem', transition: 'color 180ms cubic-bezier(0.23,1,0.32,1)' }}
                >
                  {exportState === 'opening' ? <Loader2 className="animate-spin motion-reduce:animate-none" size={14} strokeWidth={2.2} /> : exportState === 'ready' ? <Check size={14} strokeWidth={2.2} /> : <Download size={14} strokeWidth={2.2} />}
                  {exportState === 'opening' ? 'Opening PDF…' : exportState === 'ready' ? 'PDF opened in a new tab' : exportLabel}
                </a>
              </div>
              <p role="status" aria-live="polite" style={{ minHeight: '1.15rem', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, margin: '0.6rem 0 0' }}>
                {shareStatus || (exportState === 'ready' ? 'Your printable briefing opened in a new tab.' : '')}
              </p>
              {isIndustrialTransportationComparison && (
                <div className="flex flex-wrap items-center justify-between gap-3" style={{ background: '#0D3349', borderTop: '3px solid #C9A84C', color: '#FAF7F2', marginTop: '1rem', padding: '0.85rem 1rem' }}>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center" style={{ border: '1px solid #C9A84C', borderRadius: '50%', color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.64rem', fontWeight: 800, height: '34px', width: '34px' }}>↔</span>
                    <div><p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.63rem', fontWeight: 800, letterSpacing: '0.12em', margin: 0, textTransform: 'uppercase' }}>Shared operating screen</p><p style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.2, margin: '0.2rem 0 0' }}>Industrial + Transportation overlap</p></div>
                  </div>
                  <a href={JOINT_INDUSTRIAL_TRANSPORTATION_BRIEFING_URL} target="_blank" rel="noopener noreferrer" onClick={confirmExport} className="inline-flex items-center gap-2" style={{ borderBottom: '1px solid #C9A84C', color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.76rem', fontWeight: 800, paddingBottom: '0.18rem', textDecoration: 'none' }}><Download size={14} /> {sharedPriorityTopics.length} shared priorities · Open joint PDF</a>
                </div>
              )}
              {comparisonSector && (
                <div className="mt-4 grid gap-3 text-left md:grid-cols-3" style={{ borderTop: '1px solid rgba(13,51,73,0.14)', paddingTop: '1rem' }}>
                  <div style={{ borderLeft: '3px solid #C9A84C', padding: '0.2rem 0 0.2rem 0.7rem' }}>
                    <p style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Shared priorities</p>
                    <p style={{ color: 'rgba(13,51,73,0.72)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', lineHeight: 1.45, margin: '0.35rem 0 0' }}>{sharedPriorityTopics.join(' · ') || 'No identical priority topics in the current lens pair.'}</p>
                  </div>
                  <div style={{ borderLeft: '3px solid #0D3349', padding: '0.2rem 0 0.2rem 0.7rem' }}>
                    <p style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{selectedSector.shortLabel} lens</p>
                    <p style={{ color: 'rgba(13,51,73,0.72)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', lineHeight: 1.45, margin: '0.35rem 0 0' }}>{selectedOnlyTopics.join(' · ') || 'All listed priorities overlap.'}</p>
                  </div>
                  <div style={{ borderLeft: '3px solid #2E6B8A', padding: '0.2rem 0 0.2rem 0.7rem' }}>
                    <p style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{comparisonSector.shortLabel} lens</p>
                    <p style={{ color: 'rgba(13,51,73,0.72)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', lineHeight: 1.45, margin: '0.35rem 0 0' }}>{comparisonOnlyTopics.join(' · ') || 'All listed priorities overlap.'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Desktop matrix grid */}
        <ScrollReveal delay={100}>
          <div
            className="hidden overflow-hidden rounded-2xl md:block"
            style={{
              border: '1.5px solid rgba(201,168,76,0.18)',
              boxShadow: '0 4px 32px rgba(30,45,47,0.08)',
              background: '#fff',
            }}
          >
            {/* Column headers */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${visibleColumns.length}, 1fr)`,
                borderBottom: '2px solid rgba(201,168,76,0.12)',
              }}
            >
              {visibleColumns.map((col, i) => (
                <div
                  key={col.heading}
                  className="flex w-full flex-col items-center justify-center text-center px-3 py-4"
                  style={{
                    background: col.color,
                    borderRight: i < visibleColumns.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
                    minHeight: '72px',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.65rem, 1.1vw, 0.8rem)', fontWeight: 700, color: '#FAF7F2', letterSpacing: '0.03em', lineHeight: 1.3, textAlign: 'center' }}>
                    {col.heading}
                  </span>
                </div>
              ))}
            </div>

            {/* Item rows */}
            {Array.from({ length: 6 }).map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${visibleColumns.length}, 1fr)`,
                  borderBottom: rowIdx < 5 ? '1px solid rgba(201,168,76,0.07)' : 'none',
                }}
              >
                {visibleColumns.map((col, colIdx) => {
                  const item = col.items[rowIdx];
                  const meta = CELL_META[item];
                  const count = meta ? countArticles(meta.searchTerms) : 0;
                  const isPrimaryPriority = selectedSector.priorityTopics.includes(item);
                  const isComparisonPriority = comparisonSector?.priorityTopics.includes(item) ?? false;
                  const isSharedPriority = isPrimaryPriority && isComparisonPriority;
                  const isIndustrialTransportShared = isIndustrialTransportationComparison && isSharedPriority;
                  const priorityBackground = isIndustrialTransportShared
                    ? 'rgba(201,168,76,0.32)'
                    : isSharedPriority
                    ? 'rgba(201,168,76,0.22)'
                    : isPrimaryPriority
                      ? 'rgba(13,51,73,0.08)'
                      : isComparisonPriority
                        ? 'rgba(46,107,138,0.12)'
                        : 'transparent';

                  return (
                    <Tooltip key={colIdx}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          aria-label={`${item}. ${isSharedPriority ? 'Shared priority in both selected sector lenses. ' : isPrimaryPriority ? `Priority for ${selectedSector.label}. ` : isComparisonPriority ? `Priority for ${comparisonSector?.label}. ` : ''}${meta?.description ?? 'Explore this sustainability area.'}`}
                          className="flex w-full items-center justify-center text-center px-3 py-3 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#C9A84C]"
                          style={{
                            borderRight:
                              colIdx < visibleColumns.length - 1
                                ? '1px solid rgba(201,168,76,0.07)'
                                : 'none',
                            borderTop: 'none',
                            borderBottom: 'none',
                            borderLeft: 'none',
                            minHeight: '52px',
                            cursor: 'pointer',
                            position: 'relative',
                            background: priorityBackground,
                            boxShadow: isIndustrialTransportShared ? 'inset 0 0 0 2px #C9A84C' : 'none',
                          }}
                          onClick={() => onTopicSelect?.(item, meta?.searchTerms ?? [item])}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = isIndustrialTransportShared ? 'rgba(201,168,76,0.42)' : col.lightBg;
                            if (meta?.articleSlug) {
                              (e.currentTarget as HTMLElement).style.outline = `1.5px solid ${col.color}66`;
                              (e.currentTarget as HTMLElement).style.outlineOffset = '-2px';
                              (e.currentTarget as HTMLElement).style.borderRadius = '4px';
                            }
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = priorityBackground;
                            (e.currentTarget as HTMLElement).style.outline = 'none';
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: 'clamp(0.62rem, 1vw, 0.78rem)',
                              fontWeight: 500,
                              color: 'var(--color-slate-deep)',
                              lineHeight: 1.35,
                              textAlign: 'center',
                            }}
                          >
                            {item}
                          </span>
                          {isIndustrialTransportShared && <span style={{ position: 'absolute', bottom: '4px', left: '5px', background: '#0D3349', color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.48rem', fontWeight: 800, letterSpacing: '0.06em', padding: '2px 4px', textTransform: 'uppercase' }}>Shared</span>}
                          {/* Article count badge, top right */}
                          {count > 0 && (
                            <span
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '5px',
                                background: col.color,
                                color: '#FAF7F2',
                                fontSize: '0.55rem',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 700,
                                borderRadius: '999px',
                                padding: '1px 5px',
                                lineHeight: 1.5,
                                opacity: 0.85,
                              }}
                            >
                              {count}
                            </span>
                          )}
                        </button>
                      </TooltipTrigger>
                      {meta && (
                        <TooltipContent
                          side="top"
                          sideOffset={6}
                          style={{
                            maxWidth: '240px',
                            padding: '10px 14px',
                            background: 'var(--color-slate-deep, #0D3349)',
                            border: `1px solid ${col.color}55`,
                            borderRadius: '10px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                          }}
                        >
                          <p
                            style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '0.78rem',
                              color: '#FAF7F2',
                              lineHeight: 1.5,
                              marginBottom: count > 0 ? '8px' : '0',
                            }}
                          >
                            {meta.description}
                          </p>
                          {count > 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span
                                style={{
                                  background: col.color,
                                  color: '#FAF7F2',
                                  fontSize: '0.7rem',
                                  fontFamily: 'var(--font-body)',
                                  fontWeight: 700,
                                  borderRadius: '999px',
                                  padding: '2px 8px',
                                }}
                              >
                                {count} article{count !== 1 ? 's' : ''}
                              </span>
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  color: 'rgba(250,247,242,0.6)',
                                  fontFamily: 'var(--font-body)',
                                }}
                              >
                                Click to filter research
                              </span>
                            </div>
                          ) : (
                            <div
                              style={{
                                fontSize: '0.68rem',
                                color: 'rgba(250,247,242,0.5)',
                                fontFamily: 'var(--font-body)',
                                marginTop: '6px',
                              }}
                            >
                              No articles indexed yet
                            </div>
                          )}
                         {/* Associated research link */}
                          {meta.articleSlug && (
                            <Link
                              href={`/articles/${meta.articleSlug}`}
                              onClick={(e: React.MouseEvent) => e.stopPropagation()}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                marginTop: '8px',
                                fontSize: '0.68rem',
                                fontFamily: 'var(--font-body)',
                                color: col.color === '#8A2E2E' ? '#f87171' : '#C9A84C',
                                fontWeight: 600,
                                textDecoration: 'none',
                                borderTop: '1px solid rgba(250,247,242,0.1)',
                                paddingTop: '8px',
                                width: '100%',
                              }}
                            >
                              Read the article →
                            </Link>
                          )}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mobile column navigator: reveal one complete decision field at a time. */}
        <ScrollReveal delay={100}>
          <section className="md:hidden" aria-label="Mobile decision matrix navigator" style={{ border: '1px solid rgba(201,168,76,0.28)', background: '#FFFFFF', boxShadow: '0 10px 30px rgba(13,51,73,0.08)' }}>
            <div className="flex items-center justify-between gap-3" style={{ padding: '0.9rem 1rem', background: selectedMobileColumn.color }}>
              <div>
                <p style={{ color: 'rgba(250,247,242,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Browse the field</p>
                <h3 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 600, lineHeight: 1.1, margin: '0.25rem 0 0' }}>{selectedMobileColumn.heading}</h3>
              </div>
              <span style={{ color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', border: '1px solid rgba(250,247,242,0.5)', padding: '0.32rem 0.45rem' }}>{visibleColumns.length} fields</span>
            </div>
            <div className="flex gap-2 overflow-x-auto" style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(13,51,73,0.12)', scrollbarWidth: 'thin' }} role="tablist" aria-label="Decision map fields">
              {visibleColumns.map((column) => {
                const isActive = column.heading === selectedMobileColumn.heading;
                return (
                  <button
                    key={column.heading}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveMobileColumn(column.heading)}
                    style={{
                      flexShrink: 0, background: isActive ? column.color : column.lightBg, border: `1px solid ${isActive ? column.color : `${column.color}42`}`,
                      color: isActive ? '#FAF7F2' : '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700,
                      padding: '0.45rem 0.6rem', borderRadius: '999px', transition: 'background 180ms cubic-bezier(0.23,1,0.32,1), color 180ms cubic-bezier(0.23,1,0.32,1)',
                    }}
                  >
                    {column.heading}
                  </button>
                );
              })}
            </div>
            <div role="tabpanel" style={{ padding: '0.25rem 1rem 1rem' }}>
              {selectedMobileColumn.items.map((item) => {
                const meta = CELL_META[item];
                const articleCount = meta ? countArticles(meta.searchTerms) : 0;
                const isPrimaryPriority = selectedSector.priorityTopics.includes(item);
                const isComparisonPriority = comparisonSector?.priorityTopics.includes(item) ?? false;
                const isSharedPriority = isPrimaryPriority && isComparisonPriority;
                const isIndustrialTransportShared = isIndustrialTransportationComparison && isSharedPriority;
                const priorityBackground = isIndustrialTransportShared
                  ? 'rgba(201,168,76,0.32)'
                  : isSharedPriority
                  ? 'rgba(201,168,76,0.22)'
                  : isPrimaryPriority
                    ? 'rgba(13,51,73,0.08)'
                    : isComparisonPriority
                      ? 'rgba(46,107,138,0.12)'
                      : 'transparent';
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => onTopicSelect?.(item, meta?.searchTerms ?? [item])}
                    style={{ width: '100%', display: 'block', textAlign: 'left', background: priorityBackground, border: 'none', borderBottom: '1px solid rgba(13,51,73,0.11)', boxShadow: isIndustrialTransportShared ? 'inset 3px 0 0 #C9A84C' : 'none', padding: '0.85rem 0.15rem', color: '#0D3349' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.08rem', fontWeight: 600, lineHeight: 1.2 }}>{item}</span>
                      <span className="flex items-center gap-1.5" aria-label={`${articleCount} related articles`}>
                        {articleCount > 0 && <span style={{ background: selectedMobileColumn.color, color: '#FAF7F2', fontSize: '0.58rem', fontFamily: 'var(--font-body)', fontWeight: 800, borderRadius: '999px', padding: '1px 6px' }}>{articleCount}</span>}
                      </span>
                    </div>
                    {isIndustrialTransportShared && <span style={{ color: '#8A6818', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.08em', marginTop: '0.35rem', textTransform: 'uppercase' }}>Shared Industrial + Transportation priority</span>}
                    {meta && <span style={{ display: 'block', color: 'rgba(13,51,73,0.66)', fontFamily: 'var(--font-body)', fontSize: '0.76rem', lineHeight: 1.45, marginTop: '0.35rem' }}>{meta.description}</span>}
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: selectedMobileColumn.color, fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, marginTop: '0.45rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Explore this topic <ChevronRight size={13} strokeWidth={2.3} /></span>
                  </button>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {/* Map legend and interaction guidance */}
        <ScrollReveal delay={150}>
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Decision map badge legend">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  style={{
                    background: '#C9A84C', color: '#FAF7F2', fontSize: '0.58rem',
                    fontFamily: 'var(--font-body)', fontWeight: 700, borderRadius: '999px', padding: '1px 6px', lineHeight: 1.5,
                  }}
                >3</span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'oklch(0.5 0.02 200)' }}>
                  Related research articles for that cell
                </span>
              </div>
            </div>
            <p
              className="text-center text-xs"
              style={{
                fontFamily: 'var(--font-body)', color: 'oklch(0.58 0.02 200)', letterSpacing: '0.02em', margin: 0,
              }}
            >
              Hover or focus any cell for context. Select a cell to explore the associated research.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

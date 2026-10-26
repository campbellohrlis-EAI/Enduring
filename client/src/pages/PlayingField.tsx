import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PlayingFieldOptionCloud from '@/components/PlayingFieldOptionCloud';
import { useSEO } from '@/hooks/useSEO';
import { trackEvent, trackPlayingFieldCtaClick } from '@/lib/analytics';
import { trpc } from '@/lib/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { ArrowRight, CalendarDays, Check, Compass, Download, Layers3, LoaderCircle, MapPinned, Network, Printer, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import superjson from 'superjson';
import { Link } from 'wouter';

const BOOKING_URL = 'https://calendar.app.google/ozpmtufXwN4uhE2r6';
const DIAGRAM_DOWNLOAD_URL = '/manus-storage/sustainability-playing-field-diagram-2026-10_99baff33.png';

const fieldLayers = [
  { label: 'Client evidence', detail: 'Operating data and the decision in front of you', icon: Network, accent: '#F0D070' },
  { label: 'Provider options', detail: 'Products, services and software across the field', icon: Layers3, accent: '#9CC8DA' },
  { label: 'Jurisdictional reality', detail: 'Climate, incentives, policy, prices and regulation by location', icon: MapPinned, accent: '#C9A84C' },
] as const;

const orderlyFieldCategories = [
  { id: 'operations', label: 'Asset & operations', topics: ['Energy efficiency', 'Procurement', 'Climate risk', 'Productivity'] },
  { id: 'resources', label: 'Resources & resilience', topics: ['Water strategy', 'Clean air', 'Financing', 'Maintenance'] },
  { id: 'market', label: 'Market & delivery', topics: ['Building envelope', 'Electrification', 'Supply chain', 'Extreme weather'] },
  { id: 'capital', label: 'Capital & performance', topics: ['Fleet transition', 'Waste systems', 'Climate resilience', 'Asset performance'] },
] as const;

type FieldCategory = 'all' | (typeof orderlyFieldCategories)[number]['id'];
type CtaFeedback = 'idle' | 'loading' | 'confirmed';
type ExportFeedback = 'idle' | 'opening' | 'ready';

const playingFieldTrpcClient = trpc.createClient({
  links: [httpBatchLink({ transformer: superjson, url: '/api/trpc' })],
});

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character] ?? character);
}

function PlayingFieldContent() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTopicCategory, setActiveTopicCategory] = useState<FieldCategory>('all');
  const [heroCtaFeedback, setHeroCtaFeedback] = useState<CtaFeedback>('idle');
  const [exportFeedback, setExportFeedback] = useState<ExportFeedback>('idle');
  const heroCtaTimerRef = useRef<number | undefined>(undefined);
  const exportTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
      if (!mediaQuery.matches) setActiveLayer(null);
    };

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => () => {
    if (heroCtaTimerRef.current) window.clearTimeout(heroCtaTimerRef.current);
    if (exportTimerRef.current) window.clearTimeout(exportTimerRef.current);
  }, []);

  const handleHeroBookingClick = () => {
    trackPlayingFieldCtaClick('hero_booking');
    setHeroCtaFeedback('loading');
    if (heroCtaTimerRef.current) window.clearTimeout(heroCtaTimerRef.current);
    window.setTimeout(() => setHeroCtaFeedback('confirmed'), 360);
    heroCtaTimerRef.current = window.setTimeout(() => setHeroCtaFeedback('idle'), 2400);
  };

  const handleTopicCategoryChange = (category: FieldCategory) => {
    setActiveTopicCategory(category);
    trackEvent('playing_field_topic_filter', {
      event_category: 'engagement',
      event_label: category,
      category,
    });
  };

  const selectLayer = (index: number) => {
    setActiveLayer((current) => {
      const next = current === index ? null : index;
      if (isMobile && next !== null) {
        trackEvent('playing_field_layer_opened', {
          event_category: 'engagement',
          event_label: fieldLayers[index].label,
          layer: fieldLayers[index].label,
        });
      }
      return next;
    });
  };

  useSEO({
    title: 'Sustainability Playing Field',
    description: 'A visual decision field that brings client evidence, provider options and jurisdictional reality together to identify the Next Best Thing.',
    canonicalPath: '/playing-field',
    ogType: 'website',
  });

  const selectedLayer = activeLayer === null ? null : fieldLayers[activeLayer];
  const SelectedLayerIcon = selectedLayer?.icon;
  const visibleFieldCategories = activeTopicCategory === 'all'
    ? orderlyFieldCategories
    : orderlyFieldCategories.filter(({ id }) => id === activeTopicCategory);
  const activeCategoryLabel = activeTopicCategory === 'all' ? null : visibleFieldCategories[0].label;
  const tableCategoryLabel = activeCategoryLabel ?? 'All Playing Field categories';
  const diagramDownloadLabel = activeCategoryLabel
    ? `Download the full diagram for ${activeCategoryLabel}`
    : 'Download the high-resolution Playing Field diagram';
  const summaryQuery = trpc.playingField.summary.useQuery(
    { category: activeTopicCategory },
    { refetchOnWindowFocus: false, retry: false, staleTime: 1000 * 60 * 60 * 24 },
  );

  const printFilteredBriefing = () => {
    setExportFeedback('opening');
    const tableHeader = visibleFieldCategories.map(({ label }) => `<th>${escapeHtml(label)}</th>`).join('');
    const tableRows = [0, 1, 2, 3].map((row) => `<tr>${visibleFieldCategories.map(({ topics }) => `<td>${escapeHtml(topics[row])}</td>`).join('')}</tr>`).join('');
    const summary = summaryQuery.data?.summary ?? `This briefing lists the topics currently shown for ${tableCategoryLabel}. Use the field to organise a first evidence review before considering any specific solution.`;
    const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=900,height=780');

    if (!printWindow) {
      setExportFeedback('idle');
      return;
    }

    printWindow.document.write(`<!doctype html><html lang="en-CA"><head><meta charset="utf-8"><title>${escapeHtml(tableCategoryLabel)} | Sustainability Playing Field</title><style>body{color:#0D3349;font-family:Arial,sans-serif;line-height:1.5;margin:42px}.kicker{color:#8A6818;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase}.rule{border-top:4px solid #C9A84C;margin:16px 0 22px}h1{font-family:Georgia,serif;font-size:31px;line-height:1.12;margin:0 0 8px}h2{font-family:Georgia,serif;font-size:18px;margin:26px 0 10px}.overview{background:#F4EFE5;border-left:4px solid #C9A84C;padding:15px 17px}table{border-collapse:collapse;width:100%}th{background:#0D3349;border:1px solid #416071;color:#F0D070;font-size:11px;letter-spacing:.8px;padding:11px;text-align:left;text-transform:uppercase}td{border:1px solid #CFC7B7;font-size:13px;padding:11px;vertical-align:top}tr:nth-child(even) td{background:#F8F5EE}.note{color:#526A74;font-size:12px;margin-top:20px}.footer{border-top:1px solid #C9A84C;color:#526A74;font-size:11px;margin-top:28px;padding-top:10px}</style></head><body><div class="kicker">Enduring Advantage / Sustainability Playing Field</div><h1>${escapeHtml(tableCategoryLabel)} briefing</h1><div class="rule"></div><div class="overview"><strong>AI-assisted orientation</strong><br>${escapeHtml(summary)}<div class="note">This overview organises the displayed topics. It does not select a project, partner, or Next Best Thing.</div></div><h2>Topics in view</h2><table><thead><tr>${tableHeader}</tr></thead><tbody>${tableRows}</tbody></table><div class="footer">Prepared from enduringadvantage.com · ${new Date().toLocaleDateString('en-CA')}</div></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();

    trackEvent('playing_field_filtered_briefing_export', {
      event_category: 'engagement',
      event_label: activeTopicCategory,
      category: activeTopicCategory,
    });
    window.setTimeout(() => setExportFeedback('ready'), 150);
    if (exportTimerRef.current) window.clearTimeout(exportTimerRef.current);
    exportTimerRef.current = window.setTimeout(() => setExportFeedback('idle'), 2400);
  };

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      <Navigation />
      <main>
        <section style={{ background: 'linear-gradient(135deg, #0D3349 0%, #123F59 62%, #0D3349 100%)', overflow: 'hidden', padding: 'clamp(7rem, 13vw, 10rem) 0 clamp(4rem, 8vw, 6rem)', position: 'relative' }}>
          <div aria-hidden="true" style={{ background: 'radial-gradient(circle at 72% 35%, rgba(201,168,76,0.24), transparent 0 28%), radial-gradient(circle at 90% 82%, rgba(82,150,179,0.2), transparent 0 24%)', inset: 0, pointerEvents: 'none', position: 'absolute' }} />
          <div className="container" style={{ position: 'relative' }}>
            <div style={{ maxWidth: '800px' }}>
              <div>
                <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', margin: 0, textTransform: 'uppercase' }}>The whole field, made useful</p>
                <h1 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.7rem, 6vw, 5.1rem)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.02, margin: '0.8rem 0 0' }}>The Sustainability<br /><em style={{ color: '#F0D070' }}>Playing Field.</em></h1>
                <p style={{ color: 'rgba(250,247,242,0.77)', fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', lineHeight: 1.72, margin: '1.5rem 0 0', maxWidth: '690px' }}>You're deciding between options that compete for the same capital and move at different speeds. The field is crowded, and it keeps changing. We do not start with a vendor&apos;s suggested solution. Your data tells us where to look, then the whole field becomes an orderly view before deciding what deserves the next dollar.</p>
                <p style={{ color: 'rgba(250,247,242,0.62)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.65, margin: '1rem 0 0', maxWidth: '680px' }}>Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data. Your own data, and how it is organised, managed and used, is the advantage.</p>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={handleHeroBookingClick} className="playing-field-primary-cta" data-feedback={heroCtaFeedback} aria-busy={heroCtaFeedback === 'loading'} style={{ alignItems: 'center', background: '#C9A84C', color: '#0D3349', display: 'inline-flex', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 800, gap: '0.55rem', marginTop: '1.8rem', padding: '0.9rem 1.1rem', textDecoration: 'none' }}>
                  {heroCtaFeedback === 'idle' && <><CalendarDays size={17} /> Request My 30-Minute Triage <ArrowRight size={16} /></>}
                  {heroCtaFeedback === 'loading' && <><LoaderCircle className="playing-field-cta-spinner" size={17} /> Opening calendar</>}
                  {heroCtaFeedback === 'confirmed' && <><Check className="playing-field-cta-check" size={17} /> Calendar opened</>}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="playing-field-cloud-section" aria-labelledby="option-cloud-heading">
          <div className="container" style={{ maxWidth: '1040px' }}>
            <div className="playing-field-cloud-heading">
              <p>01 · Start with the cloud</p>
              <h2 id="option-cloud-heading">Every option may be credible. The field is still hard to see.</h2>
              <span>These are familiar sustainability decisions, moving at different speeds and competing for the same capital. Your data tells us which business problem to solve first. The question is not whether these options are good. It is which one merits the next dollar.</span>
            </div>
            <div className="playing-field-cloud-stage">
              <article className="playing-field-option-cloud" aria-label="An animated cloud of possible sustainability options">
                <p>Without the full field</p>
                <PlayingFieldOptionCloud />
                <strong>Many credible options.<br />No common decision.</strong>
              </article>
            </div>
          </div>
        </section>

        <section className="playing-field-orderly-section" aria-labelledby="orderly-field-heading">
          <div className="container" style={{ maxWidth: '1160px' }}>
            <div className="playing-field-orderly-heading">
              <p>02 · Make the field visible</p>
              <div className="playing-field-orderly-title-row"><h2 id="orderly-field-heading">The Sustainability Playing Field, in one orderly view.</h2><span className="playing-field-category-badge" aria-live="polite">{tableCategoryLabel}</span></div>
              <span>We turn the cloud into a structured field so your data can lead the search and competing options can be considered on the same terms.</span>
            </div>
            <div className="playing-field-orderly-layout">
              <div className="playing-field-topic-table-area">
                <section className="playing-field-ai-summary" aria-live="polite" aria-busy={summaryQuery.isLoading}>
                  <div className="playing-field-ai-summary-label"><Sparkles size={15} /> AI-assisted orientation</div>
                  {summaryQuery.isLoading && <p>Preparing a short overview of the topics in view.</p>}
                  {summaryQuery.isError && <p>Use the topics below to orient a first evidence review. A fresh overview isn't available right now.</p>}
                  {summaryQuery.data && <p>{summaryQuery.data.summary}</p>}
                  <small>Generated from the current topic selection. It organises the field and does not select a project, partner, or Next Best Thing.</small>
                </section>
                <div className="playing-field-topic-filter">
                  <label htmlFor="playing-field-category">Filter by category</label>
                  <select id="playing-field-category" value={activeTopicCategory} onChange={(event) => handleTopicCategoryChange(event.target.value as FieldCategory)}>
                    <option value="all">All Playing Field categories</option>
                    {orderlyFieldCategories.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
                  </select>
                  <button type="button" className="playing-field-filter-reset" onClick={() => handleTopicCategoryChange('all')} disabled={activeTopicCategory === 'all'}>
                    Clear filter
                  </button>
                  <span aria-live="polite">Showing {visibleFieldCategories.length === 1 ? visibleFieldCategories[0].label : 'all categories'}</span>
                </div>
                <div className="playing-field-briefing-action">
                  <button type="button" onClick={printFilteredBriefing} className="playing-field-briefing-export" data-feedback={exportFeedback}>
                    {exportFeedback === 'idle' && <><Printer size={16} /> Export filtered briefing (PDF)</>}
                    {exportFeedback === 'opening' && <><LoaderCircle className="playing-field-cta-spinner" size={16} /> Opening print dialog</>}
                    {exportFeedback === 'ready' && <><Check size={16} /> Print briefing opened</>}
                  </button>
                  <span>Opens a clean briefing that can be printed or saved as a PDF.</span>
                </div>
                <div className="playing-field-topic-table-wrap" tabIndex={0} aria-label="Sustainability Playing Field topic table">
                <table className="playing-field-topic-table" data-columns={visibleFieldCategories.length}>
                  <caption>{activeTopicCategory === 'all' ? 'Representative decision topics arranged as a common field' : `${visibleFieldCategories[0].label} decision topics`}</caption>
                  <thead>
                    <tr>
                      {visibleFieldCategories.map(({ id, label }) => <th key={id} scope="col">{label}</th>)}
                    </tr>
                  </thead>
                  <tbody key={activeTopicCategory}>
                    {[0, 1, 2, 3].map((row) => (
                      <tr key={row} className="playing-field-topic-row">
                        {visibleFieldCategories.map(({ id, topics }) => <td key={`${id}-${topics[row]}`}>{topics[row]}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
              <aside className="playing-field-orderly-aside">
                <p>One common field</p>
                <h3>See the whole decision landscape before selecting a solution.</h3>
                <span>Each topic is considered as part of the same field, rather than as an isolated vendor claim or shortlist.</span>
                <a href={DIAGRAM_DOWNLOAD_URL} download="enduring-advantage-sustainability-playing-field.png" onClick={() => trackPlayingFieldCtaClick('diagram_download')} className="playing-field-download" aria-label={`${diagramDownloadLabel}, PNG 2800 by 2206 pixels`}>
                  <Download size={18} /> <span>{diagramDownloadLabel}</span><small>PNG · 2800 × 2206</small>
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="playing-field-nbt-section" aria-labelledby="nbt-process-heading">
          <div className="container" style={{ maxWidth: '1080px' }}>
            <div className="playing-field-nbt-heading">
              <p>03 · Find the Next Best Thing</p>
              <h2 id="nbt-process-heading">Three databases. One evidence-led next move.</h2>
              <span>Your data sets the question. The full field is then screened against the reality of your business, the market and the place where delivery must work.</span>
            </div>
            <div className="playing-field-nbt-flow" data-active-layer={activeLayer ?? undefined}>
              <div className="playing-field-nbt-sources" aria-label="Three decision databases">
                {fieldLayers.map(({ label, detail, icon: Icon, accent }, index) => {
                  const isSelected = activeLayer === index;
                  return (
                    <button
                      key={label}
                      type="button"
                      className="playing-field-layer playing-field-nbt-source"
                      data-layer={index}
                      aria-expanded={isMobile ? isSelected : undefined}
                      aria-controls={isMobile ? 'playing-field-mobile-detail' : undefined}
                      onMouseEnter={() => !isMobile && setActiveLayer(index)}
                      onMouseLeave={() => !isMobile && setActiveLayer(null)}
                      onFocus={() => !isMobile && setActiveLayer(index)}
                      onBlur={() => !isMobile && setActiveLayer(null)}
                      onClick={() => selectLayer(index)}
                      style={{ borderColor: `${accent}99` }}
                    >
                      <span className="flex items-center gap-2"><Icon size={18} style={{ color: accent }} /><span>{label}</span></span>
                      <span>{detail}</span>
                    </button>
                  );
                })}
              </div>
              <div className="playing-field-nbt-funnel" aria-hidden="true">
                <span>Common decision test</span>
                <svg viewBox="0 0 240 166" preserveAspectRatio="none"><path d="M6 10H102M6 83H102M6 156H102M102 10L222 83L102 156" /><path d="M102 10L102 156" /></svg>
              </div>
              <article className="playing-field-nbt-outcome">
                <p>One defensible decision</p>
                <strong>Next Best<br />Thing</strong>
                <span>Financial return is the ranking criterion. Positive environmental impact makes the opportunity worth delivering.</span>
              </article>
            </div>
            <p className="playing-field-mobile-hint">On mobile, tap a database to see the evidence it contributes to the decision.</p>
            {isMobile && selectedLayer && SelectedLayerIcon && (
              <section id="playing-field-mobile-detail" className="playing-field-mobile-detail" aria-live="polite">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: `${selectedLayer.accent}1F`, border: `1px solid ${selectedLayer.accent}` }}><SelectedLayerIcon size={20} style={{ color: selectedLayer.accent }} /></span>
                  <div>
                    <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.12em', margin: 0, textTransform: 'uppercase' }}>Decision database</p>
                    <h3 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.55rem', lineHeight: 1.1, margin: '0.3rem 0 0' }}>{selectedLayer.label}</h3>
                    <p style={{ color: 'rgba(250,247,242,0.74)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.55, margin: '0.5rem 0 0' }}>{selectedLayer.detail}</p>
                  </div>
                  <button type="button" onClick={() => setActiveLayer(null)} className="playing-field-detail-close" aria-label={`Close ${selectedLayer.label} detail`}><X size={18} /></button>
                </div>
              </section>
            )}
          </div>
        </section>

        <section style={{ background: '#FFFDF5', padding: 'clamp(3.5rem, 7vw, 6rem) 0' }}>
          <div className="container" style={{ maxWidth: '1080px' }}>
            <p style={{ color: '#A9832C', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.14em', margin: 0, textTransform: 'uppercase' }}>How the field becomes a decision</p>
            <h2 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.3rem)', lineHeight: 1.08, margin: '0.75rem 0 1rem', maxWidth: '720px' }}>One decision process. One clear move at a time.</h2>
            <p style={{ color: '#53656A', fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, margin: 0, maxWidth: '760px' }}>It starts with the evidence you have today and low-risk, easy wins while data collection continues. We do not choose among projects vendors have suggested. Your data leads the search across the field, which is screened through two gates: financial return and a positive environmental impact across the entire Sustainability Playing Field. A Coach and specialists apply the human sanity test before delivery begins. You see the whole field, then you see the one move on it that is yours.</p>
            <div className="grid gap-4 md:grid-cols-3" style={{ marginTop: '2.2rem' }}>
              {[
                ['01', 'Assess and collect', 'Start with the business, the decision and the available data.'],
                ['02', 'Identify and plan', 'Screen the field, then turn the Next Best Thing into a practical plan.'],
                ['03', 'Deliver and repeat', 'Quarterback delivery, report the results, then identify the next move.'],
              ].map(([number, title, body]) => <article key={number} className="playing-field-step-card" style={{ background: '#FAF7F2', borderTop: '3px solid #C9A84C', padding: '1.35rem' }}><p style={{ color: '#A9832C', fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{number}</p><h3 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.35rem', margin: '0.8rem 0 0.45rem' }}>{title}</h3><p style={{ color: '#53656A', fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{body}</p></article>)}
            </div>
            <div className="flex flex-wrap gap-3" style={{ marginTop: '2rem' }}>
              <Link href="/services" onClick={() => trackPlayingFieldCtaClick('six_step_process')} className="playing-field-secondary-cta" style={{ alignItems: 'center', border: '1px solid #0D3349', color: '#0D3349', display: 'inline-flex', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, gap: '0.5rem', padding: '0.75rem 0.95rem', textDecoration: 'none' }}><Compass size={16} /> See the six-step process</Link>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackPlayingFieldCtaClick('process_booking')} className="playing-field-text-cta" style={{ alignItems: 'center', color: '#0D3349', display: 'inline-flex', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, gap: '0.5rem', padding: '0.75rem 0.2rem', textDecoration: 'underline', textDecorationColor: '#C9A84C', textUnderlineOffset: '4px' }}>Book a decision conversation <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function PlayingField() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider client={playingFieldTrpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <PlayingFieldContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

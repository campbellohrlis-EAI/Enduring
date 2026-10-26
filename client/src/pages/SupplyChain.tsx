// Design reminder: navy-and-gold financial editorial hub for practical supply-chain decisions.
// Use cream space, evidence-aware copy, restrained gold signals, and clear next actions.

import { Link } from 'wouter';
import { ArrowRight, Clock, Download, Route } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BrandBreadcrumbs from '@/components/BrandBreadcrumbs';
import { useSEO, organizationSchema } from '@/hooks/useSEO';
import { articles, getArticleBySlug, type Article } from '@/lib/articlesData';
import { trackSupplyChainChecklistDownloaded } from '@/lib/analytics';

const freightChecklistUrl = '/manus-storage/ea-six-step-decision-checklist-freight-procurement_76c16cae.pdf';
const municipalChecklistUrl = '/manus-storage/ea-six-step-decision-checklist-municipal-supply-chain_01feff6c.pdf';
const primarySupplyChainArticles = articles.filter((article) => article.tags?.includes('Supply Chain'));
const supportingArticleSlugs = [
  'nature-loss-the-supply-chain-risk-cfos-are-not-pricing',
  'soil-health-the-hidden-supply-chain-risk',
  'water-scarcity-corporate-water-dependency',
];
const supportingArticles = supportingArticleSlugs
  .map((slug) => getArticleBySlug(slug))
  .filter((article): article is Article => Boolean(article));
const supplyChainResearch = [...primarySupplyChainArticles, ...supportingArticles.filter((article) => !primarySupplyChainArticles.some((primary) => primary.slug === article.slug))];
const featuredArticle = supplyChainResearch.find((article) => article.slug === 'how-sustainability-consultants-help-improve-your-supply-chain') ?? supplyChainResearch[0];
const furtherReading = supplyChainResearch.filter((article) => article.slug !== featuredArticle?.slug);
const contextFeature = furtherReading[0];
const supportingReading = furtherReading.slice(1);

function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1" style={{ background: '#FFFFFF', border: '1px solid rgba(201,168,76,0.22)', boxShadow: '0 7px 26px rgba(13,51,73,0.055)' }}>
      <img src={article.heroImage} alt={article.heroAlt} width="720" height="400" loading={priority ? 'eager' : 'lazy'} style={{ width: '100%', height: '184px', objectFit: 'cover', display: 'block' }} />
      <div className="flex flex-1 flex-col" style={{ padding: '1.4rem' }}>
        <div className="flex flex-wrap items-center gap-2.5" style={{ color: 'rgba(13,51,73,0.54)', fontFamily: 'var(--font-body)', fontSize: '0.7rem', marginBottom: '0.95rem' }}>
          <span style={{ background: 'rgba(201,168,76,0.14)', color: '#8A6B2E', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.25rem 0.55rem' }}>{article.author}</span>
          <span className="inline-flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
        </div>
        <h3 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.45rem', lineHeight: 1.13, margin: '0 0 0.7rem', fontWeight: 700 }}>{article.title}</h3>
        <p style={{ color: 'rgba(13,51,73,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.65, margin: '0 0 1.25rem' }}>{article.excerpt}</p>
        <Link href={`/articles/${article.slug}`} className="inline-flex items-center gap-1.5" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, textDecoration: 'none', marginTop: 'auto' }}>
          Read the research <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

export default function SupplyChain() {
  useSEO({
    title: 'Supply Chain Research & Decision Tools',
    description: 'Research and practical decision tools for finance, procurement, and operations leaders screening supplier, freight, and sourcing exposure into a defensible next action.',
    canonicalPath: '/articles/topic/supply-chain',
    ogType: 'website',
    ogImage: primarySupplyChainArticles[0]?.ogImage,
    jsonLd: [
      organizationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Supply Chain Research & Decision Tools',
        description: 'Decision-led supply-chain research and a freight and procurement worksheet for materiality, leverage, and actionable next steps.',
        url: 'https://enduringadvantage.com/articles/topic/supply-chain',
      },
    ],
  });

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2' }}>
      <Navigation />
      <header style={{ background: '#0D3349', padding: '7rem 0 4.3rem', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 84% 13%, rgba(201,168,76,0.2), transparent 26%), repeating-linear-gradient(135deg, rgba(250,247,242,0.035) 0 1px, transparent 1px 11px)' }} />
        <div className="container" style={{ maxWidth: '1120px', position: 'relative' }}>
          <BrandBreadcrumbs inverse items={[{ label: 'Home', href: '/' }, { label: 'Research & Insights', href: '/articles' }, { label: 'Supply Chain' }]} />
          <div style={{ maxWidth: '785px', marginTop: '2rem' }}>
            <div className="inline-flex items-center gap-2" style={{ border: '1px solid rgba(201,168,76,0.48)', background: 'rgba(201,168,76,0.11)', padding: '0.34rem 0.85rem', color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              <Route size={13} /> Supply Chain
            </div>
            <h1 style={{ margin: '1.3rem 0 1rem', color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.55rem, 5.15vw, 4.5rem)', lineHeight: 1.03, fontWeight: 700, letterSpacing: '-0.035em' }}>
              Better supply-chain decisions start with the working set.
            </h1>
            <p style={{ margin: 0, maxWidth: '725px', color: 'rgba(250,247,242,0.73)', fontFamily: 'var(--font-body)', fontSize: '1.08rem', lineHeight: 1.75 }}>
              Supply-chain exposure is broad. Management attention is not. These briefings and tools help finance, procurement, and operations teams isolate the suppliers, lanes, contracts, and dependencies where a commercial decision can make a difference.
            </p>
          </div>
        </div>
      </header>

      <main>
        <section style={{ padding: '4.5rem 0 3.5rem' }}>
          <div className="container" style={{ maxWidth: '1120px' }}>
            <div className="flex flex-wrap items-end justify-between gap-5" style={{ marginBottom: '2.25rem' }}>
              <div style={{ maxWidth: '720px' }}>
                <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>Start with materiality and leverage</p>
                <h2 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.4vw, 3rem)', lineHeight: 1.1, margin: 0 }}>The decision behind the supply-chain request.</h2>
              </div>
              <Link href="/articles?tag=Supply%20Chain" className="inline-flex items-center gap-1.5" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid #C9A84C', paddingBottom: '0.2rem' }}>View Supply Chain results <ArrowRight size={14} /></Link>
            </div>
            {featuredArticle && (
              <article className="grid overflow-hidden lg:grid-cols-[0.94fr_1.06fr]" style={{ background: '#FFFFFF', border: '1px solid rgba(201,168,76,0.28)', borderLeft: '4px solid #C9A84C', boxShadow: '0 10px 30px rgba(13,51,73,0.07)' }}>
                <img src={featuredArticle.heroImage} alt={featuredArticle.heroAlt} width="920" height="640" loading="eager" style={{ width: '100%', minHeight: '300px', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="flex flex-col" style={{ padding: 'clamp(1.6rem, 4vw, 3rem)' }}>
                  <div className="flex items-center gap-3" style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: '1.2rem' }}><span className="inline-flex h-8 w-8 items-center justify-center rounded-full" style={{ background: '#0D3349', color: '#F0D070', fontSize: '0.68rem' }}>01</span> Featured decision briefing</div>
                  <h3 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.4vw, 3rem)', lineHeight: 1.08, margin: '0 0 0.85rem', fontWeight: 700 }}>{featuredArticle.title}</h3>
                  <p style={{ color: 'rgba(13,51,73,0.7)', fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.72, margin: '0 0 1.35rem', maxWidth: '620px' }}>{featuredArticle.excerpt}</p>
                  <p style={{ color: 'rgba(13,51,73,0.53)', fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.5, margin: '0 0 1.4rem' }}>Start with a practical screen of supplier, lane, and category exposure before increasing the data burden on your supply base.</p>
                  <Link href={`/articles/${featuredArticle.slug}`} className="inline-flex items-center gap-1.5" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, textDecoration: 'none', marginTop: 'auto' }}>Read the featured research <ArrowRight size={15} /></Link>
                </div>
              </article>
            )}
          </div>
        </section>

        <section style={{ background: '#F0EDE6', borderTop: '1px solid rgba(201,168,76,0.2)', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '3.8rem 0' }}>
          <div className="container" style={{ maxWidth: '1120px' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Fillable companion worksheets</p>
                <h2 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.85rem, 3vw, 2.7rem)', fontWeight: 700, lineHeight: 1.1, margin: '0.55rem 0 0' }}>Structure the next procurement decision.</h2>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <article className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center" style={{ background: '#0D3349', borderLeft: '4px solid #C9A84C', padding: 'clamp(1.4rem, 3vw, 2.1rem)' }}>
                  <div>
                    <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Commercial supply chain</p>
                    <h3 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.1, margin: '0.45rem 0 0.6rem' }}>Freight &amp; Procurement Decision Checklist</h3>
                    <p style={{ color: 'rgba(250,247,242,0.71)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>Screen materiality, test commercial leverage, examine credible levers, and assign one accountable next action.</p>
                  </div>
                  <a href={freightChecklistUrl} target="_blank" rel="noreferrer" onClick={() => trackSupplyChainChecklistDownloaded('freight_procurement', 'supply_chain_hub')} className="inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: '#C9A84C', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 800, padding: '0.82rem 0.95rem', textDecoration: 'none', whiteSpace: 'nowrap' }}><Download size={15} /> Open fillable PDF</a>
                </article>
                <article className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center" style={{ background: '#FFFFFF', border: '1px solid rgba(201,168,76,0.42)', borderLeft: '4px solid #C9A84C', padding: 'clamp(1.4rem, 3vw, 2.1rem)' }}>
                  <div>
                    <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Municipal procurement</p>
                    <h3 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.1, margin: '0.45rem 0 0.6rem' }}>Municipal Supply Chain Decision Checklist</h3>
                    <p style={{ color: 'rgba(13,51,73,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>Frame service continuity, procurement constraints, supplier dependency, and the public-sector decision gate in one working document.</p>
                  </div>
                  <a href={municipalChecklistUrl} target="_blank" rel="noreferrer" onClick={() => trackSupplyChainChecklistDownloaded('municipal_supply_chain', 'supply_chain_hub')} className="inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: '#0D3349', color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 800, padding: '0.82rem 0.95rem', textDecoration: 'none', whiteSpace: 'nowrap' }}><Download size={15} /> Open fillable PDF</a>
                </article>
              </div>
              <p style={{ color: 'rgba(13,51,73,0.58)', fontFamily: 'var(--font-body)', fontSize: '0.74rem', lineHeight: 1.45, margin: '0.9rem 0 0' }}>Each one-page PDF includes fillable fields for internal use or a decision-owner conversation.</p>
            </div>
        </section>

        <section style={{ padding: '4.5rem 0 5rem' }}>
          <div className="container" style={{ maxWidth: '1120px' }}>
            <div style={{ maxWidth: '750px', marginBottom: '2.25rem' }}>
              <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>Connected research</p>
              <h2 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.4vw, 3rem)', lineHeight: 1.1, margin: 0 }}>Dependencies move through nature, water, and operating risk.</h2>
              <p style={{ color: 'rgba(13,51,73,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.98rem', lineHeight: 1.7, margin: '1rem 0 0' }}>The relevant exposure may sit outside the contract file. These articles provide context for priority-setting conversations about inputs, location, and resilience.</p>
            </div>
            {contextFeature && (
              <article className="grid overflow-hidden lg:grid-cols-[0.76fr_1.24fr]" style={{ background: '#0D3349', borderLeft: '4px solid #C9A84C', marginBottom: '1.25rem', boxShadow: '0 10px 30px rgba(13,51,73,0.08)' }}>
                <img src={contextFeature.heroImage} alt={contextFeature.heroAlt} width="760" height="450" loading="lazy" style={{ width: '100%', height: '100%', minHeight: '255px', objectFit: 'cover', display: 'block', opacity: 0.9 }} />
                <div className="flex flex-col" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.65rem)' }}>
                  <div className="inline-flex items-center gap-3" style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: '1rem' }}><span className="inline-flex h-8 w-8 items-center justify-center rounded-full" style={{ border: '1px solid rgba(201,168,76,0.65)', color: '#F0D070', fontSize: '0.68rem' }}>02</span> Context briefing</div>
                  <h3 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 3vw, 2.55rem)', fontWeight: 700, lineHeight: 1.08, margin: '0 0 0.75rem' }}>{contextFeature.title}</h3>
                  <p style={{ color: 'rgba(250,247,242,0.72)', fontFamily: 'var(--font-body)', fontSize: '0.94rem', lineHeight: 1.68, margin: '0 0 1.25rem', maxWidth: '660px' }}>{contextFeature.excerpt}</p>
                  <Link href={`/articles/${contextFeature.slug}`} className="inline-flex items-center gap-1.5" style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, textDecoration: 'none', marginTop: 'auto' }}>Read the context briefing <ArrowRight size={14} /></Link>
                </div>
              </article>
            )}
            <div className="grid gap-5 md:grid-cols-2">
              {supportingReading.map((article) => <ArticleCard key={article.slug} article={article} />)}
            </div>
          </div>
        </section>

        <section style={{ background: '#0D3349', padding: '3.8rem 0' }}>
          <div className="container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center" style={{ maxWidth: '960px' }}>
            <div>
              <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>Bring the decision, not a finished brief</p>
              <h2 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 3.3vw, 2.8rem)', lineHeight: 1.12, margin: '0 0 0.65rem' }}>Need to narrow the field before you ask suppliers for more?</h2>
              <p style={{ color: 'rgba(250,247,242,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>A practical conversation can clarify what evidence is useful now, which dependencies belong in the first working set, and what a defensible next move needs to show.</p>
            </div>
            <a href="mailto:partnerships@enduringadvantage.com?subject=Supply%20Chain%20Decision%20Question" className="inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: '#C9A84C', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, padding: '0.92rem 1.1rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>Email our team <ArrowRight size={15} /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

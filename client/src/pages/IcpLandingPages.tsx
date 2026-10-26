// ENDURING ADVANTAGE, ICP Landing Pages
// Design reminder: finance-first navy-and-gold editorial pages. No environmental-green
// visual language, no unsupported outcomes, and no imagery that distracts from the decision.

import { Link } from 'wouter';
import { ArrowRight, Check, CircleDollarSign, Download, FileCheck2, Scale, ShieldCheck } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import IcpEditorialMoment from '@/components/IcpEditorialMoment';
import BrandBreadcrumbs from '@/components/BrandBreadcrumbs';
import RelatedArticles from '@/components/RelatedArticles';
import MobileConsultationBar from '@/components/MobileConsultationBar';
import SectorMeetingChecklist from '@/components/SectorMeetingChecklist';
import { useSEO, buildFAQSchema } from '@/hooks/useSEO';
import { icpPages, type IcpPageContent } from '@/lib/icpPageData';
import { getArticleBySlug, type Article } from '@/lib/articlesData';
import { trackSupplyChainChecklistDownloaded } from '@/lib/analytics';

const contactEmail = 'partnerships@enduringadvantage.com';
const BOOKING_URL = 'https://calendar.app.google/ozpmtufXwN4uhE2r6';

const sectorDecisionMakers: Record<IcpPageContent['key'], { title: string; body: string }> = {
  cfo: { title: 'The CFO usually hires us.', body: 'Operations, facilities, procurement and sustainability leaders weigh in on the recommendations that affect them.' },
  municipalities: { title: 'The CAO or treasurer usually brings us in. Council decides.', body: 'Finance, public works and facilities staff shape each recommendation.' },
  firstNations: { title: 'Chief and council decide.', body: 'Administration, housing, public works and economic development staff shape each recommendation, on the Nation’s terms.' },
  agriculture: { title: 'The owner or farm manager decides, often with their accountant or lender at the table.', body: '' },
  realEstate: { title: 'The CFO or head of asset management usually hires us.', body: 'Asset managers, property managers and leasing teams shape each recommendation.' },
  buildings: { title: 'The owner usually decides.', body: 'Operators, property managers, advisors and lenders shape each recommendation, and the partner who holds the relationship can lead.' },
  industrial: { title: 'The CFO or plant leadership usually hires us.', body: 'Operations, maintenance, engineering and procurement shape each recommendation.' },
  transportation: { title: 'The CFO or head of fleet usually hires us.', body: 'Operations, maintenance, real estate and procurement shape each recommendation.' },
};

const heroImages: Record<IcpPageContent['key'], string> = {
  cfo: '/manus-storage/icp-hero-cfo_454b0d8b.jpg',
  municipalities: '/manus-storage/icp-hero-municipal-v2_06893690.jpg',
  firstNations: '/manus-storage/icp-hero-first-nations-v2_6119d81c.jpg',
  agriculture: '/manus-storage/icp-hero-agriculture-v2_293d0259.jpg',
  realEstate: '/manus-storage/icp-hero-real-estate-v2_3b4ac9e1.jpg',
  buildings: '/manus-storage/buildings-service-hero_1372a0f0.jpg',
  industrial: '/manus-storage/industrial-sector-hero_0ae48206.jpg',
  transportation: '/manus-storage/transportation-sector-hero_698fdd95.jpg',
};

function SectionHeading({ kicker, title, intro, light = false }: { kicker: string; title: string; intro?: string; light?: boolean }) {
  const headingColour = light ? '#FAF7F2' : '#0D3349';
  const bodyColour = light ? 'rgba(250,247,242,0.72)' : 'rgba(13,51,73,0.68)';
  return (
    <div style={{ maxWidth: '780px', marginBottom: '2.5rem' }}>
      <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.7rem' }}>
        {kicker}
      </p>
      <h2 style={{ color: headingColour, fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.12, margin: 0 }}>
        {title}
      </h2>
      {intro && <p style={{ color: bodyColour, fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7, marginTop: '1rem', marginBottom: 0 }}>{intro}</p>}
    </div>
  );
}

function IcpLandingPage({ page }: { page: IcpPageContent }) {
  const heroImage = heroImages[page.key];
  const heroCopy = { title: page.heroTitle, body: page.heroBody };
  const relatedArticles = page.relatedArticleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => Boolean(article));
  useSEO({
    title: page.seoTitle,
    description: page.seoDescription,
    canonicalPath: page.route,
    ogImage: `https://enduringadvantage.com${heroImage}`,
    jsonLd: buildFAQSchema(page.questions),
  });

  return (
    <div style={{ background: '#FAF7F2', color: '#0D3349' }}>
      <Navigation />
      <main className="pb-20 md:pb-0">
        <section style={{ padding: 'clamp(7.5rem, 12vw, 10rem) 0 clamp(4.5rem, 8vw, 7rem)', backgroundColor: '#FAF7F2', backgroundImage: 'radial-gradient(circle at 90% 16%, rgba(201,168,76,0.15), transparent 26%), repeating-linear-gradient(135deg, rgba(13,51,73,0.035) 0 1px, transparent 1px 9px)' }}>
          <div className="container">
            <div style={{ marginBottom: '1.75rem' }}>
              <BrandBreadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Who We Help', href: '/#who-we-help' }, { label: page.navLabel }]} />
            </div>
            <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-10 lg:gap-16 items-start">
              <div style={{ maxWidth: '760px' }}>
                <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.73rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.15rem' }}>
                  {page.audience}
                </p>
                <h1 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 5.2vw, 5rem)', fontWeight: 600, lineHeight: 1.04, letterSpacing: '-0.045em', margin: 0 }}>
                  {heroCopy.title}
                </h1>
                <p style={{ color: 'rgba(13,51,73,0.7)', fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)', lineHeight: 1.7, maxWidth: '660px', marginTop: '1.5rem', marginBottom: '1.7rem' }}>
                  {heroCopy.body}
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #a8882e 100%)', color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.94rem', fontWeight: 700, letterSpacing: '0.02em', padding: '0.9rem 1.15rem', textDecoration: 'none' }}
                >
                  {page.ctaLabel} <ArrowRight size={17} strokeWidth={2.25} />
                </a>
                <p style={{ color: 'rgba(13,51,73,0.55)', fontFamily: 'var(--font-body)', fontSize: '0.81rem', marginTop: '0.75rem', marginBottom: 0 }}>{page.ctaNote}</p>
              </div>

              <figure className="relative overflow-hidden" style={{ minHeight: 'clamp(420px, 48vw, 580px)', margin: '0.5rem 0 0', border: '1px solid rgba(201,168,76,0.4)', boxShadow: '0 20px 48px rgba(13,51,73,0.18)', background: '#0D3349' }}>
                <img src={heroImage} alt={`${page.navLabel} decision context`} className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'saturate(0.82) contrast(1.05)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(13,51,73,0.04) 0%, rgba(13,51,73,0.2) 34%, rgba(13,51,73,0.96) 100%)' }} />
                <figcaption className="absolute left-0 right-0 bottom-0" style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', background: 'linear-gradient(180deg, transparent 0%, rgba(13,51,73,0.92) 24%)' }}>
                  <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.55rem' }}>{page.deviceTitle}</p>
                  <p style={{ color: 'rgba(250,247,242,0.76)', fontFamily: 'var(--font-body)', fontSize: '0.84rem', lineHeight: 1.5, marginTop: 0, marginBottom: '0.9rem' }}>{page.deviceNote}</p>
                  <div style={{ borderTop: '1px solid rgba(250,247,242,0.18)' }}>
                    {page.deviceRows.map((row) => (
                      <div key={row.label} className="grid grid-cols-[1fr_auto] gap-3 items-center" style={{ borderBottom: '1px solid rgba(250,247,242,0.16)', padding: '0.56rem 0', background: row.emphasis ? 'rgba(201,168,76,0.15)' : 'transparent' }}>
                        <span style={{ color: row.emphasis ? '#F0D070' : '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.76rem', fontWeight: row.emphasis ? 700 : 500, lineHeight: 1.3, paddingLeft: row.emphasis ? '0.45rem' : 0 }}>{row.label}</span>
                        <span style={{ color: row.emphasis ? '#F0D070' : 'rgba(250,247,242,0.66)', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'right', paddingRight: row.emphasis ? '0.45rem' : 0 }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section style={{ background: '#FFFFFF', padding: 'clamp(3.5rem, 6vw, 5.25rem) 0' }}>
          <div className="container">
            <SectionHeading kicker="Who decides" title={sectorDecisionMakers[page.key].title} intro={sectorDecisionMakers[page.key].body} />
          </div>
        </section>

        <section style={{ background: '#FAF7F2', padding: 'clamp(3.5rem, 6vw, 5.25rem) 0' }}>
          <div className="container">
            <SectionHeading kicker="What the first engagement looks like" title="Four steps. One sequence." intro={page.howItStartsBody} />
            <div className="grid md:grid-cols-3 gap-5">
              {page.steps.map((step) => (
                <article key={step.number} style={{ border: '1px solid rgba(13,51,73,0.13)', padding: '1.5rem', background: '#FFFFFF' }}>
                  <span style={{ color: '#C9A84C', fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600 }}>{step.number}</span>
                  <h3 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, margin: '0.55rem 0 0' }}>{step.title}</h3>
                  <p style={{ color: 'rgba(13,51,73,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.91rem', lineHeight: 1.6, margin: '0.65rem 0 0' }}>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#FFFFFF', padding: 'clamp(3.5rem, 6vw, 5.25rem) 0' }}>
          <div className="container">
            <SectionHeading kicker={page.trustKicker} title={page.trustTitle} intro={page.trustIntro} />
            <div className="grid md:grid-cols-3 gap-5">
              {page.trustExamples.map((example) => (
                <article key={example.title} className="transition-all duration-200 hover:-translate-y-1" style={{ background: '#FAF7F2', border: '1px solid rgba(13,51,73,0.13)', borderTop: '3px solid #C9A84C', padding: '1.55rem', minHeight: '100%' }}>
                  <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', marginTop: 0, marginBottom: '0.7rem' }}>{example.context}</p>
                  <h3 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 600, lineHeight: 1.16, margin: 0 }}>{example.title}</h3>
                  <p style={{ color: 'rgba(13,51,73,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.93rem', lineHeight: 1.65, marginTop: '0.75rem', marginBottom: 0 }}>{example.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#FFFFFF', padding: 'clamp(4.5rem, 8vw, 7rem) 0' }}>
          <div className="container">
            <SectionHeading kicker="What is already changing" title={page.polycrisisTitle} intro={page.polycrisisIntro} />
            {page.key === 'cfo' && <div className="grid md:grid-cols-3 gap-5">{page.pressures.map((pressure) => (
              <article key={pressure.title} className="transition-all duration-200 hover:-translate-y-1" style={{ background: '#FAF7F2', border: '1px solid rgba(13,51,73,0.12)', borderTop: '4px solid #C9A84C', padding: '1.6rem', minHeight: '100%' }}>
                <h3 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.45rem', margin: 0 }}>{pressure.title}</h3>
                <p style={{ color: 'rgba(13,51,73,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.93rem', lineHeight: 1.65, marginTop: '0.75rem', marginBottom: 0 }}>{pressure.body}</p>
              </article>
            ))}</div>}
            <div style={{ borderLeft: '3px solid #C9A84C', padding: '1rem 1.15rem', marginTop: '1.5rem', background: 'rgba(201,168,76,0.08)', maxWidth: '980px' }}>
              <p style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>{page.compoundingNote}</p>
            </div>
          </div>
        </section>

        <section style={{ background: '#FAF7F2', padding: 'clamp(4.5rem, 8vw, 7rem) 0' }}>
          <div className="container">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
              <SectionHeading kicker={page.decisionKicker} title={page.decisionTitle} />
              <div style={{ paddingTop: '0.25rem' }}>
                {page.decisionBody.map((paragraph, index) => (
                  <p key={index} style={{ color: 'rgba(13,51,73,0.72)', fontFamily: 'var(--font-body)', fontSize: '1.04rem', lineHeight: 1.78, marginTop: index === 0 ? 0 : '1.25rem', marginBottom: 0 }}>{paragraph}</p>
                ))}
                <div style={{ borderTop: '1px solid rgba(13,51,73,0.15)', marginTop: '1.75rem', paddingTop: '1.4rem', display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <Scale size={21} strokeWidth={1.8} style={{ color: '#C9A84C', flexShrink: 0, marginTop: '0.15rem' }} />
                  <p style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.45, margin: 0 }}>We do not profit from which solution wins. That is how the recommendation can stay independent.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <IcpEditorialMoment page={page} />

        <section style={{ background: '#0D3349', padding: 'clamp(4.5rem, 8vw, 7rem) 0' }}>
          <div className="container">
            <SectionHeading kicker="Decision criteria" title={page.realityTitle} intro={page.realityIntro} light />
            <div className="grid md:grid-cols-3 gap-5">
              {page.realityItems.map((item, index) => (
                <article key={item.title} className="transition-all duration-200 hover:-translate-y-1" style={{ border: '1px solid rgba(201,168,76,0.3)', background: 'rgba(250,247,242,0.04)', padding: '1.6rem' }}>
                  <p style={{ color: '#C9A84C', fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, margin: 0 }}>0{index + 1}</p>
                  <h3 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 600, lineHeight: 1.2, marginTop: '0.85rem', marginBottom: 0 }}>{item.title}</h3>
                  <p style={{ color: 'rgba(250,247,242,0.66)', fontFamily: 'var(--font-body)', fontSize: '0.91rem', lineHeight: 1.65, marginTop: '0.75rem', marginBottom: 0 }}>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#FAF7F2', padding: 'clamp(4.5rem, 8vw, 7rem) 0' }}>
          <div className="container">
            <SectionHeading kicker="Questions worth asking" title={page.questionsTitle} />
            <div style={{ maxWidth: '960px', borderTop: '1px solid rgba(13,51,73,0.15)' }}>
              {page.questions.map((item) => (
                <article key={item.question} style={{ borderBottom: '1px solid rgba(13,51,73,0.15)', padding: '1.35rem 0' }}>
                  <div className="flex items-start gap-3">
                    <FileCheck2 size={19} strokeWidth={1.8} style={{ color: '#C9A84C', marginTop: '0.2rem', flexShrink: 0 }} />
                    <div>
                      <h3 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.35, margin: 0 }}>“{item.question}”</h3>
                      <p style={{ color: 'rgba(13,51,73,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.65, marginTop: '0.55rem', marginBottom: 0 }}>{item.answer}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {(page.key === 'industrial' || page.key === 'transportation') && <SectorMeetingChecklist sector={page.key} />}

        <RelatedArticles
          articles={relatedArticles}
          kicker={`${page.navLabel} research`}
          title="The research behind the decision."
          archiveHref={`/articles?sector=${page.route.slice(1)}`}
          archiveLabel={`Explore ${page.navLabel} research`}
        />

        {page.resourceCard && (
          <section style={{ background: '#F0EDE6', padding: 'clamp(3.5rem, 6vw, 5rem) 0', borderTop: '1px solid rgba(201,168,76,0.18)' }}>
            <div className="container" style={{ maxWidth: '1040px' }}>
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center" style={{ background: '#0D3349', borderLeft: '4px solid #C9A84C', padding: 'clamp(1.6rem, 4vw, 2.6rem)' }}>
                <div style={{ maxWidth: '700px' }}>
                  <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>{page.resourceCard.kicker}</p>
                  <h2 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(1.75rem, 3vw, 2.55rem)', lineHeight: 1.1, margin: '0 0 0.7rem' }}>{page.resourceCard.title}</h2>
                  <p style={{ color: 'rgba(250,247,242,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>{page.resourceCard.body}</p>
                </div>
                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <a href={page.resourceCard.href} target="_blank" rel="noreferrer" onClick={() => { if (page.key === 'cfo') trackSupplyChainChecklistDownloaded('freight_procurement', 'cfo'); }} className="inline-flex items-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: '#C9A84C', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, padding: '0.9rem 1.05rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>{page.resourceCard.linkLabel} <Download size={15} /></a>
                  {page.resourceCard.secondaryHref && page.resourceCard.secondaryLabel && <Link href={page.resourceCard.secondaryHref} className="inline-flex items-center gap-1.5" style={{ color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid #C9A84C', paddingBottom: '0.2rem' }}>{page.resourceCard.secondaryLabel} <ArrowRight size={14} /></Link>}
                </div>
              </div>
            </div>
          </section>
        )}

        <section style={{ background: '#E9F0F2', padding: 'clamp(3.5rem, 6vw, 5rem) 0' }}>
          <div className="container">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center" style={{ border: '1px solid rgba(13,51,73,0.14)', padding: 'clamp(1.75rem, 4vw, 3rem)', background: '#F7FBFC' }}>
              <div style={{ maxWidth: '780px' }}>
                <div className="flex items-center gap-2" style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.8rem' }}><ShieldCheck size={16} /> Start here</div>
                <h2 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)', lineHeight: 1.12, letterSpacing: '-0.03em', margin: 0 }}>{page.closeTitle}</h2>
                <p style={{ color: 'rgba(13,51,73,0.68)', fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, marginTop: '0.85rem', marginBottom: 0 }}>{page.closeBody}</p>
              </div>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: '#0D3349', color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.92rem', fontWeight: 700, padding: '0.95rem 1.15rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                {page.closeCtaLabel} <ArrowRight size={17} />
              </a>
            </div>
            {page.sourceNote && <p style={{ color: 'rgba(13,51,73,0.52)', fontFamily: 'var(--font-body)', fontSize: '0.76rem', lineHeight: 1.55, marginTop: '1rem', marginBottom: 0 }}>{page.sourceNote}</p>}
          </div>
        </section>

        <section style={{ background: '#FFFFFF', padding: '1.35rem 0', borderTop: '1px solid rgba(13,51,73,0.08)' }}>
          <div className="container flex flex-wrap items-center gap-x-4 gap-y-2">
            <span style={{ color: 'rgba(13,51,73,0.55)', fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>Looking for the wider method?</span>
            <Link href="/services" className="inline-flex items-center gap-1.5" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 700, textDecoration: 'none' }}>See the six-step process <ArrowRight size={15} /></Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileConsultationBar context={page.navLabel} />
    </div>
  );
}

export const CfoPage = () => <IcpLandingPage page={icpPages.cfo} />;
export const MunicipalitiesPage = () => <IcpLandingPage page={icpPages.municipalities} />;
export const FirstNationsPage = () => <IcpLandingPage page={icpPages.firstNations} />;
export const AgriculturePage = () => <IcpLandingPage page={icpPages.agriculture} />;
export const RealEstatePage = () => <IcpLandingPage page={icpPages.realEstate} />;
export const BuildingsPage = () => <IcpLandingPage page={icpPages.buildings} />;
export const IndustrialPage = () => <IcpLandingPage page={icpPages.industrial} />;
export const TransportationPage = () => <IcpLandingPage page={icpPages.transportation} />;

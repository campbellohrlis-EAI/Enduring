// ENDURING ADVANTAGE, Checklist Thank You Page
// Design reminder: navy-and-gold decision guidance, no client-outcome claims.

import { Link, useSearch } from 'wouter';
import { ArrowRight, CheckCircle2, Download, Mail, Printer } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BrandBreadcrumbs from '@/components/BrandBreadcrumbs';
import { useSEO } from '@/hooks/useSEO';
import { CHECKLIST_PDF_VARIANTS, type ChecklistSector } from '@/lib/checklistData';
import { trackChecklistPdfDownloaded } from '@/lib/analytics';

function getSector(search: string): ChecklistSector {
  const requested = new URLSearchParams(search).get('sector');
  return requested && requested in CHECKLIST_PDF_VARIANTS ? requested as ChecklistSector : 'cfo';
}

export default function ChecklistThankYou() {
  const search = useSearch();
  const sector = getSector(search);
  const selected = CHECKLIST_PDF_VARIANTS[sector];

  useSEO({
    title: 'Your Six-Step Decision Checklist',
    description: 'Download your sector-specific six-step decision checklist from Enduring Advantage.',
    canonicalPath: '/checklist/thank-you',
    noIndex: true,
  });

  return (
    <div style={{ background: '#FAF7F2', color: '#0D3349', minHeight: '100vh' }}>
      <Navigation />
      <main>
        <section style={{ background: '#0D3349', padding: 'clamp(7.5rem, 12vw, 10rem) 0 clamp(4.5rem, 8vw, 6rem)' }}>
          <div className="container" style={{ maxWidth: '980px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <BrandBreadcrumbs inverse items={[{ label: 'Home', href: '/' }, { label: 'Research & Insights', href: '/articles' }, { label: 'Checklist ready' }]} />
            </div>
            <div className="grid gap-9 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2" style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase' }}><CheckCircle2 size={17} /> Checklist request received</div>
                <h1 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.65rem, 5vw, 4.7rem)', fontWeight: 600, letterSpacing: '-0.045em', lineHeight: 1.04, margin: '1rem 0 1.2rem' }}>Your decision worksheet is ready.</h1>
                <p style={{ color: 'rgba(250,247,242,0.72)', fontFamily: 'var(--font-body)', fontSize: '1.08rem', lineHeight: 1.72, margin: 0, maxWidth: '650px' }}>You selected the <strong style={{ color: '#F0D070' }}>{selected.label}</strong> version. It is a fillable, print-ready worksheet designed to help move one decision from a broad field of possibilities to an accountable next action.</p>
              </div>
              <div style={{ background: '#FAF7F2', border: '1px solid rgba(201,168,76,0.7)', padding: '1.4rem' }}>
                <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.12em', margin: 0, textTransform: 'uppercase' }}>Fillable PDF</p>
                <h2 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.18, margin: '0.45rem 0 0.65rem' }}>{selected.label}</h2>
                <p style={{ color: '#4A5E60', fontFamily: 'var(--font-body)', fontSize: '0.86rem', lineHeight: 1.58, margin: '0 0 1rem' }}>{selected.detail}</p>
                <a href={selected.file} target="_blank" rel="noreferrer" onClick={() => trackChecklistPdfDownloaded(sector, 'download')} className="inline-flex w-full items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: '#C9A84C', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: 800, padding: '0.84rem 1rem', textDecoration: 'none' }}><Download size={16} /> Open fillable PDF</a>
                <a href={selected.file} target="_blank" rel="noreferrer" onClick={() => trackChecklistPdfDownloaded(sector, 'print')} className="inline-flex w-full items-center justify-center gap-2" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, marginTop: '0.8rem', textDecoration: 'none' }}><Printer size={14} /> Open print-ready PDF</a>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(4rem, 7vw, 6.5rem) 0' }}>
          <div className="container" style={{ maxWidth: '980px' }}>
            <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', margin: '0 0 0.75rem', textTransform: 'uppercase' }}>Keep the decision moving</p>
            <h2 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.8vw, 3.1rem)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.12, margin: 0, maxWidth: '720px' }}>Use the worksheet. Then go deeper where the decision needs it.</h2>
            <div className="grid gap-5 md:grid-cols-2" style={{ marginTop: '2.2rem' }}>
              <Link href={selected.route} className="group transition-all duration-200 hover:-translate-y-1" style={{ background: '#FFFFFF', border: '1px solid rgba(13,51,73,0.14)', borderTop: '3px solid #C9A84C', padding: '1.6rem', textDecoration: 'none' }}>
                <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', margin: 0, textTransform: 'uppercase' }}>Decision context</p>
                <h3 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.18, margin: '0.55rem 0' }}>{selected.audienceLabel}</h3>
                <p style={{ color: 'rgba(13,51,73,0.66)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>See the decision criteria, questions, and representative situations specific to your context.</p>
                <span className="inline-flex items-center gap-2" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, marginTop: '1.05rem' }}>Continue reading <ArrowRight size={15} /></span>
              </Link>
              <Link href={selected.nextArticle} className="group transition-all duration-200 hover:-translate-y-1" style={{ background: '#0D3349', border: '1px solid rgba(201,168,76,0.45)', padding: '1.6rem', textDecoration: 'none' }}>
                <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', margin: 0, textTransform: 'uppercase' }}>Next reading</p>
                <h3 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.18, margin: '0.55rem 0' }}>{selected.nextArticleLabel}</h3>
                <p style={{ color: 'rgba(250,247,242,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>Continue through the decision-guidance series before turning the worksheet into a funded action.</p>
                <span className="inline-flex items-center gap-2" style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, marginTop: '1.05rem' }}>Read the guide <ArrowRight size={15} /></span>
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center" style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.35)', marginTop: '2.5rem', padding: '1.35rem 1.5rem' }}>
              <div>
                <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', margin: 0, textTransform: 'uppercase' }}>Need to talk it through?</p>
                <p style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, lineHeight: 1.3, margin: '0.35rem 0 0' }}>Email our team with the decision you are trying to make.</p>
              </div>
              <a href="mailto:partnerships@enduringadvantage.com?subject=Decision%20checklist%20follow-up" className="inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: '#0D3349', color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, padding: '0.82rem 1rem', textDecoration: 'none', whiteSpace: 'nowrap' }}><Mail size={16} /> Email our team</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// ENDURING ADVANTAGE, Hiring & Advisory Topic Page
// Navy-and-gold editorial reference page for decision-makers evaluating advisory support.

import { Link } from 'wouter';
import { ArrowRight, Clock, Calendar, BriefcaseBusiness } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BrandBreadcrumbs from '@/components/BrandBreadcrumbs';
import { useSEO, organizationSchema } from '@/hooks/useSEO';
import { articles } from '@/lib/articlesData';

const hiringArticles = articles.filter((article) => article.tags?.includes('Hiring & Advisory'));

export default function HiringAdvisory() {
  useSEO({
    title: 'Hiring & Advisory Guides',
    description: 'Practical guidance for finance and operations leaders evaluating sustainability advisory support: what to ask, when to seek help, how to hire, and how to structure a first engagement.',
    canonicalPath: '/articles/topic/hiring-advisory',
    ogType: 'website',
    ogImage: hiringArticles[0]?.ogImage,
    jsonLd: [
      organizationSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Hiring & Advisory Guides',
        description: 'Guidance for organizations assessing sustainability advisors and structuring decisions that lead to action.',
        url: 'https://enduringadvantage.com/articles/topic/hiring-advisory',
      },
    ],
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream)' }}>
      <Navigation />
      <header style={{ background: 'var(--color-slate-deep)', padding: '7rem 0 4.25rem' }}>
        <div className="container" style={{ maxWidth: '1120px' }}>
          <BrandBreadcrumbs inverse items={[{ label: 'Home', href: '/' }, { label: 'Research & Insights', href: '/articles' }, { label: 'Hiring & Advisory' }]} />
          <div style={{ maxWidth: '760px', marginTop: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', border: '1px solid rgba(201,168,76,0.45)', background: 'rgba(201,168,76,0.12)', borderRadius: '100px', padding: '0.32rem 0.85rem', color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              <BriefcaseBusiness size={13} /> Hiring & Advisory
            </div>
            <h1 style={{ margin: '1.3rem 0 1rem', color: 'var(--color-cream)', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.35rem)', lineHeight: 1.03, fontWeight: 700 }}>
              Better questions before you buy advice.
            </h1>
            <p style={{ margin: 0, maxWidth: '680px', color: 'rgba(250,247,242,0.72)', fontFamily: 'var(--font-body)', fontSize: '1.08rem', lineHeight: 1.75 }}>
              A practical reading list for CFOs, operators, partners, and leadership teams deciding what help they need, what to ask for, and how to keep an advisory engagement accountable to a real next decision.
            </p>
          </div>
        </div>
      </header>

      <main>
        <section style={{ padding: '4.5rem 0 5rem' }}>
          <div className="container" style={{ maxWidth: '1120px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
              <div>
                <p style={{ color: '#a8882e', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>A decision-led reading path</p>
                <h2 style={{ color: 'var(--color-slate-deep)', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.4vw, 3rem)', lineHeight: 1.1, margin: 0 }}>Start with the question in front of you.</h2>
              </div>
              <Link href="/questions" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-slate-deep)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid #C9A84C', paddingBottom: '0.2rem' }}>See the full FAQ <ArrowRight size={14} /></Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))', gap: '1.25rem' }}>
              {hiringArticles.map((article, index) => (
                <article key={article.slug} style={{ background: '#fff', border: '1px solid rgba(201,168,76,0.18)', boxShadow: '0 6px 28px rgba(13,51,73,0.06)', display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                  <img src={article.heroImage} alt={article.heroAlt} width="720" height="400" loading={index < 2 ? 'eager' : 'lazy'} style={{ width: '100%', height: '178px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', color: 'rgba(13,51,73,0.52)', fontFamily: 'var(--font-body)', fontSize: '0.72rem', marginBottom: '0.95rem' }}>
                      <span style={{ background: 'rgba(201,168,76,0.14)', color: '#8A6B2E', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.25rem 0.55rem' }}>{article.author}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.22rem' }}><Clock size={12} /> {article.readTime}</span>
                    </div>
                    <h3 style={{ color: 'var(--color-slate-deep)', fontFamily: 'var(--font-display)', fontSize: '1.45rem', lineHeight: 1.12, margin: '0 0 0.75rem', fontWeight: 700 }}>{article.title}</h3>
                    <p style={{ color: 'rgba(13,51,73,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.65, margin: '0 0 1.25rem' }}>{article.excerpt}</p>
                    <div style={{ marginTop: 'auto' }}>
                      <Link href={`/articles/${article.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, textDecoration: 'none' }}>Read the guide <ArrowRight size={14} /></Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: '#F0EDE6', borderTop: '1px solid rgba(201,168,76,0.18)', padding: '3.75rem 0' }}>
          <div className="container" style={{ maxWidth: '900px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: '2rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#a8882e', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>Still weighing the choice?</p>
              <h2 style={{ color: 'var(--color-slate-deep)', fontFamily: 'var(--font-display)', fontSize: '2rem', lineHeight: 1.12, margin: '0 0 0.6rem' }}>Bring the decision, not a finished brief.</h2>
              <p style={{ color: 'rgba(13,51,73,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.94rem', lineHeight: 1.65, margin: 0 }}>A conversation can clarify what information is already useful, which options are actually comparable, and what a credible first phase should produce.</p>
            </div>
            <a href="mailto:partnerships@enduringadvantage.com?subject=Hiring%20%26%20Advisory%20Question" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.45rem', background: '#C9A84C', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, padding: '0.9rem 1.1rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>Email our team <ArrowRight size={14} /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

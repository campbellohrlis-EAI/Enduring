// ENDURING ADVANTAGE, actio Platform Page
// Navy, cream, and gold financial editorial system for the standalone decision-platform route.
// This page owns the actio detail that no longer belongs in the concise Home triage argument.

import { useSEO } from '@/hooks/useSEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ActioExplainer from '@/components/ActioExplainer';

const BOOKING_URL = 'https://calendar.app.google/ozpmtufXwN4uhE2r6';

export default function Actio() {
  useSEO({
    title: 'actio | The Decision Platform for Your Next Best Sustainability Action',
    description: 'actio brings operational, market, and jurisdictional context together to reduce decision overload, screen what is not material, and identify the highest-return next action that also has a positive environmental impact.',
    canonicalPath: '/actio',
    ogType: 'website',
  });

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh' }}>
      <Navigation />
      <main>
        <section style={{ background: 'linear-gradient(135deg, #0D3349 0%, #123F59 64%, #0D3349 100%)', padding: 'clamp(7rem, 14vw, 11rem) 0 clamp(4rem, 8vw, 7rem)' }}>
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(290px,0.7fr)] lg:items-end">
              <div>
                <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 1rem' }}>The <span style={{ textTransform: 'lowercase' }}>actio</span> decision platform</p>
                <h1 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 6vw, 5.2rem)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.02, margin: 0 }}>Thousands of options.<br /><em style={{ color: '#F0D070' }}>One clear next action.</em></h1>
                <p style={{ color: 'rgba(250,247,242,0.76)', fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.75, margin: '1.5rem 0 0', maxWidth: '760px' }}>You have thousands of candidate projects, whether anyone inside your organization has heard of them or not. actio starts with your data, not a vendor&apos;s proposed project. That data identifies the business problem worth solving, then actio searches the whole field for the option that pays best. It is the decision platform Enduring Advantage licenses from Catalys. Enduring Advantage does not own actio. actio is developed by Catalys, which owns it. Rob Kirkby is majority owner of Catalys and of Energy Advantage, so this is a related party arrangement and we say so up front. actio screens the field through two gates: a positive environmental impact across the entire Sustainability Playing Field and a minimum financial materiality standard. It does not choose a vendor or approve the spend. It identifies the highest return action that deserves deeper human review.</p>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', marginTop: '2rem', background: '#C9A84C', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 800, padding: '0.95rem 1.25rem', textDecoration: 'none' }}>Find your Next Best Thing →</a>
              </div>
              <aside style={{ background: '#0D3349', border: '1px solid rgba(201,168,76,0.58)', borderTop: '3px solid #C9A84C', padding: '1.25rem' }}>
                <div className="flex items-start justify-between gap-4" style={{ borderBottom: '1px solid rgba(250,247,242,0.17)', paddingBottom: '0.95rem' }}><div><p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0 }}>DECISION SUMMARY</p><p style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.35rem', lineHeight: 1.1, margin: '0.45rem 0 0' }}>Available data to one clear next move.</p></div><span style={{ border: '1px solid #C9A84C', borderRadius: '50%', color: '#F0D070', display: 'grid', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, height: '42px', letterSpacing: '0.06em', placeItems: 'center', width: '42px' }}>01</span></div>
                <div style={{ display: 'grid', gap: '0.65rem', marginTop: '1rem' }}>{[['INPUT', 'Available operating data'], ['SCREEN', 'Financial return + positive environmental impact'], ['ROUTE', 'One next action for human review']].map(([label, value]) => <div key={label} className="flex items-baseline justify-between gap-3" style={{ fontFamily: 'var(--font-body)' }}><span style={{ color: '#F0D070', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em' }}>{label}</span><span style={{ color: 'rgba(250,247,242,0.72)', fontSize: '0.82rem', textAlign: 'right' }}>{value}</span></div>)}</div>
                <img src="/manus-storage/research-facility-maintenance_47536fef.jpg" alt="Operational facility maintenance context used to ground a decision review" loading="lazy" style={{ display: 'block', height: '110px', marginTop: '1rem', objectFit: 'cover', width: '100%' }} />
              </aside>
            </div>
          </div>
        </section>

        <section style={{ background: '#FFFDF5', padding: 'clamp(3.5rem, 7vw, 6rem) 0' }}>
          <div className="container">
            <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
              <article style={{ borderTop: '3px solid #C9A84C', background: '#0D3349', padding: 'clamp(1.5rem, 3vw, 2.4rem)' }}>
                <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.14em', margin: '0 0 0.7rem' }}>What happens after actio answers</p>
                <p style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)', lineHeight: 1.45, margin: 0 }}>Generative AI turns that answer into a detailed draft plan quickly. Coaches and subject matter experts apply the human sanity test, confirm it works in the real world, and add the local context an AI can miss.</p>
              </article>
            </div>
          </div>
        </section>

        <section style={{ background: '#0D3349', padding: 'clamp(3.5rem, 7vw, 6rem) 0' }}>
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start" style={{ maxWidth: '1080px', margin: '0 auto' }}>
              <div style={{ borderTop: '3px solid #C9A84C', paddingTop: '1rem' }}>
                <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.14em', margin: 0, textTransform: 'uppercase' }}>Why the whole field matters</p>
                <h2 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 3.5vw, 3.2rem)', lineHeight: 1.08, margin: '0.65rem 0 0' }}>A local maximum is not enough.</h2>
              </div>
              <div style={{ color: 'rgba(250,247,242,0.74)', fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.75 }}>
                <p style={{ marginTop: 0 }}>The broader the field you search, the more likely you are to find the true best answer, not just the best of a short list. We do not begin by evaluating the projects a vendor suggests. Your data sets the question, then the field is searched for the answer. Narrow the field at the start and you give up your biggest opportunity.</p>
                <p><strong>actio</strong>, developed and owned by Catalys, screens what is not material, then surfaces the standouts for fuller analysis by the Coach and subject matter experts. Financial return is the ranking criterion, measured the way your organization measures it, whether that&apos;s payback, ROI, NPV or another criterion. Your framework, not ours.</p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ background: '#FAF7F2', padding: 'clamp(3.5rem, 7vw, 6rem) 0', borderTop: '1px solid rgba(201,168,76,0.18)' }}>
          <div className="container">
            <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
              <p style={{ color: '#A9832C', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>Three databases</p>
              <h2 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.12, margin: '0 0 2rem' }}>The right decision needs three views of the field.</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['01', 'Customer database', 'A database built around your specific data to help pinpoint the biggest opportunity. It starts with what you have, and Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data.'],
                  ['02', 'Supplier database', 'Sustainability products, services, software and the providers who supply them. Once your data identifies the opportunity, it helps identify the service that best addresses it.'],
                  ['03', 'Jurisdictional database', 'Climate, incentives, policy, prices and regulation that change by location. It helps decide where a solution performs best, so it gets done there first.'],
                ].map(([number, title, copy]) => (
                  <article key={number} style={{ background: '#FFFDF5', border: '1px solid rgba(13,51,73,0.1)', padding: '1.35rem' }}>
                    <p style={{ color: '#C9A84C', fontFamily: 'var(--font-display)', fontSize: '1.65rem', fontWeight: 800, margin: 0 }}>{number}</p>
                    <h3 style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: '0.7rem 0 0.5rem' }}>{title}</h3>
                    <p style={{ color: '#53656A', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{copy}</p>
                  </article>
                ))}
              </div>
              <p style={{ color: '#53656A', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.65, margin: '1.5rem 0 0', maxWidth: '860px' }}>Your data stays yours, and it leads the process. The advantage comes from your operating data and the way actio brings customer, supplier and jurisdictional data together. Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data. Supplier proposals are inputs to test after the opportunity is identified, not the list that determines it. Then the human team applies the sanity test, runs a vendor-neutral selection and quarterbacks delivery.</p>
              <p style={{ color: '#53656A', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.65, margin: '1.5rem 0 0', maxWidth: '860px' }}>What changes for you. The question in the room stops being which vendor and becomes which project, and you can show why.</p>
            </div>
          </div>
        </section>

        <ActioExplainer onBookCall={() => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')} />
      </main>
      <Footer />
    </div>
  );
}

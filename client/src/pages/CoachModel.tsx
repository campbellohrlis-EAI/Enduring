// =============================================================================
// ENDURING ADVANTAGE, Coach Model Page
// Sage Editorial Design: Warm sustainability journalism aesthetic
// =============================================================================

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { useSEO } from '@/hooks/useSEO';
import { TrendingUp, Globe, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function CoachModel() {
  useSEO({
    title: 'One Coach. Full Accountability',
    description: 'You get one named Coach, a senior advisor with 10 to 20 years of management consulting experience, accountable from the decision through delivery and reporting. No committees. No hand-off chains.',
    canonicalPath: '/coach-model',
    ogImage: 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/og-social-share-TjcXvbM8Zm8Zo3haX98724.png',
  });

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section
        style={{
          background: 'var(--color-slate-deep)',
          padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)',
        }}
      >
        <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
          <ScrollReveal>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              How We Work
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 600,
                color: '#FAF7F2',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                maxWidth: '18ch',
              }}
            >
              One Coach.
              <br />
              <em style={{ color: '#C9A84C' }}>Full Accountability.</em>
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                color: 'rgba(250,247,242,0.72)',
                lineHeight: 1.7,
                maxWidth: '580px',
              }}
            >
              You get one named Coach, a senior advisor with 10 to 20 years of management consulting experience,
              who owns your relationship, brings in the subject-matter experts each recommendation calls for, and stays
              accountable through delivery and reporting.
            </p>
          </ScrollReveal>
          <aside aria-label="Coach accountability marker" style={{ borderBottom: '1px solid rgba(250,247,242,0.2)', borderTop: '2px solid #C9A84C', padding: '1.2rem 0' }}>
            <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Accountability marker</p>
            <div style={{ alignItems: 'center', display: 'flex', gap: '0.85rem', marginTop: '0.8rem' }}><div style={{ alignItems: 'center', border: '1px solid rgba(201,168,76,0.75)', borderRadius: '50%', color: '#C9A84C', display: 'flex', fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, height: '56px', justifyContent: 'center', width: '56px' }}>01</div><p style={{ color: 'rgba(250,247,242,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', lineHeight: 1.55, margin: 0 }}>One named Coach. One accountable relationship. Human judgment before delivery.</p></div>
          </aside>
        </div>
      </section>

      {/* Three Coach Types */}
      <section style={{ background: 'oklch(0.97 0.006 152)', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  display: 'block',
                  marginBottom: '0.75rem',
                }}
              >
                One Coach, specialists as needed
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 600,
                  color: 'var(--color-slate-deep)',
                  lineHeight: 1.15,
                }}
              >
                One accountable relationship, backed by the right expertise.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'The CFO Coach',
                focus: 'Financial Performance & Capital Strategy',
                description:
                  'Speaks the language of the CFO. Translates every sustainability initiative into projected financial return, financing eligibility, and sequencing rationale. Reframes sustainability as the highest-return operational improvement category, not a cost centre.',
                persona: 'Serves: CFO, Treasurer, Head of FP&A',
                icon: TrendingUp,
                color: '#C9A84C',
              },
              {
                name: 'The Operations Coach',
                focus: 'Execution, Friction Removal & Deployment',
                description:
                  'Sits alongside the COO to eliminate the gap between identification and commissioning. Manages provider selection, implementation sequencing, and measurement and verification, ensuring that good ideas actually get built.',
                persona: 'Serves: COO, VP Operations, Facilities',
                icon: Globe,
                color: '#2E6B8A',
              },
              {
                name: 'The Credibility Coach',
                focus: 'Verified Outcomes & Evidence',
                description:
                  'Partners with the CSO to deliver documented outcomes. Provides honest critiques of vendor-funded research and the evidence base that makes sustainability commitments credible to boards and investors.',
                persona: 'Serves: CSO, Board, Investor Relations',
                icon: Shield,
                color: '#5B5EA6',
              },
            ].map((coach, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div
                  className="rounded-2xl p-7 h-full flex flex-col"
                  style={{
                    background: '#fff',
                    border: `1.5px solid ${coach.color}22`,
                    boxShadow: '0 4px 24px rgba(30,45,47,0.06)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${coach.color}18` }}
                  >
                    <coach.icon size={22} style={{ color: coach.color }} />
                  </div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider mb-1 block"
                    style={{ color: coach.color, fontFamily: 'var(--font-body)' }}
                  >
                    {coach.focus}
                  </span>
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: 'var(--color-slate-deep)',
                    }}
                  >
                    {coach.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed flex-1"
                    style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.45 0.02 200)' }}
                  >
                    {coach.description}
                  </p>
                  <div
                    className="mt-5 pt-4 text-xs font-medium"
                    style={{
                      borderTop: `1px solid ${coach.color}22`,
                      fontFamily: 'var(--font-body)',
                      color: 'oklch(0.55 0.02 200)',
                    }}
                  >
                    {coach.persona}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How the model works */}
      <section style={{ background: 'var(--color-slate-deep)', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  display: 'block',
                  marginBottom: '0.75rem',
                }}
              >
                The Model
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 600,
                  color: '#FAF7F2',
                  lineHeight: 1.15,
                }}
              >
                No committees. No hand-off chains.
                <br />
                <em style={{ color: '#C9A84C' }}>No junior analysts doing the work.</em>
              </h2>
            </div>
          </ScrollReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {[
              { step: '01', label: 'The Quarterback', detail: 'One senior coach owns the account. Generally 10 to 20 years of management consulting experience. Named. One neck to wring. Not rotated.' },
              { step: '02', label: 'SME Network on Demand', detail: 'Subject-matter experts deployed for specific tasks, never billed as standing overhead.' },
              { step: '03', label: 'Human Sanity Test', detail: 'Before any recommendation reaches the CFO, the coach applies a human sanity test. Big data is fast. Judgment is irreplaceable.' },
              { step: '04', label: 'Accountable Through Delivery', detail: 'The Coach stays accountable through delivery and reporting. Our advisory fee is a retainer plus a share of verified results. Coach and specialist time is passed through at cost, with no markup.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="flex items-start gap-4">
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: 'rgba(201,168,76,0.45)',
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: '#FAF7F2',
                        marginBottom: '0.3rem',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: 'rgba(250,247,242,0.5)',
                        lineHeight: 1.6,
                      }}
                    >
                      {item.detail}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Principals */}
      <section style={{ background: 'oklch(0.97 0.006 152)', padding: 'clamp(3rem, 6vw, 5rem) 0', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                }}
              >
                The Principals
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[
                {
                  name: 'Rob Kirkby',
                  title: 'Founder & CEO',
                  bio: 'Forty-five years in energy economics. Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data. No equipment sales. No referral fees.',
                  photo: '/manus-storage/RobKirkby_402e0e7f.jpeg',
                  href: '/about',
                  linkedin: 'https://www.linkedin.com/in/robert-kirkby-3b7374/',
                },
                {
                  name: 'Campbell Ohrlis',
                  title: 'VP Partnerships',
                  bio: '27 years scaling businesses from startup to $65M. Brings commercial strategy, channel partner development, and C-suite client relationships to every engagement.',
                  photo: '/manus-storage/CampbellOhrlis_da1d067a.jpeg',
                  href: '/about',
                  linkedin: 'https://www.linkedin.com/in/campbellohrlis/',
                },
              ].map((person, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{
                    background: '#fff',
                    border: '1.5px solid rgba(201,168,76,0.12)',
                    boxShadow: '0 2px 12px rgba(30,45,47,0.05)',
                  }}
                >
                  <Link href={person.href}>
                    <img
                      src={person.photo}
                      alt={person.name}
                      width="72"
                      height="72"
                      loading="lazy"
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flexShrink: 0,
                        cursor: 'pointer',
                        boxShadow: '0 0 0 3px #C9A84C, 0 0 0 5px rgba(201,168,76,0.15)',
                      }}
                    />
                  </Link>
                  <div style={{ flex: 1 }}>
                    <Link href={person.href} style={{ textDecoration: 'none' }}>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'var(--color-slate-deep)',
                          cursor: 'pointer',
                          marginBottom: '2px',
                        }}
                      >
                        {person.name}
                      </div>
                    </Link>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#C9A84C',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {person.title}
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color: 'oklch(0.52 0.02 200)',
                        lineHeight: 1.6,
                        marginBottom: '0.5rem',
                      }}
                    >
                      {person.bio}
                    </p>
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#0A66C2',
                        textDecoration: 'none',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0D3349', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container text-center">
          <ScrollReveal>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 600,
                color: '#FAF7F2',
                lineHeight: 1.15,
                marginBottom: '1rem',
              }}
            >
              Meet your Coach.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'rgba(250,247,242,0.7)',
                lineHeight: 1.7,
                maxWidth: '480px',
                margin: '0 auto 2rem',
              }}
            >
              Bring your portfolio and the decision you're trying to make. One conversation with a principal, no sales presentation. From then on, there's one person at your table who's accountable for the result.
            </p>
            <a href="https://calendar.app.google/ozpmtufXwN4uhE2r6" target="_blank" rel="noopener noreferrer">
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#C9A84C',
                  color: '#FAF7F2',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                }}
              >
                Find your Next Best Thing
                <ArrowRight size={15} />
              </span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

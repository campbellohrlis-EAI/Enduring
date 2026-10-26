// =============================================================================
// ENDURING ADVANTAGE, About Us Page
// Sage Editorial design: cream background, forest green hero, sage accents
// Covers: firm philosophy, process, Rob Kirkby biography, Campbell Ohrlis
// =============================================================================
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContextTooltip from '@/components/ContextTooltip';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, Building2, Calendar, CheckCircle2, TrendingUp, Users, Linkedin } from 'lucide-react';

// Principal LinkedIn profile URLs
const PRINCIPAL_LINKEDIN: Record<string, string> = {
  'Rob Kirkby': 'https://www.linkedin.com/in/robert-kirkby-3b7374/',
  'Campbell Ohrlis': 'https://www.linkedin.com/in/campbellohrlis/',
};

const BOOKING_URL = 'https://calendar.app.google/ozpmtufXwN4uhE2r6';

const OG_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/og-social-share-TjcXvbM8Zm8Zo3haX98724.png';

function renderActioText(copy: string) {
  return copy.split(/(actio)/gi).map((part, index) => (
    part.toLowerCase() === 'actio' ? <strong key={index}>{part}</strong> : part
  ));
}

function renderActioKicker(copy: string) {
  return copy.split(/(actio)/gi).map((part, index) => (
    part.toLowerCase() === 'actio' ? <span key={index} style={{ textTransform: 'none' }}>actio</span> : part
  ));
}

// ── Timeline entries ─────────────────────────────────────────────────────────
const timeline = [
  {
    year: '1979',
    title: 'Energy economics consulting',
    org: 'DataMetrics Limited, Calgary, AB',
    body: 'Developed project financial evaluation software for major western Canadian energy projects, produced world oil price forecasts, and built econometric demand models for Canadian energy markets.',
  },
  {
    year: '1983',
    title: 'Chief, Project Analysis Division',
    org: 'National Energy Board, Ottawa, ON',
    body: 'Led economic evaluations of major energy projects and energy export applications subject to National Energy Board regulation. Built the analytical framework that would later underpin independent advisory work.',
  },
  {
    year: '1987',
    title: 'Founder & President',
    org: 'ECNG Inc., Oakville, ON',
    body: 'Founded a natural gas management company and led it for nearly nine years, building deep expertise in energy procurement, contract structuring, and customer-side advocacy.',
  },
  {
    year: '1996',
    title: 'Founder & CEO',
    org: 'Energy Advantage Inc., Burlington, ON',
    body: 'Founded Energy Advantage to provide independent total energy and environmental management services to commercial, industrial, and institutional customers across North America.',
  },
];

// ── Process steps ─────────────────────────────────────────────────────────────
const processSteps = [
  { number: '01', title: 'Assess', body: 'We learn your business, sustainability spend and the data you already have. We spot the likely easy wins.' },
  { number: '02', title: 'Collect', body: 'Data collection starts on day one and keeps going. We load what you have into actio and add to it as we go.' },
  { number: '03', title: 'Identify', body: 'Your data identifies the problem worth solving. actio then screens the full field, rather than grading vendor proposals, and names the Next Best Thing. Early on that means low-risk, easy wins.' },
  { number: '04', title: 'Plan', body: 'Generative AI drafts the plan quickly. Coaches and specialists apply the human sanity test before it reaches you.' },
  { number: '05', title: 'Deliver', body: 'The right partners do the work. We quarterback it to done.' },
  { number: '06', title: 'Report and repeat', body: 'We report cost savings and environmental results against your baseline. Then we name the next move.' },
];

// ── Principles ────────────────────────────────────────────────────────────────
const principles = [
  {
    icon: CheckCircle2,
    title: 'Independent by structure',
    body: 'No equipment sales and no referral fees. The fee is a retainer plus a share of verified results. Coach and specialist time is passed through at cost. Enduring Advantage only earns more when you save more.',
  },
  {
    icon: TrendingUp,
    title: 'Results first',
    body: 'Savings and environmental results are reported against your baseline as each project lands. The evidence sharpens the next move.',
  },
  {
    icon: Users,
    title: 'The quarterback model',
    body: 'Every account has one Coach, a senior advisor with 10 to 20 years of management consulting experience, who brings in specialists as needed. AI is everywhere. What keeps clients is the human relationship.',
  },
  {
    icon: Building2,
    title: 'Your data, experienced stewardship',
    body: 'Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data. Your data stays yours.',
  },
];

export default function About() {
  useSEO({
    title: 'About Enduring Advantage',
    description: 'Enduring Advantage is a software-enabled, managed sustainability decision partner for CFOs. Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data. actio is developed by Catalys, and a named Coach quarterbacks delivery.',
    canonicalPath: '/about',
    ogImage: OG_IMAGE,
    ogType: 'website',
  });

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      <Navigation />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#0D3349',
          paddingTop: 'clamp(6rem, 12vw, 9rem)',
          paddingBottom: 'clamp(4rem, 8vw, 6rem)',
          paddingLeft: 'clamp(1.25rem, 5vw, 3rem)',
          paddingRight: 'clamp(1.25rem, 5vw, 3rem)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            marginBottom: '1.25rem',
          }}>
            About Enduring Advantage
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: 'var(--color-cream)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            maxWidth: '700px',
          }}>
            The right things.<br />
            <span style={{ color: '#C9A84C' }}>In the right order.</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(250,247,242,0.82)',
            lineHeight: 1.7,
            maxWidth: '620px',
            marginBottom: '2.5rem',
          }}>
            Lower costs. Measurable environmental gains. A record you can show investors. Your data leads us to the sustainability project that pays best, not to a choice among projects vendors have suggested. Enduring Advantage helps you deliver it in the right order, and reports the results as you go. Software does the screening. People make sure it works.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/diagnostic">
              <a style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.75rem',
                background: 'transparent',
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.95rem',
                borderRadius: '6px',
                border: '1.5px solid rgba(250,247,242,0.35)',
                textDecoration: 'none',
                transition: 'all 0.22s cubic-bezier(0.23,1,0.32,1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.03)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(201,168,76,0.35)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
              >
                See what happens after the first conversation
                <ArrowRight size={16} />
              </a>
            </Link>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.75rem',
                background: '#C9A84C',
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.95rem',
                borderRadius: '6px',
                border: '1.5px solid rgba(201,168,76,0.65)',
                textDecoration: 'none',
                transition: 'all 0.22s cubic-bezier(0.23,1,0.32,1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#F0D070';
                (e.currentTarget as HTMLElement).style.background = '#A9832C';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.65)';
                (e.currentTarget as HTMLElement).style.background = '#C9A84C';
              }}
            >
              Find your Next Best Thing
            </a>
          </div>
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center" style={{ borderTop: '1px solid rgba(201,168,76,0.42)', marginTop: '2.4rem', paddingTop: '1.25rem' }}>
            <div>
              <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.14em', margin: 0, textTransform: 'uppercase' }}>Our role</p>
              <p style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 600, lineHeight: 1.08, margin: '0.45rem 0 0' }}>Assess, collect, identify, plan, deliver, report and repeat.</p>
            </div>
            <div className="flex items-center gap-3 md:justify-end">
              <span className="flex items-center justify-center" style={{ border: '1px solid #C9A84C', borderRadius: '50%', color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, height: '42px', letterSpacing: '0.06em', width: '42px' }}>01</span>
              <Link href="/services" className="inline-flex items-center gap-2" style={{ color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 800, textDecoration: 'none' }}>See the decision route <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR PRINCIPLES ───────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(3.5rem, 8vw, 5.5rem) clamp(1.25rem, 5vw, 3rem)',
        background: 'var(--color-cream)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            marginBottom: '0.75rem',
          }}>How we work</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            color: '#0D3349',
            marginBottom: '3rem',
            lineHeight: 1.15,
          }}>
            Four principles that never change.
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
          }}>
            {principles.map((p) => (
              <div key={p.title} style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '1.75rem',
                border: '1px solid rgba(216,208,196,0.6)',
                boxShadow: '0 2px 12px rgba(28,43,43,0.05)',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(201,168,76,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <p.icon size={20} color="#C9A84C" />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#0D3349',
                  marginBottom: '0.5rem',
                }}>{p.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: '#4A4A3A',
                  lineHeight: 1.65,
                  margin: 0,
                }}>{renderActioText(p.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#0D3349', padding: 'clamp(3.25rem, 6vw, 4.75rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div className="grid lg:grid-cols-[0.84fr_1.16fr] gap-9 items-center" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', margin: 0, textTransform: 'uppercase' }}>What the group is built to protect</p>
            <h2 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.08, margin: '0.65rem 0 0' }}>Judgment before solution.</h2>
          </div>
          <div style={{ borderLeft: '3px solid #C9A84C', padding: '0.35rem 0 0.35rem 1.25rem' }}>
            <p style={{ color: 'rgba(250,247,242,0.78)', fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>The group is structured so that operating evidence, decision support, and delivery accountability stay connected without creating an incentive to sell equipment or steer a recommendation toward a preferred vendor.</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2" style={{ marginTop: '1rem' }}>
              {['No equipment sales', 'No referral fees', 'One accountable relationship'].map((item) => <span key={item} style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.76rem', fontWeight: 800, letterSpacing: '0.05em' }}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(3.5rem, 8vw, 5.5rem) clamp(1.25rem, 5vw, 3rem)',
        background: '#F0EDE7',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            marginBottom: '0.75rem',
          }}>The process</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            color: '#0D3349',
            marginBottom: '0.75rem',
            lineHeight: 1.15,
          }}>
            The Right Things in the Right Order, at Speed.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#4A4A3A',
            lineHeight: 1.7,
            maxWidth: '560px',
            marginBottom: '3rem',
          }}>
            The process starts with what you know, gathers more data as the work progresses, then follows a steady sequence of high-return decisions.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {processSteps.map((step) => (
              <div key={step.number} style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '1.75rem',
                border: '1px solid rgba(216,208,196,0.6)',
                boxShadow: '0 2px 12px rgba(28,43,43,0.05)',
                position: 'relative',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '2.5rem',
                  color: 'rgba(201,168,76,0.12)',
                  lineHeight: 1,
                  display: 'block',
                  marginBottom: '0.75rem',
                }}>{step.number}</span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#0D3349',
                  marginBottom: '0.5rem',
                }}>{step.title}
                  {step.number === '01' && <ContextTooltip label="The Diagnostic" detail="A structured starting point that uses the data available today to establish an initial baseline and identify one material next move." />}
                  {step.number === '02' && <ContextTooltip label="Ranking method" detail="This is the method, not the deliverable: financial return and implementation effort are weighed before detailed planning begins." />}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: '#4A4A3A',
                  lineHeight: 1.65,
                  margin: 0,
                }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROB KIRKBY BIO ────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(3.5rem, 8vw, 5.5rem) clamp(1.25rem, 5vw, 3rem)',
        background: 'var(--color-cream)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            marginBottom: '0.75rem',
          }}>The principals</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            color: '#0D3349',
            marginBottom: '3rem',
            lineHeight: 1.15,
          }}>
            You work directly with us.
          </h2>

          {/* Rob Kirkby card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '2.5rem',
            alignItems: 'start',
            background: '#fff',
            borderRadius: '16px',
            padding: 'clamp(1.75rem, 4vw, 2.75rem)',
            border: '1px solid rgba(216,208,196,0.6)',
            boxShadow: '0 4px 24px rgba(28,43,43,0.07)',
            marginBottom: '2rem',
          }}>
            {/* Avatar */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#0D3349',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden',
            }}>
              <img
                src="/manus-storage/RobKirkby_402e0e7f.jpeg"
                alt="Rob Kirkby"
                width="80"
                height="80"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.4rem',
                color: '#0D3349',
                marginBottom: '0.2rem',
              }}>Rob Kirkby</h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                marginBottom: '1.25rem',
              }}>Founder & CEO, Enduring Advantage / Energy Advantage Inc.</p>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.97rem',
                color: '#4A4A3A',
                lineHeight: 1.75,
                marginBottom: '1rem',
              }}>
                Rob has spent more than 45 years at the intersection of energy economics and independent advisory. He began his career at DataMetrics Limited in Calgary, building financial evaluation software for major western Canadian energy projects and producing world oil price forecasts. He then served at the National Energy Board in Ottawa, leading economic evaluations of major energy projects and export applications, before founding ECNG Inc. in 1987, a natural gas management company he led for nearly nine years. That foundation of institutional rigour, independent analysis, and customer-side advocacy has shaped every business he has built since.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.97rem',
                color: '#4A4A3A',
                lineHeight: 1.75,
                marginBottom: '1rem',
              }}>
                In 1996 he founded{' '}
                <a href="https://energyadvantage.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2E6B8A', fontWeight: 600, textDecoration: 'none' }}>Energy Advantage Inc.</a>
                . Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data for commercial, industrial and institutional customers across North America. Enduring Advantage is the delivery company within the Energy Advantage group, built to bring the same vendor-neutral, results-first rigour to the full sustainability field.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.97rem',
                color: '#4A4A3A',
                lineHeight: 1.75,
                marginBottom: '1.5rem',
              }}>
                His view is simple. Customers today face a multitude of energy and sustainability options with the potential to deliver very material financial and environmental benefits. The challenge is choosing the right options, in the right order, with the right partners. That is exactly what Enduring Advantage is built to do. The group&apos;s decision platform, <strong>actio</strong>, is developed by{' '}
                <a href="https://catalyslabs.com" target="_blank" rel="noopener noreferrer" style={{ color: '#5B5EA6', fontWeight: 600, textDecoration: 'none' }}>Catalys</a>
                .
              </p>

              <blockquote style={{
                borderLeft: '3px solid #C9A84C',
                color: '#4A4A3A',
                fontFamily: 'var(--font-body)',
                fontSize: '0.97rem',
                fontStyle: 'italic',
                lineHeight: 1.75,
                margin: '0 0 1.5rem',
                paddingLeft: '1.25rem',
              }}>
                <p style={{ margin: 0 }}>&quot;You can have a material impact on the corporate bottom line and market cap with a systematic approach to taking advantage of the opportunities available. If you pick the right things, it&apos;s tremendously beneficial, good for the environment and good for the pocketbook.&quot;</p>
                <footer style={{ color: '#6B6B5A', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontStyle: 'normal', fontWeight: 700, marginTop: '0.75rem' }}>Rob Kirkby, Founder and CEO</footer>
              </blockquote>

              {/* Career timeline */}
              <div style={{
                borderTop: '1px solid rgba(216,208,196,0.7)',
                paddingTop: '1.5rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#9B9B8A',
                  marginBottom: '1.25rem',
                }}>Career timeline</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {timeline.map((t) => (
                    <div key={t.year} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '1rem', alignItems: 'start' }}>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        color: '#C9A84C',
                        paddingTop: '2px',
                      }}>{t.year}</span>
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: '#0D3349',
                          marginBottom: '0.1rem',
                        }}>{t.title}</p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.78rem',
                          color: '#C9A84C',
                          fontWeight: 600,
                          marginBottom: '0.3rem',
                        }}>{t.org}</p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem',
                          color: '#6B6B5A',
                          lineHeight: 1.6,
                          margin: 0,
                        }}>{t.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div style={{
                  marginTop: '1.5rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(216,208,196,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}>
                  <Calendar size={15} color="#C9A84C" style={{ flexShrink: 0 }} />
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: '#6B6B5A',
                    margin: 0,
                  }}>
                    <strong style={{ color: '#0D3349' }}>BA (Hons) & MA, Economics</strong>, University of Calgary, 1976–1980
                  </p>
                </div>

                {/* LinkedIn */}
                <div style={{ marginTop: '1.25rem' }}>
                  <a
                    href={PRINCIPAL_LINKEDIN['Rob Kirkby']}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                      fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700,
                      color: '#0A66C2', textDecoration: 'none',
                      padding: '0.4rem 0.9rem', borderRadius: '6px',
                      border: '1.5px solid rgba(10,102,194,0.25)',
                      background: 'rgba(10,102,194,0.05)',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,102,194,0.1)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,102,194,0.05)'; }}
                  >
                    <Linkedin size={15} />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Campbell Ohrlis card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '2.5rem',
            alignItems: 'start',
            background: '#fff',
            borderRadius: '16px',
            padding: 'clamp(1.75rem, 4vw, 2.75rem)',
            border: '1px solid rgba(216,208,196,0.6)',
            boxShadow: '0 4px 24px rgba(28,43,43,0.07)',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#3d6b4a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden',
            }}>
              <img
                src="/manus-storage/CampbellOhrlis_da1d067a.jpeg"
                alt="Campbell Ohrlis"
                width="80"
                height="80"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.4rem',
                color: '#0D3349',
                marginBottom: '0.2rem',
              }}>Campbell Ohrlis</h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                marginBottom: '1.25rem',
              }}>VP</p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.97rem',
                color: '#4A4A3A',
                lineHeight: 1.75,
                marginBottom: '1rem',
              }}>
                Campbell built Brainwave Solutions Group from $100,000 to over $65 million over 27 years, serving Sony, Dell, BMO, GSK, Sanofi and Merck. He has since held CRO, CEO and Managing Director roles across technology, capital markets and advisory businesses, and has led capital raises and acquisitions from $3 million to over $50 million.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.97rem',
                color: '#4A4A3A',
                lineHeight: 1.75,
                marginBottom: '1.5rem',
              }}>
                At Enduring Advantage he runs the partner channel and the commercial program with Rob Kirkby. If your clients are asking what to do first, he is the first call.
              </p>

              {/* LinkedIn */}
              <a
                href={PRINCIPAL_LINKEDIN['Campbell Ohrlis']}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700,
                  color: '#0A66C2', textDecoration: 'none',
                  padding: '0.4rem 0.9rem', borderRadius: '6px',
                  border: '1.5px solid rgba(10,102,194,0.25)',
                  background: 'rgba(10,102,194,0.05)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,102,194,0.1)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,102,194,0.05)'; }}
              >
               <Linkedin size={15} />
               Connect on LinkedIn
             </a>

              {/* Career timeline */}
              <div style={{
                borderTop: '1px solid rgba(216,208,196,0.7)',
                paddingTop: '1.5rem',
                marginTop: '1.5rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#9B9B8A',
                  marginBottom: '1.25rem',
                }}>Career timeline</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    {
                      year: '1992',
                      title: 'Chief Executive Officer',
                      org: 'Brainwave Solutions Group',
                      body: 'Built and led the company for 27 years, growing annual revenue from $100,000 to over $65 million. Served enterprise clients including Sony, Dell, BMO, GSK, Sanofi, and Merck. Developed the systems, culture, and leadership team that sustained growth through multiple market cycles.',
                    },
                    {
                      year: '2019',
                      title: 'Chief Revenue Officer',
                      org: 'Excellerate, Ontario',
                      body: 'Aligned sales strategy with executive vision and business objectives. Scaled digital investment channels with 25% year-on-year revenue growth. Developed automated funnels for investor onboarding and increased lead generation by 58%.',
                    },
                    {
                      year: '2023',
                      title: 'Director of Sales Marketing',
                      org: 'GoTactical, Canada',
                      body: 'Developed consultative selling strategies for non-profit and C-level B2B clients. Surpassed sales targets by 30% and led a team of four account managers to $1.6 million in revenue in six months.',
                    },
                    {
                      year: '2024',
                      title: 'Managing Partner / Managing Director',
                      org: 'Trusted Financial, Toronto',
                      body: 'Led acquisitions, business sales, and investment rounds for mid-market companies raising capital from $3 million to over $50 million. Facilitated Series A funding rounds and mergers and acquisitions.',
                    },
                    {
                      year: '2026',
                      title: 'Principal, Commercial Strategy',
                      org: 'Enduring Advantage / Energy Advantage',
                      body: "Working directly with founder Rob Kirkby to drive corporate growth, commercial strategy, and the channel partner program behind one of Canada's most established energy and sustainability management companies.",
                    },
                  ].map((t) => (
                    <div key={t.year} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '1rem', alignItems: 'start' }}>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        color: '#C9A84C',
                        paddingTop: '2px',
                      }}>{t.year}</span>
                      <div>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          color: '#0D3349',
                          marginBottom: '0.1rem',
                        }}>{t.title}</p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.78rem',
                          color: '#C9A84C',
                          fontWeight: 600,
                          marginBottom: '0.3rem',
                        }}>{t.org}</p>
                        <p style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.85rem',
                          color: '#6B6B5A',
                          lineHeight: 1.6,
                          margin: 0,
                        }}>{t.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
           </div>
         </div>
        </div>
      </section>


      {/* ── APPROACH STATEMENT BAND ─────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-slate-deep)',
          padding: '28px 0',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 3rem)' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0,
              fontFamily: 'var(--font-display)',
            }}
          >
            {[
              'The Right Things',
              'In The Right Order',
              'With The Right Partners',
              'At Speed.',
              'At Scale.',
            ].map((phrase, i, arr) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: i === arr.length - 1 ? '#C9A84C' : '#FAF7F2',
                    padding: '0 clamp(10px, 1.5vw, 20px)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {phrase}
                </span>
                {i < arr.length - 1 && (
                  <span
                    style={{
                      color: 'rgba(134,239,172,0.35)',
                      fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                      lineHeight: 1,
                      userSelect: 'none',
                    }}
                  >
                    /
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ── ADVANTAGE GROUP ──────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(3rem, 7vw, 5rem) clamp(1.25rem, 5vw, 3rem)',
        background: 'var(--color-slate-deep)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            marginBottom: '0.75rem',
          }}>Part of the Energy Advantage group</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 700,
            color: 'var(--color-cream)',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}>One group. Three capabilities.</h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(250,247,242,0.65)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '640px',
          }}>
            Enduring Advantage is the delivery company within the Energy Advantage group. Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data. Together, the group combines that work with decision support and human-led delivery in one accountable customer relationship.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              {
                name: 'Enduring Advantage',
                role: 'Integrator & Delivery Partner',
                description: 'The customer-facing delivery company. We coordinate the group, turn the decision into a practical plan, and quarterback delivery through to verified results.',
                accent: '#C9A84C',
                labelColor: '#C9A84C',
                url: null as string | null,
              },
              {
                name: 'Energy Advantage',
                role: 'Data & Baseline Intelligence',
                description: 'Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data. It provides the baseline and measurement work behind each decision.',
                accent: '#2E6B8A',
                labelColor: '#7dd3fc',
                url: 'https://energyadvantage.com' as string | null,
              },
              {
                name: 'Catalys',
                role: 'AI Decision Platform (actio)',
                description: 'Develops and owns actio, the decision platform licensed to Enduring Advantage at a channel rate. Rob Kirkby is majority owner of Catalys and of Energy Advantage, so this is a related party arrangement and we disclose it in writing. actio combines client, supplier and jurisdictional data to screen out what is not material and identify the Next Best Thing.',
                accent: '#5B5EA6',
                labelColor: '#a5b4fc',
                url: 'https://catalyslabs.com' as string | null,
              },
            ].map((entity) => (
              <div
                key={entity.name}
                style={{
                  background: 'rgba(250,247,242,0.04)',
                  border: `1px solid ${entity.accent}44`,
                  borderRadius: '14px',
                  padding: '1.5rem',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  background: `${entity.accent}33`,
                  color: entity.labelColor,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '100px',
                  marginBottom: '0.85rem',
                }}>{renderActioKicker(entity.role)}</span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--color-cream)',
                  marginBottom: '0.6rem',
                }}>{entity.name}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'rgba(250,247,242,0.6)',
                  lineHeight: 1.65,
                  marginBottom: entity.url ? '0.85rem' : 0,
                }}>{renderActioText(entity.description)}</p>
                {entity.url && (
                  <a
                    href={entity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: entity.labelColor,
                      textDecoration: 'none',
                      opacity: 0.8,
                      transition: 'opacity 0.15s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.8'; }}
                  >
                    {entity.url.replace('https://', '')} ↗
                  </a>
                )}
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(250,247,242,0.52)', lineHeight: 1.65, margin: '1.5rem 0 0', maxWidth: '760px' }}>
            Enduring Advantage Inc. is wholly owned by Energy Advantage Inc. <strong>actio</strong> is developed and owned by Catalys Inc. and licensed to Enduring Advantage at a channel rate. Rob Kirkby is majority owner of both Energy Advantage and Catalys, so these are related parties. We disclose that in writing rather than leave you to find it. No surprises.
          </p>
        </div>
      </section>

      {/* ── OUR APPROACH ─────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-cream)', padding: 'clamp(3.5rem, 7vw, 5.5rem) 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.75rem' }}>
            Our Approach
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#0D3349', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            One decision, grounded in your data and the context around it.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#4A4A3A', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '680px' }}>
            Your data comes first, then the supplier and jurisdictional context around it. Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data. The advantage comes from your operating data and the way <strong>actio</strong> brings the three databases together.
          </p>

          {/* Three databases */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            {[
              {
                num: '01',
                title: 'Customer database',
                body: 'Your data, organized to help pinpoint the biggest opportunity. It starts with what you have and grows as the work goes.',
                accent: '#C9A84C',
              },
              {
                num: '02',
                title: 'Supplier database',
                body: 'Sustainability products, services and software, and the vendors who supply them. It helps identify the vendor, software, supplier or solution that best matches the requirements.',
                accent: '#2E6B8A',
              },
              {
                num: '03',
                title: 'Jurisdictional database',
                body: 'Climate, incentives, policy, prices and regulation by location. It shows where a solution performs best, so that’s where it gets done first.',
                accent: '#5B5EA6',
              },
            ].map((db) => (
              <div
                key={db.num}
                style={{
                  background: 'white',
                  border: '1px solid rgba(13,51,73,0.08)',
                  borderRadius: '14px',
                  padding: '1.75rem',
                  transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${db.accent}55`;
                  el.style.boxShadow = `0 4px 20px ${db.accent}18`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(13,51,73,0.08)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 800, color: db.accent, letterSpacing: '0.12em', marginBottom: '0.6rem' }}>{db.num}</div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: '#0D3349', marginBottom: '0.6rem' }}>{db.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.65, margin: 0 }}>{db.body}</p>
              </div>
            ))}
          </div>

          {/* actio platform */}
          <div style={{ background: '#0D3349', borderRadius: '16px', padding: 'clamp(1.75rem, 4vw, 2.5rem)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            <div>
              <span style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(201,168,76,0.15)', color: '#C9A84C', padding: '0.2rem 0.65rem', borderRadius: '100px', marginBottom: '1rem' }}>
                Powered by <span style={{ textTransform: 'none' }}>actio</span>
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 700, color: '#FAF7F2', lineHeight: 1.2, marginBottom: '1rem' }}>
                The decision platform that turns three databases into one next move.
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(250,247,242,0.65)', lineHeight: 1.7, margin: 0 }}>
                <strong>actio</strong> is the decision platform developed by{' '}
                <a href="https://catalyslabs.com" target="_blank" rel="noopener noreferrer" style={{ color: '#C9A84C', fontWeight: 600, textDecoration: 'none' }}>Catalys</a>
                . It is licensed to Enduring Advantage at a channel rate and supports the structured screen of what is material to your business. Your data finds the opportunity, supplier data identifies the matching solution, and jurisdictional data shows where it performs best.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Materiality comes first', desc: 'The early screen removes what is not material to your company before detailed work begins.' },
                { label: 'Financial return is the primary filter', desc: 'Payback, ROI, or NPV, whichever your organization uses. Environmental benefit is measured alongside it.' },
                { label: 'One clear next action', desc: 'Not a long list. One clear next move, then ongoing reporting on what each move delivered.' },
                { label: 'Human judgment follows', desc: 'Generative AI can help draft a plan quickly. Coaches and subject matter experts apply the human sanity test before it reaches you.' },
              ].map((pt) => (
                <div key={pt.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, color: '#FAF7F2' }}>{pt.label}. </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(250,247,242,0.55)', lineHeight: 1.6 }}>{renderActioText(pt.desc)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA to Services */}
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/services">
              <a
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#C9A84C', color: '#FAF7F2',
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700,
                  padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(201,168,76,0.3)',
                  transition: 'opacity 0.2s, transform 0.15s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                See the full six-phase protocol
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>
            </Link>
            <Link href="/diagnostic">
              <a style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, color: '#0D3349', textDecoration: 'none', opacity: 0.6, transition: 'opacity 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; }}
              >
                Or start with The Diagnostic →
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SCORECARD CTA ────────────────────────────────────────────────── */}
      <section style={{ background: '#0D3349', padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(134,239,172,0.6)' }}>
              Free self-assessment
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 600, color: '#FAF7F2', lineHeight: 1.25, margin: 0, maxWidth: '600px' }}>
              Check where you stand first.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(250,247,242,0.65)', lineHeight: 1.7, margin: 0, maxWidth: '520px' }}>
              Take the 15-question CFO Sustainability Investment Readiness Scorecard. Get your result right away, on the page. No sales call required.
            </p>
            <a
              href="/scorecard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
                padding: '0.85rem 2rem',
                background: 'transparent',
                border: '1.5px solid rgba(134,239,172,0.5)',
                color: '#C9A84C',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                borderRadius: '2px',
                transition: 'background 0.22s cubic-bezier(0.23,1,0.32,1), border-color 0.22s ease, color 0.22s ease, transform 0.15s ease, box-shadow 0.22s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(134,239,172,0.12)';
                el.style.borderColor = 'rgba(134,239,172,0.85)';
                el.style.color = '#a7f3c0';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 6px 24px rgba(134,239,172,0.15)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'transparent';
                el.style.borderColor = 'rgba(134,239,172,0.5)';
                el.style.color = '#C9A84C';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              Take the Scorecard
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ───────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(3.5rem, 8vw, 5.5rem) clamp(1.25rem, 5vw, 3rem)',
        background: '#0D3349',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            marginBottom: '1rem',
          }}>Start here</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            color: 'var(--color-cream)',
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}>
            A tremendous time to be a customer,<br />
            <span style={{ color: '#C9A84C' }}>if you know what you're doing.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'rgba(250,247,242,0.78)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}>
            The Diagnostic is the first engagement. A situation assessment, the start of data collection and the first low-risk wins, built on the data you have today. Nobody knows which move comes first before looking, and the one you suspect often isn&apos;t it. Scope and terms are agreed before work begins. By the end you know what to do next, why it pays and how it gets delivered.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/diagnostic">
              <a style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 2rem',
                background: '#C9A84C',
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.97rem',
                borderRadius: '6px',
                textDecoration: 'none',
                transition: 'all 0.22s cubic-bezier(0.23,1,0.32,1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.03)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(201,168,76,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
              >
                Find your Next Best Thing
                <ArrowRight size={16} />
              </a>
            </Link>
            <Link href="/contact">
              <a style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.9rem 2rem',
                background: 'transparent',
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.97rem',
                borderRadius: '6px',
                border: '1.5px solid rgba(250,247,242,0.35)',
                textDecoration: 'none',
                transition: 'all 0.22s cubic-bezier(0.23,1,0.32,1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,247,242,0.7)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(250,247,242,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,247,242,0.35)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
              >
                See how it works
              </a>
            </Link>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(250,247,242,0.55)', marginTop: '1.5rem' }}>
            Have questions before you start?{' '}
            <Link href="/questions">
              <a style={{ color: '#C9A84C', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)' }}>
                See our full FAQ
              </a>
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

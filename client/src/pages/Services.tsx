// =============================================================================
// ENDURING ADVANTAGE, Services Page
// Sage Editorial design: cream background, sage green accents, Nunito Sans
// The Next Best Thing Protocol: data → identify → plan → execute → realign → repeat
// =============================================================================

import {
  Fragment, useEffect, useRef, useState
} from 'react';
import SustainabilityMatrix from '@/components/SustainabilityMatrix';
import { Link } from 'wouter';
import { useSEO } from '@/hooks/useSEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContextTooltip from '@/components/ContextTooltip';
import {
  Database, Target, Map, Users, BarChart3, RefreshCw,
  CheckCircle2, ArrowRight, ChevronDown
} from 'lucide-react';

const BOOKING_URL = 'https://calendar.app.google/ozpmtufXwN4uhE2r6';

function renderActioText(copy: string) {
  return copy.split(/(actio)/gi).map((part, index) => (
    part.toLowerCase() === 'actio' ? <strong key={index}>{part}</strong> : part
  ));
}

// ─── Protocol phases ─────────────────────────────────────────────────────────
const phases = [
  {
    number: '01',
    icon: Database,
    label: 'Assess & Collect',
    headline: 'Assess and collect.',
    body: `We start with your business, sustainability spend and data, not a vendor's proposed project. Your data defines the problem worth solving. Data collection starts on day one and keeps going. Nobody starts with complete data.`,
    bullets: [
      'Situation assessment and likely easy wins',
      'Initial data collection from what you have today',
      'No full operational baseline promised on day one',
      'A clearer starting point for the Next Best Thing process',
    ],
    accent: '#C9A84C',
  },
  {
    number: '02',
    icon: Target,
    label: 'Identify',
    headline: 'Identify.',
    body: `actio starts with the problem your data reveals, then screens out what is not material across the full field and names the Next Best Thing. It does not start by grading projects vendors have suggested. Early on, that means low-risk, easy wins. Bigger bets come as the data fills in.`,
    bullets: [
      'Lets your data set the search, rather than starting from a vendor shortlist',
      'Financial return measured by payback, ROI, NPV or your own criterion',
      'Early focus on low-risk, easy wins',
      'One clear recommendation with the reasoning to take forward',
    ],
    graphic: '/manus-storage/NBTgraphic_51289e23.png',
    graphicAlt: 'Next Best Thing prioritization chart showing savings vs financial return with circles sized by spend level and coloured by net benefit rating',
    graphicCaption: 'Circle size = spend level. Colour = net benefit rating. The green circle is the Next Best Thing. The process repeats after each completion.',
    accent: '#C9A84C',
  },
  {
    number: '03',
    icon: Map,
    label: 'Plan',
    headline: 'Plan.',
    body: `Generative AI drafts the plan fast. Coaches and specialists apply the human sanity test before it reaches you. The plan covers the action, the vendors to compare, the funding options and the financial case in your terms.`,
    bullets: [
      'Provider comparison against your criteria, not paid placement',
      'Funding structure, capital, green debt, incentives, or pay-from-savings',
      'Financial model using payback, ROI, NPV or your own criterion',
      'Decision-ready presentation with assumptions and supporting evidence',
    ],
    accent: '#C9A84C',
  },
  {
    number: '04',
    icon: Users,
    label: 'Deliver',
    headline: 'Deliver.',
    body: `Qualified vendors do the work. Your Coach owns the account, brings in specialists and keeps the work in the right order.`,
    bullets: [
      'Dedicated Coach assigned for the duration of the engagement',
      'Subject matter experts matched to the intervention type',
      'Vendor management and accountability on your behalf',
      'Progress reporting against the delivery plan and financial case',
    ],
    accent: '#C9A84C',
  },
  {
    number: '05',
    icon: BarChart3,
    label: 'Report',
    headline: 'Report.',
    body: `Every completed project gets an M&V report. [CONFIRM 8] provider and frequency. In between, you get ongoing reporting of savings and environmental results. Estimates are labelled. The financial case is reconciled against what actually happened.`,
    bullets: [
      'Measurement and verification reporting for completed projects [CONFIRM: provider name and frequency.]',
      'Financial results compared with the original model',
      'Documentation for management, board and disclosure reporting',
      'Environmental results clearly distinguished from early-stage estimates',
    ],
    accent: '#C9A84C',
  },
  {
    number: '06',
    icon: RefreshCw,
    label: 'Repeat',
    headline: 'Repeat.',
    body: `The baseline is updated, what was learned gets added to the data, and the Next Best Thing, the highest return move, gets named.`,
    bullets: [
      'Updated baseline incorporating the delivered result',
      'Full re-run of the Next Best Thing process against the current solution landscape',
      'A steady sequence of financial and environmental improvements',
      'A managed decision cycle designed to keep the work in the right order',
    ],
    accent: '#C9A84C',
  },
];

// ─── Differentiators ─────────────────────────────────────────────────────────
const differentiators = [
  {
    label: 'Whole-market coverage',
    desc: 'Your data and business context set the search. We screen the whole field from there, rather than evaluating a vendor shortlist.',
  },
  {
    label: 'Neutrality by structure',
    desc: 'No equipment sales. No referral fees. The fee is a retainer plus a share of verified results, and Coach and specialist time is passed through at cost. Enduring Advantage does not profit from which solution wins.',
  },
  {
    label: 'No referral fees',
    desc: 'We receive no commissions or referral payments from providers we compare or recommend.',
  },
  {
    label: 'Aligned advisory fee',
    desc: 'Our advisory fee is a retainer plus a share of verified results. Coach and specialist time is passed through at cost, with no markup.',
  },
  {
    label: 'Coach-led execution',
    desc: 'A dedicated senior advisor stays with you through implementation, not just through the report.',
  },
  {
    label: 'Reported results',
    desc: 'Savings and environmental results are reported against the engagement baseline as the work continues.',
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Services() {
  useSEO({
    title: 'How Your Next Best Thing Gets Found and Delivered',
    description: 'You get one project, the reason it is that project, the plan to deliver it and the result reported against your baseline. Then the next one. Assess, collect, identify, plan, deliver, report, repeat. No equipment sales. No referral fees.',
    canonicalPath: '/services',
    ogImage: 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/og-social-share-TjcXvbM8Zm8Zo3haX98724.png',
  });

  const [activePhase, setActivePhase] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Intersection observer for scroll-in animations
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setVisible((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.15 }
    );
    phaseRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          background: 'linear-gradient(145deg, #0D3349 0%, #123E56 58%, #0A293C 100%)',
          paddingTop: '120px',
          paddingBottom: '80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(250,247,242,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(250,247,242,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }} />

        <div className="container grid lg:grid-cols-[minmax(0,1fr)_330px] gap-10 items-start" style={{ position: 'relative', zIndex: 1 }}>
          <div>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.35)',
            borderRadius: 0, padding: '6px 16px', marginBottom: '2rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C',
            }}>
              One project at a time
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 800,
            color: '#FAF7F2',
            lineHeight: 1.1,
            maxWidth: '780px',
            marginBottom: '1.5rem',
          }}>
            One project. The reason it is that project. Then the next.
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: 'rgba(250,247,242,0.72)',
            lineHeight: 1.75,
            maxWidth: '640px',
            marginBottom: '2.5rem',
          }}>
            You get your Next Best Thing, the plan to deliver it, the vendors to compare, the financing that fits, and the result reported against your baseline. Then the next one. Here's how it works.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#C9A84C', color: '#FAF7F2',
                fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700,
                padding: '14px 28px', borderRadius: '6px', textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(201,168,76,0.35)',
                transition: 'opacity 0.2s, transform 0.15s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              Find your Next Best Thing
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
            <Link
              href="/articles"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600,
                color: 'rgba(250,247,242,0.65)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.65)'; }}
            >
              Read the research
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>

          {/* Phase scroll indicator */}
          <div style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {phases.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? '32px' : '8px',
                  height: '4px',
                  borderRadius: '2px',
                  background: i === 0 ? '#C9A84C' : 'rgba(250,247,242,0.2)',
                  transition: 'width 0.3s, background 0.3s',
                }}
              />
            ))}
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.75rem',
              color: 'rgba(250,247,242,0.4)', marginLeft: '4px',
            }}>
              six-step process
            </span>
          </div>
          </div>
          <aside style={{ border: '1px solid rgba(201,168,76,0.46)', borderTop: '4px solid #C9A84C', background: 'rgba(250,247,242,0.06)', padding: '1.4rem', boxShadow: '0 18px 38px rgba(0,0,0,0.16)' }}>
            <div className="flex items-start justify-between gap-4" style={{ borderBottom: '1px solid rgba(250,247,242,0.18)', paddingBottom: '1rem' }}>
              <div>
                <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.14em', margin: 0, textTransform: 'uppercase' }}>The managed decision cycle</p>
                <p style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 600, lineHeight: 1.08, margin: '0.45rem 0 0' }}>From the whole field to one next action.</p>
              </div>
              <span className="flex items-center justify-center" style={{ border: '1px solid #C9A84C', borderRadius: '50%', color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, height: '42px', letterSpacing: '0.06em', width: '42px' }}>01</span>
            </div>
            <p style={{ color: 'rgba(250,247,242,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', lineHeight: 1.6, margin: '1rem 0' }}>It starts with a situation assessment and the data you have now. Early low-risk wins are identified, delivered and reported. Then the next move gets named.</p>
            <div style={{ borderTop: '1px solid rgba(250,247,242,0.16)' }}>
              {[['Assess + collect', 'Available data'], ['Screen + rank', 'Financial + environmental'], ['Deliver + report', 'One managed cycle']].map(([label, value]) => <div key={label} className="grid grid-cols-[1fr_auto] gap-3" style={{ borderBottom: '1px solid rgba(250,247,242,0.16)', padding: '0.68rem 0' }}><span style={{ color: 'rgba(250,247,242,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.76rem' }}>{label}</span><span style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800, textAlign: 'right', textTransform: 'uppercase' }}>{value}</span></div>)}
            </div>
            <Link href="/scorecard" className="inline-flex items-center gap-2" style={{ color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 800, marginTop: '1rem', textDecoration: 'none' }}>See the decision screen <ArrowRight size={15} /></Link>
          </aside>
        </div>
      </section>

      <section style={{ background: '#FFFDF5', borderBottom: '1px solid rgba(201,168,76,0.22)', padding: '2.2rem 0' }}>
        <div className="container">
          <p style={{ color: '#A9832C', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.13em', margin: '0 0 0.75rem', textTransform: 'uppercase' }}>The managed decision cycle</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {['Assess', 'Collect data', 'Identify', 'Plan', 'Deliver', 'Report and repeat'].map((step, index) => <div key={step} style={{ borderLeft: '2px solid #C9A84C', paddingLeft: '0.75rem' }}><span style={{ color: '#A9832C', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.08em' }}>{String(index + 1).padStart(2, '0')}</span><p style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1rem', lineHeight: 1.2, margin: '0.2rem 0 0' }}>{step}</p></div>)}
          </div>
        </div>
      </section>

      {/* ── THE PLAYING FIELD ─────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-cream)', padding: '80px 0 0' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', marginBottom: '48px' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              fontWeight: 700,
              marginBottom: '16px',
            }}>
              One clear answer
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              color: 'var(--color-slate-deep)',
              lineHeight: 1.15,
              marginBottom: '20px',
            }}>
              You get one project and the reason it is that project.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--color-slate)',
              lineHeight: 1.75,
              marginBottom: '16px',
            }}>
              Thousands of technologies, vendors, funding programs, consultants and software platforms compete for your attention. Finding options is easy. Knowing which one deserves your time and capital first is the hard part. Left alone, the projects that get funded are the ones that got pitched.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--color-slate)',
              lineHeight: 1.75,
              marginBottom: '16px',
            }}>
              actio, the decision platform developed and owned by Catalys, holds three databases. Your specific data pinpoints the biggest opportunity and sets the search. Only then does the supplier database identify the vendor, software, supplier or solution that best matches that opportunity. The jurisdictional database shows where it performs best. Supplier and jurisdictional data is largely public. Your data is the advantage.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--color-slate)',
              lineHeight: 1.75,
            }}>
              Vendors, equipment makers, software companies, brokers and consultants all play on this field. Enduring Advantage sits outside it, on your side of the table, works out what needs doing and how, then coordinates the people who do it.
            </p>
          </div>
        </div>
        <div style={{ padding: '0 0 1rem', textAlign: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            display: 'block',
            marginBottom: '0.5rem',
          }}>The Sustainability Playing Field</span>
        </div>
        <SustainabilityMatrix onTopicSelect={() => {}} />
      </section>

      {/* ── APPROACH STATEMENT BAND ─────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-slate-deep)',
          padding: '28px 0',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div
            className="flex flex-wrap items-center justify-center"
            style={{ fontFamily: 'var(--font-display)', gap: 0 }}
          >
            {[
              'The Right Things',
              'In The Right Order',
              'With The Right Partners',
              'At Speed.',
              'At Scale.',
            ].map((phrase, i, arr) => (
              <span key={i} className="flex items-center">
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

      {/* ── PROTOCOL PHASES ──────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0 40px' }}>
        <div className="container">
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0',
          }}>
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              const isVisible = visible.has(idx);
              const isLast = idx === phases.length - 1;

              return (
                <Fragment key={phase.number}>
                <div
                  ref={(el) => { phaseRefs.current[idx] = el; }}
                  data-idx={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: '0 2rem',
                    paddingBottom: isLast ? '0' : '0',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
                    transition: `opacity 0.55s cubic-bezier(0.23,1,0.32,1) ${idx * 60}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${idx * 60}ms`,
                  }}
                >
                  {/* Timeline column */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Phase icon circle */}
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                      background: 'rgba(201,168,76,0.1)',
                      border: '2px solid rgba(201,168,76,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, zIndex: 1,
                    }}>
                      <Icon size={22} style={{ color: '#C9A84C' }} strokeWidth={1.8} />
                    </div>
                    {/* Connector line */}
                    {!isLast && (
                      <div style={{
                        width: '2px', flex: 1, minHeight: '40px',
                        background: 'linear-gradient(to bottom, rgba(201,168,76,0.3), rgba(201,168,76,0.08))',
                        margin: '8px 0',
                      }} />
                    )}
                  </div>

                  {/* Content column */}
                  <div style={{ paddingBottom: isLast ? '40px' : '56px' }}>
                    {/* Phase label */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      marginBottom: '0.75rem', paddingTop: '12px',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800,
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: '#C9A84C',
                      }}>
                        Phase {phase.number}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: 'rgba(30,45,47,0.4)',
                      }}>
                        {phase.label}
                      </span>
                    </div>

                    {/* Headline */}
                    <h2 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
                      fontWeight: 700,
                      color: 'var(--color-slate-deep)',
                      lineHeight: 1.25,
                      marginBottom: '1rem',
                    }}>
                      {phase.headline}
                    </h2>

                    {/* Body */}
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      color: 'rgba(30,45,47,0.72)',
                      lineHeight: 1.8,
                      marginBottom: '1.25rem',
                      maxWidth: '680px',
                    }}>
                      {renderActioText(phase.body)}
                    </p>

                    {/* Bullets */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {phase.bullets.map((b) => (
                        <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <CheckCircle2
                            size={16}
                            strokeWidth={2}
                            style={{ color: '#C9A84C', flexShrink: 0, marginTop: '3px' }}
                          />
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.9rem',
                            color: 'rgba(30,45,47,0.65)',
                            lineHeight: 1.6,
                          }}>
                            {renderActioText(b)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Optional graphic (Phase 02 NBT chart) */}
                    {('graphic' in phase) && (phase as any).graphic && (
                      <div style={{ marginTop: '2rem' }}>
                        <img
                          src={(phase as any).graphic}
                          alt={(phase as any).graphicAlt ?? ''}
                          style={{ width: '100%', maxWidth: '560px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 24px rgba(28,43,43,0.10)', display: 'block' }}
                          loading="lazy"
                        />
                        {(phase as any).graphicCaption && (
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: '#9B9B8A', marginTop: '0.6rem', fontStyle: 'italic', maxWidth: '500px' }}>
                            {(phase as any).graphicCaption}
                          </p>
                        )}
                        <a
                          href={(phase as any).graphic}
                          download="NBT-Prioritization-Chart.png"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '0.75rem',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: '#C9A84C',
                            textDecoration: 'none',
                            letterSpacing: '0.02em',
                            borderBottom: '1px solid rgba(201,168,76,0.3)',
                            paddingBottom: '1px',
                            transition: 'color 0.15s ease, border-color 0.15s ease',
                          }}
                         onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color = '#a8882e';
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,168,76,0.7)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color = '#C9A84C';
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,168,76,0.3)';
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Download chart (PNG)
                        </a>
                        <a
                          href="/manus-storage/NBT-Prioritization-Chart_43efc570.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginTop: '0.5rem',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: '#C9A84C',
                            textDecoration: 'none',
                            letterSpacing: '0.02em',
                            borderBottom: '1px solid rgba(201,168,76,0.3)',
                            paddingBottom: '1px',
                            transition: 'color 0.15s ease, border-color 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color = '#a8882e';
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,168,76,0.7)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLAnchorElement).style.color = '#C9A84C';
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,168,76,0.3)';
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Open Full Report (PDF)
                          <span style={{ fontSize: '0.68rem', color: 'rgba(201,168,76,0.55)', marginLeft: '4px', fontWeight: 400 }}>134 KB</span>
                        </a>
                      </div>
                    )}

                    {/* Repeat arrow between phase 05 and 06 */}
                    {idx === 4 && (
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        marginTop: '1.5rem',
                        background: 'rgba(201,168,76,0.08)',
                        border: '1px solid rgba(201,168,76,0.2)',
                        borderRadius: '8px',
                        padding: '8px 16px',
                      }}>
                        <RefreshCw size={14} style={{ color: '#C9A84C' }} strokeWidth={2} />
                        <span style={{
                          fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
                          color: '#C9A84C',
                        }}>
                          Then it starts again, with a refreshed baseline and the next high return action.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {idx === 1 && (
                  <aside style={{ margin: '0 0 3.5rem clamp(0px, 8vw, 80px)', background: '#0D3349', borderLeft: '4px solid #C9A84C', maxWidth: '760px', padding: '1.4rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(201,168,76,0.1) 0 1px, transparent 1px 8px)', opacity: 0.5 }} />
                    <div style={{ position: 'relative' }}>
                      <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.14em', margin: 0, textTransform: 'uppercase' }}>Decision rule</p>
                      <p style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 600, lineHeight: 1.2, margin: '0.55rem 0' }}>A good project is not automatically the next project.</p>
                      <p style={{ color: 'rgba(250,247,242,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>Keep the field broad until every credible option has been screened against financial criteria, operating context and delivery conditions.</p>
                    </div>
                  </aside>
                )}
                {idx === 3 && (
                  <aside style={{ margin: '0 0 3.5rem clamp(0px, 8vw, 80px)', border: '1px solid rgba(13,51,73,0.15)', borderTop: '4px solid #C9A84C', background: '#F7F4EF', maxWidth: '760px', padding: '1.35rem 1.5rem' }}>
                    <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.14em', margin: 0, textTransform: 'uppercase' }}>Delivery checkpoint</p>
                    <div className="grid md:grid-cols-3 gap-4" style={{ marginTop: '0.85rem' }}>
                      {[['Relationship owner', 'Named before delivery'], ['Delivery partner', 'Accountable for execution'], ['Evidence loop', 'Measured before the next screen']].map(([label, value]) => <div key={label} style={{ borderLeft: '2px solid #C9A84C', paddingLeft: '0.75rem' }}><p style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800, margin: 0 }}>{label}</p><p style={{ color: 'rgba(13,51,73,0.64)', fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.45, margin: '0.3rem 0 0' }}>{value}</p></div>)}
                    </div>
                  </aside>
                )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY IT WORKS ─────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--color-slate-deep)',
        padding: '80px 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {differentiators.map((d) => (
              <div
                key={d.label}
                style={{
                  background: 'rgba(250,247,242,0.04)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(201,168,76,0.1)';
                  el.style.borderColor = 'rgba(201,168,76,0.4)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(250,247,242,0.04)';
                  el.style.borderColor = 'rgba(201,168,76,0.2)';
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700,
                  color: '#FAF7F2', marginBottom: '0.5rem',
                }}>
                  {d.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                  color: 'rgba(250,247,242,0.55)', lineHeight: 1.65,
                }}>
                  {d.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ NUDGE ────────────────────────────────────────────────────── */}
      <div style={{ background: 'oklch(0.96 0.012 152)', borderTop: '1px solid rgba(201,168,76,0.1)', padding: '1.25rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'oklch(0.45 0.02 200)' }}>
            Have questions before you start?
          </span>
          <a
            href="/questions"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#C9A84C',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(201,168,76,0.35)',
              paddingBottom: '1px',
              transition: 'color 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#0D3349';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,168,76,0.7)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#C9A84C';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,168,76,0.35)';
            }}
          >
            See our full FAQ
          </a>
        </div>
      </div>

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
              Take the 15-question CFO Sustainability Investment Readiness Scorecard. Immediate on-page result. No sales call required.
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

      {/* ── DIAGNOSTIC CTA ───────────────────────────────────────────────── */}
      <section style={{ background: 'var(--color-cream)', padding: '80px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}>
            {/* Left: product description */}
            <div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#C9A84C', marginBottom: '1rem',
              }}>
                Structured entry point
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 700,
                color: 'var(--color-slate-deep)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}>
                Start with one decision.
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '1.05rem',
                color: '#4a5568', lineHeight: 1.8, marginBottom: '1.5rem',
              }}>
                You don't need a major program up front. Start with one operating group, one cost category or one decision you're stuck on. The first engagement is a situation assessment that begins data collection and identifies the first low-risk wins.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: '#6b7280', lineHeight: 1.75,
              }}>
                When a material opportunity exists, you decide whether to keep going. When it doesn't, you hear that too.
              </p>
            </div>

            {/* Right: what's included + CTA */}
            <div style={{
              background: 'white',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '16px',
              padding: 'clamp(1.75rem, 4vw, 2.5rem)',
              boxShadow: '0 4px 24px rgba(30,45,47,0.06)',
            }}>
              <Link
                href="/diagnostic"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: '#C9A84C', marginBottom: '1.25rem', textDecoration: 'none', display: 'inline-block',
                }}
              >
                What the Diagnostic delivers
              </Link>
              <div style={{
                borderTop: '1px solid rgba(201,168,76,0.12)',
                paddingTop: '1.5rem',
                display: 'flex', flexDirection: 'column', gap: '1rem',
              }}>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: '#C9A84C', color: '#FAF7F2',
                    fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700,
                    padding: '15px 28px', borderRadius: '8px', textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  Find your Next Best Thing
                  <ArrowRight size={16} strokeWidth={2.5} />
                </a>
                <Link
                  to="/diagnostic"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: '#C9A84C', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
                >
                  Learn more about The Diagnostic →
                </Link>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                  color: '#9ca3af', lineHeight: 1.5,
                }}>
                  Commercial terms agreed in advance. The first conversation is with a principal. No commitment, no sales pitch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #1a2c2e 0%, #243a2e 100%)',
            borderRadius: '16px',
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#C9A84C', marginBottom: '1rem',
              }}>
                Start the protocol
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 700, color: '#FAF7F2', lineHeight: 1.2, marginBottom: '1rem',
              }}>
                A tremendous time to be a customer, if you know what you're doing.
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.95rem',
                color: 'rgba(250,247,242,0.6)', lineHeight: 1.75,
              }}>
                You know what to do next, why it pays and how it gets delivered. Then you know the next one. Independent and vendor neutral by structure. Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data. One conversation is enough to tell whether there is a material opportunity in your operations. No commitment. No sales pitch.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: '#C9A84C', color: '#FAF7F2',
                  fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700,
                  padding: '16px 28px', borderRadius: '8px', textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(201,168,76,0.35)',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                Find your Next Best Thing
                <ArrowRight size={16} strokeWidth={2.5} />
              </a>

            </div>
          </div>
        </div>
            </section>

      <Footer />
    </div>
  );
}

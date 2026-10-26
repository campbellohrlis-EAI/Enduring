// =============================================================================
// ENDURING ADVANTAGE, The Diagnostic Landing Page
// Sage Editorial design: cream background, forest green hero, sage accents
// Standalone entry point for the initial Diagnostic engagement
// =============================================================================
import { useEffect, useRef, useState } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'wouter';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle2, Clock, Shield, TrendingUp, X } from 'lucide-react';
import { trackDiagnosticBookingClick, trackDiagnosticPageView } from '@/lib/analytics';

const FORMSPREE_DIAGNOSTIC = 'https://formspree.io/f/xzdqnbow';

interface BookingForm {
  name: string;
  email: string;
  company: string;
  referralSource: string;
}

const REFERRAL_OPTIONS = [
  'LinkedIn',
  'Referral from a colleague',
  'Google / web search',
  'Industry event or conference',
  'Podcast or webinar',
  'Other',
];

const BOOKING_URL = 'https://calendar.app.google/ozpmtufXwN4uhE2r6';

const OG_IMAGE =
  'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/og-social-share-TjcXvbM8Zm8Zo3haX98724.png';

const DELIVERABLES = [
  { title: 'Situation assessment', desc: 'How your business uses energy, water, materials and capital, and where the easy wins likely sit.' },
  { title: 'Data collection started', desc: 'Your available data loaded into actio, with the gaps that matter named.' },
  { title: 'Low-risk first wins', desc: 'Moves that can be proven with the evidence on hand.' },
  { title: 'Next Best Thing', desc: 'The data-led result of a full-field screen, not a verdict on whichever vendor proposals are already on your desk.' },
  { title: 'Decision summary', desc: 'A short brief your CFO can take to committee.' },
];

const FAQS = [
  {
    q: 'How is the Diagnostic scoped?',
    a: 'Before work begins, we agree the starting data, the decision to be explored, the deliverables and commercial terms. The aim is a clearer next decision, not a larger project than the client needs.',
  },
  {
    q: 'Who do we work with?',
    a: 'Every engagement is principal-to-principal. You work directly with Rob Kirkby or Campbell Ohrlis, not a junior analyst. The first conversation is also with a principal.',
  },
  {
    q: 'What data do you need from us?',
    a: "Whatever you have today. Utility bills, waste manifests, fleet records, building and equipment inventories, or existing emissions and ESG reports are useful starting points. You don't need a complete data room before the first conversation.",
  },
  {
    q: 'Do you just evaluate the vendor proposals we already have?',
    a: 'No. We use any proposals as evidence to test, but they do not define the menu. Your operating and financial data identifies the problem worth solving first. We then screen the full Sustainability Playing Field for the strongest next action.',
  },
  {
    q: 'Do you sell equipment or take referral fees?',
    a: 'We sell no equipment and take no referral fees. Our fee is a retainer plus a share of verified results. Coach and specialist time is passed through at cost. We only earn more when you save more.',
  },
  {
    q: 'What happens after the Diagnostic?',
    a: 'If there is a fit, the work continues as a managed cycle. We deliver the first wins, report the results and name the next move. You can also take the findings and act on them yourself or with another firm.',
  },
];

export default function Diagnostic() {
  useEffect(() => { trackDiagnosticPageView(); }, []);

  useSEO({
    title: 'The Diagnostic, A Structured Sustainability Starting Point',
    description: 'A structured first engagement for CFOs. We assess the situation, begin collecting data, identify low-risk first wins, and name the next action that deserves deeper work.',
    canonicalPath: '/diagnostic',
    ogImage: OG_IMAGE,
    ogType: 'website',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({ name: '', email: '', company: '', referralSource: '' });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [emailTouched, setEmailTouched] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const validateEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : 'Please enter a valid email address';

  const openModal = (source: string) => {
    trackDiagnosticBookingClick(source);
    setModalOpen(true);
    setBookingForm({ name: '', email: '', company: '', referralSource: '' });
    setBookingError(null);
    setEmailErr(null);
    setEmailTouched(false);
  };

  const closeModal = () => setModalOpen(false);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  // Close on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [modalOpen]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateEmail(bookingForm.email);
    setEmailTouched(true);
    setEmailErr(err);
    if (err) return;
    setBookingSubmitting(true);
    setBookingError(null);
    try {
      const res = await fetch(FORMSPREE_DIAGNOSTIC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: bookingForm.name,
          company: bookingForm.company,
          email: bookingForm.email,
          referral_source: bookingForm.referralSource || '(not provided)',
          _subject: `Diagnostic booking enquiry, ${bookingForm.company || bookingForm.name}`,
          type: 'diagnostic_booking',
        }),
      });
      if (res.ok) {
        closeModal();
        window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
      } else {
        setBookingError('Something went wrong, please try again.');
      }
    } catch {
      setBookingError('Network error, please check your connection.');
    } finally {
      setBookingSubmitting(false);
    }
  };

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      <Navigation />

      {/* ── PRE-BOOKING MODAL ─────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          onClick={handleBackdropClick}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(10,26,18,0.72)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
            backdropFilter: 'blur(4px)',
            animation: 'modal-in 0.22s cubic-bezier(0.23,1,0.32,1) both',
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="diag-modal-title"
            style={{
              background: '#fff', borderRadius: '14px',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              width: '100%', maxWidth: '480px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
              position: 'relative',
              animation: 'panel-in 0.28s cubic-bezier(0.23,1,0.32,1) both',
            }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Close"
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#9ca3af', padding: '4px', borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#374151'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#9ca3af'; }}
            >
              <X size={20} />
            </button>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#C9A84C', marginBottom: '0.5rem',
            }}>The Diagnostic</p>
            <h3 id="diag-modal-title" style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '1.35rem', color: '#0D3349',
              marginBottom: '0.4rem', lineHeight: 1.2,
            }}>Find your Next Best Thing</h3>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              color: '#6b7280', lineHeight: 1.6, marginBottom: '1.5rem',
            }}>
              Tell us a little about yourself, and we'll open the booking calendar.
            </p>

            <form onSubmit={handleBookingSubmit} style={{ display: 'grid', gap: '14px' }}>
              {/* Name */}
              {([
                { label: 'Your name', key: 'name' as const, placeholder: 'Jane Smith', required: true },
                { label: 'Company', key: 'company' as const, placeholder: 'Acme Corp', required: true },
              ] as { label: string; key: keyof BookingForm; placeholder: string; required: boolean }[]).map(({ label, key, placeholder, required }) => (
                <div key={key}>
                  <label htmlFor={`diag-${key}`} style={{
                    display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.73rem',
                    fontWeight: 700, color: '#0D3349', marginBottom: '5px',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}>{label}</label>
                  <input
                    id={`diag-${key}`}
                    type="text"
                    placeholder={placeholder}
                    required={required}
                    value={bookingForm[key]}
                    onChange={(e) => setBookingForm((f) => ({ ...f, [key]: e.target.value }))}
                    onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; }}
                    onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; }}
                    style={{
                      width: '100%', padding: '10px 12px',
                      border: '1px solid #e5e7eb', borderRadius: '7px',
                      fontFamily: 'var(--font-body)', fontSize: '0.93rem', color: '#111827',
                      outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
              {/* Email */}
              <div>
                <label htmlFor="diag-email" style={{
                  display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.73rem',
                  fontWeight: 700, color: '#0D3349', marginBottom: '5px',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                }}>Work email</label>
                <input
                  id="diag-email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={bookingForm.email}
                  onChange={(e) => {
                    setBookingForm((f) => ({ ...f, email: e.target.value }));
                    if (emailTouched) setEmailErr(validateEmail(e.target.value));
                  }}
                  onBlur={(e) => {
                    setEmailTouched(true);
                    const err = validateEmail(e.target.value);
                    setEmailErr(err);
                    (e.currentTarget as HTMLElement).style.borderColor = err ? '#b33a2a' : '#e5e7eb';
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      emailTouched && emailErr ? '#b33a2a' : '#C9A84C';
                  }}
                  style={{
                    width: '100%', padding: '10px 12px',
                    border: `1px solid ${emailTouched && emailErr ? '#b33a2a' : '#e5e7eb'}`,
                    borderRadius: '7px',
                    fontFamily: 'var(--font-body)', fontSize: '0.93rem', color: '#111827',
                    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
                  }}
                />
                {emailTouched && emailErr && (
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#b33a2a', margin: '4px 0 0' }}>{emailErr}</p>
                )}
              </div>
              {/* Referral source */}
              <div>
                <label htmlFor="diag-referral" style={{
                  display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.73rem',
                  fontWeight: 700, color: '#0D3349', marginBottom: '5px',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                }}>How did you hear about us? <span style={{ fontWeight: 400, textTransform: 'none', fontSize: '0.72rem', color: '#9ca3af' }}>(optional)</span></label>
                <select
                  id="diag-referral"
                  value={bookingForm.referralSource}
                  onChange={(e) => setBookingForm((f) => ({ ...f, referralSource: e.target.value }))}
                  onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; }}
                  onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; }}
                  style={{
                    width: '100%', padding: '10px 12px',
                    border: '1px solid #e5e7eb', borderRadius: '7px',
                    fontFamily: 'var(--font-body)', fontSize: '0.93rem',
                    color: bookingForm.referralSource ? '#111827' : '#9ca3af',
                    background: '#fff', outline: 'none', transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select one…</option>
                  {REFERRAL_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {bookingError && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#b33a2a', margin: 0 }}>{bookingError}</p>
              )}

              <button
                type="submit"
                disabled={bookingSubmitting}
                style={{
                  width: '100%', padding: '13px',
                  background: bookingSubmitting ? '#7aaa8a' : '#C9A84C',
                  color: '#FAF7F2',
                  fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.97rem',
                  border: 'none', borderRadius: '7px',
                  cursor: bookingSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 4px 16px rgba(201,168,76,0.3)',
                  transition: 'opacity 0.2s, transform 0.15s cubic-bezier(0.23,1,0.32,1)',
                  opacity: bookingSubmitting ? 0.75 : 1,
                  marginTop: '4px',
                }}
                onMouseEnter={(e) => { if (!bookingSubmitting) { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; } }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = bookingSubmitting ? '0.75' : '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                onMouseDown={(e) => { if (!bookingSubmitting) (e.currentTarget as HTMLElement).style.transform = 'translateY(1px) scale(0.98)'; }}
                onMouseUp={(e) => { if (!bookingSubmitting) (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              >
                {bookingSubmitting ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.75s linear infinite' }}>
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Processing…
                  </>
                ) : (
                  <>Continue to booking calendar <ArrowRight size={16} strokeWidth={2.5} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-slate-deep)',
          paddingTop: 'clamp(6rem, 12vw, 9rem)',
          paddingBottom: 'clamp(4rem, 8vw, 6rem)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle texture */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,168,76,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '860px' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#C9A84C', marginBottom: '1.25rem',
          }}>
            A structured starting point
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            fontWeight: 700,
            color: 'var(--color-cream)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            Start with the data you have.
            Build the picture and the next decision from there.
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'rgba(250,247,242,0.72)', lineHeight: 1.8,
            maxWidth: '680px', marginBottom: '2.5rem',
          }}>
            Your utility bills, equipment records, last year's report. That's enough to begin. The Diagnostic is the first engagement. It assesses your situation, starts collecting the data you hold, and finds low-risk first wins that can be proven with the evidence on hand.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDiagnosticBookingClick('hero')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#C9A84C', color: '#FAF7F2',
                fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700,
                padding: '16px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(201,168,76,0.35)',
                transition: 'opacity 0.2s, transform 0.15s', textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.88';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(1px) scale(0.97)'; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            >
              Find your Next Best Thing
              <ArrowRight size={18} strokeWidth={2.5} />
            </a>
            <Link
              to="/services"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: 'rgba(250,247,242,0.55)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.9)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.55)'; }}
            >
              See all services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ─────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: 'var(--color-cream)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            maxWidth: '860px',
          }}>
            {[
              { icon: Clock, label: 'Defined scope', desc: 'The first engagement is scoped around the decision, available data and early wins that matter now.' },
              { icon: Shield, label: 'Commercial terms agreed first', desc: 'We agree the terms before work begins.' },
              { icon: TrendingUp, label: 'First moves identified', desc: 'You leave with clearer low-risk actions and the evidence needed to decide what comes next.' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} style={{
                background: 'white',
                border: '1px solid rgba(201,168,76,0.12)',
                borderRadius: '14px',
                padding: '1.75rem',
                boxShadow: '0 2px 16px rgba(30,45,47,0.05)',
              }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'rgba(201,168,76,0.1)', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <Icon size={22} color="#C9A84C" strokeWidth={1.8} />
                </div>
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700,
                  color: 'var(--color-slate-deep)', marginBottom: '0.5rem',
                }}>{label}</p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.875rem',
                  color: '#6b7280', lineHeight: 1.65,
                }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ──────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: '#f3f4f0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start',
          }}>
            {/* Left: copy */}
            <div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#C9A84C', marginBottom: '1rem',
              }}>
                What you receive
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontWeight: 700,
                color: 'var(--color-slate-deep)',
                lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}>
                The first engagement. Five working outputs.
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '1rem',
                color: '#4a5568', lineHeight: 1.8, marginBottom: '1.5rem',
              }}>
                Every deliverable is built to be used the day it lands, not a slide deck that sits in a drawer.
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: '#6b7280', lineHeight: 1.75, marginBottom: '1.25rem',
                borderLeft: '3px solid rgba(201,168,76,0.5)', paddingLeft: '1rem',
              }}>
                You don't need a full data audit before the Diagnostic starts. It begins the collection work that improves the next answer. If there's a fit, you'll see what ongoing work would involve.
              </p>

            </div>

            {/* Right: deliverables list */}
            <div style={{
              background: 'white',
              border: '1px solid rgba(201,168,76,0.15)',
              borderRadius: '16px',
              padding: 'clamp(1.75rem, 4vw, 2.5rem)',
              boxShadow: '0 4px 24px rgba(30,45,47,0.06)',
            }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {DELIVERABLES.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                    <span style={{
                      flexShrink: 0, width: '22px', height: '22px',
                      background: 'rgba(201,168,76,0.1)', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginTop: '2px',
                    }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-slate-deep)', marginBottom: '0.2rem' }}>
                        {item.title}
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.6 }}>
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div style={{
                borderTop: '1px solid rgba(201,168,76,0.12)',
                paddingTop: '1.5rem',
                display: 'flex', flexDirection: 'column', gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700,
                    color: 'var(--color-slate-deep)',
                  }}>Commercial terms agreed first.</span>
                </div>
                <button
                  onClick={() => {
                    trackDiagnosticBookingClick('deliverables_card');
                    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
                  }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: '#C9A84C', color: '#FAF7F2',
                    fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700,
                    padding: '15px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
                    transition: 'opacity 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '0.88';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = '1';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                  onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(1px) scale(0.97)'; }}
                  onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                >
                  Find your Next Best Thing
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                  color: '#9ca3af', lineHeight: 1.5,
                }}>
                  The first conversation is with a principal. No commitment, no sales pitch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT IS FOR ─────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: 'var(--color-cream)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#C9A84C', marginBottom: '1rem',
          }}>
            Right fit
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 700,
            color: 'var(--color-slate-deep)',
            lineHeight: 1.15,
            marginBottom: '2rem',
          }}>
            A tremendous time to be a customer, if you know what you’re doing.
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}>
            {[
              'You have been given a net-zero or ESG target but no clear path to it.',
              'You are not sure which of the vendor proposals on your desk are worth pursuing.',
              'Your board or investors are asking questions you cannot yet answer with data.',
              'You want a second opinion before signing a long-term sustainability contract.',
              'You have existing data but no confidence it is reliable enough to report on.',
              'You want one clear next move, not another strategy document.',
            ].map((text, i) => (
              <div key={i} style={{
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                background: 'white',
                border: '1px solid rgba(201,168,76,0.1)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}>
                <CheckCircle2 size={18} color="#C9A84C" strokeWidth={2} style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#374151', lineHeight: 1.65 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: '#f3f4f0' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#C9A84C', marginBottom: '1rem',
          }}>
            Common questions
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 700,
            color: 'var(--color-slate-deep)',
            lineHeight: 1.15,
            marginBottom: '2.5rem',
          }}>
            What CFOs ask before booking
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{
                borderTop: i === 0 ? '1px solid rgba(201,168,76,0.15)' : 'none',
                borderBottom: '1px solid rgba(201,168,76,0.15)',
                padding: '1.5rem 0',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700,
                  color: 'var(--color-slate-deep)', marginBottom: '0.625rem',
                }}>
                  {faq.q}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                  color: '#4a5568', lineHeight: 1.75,
                }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPALS STRIP ─────────────────────────────────────────────── */}
      <section style={{ padding: '3rem 0', background: 'var(--color-cream)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: '#C9A84C', marginBottom: '1.25rem', textAlign: 'center',
          }}>
            Who you will speak with
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              {
                name: 'Rob Kirkby',
                title: 'Founder & CEO',
                note: 'Forty-five years in energy economics. Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data. Every first conversation is principal-to-principal.',
                photo: '/manus-storage/RobKirkby_402e0e7f.jpeg',
                linkedin: 'https://www.linkedin.com/in/robert-kirkby-3b7374/',
              },
                  {
                    name: 'Campbell Ohrlis',
                    title: 'VP Partnerships',
                note: 'Operational sustainability and financial performance. No junior hand-offs.',
                photo: '/manus-storage/CampbellOhrlis_da1d067a.jpeg',
                linkedin: 'https://www.linkedin.com/in/campbellohrlis/',
              },
            ].map((person) => (
              <div
                key={person.name}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  background: '#fff',
                  border: '1px solid rgba(201,168,76,0.15)',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  boxShadow: '0 2px 10px rgba(30,45,47,0.05)',
                }}
              >
                <img
                  src={person.photo}
                  alt={person.name}
                  width="56"
                  height="56"
                  loading="lazy"
                  style={{
                    width: '56px', height: '56px',
                    borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
                    boxShadow: '0 0 0 2.5px #C9A84C, 0 0 0 4.5px rgba(201,168,76,0.15)',
                  }}
                />
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-slate-deep)', marginBottom: '0.2rem' }}>
                    {person.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0D3349', marginBottom: '0.4rem' }}>
                    {person.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.6, marginBottom: '0.6rem' }}>
                    {person.note}
                  </p>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700,
                      color: '#0A66C2', textDecoration: 'none',
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--color-slate-deep)',
        padding: 'clamp(4rem, 8vw, 6rem) 0',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: 'var(--color-cream)',
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}>
            Start with the data you have.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: 'rgba(250,247,242,0.65)', lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            By the end, you'll know the one project that pays, the evidence behind it and what it takes to deliver. Then the next one.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1rem',
            color: 'rgba(250,247,242,0.65)', lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            No commitment. No sales pitch. A conversation with a principal to clarify the decision and say whether there's likely a material opportunity.
          </p>
          <button
            onClick={() => {
              trackDiagnosticBookingClick('final_cta');
              window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
            }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#C9A84C', color: '#FAF7F2',
              fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 700,
              padding: '18px 36px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 28px rgba(201,168,76,0.4)',
              transition: 'opacity 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.88';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
            onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(1px) scale(0.97)'; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
          >
            Find your Next Best Thing
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

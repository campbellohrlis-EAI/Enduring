// =============================================================================
// ENDURING ADVANTAGE, Partner Application Thank You Page (/partners/thank-you)
// Standalone page, no shared nav/footer
// Design: deep forest green, cream, sage accents, matches /partners
// =============================================================================

import { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { trackEvent } from '@/lib/analytics';
import { CheckCircle, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

const BOOKING_URL = 'https://calendar.app.google/ozpmtufXwN4uhE2r6';

const C = {
  forest:  '#1A2E22',
  forest2: '#122019',
  sage:    '#C9A84C',
  sageLight: '#86BFAA',
  cream:   '#FAF7F2',
  ink:     '#0D3349',
  muted:   '#5a6b64',
  line:    '#d7e6de',
};

export default function PartnersThankYou() {
  useEffect(() => {
    trackEvent('partner_application_submitted', { page: 'partners_thank_you' });
  }, []);

  useSEO({
    title: 'Application Received, Enduring Advantage Partner Program',
    description: 'Thank you for applying to the Enduring Advantage partner program.',
    canonicalPath: '/partners/thank-you',
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: C.forest,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-body)',
    }}>

      {/* ── MINIMAL NAV ──────────────────────────────────────────────────── */}
      <nav style={{
        borderBottom: '1px solid rgba(134,191,170,0.12)',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1060px',
        margin: '0 auto',
        width: '100%',
      }}>
        <a href="https://enduringadvantage.com" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/manus-storage/ea-logo-v5_4fa83e5f.webp"
            alt="Enduring Advantage"
            style={{ height: '42px', filter: 'brightness(0) invert(1)', opacity: 0.92 }}
          />
        </a>
        <a
          href="/partners"
          style={{
            fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600,
            color: 'rgba(250,247,242,0.55)', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = C.sageLight; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.55)'; }}
        >
          <ArrowLeft size={13} strokeWidth={2} /> Back to Partner page
        </a>
      </nav>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px 80px',
      }}>
        <div style={{ maxWidth: '620px', width: '100%', textAlign: 'center' }}>

          {/* Check icon */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(134,191,170,0.15)',
            border: '2px solid rgba(134,191,170,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px',
          }}>
            <CheckCircle size={38} strokeWidth={1.5} style={{ color: C.sageLight }} />
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Application received.
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'rgba(250,247,242,0.7)',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
            maxWidth: '52ch',
            margin: '0 auto 2.5rem',
          }}>
            Campbell will be in touch within one business day with your number in writing and the white label kit.
          </p>

          {/* Divider */}
          <div style={{
            width: '48px', height: '2px',
            background: 'rgba(134,191,170,0.3)',
            margin: '0 auto 2.5rem',
          }} />

          {/* Booking CTA card */}
          <div style={{
            background: 'rgba(250,247,242,0.05)',
            border: '1px solid rgba(134,191,170,0.2)',
            borderRadius: '14px',
            padding: '36px 32px',
            marginBottom: '2rem',
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: 'rgba(134,191,170,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <Calendar size={22} strokeWidth={1.8} style={{ color: C.sageLight }} />
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.6rem',
            }}>
              Talk sooner.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.97rem',
              color: 'rgba(250,247,242,0.65)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              maxWidth: '44ch',
              margin: '0 auto 1.5rem',
            }}>
              Book a conversation with Campbell directly. You leave with your number, the kit, and what to say to your first client.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('partner_booking_click', { source: 'thank_you_page' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '1rem',
                background: C.sageLight, color: '#10231a',
                padding: '14px 28px', borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(134,191,170,0.25)',
                transition: 'opacity 0.2s, transform 0.15s cubic-bezier(0.23,1,0.32,1)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.88';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(1px) scale(0.98)'; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1)'; }}
            >
              <Calendar size={17} strokeWidth={2.5} />
              Book a time with Campbell
              <ArrowRight size={17} strokeWidth={2.5} />
            </a>
          </div>

          {/* Secondary links */}
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/partners"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
                color: 'rgba(250,247,242,0.45)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = C.sageLight; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.45)'; }}
            >
              ← Back to Partner page
            </a>
            <a
              href="/"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600,
                color: 'rgba(250,247,242,0.45)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = C.sageLight; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.45)'; }}
            >
              Visit the main site →
            </a>
          </div>
        </div>
      </main>

      {/* ── MINIMAL FOOTER ───────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(134,191,170,0.1)',
        padding: '20px 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.78rem',
          color: 'rgba(134,191,170,0.35)', margin: 0,
        }}>
          © {new Date().getFullYear()} Enduring Advantage Inc. · Part of the Energy Advantage group.
        </p>
      </footer>

    </div>
  );
}

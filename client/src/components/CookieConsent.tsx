// ENDURING ADVANTAGE, CookieConsent
// Design: Dark slate banner anchored to bottom of viewport, slides up on first visit.
// "Manage preferences" opens an inline modal with per-category toggles.
// Integrates with Google Consent Mode v2 to gate GTM analytics/ad tags.
// Persists decision in localStorage under key "ea_cookie_consent_v2".
// ============================================================================

import { useState, useEffect } from 'react';

interface ConsentPrefs {
  analytics: boolean;
  advertising: boolean;
}

type ConsentState = 'pending' | 'saved';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const STORAGE_KEY = 'ea_cookie_consent_v2';

function pushConsent(prefs: ConsentPrefs) {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
      ad_storage: prefs.advertising ? 'granted' : 'denied',
      ad_user_data: prefs.advertising ? 'granted' : 'denied',
      ad_personalization: prefs.advertising ? 'granted' : 'denied',
    });
    return;
  }

  window.dataLayer.push({
    event: 'consent_update',
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    ad_storage: prefs.advertising ? 'granted' : 'denied',
    ad_user_data: prefs.advertising ? 'granted' : 'denied',
    ad_personalization: prefs.advertising ? 'granted' : 'denied',
  });
}

// ─── Toggle switch ────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      id={id}
      onClick={() => onChange(!checked)}
      style={{
        position: 'relative',
        width: '42px',
        height: '24px',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        background: checked ? '#4a9e6e' : 'rgba(255,255,255,0.15)',
        transition: 'background 200ms ease',
        flexShrink: 0,
        outline: 'none',
      }}
      onFocus={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 0 2px rgba(74,158,110,0.5)'; }}
      onBlur={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'; }}
    >
      <span
        style={{
          position: 'absolute',
          top: '3px',
          left: checked ? '21px' : '3px',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 200ms cubic-bezier(0.23, 1, 0.32, 1)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }}
      />
    </button>
  );
}

// ─── Preference row ───────────────────────────────────────────────────────────
function PrefRow({
  id, label, description, checked, onChange, locked,
}: {
  id: string; label: string; description: string;
  checked: boolean; onChange?: (v: boolean) => void; locked?: boolean;
}) {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ flex: 1 }}>
        <label
          htmlFor={id}
          style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: 'rgba(230,220,200,0.95)', fontFamily: 'Nunito Sans, sans-serif', marginBottom: '4px', cursor: locked ? 'default' : 'pointer' }}
        >
          {label}
          {locked && (
            <span style={{ marginLeft: '8px', fontSize: '11px', fontWeight: 500, color: 'rgba(74,158,110,0.9)', background: 'rgba(74,158,110,0.12)', padding: '1px 7px', borderRadius: '10px' }}>
              Always on
            </span>
          )}
        </label>
        <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.55', color: 'rgba(230,220,200,0.55)', fontFamily: 'Nunito Sans, sans-serif' }}>
          {description}
        </p>
      </div>
      {locked ? (
        <div style={{ width: '42px', height: '24px', borderRadius: '12px', background: 'rgba(74,158,110,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '3px', flexShrink: 0 }}>
          <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#fff', opacity: 0.5 }} />
        </div>
      ) : (
        <Toggle id={id} checked={checked} onChange={onChange!} />
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CookieConsent() {
  const [state, setState] = useState<ConsentState>('pending');
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>({ analytics: false, advertising: false });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ConsentPrefs;
        setState('saved');
        pushConsent(parsed);
      } catch {
        // corrupted, show banner again
      }
    } else {
      const t = setTimeout(() => setBannerVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function savePrefs(p: ConsentPrefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    window.dispatchEvent(new Event('ea:cookie-consent-saved'));
    pushConsent(p);
    setState('saved');
    setBannerVisible(false);
    setModalOpen(false);
  }

  function handleAcceptAll() {
    const all: ConsentPrefs = { analytics: true, advertising: true };
    setPrefs(all);
    savePrefs(all);
  }

  function handleDeclineAll() {
    const none: ConsentPrefs = { analytics: false, advertising: false };
    setPrefs(none);
    savePrefs(none);
  }

  function handleSavePrefs() {
    savePrefs(prefs);
  }

  if (state === 'saved') return null;

  // ── shared button styles ──
  const btnBase: React.CSSProperties = {
    padding: '9px 18px',
    borderRadius: '6px',
    fontSize: '13px',
    fontFamily: 'Nunito Sans, sans-serif',
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '0.02em',
    transition: 'background 160ms ease, border-color 160ms ease, color 160ms ease, transform 100ms ease',
  };

  return (
    <>
      {/* ── Banner ── */}
      <div
        role="dialog"
        aria-label="Cookie consent"
        aria-live="polite"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9998,
          transform: bannerVisible && !modalOpen ? 'translateY(0)' : 'translateY(110%)',
          opacity: bannerVisible && !modalOpen ? 1 : 0,
          transition: 'transform 320ms cubic-bezier(0.23, 1, 0.32, 1), opacity 280ms ease-out',
          pointerEvents: bannerVisible && !modalOpen ? 'auto' : 'none',
        }}
      >
        <div style={{ background: 'rgba(18,28,30,0.97)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 -8px 32px rgba(0,0,0,0.35)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }} aria-hidden="true">🍪</span>
            <p style={{ flex: 1, minWidth: '220px', margin: 0, fontSize: '13px', lineHeight: '1.6', color: 'rgba(230,220,200,0.82)', fontFamily: 'Nunito Sans, sans-serif' }}>
              We use cookies to understand how visitors use this site and to improve your experience.{' '}
              <a href="/privacy-policy" style={{ color: '#7ec8a0', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Privacy Policy</a>
            </p>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0, flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                onClick={() => { setBannerVisible(false); setModalOpen(true); }}
                style={{ ...btnBase, padding: '9px 16px', border: 'none', background: 'transparent', color: 'rgba(230,220,200,0.6)', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 500 }}
              >
                Manage preferences
              </button>
              <button
                onClick={handleDeclineAll}
                style={{ ...btnBase, border: '1px solid rgba(255,255,255,0.18)', background: 'transparent', color: 'rgba(230,220,200,0.75)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.4)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(230,220,200,1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.18)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(230,220,200,0.75)'; }}
                onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
              >
                Decline
              </button>
              <button
                onClick={handleAcceptAll}
                style={{ ...btnBase, border: '1px solid transparent', background: '#4a9e6e', color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#3d8a5e'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#4a9e6e'; }}
                onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Preferences modal ── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 16px 0', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) { setModalOpen(false); setBannerVisible(true); } }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
              background: 'rgba(18,28,30,0.98)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '16px 16px 0 0',
              border: '1px solid rgba(255,255,255,0.1)',
              borderBottom: 'none',
              boxShadow: '0 -16px 48px rgba(0,0,0,0.5)',
              maxHeight: '90vh',
              overflowY: 'auto',
              animation: 'slideUpModal 280ms cubic-bezier(0.23,1,0.32,1) both',
            }}
            onClick={e => e.stopPropagation()}
          >
            <style>{`@keyframes slideUpModal { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

            {/* Header */}
            <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: 'rgba(230,220,200,0.95)', fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.01em' }}>
                  Cookie Preferences
                </h2>
                <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'rgba(230,220,200,0.5)', fontFamily: 'Nunito Sans, sans-serif', lineHeight: '1.5' }}>
                  Choose which types of cookies you allow. Essential cookies are always active.{' '}
                  <a href="/privacy-policy" style={{ color: '#7ec8a0', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Privacy Policy</a>
                </p>
              </div>
              <button
                onClick={() => { setModalOpen(false); setBannerVisible(true); }}
                aria-label="Close preferences"
                style={{ background: 'none', border: 'none', color: 'rgba(230,220,200,0.4)', cursor: 'pointer', fontSize: '20px', lineHeight: 1, padding: '4px', marginTop: '-2px', transition: 'color 150ms ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(230,220,200,0.9)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(230,220,200,0.4)'; }}
              >
                ✕
              </button>
            </div>

            {/* Rows */}
            <div style={{ padding: '0 24px' }}>
              <PrefRow
                id="pref-essential"
                label="Essential cookies"
                description="Required for the site to function, session management, security, and navigation. These cannot be disabled."
                checked={true}
                locked={true}
              />
              <PrefRow
                id="pref-analytics"
                label="Analytics cookies"
                description="Help us understand how visitors interact with the site (pages visited, time on page, referral source). Used via Google Analytics through GTM."
                checked={prefs.analytics}
                onChange={v => setPrefs(p => ({ ...p, analytics: v }))}
              />
              <PrefRow
                id="pref-advertising"
                label="Advertising cookies"
                description="Allow us to measure ad campaign performance and show relevant content. Includes ad_storage and ad_personalization signals sent to Google."
                checked={prefs.advertising}
                onChange={v => setPrefs(p => ({ ...p, advertising: v }))}
              />
            </div>

            {/* Footer actions */}
            <div style={{ padding: '20px 24px 28px', display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                onClick={handleDeclineAll}
                style={{ ...btnBase, border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'rgba(230,220,200,0.65)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(230,220,200,1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(230,220,200,0.65)'; }}
              >
                Decline all
              </button>
              <button
                onClick={handleSavePrefs}
                style={{ ...btnBase, border: '1px solid rgba(74,158,110,0.5)', background: 'rgba(74,158,110,0.15)', color: '#7ec8a0' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(74,158,110,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(74,158,110,0.15)'; }}
              >
                Save preferences
              </button>
              <button
                onClick={handleAcceptAll}
                style={{ ...btnBase, border: '1px solid transparent', background: '#4a9e6e', color: '#fff' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#3d8a5e'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#4a9e6e'; }}
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

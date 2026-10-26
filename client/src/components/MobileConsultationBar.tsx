// ENDURING ADVANTAGE, mobile sticky consultation action
// Design reminder: a single practical action in navy and gold; hidden above mobile breakpoint.

import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

const CAMPBELL_EMAIL = 'campbell.ohrlis@enduringadvantage.com';
const CONSENT_KEY = 'ea_cookie_consent_v2';

export default function MobileConsultationBar({ context = 'this decision' }: { context?: string }) {
  const [consentSaved, setConsentSaved] = useState(false);

  useEffect(() => {
    const syncConsent = () => setConsentSaved(Boolean(localStorage.getItem(CONSENT_KEY)));
    syncConsent();
    window.addEventListener('ea:cookie-consent-saved', syncConsent);
    return () => window.removeEventListener('ea:cookie-consent-saved', syncConsent);
  }, []);

  if (!consentSaved) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-[rgba(201,168,76,0.28)] bg-[#0D3349]/95 px-3 py-2.5 shadow-[0_-10px_28px_rgba(13,51,73,0.22)] backdrop-blur md:hidden" style={{ paddingBottom: 'max(0.65rem, env(safe-area-inset-bottom))' }}>
      <div className="mx-auto mb-2.5 max-w-md text-center">
        <p className="m-0" style={{ color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.35 }}>The decision in front of you is enough to start.</p>
        <p className="mt-1 mb-0" style={{ color: 'rgba(250,247,242,0.76)', fontFamily: 'var(--font-body)', fontSize: '0.74rem', lineHeight: 1.4 }}>Tell Campbell the site, portfolio or operating question you are stuck on. He will say whether a conversation makes sense.</p>
      </div>
      <a
        href={`mailto:${CAMPBELL_EMAIL}`}
        className="flex w-full items-center justify-center gap-2 active:scale-[0.98]"
        style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #a8882e 100%)', color: '#FAF7F2', fontFamily: 'var(--font-body)', fontSize: '0.91rem', fontWeight: 700, letterSpacing: '0.01em', minHeight: '46px', textDecoration: 'none' }}
        aria-label={`Email Campbell directly about ${context}`}
      >
        <Mail size={17} strokeWidth={2.15} /> Email Campbell directly
      </a>
    </div>
  );
}

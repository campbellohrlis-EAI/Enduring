import { useEffect } from 'react';

const STORAGE_KEY = 'ea_cookie_consent_v2';
const GTM_ID = 'GTM-T2WF3QMW';

interface ConsentPrefs {
  analytics: boolean;
  advertising: boolean;
}

declare global {
  interface Window {
    eaAnalyticsLoaded?: boolean;
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

function getStoredConsent(): ConsentPrefs | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<ConsentPrefs>;
    return {
      analytics: parsed.analytics === true,
      advertising: parsed.advertising === true,
    };
  } catch {
    return null;
  }
}

function applyConsent(prefs: ConsentPrefs) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => {
    window.dataLayer.push({ event: 'gtag', args });
  });
  window.gtag?.('consent', 'update', {
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    ad_storage: prefs.advertising ? 'granted' : 'denied',
    ad_user_data: prefs.advertising ? 'granted' : 'denied',
    ad_personalization: prefs.advertising ? 'granted' : 'denied',
  });
}

function loadTagManager() {
  if (window.eaAnalyticsLoaded) return;
  window.eaAnalyticsLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  script.dataset.eaAnalytics = 'true';
  document.head.appendChild(script);
}

/**
 * Keeps optional analytics out of the critical rendering path. Tags load only
 * after a visitor has made a consent choice that permits analytics or ads.
 */
export default function ConsentAnalytics() {
  useEffect(() => {
    const reconcile = () => {
      const prefs = getStoredConsent();
      if (!prefs) return;
      applyConsent(prefs);
      if (prefs.analytics || prefs.advertising) loadTagManager();
    };

    reconcile();
    window.addEventListener('ea:cookie-consent-saved', reconcile);
    return () => window.removeEventListener('ea:cookie-consent-saved', reconcile);
  }, []);

  return null;
}

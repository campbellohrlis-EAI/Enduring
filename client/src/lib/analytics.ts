// =============================================================================
// ENDURING ADVANTAGE, Analytics utility
// Thin wrapper around window.gtag for GA4 event tracking
// GA4 Measurement ID: G-9H14JB4K1B
// =============================================================================

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer: Record<string, unknown>[];
  }
}

/** Fire a GA4 event, with a direct GTM dataLayer fallback when gtag is not present. */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params ?? {});
    return;
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...(params ?? {}) });
  }
}

// ── Pre-defined conversion events ────────────────────────────────────────────

/** Fired when a user clicks any "Book The Diagnostic" CTA */
export function trackDiagnosticBookingClick(source: string) {
  trackEvent('diagnostic_booking_click', {
    event_category: 'conversion',
    event_label: source,
  });
}

/** Fired when a user visits /diagnostic */
export function trackDiagnosticPageView() {
  trackEvent('diagnostic_page_view', {
    event_category: 'engagement',
    event_label: 'diagnostic_landing',
  });
}

/** Fired when a user clicks "Get in Touch" nav CTA */
export function trackContactClick(source: string) {
  trackEvent('contact_click', {
    event_category: 'conversion',
    event_label: source,
  });
}

/**
 * Fired when a user selects a booking path from the Request Triage dropdown.
 * @param path  'form' | 'direct_booking'
 * @param source  Where the dropdown was triggered: 'nav' | 'hero' | 'contact'
 */
export function trackTriagePathChosen(
  path: 'form' | 'direct_booking',
  source: 'nav' | 'hero' | 'contact',
) {
  trackEvent('triage_path_chosen', {
    event_category: 'conversion',
    event_label: `${source}_${path}`,
    path,
  source,
  });
}

/**
 * Fired when a user expands an FAQ accordion item.
 * @param question  The question text
 * @param source  Where the FAQ is shown: 'scorecard' | 'questions_page'
 */
export function trackFaqOpened(question: string, source: 'scorecard' | 'questions_page') {
  trackEvent('faq_opened', {
    event_category: 'engagement',
    event_label: question.slice(0, 80),
    source,
  });
}

/**
 * Fired when a user clicks a category filter chip on the Questions page.
 * @param category  The category heading
 */
export function trackFaqCategorySelected(category: string) {
  trackEvent('faq_category_selected', {
    event_category: 'engagement',
    event_label: category,
  });
}

/** Fired once when a visitor begins the six-step checklist lead form. */
export function trackChecklistFormStarted(sector: string) {
  trackEvent('checklist_form_start', {
    event_category: 'conversion',
    event_label: sector,
    sector,
  });
}

/** Fired after a valid six-step checklist lead form submission is initiated. */
export function trackChecklistFormSubmitted(sector: string, role: string) {
  trackEvent('checklist_form_submit', {
    event_category: 'conversion',
    event_label: sector,
    sector,
    role,
  });
}

/** Fired when a visitor chooses to download or print a sector-specific checklist PDF. */
export function trackChecklistPdfDownloaded(sector: string, method: 'download' | 'print') {
  trackEvent('checklist_pdf_download', {
    event_category: 'conversion',
    event_label: `${sector}_${method}`,
    sector,
    method,
  });
}

/** Fired when a visitor downloads a direct Supply Chain worksheet PDF. */
export function trackSupplyChainChecklistDownloaded(
  checklist: 'freight_procurement' | 'municipal_supply_chain',
  source: 'supply_chain_article' | 'supply_chain_hub' | 'cfo' | 'partners',
) {
  trackEvent('supply_chain_checklist_download', {
    event_category: 'conversion',
    event_label: `${checklist}_${source}`,
    checklist,
    source,
  });
}

/** Fired when a reader shares an article through a social, copy, or native-share action. */
export function trackArticleShared(
  articleSlug: string,
  channel: 'linkedin' | 'x' | 'email' | 'copy_link' | 'copy_excerpt' | 'native_share',
  surface: 'article_header' | 'article_end' | 'floating_action',
) {
  trackEvent('article_shared', {
    event_category: 'engagement',
    event_label: `${articleSlug}_${channel}`,
    article_slug: articleSlug,
    share_channel: channel,
    share_surface: surface,
  });
}

/** Fired when a visitor takes a primary action from the Sustainability Playing Field. */
export function trackPlayingFieldCtaClick(
  source: 'hero_booking' | 'diagram_download' | 'six_step_process' | 'process_booking',
) {
  const params = {
    event_category: 'conversion',
    event_label: source,
    page: 'playing_field',
    source,
  };

  // GTM custom-event triggers require a named object in the dataLayer, rather
  // than a gtag command wrapper. This preserves the conversion payload in
  // Tag Assistant even before the Google library has finished loading.
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: 'playing_field_cta_click', ...params });
    return;
  }

  trackEvent('playing_field_cta_click', params);
}

import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackPlayingFieldCtaClick } from './analytics';

const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'window');

afterEach(() => {
  if (windowDescriptor) {
    Object.defineProperty(globalThis, 'window', windowDescriptor);
  } else {
    Reflect.deleteProperty(globalThis, 'window');
  }
});

describe('Playing Field conversion analytics', () => {
  it('records the diagram download as a named GTM dataLayer conversion', () => {
    const gtag = vi.fn();
    const dataLayer: Record<string, unknown>[] = [];
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: { dataLayer, gtag },
    });

    trackPlayingFieldCtaClick('diagram_download');

    expect(dataLayer).toContainEqual({
      event: 'playing_field_cta_click',
      event_category: 'conversion',
      event_label: 'diagram_download',
      page: 'playing_field',
      source: 'diagram_download',
    });
    expect(gtag).not.toHaveBeenCalled();
  });

  it('pushes the named conversion into the GTM dataLayer when gtag is unavailable', () => {
    const dataLayer: Record<string, unknown>[] = [];
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: { dataLayer },
    });

    trackPlayingFieldCtaClick('hero_booking');

    expect(dataLayer).toContainEqual({
      event: 'playing_field_cta_click',
      event_category: 'conversion',
      event_label: 'hero_booking',
      page: 'playing_field',
      source: 'hero_booking',
    });
  });
});

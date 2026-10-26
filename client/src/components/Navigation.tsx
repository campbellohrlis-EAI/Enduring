// =============================================================================
// ENDURING ADVANTAGE, Navigation Component
// Navy-and-gold editorial design: cream background, financial decision hierarchy, Nunito Sans
// Simplified to core buying journey: Services | Case Studies | About
// Everything else lives in the footer
// "Request Triage" CTA has a dropdown: Contact form | Direct Outlook booking
// =============================================================================

import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { trackTriagePathChosen } from '@/lib/analytics';
import { Bookmark, ChevronDown, Calendar, FileText, Search } from 'lucide-react';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { useLocation, Link } from 'wouter';
import { icpNavigationItems } from '@/lib/icpNavigation';

// The research index is substantial. It is loaded on demand when a visitor
// invokes search rather than competing with the homepage for first-paint time.
const CommandPalette = lazy(() => import('@/components/CommandPalette'));

const OUTLOOK_BOOKING_URL = 'https://calendar.app.google/ozpmtufXwN4uhE2r6';

const coreNavLinks = [
  { label: 'Services', href: '/services', isAnchor: false },
  { label: 'Scorecard', href: '/scorecard', isAnchor: false },
  { label: 'Partners', href: '/partners', isAnchor: false },
  { label: 'About', href: '/about', isAnchor: false },
  { label: 'FAQ', href: '/questions', isAnchor: false },
];

interface NavigationProps {
  onOpenReadingList?: () => void;
  onOpenSearch?: () => void;
  onOpenCalendly?: () => void;
}

export default function Navigation({ onOpenReadingList, onOpenSearch, onOpenCalendly }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [internalSearchOpen, setInternalSearchOpen] = useState(false);
  const [triageOpen, setTriageOpen] = useState(false);
  const [audiencesOpen, setAudiencesOpen] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const triageRef = useRef<HTMLDivElement>(null);
  const audiencesRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const { bookmarks } = useBookmarks();
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(media.matches);
    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (triageRef.current && !triageRef.current.contains(e.target as Node)) {
        setTriageOpen(false);
      }
      if (audiencesRef.current && !audiencesRef.current.contains(e.target as Node)) {
        setAudiencesOpen(false);
      }
      if (articlesRef.current && !articlesRef.current.contains(e.target as Node)) {
        setArticlesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNavClick = (href: string, isAnchor = true) => {
    setMobileOpen(false);
    if (!isAnchor) {
      navigate(href);
      const hash = href.split('#')[1];
      if (hash) {
        window.setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openInsightSearch = () => {
    setMobileOpen(false);
    if (onOpenSearch) {
      onOpenSearch();
      return;
    }
    setInternalSearchOpen(true);
  };

  const textColor = 'var(--color-navy, #0D3349)';

  const navLinkStyle = {
    fontFamily: 'var(--font-body)',
    color: textColor,
    letterSpacing: '0.04em',
    borderBottom: '2px solid transparent',
    paddingBottom: '2px',
    transition: 'color 0.2s, border-color 0.2s',
  };

  return (
    <>
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.97)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(13, 51, 73, 0.12)',
        boxShadow: '0 2px 16px rgba(13, 51, 73, 0.08)',
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center group"
            style={{ textDecoration: 'none' }}
            onClick={() => { if (window.location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <img
              src="/manus-storage/ea-logo-v5_4fa83e5f.webp"
              alt="Enduring Advantage, The Right Things in the Right Order"
              width="200"
              height="68"
              style={{
                height: '68px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'none',
              }}
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {coreNavLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.isAnchor)}
                className="text-sm font-medium tracking-wide transition-colours duration-200 hover:opacity-70"
                style={navLinkStyle}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={openInsightSearch}
              aria-label="Search sustainability insights"
              className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colours duration-200 hover:opacity-70"
              style={navLinkStyle}
            >
              <Search size={15} strokeWidth={2.1} />
              <span className="hidden xl:inline">Search insights</span>
            </button>

            <div ref={articlesRef} className="relative">
              <button
                onClick={() => setArticlesOpen((open) => !open)}
                aria-expanded={articlesOpen}
                aria-haspopup="menu"
                className="inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colours duration-200 hover:opacity-70"
                style={navLinkStyle}
              >
                Articles
                <ChevronDown size={14} strokeWidth={2.3} style={{ transition: 'transform 180ms ease', transform: articlesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              <div
                role="menu"
                className="absolute left-1/2 mt-3 overflow-hidden"
                style={{
                  width: '320px', background: '#FFFFFF', border: '1px solid rgba(201,168,76,0.24)', boxShadow: '0 12px 36px rgba(13,51,73,0.14)',
                  opacity: articlesOpen ? 1 : 0, pointerEvents: articlesOpen ? 'auto' : 'none',
                  transform: articlesOpen ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(-6px) scale(0.97)',
                  transformOrigin: 'top centre', transition: 'opacity 170ms ease, transform 200ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              >
                <button role="menuitem" onClick={() => { setArticlesOpen(false); handleNavClick('/articles', false); }} className="w-full text-left transition-colours duration-150 hover:bg-[#F7F4EF]" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 700, padding: '0.88rem 0.95rem' }}>
                  All articles &amp; research
                </button>
              </div>
            </div>

            {/* Who We Help, audience-specific landing pages */}
            <div ref={audiencesRef} className="relative">
              <button
                onClick={() => setAudiencesOpen((open) => !open)}
                aria-expanded={audiencesOpen}
                aria-haspopup="menu"
                className="inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colours duration-200 hover:opacity-70"
                style={navLinkStyle}
              >
                Who We Help
                <ChevronDown size={14} strokeWidth={2.3} style={{ transition: 'transform 180ms ease', transform: audiencesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              <div
                role="menu"
                className="absolute left-1/2 mt-3 overflow-hidden"
                style={{
                  width: '248px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(201,168,76,0.24)',
                  boxShadow: '0 12px 36px rgba(13,51,73,0.14)',
                  opacity: audiencesOpen ? 1 : 0,
                  pointerEvents: audiencesOpen ? 'auto' : 'none',
                  transform: audiencesOpen ? 'translateX(-50%) translateY(0) scale(1)' : 'translateX(-50%) translateY(-6px) scale(0.97)',
                  transformOrigin: 'top centre',
                  transition: 'opacity 170ms ease, transform 200ms cubic-bezier(0.23, 1, 0.32, 1)',
                }}
              >
                <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.64rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', padding: '0.85rem 0.95rem 0.45rem', margin: 0 }}>Choose your context</p>
                {icpNavigationItems.map((item) => (
                  <button
                    key={item.route}
                    role="menuitem"
                    onClick={() => { setAudiencesOpen(false); handleNavClick(item.route, false); }}
                    className="w-full text-left transition-colours duration-150 hover:bg-[#F7F4EF]"
                    style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 600, padding: '0.72rem 0.95rem' }}
                  >
                    {item.navLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading list */}
            <button
              onClick={onOpenReadingList}
              title="Reading list"
              aria-label={`Reading list${bookmarks.length > 0 ? ` (${bookmarks.length} saved)` : ''}`}
              className="relative flex items-center justify-center rounded-full transition-all duration-200 active:scale-90 hover:opacity-80"
              style={{
                width: '36px',
                height: '36px',
                background: 'rgba(13,51,73,0.07)',
                border: '1.5px solid rgba(13,51,73,0.18)',
                color: 'var(--color-navy, #0D3349)',
              }}
            >
              <Bookmark size={15} strokeWidth={2.2} />
              {bookmarks.length > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    width: '17px', height: '17px',
                    background: '#C9A84C', color: '#FAF7F2',
                    fontFamily: 'var(--font-body)', fontSize: '0.6rem', lineHeight: 1,
                  }}
                >
                  {bookmarks.length > 9 ? '9+' : bookmarks.length}
                </span>
              )}
            </button>

            {/* Primary CTA, Request Triage (with dropdown) */}
            <div ref={triageRef} className="relative">
              <div
                    className="flex items-center rounded overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #C9A84C 0%, #a8882e 100%)',
                    }}
                  >
                {/* Main label, direct booking */}
                <a
                  href={OUTLOOK_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { setTriageOpen(false); trackTriagePathChosen('direct_booking', 'nav'); }}
                  className="px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-cream)',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                  }}
                >
                  Find your Next Best Thing
                </a>

                {/* Divider */}
                <span className="w-px self-stretch" style={{ background: 'rgba(250,247,242,0.25)' }} />

                {/* Chevron toggle with tooltip */}
                <div className="relative group/chevron">
                  <button
                    onClick={() => setTriageOpen((o) => !o)}
                    aria-label="More booking options"
                    aria-expanded={triageOpen}
                    className="px-2.5 py-2.5 flex items-center justify-center transition-all duration-200 hover:brightness-110 active:scale-95"
                    style={{ color: 'var(--color-cream)' }}
                  >
                    <ChevronDown
                      size={14}
                      strokeWidth={2.5}
                      className="transition-transform duration-200"
                      style={{ transform: triageOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  {/* Tooltip, shown on group-hover via Tailwind group/chevron */}
                  <div className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md px-2.5 py-1.5 font-sans font-medium opacity-0 group-hover/chevron:opacity-100 translate-y-1 group-hover/chevron:translate-y-0 scale-95 group-hover/chevron:scale-100 transition-all duration-150 ease-out"
                    style={{
                      background: '#0D3349',
                      color: '#FAF7F2',
                      fontSize: '11px',
                      letterSpacing: '0.02em',
                      boxShadow: '0 4px 12px rgba(28,43,43,0.18)',
                    }}
                  >
                    More options
                    <span
                      className="absolute top-full right-3"
                      style={{
                        width: 0, height: 0,
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: '5px solid #0D3349',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Dropdown panel */}
              <div
                className="absolute right-0 mt-2 w-64 rounded-xl border overflow-hidden"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(201,168,76,0.15)',
                  boxShadow: '0 8px 32px rgba(28,43,43,0.12), 0 2px 8px rgba(28,43,43,0.06)',
                  transformOrigin: 'top right',
                  transform: triageOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-6px)',
                  opacity: triageOpen ? 1 : 0,
                  pointerEvents: triageOpen ? 'auto' : 'none',
                  transition: 'transform 220ms cubic-bezier(0.23,1,0.32,1), opacity 180ms ease',
                }}
              >
                <div className="px-3 pt-3 pb-1">
                  <p className="text-[10px] font-sans font-semibold tracking-[0.14em] uppercase text-[#9B9B8A] px-1">
                    Start the conversation.
                  </p>
                </div>

                {/* Option 1, Contact form */}
                <button
                  onClick={() => { setTriageOpen(false); trackTriagePathChosen('form', 'nav'); handleNavClick('/contact', false); }}
                  className="group w-full flex items-start gap-3 px-3 py-3 text-left transition-colours duration-150 hover:bg-[#F7F4EF]"
                >
                  <span
                    className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colours duration-150 group-hover:bg-[#C9A84C]/10"
                    style={{ background: 'rgba(201,168,76,0.08)' }}
                  >
                    <FileText size={13} className="text-[#C9A84C]" />
                  </span>
                  <div>
                    <p className="text-sm font-sans font-semibold text-[#0D3349] leading-tight">
                      Tell us about your organization.
                    </p>
                    <p className="text-[11px] font-sans text-[#9B9B8A] mt-0.5 leading-snug">
                      We'll confirm a time within one business day.
                    </p>
                  </div>
                </button>

                {/* Divider */}
                <div className="mx-3 h-px bg-[#E8E2D9]" />

                {/* Option 2, Direct Outlook booking */}
                <a
                  href={OUTLOOK_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { setTriageOpen(false); trackTriagePathChosen('direct_booking', 'nav'); }}
                  className="group w-full flex items-start gap-3 px-3 py-3 text-left transition-colours duration-150 hover:bg-[#F7F4EF]"
                >
                  <span
                    className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colours duration-150 group-hover:bg-[#C9A84C]/10"
                    style={{ background: 'rgba(201,168,76,0.08)' }}
                  >
                    <Calendar size={13} className="text-[#C9A84C]" />
                  </span>
                  <div>
                    <p className="text-sm font-sans font-semibold text-[#0D3349] leading-tight">
                      Book directly in my calendar.
                    </p>
                    <p className="text-[11px] font-sans text-[#9B9B8A] mt-0.5 leading-snug">
                      Pick a time that works.
                    </p>
                  </div>
                </a>

                <div className="pb-2" />
              </div>
            </div>
          </div>

          {/* Mobile: bookmark + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onOpenReadingList}
              title="Reading list"
              aria-label="Reading list"
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: '34px', height: '34px',
                background: 'rgba(13,51,73,0.07)',
                border: '1px solid rgba(13,51,73,0.15)',
              }}
            >
              <Bookmark size={14} strokeWidth={2} style={{ color: 'var(--color-navy, #0D3349)' }} />
              {bookmarks.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center rounded-full"
                  style={{
                    width: '15px', height: '15px',
                    background: '#C9A84C', color: '#FAF7F2',
                    fontFamily: 'var(--font-body)', fontSize: '0.55rem', fontWeight: 700,
                  }}
                >
                  {bookmarks.length > 9 ? '9+' : bookmarks.length}
                </span>
              )}
            </button>
            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: 'var(--color-navy, #0D3349)', transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
              <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: 'var(--color-navy, #0D3349)', opacity: mobileOpen ? 0 : 1 }} />
              <span className="block w-6 h-0.5 transition-all duration-300" style={{ background: 'var(--color-navy, #0D3349)', transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden py-4 border-t"
            style={{
              background: 'rgba(250, 247, 242, 0.98)',
              borderColor: 'rgba(201,168,76,0.22)',
            }}
          >
            {coreNavLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.isAnchor)}
                className="block w-full text-left px-2 py-3 text-sm font-medium"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-deep)' }}
              >
                {link.label}
              </button>
            ))}
            <button onClick={openInsightSearch} className="flex w-full items-center gap-2 px-2 py-3 text-left text-sm font-semibold" style={{ fontFamily: 'var(--font-body)', color: '#0D3349', background: 'rgba(201,168,76,0.1)', borderLeft: '3px solid #C9A84C' }}>
              <Search size={15} strokeWidth={2.2} />
              Search insights &amp; sectors
            </button>
            <button onClick={() => handleNavClick('/articles', false)} className="block w-full text-left px-2 py-3 text-sm font-medium" style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-deep)' }}>
              Articles &amp; research
            </button>
            <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', padding: '0.85rem 0.5rem 0.35rem', margin: 0 }}>Who we help</p>
            {icpNavigationItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route, false)}
                className="block w-full text-left px-2 py-2.5 text-sm font-medium"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-slate-deep)' }}
              >
                {item.navLabel}
              </button>
            ))}
            <div style={{ height: '1px', background: 'rgba(201,168,76,0.12)', margin: '8px 0' }} />
            <a
              href={OUTLOOK_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { setMobileOpen(false); trackTriagePathChosen('direct_booking', 'nav'); }}
              className="mt-3 block w-full px-5 py-2.5 text-center text-sm font-semibold rounded"
              style={{
                fontFamily: 'var(--font-body)',
                background: '#C9A84C',
                color: 'var(--color-cream)',
                textDecoration: 'none',
              }}
            >
              Find your Next Best Thing
            </a>
            <a
              href={OUTLOOK_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2 w-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded border"
              style={{
                fontFamily: 'var(--font-body)',
                color: '#C9A84C',
                borderColor: '#C9A84C',
              }}
            >
              <Calendar size={14} />
              Book directly in my calendar
            </a>
          </div>
        )}
      </div>
    </header>
    {!onOpenSearch && internalSearchOpen && (
      <Suspense fallback={null}>
        <CommandPalette open={internalSearchOpen} onOpenChange={setInternalSearchOpen} />
      </Suspense>
    )}
    </>
  );
}

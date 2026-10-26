// =============================================================================
// ENDURING ADVANTAGE, Site Footer
// Sage Editorial design: deep slate background, sage green accents
// Includes: logo, company description, nav columns, address, social, legal
// =============================================================================

import { useState } from 'react';
import { MapPin, Phone, Mail, Linkedin, Twitter, ExternalLink, ArrowUp } from 'lucide-react';
import { Link } from 'wouter';

const footerSections = [
  {
    heading: 'Services',
    links: [
      { label: 'How It Works', href: '#actio', internal: true },
      { label: 'The Opportunity', href: '#climate-impacts', internal: true },
      { label: 'Business Case', href: '#business-case', internal: true },
      { label: 'actio Platform', href: '/actio', internal: false, isRoute: true },
      { label: 'Sustainability Playing Field', href: '/playing-field', internal: false, isRoute: true },
    ],
  },
  {
    heading: 'Resources',
      links: [
        { label: 'Articles & Research', href: '/articles', internal: false, isRoute: true },
        { label: 'Contact Us', href: '/contact', internal: false, isRoute: true },
        { label: 'Find your Next Best Thing', href: 'https://calendar.app.google/ozpmtufXwN4uhE2r6', internal: false },
    ],
  },
  {
    heading: 'Who We Help',
    links: [
      { label: 'CFOs & Finance', href: '/cfo', internal: false, isRoute: true },
      { label: 'Municipalities', href: '/municipalities', internal: false, isRoute: true },
      { label: 'First Nations', href: '/first-nations', internal: false, isRoute: true },
      { label: 'Agriculture', href: '/agriculture', internal: false, isRoute: true },
      { label: 'Buildings', href: '/buildings', internal: false, isRoute: true },
      { label: 'Real Estate', href: '/real-estate', internal: false, isRoute: true },
      { label: 'Industrial', href: '/industrial', internal: false, isRoute: true },
      { label: 'Transportation', href: '/transportation', internal: false, isRoute: true },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Become a Partner', href: '/partners', internal: false, isRoute: true },
      { label: 'About Us', href: '/about', internal: false, isRoute: true },
      { label: 'The Coach Model', href: '/coach-model', internal: false, isRoute: true },
      { label: 'Questions', href: '/questions', internal: false, isRoute: true },
      { label: 'Energy Advantage', href: 'https://www.energyadvantage.com', internal: false },
      { label: 'Catalys', href: 'https://catalyslabs.com', internal: false },
      { label: 'actio Platform', href: '/actio', internal: false, isRoute: true },
    ],
  },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/energy-advantage-inc',
    icon: Linkedin,
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/energyadvantage',
    icon: Twitter,
  },
];

function ResearchDigestFooter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email) || isSubmitting) return;
    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section aria-labelledby="research-digest-heading" style={{ background: '#FAF7F2', borderTop: '1px solid rgba(201,168,76,0.28)', padding: 'clamp(2.5rem, 5vw, 4rem) 0' }}>
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end" style={{ maxWidth: '1080px', margin: '0 auto', borderLeft: '3px solid #C9A84C', paddingLeft: 'clamp(1.25rem, 3vw, 2rem)' }}>
          <div>
            <p style={{ color: '#A9832C', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>Research Digest</p>
            <h2 id="research-digest-heading" style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.8vw, 2.1rem)', lineHeight: 1.12, margin: 0 }}>A concise note when new research is worth putting in front of your team.</h2>
          </div>
          {submitted ? (
            <p style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>You&apos;re on the list. Watch your inbox for the next Research Digest.</p>
          ) : (
            <form onSubmit={submit} aria-busy={isSubmitting} className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="footer-research-email">Work email</label>
              <input id="footer-research-email" type="email" required disabled={isSubmitting} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" style={{ flex: 1, minHeight: '46px', background: '#FFFFFF', border: '1px solid rgba(13,51,73,0.18)', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.9rem', padding: '0.7rem 0.85rem', opacity: isSubmitting ? 0.7 : 1 }} />
              <button type="submit" disabled={isSubmitting} style={{ alignItems: 'center', display: 'inline-flex', justifyContent: 'center', gap: '0.5rem', minHeight: '46px', minWidth: '112px', background: '#0D3349', border: '1px solid #0D3349', color: '#FAF7F2', cursor: isSubmitting ? 'wait' : 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 800, opacity: isSubmitting ? 0.82 : 1, padding: '0.7rem 1rem' }}>{isSubmitting ? <><span aria-hidden="true" className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#FAF7F2] border-t-transparent motion-reduce:animate-none" />Saving</> : 'Subscribe'}</button>
              <span className="sr-only" aria-live="polite">{isSubmitting ? 'Saving your Research Digest subscription.' : ''}</span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  const handleAnchorClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetRouteScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }));
  };

  return (
    <>
      <ResearchDigestFooter />
      <footer
      style={{
        background: 'var(--color-slate-deep)',
        borderTop: '1px solid rgba(201,168,76,0.2)',
      }}
    >
      {/* Main footer grid */}
      <div className="container py-16">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div className="mb-5">
              <img
                src="/manus-storage/ea-logo-v5_4fa83e5f.webp"
                alt="Enduring Advantage, The Right Things in the Right Order"
                width="200"
                height="64"
                loading="lazy"
                style={{
                  height: '64px',
                  width: 'auto',
                  objectFit: 'contain',
                  // Invert to white so it shows on the dark footer background
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.9,
                }}
              />
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                color: 'rgba(250,247,242,0.55)',
                marginBottom: '1.5rem',
                maxWidth: '260px',
              }}
            >
              Your best sustainability project is very often your best financial one. Enduring Advantage is a software-enabled, managed decision partner that pinpoints it, sees it through to completion and reports its returns. No equipment sales. No referral fees.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(250,247,242,0.07)',
                      border: '1px solid rgba(250,247,242,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(250,247,242,0.6)',
                      transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(201,168,76,0.25)';
                      el.style.color = '#C9A84C';
                      el.style.borderColor = 'rgba(201,168,76,0.4)';
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = 'rgba(250,247,242,0.07)';
                      el.style.color = 'rgba(250,247,242,0.6)';
                      el.style.borderColor = 'rgba(250,247,242,0.12)';
                    }}
                  >
                    <Icon size={15} strokeWidth={1.8} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav columns */}
          {footerSections.map((section) => (
            <div key={section.heading}>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  marginBottom: '1.25rem',
                }}
              >
                {section.heading}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.internal ? (
                      <button
                        onClick={() => handleAnchorClick(link.href)}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.875rem',
                          color: 'rgba(250,247,242,0.6)',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          transition: 'color 0.2s',
                          textAlign: 'left',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.6)'; }}
                      >
                        {link.label}
                      </button>
                    ) : (link as any).isRoute ? (
                      <Link
                        href={link.href}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.875rem',
                          color: 'rgba(250,247,242,0.6)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'color 0.2s',
                        }}
                        onClick={resetRouteScroll}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.6)'; }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.875rem',
                          color: 'rgba(250,247,242,0.6)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.6)'; }}
                      >
                        {link.label}
                        <ExternalLink size={11} strokeWidth={2} style={{ opacity: 0.6 }} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                marginBottom: '1.25rem',
              }}
            >
              Contact
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li>
                <a
                  href="https://maps.google.com/?q=5515+North+Service+Road+Suite+303+Burlington+ON"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="flex gap-3">
                    <MapPin size={15} style={{ color: '#C9A84C', flexShrink: 0, marginTop: '2px' }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: 'rgba(250,247,242,0.6)',
                        lineHeight: 1.6,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.6)'; }}
                    >
                      5515 North Service Road<br />
                      Suite 303<br />
                      Burlington, ON, L7L 6G4
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:18006973456"
                  className="flex gap-3 items-center"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.6)'; }}
                >
                  <Phone size={14} style={{ color: '#C9A84C', flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'rgba(250,247,242,0.6)',
                      transition: 'color 0.2s',
                    }}
                  >
                    1-800-697-3456
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:partnerships@enduringadvantage.com"
                  className="flex gap-3 items-center"
                  style={{ textDecoration: 'none' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.6)'; }}
                >
                  <Mail size={14} style={{ color: '#C9A84C', flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'rgba(250,247,242,0.6)',
                      transition: 'color 0.2s',
                    }}
                  >
                    partnerships@enduringadvantage.com
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(250,247,242,0.07)',
          padding: '1.25rem 0',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'rgba(250,247,242,0.35)',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Enduring Advantage Inc. All rights reserved. Part of the Energy Advantage group.
          </p>
          <div className="flex items-center gap-5">
            {/* Back to Top button */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'rgba(250,247,242,0.5)',
                background: 'rgba(201,168,76,0.12)',
                border: '1px solid rgba(201,168,76,0.25)',
                borderRadius: '6px',
                padding: '5px 12px',
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s',
                marginRight: '0.5rem',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(201,168,76,0.28)';
                el.style.color = '#C9A84C';
                el.style.borderColor = 'rgba(201,168,76,0.5)';
                el.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(201,168,76,0.12)';
                el.style.color = 'rgba(250,247,242,0.5)';
                el.style.borderColor = 'rgba(201,168,76,0.25)';
                el.style.transform = 'translateY(0)';
              }}
            >
              <ArrowUp size={13} strokeWidth={2.5} />
              Back to Top
            </button>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--color-cream)',
                background: '#C9A84C',
                border: '1px solid transparent',
                borderRadius: '6px',
                padding: '5px 14px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(201,168,76,0.25)',
                transition: 'opacity 0.2s, transform 0.2s cubic-bezier(0.23,1,0.32,1), box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = '0.9';
                el.style.transform = 'translateY(-2px) scale(1.03)';
                el.style.boxShadow = '0 6px 18px rgba(201,168,76,0.38)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) scale(1)';
                el.style.boxShadow = '0 2px 8px rgba(201,168,76,0.25)';
              }}
              onMouseDown={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(1px) scale(0.97)';
                el.style.boxShadow = '0 1px 4px rgba(201,168,76,0.2)';
                el.style.transition = 'transform 0.1s cubic-bezier(0.23,1,0.32,1), box-shadow 0.1s';
              }}
              onMouseUp={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-2px) scale(1.03)';
                el.style.boxShadow = '0 6px 18px rgba(201,168,76,0.38)';
                el.style.transition = 'opacity 0.2s, transform 0.2s cubic-bezier(0.23,1,0.32,1), box-shadow 0.2s';
              }}
            >
              Contact Us
            </Link>
            <Link
              href="/privacy-policy"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'rgba(250,247,242,0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.4)'; }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'rgba(250,247,242,0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A84C'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.4)'; }}
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
}

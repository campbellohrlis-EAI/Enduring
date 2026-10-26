// =============================================================================
// ENDURING ADVANTAGE — Coming Soon Holding Page
// The full site remains preserved behind shared/siteMode.ts for later restoration.
// =============================================================================

import { useState, type FormEvent } from 'react';
import { useForm } from '@formspree/react';
import { Check, Linkedin, Loader2, Mail, Twitter } from 'lucide-react';

const FORMSPREE_WAITLIST_ID = 'xwvgzqae';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/enduring-advantage-inc/',
    icon: Linkedin,
  },
  {
    label: 'X',
    href: 'https://twitter.com/energyadvantage',
    icon: Twitter,
  },
];

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [state, handleFormspreeSubmit] = useForm(FORMSPREE_WAITLIST_ID);
  const emailError = emailTouched && !isValidEmail(email)
    ? (email.trim() ? 'Enter a valid email address.' : 'Enter your email address to join the waitlist.')
    : null;

  const submitWaitlist = (event: FormEvent<HTMLFormElement>) => {
    if (!isValidEmail(email)) {
      event.preventDefault();
      setEmailTouched(true);
      return;
    }
    handleFormspreeSubmit(event);
  };

  return (
    <main className="coming-soon-page" aria-labelledby="coming-soon-heading">
      <div className="coming-soon-grain" aria-hidden="true" />
      <div className="coming-soon-orbit coming-soon-orbit-one" aria-hidden="true" />
      <div className="coming-soon-orbit coming-soon-orbit-two" aria-hidden="true" />

      <section className="coming-soon-content">
        <img
          src="/manus-storage/ea-logo-v5_4fa83e5f.webp"
          alt="Enduring Advantage"
          className="coming-soon-logo"
          width="420"
          height="134"
          fetchPriority="high"
        />

        <div className="coming-soon-socials" aria-label="Enduring Advantage social media">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Follow Enduring Advantage on ${label}`}>
              <Icon size={15} aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <div className="coming-soon-rule" aria-hidden="true" />
        <p className="coming-soon-kicker">A new chapter is taking shape</p>
        <h1 id="coming-soon-heading">Coming soon.</h1>
        <p className="coming-soon-message">
          A sharper way to turn complex sustainability choices into sound business decisions is on its way.
        </p>

        {state.succeeded ? (
          <div className="coming-soon-waitlist-success" role="status">
            <span aria-hidden="true"><Check size={16} /></span>
            <p>You&apos;re on the list. We&apos;ll be in touch when there&apos;s news worth sharing.</p>
          </div>
        ) : (
          <form className="coming-soon-waitlist" noValidate onSubmit={submitWaitlist} aria-busy={state.submitting}>
            <input type="hidden" name="form_type" value="Coming Soon Waitlist" />
            <input type="hidden" name="source" value="Coming soon holding page" />
            <label htmlFor="coming-soon-email">Email address</label>
            <div className="coming-soon-waitlist-fields">
              <input
                id="coming-soon-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onBlur={() => setEmailTouched(true)}
                onChange={(event) => setEmail(event.target.value)}
                aria-describedby={emailError || state.errors ? 'coming-soon-email-feedback' : undefined}
                aria-invalid={Boolean(emailError)}
                placeholder="you@organization.com"
                disabled={state.submitting}
              />
              <button type="submit" disabled={state.submitting}>
                {state.submitting ? <Loader2 className="coming-soon-waitlist-spinner" size={16} aria-hidden="true" /> : <Mail size={16} aria-hidden="true" />}
                <span>{state.submitting ? 'Joining...' : 'Join the waitlist'}</span>
              </button>
            </div>
            <p id="coming-soon-email-feedback" className="coming-soon-waitlist-feedback" role={emailError || state.errors ? 'alert' : undefined}>
              {emailError ?? (state.errors ? 'We could not add you right now. Please try again.' : 'We&apos;ll only send occasional launch updates. No clutter.')}
            </p>
          </form>
        )}
      </section>

      <p className="coming-soon-copyright">© {new Date().getFullYear()} Enduring Advantage Inc.</p>
    </main>
  );
}

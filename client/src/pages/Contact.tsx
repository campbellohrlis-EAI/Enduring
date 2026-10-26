// =============================================================================
// ENDURING ADVANTAGE, Contact Page
// Sage Editorial design: cream background, dark slate type, sage accents
// Purpose: Principal-led conversation request, high-trust, low-friction
// Form submission: @formspree/react → Formspree endpoint xwvgzqae
// =============================================================================

import { useState } from 'react';
import { Link, useSearch } from 'wouter';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useSEO } from '@/hooks/useSEO';
import { useForm, ValidationError } from '@formspree/react';
import { trackTriagePathChosen } from '@/lib/analytics';

// ── What to expect steps ────────────────────────────────────────────────────
const afterFirstCall = [
  { title: 'Assess the situation', body: 'We learn the business, the decision, current sustainability spend and likely easy wins.' },
  { title: 'Start collecting data', body: 'We load the evidence you have into actio and add to it as the work progresses.' },
  { title: 'Find low-risk first wins', body: 'We identify early actions that can be proven with the information on hand.' },
  { title: 'Identify the Next Best Thing', body: 'Your data defines the question. We then screen the entire Sustainability Playing Field through financial-return and positive-environmental-impact gates, rather than choosing from vendor proposals, to name the next action.' },
  { title: 'Turn it into a plan', body: 'Generative AI drafts the plan and the Coach and specialists apply the human sanity test.' },
  { title: 'Deliver, report and repeat', body: 'We quarterback delivery, report dollars saved and environmental results, then identify the next move.' },
];

// ── Role options ─────────────────────────────────────────────────────────────
const roleOptions = [
  'CFO / Chief Financial Officer',
  'CEO / Chief Executive Officer',
  'COO / Chief Operating Officer',
  'CSO / Chief Sustainability Officer',
  'VP Finance',
  'VP Operations',
  'Board Director',
  'Other C-Suite / Senior Executive',
];

// ── Primary challenge options ────────────────────────────────────────────────
const challengeOptions = [
  'Identifying which sustainability initiatives will deliver the highest financial return',
  'Accessing green financing or sustainability-linked capital',
  'Building an audit-ready sustainability baseline for reporting or financing',
  'Reducing operational costs through sustainability improvements',
  'Evaluating and selecting from a complex field of sustainability solutions',
  'Developing a board-ready sustainability investment case',
  'Scope 3 / supply chain emissions measurement and reduction',
  'Other, I will explain in the message',
];

// ── Formspree form ID ─────────────────────────────────────────────────────────
const FORMSPREE_ID = 'xwvgzqae';

export default function Contact() {
  useSEO({
    title: 'Find Your Next Best Thing',
    description:
      'Tell us the decision in front of you. Rob Kirkby or Campbell Ohrlis will come back within one business day and say whether there is likely a material opportunity worth pursuing.',
    canonicalPath: '/contact',
    ogImage: 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/og-social-share-TjcXvbM8Zm8Zo3haX98724.png',
  });

  const search = useSearch();

  // Pre-fill message from Scorecard URL params
  const prefillMessage = (() => {
    const params = new URLSearchParams(search);
    const initiative = params.get('initiative') || '';
    const context = params.get('context') || '';
    const barrier = params.get('barrier') || '';
    let msg = '';
    if (initiative) msg += `Initiative: ${initiative}\n`;
    if (context) msg += `Context: ${context}\n`;
    if (barrier) msg += `Primary readiness barrier identified: ${barrier}\n`;
    return msg.trim();
  })();

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#0D3349] font-serif">
      <Navigation />

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-6 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-sans text-[#C9A84C] hover:text-[#3d6b4a] transition-colours mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-start">
          {/* Left: headline + trust signals */}
          <div>
            <p className="text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#C9A84C] mb-4">
              Start the conversation
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0D3349] leading-[1.1] mb-6">
              Find your highest-value<br />
              <span className="text-[#C9A84C]">next action.</span>
            </h1>
            <p className="text-lg font-sans text-[#4A4A3A] leading-relaxed mb-10 max-w-lg">
              Tell us the decision in front of you, the data you have and who needs to be involved. Rob Kirkby or Campbell Ohrlis will come back within one business day, say whether there is likely a material opportunity, and what it would take to prove it. We do not start by choosing among vendor projects. Nobody can name the action before seeing your numbers, including us. That is what the Diagnostic is for.
            </p>

            {/* Meet the Principals */}
            <div className="mb-10">
              <p className="text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#9B9B8A] mb-5">
                Who you will speak with
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Rob Kirkby',
                    title: 'Founder & CEO',
                    photo: '/manus-storage/RobKirkby_402e0e7f.jpeg',
                    linkedin: 'https://www.linkedin.com/in/robert-kirkby-3b7374/',
                  },
                  {
                    name: 'Campbell Ohrlis',
                    title: 'VP',
                    photo: '/manus-storage/CampbellOhrlis_da1d067a.jpeg',
                    linkedin: 'https://www.linkedin.com/in/campbellohrlis/',
                  },
                ].map((person) => (
                  <div
                    key={person.name}
                    className="flex items-center gap-3 p-3.5 rounded-xl"
                    style={{ background: '#fff', border: '1px solid #E8E2D9' }}
                  >
                    <img
                      src={person.photo}
                      alt={person.name}
                      width="52"
                      height="52"
                      loading="lazy"
                      className="flex-shrink-0"
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        boxShadow: '0 0 0 2.5px #C9A84C, 0 0 0 4.5px rgba(201,168,76,0.15)',
                      }}
                    />
                    <div className="flex-1">
                      <p className="font-sans font-semibold text-[#0D3349] text-sm leading-tight">{person.name}</p>
                      <p className="font-sans text-xs text-[#C9A84C] mt-0.5 mb-1.5">{person.title}</p>
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold no-underline"
                        style={{ color: '#0A66C2' }}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#D8D0C4] pt-10">
              <p className="text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#9B9B8A] mb-6">What happens after the first conversation</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {afterFirstCall.map((item, index) => (
                  <div key={item.title} className={index === afterFirstCall.length - 1 ? 'sm:col-span-2' : ''} style={{ borderLeft: '2px solid #C9A84C', paddingLeft: '0.8rem' }}>
                    <p className="font-sans font-semibold text-[#0D3349] text-sm mb-0.5">{String(index + 1).padStart(2, '0')} {item.title}</p>
                    <p className="font-sans text-sm text-[#6B6B5A] leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form card */}
          <div className="lg:sticky lg:top-28">
            <ConsultationForm prefillMessage={prefillMessage} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── Consultation form (Formspree-wired) ───────────────────────────────────────
function ConsultationForm({ prefillMessage }: { prefillMessage: string }) {
  const [state, handleFormspreeSubmit] = useForm(FORMSPREE_ID);

  // Local state for controlled inputs (needed for pre-fill and validation UX)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganisation] = useState('');
  const [email, setEmail] = useState('');
  const [revenueRange, setRevenueRange] = useState('');
  const [challenge, setChallenge] = useState('');
  const [message, setMessage] = useState(prefillMessage);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = 'Required';
    if (!lastName.trim()) e.lastName = 'Required';
    if (!role) e.role = 'Required';
    if (!organization.trim()) e.organization = 'Required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'A valid business email is required';
    if (!challenge) e.challenge = 'Please select your primary challenge';
    setLocalErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    handleFormspreeSubmit(e);
  };

  if (state.succeeded) {
    return <SuccessCard name={firstName} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-[#D8D0C4] shadow-sm p-8 space-y-5"
    >
      <div>
        <h3 className="text-lg font-serif font-bold text-[#0D3349] mb-1">
          Tell us the decision.
        </h3>
        <p className="text-xs font-sans text-[#9B9B8A]">
          A principal replies within one business day.
        </p>
      </div>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="First name"
          name="firstName"
          value={firstName}
          error={localErrors.firstName}
          onChange={(e) => { setFirstName(e.target.value); setLocalErrors((p) => ({ ...p, firstName: '' })); }}
          placeholder="Jane"
        />
        <Field
          label="Last name"
          name="lastName"
          value={lastName}
          error={localErrors.lastName}
          onChange={(e) => { setLastName(e.target.value); setLocalErrors((p) => ({ ...p, lastName: '' })); }}
          placeholder="Smith"
        />
      </div>

      {/* Role */}
      <SelectField
        label="Your role"
        name="role"
        value={role}
        error={localErrors.role}
        onChange={(e) => { setRole(e.target.value); setLocalErrors((p) => ({ ...p, role: '' })); }}
        options={roleOptions}
        placeholder="Select your role"
      />

      {/* organization */}
      <Field
        label="Organization"
        name="organization"
        value={organization}
        error={localErrors.organization}
        onChange={(e) => { setOrganisation(e.target.value); setLocalErrors((p) => ({ ...p, organization: '' })); }}
        placeholder="Acme Corp"
      />

      {/* Email */}
      <Field
        label="Business email"
        name="email"
        type="email"
        value={email}
        error={localErrors.email}
        onChange={(e) => { setEmail(e.target.value); setLocalErrors((p) => ({ ...p, email: '' })); }}
        placeholder="jane@acmecorp.com"
      />
      <ValidationError field="email" prefix="Email" errors={state.errors} className="text-[11px] font-sans text-red-500 -mt-3" />

      {/* Revenue range (optional) */}
      <SelectField
        label="Annual revenue (optional)"
        name="revenueRange"
        value={revenueRange}
        onChange={(e) => setRevenueRange(e.target.value)}
        options={[
          '$50M – $250M',
          '$250M – $1B',
          '$1B – $5B',
          '$5B+',
          'Prefer not to say',
        ]}
        placeholder="Select range"
      />

      {/* Primary challenge */}
      <SelectField
        label="Primary challenge"
        name="challenge"
        value={challenge}
        error={localErrors.challenge}
        onChange={(e) => { setChallenge(e.target.value); setLocalErrors((p) => ({ ...p, challenge: '' })); }}
        options={challengeOptions}
        placeholder="Select your primary challenge"
      />

      {/* Message */}
      <div>
        <label htmlFor="field-message" className="block text-xs font-sans font-semibold text-[#4A4A3A] mb-1.5">
          Anything else we should know? <span className="font-normal text-[#9B9B8A]">(optional)</span>
        </label>
        <textarea
          id="field-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Context about your current program, timeline, or specific questions…"
          className="w-full rounded-lg border border-[#D8D0C4] bg-[#FAFAF7] px-3.5 py-2.5 text-sm font-sans text-[#0D3349] placeholder:text-[#B8B0A4] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition resize-none"
        />
      </div>

      {/* Formspree-level error */}
      {state.errors && (
        <p className="text-[11px] font-sans text-red-500">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full flex items-center justify-center gap-2 bg-[#0D3349] hover:bg-[#2a3d3d] text-[#F7F4EF] font-sans font-semibold text-sm rounded-lg px-5 py-3.5 transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state.submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-[#F7F4EF]/40 border-t-[#F7F4EF] rounded-full animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            Find your Next Best Thing
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#E8E2D9]" />
        <span className="text-[11px] font-sans text-[#9B9B8A] whitespace-nowrap">or book directly</span>
        <div className="flex-1 h-px bg-[#E8E2D9]" />
      </div>

      <a
        href="https://calendar.app.google/ozpmtufXwN4uhE2r6"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackTriagePathChosen('direct_booking', 'contact')}
        className="group w-full flex items-center justify-center gap-2 border border-[#C9A84C] text-[#C9A84C] font-sans font-semibold text-sm rounded-lg px-5 py-3 relative overflow-hidden transition-colours duration-300 active:scale-[0.98]"
        style={{ isolation: 'isolate' }}
      >
        {/* Slide-up fill on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[#C9A84C] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
        />
        <span className="relative z-10 flex items-center gap-2 group-hover:text-[#FAF7F2] transition-colours duration-300">
          Book a time on my calendar
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </a>

      <p className="text-[11px] font-sans text-[#9B9B8A] text-center leading-relaxed">
        Your information is used only to prepare for the conversation and is never shared with
        third parties. See our{' '}
        <Link href="/privacy-policy" className="text-[#C9A84C] hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="text-[11px] font-sans text-[#9B9B8A] text-center">
        Have questions before you start?{' '}
        <Link href="/questions" className="text-[#C9A84C] hover:underline font-semibold">
          See our full FAQ
        </Link>
        .
      </p>
    </form>
  );
}

// ── Success state ─────────────────────────────────────────────────────────────
function SuccessCard({ name }: { name: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#D8D0C4] shadow-sm p-8 text-center">
      <div className="w-14 h-14 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 className="w-7 h-7 text-[#C9A84C]" />
      </div>
      <h3 className="text-xl font-serif font-bold text-[#0D3349] mb-3">Thank you.</h3>
      <p className="font-sans text-sm text-[#6B6B5A] leading-relaxed mb-4">
        We&apos;ve received your request. A principal at Enduring Advantage will be in touch within
        one business day to confirm a time and send a short pre-read.
      </p>
      <p className="font-sans text-xs text-[#9B9B8A] mb-5">
        Prefer to book a time directly?
      </p>
      <a
        href="https://calendar.app.google/ozpmtufXwN4uhE2r6"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-semibold text-sm mb-6 transition-all duration-200 hover:opacity-90 active:scale-95"
        style={{ background: '#C9A84C', color: '#FAF7F2' }}
      >
        Book a time now
      </a>
      <p className="font-sans text-xs text-[#9B9B8A]">
        In the meantime, the{' '}
        <Link href="/articles" className="text-[#C9A84C] hover:underline">
          research library
        </Link>{' '}offers useful context for the conversation.
      </p>
        <p className="font-sans text-xs text-[#9B9B8A] mt-2">
          Have questions before you start?{' '}
          <Link href="/questions" className="text-[#C9A84C] hover:underline font-semibold">
            See our full FAQ
          </Link>
          .
        </p>
    </div>
  );
}

// ── Reusable field components ─────────────────────────────────────────────────
interface FieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

function Field({ label, name, value, error, onChange, placeholder, type = 'text' }: FieldProps) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-sans font-semibold text-[#4A4A3A] mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm font-sans text-[#0D3349] placeholder:text-[#B8B0A4] bg-[#FAFAF7] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition ${
          error ? 'border-red-400 bg-red-50/30' : 'border-[#D8D0C4]'
        }`}
      />
      {error && <p className="mt-1 text-[11px] font-sans text-red-500">{error}</p>}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder?: string;
}

function SelectField({ label, name, value, error, onChange, options, placeholder }: SelectFieldProps) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-sans font-semibold text-[#4A4A3A] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full appearance-none rounded-lg border px-3.5 py-2.5 pr-9 text-sm font-sans bg-[#FAFAF7] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C] transition ${
            value ? 'text-[#0D3349]' : 'text-[#B8B0A4]'
          } ${error ? 'border-red-400 bg-red-50/30' : 'border-[#D8D0C4]'}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B9B8A] pointer-events-none" />
      </div>
      {error && <p className="mt-1 text-[11px] font-sans text-red-500">{error}</p>}
    </div>
  );
}

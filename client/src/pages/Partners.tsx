// Design reminder: navy-and-gold finance editorial landing page. Use clear decision hierarchy,
// documentary principal portraits, meaningful editorial asymmetry, and no environmental-green styling.

import { useId, useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowRight, Building2, Calendar, Check, CheckCircle, ChevronDown, Download, ExternalLink, Linkedin, Mail, Phone } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { trackSupplyChainChecklistDownloaded } from '@/lib/analytics';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdqnbow';
const BOOKING_URL = 'https://calendar.app.google/ozpmtufXwN4uhE2r6';
const ENERGY_ADVANTAGE_URL = 'https://www.energyadvantage.com';
const ROB_LINKEDIN = 'https://www.linkedin.com/in/robert-kirkby-3b7374/';
const CAMPBELL_LINKEDIN = 'https://www.linkedin.com/in/campbellohrlis/';

const C = {
  navy: '#0D3349',
  navyDeep: '#08283A',
  gold: '#C9A84C',
  goldLight: '#F0D070',
  cream: '#FAF7F2',
  paper: '#F0EDE6',
  ink: '#18303E',
  muted: '#556A75',
  line: 'rgba(13,51,73,0.16)',
  error: '#A53B2C',
};

interface FormState {
  name: string;
  firm: string;
  firmType: string;
  email: string;
  phone: string;
}

const STEPS = [
  ['You keep the relationship.', 'You introduce the client need and stay in the conversation. You do not need to navigate the full system yourself.'],
  ['We establish the decision context.', 'Enduring Advantage uses the available operating evidence and local context to define the decision, urgency, timing and people required.'],
  ['actio supports the screen.', 'Your client’s data identifies the problem worth solving. actio then reduces cognitive overload by organizing the full field and screening it through financial-return and positive-environmental-impact gates. It does not start by judging a vendor’s project list, choose a vendor or approve spend.'],
  ['People test the plan.', 'The Coach and specialists apply the human sanity test, add local delivery context, and support a vendor-neutral selection process.'],
  ['We manage delivery and reporting.', 'The right partners execute. The Coach coordinates delivery, every completed project gets M&V. [CONFIRM: provider name and reporting frequency.] Outcomes are reported before the next action is considered.'],
];

const KIT = [
  ['CFO', 'CFO field-guide e-book', 'A long-form lead magnet written for finance buyers.'],
  ['WEB', 'Client landing page', 'A ready-to-host page that books the first conversation.'],
  ['NOTE', 'Value-letter sequence', 'A plain-spoken outreach flow in your client’s language.'],
  ['CALL', 'Client call guide', 'A conversation structure for raising the question without overpromising.'],
];

const TIERS = [
  {
    stage: '',
    title: 'Referral partner',
    items: [
      'You make the introduction and step back. Enduring Advantage sells the work and delivers it. You keep the client relationship and a referral share.',
    ],
  },
  {
    stage: '',
    title: 'Certified delivery partner',
    items: [
      'You sell the engagement, deliver the coaching layer inside your own firm and invoice the client directly. You carry more of the work and earn considerably more of the value.',
    ],
  },
];

const SAFETY = [
  ['What you keep.', 'Your client. Your seat at the table. Your invoice, if you want it. Your share, in writing, before anyone speaks to your client.'],
  ['What we bring.', "Energy Advantage has 30 years’ experience managing, collating, collecting and administering client data from real buildings and plants. actio, the decision platform that lets your client's data lead a whole-field screen rather than a choice among vendor proposals. A Coach and specialists who test the answer on the ground before your client sees it."],
  ['What never changes.', "Your client's price. They pay the same going through you as coming direct. You do not add a markup and none is added for you."],
];

const FAQS = [
  ['Will you steal my client?', 'The partner model is designed to protect the relationship you own. Client communications, brand use and delivery responsibilities are agreed in writing before a client engagement begins.'],
  ['What if delivery is bad and it is my name on it?', 'Every recommendation receives human review before client delivery. The Coach and specialists apply the human sanity test, use vendor-neutral selection criteria, and report outcomes after delivery.'],
  ['Is this worth the effort?', 'The purpose is to give your clients a credible next decision without requiring your team to become a sustainability delivery operation. The right operating model depends on your role and client relationship.'],
  ['Will my clients actually buy?', 'We don’t make claims before we understand the client. The first conversation establishes the decision, available data, urgency, timing and the people who need to be involved.'],
  ['Does this make me look like a reseller?', 'No. You remain the trusted advisor while Enduring Advantage provides managed decision and delivery support. We sell no equipment and take no vendor referral fees.'],
];

const ONBOARDING_FAQS = [
  ['What happens after I submit the form?', 'We’ll respond directly about the next conversation and whether the partner model is likely to fit your practice.'],
  ['Do I have to commit to anything to have the first conversation?', 'No. There’s no commitment for the first conversation, and there’s nothing to sign. We will explain the model, the client decision process and the decisions that would need to be made before a formal partnership.'],
  ['Who will I be dealing with?', 'Campbell Ohrlis runs the partner channel and will be on your first call and every call after it. Rob Kirkby joins once the conversation turns to a specific client. You work with the principals, not an account manager.'],
  ['Do I have to choose a tier before I start?', 'No, and most firms should not. Start as a referral partner, watch us handle one real client, then decide whether you want to deliver the coaching layer yourself. Moving up is a conversation, not a second application.'],
  ['How quickly can I talk to a client?', 'For a referral partner, days. You need the kit branded and one briefing call so you know how to open the conversation.'],
  ['What is in the white-label kit?', 'Four things: a CFO field guide as a PDF, a client landing page you host on your own domain, a value-letter sequence you can send from your own system, and a script for a client-facing video if you want to record one. All of it carries your logo, not ours.'],
  ['What does the first client conversation look like?', 'You open it, because it is your relationship. We’re on the call to answer the technical questions. The conversation is about what the client’s existing data can already tell us, not a pitch about the platform. Nobody is asked to buy anything on that call.'],
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function FaqItem({ question, answer, initialOpen, animated = false }: { question: string; answer: string; initialOpen: boolean; animated?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const panelId = useId();
  return (
    <article style={{ borderBottom: `1px solid ${C.line}` }}>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-controls={panelId} aria-expanded={open} className="flex w-full items-center justify-between gap-5 text-left" style={{ background: 'transparent', border: 0, color: C.navy, fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 700, padding: '1.15rem 0' }}>
        {question}
        <span className="motion-reduce:transition-none" style={{ display: 'inline-flex', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 180ms cubic-bezier(0.23, 1, 0.32, 1)' }}><ChevronDown size={18} color={C.gold} /></span>
      </button>
      {animated ? (
        <div id={panelId} aria-hidden={!open} className="grid overflow-hidden motion-reduce:transition-none" style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0, transition: 'grid-template-rows 240ms cubic-bezier(0.23, 1, 0.32, 1), opacity 180ms cubic-bezier(0.23, 1, 0.32, 1)' }}>
          <div style={{ minHeight: 0, overflow: 'hidden' }}>
            <p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.96rem', lineHeight: 1.75, margin: '0 0 1.2rem', maxWidth: '850px', transform: open ? 'translateY(0)' : 'translateY(-4px)', transition: 'transform 220ms cubic-bezier(0.23, 1, 0.32, 1)' }}>{answer}</p>
          </div>
        </div>
      ) : open && <p id={panelId} style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.96rem', lineHeight: 1.75, margin: '0 0 1.2rem', maxWidth: '850px' }}>{answer}</p>}
    </article>
  );
}

function SectionHeading({ kicker, title, body, inverse = false }: { kicker: string; title: string; body?: string; inverse?: boolean }) {
  return (
    <div style={{ maxWidth: '760px', marginBottom: '2.2rem' }}>
      <p style={{ color: inverse ? C.goldLight : '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', margin: '0 0 0.6rem', textTransform: 'uppercase' }}>{kicker}</p>
      <h2 style={{ color: inverse ? C.cream : C.navy, fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08, margin: 0 }}>{title}</h2>
      {body && <p style={{ color: inverse ? 'rgba(250,247,242,0.72)' : C.muted, fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.7, margin: '1rem 0 0' }}>{body}</p>}
    </div>
  );
}

export default function Partners() {
  useSEO({
    title: 'Partner Program for Trusted Advisors',
    description: 'A white-label partner program for accounting, advisory, sustainability, property, and finance firms that need a credible answer when clients ask what to do first.',
    canonicalPath: '/partners',
  });

  const [, navigate] = useLocation();
  const [form, setForm] = useState<FormState>({ name: '', firm: '', firmType: '', email: '', phone: '' });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [firmTypeError, setFirmTypeError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? null : 'Please enter a valid work email address.';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextEmailError = validateEmail(form.email);
    const nextFirmTypeError = form.firmType ? null : 'Please select a firm type.';
    setEmailError(nextEmailError);
    setFirmTypeError(nextFirmTypeError);
    if (nextEmailError || nextFirmTypeError) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          firm: form.firm,
          firm_type: form.firmType,
          email: form.email,
          phone: form.phone || '(not provided)',
          _subject: `Partner application, ${form.firm}`,
        }),
      });
      if (!response.ok) throw new Error('Partner application could not be submitted.');
      navigate('/partners/thank-you');
    } catch {
      setSubmitError('We could not send your application. Please try again, or contact us at partnerships@enduringadvantage.com.');
    } finally {
      setSubmitting(false);
    }
  };

  const wrap: React.CSSProperties = { maxWidth: '1120px', margin: '0 auto', padding: '0 clamp(1.25rem, 4vw, 2.5rem)' };
  const section: React.CSSProperties = { padding: 'clamp(4rem, 8vw, 6.8rem) 0' };

  return (
    <div style={{ background: C.cream, color: C.ink, fontFamily: 'var(--font-body)' }}>
      <nav style={{ background: 'rgba(13,51,73,0.98)', borderBottom: '1px solid rgba(201,168,76,0.26)', boxShadow: '0 2px 18px rgba(0,0,0,0.22)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="flex items-center justify-between gap-4" style={{ ...wrap, height: '68px' }}>
          <a href="/" aria-label="Enduring Advantage home" style={{ display: 'inline-flex', alignItems: 'center' }}><img src="/manus-storage/ea-logo-v5_4fa83e5f.webp" alt="Enduring Advantage" width="180" height="61" style={{ filter: 'brightness(0) invert(1)', height: '50px', objectFit: 'contain', width: 'auto' }} /></a>
          <div className="hidden items-center gap-1 md:flex">
            <button type="button" onClick={() => scrollTo('how-it-works')} style={{ background: 'transparent', border: 0, color: 'rgba(250,247,242,0.72)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', padding: '0.5rem 0.7rem' }}>How it works</button>
            <button type="button" onClick={() => scrollTo('tiers')} style={{ background: 'transparent', border: 0, color: 'rgba(250,247,242,0.72)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', padding: '0.5rem 0.7rem' }}>Partner tiers</button>
            <button type="button" onClick={() => scrollTo('faq')} style={{ background: 'transparent', border: 0, color: 'rgba(250,247,242,0.72)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', padding: '0.5rem 0.7rem' }}>Questions</button>
            <button type="button" onClick={() => scrollTo('onboarding')} style={{ background: 'transparent', border: 0, color: 'rgba(250,247,242,0.72)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', padding: '0.5rem 0.7rem' }}>Onboarding</button>
          </div>
          <button type="button" onClick={() => scrollTo('apply')} className="transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: C.gold, border: 0, color: C.navy, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 800, padding: '0.7rem 0.95rem' }}>Apply to partner <ArrowRight size={14} className="ml-1 inline" /></button>
        </div>
      </nav>

      <header style={{ background: C.navy, overflow: 'hidden', padding: 'clamp(4.25rem, 8vw, 6.6rem) 0', position: 'relative' }}>
        <div aria-hidden="true" style={{ background: 'radial-gradient(circle at 84% 20%, rgba(201,168,76,0.2), transparent 25%), repeating-linear-gradient(135deg, rgba(250,247,242,0.035) 0 1px, transparent 1px 12px)', inset: 0, position: 'absolute' }} />
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center" style={{ ...wrap, position: 'relative' }}>
          <div>
            <p style={{ color: C.goldLight, fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.14em', margin: 0, textTransform: 'uppercase' }}>Partner program</p>
            <p style={{ color: 'rgba(250,247,242,0.78)', fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.72, margin: '1rem 0 0', maxWidth: '660px' }}>Climate change, biodiversity loss and pollution are creating real costs for your clients just when margins are at their tightest. They are not asking a sustainability firm. They are asking you.</p>
            <h1 style={{ color: C.cream, fontFamily: 'var(--font-display)', fontSize: 'clamp(2.65rem, 5.1vw, 4.65rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.02, margin: '1rem 0' }}>Your client just asked what to do first.</h1>
            <p style={{ color: 'rgba(250,247,242,0.74)', fontFamily: 'var(--font-body)', fontSize: '1.08rem', lineHeight: 1.72, margin: 0, maxWidth: '680px' }}>You can give them one defensible answer with the numbers behind it, without becoming a sustainability delivery firm and without handing the relationship to anyone. Left alone, your client takes the answer from whichever vendor pitched last, and you carry it.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: C.gold, color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 800, padding: '0.9rem 1.1rem', textDecoration: 'none' }}><Calendar size={16} /> Talk to Campbell</a>
              <button type="button" onClick={() => scrollTo('how-it-works')} className="transition-all duration-200 active:scale-95 hover:border-[#C9A84C]" style={{ background: 'transparent', border: '1px solid rgba(201,168,76,0.6)', color: C.cream, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700, padding: '0.9rem 1.1rem' }}>See how it works</button>
            </div>
            <p style={{ color: 'rgba(250,247,242,0.62)', fontFamily: 'var(--font-body)', fontSize: '0.8rem', lineHeight: 1.55, margin: '1rem 0 0' }}>A conversation with Campbell Ohrlis. No deck. If it’s not a fit, you’ll hear that on the call.</p>
            <p style={{ borderTop: '1px solid rgba(201,168,76,0.28)', color: 'rgba(250,247,242,0.64)', fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.55, margin: '1.35rem 0 0', maxWidth: '760px', paddingTop: '1rem' }}>For accounting and advisory firms, boutique sustainability consultancies, property managers and green finance lenders.</p>
          </div>
          <aside style={{ background: 'rgba(250,247,242,0.06)', border: '1px solid rgba(201,168,76,0.4)', borderLeft: `4px solid ${C.gold}`, padding: 'clamp(1.3rem, 3vw, 2rem)' }}>
            <p style={{ color: C.goldLight, fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Partner program</p>
            <h2 style={{ color: C.cream, fontFamily: 'var(--font-display)', fontSize: 'clamp(1.55rem, 2.5vw, 2.1rem)', lineHeight: 1.1, margin: '0.55rem 0 1rem' }}>What you are probably hearing</h2>
            <div style={{ borderTop: '1px solid rgba(201,168,76,0.32)', borderBottom: '1px solid rgba(201,168,76,0.32)', padding: '0.75rem 0' }}>
              {['The board wants a sustainability position by year end. Where do we start?', 'Three vendors have pitched us. Which one is right?', 'Is there funding for this, and is it worth the paperwork?', 'Can you just tell us the one thing we should do?'].map((line) => <p key={line} style={{ color: 'rgba(250,247,242,0.75)', fontFamily: 'var(--font-body)', fontSize: '0.84rem', lineHeight: 1.5, margin: '0.5rem 0' }}>{line}</p>)}
            </div>
            <h2 style={{ color: C.cream, fontFamily: 'var(--font-display)', fontSize: '1.35rem', lineHeight: 1.15, margin: '1.25rem 0 0.75rem' }}>And what you might be weighing</h2>
            {['You do not want to hand a client to a firm that will try to own the relationship.', 'You do not want to recommend a vendor and carry the blame if it underdelivers.', 'You do not have a sustainability practice, and you are not sure you want to build one.'].map((line) => <p key={line} style={{ color: 'rgba(250,247,242,0.75)', fontFamily: 'var(--font-body)', fontSize: '0.84rem', lineHeight: 1.5, margin: '0.5rem 0' }}>{line}</p>)}
            <p style={{ color: C.goldLight, fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: 700, lineHeight: 1.5, margin: '1rem 0 0' }}>You shouldn’t have to. That’s what the partner program is for.</p>
          </aside>
        </div>
      </header>


      <section id="how-it-works" style={{ ...section, background: C.paper, scrollMarginTop: '90px' }}>
        <div style={wrap}>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <SectionHeading kicker="The third option" title="From your client’s question to a verified result" body="Add Enduring Advantage as the delivery support behind the client relationship you own. The work moves in sequence from a credible decision to a human-tested plan to delivery." />
            <div>{STEPS.map(([title, body], index) => <article key={title} className="flex gap-4" style={{ borderBottom: index < STEPS.length - 1 ? `1px solid ${C.line}` : 0, padding: index === 0 ? '0 0 1.1rem' : '1.1rem 0' }}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: C.navy, color: C.goldLight, fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 800 }}>{String(index + 1).padStart(2, '0')}</span><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.98rem', lineHeight: 1.68, margin: 0 }}><strong style={{ color: C.navy }}>{title}</strong> {body}</p></article>)}</div>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]" style={{ borderTop: `1px solid ${C.line}`, marginTop: '3rem', paddingTop: '2.4rem' }}>
            <div style={{ borderLeft: `4px solid ${C.gold}`, paddingLeft: '1.15rem' }}><p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.13em', margin: '0 0 0.5rem', textTransform: 'uppercase' }}>What your client gets</p><h3 style={{ color: C.navy, fontFamily: 'var(--font-display)', fontSize: '1.7rem', lineHeight: 1.15, margin: 0 }}>What your client gets</h3><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.94rem', lineHeight: 1.7, margin: '0.85rem 0 0' }}>It starts with the decision in front of them, the data they have, the urgency, the timing and the people involved. The Diagnostic is a situation assessment, the start of data collection and the first low-risk wins. Then the whole field is screened through two gates: a positive environmental impact across the entire Sustainability Playing Field and a minimum financial materiality standard. Whatever clears both is ranked by financial return, measured the way your client measures it.</p><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.94rem', lineHeight: 1.7, margin: '0.85rem 0 0' }}>Your client receives one action and the reasoning behind it. Not a shortlist. From there the Coach and specialists turn it into a plan, run a vendor-neutral selection, manage delivery and report results. Then the next move gets named. You are in the room for all of it.</p><a href="/diagnostic" className="mt-3 inline-flex items-center gap-1.5" style={{ color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 800, textDecoration: 'none' }}>See how the Diagnostic works <ArrowRight size={14} /></a></div>
            <aside style={{ background: C.navy, padding: '1.35rem' }}><p style={{ color: C.goldLight, fontFamily: 'var(--font-body)', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}><span style={{ textTransform: 'none' }}>actio</span> disclosure</p><p style={{ color: 'rgba(250,247,242,0.75)', fontFamily: 'var(--font-body)', fontSize: '0.87rem', lineHeight: 1.65, margin: '0.6rem 0 0' }}>actio is developed and owned by Catalys Inc. and licensed to Enduring Advantage at a channel rate. Catalys and Energy Advantage share a majority owner, Rob Kirkby, and that is disclosed in writing in every engagement. Your client hears it from us, never from someone else.</p></aside>
          </div>
        </div>
      </section>

      <section style={section} id="principals">
        <div style={wrap}>
          <SectionHeading kicker="Who your client will meet" title="Who your client will meet" />
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="grid gap-5 sm:grid-cols-[128px_1fr]" style={{ background: '#FFFFFF', border: `1px solid ${C.line}`, borderTop: `3px solid ${C.gold}`, padding: '1.6rem' }}><img src="/manus-storage/CampbellOhrlis_da1d067a.jpeg" alt="Campbell Ohrlis" width="128" height="128" style={{ height: '128px', objectFit: 'cover', width: '128px' }} /><div><h3 style={{ color: C.navy, fontFamily: 'var(--font-display)', fontSize: '1.6rem', lineHeight: 1.1, margin: 0 }}>Campbell Ohrlis</h3><p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.69rem', fontWeight: 800, letterSpacing: '0.1em', margin: '0.4rem 0 0.7rem', textTransform: 'uppercase' }}>VP</p><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.91rem', lineHeight: 1.65, margin: 0 }}>Runs the partner channel and will be the person on your first call. Built Brainwave Solutions Group from $100,000 to $65 million over 27 years, serving Sony, Dell, BMO, GSK, Sanofi and Merck. Has led capital raises and acquisitions from $3 million to over $50 million.</p><a href={CAMPBELL_LINKEDIN} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5" style={{ color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 800, textDecoration: 'none' }}>Campbell on LinkedIn <ExternalLink size={13} /></a></div></article>
            <article className="grid gap-5 sm:grid-cols-[128px_1fr]" style={{ background: '#FFFFFF', border: `1px solid ${C.line}`, borderTop: `3px solid ${C.gold}`, padding: '1.6rem' }}><img src="/manus-storage/RobKirkby_402e0e7f.jpeg" alt="Rob Kirkby" width="128" height="128" style={{ height: '128px', objectFit: 'cover', width: '128px' }} /><div><h3 style={{ color: C.navy, fontFamily: 'var(--font-display)', fontSize: '1.6rem', lineHeight: 1.1, margin: 0 }}>Rob Kirkby</h3><p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.69rem', fontWeight: 800, letterSpacing: '0.1em', margin: '0.4rem 0 0.7rem', textTransform: 'uppercase' }}>Founder and CEO</p><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.91rem', lineHeight: 1.65, margin: 0 }}>Forty five years in energy economics. Chief of the Project Analysis Division at Canada's National Energy Board. Founder of ECNG, and of Energy Advantage in 1996, which he still runs. MA Economics, Calgary.</p><a href={ROB_LINKEDIN} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5" style={{ color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 800, textDecoration: 'none' }}>Rob on LinkedIn <ExternalLink size={13} /></a></div></article>
          </div>
        </div>
      </section>

      <section style={{ ...section, background: C.navy }} id="energy-advantage">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center" style={wrap}>
          <a href={ENERGY_ADVANTAGE_URL} target="_blank" rel="noreferrer" aria-label="Visit Energy Advantage" className="flex items-center justify-center transition-opacity duration-200 hover:opacity-85" style={{ background: '#FFFFFF', border: '1px solid rgba(201,168,76,0.54)', minHeight: '104px', padding: '1rem' }}><img src="/manus-storage/energy-advantage-official-logo_b6f3f1d4.webp" alt="Energy Advantage" width="240" height="72" style={{ height: 'auto', maxHeight: '72px', maxWidth: '240px', objectFit: 'contain', width: '100%' }} /></a>
          <div><a href={ENERGY_ADVANTAGE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: C.gold, color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, padding: '0.82rem 1rem', textDecoration: 'none' }}>Visit energyadvantage.com <ExternalLink size={15} /></a></div>
        </div>
      </section>

      <section style={{ ...section, background: C.paper }} id="kit">
        <div style={wrap}>
          <SectionHeading kicker="What you get on day one" title="A white-label client kit, branded as yours" body="Put finance-grade materials in front of a client this week, with your logo on them, not ours." />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{KIT.map(([icon, title, description]) => <article key={title} style={{ background: '#FFFFFF', border: `1px solid ${C.line}`, padding: '1.3rem' }}><span className="inline-flex h-10 min-w-10 items-center justify-center" style={{ background: 'rgba(201,168,76,0.16)', color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800, padding: '0 0.45rem' }}>{icon}</span><h3 style={{ color: C.navy, fontFamily: 'var(--font-display)', fontSize: '1.25rem', lineHeight: 1.12, margin: '1rem 0 0.5rem' }}>{title}</h3><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.84rem', lineHeight: 1.58, margin: 0 }}>{description}</p></article>)}</div>
        </div>
      </section>

      <section style={section} id="tiers">
        <div style={wrap}>
          <SectionHeading kicker="Two ways to partner" title="Two ways to partner" body="Your number goes in writing before anyone speaks to a single one of your clients." />
          <div className="grid gap-6 lg:grid-cols-2">{TIERS.map((tier) => <article key={tier.title} style={{ background: '#FFFFFF', border: `1px solid ${C.line}`, overflow: 'hidden' }}><div style={{ background: C.navy, padding: '1.45rem' }}>{tier.stage && <p style={{ color: C.goldLight, fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>{tier.stage}</p>}<h3 style={{ color: C.cream, fontFamily: 'var(--font-display)', fontSize: '1.85rem', margin: '0.45rem 0 0' }}>{tier.title}</h3></div><ul style={{ listStyle: 'none', margin: 0, padding: '1.4rem 1.5rem' }}>{tier.items.map((item) => <li key={item} className="flex gap-3" style={{ borderBottom: `1px solid ${C.line}`, color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.6, padding: '0.85rem 0' }}><Check size={16} style={{ color: C.gold, flexShrink: 0, marginTop: '0.22rem' }} />{item}</li>)}</ul></article>)}</div>
        </div>
      </section>

      <section style={{ ...section, background: C.paper }} id="economics">
        <div style={wrap}>
          <SectionHeading kicker="Before any client call" title="Your number goes in writing before anyone speaks to a single one of your clients." />
          <div className="grid gap-5 lg:grid-cols-3"><article style={{ background: '#FFFFFF', borderTop: `3px solid ${C.gold}`, padding: '1.45rem' }}><h3 style={{ color: C.navy, fontFamily: 'var(--font-display)', fontSize: '1.45rem', margin: 0 }}>Referral partner</h3><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.91rem', lineHeight: 1.68, margin: '0.7rem 0 0' }}>You make the introduction and step back. Enduring Advantage sells the work and delivers it. You keep the client relationship and a referral share.</p></article><article style={{ background: C.navy, borderTop: `3px solid ${C.gold}`, padding: '1.45rem' }}><h3 style={{ color: C.cream, fontFamily: 'var(--font-display)', fontSize: '1.45rem', margin: 0 }}>Certified delivery partner</h3><p style={{ color: 'rgba(250,247,242,0.72)', fontFamily: 'var(--font-body)', fontSize: '0.91rem', lineHeight: 1.68, margin: '0.7rem 0 0' }}>You sell the engagement, deliver the coaching layer inside your own firm and invoice the client directly. You carry more of the work and earn considerably more of the value.</p></article><article style={{ background: '#FFFFFF', borderTop: `3px solid ${C.gold}`, padding: '1.45rem' }}><h3 style={{ color: C.navy, fontFamily: 'var(--font-display)', fontSize: '1.45rem', margin: 0 }}>Before the client call</h3><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.91rem', lineHeight: 1.68, margin: '0.7rem 0 0' }}>Your number goes in writing before anyone speaks to a single one of your clients.</p></article></div>
          <div className="grid gap-5 lg:grid-cols-3" style={{ borderTop: `1px solid ${C.line}`, marginTop: '1.4rem', paddingTop: '1.4rem' }}><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}><strong style={{ color: C.navy }}>What raises your share.</strong> Selling the engagement yourself. Delivering the coaching layer. Managing the client through delivery.</p><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}><strong style={{ color: C.navy }}>What never changes.</strong> Your client's price. They pay the same going through you as coming direct. You do not add a markup and none is added for you.</p><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}><strong style={{ color: C.navy }}>What we never do.</strong> Sell equipment. Take a referral fee from a vendor. Contact your client without you.</p></div>
        </div>
      </section>

      <section style={section} id="safe">
        <div style={wrap}>
          <SectionHeading kicker="Your relationship" title="You keep the relationship. We bring the evidence and the delivery." />
          <div className="grid gap-5 md:grid-cols-3">{SAFETY.map(([title, body], index) => <article key={title} style={{ background: '#FFFFFF', border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.gold}`, padding: '1.5rem' }}><span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: C.navy, color: C.goldLight, fontSize: '0.68rem', fontWeight: 800 }}>{String(index + 1).padStart(2, '0')}</span><h3 style={{ color: C.navy, fontFamily: 'var(--font-display)', fontSize: '1.38rem', lineHeight: 1.12, margin: '1rem 0 0.55rem' }}>{title}</h3><p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.91rem', lineHeight: 1.65, margin: 0 }}>{body}</p></article>)}</div>
        </div>
      </section>

      <section style={{ ...section, background: C.paper }} id="faq">
        <div style={wrap}><SectionHeading kicker="Straight answers" title="Questions partners ask" body="The first two answers are open by default. The remaining questions are there when you need them." /><div style={{ borderTop: `1px solid ${C.line}`, maxWidth: '970px' }}>{FAQS.map(([question, answer], index) => <FaqItem key={question} question={question} answer={answer} initialOpen={index < 2} />)}</div></div>
      </section>

      <section style={section} id="resources">
        <div style={wrap}>
          <SectionHeading kicker="Research for partners" title="Things you can put in front of a client this week" />
          <div className="grid gap-5 lg:grid-cols-2">
            <article style={{ background: C.navy, borderLeft: `4px solid ${C.gold}`, padding: '1.5rem' }}>
              <p style={{ color: C.goldLight, fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Featured guide</p>
              <h3 style={{ color: C.cream, fontFamily: 'var(--font-display)', fontSize: '1.7rem', lineHeight: 1.12, margin: '0.55rem 0' }}>How Do You Get From Thousands of Options to One Funded Decision?</h3>
              <p style={{ color: 'rgba(250,247,242,0.72)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.62, margin: 0 }}>A practical guide for a client who needs to clarify the decision, assess advisory independence and structure a useful first phase.</p>
              <a href="/articles/from-thousands-of-options-to-one-decision" className="mt-4 inline-flex items-center gap-1.5" style={{ color: C.goldLight, fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 800, textDecoration: 'none' }}>Read the guide <ArrowRight size={14} /></a>
            </article>
            <article style={{ background: '#FFFFFF', border: `1px solid ${C.line}`, borderLeft: `4px solid ${C.gold}`, padding: '1.5rem' }}>
              <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Shareable worksheet</p>
              <h3 style={{ color: C.navy, fontFamily: 'var(--font-display)', fontSize: '1.55rem', lineHeight: 1.12, margin: '0.55rem 0' }}>Freight and Procurement Decision Checklist</h3>
              <p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.62, margin: 0 }}>A fillable PDF to frame supplier, freight and sourcing exposure before a deeper conversation.</p>
              <a href="/manus-storage/ea-six-step-decision-checklist-freight-procurement_76c16cae.pdf" target="_blank" rel="noreferrer" onClick={() => trackSupplyChainChecklistDownloaded('freight_procurement', 'partners')} className="mt-4 inline-flex items-center gap-1.5" style={{ color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 800, textDecoration: 'none' }}>Open fillable PDF <ArrowRight size={14} /></a>
            </article>
          </div>
        </div>
      </section>

      <section style={{ ...section, background: C.navy }} id="apply">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start" style={wrap}>
          <div><SectionHeading inverse kicker="Become a partner" title="Start with a conversation about one client." body="Be the advisor who had the answer when the client asked what to do first, without building a practice to give it. The client stays yours." /><p style={{ color: 'rgba(250,247,242,0.64)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>Tell us about a client who is asking the question. A conversation with Campbell, no deck. If it’s not a fit, you’ll hear that on the call, and you’ll still leave with something useful to tell them.</p></div>
          <div style={{ background: '#FFFFFF', padding: 'clamp(1.35rem, 4vw, 2.2rem)' }}><form onSubmit={handleSubmit} className="grid gap-4"><div className="grid gap-4 sm:grid-cols-2"><label style={{ color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Name<input required autoComplete="name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Your name" style={{ border: `1px solid ${C.line}`, boxSizing: 'border-box', color: C.ink, display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.94rem', marginTop: '0.4rem', outline: 'none', padding: '0.75rem', width: '100%' }} /></label><label style={{ color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Firm<input required autoComplete="organization" value={form.firm} onChange={(event) => setForm((current) => ({ ...current, firm: event.target.value }))} placeholder="Your firm name" style={{ border: `1px solid ${C.line}`, boxSizing: 'border-box', color: C.ink, display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.94rem', marginTop: '0.4rem', outline: 'none', padding: '0.75rem', width: '100%' }} /></label></div><label style={{ color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Work email<input required autoComplete="email" type="email" value={form.email} onBlur={() => setEmailError(validateEmail(form.email))} onChange={(event) => { setForm((current) => ({ ...current, email: event.target.value })); if (emailError) setEmailError(validateEmail(event.target.value)); }} placeholder="you@firm.com" style={{ border: `1px solid ${emailError ? C.error : C.line}`, boxSizing: 'border-box', color: C.ink, display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.94rem', marginTop: '0.4rem', outline: 'none', padding: '0.75rem', width: '100%' }} />{emailError && <span style={{ color: C.error, display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.75rem', marginTop: '0.35rem', textTransform: 'none' }}>{emailError}</span>}</label><label style={{ color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Firm type<select required value={form.firmType} onChange={(event) => { setForm((current) => ({ ...current, firmType: event.target.value })); setFirmTypeError(null); }} style={{ background: '#FFFFFF', border: `1px solid ${firmTypeError ? C.error : C.line}`, boxSizing: 'border-box', color: form.firmType ? C.ink : C.muted, display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.94rem', marginTop: '0.4rem', outline: 'none', padding: '0.75rem', width: '100%' }}><option value="" disabled>Select firm type</option><option>Accounting / advisory / fractional CFO</option><option>Boutique sustainability consultancy</option><option>Commercial real estate / property management</option><option>Green finance lender / bank</option><option>Industry association</option><option>Other</option></select>{firmTypeError && <span style={{ color: C.error, display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.75rem', marginTop: '0.35rem', textTransform: 'none' }}>{firmTypeError}</span>}</label><label style={{ color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Phone <span style={{ color: C.muted, fontWeight: 500, textTransform: 'none' }}>(optional)</span><input autoComplete="tel" type="tel" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} placeholder="+1 800 697 3456" style={{ border: `1px solid ${C.line}`, boxSizing: 'border-box', color: C.ink, display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.94rem', marginTop: '0.4rem', outline: 'none', padding: '0.75rem', width: '100%' }} /></label><button type="submit" disabled={submitting} className="mt-2 inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: C.gold, border: 0, color: C.navy, cursor: submitting ? 'wait' : 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 800, opacity: submitting ? 0.72 : 1, padding: '0.9rem' }}>{submitting ? 'Sending application…' : <>Apply to partner <ArrowRight size={16} /></>}</button>{submitError && <p style={{ color: C.error, fontFamily: 'var(--font-body)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>{submitError}</p>}<p style={{ color: C.muted, fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.55, margin: 0 }}>We read every application ourselves and reply within one business day. No client data is collected on this page. If you would rather talk first, <a href={BOOKING_URL} target="_blank" rel="noreferrer" style={{ color: C.navy, fontWeight: 800 }}>book the first conversation instead</a>.</p></form></div>
        </div>
      </section>

      <section style={{ ...section, background: C.paper }} id="onboarding">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]" style={wrap}>
          <div>
            <SectionHeading kicker="After you apply" title="Partner onboarding FAQ" body="The main FAQ above helps a firm decide whether this model fits. These are the practical questions once you are ready to begin." />
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: C.navy, color: C.cream, fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 800, padding: '0.8rem 1rem', textDecoration: 'none' }}><Calendar size={15} /> Find your Next Best Thing</a>
          </div>
          <div style={{ borderTop: `1px solid ${C.line}` }}>{ONBOARDING_FAQS.map(([question, answer], index) => <FaqItem key={question} question={question} answer={answer} initialOpen={index === 0} animated />)}</div>
        </div>
        <div className="mt-10" style={{ ...wrap, borderTop: `1px solid ${C.line}`, paddingTop: '2.5rem' }}>
          <article className="grid gap-5 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] lg:items-center" style={{ background: C.navy, borderLeft: `4px solid ${C.gold}`, padding: 'clamp(1.4rem, 3vw, 2rem)' }}>
            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full" style={{ border: `1px solid ${C.goldLight}`, color: C.goldLight, fontFamily: 'var(--font-display)' }}><strong style={{ fontSize: '1.8rem', lineHeight: 0.9 }}>1</strong><span style={{ fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.11em', marginTop: '0.3rem', textTransform: 'uppercase' }}>page</span></div>
            <div>
              <p style={{ color: C.goldLight, fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Partner field dossier</p>
              <h3 style={{ color: C.cream, fontFamily: 'var(--font-display)', fontSize: 'clamp(1.55rem, 3vw, 2.2rem)', lineHeight: 1.1, margin: '0.5rem 0' }}>Partner field dossier</h3>
              <p style={{ color: 'rgba(250,247,242,0.74)', fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0, maxWidth: '670px' }}>A one-page checklist from your application to your first client conversation, including the white-label kit, the first introduction and the delivery hand-off.</p>
            </div>
            <a href="/manus-storage/ea-partner-onboarding-checklist_b51c57fb.pdf" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ background: C.gold, color: C.navy, fontFamily: 'var(--font-body)', fontSize: '0.87rem', fontWeight: 800, padding: '0.9rem 1rem', textDecoration: 'none', whiteSpace: 'nowrap' }}><Download size={16} /> Open checklist PDF</a>
          </article>
        </div>
      </section>

      <footer style={{ background: C.navyDeep, color: 'rgba(250,247,242,0.68)', padding: '3.5rem 0' }}>
        <div className="grid gap-8 md:grid-cols-[1fr_auto]" style={wrap}><div><p style={{ color: C.cream, fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: 0 }}>Enduring Advantage Inc.</p><p style={{ color: C.goldLight, fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.12em', margin: '0.35rem 0 1rem', textTransform: 'uppercase' }}>Partner Program</p><p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>5515 North Service Road, Suite 303<br />Burlington, ON, L7L 6G4<br /><a href="tel:+18006973456" style={{ color: C.goldLight, textDecoration: 'none' }}>1-800-697-3456</a><br /><a href="mailto:partnerships@enduringadvantage.com" style={{ color: C.goldLight, textDecoration: 'none' }}>partnerships@enduringadvantage.com</a></p></div><div className="flex flex-col gap-3 md:items-end"><a href="https://www.linkedin.com/company/enduring-advantage-inc/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2" style={{ color: C.cream, fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 700, textDecoration: 'none' }}><Linkedin size={16} /> LinkedIn company page</a><a href={ENERGY_ADVANTAGE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2" style={{ color: C.cream, fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 700, textDecoration: 'none' }}><Building2 size={16} /> Energy Advantage</a><a href={BOOKING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2" style={{ color: C.cream, fontFamily: 'var(--font-body)', fontSize: '0.84rem', fontWeight: 700, textDecoration: 'none' }}><Calendar size={16} /> Book a meeting</a></div></div><div style={{ ...wrap, borderTop: '1px solid rgba(250,247,242,0.14)', marginTop: '2rem', paddingTop: '1.25rem' }}><p style={{ color: 'rgba(250,247,242,0.5)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', lineHeight: 1.62, margin: 0 }}>Enduring Advantage Inc. is a federal Canadian corporation, incorporated in 2026, and a delivery company within the Energy Advantage group, founded in 1996. Serving Canada and the United States.</p><p style={{ color: 'rgba(250,247,242,0.5)', fontFamily: 'var(--font-body)', fontSize: '0.75rem', lineHeight: 1.62, margin: '0.85rem 0 0' }}>Partner share and engagement scope are set in the partner agreement before any client work begins.</p></div>
      </footer>
    </div>
  );
}

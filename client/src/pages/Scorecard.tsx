/**
 * Scorecard.tsx, CFO Sustainability Investment Readiness Scorecard
 *
 * Design: Institutional, finance-first. Clean white/sage palette.
 * Layout: Single-column focused flow. No nav distractions.
 * Sections: Hero → Problem → Five conditions → Questions → Result (on-page) → CTA
 *
 * Scoring logic (internal only, not displayed):
 *   Documented = 0 unresolved, Partial = 1, Unknown = 2
 *   Highest dimension total = primary barrier
 *   Tie → dual result
 */

import { useState } from 'react';
import { trackFaqOpened } from '@/lib/analytics';
import { Link } from 'wouter';
import { useSEO } from '@/hooks/useSEO';
import { ChevronRight, CheckCircle2, ArrowRight, Shield, BarChart3, Globe, Banknote, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// ─── Types ────────────────────────────────────────────────────────────────────

type AnswerValue = 'documented' | 'partial' | 'unknown' | null;

interface Question {
  id: string;
  dimension: 'A' | 'B' | 'C' | 'D' | 'E';
  label: string;
  text: string;
}

interface DimensionMeta {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  label: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DIMENSIONS: DimensionMeta[] = [
  {
    id: 'A',
    label: 'Baseline Defensibility',
    title: 'Baseline Defensibility',
    icon: <Shield size={20} />,
    description: 'Can your baseline stand up to an auditor, lender or board?',
  },
  {
    id: 'B',
    label: 'Financial Clarity',
    title: 'Financial Clarity',
    icon: <BarChart3 size={20} />,
    description: 'Are costs, benefits, assumptions, sensitivities, dependencies, and timing presented in a decision-ready form?',
  },
  {
    id: 'C',
    label: 'Market Neutrality',
    title: 'Market Neutrality',
    icon: <Globe size={20} />,
    description: 'Was the option set defined independently and compared on common criteria?',
  },
  {
    id: 'D',
    label: 'Financing Readiness',
    title: 'Financing Readiness',
    icon: <Banknote size={20} />,
    description: 'Are capital sources, eligibility, verification, and reporting obligations considered before the decision?',
  },
  {
    id: 'E',
    label: 'Execution Accountability',
    title: 'Execution Accountability',
    icon: <Target size={20} />,
    description: 'Are owners, milestones, value tracking, and exit criteria built into the plan?',
  },
];

const QUESTIONS: Question[] = [
  // Dimension A: Baseline Defensibility
  {
    id: 'A1',
    dimension: 'A',
    label: 'Definition',
    text: 'Which statement best describes the initiative\'s starting baseline? Scope, period, owner, calculation method, source systems, exclusions, and adjustments are documented.',
  },
  {
    id: 'A2',
    dimension: 'A',
    label: 'Reproducibility',
    text: 'Could someone outside the project team reproduce the baseline from the documented sources and method?',
  },
  {
    id: 'A3',
    dimension: 'A',
    label: 'Ownership',
    text: 'Is there a named owner and approval/review process for maintaining the baseline?',
  },
  // Dimension B: Financial Clarity
  {
    id: 'B1',
    dimension: 'B',
    label: 'Decision model',
    text: 'Are capex, operating impact, timing, payback/return logic, assumptions, dependencies, and sensitivities documented for the initiative?',
  },
  {
    id: 'B2',
    dimension: 'B',
    label: 'Comparability',
    text: 'Are the leading options compared using the same financial period, assumptions, and decision criteria?',
  },
  {
    id: 'B3',
    dimension: 'B',
    label: 'Downside and dependency',
    text: 'Are material implementation dependencies and downside cases visible to the decision-maker, with owners or mitigation actions?',
  },
  // Dimension C: Market Neutrality
  {
    id: 'C1',
    dimension: 'C',
    label: 'Option-set origin',
    text: 'Was the shortlist of solutions or vendors defined independently or through a documented conflict-controlled process?',
  },
  {
    id: 'C2',
    dimension: 'C',
    label: 'Common criteria',
    text: 'Are options compared against common performance, financial, operational, and evidence criteria with documented weighting or decision rules?',
  },
  {
    id: 'C3',
    dimension: 'C',
    label: 'Conflicts',
    text: 'Are financial relationships that could influence a recommendation disclosed and governed for decision-makers?',
  },
  // Dimension D: Financing Readiness
  {
    id: 'D1',
    dimension: 'D',
    label: 'Capital path',
    text: 'Has the organization identified the capital source, approval path, and decision owner for how the initiative would be funded?',
  },
  {
    id: 'D2',
    dimension: 'D',
    label: 'Eligibility and evidence',
    text: 'Are relevant financing/green-finance eligibility, verification, and reporting conditions mapped to available evidence and owners?',
  },
  {
    id: 'D3',
    dimension: 'D',
    label: 'Cost-of-capital treatment',
    text: 'Does the investment case show how funding terms and financing constraints affect the decision, with relevant sensitivities?',
  },
  // Dimension E: Execution Accountability
  {
    id: 'E1',
    dimension: 'E',
    label: 'Decision gates',
    text: 'Are there defined milestones for validation, approval, implementation, and value confirmation, each with an owner, evidence requirement, and decision rule?',
  },
  {
    id: 'E2',
    dimension: 'E',
    label: 'Value tracking',
    text: 'Is there a defined baseline, method, owner, cadence, and escalation process for measuring financial and environmental outcomes after implementation?',
  },
  {
    id: 'E3',
    dimension: 'E',
    label: 'Accountability after the report',
    text: 'Is there one accountable executive/owner and a cross-functional process for progress when recommendations cross finance, operations, procurement, and vendors?',
  },
];

// ─── Barrier-specific triage copy ───────────────────────────────────────────
const TRIAGE_COPY: Record<
  'A' | 'B' | 'C' | 'D' | 'E',
  { headline: string; body: string }
> = {
  A: {
    headline: 'An undocumented baseline is the most common reason a well-structured project loses board approval.',
    body: 'In the first conversation, we’ll identify the specific gap in your baseline documentation, clarify what a finance or audit reviewer would need to reproduce it, and recommend the appropriate next step, which may not require our involvement.',
  },
  B: {
    headline: 'Separate vendor proposals rarely produce a defensible decision order.',
    body: 'In the first conversation, we’ll clarify the decision frame in front of you, identify the leading comparability or conflict gap, and recommend the appropriate next step, which may not require our involvement.',
  },
  C: {
    headline: 'When the option set is defined by the seller, the buyer\'s decision is constrained before it begins.',
    body: 'In the first conversation, we’ll identify where the current shortlist or comparison criteria may be shaped by a party with a financial interest, and recommend the appropriate next step, which may not require our involvement.',
  },
  D: {
    headline: 'Financing and approval requirements introduced late can force rework or weaken confidence.',
    body: 'In the first conversation, we’ll identify the capital path, eligibility, and evidence gaps that could block or delay approval, and recommend the appropriate next step, which may not require our involvement.',
  },
  E: {
    headline: 'A report is not a control system. Ownership, milestones, and value confirmation need to be designed before implementation begins.',
    body: 'In the first conversation, we’ll identify the accountability gap most likely to cause value leakage after approval, and recommend the appropriate next step, which may not require our involvement.',
  },
};

// ─── Result content ───────────────────────────────────────────────────────────
const RESULTS: Record<
  'A' | 'B' | 'C' | 'D' | 'E',
  {
    barrier: string;
    summary: string;
    whyItMatters: string;
    checklist: string[];
    selfDirected: string;
    relatedArticle?: { title: string; slug: string };
  }
> = {
  A: {
    barrier: 'Baseline Defensibility',
    summary:
      'The initiative may be difficult to approve, finance, or measure because the starting point is not yet documented in a form another reviewer can reproduce.',
    whyItMatters:
      'A strong project can still lose credibility when scope, period, source systems, adjustment rules, or ownership are unclear. The next move isn’t more projection. It’s a traceable starting point.',
    checklist: [
      'Defined scope and organisational boundary',
      'Baseline period and adjustment rules',
      'Source systems and evidence owner',
      'Calculation method and exclusions',
      'Reconciliation/reproducibility test',
      'Approval and change-control process',
    ],
    selfDirected:
      'Ask a finance or audit reviewer who was not involved in building the baseline to reproduce it and record every assumption or source they cannot verify.',
    relatedArticle: {
      title: 'The Data Defensibility Problem',
      slug: 'the-data-defensibility-problem-why-96-percent-of-cfos-cant-stand-behind-their-sustainability-numbers',
    },
  },
  B: {
    barrier: 'Financial Clarity',
    summary:
      'The organization has options, but they may not be compared on a common financial, operational, environmental, and evidence basis.',
    whyItMatters:
      'Separate vendor proposals and project lists can create activity without a defensible decision order. The next move is a common decision frame, not another standalone proposal.',
    checklist: [
      'Complete option set and inclusion method',
      'Common financial period and assumptions',
      'Operational dependencies and constraints',
      'Environmental outcome definition',
      'Evidence quality and uncertainty',
      'Conflict/relationship disclosure',
      'Ranking rule and decision owner',
    ],
    selfDirected:
      'Put the three leading options into one comparison table. Mark any cell that relies only on the seller\'s method or cannot be reconciled to a common baseline.',
    relatedArticle: {
      title: 'Sustainability Is Not a Cost Centre',
      slug: 'sustainability-is-not-a-cost-centre',
    },
  },
  C: {
    barrier: 'Market Neutrality',
    summary:
      'The current shortlist may be shaped by organizations that benefit from the selected solution, making alternatives difficult to assess on a common basis.',
    whyItMatters:
      'Expertise from vendors is valuable, but the decision frame should be owned by the buyer. The next move is to define the option set and comparison criteria independently.',
    checklist: [
      'Independent problem/requirement definition',
      'Option inclusion and exclusion rules',
      'Common comparison criteria',
      'Compensation and referral disclosure',
      'Evidence-quality standard',
      'Decision rights and conflict safeguards',
    ],
    selfDirected:
      'Separate "who helps define the decision" from "who earns revenue if an option is selected." Document the safeguard for any organization that occupies both roles.',
    relatedArticle: {
      title: 'The Conflict of Interest at the Heart of Sustainability Advisory',
      slug: 'the-conflict-of-interest-at-the-heart-of-sustainability-advisory',
    },
  },
  D: {
    barrier: 'Financing Readiness',
    summary:
      'The initiative may have a sound technical case but lacks an integrated capital path, approval model, or evidence package.',
    whyItMatters:
      'Financing and approval requirements introduced late can force rework or weaken confidence. The next move is to treat funding, evidence, and reporting as design inputs.',
    checklist: [
      'Capital source and approval path',
      'Eligible-use and verification requirements where relevant',
      'Funding term assumptions',
      'Sensitivity to cost of capital and timing',
      'Reporting/measurement obligations',
      'Named finance, legal, and evidence owners',
    ],
    selfDirected:
      'Ask the likely capital owner or lender for the minimum decision and reporting package before the option is finalized.',
    relatedArticle: {
      title: 'The Green Financing Gap',
      slug: 'the-green-financing-gap',
    },
  },
  E: {
    barrier: 'Execution Accountability',
    summary:
      'The initiative may have a credible recommendation, but ownership, milestones, and value confirmation are not yet designed across the participating teams.',
    whyItMatters:
      'A report is not a control system. The next move is to assign decision gates, evidence, and escalation before implementation begins.',
    checklist: [
      'Accountable executive and cross-functional process',
      'Milestone owners and evidence requirements',
      'Value tracking method and cadence',
      'Escalation path for cross-boundary decisions',
      'Exit criteria and milestone-exit consequence',
      'Reporting/confirmation cadence for the board',
    ],
    selfDirected:
      'Name one executive who owns the outcome across all participating teams. Define what evidence confirms each milestone before the next phase is approved.',
    relatedArticle: {
      title: 'The Accountability Gap: Why Sustainability Strategies Gather Dust',
      slug: 'the-accountability-gap-why-sustainability-strategies-gather-dust',
    },
  },
};

// ─── Scoring ──────────────────────────────────────────────────────────────────

const SCORE_MAP: Record<NonNullable<AnswerValue>, number> = {
  documented: 0,
  partial: 1,
  unknown: 2,
};

function computeResult(answers: Record<string, AnswerValue>): {
  primary: 'A' | 'B' | 'C' | 'D' | 'E';
  secondary: ('A' | 'B' | 'C' | 'D' | 'E') | null;
  scores: Record<string, number>;
} {
  const scores: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  QUESTIONS.forEach((q) => {
    const val = answers[q.id];
    if (val) scores[q.dimension] += SCORE_MAP[val];
  });

  const sorted = (Object.entries(scores) as [string, number][]).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0] as 'A' | 'B' | 'C' | 'D' | 'E';
  const secondary =
    sorted[1][1] === sorted[0][1] ? (sorted[1][0] as 'A' | 'B' | 'C' | 'D' | 'E') : null;

  return { primary, secondary, scores };
}

// ─── Component ────────────────────────────────────────────────────────────────

function ScorecardFaqItem({ q, a, last }: { q: string; a: string; last?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: last ? 'none' : '1px solid rgba(201,168,76,0.1)', marginBottom: last ? 0 : '0.25rem' }}>
      <button
        onClick={() => { if (!open) trackFaqOpened(q, 'scorecard'); setOpen(!open); }}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '0.75rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-slate-deep)' }}>{q}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1)' }}><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div style={{ maxHeight: open ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s cubic-bezier(0.23,1,0.32,1)' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'oklch(0.45 0.02 200)', lineHeight: 1.7, paddingBottom: '0.75rem', margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

function ScorecardFaq() {
  return (
    <div style={{ background: 'oklch(0.97 0.006 152)', padding: '1.5rem 2rem', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1rem' }}>
        Common Questions
      </p>
      <ScorecardFaqItem q="What does this cost?" a="We scope the Diagnostic around the decision you need to make. Before work begins, we agree on the data, deliverables, and commercial terms, so you can decide whether it’s the right next step." />
      <ScorecardFaqItem q="How quickly will we see results?" a="Some actions, such as rate structures and incentive capture, can show results within months. Capital projects take longer. Three years or less is the financial return bar most CFOs call compelling, and it is the standard we screen against." />
      <ScorecardFaqItem q="What if the analysis finds nothing worth doing?" a="Then we tell you that. You walk away with an initial baseline built from your available data, plus greater clarity, at a known cost. Recommending work for its own sake is exactly the conflict of interest our fee structure was designed to eliminate." last />
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'oklch(0.52 0.02 200)', marginTop: '1rem' }}>
        More questions?{' '}
        <a href="/questions" style={{ color: '#C9A84C', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.3)' }}>
          See our full FAQ
        </a>
        .
      </p>
    </div>
  );
}

export default function Scorecard() {
  useSEO({
    title: 'Sustainability Investment Readiness Scorecard | Enduring Advantage',
    description:
      'Assess your organization’s readiness to unlock financial returns from sustainability investment. 15 questions, 5 dimensions, actionable result in under 5 minutes.',
    canonicalPath: '/scorecard',
    ogImage: 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/scorecard-og-image-5aa6sMzUaAWAnWiNpAZNhx.png',
  });

  const [phase, setPhase] = useState<'landing' | 'initiative' | 'questions' | 'capture' | 'result'>('landing');
  const [initiativeName, setInitiativeName] = useState('');
  const [initiativeDescription, setInitiativeDescription] = useState('');
  const [initiativeError, setInitiativeError] = useState('');
  const [currentDimIdx, setCurrentDimIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [captureData, setCaptureData] = useState({ name: '', email: '' });
  const [captureError, setCaptureError] = useState('');
  const [result, setResult] = useState<ReturnType<typeof computeResult> | null>(null);
  // "Send me my result" panel state
  const [sendEmail, setSendEmail] = useState('');
  const [sendName, setSendName] = useState('');
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [sendError, setSendError] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://enduringadvantage.com/scorecard').then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    });
  };

  const currentDim = DIMENSIONS[currentDimIdx];
  const dimQuestions = QUESTIONS.filter((q) => q.dimension === currentDim?.id);
  const dimAnswered = dimQuestions.every((q) => answers[q.id] !== undefined && answers[q.id] !== null);
  const totalAnswered = QUESTIONS.filter((q) => answers[q.id] !== null && answers[q.id] !== undefined).length;
  const progress = Math.round((totalAnswered / QUESTIONS.length) * 100);

  function handleAnswer(qId: string, val: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  }

  function handleNextDim() {
    if (currentDimIdx < DIMENSIONS.length - 1) {
      setCurrentDimIdx((i) => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPhase('capture');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleCapture(e: React.FormEvent) {
    e.preventDefault();
    if (!captureData.name.trim() || !captureData.email.trim()) {
      setCaptureError('Please enter your name and business email to receive your result.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(captureData.email)) {
      setCaptureError('Please enter a valid business email address.');
      return;
    }
    const computed = computeResult(answers);
    setResult(computed);
    setPhase('result');
    // Pre-populate the result send form with the capture data
    setSendEmail(captureData.email);
    setSendName(captureData.name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const answerLabels: Record<NonNullable<AnswerValue>, string> = {
    documented: 'Documented',
    partial: 'Partially documented',
    unknown: 'Not documented / unknown',
  };

  // Max score per dimension (questions × 2 for all-unknown)
  const DIM_MAX: Record<string, number> = { A: 8, B: 6, C: 6, D: 6, E: 6 };

  async function handleSendResult(e: React.FormEvent) {
    e.preventDefault();
    setSendError('');
    if (!sendName.trim() || !sendEmail.trim()) {
      setSendError('Please enter your name and email.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sendEmail)) {
      setSendError('Please enter a valid email address.');
      return;
    }
    setSendStatus('sending');
    // Build a plain-text summary of the result to send
    const dimLabels: Record<string, string> = {
      A: 'Baseline Defensibility',
      B: 'Financial Clarity',
      C: 'Market Neutrality',
      D: 'Financing Readiness',
      E: 'Execution Accountability',
    };
    const scoreLines = Object.entries(result?.scores ?? {}).map(([k, v]) => {
      const max = DIM_MAX[k] ?? 6;
      const pct = Math.round((v / max) * 100);
      return `${dimLabels[k]}: ${pct}% gap`;
    }).join('\n');
    const primaryBarrier = result ? RESULTS[result.primary].barrier : '';
    const body = [
      `Hi ${sendName.split(' ')[0]},`,
      '',
      initiativeName ? `Initiative assessed: ${initiativeName}` : '',
      initiativeDescription ? `Context: ${initiativeDescription}` : '',
      initiativeName || initiativeDescription ? '' : '',
      `Your primary readiness barrier is: ${primaryBarrier}`,
      '',
      'Dimension scores (higher = larger gap):',
      scoreLines,
      '',
      'Your evidence checklist and self-directed next step are available at:',
      'https://enduringadvantage.com/scorecard',
      '',
      'If an independent view would help, you can request the first conversation with a principal at:',
      'https://enduringadvantage.com/contact',
      '',
      'Enduring Advantage',
    ].join('\n');
    // Use mailto as a graceful fallback (no backend needed on static site)
    const subject = encodeURIComponent(initiativeName
      ? `${initiativeName}, Readiness Result: ${primaryBarrier}`
      : `Your CFO Sustainability Investment Readiness Result, ${primaryBarrier}`
    );
    const bodyEncoded = encodeURIComponent(body);
    const mailto = `mailto:${sendEmail}?subject=${subject}&body=${bodyEncoded}`;
    // Open the mailto link, this sends via the user's own mail client
    window.location.href = mailto;
    // Small delay then mark as sent
    setTimeout(() => setSendStatus('sent'), 600);
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0D3349]">
      <Navigation />

      {/* ── LANDING PHASE ─────────────────────────────────────────────────── */}
      {phase === 'landing' && (
        <>
          {/* Urgency strip */}
          <section className="pt-28 pb-0 px-6 max-w-3xl mx-auto">
            <div
              className="rounded-xl px-6 py-5 mb-10"
              style={{ background: '#0D3349', border: '1px solid rgba(134,239,172,0.15)' }}
            >
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: 'rgba(134,239,172,0.6)', fontFamily: 'var(--font-body)' }}
              >
                The stakes
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: '#FAF7F2', fontFamily: 'var(--font-body)', margin: 0 }}
              >
                Climate change, biodiversity loss, pollution and waste are already affecting costs, insurance terms and asset values. Waiting until it’s obvious in your accounts means the cheapest responses are gone. The question is not whether to act. The question is{' '}
                <em style={{ color: '#C9A84C' }}>which action goes first.</em>
              </p>
            </div>
          </section>

          {/* Hero */}
          <section className="pt-4 pb-20 px-6 max-w-3xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71] mb-6">
              For CFOs, finance and operational leaders
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#0D3349] mb-6">
              Your sustainability initiative has a business case. This tells you whether it will hold.
            </h1>
            <p className="text-lg text-[#4A5E60] leading-relaxed mb-10 max-w-2xl">
              When a sustainability initiative isn’t approved or doesn’t deliver, one of five decision conditions is usually the reason. This assessment identifies which one is most likely to block your next investment decision.
            </p>
            <Button
              onClick={() => { setPhase('initiative'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-[#0D3349] text-[#FAF7F2] hover:bg-[#2d4245] px-8 py-4 text-base font-semibold rounded-none h-auto"
            >
              Start the Scorecard
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <p className="text-sm text-[#7A8E90] mt-4">
              15-question assessment. Immediate on-page result. No sales call required.
            </p>
            <p className="text-sm text-[#7A8E90] mt-2">
              Have questions first?{' '}
              <a href="/questions" style={{ color: '#6B8F71', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid rgba(107,143,113,0.4)' }}>
                See our FAQ
              </a>
              .
            </p>
          </section>

          {/* Problem section */}
          <section className="py-16 px-6 bg-white border-t border-[#E8E0D4]">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#0D3349] mb-6">
                Choosing the right initiative is only half the problem
              </h2>
              <p className="text-base text-[#4A5E60] leading-relaxed mb-6">
                A project can appear financially attractive and still fail to get approved or delivered. The baseline may not withstand scrutiny. Financial assumptions may not be comparable across options. A vendor may have defined the option set. Financing requirements may be addressed too late. Ownership may stop at the report.
              </p>
              <p className="text-base text-[#4A5E60] leading-relaxed">
                This assessment identifies which of these five conditions is most likely to block your next sustainability investment decision, so you can address it before it becomes a problem.
              </p>
            </div>
          </section>

          {/* Five conditions */}
          <section className="py-16 px-6 bg-[#FAF7F2] border-t border-[#E8E0D4]">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#0D3349] mb-10">
                Five conditions behind a defensible investment case
              </h2>
              <div className="space-y-5">
                {DIMENSIONS.map((dim) => (
                  <div key={dim.id} className="flex gap-4 p-5 bg-white border border-[#E8E0D4]">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#6B8F71] mt-0.5">
                      {dim.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0D3349] mb-1">{dim.title}</p>
                      <p className="text-sm text-[#4A5E60] leading-relaxed">{dim.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Output section */}
          <section className="py-16 px-6 bg-white border-t border-[#E8E0D4]">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Cormorant_Garamond'] text-3xl font-semibold text-[#0D3349] mb-8">
                What you will receive
              </h2>
              <ul className="space-y-4">
                {[
                  'Your primary readiness barrier, with a plain-language explanation.',
                  'An evidence checklist for the next internal review.',
                  'A recommended next step that doesn’t assume you need an adviser.',
                  'A relevant Enduring Advantage article on the condition blocking your decision.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 size={18} className="text-[#6B8F71] flex-shrink-0 mt-0.5" />
                    <span className="text-[#4A5E60]">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#7A8E90] mt-6 border-l-2 border-[#E8E0D4] pl-4">
                If an independent view would help, you can ask for a conversation with a principal after seeing the result.
              </p>
            </div>
          </section>

          {/* Fit section */}
          <section className="py-16 px-6 bg-[#FAF7F2] border-t border-[#E8E0D4]">
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[#0D3349] mb-3">This scorecard is designed for</h3>
                <p className="text-sm text-[#4A5E60] leading-relaxed">
                  Enterprise finance and operational leaders who are evaluating an active sustainability, energy, resource-efficiency, emissions, green-financing, or implementation decision.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#0D3349] mb-3">It's not</h3>
                <p className="text-sm text-[#4A5E60] leading-relaxed">
                  A savings calculator, regulatory opinion, equipment quote, certification, financing approval, or substitute for analysis of your organization's data.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 px-6 bg-[#0D3349] text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#FAF7F2] mb-6">
                Find the condition to resolve first
              </h2>
              <Button
                onClick={() => { setPhase('initiative'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-[#6B8F71] text-white hover:bg-[#5a7a60] px-8 py-4 text-base font-semibold rounded-none h-auto"
              >
                Start the Scorecard
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <p className="text-sm text-[rgba(250,247,242,0.5)] mt-4">
                Have questions first?{' '}
                <a href="/questions" style={{ color: '#C9A84C', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid rgba(134,239,172,0.35)' }}>
                  See our FAQ
                </a>
                .
              </p>
            </div>
          </section>
        </>
      )}

      {/* ── INITIATIVE PHASE ──────────────────────────────────────────────── */}
      {phase === 'initiative' && (
        <section className="pt-28 pb-20 px-6 min-h-screen">
          <div className="max-w-xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71] mb-4">
              Step 1 of 2, Define your initiative
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#0D3349] mb-4">
              What initiative are you assessing?
            </h2>
            <p className="text-[#4A5E60] mb-8 leading-relaxed">
              Give your initiative a short working name, for example "Rooftop solar at the Burlington plant" or "Scope 3 reduction program." This name will appear throughout the scorecard and in your result.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!initiativeName.trim()) {
                  setInitiativeError('Please enter a name for the initiative.');
                  return;
                }
                setInitiativeError('');
                setPhase('questions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="space-y-5"
            >
              <div>
                <label htmlFor="sc-initiative" className="block text-sm font-semibold text-[#0D3349] mb-2">
                  Initiative name
                </label>
                <input
                  id="sc-initiative"
                  type="text"
                  value={initiativeName}
                  onChange={(e) => { setInitiativeName(e.target.value); setInitiativeError(''); }}
                  placeholder="e.g. Solar PV at Burlington plant"
                  maxLength={120}
                  autoFocus
                  className="w-full border border-[#C8BFB0] bg-white px-4 py-3 text-sm text-[#0D3349] placeholder-[#A8A09A] focus:outline-none focus:border-[#0D3349] transition-colours"
                />
                {initiativeError && (
                  <p className="text-sm text-red-600 mt-1">{initiativeError}</p>
                )}
              </div>
              <div>
                <label htmlFor="sc-initiative-desc" className="block text-sm font-semibold text-[#0D3349] mb-2">
                  Brief context <span className="font-normal text-[#7A8E90]">(optional)</span>
                </label>
                <textarea
                  id="sc-initiative-desc"
                  value={initiativeDescription}
                  onChange={(e) => setInitiativeDescription(e.target.value)}
                  placeholder="e.g. ~$4M capex, board decision in Q3, currently at feasibility stage"
                  maxLength={280}
                  rows={2}
                  className="w-full border border-[#C8BFB0] bg-white px-4 py-3 text-sm text-[#0D3349] placeholder-[#A8A09A] focus:outline-none focus:border-[#0D3349] transition-colours resize-none"
                />
                <p className="text-xs text-[#7A8E90] mt-1">This context will appear in your result and in any triage request you submit.</p>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#0D3349] text-[#FAF7F2] hover:bg-[#2d4245] py-4 text-base font-semibold rounded-none h-auto"
              >
                Begin assessment
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <button
                type="button"
                onClick={() => { setPhase('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-sm text-[#7A8E90] hover:text-[#0D3349] transition-colours"
              >
                ← Back
              </button>
            </form>
          </div>
        </section>
      )}
      {phase === 'questions' && (
        <section className="pt-28 pb-20 px-6 min-h-screen">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71]">
                  Dimension {currentDimIdx + 1} of {DIMENSIONS.length}
                </p>
                <p className="text-xs text-[#7A8E90]">{progress}% complete</p>
              </div>
              <div className="h-1 bg-[#E8E0D4] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6B8F71] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {/* Dimension tabs */}
              <div className="flex gap-1 mt-3">
                {DIMENSIONS.map((d, i) => (
                  <div
                    key={d.id}
                    className={`h-1 flex-1 rounded-full transition-colours duration-300 ${
                      i < currentDimIdx
                        ? 'bg-[#6B8F71]'
                        : i === currentDimIdx
                        ? 'bg-[#0D3349]'
                        : 'bg-[#E8E0D4]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Dimension header */}
            <div className="mb-8 p-5 bg-white border border-[#E8E0D4]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#6B8F71]">{currentDim.icon}</span>
                <h2 className="font-['Cormorant_Garamond'] text-2xl font-semibold text-[#0D3349]">
                  {currentDim.title}
                </h2>
              </div>
              <p className="text-sm text-[#4A5E60]">{currentDim.description}</p>
            </div>

            {/* Initiative name pill */}
            {initiativeName && (
              <div className="mb-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#7A8E90]">Assessing:</span>
                  <span className="text-xs font-semibold text-[#0D3349] bg-[#E8E0D4] px-3 py-1 rounded-full truncate max-w-xs">
                    {initiativeName}
                  </span>
                </div>
                {initiativeDescription && (
                  <p className="text-xs text-[#7A8E90] mt-1.5 pl-1">{initiativeDescription}</p>
                )}
              </div>
            )}
            {/* Instructions */}
            <p className="text-xs text-[#7A8E90] mb-6 leading-relaxed border-l-2 border-[#E8E0D4] pl-3">
              Answer for <strong className="text-[#0D3349]">{initiativeName || 'one initiative, portfolio, or decision currently under consideration'}</strong>. &ldquo;Documented&rdquo; means a finance, audit, lender, or board reviewer could inspect the basis, not merely that someone believes the answer is known.
            </p>

            {/* Questions */}
            <div className="space-y-8">
              {dimQuestions.map((q) => (
                <div key={q.id} className="bg-white border border-[#E8E0D4] p-6">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71] mb-2">
                    {q.label}
                  </p>
                  <p className="text-base text-[#0D3349] font-medium leading-relaxed mb-5">
                    {q.text}
                  </p>
                  <div className="space-y-2">
                    {(['documented', 'partial', 'unknown'] as AnswerValue[]).map((val) => (
                      <button
                        key={val}
                        onClick={() => handleAnswer(q.id, val)}
                        className={`w-full text-left px-4 py-3 border text-sm transition-all duration-150 ${
                          answers[q.id] === val
                            ? 'border-[#0D3349] bg-[#0D3349] text-[#FAF7F2]'
                            : 'border-[#E8E0D4] bg-white text-[#4A5E60] hover:border-[#6B8F71] hover:text-[#0D3349]'
                        }`}
                      >
                        <span className="font-semibold capitalize">{answerLabels[val!]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-10 flex justify-between items-center">
              {currentDimIdx > 0 ? (
                <button
                  onClick={() => { setCurrentDimIdx((i) => i - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-sm text-[#7A8E90] hover:text-[#0D3349] transition-colours"
                >
                  ← Previous
                </button>
              ) : (
                <button
                  onClick={() => { setPhase('initiative'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-sm text-[#7A8E90] hover:text-[#0D3349] transition-colours"
                >
                  ← Back
                </button>
              )}
              <Button
                onClick={handleNextDim}
                disabled={!dimAnswered}
                className="bg-[#0D3349] text-[#FAF7F2] hover:bg-[#2d4245] px-6 py-3 text-sm font-semibold rounded-none h-auto disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {currentDimIdx < DIMENSIONS.length - 1 ? (
                  <>Next dimension <ChevronRight size={14} className="ml-1" /></>
                ) : (
                  <>See my result <ArrowRight size={14} className="ml-1" /></>
                )}
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* ── CAPTURE PHASE ─────────────────────────────────────────────────── */}
      {phase === 'capture' && (
        <section className="pt-28 pb-20 px-6 min-h-screen">
          <div className="max-w-xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71] mb-4">
              Almost there
            </p>
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#0D3349] mb-4">
              Where should we send your result?
            </h2>
            <p className="text-[#4A5E60] mb-8 leading-relaxed">
              Your result will appear immediately on this page. We’ll also send a copy to your inbox so you have the evidence checklist for your next internal review.
            </p>
            <form onSubmit={handleCapture} className="space-y-5">
              <div>
                <label htmlFor="sc-name" className="block text-sm font-semibold text-[#0D3349] mb-2">
                  First name
                </label>
                <input
                  id="sc-name"
                  type="text"
                  value={captureData.name}
                  onChange={(e) => setCaptureData((d) => ({ ...d, name: e.target.value }))}
                  placeholder="Your first name"
                  className="w-full border border-[#C8BFB0] bg-white px-4 py-3 text-sm text-[#0D3349] placeholder-[#A8A09A] focus:outline-none focus:border-[#0D3349] transition-colours"
                />
              </div>
              <div>
                <label htmlFor="sc-email" className="block text-sm font-semibold text-[#0D3349] mb-2">
                  Business email
                </label>
                <input
                  id="sc-email"
                  type="email"
                  value={captureData.email}
                  onChange={(e) => setCaptureData((d) => ({ ...d, email: e.target.value }))}
                  placeholder="you@company.com"
                  className="w-full border border-[#C8BFB0] bg-white px-4 py-3 text-sm text-[#0D3349] placeholder-[#A8A09A] focus:outline-none focus:border-[#0D3349] transition-colours"
                />
              </div>
              {captureError && (
                <p className="text-sm text-red-600">{captureError}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-[#0D3349] text-[#FAF7F2] hover:bg-[#2d4245] py-4 text-base font-semibold rounded-none h-auto"
              >
                View my result
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <p className="text-xs text-[#7A8E90] leading-relaxed">
                Your result will appear immediately. We will send a copy to your inbox. We will not add you to a marketing list without a separate, clear request.
              </p>
            </form>
          </div>
        </section>
      )}

      {/* ── RESULT PHASE ──────────────────────────────────────────────────── */}
      {phase === 'result' && result && (
        <section className="pt-28 pb-20 px-6 min-h-screen">
          <div className="max-w-2xl mx-auto">
            {/* Initiative name pill on result */}
            {initiativeName && (
              <div className="mb-6">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold tracking-widest uppercase text-[#7A8E90]">Initiative assessed:</span>
                  <span className="text-xs font-semibold text-[#0D3349] bg-[#E8E0D4] px-3 py-1 rounded-full truncate max-w-xs">
                    {initiativeName}
                  </span>
                </div>
                {initiativeDescription && (
                  <p className="text-xs text-[#7A8E90] mt-1.5 pl-1">{initiativeDescription}</p>
                )}
              </div>
            )}
            {/* Primary result */}
            <div className="mb-10 p-8 bg-white border border-[#0D3349]">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71] mb-3">
                Your primary barrier
              </p>
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-semibold text-[#0D3349] mb-4">
                {RESULTS[result.primary].barrier}
              </h2>
              <p className="text-[#4A5E60] leading-relaxed mb-4">
                {RESULTS[result.primary].summary}
              </p>
              <p className="text-sm text-[#4A5E60] leading-relaxed border-l-2 border-[#6B8F71] pl-4">
                {RESULTS[result.primary].whyItMatters}
              </p>
            </div>

            {/* Secondary result if tie */}
            {result.secondary && (
              <div className="mb-10 p-6 bg-[#FAF7F2] border border-[#E8E0D4]">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71] mb-2">
                  Connected barrier
                </p>
                <p className="text-[#4A5E60] leading-relaxed">
                  Your assessment points to two connected barriers: <strong>{RESULTS[result.primary].barrier}</strong> and <strong>{RESULTS[result.secondary].barrier}</strong>. Resolve them in sequence rather than forcing a false single diagnosis.
                </p>
              </div>
            )}

            {/* Evidence checklist */}
            <div className="mb-10">
              <h3 className="font-semibold text-[#0D3349] mb-4">Evidence checklist for your next internal review</h3>
              <ul className="space-y-3">
                {RESULTS[result.primary].checklist.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 size={16} className="text-[#6B8F71] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#4A5E60]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Self-directed next step */}
            <div className="mb-10 p-5 bg-[#F0EDE6] border-l-4 border-[#6B8F71]">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71] mb-2">
                Self-directed next step
              </p>
              <p className="text-sm text-[#0D3349] leading-relaxed">
                {RESULTS[result.primary].selfDirected}
              </p>
            </div>

            {/* ── SEND MY RESULT PANEL ─────────────────────────────────── */}
            <div className="mb-10 border border-[#E8E0D4] bg-white">
              {/* Dimension score bars */}
              <div className="p-6 border-b border-[#E8E0D4]">
                <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71] mb-4">Your readiness profile</p>
                <div className="space-y-3">
                  {DIMENSIONS.map((dim) => {
                    const score = result.scores[dim.id] ?? 0;
                    const max = DIM_MAX[dim.id] ?? 6;
                    const pct = Math.round((score / max) * 100);
                    const isPrimary = dim.id === result.primary;
                    return (
                      <div key={dim.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-xs font-medium ${isPrimary ? 'text-[#0D3349] font-semibold' : 'text-[#4A5E60]'}`}>
                            {dim.label}{isPrimary ? ' ← primary barrier' : ''}
                          </span>
                          <span className="text-xs text-[#7A8E90]">{pct}% gap</span>
                        </div>
                        <div className="h-1.5 bg-[#E8E0D4] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              background: isPrimary ? '#0D3349' : '#6B8F71',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Email form */}
              {sendStatus === 'sent' ? (
                <div className="p-6 flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-[#6B8F71] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-[#0D3349]">Result prepared for your inbox</p>
                    <p className="text-xs text-[#7A8E90] mt-0.5">Your mail client opened with a pre-filled message. Send it to keep a copy of your result and evidence checklist.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendResult} className="p-6">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71] mb-1">Send me my result</p>
                  <p className="text-sm text-[#4A5E60] mb-4 leading-relaxed">
                    Receive a copy of your primary barrier, dimension scores, and evidence checklist to support your next internal review.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <div className="flex-1">
                      <label htmlFor="send-name" className="block text-xs font-semibold text-[#0D3349] mb-1">Your name</label>
                      <input
                        id="send-name"
                        type="text"
                        value={sendName}
                        onChange={(e) => setSendName(e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full border border-[#C8BFB0] bg-[#FAF7F2] px-3 py-2.5 text-sm text-[#0D3349] placeholder-[#A8A09A] focus:outline-none focus:border-[#0D3349] transition-colours"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="send-email" className="block text-xs font-semibold text-[#0D3349] mb-1">Business email</label>
                      <input
                        id="send-email"
                        type="email"
                        value={sendEmail}
                        onChange={(e) => setSendEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full border border-[#C8BFB0] bg-[#FAF7F2] px-3 py-2.5 text-sm text-[#0D3349] placeholder-[#A8A09A] focus:outline-none focus:border-[#0D3349] transition-colours"
                      />
                    </div>
                  </div>
                  {sendError && <p className="text-xs text-red-600 mb-3">{sendError}</p>}
                  <button
                    type="submit"
                    disabled={sendStatus === 'sending'}
                    className="inline-flex items-center gap-2 bg-[#0D3349] text-[#FAF7F2] px-5 py-2.5 text-sm font-semibold hover:bg-[#2d4245] transition-colours disabled:opacity-60"
                  >
                    {sendStatus === 'sending' ? 'Preparing…' : 'Send my result'}
                    {sendStatus !== 'sending' && <ArrowRight size={14} />}
                  </button>
                  <p className="text-xs text-[#7A8E90] mt-3 leading-relaxed">
                    We will not add you to a marketing list without a separate, clear request.
                  </p>
                </form>
              )}
            </div>

            {/* Related article */}
            {RESULTS[result.primary].relatedArticle && (
              <div className="mb-10 p-5 bg-white border border-[#E8E0D4] flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71] mb-1">
                    Relevant reading
                  </p>
                  <p className="text-sm font-semibold text-[#0D3349]">
                    {RESULTS[result.primary].relatedArticle!.title}
                  </p>
                </div>
                <Link
                  to={`/articles/${RESULTS[result.primary].relatedArticle!.slug}`}
                  className="flex-shrink-0 text-sm font-semibold text-[#6B8F71] hover:text-[#0D3349] flex items-center gap-1 transition-colours"
                >
                  Read <ChevronRight size={14} />
                </Link>
              </div>
            )}

            {/* Share result strip */}
            <div className="mb-6 flex items-center justify-between gap-4 p-4 bg-white border border-[#E8E0D4]">
              <div>
                <p className="text-xs font-semibold text-[#0D3349] mb-0.5">Share your result</p>
                <p className="text-xs text-[#7A8E90]">Let peers benchmark their own readiness.</p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-[#C8BFB0] text-[#0D3349] bg-[#FAF7F2] hover:bg-[#F0EBE3] transition-colours duration-150 active:scale-95"
                aria-label="Copy link to Scorecard"
                style={{ borderRadius: 0 }}
              >
                {linkCopied ? (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    Copy link
                  </>
                )}
              </button>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://enduringadvantage.com/scorecard')}&summary=${encodeURIComponent(`I just completed the CFO Sustainability Investment Readiness Scorecard. My primary readiness barrier: ${result ? RESULTS[result.primary].barrier : 'identified'}. Take the free assessment at enduringadvantage.com/scorecard`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-95"
                style={{ background: '#0A66C2', borderRadius: 0 }}
                aria-label="Share your Scorecard result on LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Share on LinkedIn
              </a>
              </div>
            </div>

            {/* Approach statement band */}
            <div
              style={{
                background: 'var(--color-slate-deep)',
                padding: '22px 24px',
                marginBottom: '0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0,
                  fontFamily: 'var(--font-display)',
                }}
              >
                {[
                  'The Right Things',
                  'In The Right Order',
                  'With The Right Partners',
                  'At Speed.',
                  'At Scale.',
                ].map((phrase, i, arr) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      style={{
                        fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.01em',
                        color: i === arr.length - 1 ? '#C9A84C' : '#FAF7F2',
                        padding: '0 clamp(8px, 1.2vw, 16px)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {phrase}
                    </span>
                    {i < arr.length - 1 && (
                      <span
                        style={{
                          color: 'rgba(134,239,172,0.35)',
                          fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
                          lineHeight: 1,
                          userSelect: 'none',
                        }}
                      >
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* NBT graphic: why the right prioritization matters */}
            <div style={{ background: 'oklch(0.96 0.012 152)', padding: '2rem 2rem 1.5rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '0.5rem' }}>
                Why Prioritization Matters
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'oklch(0.45 0.02 200)', lineHeight: 1.6, marginBottom: '1rem', maxWidth: '480px' }}>
                Your score shows where you are today. The next step is to identify which initiative sits in the top-left of this chart for your organization: the highest savings, fastest payback, best net benefit.
              </p>
              <img
                src="/manus-storage/NBTgraphic_51289e23.png"
                alt="Next Best Thing prioritization chart: savings per year vs financial return, circles sized by spend level and coloured by net benefit rating"
                style={{ width: '100%', maxWidth: '480px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 20px rgba(28,43,43,0.10)', display: 'block' }}
                loading="lazy"
              />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: '#9B9B8A', marginTop: '0.5rem', fontStyle: 'italic' }}>
                Green circle = Next Best Thing. Circle size = spend level. Colour = net benefit rating.
              </p>
            </div>

            {/* Quick FAQ: cost and timeline questions */}
            <ScorecardFaq />

            {/* Optional triage CTA, barrier-specific */}
            <div className="p-8 bg-[#0D3349] text-[#FAF7F2]">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#6B8F71] mb-4">
                Principal led. No pitch. No commitment.
              </p>
              <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-semibold mb-4 leading-snug">
                {TRIAGE_COPY[result.primary].headline}
              </h3>
              <p className="text-sm text-[#B8C8CA] leading-relaxed mb-6">
                {TRIAGE_COPY[result.primary].body}
              </p>
              <a href="https://calendar.app.google/ozpmtufXwN4uhE2r6" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#6B8F71] text-white hover:bg-[#5a7a60] px-6 py-3 text-sm font-semibold rounded-none h-auto">
                  Find your Next Best Thing
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </a>
              <p className="text-xs text-[#7A8E90] mt-4">
                If an independent Diagnostic is not the right next move, you will hear that too.
              </p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

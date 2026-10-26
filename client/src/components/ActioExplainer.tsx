// =============================================================================
// ENDURING ADVANTAGE, actio Product Explainer Component
// Navy, cream, and gold financial editorial system for a decision-platform walkthrough.
// Shows how actio organizes available evidence for a human-led sustainability decision.
// =============================================================================

import { useState, useEffect, useRef } from 'react';
import { Database, BarChart3, Trophy, Zap, CheckCircle2, ArrowRight, TrendingUp, Leaf, Clock, DollarSign } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    icon: Database,
    label: 'Available Evidence',
    headline: 'Map the entire playing field',
    description:
      'Your operating data identifies the problem worth solving. actio then organizes it alongside supplier and jurisdictional context, so the material decision field is visible before a recommendation is made. It does not start from a vendor’s project list.',
    metric: '3',
    metricLabel: 'decision inputs brought together',
    colour: '#C9A84C',
    visual: [
      { label: 'Energy', pct: 78 },
      { label: 'Water', pct: 55 },
      { label: 'Waste', pct: 62 },
      { label: 'Fleet', pct: 41 },
      { label: 'Procurement', pct: 87 },
    ],
  },
  {
    id: 2,
    icon: BarChart3,
    label: 'Two-Gate Screen',
    headline: 'Screen the field before deeper review',
    description:
      'The early screen applies two gates: financial return and a positive environmental impact across the entire Sustainability Playing Field. It screens the full field from the problem your data identifies, rather than selecting from vendor proposals. It does not select a vendor or approve the spend. It helps direct human attention to the action that may deserve the next level of work.',
    metric: '2',
    metricLabel: 'gates for the early screen',
    colour: '#A9832C',
    visual: [
      { label: 'Financial return', icon: DollarSign, score: 'Gate 1' },
      { label: 'Positive environmental impact', icon: Leaf, score: 'Gate 2' },
      { label: 'Implementation readiness', icon: Clock, score: 'Context' },
      { label: 'Jurisdictional fit', icon: TrendingUp, score: 'Context' },
    ],
  },
  {
    id: 3,
    icon: Trophy,
    label: 'The Standout',
    headline: 'Surface the one action that stands above the rest',
    description:
      'actio helps identify the Next Best Thing, the one action that stands out after the full field is screened. The Coach and subject matter experts then apply the human sanity test before a recommendation reaches you.',
    metric: 'one',
    metricLabel: 'next action identified',
    colour: '#A9832C',
    visual: [
      { rank: 1, label: 'Next Best Thing', saving: 'Selected for review', ghg: 'Human sanity test', payback: 'Vendor-neutral path' },
    ],
  },
  {
    id: 4,
    icon: Zap,
    label: 'Managed Delivery',
    headline: 'From decision to accountable delivery',
    description:
      'Your Coach quarterbacks the work, supported by specialists as needed. They run a vendor neutral selection, manage delivery, arrange M&V on completed projects and report savings and environmental results before the next cycle. [CONFIRM 8] M&V provider.',
    metric: '1',
    metricLabel: 'accountable Coach relationship',
    colour: '#C9A84C',
    visual: [
      { phase: 'Select', label: 'Vendor-neutral selection and commercial decision' },
      { phase: 'Deliver', label: 'Implementation coordinated by the Coach' },
      { phase: 'Measure', label: 'M&V on completed projects [CONFIRM 8] M&V provider.' },
      { phase: 'Repeat', label: 'Report outcomes, then identify the next action' },
    ],
  },
];

function renderActio(copy: string) {
  return copy.split(/(actio)/gi).map((part, index) => (
    part.toLowerCase() === 'actio' ? <strong key={index}>{part}</strong> : part
  ));
}

function StepVisual({ step, active }: { step: typeof STEPS[0]; active: boolean }) {
  if (step.id === 1 && 'pct' in (step.visual[0] ?? {})) {
    const bars = step.visual as { label: string; pct: number }[];
    return (
      <div className="space-y-3">
        {bars.map((b, i) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="text-xs w-24 text-right" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>{b.label}</span>
            <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-2 rounded-full transition-all duration-700"
                style={{
                  width: active ? `${b.pct}%` : '0%',
                  background: 'linear-gradient(90deg, #C9A84C, #E1C56F)',
                  transitionDelay: `${i * 100}ms`,
                }}
              />
            </div>
            <span className="text-xs w-8" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{b.pct}%</span>
          </div>
        ))}
      </div>
    );
  }

  if (step.id === 2 && 'score' in (step.visual[0] ?? {})) {
    const scores = step.visual as { label: string; icon: React.ElementType; score: string }[];
    return (
      <div className="grid grid-cols-2 gap-3">
        {scores.map((s, i) => (
          <div
            key={s.label}
            className="rounded-xl p-3 flex flex-col gap-2 transition-all duration-500"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(12px)',
              transitionDelay: `${i * 120}ms`,
            }}
          >
            <s.icon size={16} style={{ color: '#F0D070' }} />
            <span className="text-xs leading-tight" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}>{s.label}</span>
            <span className="text-2xl font-bold" style={{ color: '#F0D070', fontFamily: 'var(--font-display)' }}>{s.score}</span>
          </div>
        ))}
      </div>
    );
  }

  if (step.id === 3) {
    return (
      <div
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1) translateY(0)' : 'scale(0.97) translateY(8px)',
          transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <img
          src="/manus-storage/NBTgraphic_51289e23.png"
          alt="Next Best Thing prioritization chart: savings per year vs financial return, circles sized by spend level and coloured by net benefit rating"
          style={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          loading="lazy"
        />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem', fontStyle: 'italic', textAlign: 'center' }}>
          Highlighted circle = action selected for deeper human review. Circle size and colour show the relative decision context.
        </p>
      </div>
    );
  }

  if (step.id === 4 && 'phase' in (step.visual[0] ?? {})) {
    const phases = step.visual as { phase: string; label: string }[];
    return (
      <div className="relative">
        <div className="absolute left-[18px] top-4 bottom-4 w-0.5" style={{ background: 'rgba(116,198,157,0.3)' }} />
        <div className="space-y-4">
          {phases.map((p, i) => (
            <div
              key={p.phase}
              className="flex items-start gap-4 transition-all duration-500"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? 'translateX(0)' : 'translateX(-12px)',
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                style={{ background: active ? '#C9A84C' : 'rgba(255,255,255,0.1)', transition: `background 0.4s ease ${i * 150}ms` }}
              >
                <CheckCircle2 size={16} style={{ color: active ? '#1B4332' : 'rgba(255,255,255,0.3)' }} />
              </div>
              <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: '#F0D070', fontFamily: 'var(--font-body)' }}>{p.phase}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>{p.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default function ActioExplainer({ onBookCall, embedded = false }: { onBookCall?: () => void; embedded?: boolean }) {
  const [activeStep, setActiveStep] = useState(0);
  const [visualActive, setVisualActive] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Observe when section enters viewport
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto-advance steps
  useEffect(() => {
    if (!inView) return;
    intervalRef.current = setInterval(() => {
      setVisualActive(false);
      setTimeout(() => {
        setActiveStep((s) => (s + 1) % STEPS.length);
        setVisualActive(true);
      }, 300);
    }, 4500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [inView]);

  const goTo = (idx: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setVisualActive(false);
    setTimeout(() => {
      setActiveStep(idx);
      setVisualActive(true);
    }, 200);
  };

  const step = STEPS[activeStep];
  const StepIcon = step.icon;
  const accent = '#C9A84C';
  const activeText = '#0D3349';

  return (
    <section
      id={embedded ? undefined : 'actio'}
      ref={sectionRef}
      className={embedded ? 'overflow-hidden' : 'py-24 overflow-hidden'}
      style={embedded
        ? { borderTop: '1px solid rgba(250,247,242,0.16)', marginTop: '1.75rem', paddingTop: '1.75rem' }
        : { background: 'linear-gradient(135deg, #0D3349 0%, #123F59 50%, #0D3349 100%)' }}
    >
      <div className={embedded ? '' : 'container'}>
        {/* Step tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === activeStep;
            return (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-none"
                style={{
                  fontFamily: 'var(--font-body)',
                  background: isActive ? accent : 'rgba(255,255,255,0.07)',
                  color: isActive ? activeText : 'rgba(255,255,255,0.5)',
                  border: isActive ? `1px solid ${accent}` : '1px solid rgba(255,255,255,0.1)',
                  transform: isActive && !embedded ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <Icon size={14} />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main content */}
        <div
          className={`grid md:grid-cols-2 gap-10 items-center ${embedded ? 'px-0 py-8' : 'p-8 md:p-12'}`}
          style={{
            background: embedded ? 'transparent' : '#123F59',
            border: embedded ? 'none' : '1px solid rgba(201,168,76,0.35)',
            borderTop: embedded ? undefined : '3px solid #C9A84C',
          }}
        >
          {/* Left: text */}
          <div
            key={activeStep}
            style={{ animation: 'actio-fade-in 0.4s ease forwards' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className={`w-12 h-12 flex items-center justify-center ${embedded ? 'rounded-full' : 'rounded-2xl'}`}
                style={{ background: 'rgba(201,168,76,0.14)', border: '1px solid rgba(201,168,76,0.45)' }}
              >
                <StepIcon size={22} style={{ color: accent }} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent, fontFamily: 'var(--font-body)' }}>
                  Step {step.id} of {STEPS.length}
                </p>
                <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{step.label}</p>
              </div>
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: '#FAF7F2', lineHeight: 1.25 }}
            >
              {step.headline}
            </h3>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)' }}
            >
              {renderActio(step.description)}
            </p>

            {/* Metric callout */}
            <div
              className={`inline-flex items-baseline gap-3 px-6 py-4 mb-8 ${embedded ? 'rounded-none' : 'rounded-2xl'}`}
              style={{ background: 'rgba(201,168,76,0.09)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <span
                className="text-4xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: accent }}
              >
                {step.metric}
              </span>
              <span
                className="text-sm"
                style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}
              >
                {step.metricLabel}
              </span>
            </div>

            {/* Step navigation */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeStep ? '24px' : '8px',
                      height: '8px',
                      background: i === activeStep ? accent : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => goTo((activeStep + 1) % STEPS.length)}
                className="flex items-center gap-1.5 text-sm font-semibold transition-opacity duration-200 hover:opacity-70"
                style={{ color: accent, fontFamily: 'var(--font-body)' }}
              >
                Next <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right: animated visual */}
          <div
            className="p-6"
            style={{
              background: embedded ? 'rgba(0,0,0,0.16)' : '#0D3349',
              border: embedded ? '1px solid rgba(201,168,76,0.26)' : '1px solid rgba(201,168,76,0.28)',
              minHeight: '280px',
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}
            >
              <span style={{ textTransform: 'lowercase' }}>actio</span>, Evidence View
            </p>
            <StepVisual step={step} active={visualActive && inView} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p
            className="text-base mb-6"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}
          >
            Ready to see what <strong>actio</strong> finds in your organization.
          </p>
          <button
            onClick={onBookCall}
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold transition-all duration-200 hover:scale-105 active:scale-95 rounded-none"
            style={{
              background: accent,
              color: activeText,
              fontFamily: 'var(--font-body)',
              boxShadow: embedded ? 'none' : '0 0 32px rgba(201,168,76,0.26)',
            }}
          >
            Find your Next Best Thing
            <ArrowRight size={18} />
          </button>
          <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
            No commitment · Focused on your outcomes
          </p>
        </div>
      </div>
    </section>
  );
}

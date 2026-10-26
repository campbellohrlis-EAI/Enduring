// =============================================================================
// ENDURING ADVANTAGE, Reading Progress Bar (section-aware)
// Thin sage-green bar below the header with:
//  - Fill that tracks scroll progress
//  - Section dot markers at each section's scroll position
//  - Animated label showing the current section name
// =============================================================================

import { useEffect, useState, useRef } from 'react';

const SECTIONS = [
  { id: 'topics',           label: 'Research Index' },
  { id: 'research',         label: 'Featured Research' },
  { id: 'climate-impacts',  label: 'Climate Impacts' },
  { id: 'playing-field',    label: 'Playing Field' },
  { id: 'business-case',    label: 'Business Case' },
  { id: 'about',            label: 'About' },
  { id: 'actio',            label: 'actio Platform' },
  { id: 'coaches',          label: 'The Coaches' },
  { id: 'contact',          label: 'Get in Touch' },
];

interface SectionMark {
  id: string;
  label: string;
  pct: number; // 0–100, position along the bar
}

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('');
  const [marks, setMarks] = useState<SectionMark[]>([]);
  const [labelVisible, setLabelVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevSection = useRef('');

  // Compute section marker positions as % of total scrollable height
  const computeMarks = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const computed: SectionMark[] = [];
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) {
        const pct = Math.min(100, (el.offsetTop / docHeight) * 100);
        computed.push({ ...s, pct });
      }
    }
    setMarks(computed);
  };

  useEffect(() => {
    // Wait for layout then compute
    const t = setTimeout(computeMarks, 300);
    window.addEventListener('resize', computeMarks, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', computeMarks);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));

      // Determine current section (last one whose top is above viewport midpoint)
      let active = '';
      const viewportMid = scrollTop + window.innerHeight * 0.35;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= viewportMid) {
          active = s.label;
        }
      }

      if (active && active !== prevSection.current) {
        prevSection.current = active;
        setCurrentSection(active);
        setLabelVisible(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setLabelVisible(false), 2200);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 z-50"
      style={{ top: '80px' }}
    >
      {/* ── Bar track ── */}
      <div
        className="relative w-full"
        style={{ height: '3px', background: 'rgba(201,168,76,0.15)' }}
      >
        {/* Fill */}
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #C9A84C 0%, #C9A84C 100%)',
            transition: 'width 0.1s linear',
            boxShadow: progress > 2 ? '0 0 8px rgba(201,168,76,0.45)' : 'none',
          }}
        />

        {/* Section dot markers removed */}
      </div>

      {/* ── Section label pill ── */}
      <div
        style={{
          position: 'absolute',
          right: '1rem',
          top: '6px',
          opacity: labelVisible ? 1 : 0,
          transform: labelVisible ? 'translateY(0)' : 'translateY(-4px)',
          transition: 'opacity 0.3s cubic-bezier(0.23,1,0.32,1), transform 0.3s cubic-bezier(0.23,1,0.32,1)',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 10px',
            borderRadius: '9999px',
            background: 'rgba(20,32,34,0.82)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,168,76,0.35)',
            color: '#C9A84C',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Dot indicator */}
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#C9A84C',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          {currentSection}
        </span>
      </div>
    </div>
  );
}

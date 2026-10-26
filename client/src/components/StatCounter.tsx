// =============================================================================
// ENDURING ADVANTAGE, Stat Counter Component
// Scroll-triggered animated statistics display
// =============================================================================

import { useEffect, useRef, useState } from 'react';
import type { Stat } from '@/lib/data';

interface StatCounterProps {
  stat: Stat;
  delay?: number;
}

export default function StatCounter({ stat, delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="text-center transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className="text-5xl md:text-6xl font-bold mb-2"
        style={{
          fontFamily: 'var(--font-display)',
          color: '#C9A84C',
          lineHeight: 1,
        }}
      >
        {stat.value}
      </div>
      <div
        className="text-sm font-semibold uppercase tracking-wider mb-2"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-slate-deep)',
          letterSpacing: '0.08em',
          opacity: 1,
        }}
      >
        {stat.label}
      </div>
      <p
        className="text-sm leading-relaxed max-w-[200px] mx-auto"
        style={{
          fontFamily: 'var(--font-body)',
          color: 'oklch(0.38 0.02 200)',
        }}
      >
        {stat.description}
      </p>
    </div>
  );
}

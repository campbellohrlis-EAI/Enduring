import { useCallback, useEffect, useRef, useState } from 'react';
import { topics } from '@/lib/data';

type CloudNode = (typeof topics)[number] & {
  baseX: number;
  baseY: number;
  depth: number;
  driftX: number;
  driftY: number;
  phaseX: number;
  phaseY: number;
  speed: number;
  tilt: number;
};

type Position = { x: number; y: number; z: number; node: CloudNode };

const CLOUD_SIZE = 680;
const FRAME_INTERVAL = 1000 / 24;

const nodeStyles = {
  sm: { fontSize: 11, paddingX: 10, paddingY: 5, weight: 600 },
  md: { fontSize: 13, paddingX: 13, paddingY: 6, weight: 700 },
  lg: { fontSize: 15, paddingX: 16, paddingY: 7, weight: 800 },
} as const;

const topicDescriptions: Record<string, string> = {
  t1: 'Sets an emissions pathway that can be tested against operating and financial priorities.',
  t2: 'Assesses exposure to carbon costs, markets and transition decisions.',
  t3: 'Organises material sustainability information for management, lenders and stakeholders.',
  t4: 'Tests supplier dependencies, resilience and commercial exposure across the value chain.',
  t5: 'Compares practical renewable supply and procurement options for the operating context.',
  t6: 'Identifies nature-related dependencies, impacts and emerging business risk.',
  t7: 'Connects verified performance to financing and capital-allocation opportunities.',
  t8: 'Assesses water availability, use and operational dependency by location.',
  t9: 'Looks for ways to reduce material use, preserve value and limit waste.',
  t10: 'Prepares decision-useful climate information for reporting and governance.',
  t11: 'Considers workforce, community and distributional effects during transition.',
  t12: 'Tests where natural systems can support resilience and operational outcomes.',
  t13: 'Maps material value-chain emissions and supplier engagement opportunities.',
  t14: 'Considers debt instruments linked to verified environmental performance.',
  t15: 'Uses climate-risk governance and disclosure principles to frame decisions.',
  t16: 'Prioritises credible ways to reduce emissions across assets and operations.',
  t17: 'Evaluates physical and transition exposure affecting value, cost and continuity.',
  t18: 'Assesses market mechanisms that affect carbon cost and project economics.',
  t19: 'Plans the practical shift to lower-carbon energy sources and systems.',
  t20: 'Tests sustainability opportunities against the organisation’s investment criteria.',
  t21: 'Defines decision rights, accountability and oversight for sustainability priorities.',
  t22: 'Provides the international policy context influencing transition expectations.',
  t23: 'Builds readiness for changing climate conditions and operational disruption.',
  t24: 'Assesses soil health, carbon and resilience in land-based operations.',
  t25: 'Identifies assets whose value may be exposed by changing markets or policy.',
  t26: 'Frames target-setting with recognised science-led methods and accountability.',
  t27: 'Assesses disruption from heat, flooding, storms and other acute conditions.',
  t28: 'Connects ocean chemistry change to supply, ecosystem and coastal dependencies.',
  t29: 'Examines food-system resilience, availability and supply-chain exposure.',
  t30: 'Considers infrastructure that improves environmental performance and local resilience.',
  m1: 'Assesses cleaning practices for resource use, chemicals and facility performance.',
  m2: 'Finds asset upgrades that reduce energy use while protecting operational performance.',
};

function seededValue(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function createNodes(limit = 32): CloudNode[] {
  const selectedTopics = topics.slice(0, limit);

  return selectedTopics.map((topic, index) => {
    // A seeded, uneven cluster makes the choice set feel like a genuine cloud,
    // rather than a perfectly spaced orbital display.
    const angle = seededValue(index + 4) * Math.PI * 2;
    const radius = 0.13 + Math.pow(seededValue(index + 18), 0.62) * 0.39;
    const horizontalStretch = 1.08 + seededValue(index + 37) * 0.28;
    const verticalStretch = 0.72 + seededValue(index + 59) * 0.22;
    const baseX = Math.min(0.9, Math.max(0.1, 0.5 + Math.cos(angle) * radius * horizontalStretch));
    const baseY = Math.min(0.86, Math.max(0.14, 0.5 + Math.sin(angle) * radius * verticalStretch));
    const depth = 0.14 + seededValue(index + 83) * 0.86;

    return {
      ...topic,
      baseX,
      baseY,
      depth,
      driftX: 8 + seededValue(index + 101) * 18,
      driftY: 6 + seededValue(index + 129) * 15,
      phaseX: seededValue(index + 149) * Math.PI * 2,
      phaseY: seededValue(index + 179) * Math.PI * 2,
      speed: 0.00013 + seededValue(index + 211) * 0.00014,
      tilt: (seededValue(index + 241) - 0.5) * 7,
    };
  });
}

export default function PlayingFieldOptionCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<CloudNode[]>(createNodes());
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const lastRenderRef = useRef(0);

  const [positions, setPositions] = useState<Position[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [layoutScale, setLayoutScale] = useState(1);
  const [isCompact, setIsCompact] = useState(false);

  const computePositions = useCallback(() => nodesRef.current.map((node) => {
    const drift = timeRef.current * node.speed;
    return {
      x: node.baseX * CLOUD_SIZE + Math.sin(drift + node.phaseX) * node.driftX + Math.sin(drift * 0.42 + node.phaseY) * (node.driftX * 0.32),
      y: node.baseY * CLOUD_SIZE + Math.cos(drift * 0.84 + node.phaseY) * node.driftY + Math.sin(drift * 0.36 + node.phaseX) * (node.driftY * 0.4),
      z: node.depth,
      node,
    };
  }), []);

  useEffect(() => {
    setPositions(computePositions());

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => {
      reducedMotionRef.current = mediaQuery.matches;
      if (mediaQuery.matches) {
        timeRef.current = 0;
        setPositions(computePositions());
      }
    };

    onMotionChange();
    mediaQuery.addEventListener('change', onMotionChange);

    let lastTime = performance.now();
    const animate = (now: number) => {
      if (!pausedRef.current && !reducedMotionRef.current) {
        timeRef.current += (now - lastTime) * 0.3;
      }
      lastTime = now;

      if (reducedMotionRef.current || now - lastRenderRef.current >= FRAME_INTERVAL) {
        lastRenderRef.current = now;
        setPositions(computePositions());
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      mediaQuery.removeEventListener('change', onMotionChange);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [computePositions]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextScale = Math.min(1, entry.contentRect.width / CLOUD_SIZE);
      setLayoutScale(nextScale > 0 ? nextScale : 1);
      setIsCompact(entry.contentRect.width < 470);
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    nodesRef.current = createNodes(isCompact ? 30 : 52);
    timeRef.current = 0;
    setPositions(computePositions());
  }, [computePositions, isCompact]);

  const pauseCloud = () => {
    pausedRef.current = true;
    setIsPaused(true);
  };

  const resumeCloud = () => {
    pausedRef.current = false;
    setHoveredId(null);
    setIsPaused(false);
  };

  const orderedPositions = [...positions].sort((a, b) => a.z - b.z);
  const contentScale = isCompact ? Math.max(layoutScale, 0.76) : layoutScale;

  return (
    <div
      ref={containerRef}
      className="playing-field-legacy-cloud"
      aria-label="A rotating cloud of sustainability options, representing the choice overload that comes before a whole-field decision"
      onMouseEnter={pauseCloud}
      onMouseLeave={resumeCloud}
    >
      <div className="playing-field-cloud-atmosphere" aria-hidden="true" />
      <span className="playing-field-cloud-ghost-label" aria-hidden="true">Thousands of credible options</span>
      {isPaused && <span className="playing-field-cloud-paused">Paused, inspect the field</span>}
      {orderedPositions.map(({ x, y, z, node }) => {
        const depth = z;
        const isHovered = hoveredId === node.id;
        const style = nodeStyles[node.size];
        const scaledSize = contentScale * (0.76 + depth * 0.38);

        return (
          <button
            key={node.id}
            type="button"
            className="playing-field-cloud-node"
            onMouseEnter={() => setHoveredId(node.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(node.id)}
            onBlur={() => setHoveredId(null)}
            onClick={() => setHoveredId(node.id)}
            aria-describedby={isHovered ? `playing-field-topic-${node.id}` : undefined}
            aria-label={node.label}
            style={{
              background: isHovered ? '#C9A84C' : 'rgba(13,51,73,0.9)',
              border: isHovered ? '1px solid #F0D070' : '1px solid rgba(201,168,76,0.38)',
              boxShadow: isHovered ? '0 6px 20px rgba(201,168,76,0.3)' : '0 1px 4px rgba(0,0,0,0.2)',
              color: isHovered ? '#0D3349' : '#FAF7F2',
              fontSize: `${style.fontSize * contentScale}px`,
              fontWeight: style.weight,
              left: `${(x / CLOUD_SIZE) * 100}%`,
              opacity: isHovered ? 1 : 0.24 + depth * 0.7,
              padding: `${style.paddingY * contentScale}px ${style.paddingX * contentScale}px`,
              top: `${(y / CLOUD_SIZE) * 100}%`,
              transform: `translate(-50%, -50%) rotate(${node.tilt}deg) scale(${isHovered ? scaledSize * 1.15 : scaledSize})`,
              zIndex: isHovered ? 220 : Math.round(depth * 100),
            }}
          >
            {node.label}
            {isHovered && <span id={`playing-field-topic-${node.id}`} role="tooltip" className="playing-field-cloud-tooltip">{topicDescriptions[node.id] ?? 'A sustainability decision area considered within the whole field.'}</span>}
          </button>
        );
      })}
    </div>
  );
}

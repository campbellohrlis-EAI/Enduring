// ENDURING ADVANTAGE, Context Tooltip
// Navy-and-gold editorial support: compact definitions without interrupting the decision narrative.

import { CircleHelp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function ContextTooltip({
  label,
  detail,
  inverse = false,
}: {
  label: string;
  detail: string;
  inverse?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`What ${label} means`}
          className="inline-flex align-text-bottom transition-transform duration-150 active:scale-95 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
          style={{ color: inverse ? '#F0D070' : '#A8882E', marginLeft: '0.28rem', verticalAlign: 'text-bottom' }}
        >
          <CircleHelp size={15} strokeWidth={2} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8} className="max-w-72 border border-[#C9A84C]/40 bg-[#0D3349] px-3 py-2.5 text-[#FAF7F2] shadow-xl">
        <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', margin: 0, textTransform: 'uppercase' }}>{label}</p>
        <p style={{ color: 'rgba(250,247,242,0.78)', fontFamily: 'var(--font-body)', fontSize: '0.78rem', lineHeight: 1.5, margin: '0.35rem 0 0' }}>{detail}</p>
      </TooltipContent>
    </Tooltip>
  );
}

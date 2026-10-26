/**
 * CalendlyModal, Sage Editorial design system
 * A full-screen overlay that embeds the Calendly scheduling widget.
 * Controlled externally via open / onClose props.
 */

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface CalendlyModalProps {
  open: boolean;
  onClose: () => void;
  /** Calendly URL, defaults to a placeholder that prompts the user to configure it */
  calendlyUrl?: string;
}

const DEFAULT_URL = 'https://calendar.app.google/ozpmtufXwN4uhE2r6';

export default function CalendlyModal({
  open,
  onClose,
  calendlyUrl = DEFAULT_URL,
}: CalendlyModalProps) {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ animation: 'modal-in 220ms cubic-bezier(0.23,1,0.32,1) both' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(20,32,34,0.82)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative flex flex-col rounded-xl overflow-hidden shadow-2xl"
        style={{
          width: 'min(96vw, 780px)',
          height: 'min(92vh, 720px)',
          background: '#FAF7F2',
          animation: 'panel-in 260ms cubic-bezier(0.23,1,0.32,1) both',
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ background: 'var(--color-slate-deep, #0D3349)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: '#C9A84C' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
            </div>
            <div>
              <p
                className="font-semibold text-sm leading-tight"
                style={{ fontFamily: 'var(--font-body)', color: '#FAF7F2', letterSpacing: '0.02em' }}
              >
                Book a Discovery Call
              </p>
              <p
                className="text-xs leading-tight"
                style={{ fontFamily: 'var(--font-body)', color: 'rgba(250,247,242,0.5)' }}
              >
                30 minutes · No commitment · Focused on your outcomes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colours hover:bg-white/10 active:scale-95"
            style={{ color: 'rgba(250,247,242,0.6)' }}
            aria-label="Close"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Calendly iframe */}
        <div className="flex-1 relative">
          <iframe
            src={calendlyUrl}
            title="Book a Discovery Call"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ display: 'block', border: 'none' }}
            allow="payment"
          />
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// ENDURING ADVANTAGE, Back to Top Button
// Appears after scrolling past the hero, fixed bottom-right corner
// Sage Editorial design: sage green, smooth scale-in animation
// =============================================================================

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after user has scrolled past ~80vh (past the hero section)
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 60,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: '#C9A84C',
        color: '#FAF7F2',
        border: '2px solid rgba(250,247,242,0.25)',
        boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        // Visibility transition
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(12px)',
        transition: 'opacity 0.3s cubic-bezier(0.23,1,0.32,1), transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.2s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(201,168,76,0.6)';
        (e.currentTarget as HTMLElement).style.transform = visible ? 'scale(1.1) translateY(-2px)' : 'scale(0.8) translateY(12px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(201,168,76,0.4)';
        (e.currentTarget as HTMLElement).style.transform = visible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(12px)';
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(0.95) translateY(0)';
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.1) translateY(-2px)';
      }}
    >
      <ArrowUp size={18} strokeWidth={2.5} />
    </button>
  );
}

// ENDURING ADVANTAGE, Home Decision Snapshot
// Sage Editorial: a compact navy, cream, and gold proof artifact for the flagship decision moment.

const evidenceRows = [
  ['01', 'Operating information', 'Start with the data the client already has.'],
  ['02', 'Two gates', 'A positive environmental impact across the entire Sustainability Playing Field and financial materiality decide what clears the field.'],
  ['03', 'One next action', 'The standout, not a shortlist, and who carries delivery.'],
] as const;

export default function TopicCloud() {
  return (
    <aside
      aria-label="Enduring Advantage decision snapshot"
      className="w-full max-w-[540px]"
      style={{
        background: 'rgba(8, 40, 58, 0.94)',
        border: '1px solid rgba(201,168,76,0.52)',
        borderTop: '4px solid #C9A84C',
        boxShadow: '0 22px 48px rgba(0,0,0,0.25)',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
      }}
    >
      <div className="flex items-start justify-between gap-5" style={{ borderBottom: '1px solid rgba(250,247,242,0.2)', paddingBottom: '1.15rem' }}>
        <div>
          <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.16em', margin: 0, textTransform: 'uppercase' }}>
            Decision snapshot
          </p>
          <h2 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.55rem, 3vw, 2.25rem)', lineHeight: 1.05, margin: '0.5rem 0 0' }}>
            Find the next action.
          </h2>
        </div>
        <div className="flex h-[68px] w-[68px] shrink-0 flex-col items-center justify-center rounded-full" style={{ border: '1px solid #C9A84C', color: '#F0D070', fontFamily: 'var(--font-body)' }}>
          <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', lineHeight: 1 }}>01</strong>
          <span style={{ fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.12em', marginTop: '0.22rem', textTransform: 'uppercase' }}>next</span>
        </div>
      </div>

      <p style={{ color: 'rgba(250,247,242,0.74)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.6, margin: '1rem 0 0' }}>
        Screen the field. Rank what clears it. Build a plan a client can defend and a delivery team can carry.
      </p>

      <div style={{ borderTop: '1px solid rgba(250,247,242,0.2)', marginTop: '1.2rem' }}>
        {evidenceRows.map(([number, title, detail]) => (
          <div key={number} className="grid grid-cols-[auto_1fr] gap-3" style={{ borderBottom: '1px solid rgba(250,247,242,0.2)', padding: '0.85rem 0' }}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: 'rgba(201,168,76,0.14)', border: '1px solid rgba(201,168,76,0.55)', color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 800 }}>{number}</span>
            <div>
              <strong style={{ color: '#FAF7F2', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.82rem', letterSpacing: '0.03em' }}>{title}</strong>
              <span style={{ color: 'rgba(250,247,242,0.62)', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.76rem', lineHeight: 1.45, marginTop: '0.2rem' }}>{detail}</span>
            </div>
          </div>
        ))}
      </div>

      <a href="#research" className="mt-5 inline-flex items-center gap-2 transition-all duration-200 active:scale-95 hover:brightness-110" style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.04em', textDecoration: 'none' }}>
        Explore the evidence field <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}

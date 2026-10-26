// ENDURING ADVANTAGE, ICP Editorial Moment
// Design reminder: navy-and-gold financial editorial system with quiet paper texture,
// a circular decision marker, and an audience-specific investment-memo treatment.

import type { IcpPageContent } from '@/lib/icpPageData';

const moments = {
  cfo: {
    label: 'Committee note', badge: 'Capital\nscreen', dark: true,
    title: 'The question is not “is this a good project?”',
    body: 'The question is whether it is the best next use of capital after every relevant alternative has been screened against the financial criteria you actually use.',
    items: [['Capital criterion', 'Your framework'], ['Recommendation', 'One ranked answer'], ['Decision owner', 'Named principal']],
  },
  municipalities: {
    label: 'Council translation', badge: 'Council\nbrief', dark: false,
    title: 'The same work, framed for the decision that needs to be made.',
    body: 'Environmental benefit is measured and reported. The capital case is expressed through the asset and service outcomes council has to approve.',
    items: [['Climate adaptation', 'Stormwater capacity'], ['Fleet transition', 'Replacement schedule'], ['Green retrofit', 'State of good repair']],
  },
  firstNations: {
    label: 'Statement of terms', badge: 'Nation\nterms', dark: false,
    title: 'The work should leave the Nation stronger than it found it.',
    body: 'The method, decisions and underlying information should remain understandable and usable after an advisor has stepped back.',
    items: [['Authority', 'Council and community process'], ['Ownership', 'Pursued where possible'], ['Capacity', 'Transferred and retained']],
  },
  agriculture: {
    label: 'The farm-gate test', badge: 'Farm\ngate', dark: false,
    title: 'If the numbers do not clear on your operation, the answer is no.',
    body: 'A claim that worked on someone else’s ground, inside a different program, in a different season, is not a recommendation for your farm.',
    items: [['Cash exposure', 'What you carry before payment'], ['Operating fit', 'Your acres, equipment and timing'], ['Decision', 'Move, wait or decline']],
  },
  realEstate: {
    label: 'Investment memo', badge: 'Asset\ncase', dark: true,
    title: 'A generic retrofit pitch is not an asset-level capital case.',
    body: 'The decision needs to reflect the property, the lease position, the capital reserve and the hold period before it can be ranked honestly.',
    items: [['Generic model', 'Replace with metered data'], ['Standard payback', 'Test against hold period'], ['Vendor package', 'Screen against the field']],
  },
  buildings: {
    label: 'Relationship dossier', badge: 'Building\nroute', dark: true,
    title: 'The building answer should work for the owner, operator, and partner who has to carry it forward.',
    body: 'A credible screen makes the operating evidence, financial criteria, relationship roles, and delivery hand-off visible before anyone commits to the next project.',
    items: [['Operating data', 'Initial baseline, made visible'], ['Relationship owner', 'Named before delivery'], ['Next decision', 'One action, then reassess']],
  },
  industrial: {
    label: 'Plant decision note', badge: 'Plant\nroute', dark: true,
    title: 'A process improvement only counts when it clears the operating floor and the capital plan.',
    body: 'The screen makes process conditions, shutdown timing, production risk, evidence quality, and delivery roles visible before a proposal becomes an Industrial project.',
    items: [['Operating context', 'Process, utilities, and maintenance'], ['Decision test', 'Environmental benefit and materiality'], ['Next action', 'Ranked before delivery']],
  },
  transportation: {
    label: 'Network decision note', badge: 'Route\ncase', dark: false,
    title: 'A fleet transition is not one equipment decision. It is a network decision.',
    body: 'The recommendation should work across the route, vehicle, depot, maintenance, energy, and customer context before the first asset or infrastructure commitment is made.',
    items: [['Network reality', 'Routes, duty cycles, and service'], ['Asset context', 'Lifecycle and operating fit'], ['Next decision', 'One action, then reassess']],
  },
};

export default function IcpEditorialMoment({ page }: { page: IcpPageContent }) {
  const moment = moments[page.key];
  const panelBackground = moment.dark ? '#0D3349' : '#F7F4EF';
  const headingColour = moment.dark ? '#FAF7F2' : '#0D3349';
  const bodyColour = moment.dark ? 'rgba(250,247,242,0.7)' : 'rgba(13,51,73,0.68)';
  const ruleColour = moment.dark ? 'rgba(250,247,242,0.17)' : 'rgba(13,51,73,0.14)';

  return (
    <section style={{ background: moment.dark ? '#EEF3F3' : '#FFFFFF', padding: 'clamp(3.5rem, 6vw, 5.25rem) 0' }}>
      <div className="container">
        <div className="grid lg:grid-cols-[0.32fr_0.68fr] gap-8 lg:gap-12 items-start" style={{ maxWidth: '1060px' }}>
          <div>
            <div className="flex items-center justify-center" style={{ width: '124px', height: '124px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.72)', background: '#FAF7F2', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.11em', lineHeight: 1.35, textAlign: 'center', textTransform: 'uppercase', whiteSpace: 'pre-line', padding: '1rem' }}>
              {moment.badge}
            </div>
          </div>
          <div style={{ background: panelBackground, border: `1px solid ${moment.dark ? 'rgba(201,168,76,0.32)' : 'rgba(13,51,73,0.14)'}`, padding: 'clamp(1.5rem, 3vw, 2.25rem)', boxShadow: moment.dark ? '0 18px 40px rgba(13,51,73,0.12)' : 'none', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.35, backgroundImage: 'repeating-linear-gradient(135deg, rgba(201,168,76,0.11) 0 1px, transparent 1px 8px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.69rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 0, marginBottom: '0.7rem' }}>{moment.label}</p>
              <h2 style={{ color: headingColour, fontFamily: 'var(--font-display)', fontSize: 'clamp(1.65rem, 3vw, 2.35rem)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.03em', margin: 0 }}>{moment.title}</h2>
              <p style={{ color: bodyColour, fontFamily: 'var(--font-body)', fontSize: '0.98rem', lineHeight: 1.7, marginTop: '0.9rem', marginBottom: '1.35rem' }}>{moment.body}</p>
              <div style={{ borderTop: `1px solid ${ruleColour}` }}>
                {moment.items.map(([left, right]) => (
                  <div key={left} className="grid grid-cols-[1fr_auto] gap-4 items-start" style={{ borderBottom: `1px solid ${ruleColour}`, padding: '0.8rem 0' }}>
                    <span style={{ color: bodyColour, fontFamily: 'var(--font-body)', fontSize: '0.82rem' }}>{left}</span>
                    <span style={{ color: moment.dark ? '#F0D070' : '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700, textAlign: 'right' }}>{right}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

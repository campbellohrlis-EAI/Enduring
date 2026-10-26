// ENDURING ADVANTAGE, Sector Meeting Checklist
// Design reminder: finance-first navy, cream, and gold editorial checklist.
// It turns sector-specific decision preparation into a calm, accessible action surface.

import { useMemo, useState } from 'react';
import { CheckCircle2, ClipboardCheck, Mail, Printer, RotateCcw } from 'lucide-react';

type ChecklistSector = 'industrial' | 'transportation';

const checklistContent: Record<ChecklistSector, { label: string; title: string; intro: string; artifactTitle: string; artifactRows: [string, string][]; items: string[] }> = {
  industrial: {
    label: 'Industrial meeting checklist',
    title: 'Bring the operating reality, not a polished project pitch.',
    intro: 'Use this short checklist before an Industrial decision meeting. The goal is not perfect data. It is to make the process, production, capital, and delivery conditions visible enough to decide what deserves the next screen.',
    artifactTitle: 'Plant decision file',
    artifactRows: [['Process constraint', 'Throughput + quality'], ['Utility exposure', 'Energy + water + waste'], ['Capital moment', 'Shutdown + replacement window']],
    items: [
      'Name the plant, line, utility system, maintenance event, or capital request that needs a decision.',
      'Identify the operations, maintenance, engineering, finance, and delivery owners who need to be involved.',
      'Collect the process, utility, production, maintenance, and cost records already available.',
      'Note production, quality, safety, shutdown, and uptime constraints that a recommendation must respect.',
      'List the known vendors, proposed solutions, and credible alternatives that should be compared.',
      'Confirm the financial criterion, timing window, and evidence needed before a project can move.',
    ],
  },
  transportation: {
    label: 'Transportation meeting checklist',
    title: 'Bring the route and depot reality, not only a vehicle proposal.',
    intro: 'Use this short checklist before a Transportation decision meeting. The goal is to make fleet, route, depot, energy, customer, capital, and delivery conditions visible enough to decide what deserves the next screen.',
    artifactTitle: 'Route decision file',
    artifactRows: [['Duty-cycle constraint', 'Route + payload + dwell time'], ['Depot exposure', 'Energy + fuelling + access'], ['Service moment', 'Customer + asset timing']],
    items: [
      'Name the fleet group, route, depot, customer commitment, fuel issue, or infrastructure decision that needs a clearer answer.',
      'Identify the fleet, operations, maintenance, finance, facility, energy, and delivery owners who need to be involved.',
      'Collect the route, duty-cycle, fuel, maintenance, utilization, service, and cost records already available.',
      'Note payload, range, dwell time, charging or fuelling access, refrigeration, driver, and service constraints.',
      'List the known vehicle, fuel, charging, platform, and network options that should be compared.',
      'Confirm the financial criterion, asset timing, customer expectation, and evidence needed before capital moves.',
    ],
  },
};

export default function SectorMeetingChecklist({ sector }: { sector: ChecklistSector }) {
  const content = checklistContent[sector];
  const [complete, setComplete] = useState<Set<number>>(() => new Set());
  const completedCount = complete.size;
  const progress = useMemo(() => Math.round((completedCount / content.items.length) * 100), [completedCount, content.items.length]);

  function toggleItem(index: number) {
    setComplete((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function shareByEmail() {
    const completedItems = content.items
      .filter((_, index) => complete.has(index))
      .map((item) => `• ${item}`)
      .join('\n');
    const subject = `${content.label}: meeting preparation`;
    const body = `I have prepared the following inputs for our Enduring Advantage decision meeting:\n\n${completedItems}\n\nDecision route: ${window.location.href}\n\nPlease bring any supporting operating, financial, and delivery information to the discussion.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function printChecklist() {
    const completedItems = content.items
      .map((item, index) => `<li class="${complete.has(index) ? 'checked' : ''}">${complete.has(index) ? '✓' : '○'} ${item}</li>`)
      .join('');
    const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=860,height=760');
    if (!printWindow) return;
    printWindow.document.write(`<!doctype html><html lang="en-CA"><head><title>${content.label}</title><style>body{font-family:Arial,sans-serif;color:#0D3349;margin:42px;line-height:1.5}h1{font-family:Georgia,serif;font-size:30px;margin:0 0 8px}h2{font-family:Georgia,serif;font-size:18px;margin:26px 0 10px}.label{color:#8A6818;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase}.rule{border-top:4px solid #C9A84C;margin:16px 0 22px}ul{list-style:none;padding:0;margin:0;border-top:1px solid #D8CEBC}li{border-bottom:1px solid #D8CEBC;padding:12px 4px;font-size:14px}.checked{font-weight:700}.note{background:#F0EDE6;border-left:4px solid #C9A84C;margin-top:24px;padding:16px}.footer{border-top:1px solid #C9A84C;color:#526A74;font-size:11px;margin-top:30px;padding-top:10px}</style></head><body><div class="label">Enduring Advantage / ${content.label}</div><h1>${content.title}</h1><div class="rule"></div><p>${content.intro}</p><h2>Meeting preparation</h2><ul>${completedItems}</ul><div class="note"><strong>Decision note:</strong> Bring the evidence already available. Use the meeting to name the next action that best clears financial, operating, and delivery conditions.</div><div class="footer">Prepared from enduringadvantage.com · ${new Date().toLocaleDateString('en-CA')}</div></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }

  return (
    <section aria-labelledby={`${sector}-meeting-checklist`} style={{ background: '#F0EDE6', borderTop: '1px solid rgba(201,168,76,0.2)', padding: 'clamp(3.5rem, 6vw, 5.25rem) 0' }}>
      <div className="container" style={{ maxWidth: '1040px' }}>
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
          <div style={{ borderTop: '4px solid #C9A84C', paddingTop: '1rem' }}>
            <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', margin: 0, textTransform: 'uppercase' }}>{content.label}</p>
            <h2 id={`${sector}-meeting-checklist`} style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.1, margin: '0.65rem 0 0' }}>{content.title}</h2>
            <p style={{ color: 'rgba(13,51,73,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.96rem', lineHeight: 1.68, margin: '1rem 0 0' }}>{content.intro}</p>
            {sector === 'industrial' ? (
              <div style={{ background: '#0D3349', borderTop: '3px solid #C9A84C', marginTop: '1.35rem', overflow: 'hidden', padding: '1rem', position: 'relative' }}>
                <div style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(201,168,76,0.1) 0 1px, transparent 1px 22px)', inset: 0, opacity: 0.55, pointerEvents: 'none', position: 'absolute' }} />
                <div style={{ position: 'relative' }}>
                  <div className="flex items-center gap-3"><span className="flex items-center justify-center" style={{ border: '1px solid #C9A84C', borderRadius: '50%', color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 800, height: '34px', width: '34px' }}>PLT</span><div><p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Plant decision file</p><p style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.15, margin: '0.2rem 0 0' }}>The next action must hold on the floor.</p></div></div>
                  <div className="grid grid-cols-3 gap-2" style={{ marginTop: '0.9rem' }}>{content.artifactRows.map(([label, value]) => <div key={label} style={{ borderTop: '1px solid rgba(250,247,242,0.2)', paddingTop: '0.5rem' }}><span style={{ color: 'rgba(250,247,242,0.62)', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.62rem', lineHeight: 1.35 }}>{label}</span><span style={{ color: '#F0D070', display: 'block', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 800, lineHeight: 1.35, marginTop: '0.3rem', textTransform: 'uppercase' }}>{value}</span></div>)}</div>
                </div>
              </div>
            ) : (
              <div style={{ background: '#FFFFFF', borderTop: '3px solid #C9A84C', borderBottom: '1px solid rgba(13,51,73,0.15)', marginTop: '1.35rem', padding: '1rem' }}>
                <p style={{ color: '#A8882E', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Route decision file</p>
                <p style={{ color: '#0D3349', fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.15, margin: '0.35rem 0 0.8rem' }}>The next action must work from depot to service window.</p>
                <div className="flex items-center gap-1" aria-label="Route, depot, fleet, and service decision sequence">{['Route', 'Depot', 'Fleet', 'Service'].map((step, index) => <div key={step} className="flex items-center gap-1" style={{ flex: index < 3 ? 1 : 'unset' }}><span className="flex items-center justify-center" style={{ background: index === 3 ? '#0D3349' : '#F0EDE6', border: `1px solid ${index === 3 ? '#0D3349' : '#C9A84C'}`, borderRadius: '50%', color: index === 3 ? '#FAF7F2' : '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.58rem', fontWeight: 800, height: '31px', width: '31px' }}>{index + 1}</span>{index < 3 && <span style={{ background: '#C9A84C', height: '1px', minWidth: '8px', flex: 1 }} />}</div>)}</div>
                <div style={{ marginTop: '0.9rem' }}>{content.artifactRows.map(([label, value]) => <div key={label} className="grid grid-cols-[1fr_auto] gap-3" style={{ borderTop: '1px solid rgba(13,51,73,0.12)', padding: '0.45rem 0' }}><span style={{ color: 'rgba(13,51,73,0.62)', fontFamily: 'var(--font-body)', fontSize: '0.66rem' }}>{label}</span><span style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.62rem', fontWeight: 800, textAlign: 'right', textTransform: 'uppercase' }}>{value}</span></div>)}</div>
              </div>
            )}
            <div className="flex items-center gap-3" style={{ marginTop: '1.4rem' }}>
              <div className="flex items-center justify-center" style={{ border: '1px solid #C9A84C', borderRadius: '50%', color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800, height: '42px', width: '42px' }}>{completedCount}/{content.items.length}</div>
              <div style={{ flex: 1 }}>
                <div aria-hidden="true" style={{ background: 'rgba(13,51,73,0.12)', height: '4px', overflow: 'hidden' }}><div style={{ background: '#C9A84C', height: '100%', transition: 'width 180ms cubic-bezier(0.23,1,0.32,1)', width: `${progress}%` }} /></div>
                <p aria-live="polite" style={{ color: 'rgba(13,51,73,0.58)', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, margin: '0.45rem 0 0' }}>{progress === 100 ? 'Your meeting inputs are ready to review.' : `${progress}% prepared for the decision meeting.`}</p>
              </div>
            </div>
          </div>
          <fieldset style={{ background: '#FFFFFF', border: '1px solid rgba(13,51,73,0.14)', margin: 0, padding: '0.2rem 1.25rem' }}>
            <legend className="sr-only">{content.label}</legend>
            {content.items.map((item, index) => {
              const checked = complete.has(index);
              return (
                <label key={item} className="flex items-start gap-3" style={{ borderBottom: index < content.items.length - 1 ? '1px solid rgba(13,51,73,0.12)' : 'none', cursor: 'pointer', padding: '1rem 0' }}>
                  <input type="checkbox" checked={checked} onChange={() => toggleItem(index)} style={{ accentColor: '#C9A84C', height: '18px', marginTop: '0.12rem', width: '18px' }} />
                  <span style={{ color: checked ? 'rgba(13,51,73,0.46)' : '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.91rem', lineHeight: 1.55, textDecoration: checked ? 'line-through' : 'none', transition: 'color 150ms ease' }}>{item}</span>
                </label>
              );
            })}
            <div className="flex flex-wrap items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(13,51,73,0.12)', padding: '0.9rem 0' }}>
              <span className="inline-flex items-center gap-2" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 800 }}><ClipboardCheck size={16} color="#C9A84C" /> Meeting-ready inputs</span>
              <button type="button" onClick={() => setComplete(new Set())} disabled={completedCount === 0} className="inline-flex items-center gap-1.5 active:scale-95" style={{ background: 'transparent', border: 'none', color: completedCount ? '#0D3349' : 'rgba(13,51,73,0.35)', cursor: completedCount ? 'pointer' : 'not-allowed', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, padding: 0 }}><RotateCcw size={14} /> Reset</button>
            </div>
            {progress === 100 && <div style={{ borderTop: '1px solid rgba(13,51,73,0.12)', marginTop: '0.15rem', padding: '0.95rem 0 1rem' }}>
              <p className="inline-flex items-center gap-2" role="status" style={{ color: '#0D3349', fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 800, margin: '0 0 0.75rem' }}><CheckCircle2 size={16} color="#C9A84C" /> You have the core inputs for a focused first screen.</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={printChecklist} className="inline-flex items-center gap-2 active:scale-95" style={{ background: '#0D3349', border: '1px solid #0D3349', color: '#FAF7F2', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, padding: '0.6rem 0.72rem' }}><Printer size={14} /> Print checklist</button>
                <button type="button" onClick={shareByEmail} className="inline-flex items-center gap-2 active:scale-95" style={{ background: 'transparent', border: '1px solid rgba(13,51,73,0.36)', color: '#0D3349', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, padding: '0.6rem 0.72rem' }}><Mail size={14} /> Email preparation notes</button>
              </div>
            </div>}
          </fieldset>
        </div>
      </div>
    </section>
  );
}

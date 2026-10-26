// =============================================================================
// ENDURING ADVANTAGE, Questions Page
// Sage Editorial Design: Warm sustainability journalism aesthetic
// 16 FAQs in 4 category groups with accordion interaction + FAQPage schema
// =============================================================================

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'wouter';
import { useRef } from 'react';
import { trackFaqCategorySelected, trackFaqOpened } from '@/lib/analytics';

function renderActioText(copy: string) {
  return copy.split(/(actio)/gi).map((part, index) => (
    part.toLowerCase() === 'actio' ? <strong key={index}>{part}</strong> : part
  ));
}

const FAQ_CATEGORIES = [
  {
    heading: 'Cost & Engagement',
    color: '#C9A84C',
    items: [
      {
        q: 'What does this cost, and how do you get paid?',
        a: 'We sell no equipment and take no referral fees. Our fee is a retainer plus a share of verified results. Coach and specialist time is passed through at cost. We only earn more when you save more.',
      },
      {
        q: 'What do we get if we stop after the Diagnostic?',
        a: 'Everything it produced is yours. The situation assessment, the data collected and organized, the first wins identified, and the Next Best Thing with the numbers behind it. No lock-in.',
      },
      {
        q: 'What happens after the first conversation?',
        a: 'A principal will tell you whether there is likely a material opportunity. If there is, the Diagnostic starts with the data you have today: a situation assessment, the start of data collection, and the first low-risk wins. From there, the work runs as a managed cycle. Deliver, report, name the next move.',
      },
      {
        q: 'Who usually hires you?',
        a: 'The CFO usually hires us. Operations, facilities, procurement and sustainability leaders weigh in on recommendations that affect them. We bring the right people in for each one. The outcome is better financial performance first, better sustainability performance close behind, with both reported continuously.',
      },
      {
        q: 'How much of our team\'s time will this take?',
        a: 'Less than you would expect. The heaviest lift is data access at the start: utility bills, operational records, and whatever environmental reporting you already have. After that, we do the analysis and come back to you with decisions, not homework. During implementation, your named Coach coordinates vendors and specialists so your team is not running another project on the side of their day jobs.',
        articleLink: { href: '/articles/how-fast-can-you-know-what-to-do-next', label: 'Read: How Fast Can You Know What to Do Next?' },
      },
      {
        q: 'We are not a large enterprise. Is this still for us?',
        a: 'The approach scales down as well as up. Start with one operating group or one cost category across the business. The logic is the same at any size: establish the baseline, rank the opportunities, act on the strongest one, and let the results fund what comes next.',
      },
    ],
  },
  {
    heading: 'Results & Proof',
    color: '#2E6B8A',
    items: [
      {
        q: 'How quickly will we see results?',
        a: 'It depends on the opportunity that ranks first, and we will not pretend otherwise. Some actions, such as rate structures, incentive capture and operational adjustments, can show results within months. Capital projects take longer. Speed is central to the model because the value comes from implementing the right sequence of projects, not from a single promise. Early on the low risk wins are chosen on purpose, so the first results come quickly and build the case for bigger moves.',
      },
      {
        q: 'How do we know the savings are real and not consultant math?',
        a: 'Because they are measured, not asserted. Every completed project gets an M&V report. [CONFIRM: provider name and reporting frequency.] You receive ongoing reporting of savings and environmental results in between. Results are compared with the baseline established at the start. Where an early-stage figure relies on a vendor-supplied estimate, we label it as an estimate; once the project is implemented, it is replaced with completed results.',
      },
      {
        q: 'What if the analysis finds nothing worth doing?',
        a: 'Then we tell you that, and you walk away with an initial baseline and greater clarity. The purpose is a defensible next decision, including the decision not to proceed at that time.',
      },
    ],
  },
  {
    heading: 'How We Work',
    color: '#5B5EA6',
    items: [
      {
        q: 'Who actually does the implementation work?',
        a: 'Specialist vendors do the physical work. That is their job and their expertise. Ours is different: we identify what should be done, in what order, and by whom, then coordinate the vendors, the financing, and the verification, and stay accountable for the outcome. We sit on your side of the table, outside the vendor playing field, which is precisely why we can select and manage vendors on merit.',
        articleLink: { href: '/articles/what-an-actionable-plan-contains', label: 'Read: What Does an Actionable Sustainability Plan Actually Contain?' },
      },
      {
        q: 'What is actio, and who owns it?',
        a: 'actio is the decision platform developed and owned by Catalys Inc. and licensed to Enduring Advantage at a channel rate. Rob Kirkby is majority owner of both Catalys and Energy Advantage, so these are related parties and we say so up front. actio holds three databases, customer, supplier and jurisdictional, and uses them to name the Next Best Thing.',
      },
      {
        q: 'What happens if we do nothing?',
        a: 'The list stays random. The projects that get funded are the ones that got pitched, and the one that would have paid for the others sits unfunded. The same proposal comes back to the next review with nothing new behind it. Meanwhile the costs keep landing in fuel, insurance, inputs and asset values, and the people watching how your company behaves keep choosing.',
      },
      {
        q: 'What changes once the first project is done?',
        a: 'The question in the room. It stops being whether to do this and becomes what\'s next. You walk into the next committee with a project that paid, the numbers to prove it, and the next one already ranked.',
      },
      {
        q: 'Can we trust an AI-generated recommendation?',
        a: 'Not on its own, and neither do we. First, actio helps screen out what is not material and identify the next best move from the available data. Then generative AI turns that decision into a detailed draft plan quickly. No recommendation reaches you without a human sanity test from experienced coaches and subject matter experts who confirm it works in the real world and add the local context an AI can miss.',
      },
      {
        q: 'What data do you need from us to get started?',
        a: 'Whatever you have. Utility bills, fuel and fleet records, waste invoices, building and equipment inventories, and prior audits or reports are useful starting points. We start where the data or funding already exists, identify the gaps that matter to the decision, and collect more only when it changes the answer. Each completed action improves the next decision.',
      },
      {
        q: 'We are not going to hand over a mountain of data up front.',
        a: 'You do not have to. Nobody has complete data on day one and we do not build the plan on the assumption that you do. We start with the available data, look for low-risk early wins, and prioritize only the collection work that can make the next answer sharper. Every result earns the next piece of access.',
      },
      {
        q: 'What happens if we do not have good data?',
        a: 'You do not need a complete global data set before you begin. We start with the available data or funding path, take the quick wins first, and use the results to earn access to better data. The whole-field program comes later, once the data has compounded.',
      },
      {
        q: 'Is our data kept confidential?',
        a: 'Yes. Your operational and financial data is used to serve your engagement: to establish the baseline, screen the decision field and report completed outcomes. Your data remains yours and never becomes public. Information required for a selected project is handled within the agreed delivery process.',
      },
      {
        q: 'We already know what our biggest opportunity is?',
        a: 'You may be right. In our experience the answer is usually somewhere the organization was not looking, because the obvious candidate is obvious to everyone including your vendors, and it has usually been priced accordingly. We do not arrive with a view either. The first engagement exists to find out, against your data and the whole field, rather than to confirm what either of us assumed.',
      },
    ],
  },
  {
    heading: 'Scope & Fit',
    color: '#8A6B2E',
    items: [
      {
        q: 'Do you only work on buildings and energy?',
        a: 'No. Energy in buildings is often where the data is richest, but the playing field is much wider. That includes fleet and fuel switching, water, waste, supply chain, procurement, and sector-specific opportunities. The right starting point differs by organization. A municipality\'s priorities are not a manufacturer\'s, and a farm\'s are not a REIT\'s. That is exactly why we start wide. The bigger the field we search, the more likely your best opportunity is the true maximum, not just the best of a narrow list.',
      },
      {
        q: 'Why does our location matter to the analysis?',
        a: 'Because the same project produces different returns in different places. Utility and government funding programs, energy rates, insurance costs, and operating conditions all vary by jurisdiction, and they materially change payback. Higher energy rates make efficiency savings worth more; available incentives can transform a marginal project into a compelling one. Jurisdictional data is one of the three databases inside actio, alongside your own data and the supplier database.',
      },
      {
        q: 'We mostly care about the financial return. Is that a problem?',
        a: 'Not at all. It is how we are built. A solution is only considered if it has a positive environmental impact across the entire Sustainability Playing Field and provides a financial return; within that field, we rank by overall business case. You never have to choose between an initiative that pays and an initiative that helps. The ones we recommend do both, and the business case is designed to survive policy changes.',
      },
      {
        q: 'Can you help us with climate risk, not just cost savings?',
        a: 'Yes, and it is a growing part of the work. Interconnected environmental pressures, including wildfires, flooding, drought, and supply chain disruption, are already showing up in insurance availability, input costs, and asset values. We help clients think strategically about exposure: where operations are located, how supply chains can be shortened, and which risks deserve action now. The same discipline applies: rank the exposures, act on the material ones first.',
      },
      {
        q: 'Do you work with First Nations communities?',
        a: 'Yes. We work with chief and council as a long-term partner rather than an outside vendor, and the difference shows in process rather than in what we call ourselves. The community sets the priority. We work within its governance and procurement, and community knowledge and decision authority stay where they are. Then we do what we do everywhere, which is find the single opportunity that returns most on the community’s own terms, deliver it, and come back for the next one. Circumstances differ by nation and we do not arrive with a view about which opportunity yours will be.',
      },
      {
        q: 'We already have sustainability advisors.',
        a: 'Good. Ask them to show you every credible alternative they evaluated, how each opportunity was ranked, and why their recommended initiative creates more value than the other options. When they cannot provide that answer, you may not have a strategy. You may have a collection of projects.',
        articleLink: { href: '/articles/from-thousands-of-options-to-one-decision', label: 'Read: How Do You Get From Thousands of Options to One Funded Decision?' },
      },
      {
        q: 'Do you work through our accountant or consultant?',
        a: 'Often, yes, and it is our main route to market. Accounting, consulting and engineering firms already hold the client relationship. What they have never had is a way to find the Next Best Thing inside a client’s operations. We supply the engine and the delivery. The firm keeps the relationship and puts its name on the work. If your advisor is not a partner yet, introduce us.',
      },
      {
        q: 'Can our team start this work ourselves?',
        a: 'Often, yes. Internal teams are usually best placed to identify obvious operational waste, gather records, and maintain the daily discipline that keeps improvements in place. Outside help becomes more useful when leaders need to rank unlike options, time capital decisions, compare vendors independently, or establish results that someone outside the company must trust.',
        articleLink: { href: '/articles/can-our-team-work-out-what-goes-first', label: 'Read: Can Our Own Team Work Out What Goes First?' },
      },
      {
        q: 'Sustainability rules keep changing.',
        a: 'That\'s why financial performance matters. We look for the one initiative that strengthens the business on its own economics, through lower costs, stronger operations, improved resilience, or better capital access. Incentives and regulation can improve an investment case. They should not be the only reason it exists.',
      },
      {
        q: 'We have ten sustainability problems. Can you help with all of them?',
        a: 'No, and that is the point. You will have a large number of sustainability issues in flight at any time. Enduring Advantage is not an outsourced sustainability manager. An issue is only addressed when it becomes your Next Best Thing, the one project that delivers the biggest financial return with a positive environmental impact. Then the next one.',
      },
    ],
  },
];

function AccordionItem({ q, a, color, articleLink }: { q: string; a: string; color: string; articleLink?: { href: string; label: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid rgba(201,168,76,0.12)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease',
        boxShadow: open ? '0 4px 20px rgba(30,45,47,0.08)' : '0 1px 4px rgba(30,45,47,0.04)',
      }}
    >
      <button
        onClick={() => { if (!open) trackFaqOpened(q, 'questions_page'); setOpen(!open); }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-slate-deep)',
            lineHeight: 1.3,
          }}
        >
          {q}
        </span>
        <ChevronDown
          size={18}
          style={{
            color,
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s cubic-bezier(0.23,1,0.32,1)',
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? '600px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'oklch(0.45 0.02 200)',
            lineHeight: 1.75,
            padding: '0 1.5rem 1.25rem',
            margin: 0,
          }}
        >
          {renderActioText(a)}
        </p>
        {articleLink && (
          <Link
            href={articleLink.href}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color,
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 700,
              lineHeight: 1.35,
              padding: '0 1.5rem 1.35rem',
              textDecoration: 'none',
            }}
          >
            {articleLink.label} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Questions() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToCategory = (heading: string) => {
    setActiveCategory(heading);
    trackFaqCategorySelected(heading);
    const el = categoryRefs.current[heading];
    if (el) {
      const offset = 96; // nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // FAQPage schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      }))
    ),
  };

  useSEO({
    title: 'Questions | Enduring Advantage',
    description: 'Straight answers on cost, proof, data, method and fit, and on what happens if you do nothing.',
    canonicalPath: '/questions',
    ogImage: 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/og-social-share-TjcXvbM8Zm8Zo3haX98724.png',
    jsonLd: faqSchema,
  });

  return (
    <div style={{ background: 'var(--color-cream)', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section
        style={{
          background: 'var(--color-slate-deep)',
          padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)',
        }}
      >
        <div className="container grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
          <ScrollReveal>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              Objections, Answered
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 600,
                color: '#FAF7F2',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                maxWidth: '20ch',
              }}
            >
              Questions Leaders Ask
              <br />
              <em style={{ color: '#C9A84C' }}>Before Starting.</em>
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                color: 'rgba(250,247,242,0.72)',
                lineHeight: 1.7,
                maxWidth: '520px',
              }}
            >
              Straight answers to the questions leaders ask most. No jargon. No hedging. If your question is not here, ask directly.
            </p>
          </ScrollReveal>
          <aside aria-label="Questions decision guide" style={{ borderBottom: '1px solid rgba(250,247,242,0.2)', borderTop: '2px solid #C9A84C', padding: '1.2rem 0' }}>
            <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.67rem', fontWeight: 800, letterSpacing: '0.13em', margin: 0, textTransform: 'uppercase' }}>Decision guide</p>
            <div style={{ alignItems: 'center', display: 'flex', gap: '0.85rem', marginTop: '0.8rem' }}><div style={{ alignItems: 'center', border: '1px solid rgba(201,168,76,0.75)', borderRadius: '50%', color: '#C9A84C', display: 'flex', fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, height: '56px', justifyContent: 'center', width: '56px' }}>04</div><p style={{ color: 'rgba(250,247,242,0.7)', fontFamily: 'var(--font-body)', fontSize: '0.82rem', lineHeight: 1.55, margin: 0 }}>Cost, proof, method and fit. Start where the decision is blocked.</p></div>
          </aside>
        </div>
      </section>

      {/* Editorial category index */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
          padding: '0.875rem 0',
          position: 'sticky',
          top: '64px',
          zIndex: 30,
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '1rem', rowGap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'oklch(0.55 0.02 200)', marginRight: '0.25rem' }}>
              Jump to:
            </span>
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.heading}
                onClick={() => scrollToCategory(cat.heading)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  padding: '0.15rem 0',
                  borderRadius: 0,
                  border: 'none',
                  borderBottom: `2px solid ${activeCategory === cat.heading ? '#C9A84C' : 'transparent'}`,
                  background: 'transparent',
                  color: activeCategory === cat.heading ? '#0D3349' : 'oklch(0.45 0.02 200)',
                  cursor: 'pointer',
                  transition: 'all 0.18s cubic-bezier(0.23,1,0.32,1)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat.heading) {
                    (e.currentTarget as HTMLButtonElement).style.color = '#0D3349';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat.heading) {
                    (e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.45 0.02 200)';
                  }
                }}
              >
                {cat.heading}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ categories */}
      <section style={{ background: '#FAF7F2', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container">
          <div className="max-w-3xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {FAQ_CATEGORIES.map((cat, ci) => (
              <ScrollReveal key={ci} delay={ci * 60}>
                <article ref={(el) => { categoryRefs.current[cat.heading] = el; }} style={{ borderTop: '3px solid #C9A84C', paddingTop: '1.1rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: '#0D3349',
                        border: '1px solid #C9A84C',
                        color: '#F0D070',
                        display: 'grid',
                        placeItems: 'center',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        flexShrink: 0,
                      }}
                    >{String(ci + 1).padStart(2, '0')}</div>
                    <div><p style={{ color: '#A9832C', fontFamily: 'var(--font-body)', fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.12em', margin: 0, textTransform: 'uppercase' }}>Decision file</p><h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)', fontWeight: 600, letterSpacing: '-0.02em', color: '#0D3349', lineHeight: 1.1, margin: '0.22rem 0 0' }}>{cat.heading}</h2></div>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(201,168,76,0.36)', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1rem' }}>
                    {cat.items.map((item, ii) => (
                      <AccordionItem key={ii} q={item.q} a={item.a} color="#C9A84C" articleLink={item.articleLink} />
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section style={{ background: '#0D3349', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container text-center">
          <ScrollReveal>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 600,
                color: '#FAF7F2',
                lineHeight: 1.15,
                marginBottom: '1rem',
              }}
            >
              Still have a question.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'rgba(250,247,242,0.7)',
                lineHeight: 1.7,
                maxWidth: '480px',
                margin: '0 auto 2rem',
              }}
            >
              A conversation with a principal is the fastest way to get a direct answer for your situation. No sales presentation. No commitment.
            </p>
            <Link href="/articles/which-solution-works-here" className="inline-flex items-center gap-2" style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', marginBottom: '1.35rem' }}>
              Choosing an advisor? Read how to identify the one solution that belongs first <ArrowRight size={15} />
            </Link>
            <a href="https://calendar.app.google/ozpmtufXwN4uhE2r6" target="_blank" rel="noopener noreferrer">
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#C9A84C',
                  color: '#FAF7F2',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                }}
              >
                Find your Next Best Thing
                <ArrowRight size={15} />
              </span>
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

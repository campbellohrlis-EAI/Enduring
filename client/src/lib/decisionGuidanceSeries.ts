// ENDURING ADVANTAGE, Decision-Guidance Series
// Replacement series based on the user-supplied six-part editorial drafts.

import type { Article } from './articlesData';

export const legacyArticleReplacements: Record<string, string> = {
  'questions-to-ask-a-sustainability-consultant': 'which-solution-works-here',
  'is-sustainability-consulting-worth-the-investment': 'what-is-the-right-order-worth',
  'how-to-hire-a-sustainability-consultant': 'from-thousands-of-options-to-one-decision',
  'from-options-to-one-decision': 'from-thousands-of-options-to-one-decision',
  'sustainability-consultant-vs-diy': 'can-our-team-work-out-what-goes-first',
  'what-can-a-sustainability-consultant-do': 'what-an-actionable-plan-contains',
  'how-long-does-a-sustainability-project-take': 'how-fast-can-you-know-what-to-do-next',
};

export const decisionGuidanceSeries: Article[] = [
  {
    slug: 'which-solution-works-here',
    title: 'Every Sustainability Solution Works Somewhere. How Do You Find the One That Works Here?',
    subtitle: 'The hard problem is not finding an option. It is choosing the one that belongs first in your operation, under your financial and operating constraints.',
    category: 'Decision Support',
    author: 'Campbell Ohrlis',
    authorTitle: 'VP, Commercial Strategy',
    authorPhoto: '/manus-storage/CampbellOhrlis_da1d067a.jpeg',
    authorBio: 'Campbell Ohrlis works with leadership teams on the commercial question underneath sustainability: what deserves attention first, how to evaluate the options, and how to turn a decision into action.',
    date: 'August 24, 2026',
    readTime: '9 min read',
    heroImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=85',
    heroAlt: 'Business leaders reviewing options around a meeting table',
    excerpt: 'Thousands of credible options exist. The scarce resource is a disciplined way to decide which one belongs first in your company.',
    tags: ['Hiring & Advisory', 'Decision Support', 'CFO Strategy', 'Vendor Neutrality', 'Data Maturity'],
    ogImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=90',
    linkedInExcerpt: 'Every sustainability solution works somewhere. The question is whether it is the best use of your next dollar, in your buildings, on your line, under your capital constraints. The market is not short of options. It is short of a way to choose between them.',
    faq: [
      { question: 'What should a strong first recommendation include?', answer: 'It should name one next action, show financial return and environmental impact together, state what was screened out and why, and be clear about assumptions and confidence.' },
      { question: 'Can useful advice start before data is complete?', answer: 'Yes. A credible first phase starts with available data or a real funding and operating decision, then refines the picture as better information becomes available.' },
      { question: 'Why ask about equipment sales and referral fees?', answer: 'Independence is structural. Buyers should understand whether the advisor benefits from a particular product, vendor relationship, or affiliated technology before relying on the recommendation.' },
    ],
    sections: [
      { type: 'body', content: `Hundreds of billions of dollars have gone into technologies, programs, and services addressing climate, biodiversity loss, and pollution. That investment produced thousands of credible options. Most work somewhere.

That is precisely why choice is difficult. The chance that any one option is the best use of your next dollar, in your buildings or on your production line, given your equipment ages and capital constraints, is small. You are not short of options. You are short of a way to choose between them.` },
      { type: 'subheading', content: 'Ask for the next action, and what was screened out' },
      { type: 'body', content: `A weak answer is a long menu, a scoring matrix nobody can explain, or a recommendation to create another working group. A strong answer names one action, shows financial return and environmental impact together, and explains what was excluded and why.

Materiality is the filter. If an option is not material to your company, it should not consume the decision-maker’s attention. The practical test is whether the recommendation can be defended when finance, operations, and a skeptical executive ask why it outranked the alternatives.` },
      { type: 'subheading', content: 'Start with what you know, not with a promise to assess everything' },
      { type: 'body', content: `Almost no company has complete data on day one. A sensible approach starts where records, funding, or an operational decision already exist, produces an early result that can be tested, and uses that progress to sharpen the next decision.

Ask what the first phase can establish with the data available now, what would confirm or change the initial view, and which data gaps actually matter. A broad whole-field view can develop as the information compounds. It does not have to delay the first useful move.` },
      { type: 'subheading', content: 'Test independence and the human check' },
      { type: 'body', content: `Ask directly whether the advisor sells equipment, takes referral fees, or has affiliated technology and ownership relationships. Related arrangements are not automatically a problem. Undisclosed incentives are. A vendor can see a genuine problem and still have a predictable shape to its recommendation.

Generative tools can accelerate a detailed draft. They cannot confirm local contractor capacity, actual site conditions, or a funding window that has already closed. Ask who reviews the analysis before it reaches you, what field experience they bring, and what they would change after a site-level sanity test.` },
      { type: 'pullquote', content: 'A good first conversation leaves you with a credible next action, the information that would confirm it, and a clearer view of what the first phase must prove.', attribution: 'Campbell Ohrlis, Enduring Advantage' },
    ],
  },
  {
    slug: 'what-is-the-right-order-worth',
    title: 'What Is the Right Order Actually Worth?',
    subtitle: 'The return on sequencing can exceed the return on any individual project, because the right order protects capital, timing, and the ability to fund what comes next.',
    category: 'Financial Performance',
    author: 'Campbell Ohrlis',
    authorTitle: 'VP, Commercial Strategy',
    authorPhoto: '/manus-storage/CampbellOhrlis_da1d067a.jpeg',
    authorBio: 'Campbell Ohrlis focuses on the commercial logic of environmental decisions: how a company makes the first move defensible and creates room for the next one.',
    date: 'August 24, 2026',
    readTime: '9 min read',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=85',
    heroAlt: 'Finance and operations leaders reviewing capital allocation plans',
    excerpt: 'The order of otherwise credible projects can determine whether a program compounds value or simply spends capital.',
    tags: ['Hiring & Advisory', 'Financial Return', 'Capital Allocation', 'CFO Strategy', 'Risk & Resilience'],
    ogImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=90',
    linkedInExcerpt: 'The biggest return is often not inside a project. It is inside the order of the projects. Timing a decision against equipment cycles, funding windows, and operating constraints can protect more value than choosing a different technology.',
    faq: [
      { question: 'Why does sequencing matter in sustainability investment?', answer: 'Projects can be individually credible but collectively underperform if they are mistimed, duplicate work, consume capital needed for a stronger option, or depend on an asset that is about to be replaced.' },
      { question: 'Should incentives determine the project order?', answer: 'Incentives can improve an already sound project. They should not be the sole reason to choose an option that fails the organization’s own financial criteria without support.' },
      { question: 'What should finance require before approving a first action?', answer: 'A clear recommendation, economics with and without incentives, stated assumptions, an agreed baseline method, delivery ownership, and a realistic plan for verification.' },
    ],
    sections: [
      { type: 'body', content: `Two organizations can commit the same capital to environmental improvements and end up with very different results. The difference is often not the technology. It is the order.

A visible project may arrive first because a vendor called, a grant is expiring, or it is easy to explain to a board. Yet controls, maintenance, process changes, or a project aligned to an equipment replacement cycle may produce a stronger financial result with less disruption. Sequencing is a capital-allocation decision dressed in engineering language.` },
      { type: 'subheading', content: 'Where order decides the outcome' },
      { type: 'body', content: `The right asset installed too early can lose much of its value when the equipment it depends on is replaced soon after. A visible initiative can consume capital that would have been better used on operational work. A project can miss a funding window because no one aligned the schedule. And a program that only works on a subsidy can become fragile when rules change.

The more useful question is not “Does this option work?” It is “Does it belong ahead of the other credible options, given our asset cycles, financial criteria, operating constraints, and current source of risk?”` },
      { type: 'subheading', content: 'Why the exposure is becoming more material' },
      { type: 'body', content: `CDP reported in May 2026 that 11,261 companies disclosing full environmental data in 2025 anticipated US$714 billion in future financial impacts from extreme weather, with 48% of identified risks expected within two years. CDP also reported a median mitigation cost of US$3.1 million against a median risk cost of US$39.4 million.

A 2024 Nature study, summarised by King’s College London, estimated that climate disruption to global supply chains could contribute US$3.75 trillion to US$24.7 trillion in net economic losses in 2020 dollars by 2060 depending on the emissions pathway. These are system-level figures, not a forecast for an individual company. They underline why the first decision should account for operating, supply-chain, and capital risk together.` },
      { type: 'stat-row', stats: [{ value: 'US$714B', label: 'future corporate extreme-weather impacts anticipated in CDP’s 2025-disclosure analysis' }, { value: '48%', label: 'identified extreme-weather risks expected within two years in the same CDP analysis' }, { value: 'Nearly 13x', label: 'ratio of median risk cost to median mitigation cost reported by CDP' }] },
      { type: 'subheading', content: 'The comparison that matters' },
      { type: 'body', content: `The usual comparison is advisory cost against savings. A more useful comparison is the cost of a disciplined decision process against the cost of spending capital in the wrong order.

There are times when a formal sequencing exercise is not the right purchase. A single-site organization with modest spend, no funding capacity, or a narrow compliance request may be better served by a focused technical audit or internal action. The work earns its place when multiple material choices, timing constraints, and external scrutiny make the order consequential.` },
      { type: 'subheading', content: 'Sources and context' },
      { type: 'body', content: `Sources: CDP, “Extreme Weather Risk is Reshaping the Global Economy,” 12 May 2026; Wang et al., “Global supply chains amplify economic costs of future extreme heat risk,” Nature, 2024; and Verdantix, “ESG And Sustainability Consulting: Market Size and Forecast 2021-2027,” 2022. Verdantix’s US$16 billion 2027 projection was a historical forecast, not a current market-size estimate.` },
    ],
  },
  {
    slug: 'from-thousands-of-options-to-one-decision',
    title: 'How Do You Get From Thousands of Options to One Funded Decision?',
    subtitle: 'A better sequence begins with the actual decision, uses available data honestly, and tests whether an advisor can help narrow the field before it becomes another report.',
    category: 'Advisory & Delivery',
    author: 'Campbell Ohrlis',
    authorTitle: 'VP, Commercial Strategy',
    authorPhoto: '/manus-storage/CampbellOhrlis_da1d067a.jpeg',
    authorBio: 'Campbell Ohrlis helps companies turn a crowded market of possibilities into a clear first decision that finance and operations can both defend.',
    date: 'August 24, 2026',
    readTime: '10 min read',
    heroImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&q=85',
    heroAlt: 'Business leaders reviewing a decision plan in a working session',
    excerpt: 'A broad request for proposal can produce polished answers and less clarity. Start with the decision you need made and ask for a credible first move.',
    tags: ['Hiring & Advisory', 'Decision Support', 'Due Diligence', 'CFO Strategy', 'Vendor Neutrality'],
    ogImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=90',
    linkedInExcerpt: 'Most companies outsource the hardest part of sustainability to a procurement process: deciding what goes first. Start instead with one sentence describing the decision. Then test whether an advisor can offer a defensible first hypothesis, explain what would change it, and stay accountable to delivery.',
    faq: [
      { question: 'What should be in a sustainability advisory brief?', answer: 'State the decision you need made, the data already available, relevant capital and timing constraints, and the people who must be able to defend the next action.' },
      { question: 'How many firms should we shortlist?', answer: 'A focused shortlist is often more useful than a wide proposal process. The goal is to compare reasoning, independence, and delivery fit rather than merely score credentials.' },
      { question: 'What should a first engagement prove?', answer: 'It should demonstrate whether the work can change the next decision by producing a recommendation, transparent assumptions, an agreed baseline method, and a clear ownership path.' },
    ],
    sections: [
      { type: 'body', content: `Many companies start backwards. They write a broad scope, send it to several firms, compare proposals, and select the one that appears most comprehensive. Months later, they can have a polished document and no more clarity about what should happen first.

The decision itself is the hard part. A procurement process is useful for comparing defined work. It is not designed to define the first material action in a field of unlike options.` },
      { type: 'subheading', content: 'The cost of narrowing too early' },
      { type: 'body', content: `Think of it like standing in a museum. Step back far enough and you see everything. Zoom in too early and you miss most of it.

A wide view keeps credible alternatives visible before the detailed work begins. Narrowing too early can hide the decision that matters most. actio starts with the whole field and screens out what is not material, grounded in your data and the market context.

Everyone knows the feeling of scrolling Netflix all evening and never picking a movie. Wasting an evening is fine. Wasting years, and billions of dollars, dithering on a sustainability decision destroys ecosystems and balance sheets. Decision paralysis has real cost here.` },
      { type: 'subheading', content: 'Write down the decision, not the project' },
      { type: 'body', content: `Put the actual decision in one sentence. Not “develop a sustainability strategy.” Something closer to “we have capital available and no defensible way to rank the projects competing for it,” or “two major customers have requirements we cannot yet answer.”

Then take a short inventory of what you already know: utility records, equipment ages, metering, water and waste invoices, previous audits, fleet information, and production volumes. The data will be incomplete. That is normal. It tells you what can be answered in the first phase and what must be refined later.` },
      { type: 'subheading', content: 'Understand the type of help you are buying' },
      { type: 'body', content: `Technical specialists are valuable when the project is already known. Reporting firms are valuable when a customer or regulator requires a specific document. Large integrated firms can bring breadth. An independent decision partner is useful when the question is what goes first and how to coordinate the specialists after that choice is made.

A focused shortlist should test fit, not create a theatre of comparison. Ask each firm what it thinks the next action might be based on the information provided, what would confirm or disprove that view, and what it would screen out first.` },
      { type: 'subheading', content: 'Use the first meeting as a test' },
      { type: 'body', content: `Bring finance and operations. Ask what the firm would do before the data is complete, who reviews the work before it reaches you, what it has advised against in a similar context, and whether it sells equipment or takes referral fees.

The point is not to demand certainty from a first conversation. It is to see whether the advisor can reason in public, distinguish a hypothesis from a promise, disclose incentives, and describe how a recommendation becomes a plan somebody will run.` },
      { type: 'pullquote', content: 'A first phase should prove that the work changes the next decision, not merely that the advisor can produce a longer document.', attribution: 'Campbell Ohrlis, Enduring Advantage' },
    ],
  },
  {
    slug: 'can-our-team-work-out-what-goes-first',
    title: 'Can Our Own Team Work Out What Goes First?',
    subtitle: 'Internal teams should own the operational work they can do well. Outside support becomes useful when unlike options, capital timing, independent comparison, and verification make the choice harder.',
    category: 'Operational Delivery',
    author: 'Rob Kirkby',
    authorTitle: 'Principal, Enduring Advantage',
    authorPhoto: '/manus-storage/RobKirkby_402e0e7f.jpeg',
    authorBio: 'Rob Kirkby is a principal at Enduring Advantage with decades of experience in energy economics, operating data, and client-side implementation leadership.',
    date: 'August 24, 2026',
    readTime: '9 min read',
    heroImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1400&q=85',
    heroAlt: 'Operations and finance team working together around a project table',
    excerpt: 'Your team can often identify obvious waste. The harder question is when choices become unlike enough that a disciplined external comparison is worth paying for.',
    tags: ['Hiring & Advisory', 'Operational Delivery', 'CFO Strategy', 'Capital Allocation', 'Implementation'],
    ogImage: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=90',
    linkedInExcerpt: 'Some of the best environmental returns are available to internal teams with a utility portal, a spreadsheet, and operating knowledge. Do that work first. Bring in outside help when the question changes from finding opportunities to choosing between unlike options under capital, timing, and verification constraints.',
    faq: [
      { question: 'What sustainability work can an internal team do well?', answer: 'Internal teams are often best placed to find obvious operational waste, gather records, review bills, maintain operating discipline, and complete straightforward customer questionnaires.' },
      { question: 'When does external support add value?', answer: 'It is most useful when leaders must compare unlike initiatives, evaluate vendors independently, sequence work against asset cycles, build a verification method, or create capacity to carry a decision through delivery.' },
      { question: 'Can an internal team and advisor work together?', answer: 'Yes. A productive division is for the company to own its data, operating knowledge, and execution relationships while external support contributes prioritisation, independent comparison, and verification discipline.' },
    ],
    sections: [
      { type: 'body', content: `For a meaningful share of the work, the answer is yes. Your people may be the best people to find compressed-air leaks, equipment operating through unoccupied hours, billing errors, weak schedules, and the records needed to understand the baseline. That work should not be outsourced simply because it carries a sustainability label.

The line is not between simple and hard work. It is between finding opportunities and choosing between them.` },
      { type: 'subheading', content: 'What internal teams do better than anyone outside' },
      { type: 'body', content: `Maintenance and operations teams know the site, the constraints, and the habits that influence performance. They can review utility bills and tariffs, collect equipment information, assemble production records, complete basic questionnaires, and maintain the routines that keep improvements in place.

Doing this work early improves the operating picture and makes later specialist input more efficient. You are not paying advisory rates for data entry, and the organization develops a clearer view of the conditions any recommendation must respect.` },
      { type: 'subheading', content: 'Where internal effort runs out of road' },
      { type: 'body', content: `The difficulty changes when a heat-recovery project, fleet transition, refrigerant change, and packaging redesign each have different financial profiles, risks, environmental effects, and operating implications. Ranking them needs a method, not a meeting.

The same is true of vendor evaluation, timing a project against replacement cycles, documenting a result others will trust, and managing funding windows. The constraint is often attention. An operations lead with a full role can identify the opportunity yet still lack the time to compare quotes, coordinate specialists, hold a schedule, and report to leadership.` },
      { type: 'subheading', content: 'A short decision test' },
      { type: 'body', content: `Can you name the highest-value next action and defend the ranking against finance? Does someone have real capacity to run the work? Are the options comparable enough to assess internally? Is the capital or external scrutiny significant enough that the order matters?

When the answers are clear, keep going. When several are not, a hybrid model often works best: the internal team owns data, operating discipline, and delivery relationships, while outside support contributes prioritisation, independent comparison, and a verification method.` },
    ],
  },
  {
    slug: 'what-an-actionable-plan-contains',
    title: 'What Does an Actionable Sustainability Plan Actually Contain?',
    subtitle: 'A plan is not an inventory, framework, or ranked menu. It is a clear next action, the conditions for delivery, and a way to know whether the result arrived.',
    category: 'Implementation',
    author: 'Rob Kirkby',
    authorTitle: 'Principal, Enduring Advantage',
    authorPhoto: '/manus-storage/RobKirkby_402e0e7f.jpeg',
    authorBio: 'Rob Kirkby works at the point where an environmental opportunity becomes an operating decision, a delivery plan, and an outcome that can be tested.',
    date: 'August 24, 2026',
    readTime: '10 min read',
    heroImage: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1400&q=85',
    heroAlt: 'Project team reviewing a practical implementation plan',
    excerpt: 'An actionable plan makes the crowded field smaller. It establishes what is happening, names the next action, attaches the delivery conditions, and states how the result will be verified.',
    tags: ['Hiring & Advisory', 'Implementation', 'Measurement & Verification', 'Vendor Neutrality', 'Operational Delivery'],
    ogImage: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200&q=90',
    linkedInExcerpt: 'A sustainability plan is not a long report. It is a picture of what is happening, one recommended next action, a delivery plan someone owns, independent vendor comparison, appropriate funding support, and a verification method agreed before work begins.',
    faq: [
      { question: 'What is the difference between a sustainability plan and a report?', answer: 'A plan names a next action, states what was screened out, makes assumptions visible, assigns delivery ownership, and explains how results will be measured. A report may describe options without reducing the decision.' },
      { question: 'Should incentives drive the recommendation?', answer: 'Incentives should improve projects that already make financial and operational sense. They should not be the only reason a project is selected.' },
      { question: 'Why agree verification before implementation?', answer: 'A written baseline and measurement method help distinguish an estimate from a result and give finance, customers, or lenders a shared basis for evaluating performance.' },
    ],
    sections: [
      { type: 'body', content: `Ask ten firms for a sustainability plan and you may receive ten documents that differ radically in scope and price. Some are inventories. Some are frameworks. Some are ranked menus with a proposal for a later phase. Very few tell you what to do on Monday.

A plan worth acting on contains the information needed to make, deliver, and test one decision. It narrows the field rather than expanding it.` },
      { type: 'subheading', content: 'A picture of what is really happening' },
      { type: 'body', content: `Start with where energy, water, materials, and waste are going, what they cost, and how performance compares with what the operation should reasonably require. Utility records, equipment age and condition, spend by site and end use, and relevant production information form the input.

The valuable output is not the inventory. It is the variance. When comparable sites or processes perform differently, the gap is where the decision becomes interesting.` },
      { type: 'subheading', content: 'One recommended next action' },
      { type: 'body', content: `Anyone can produce a list of opportunities. A real plan screens out what is not material and names the single next action that best fits the organization’s financial criteria, operating reality, and environmental objectives.

The recommendation should include visible reasoning, expected value with stated confidence, the material alternatives excluded, and economics with and without incentives. If the ranking cannot stand up to finance, it is not yet a decision.` },
      { type: 'subheading', content: 'A delivery path and vendor process' },
      { type: 'body', content: `A recommendation is not a plan until it includes the specification, qualified bidder approach, total-cost comparison, budget, schedule against asset cycles and operating windows, and a named internal owner.

Technology can accelerate a first draft. A human review still has to test contractor capacity, program rules, local conditions, and operational reality. The vendor process should be written for the company’s situation rather than around a seller’s product, and the comparison should extend beyond sticker price.` },
      { type: 'subheading', content: 'Funding, verification, and accountability' },
      { type: 'body', content: `Funding can improve a project that already makes sense. An eligibility screen, application support, and reporting requirements should be attached to the actual project list, not treated as a reason to choose a weaker project.

A written baseline, stated measurement method, and periodic reporting distinguish claimed savings from verified results. Someone also has to hold the schedule, follow up with vendors, escalate delays, and report to leadership. A sound plan without delivery ownership becomes a folder.` },
      { type: 'pullquote', content: 'The test is simple: did the crowded field of options get smaller by the time you finished reading?', attribution: 'Rob Kirkby, Enduring Advantage' },
    ],
  },
  {
    slug: 'how-fast-can-you-know-what-to-do-next',
    title: 'How Fast Can You Know What to Do Next?',
    subtitle: 'Time to a defensible decision, time to implementation, and time to verified results are different clocks. A credible program names each one plainly.',
    category: 'Operational Delivery',
    author: 'Rob Kirkby',
    authorTitle: 'Principal, Enduring Advantage',
    authorPhoto: '/manus-storage/RobKirkby_402e0e7f.jpeg',
    authorBio: 'Rob Kirkby helps leadership teams sequence first decisions, practical delivery, and verification around the actual constraints of operations and capital planning.',
    date: 'August 24, 2026',
    readTime: '9 min read',
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=85',
    heroAlt: 'Project schedule and operational planning session',
    excerpt: 'A useful decision can emerge in weeks. Implementation and verification follow different calendars. The plan should make those clocks visible rather than collapsing them into one promise.',
    tags: ['Hiring & Advisory', 'Operational Delivery', 'Implementation', 'Measurement & Verification', 'CFO Strategy'],
    ogImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=90',
    linkedInExcerpt: 'How fast can you know what to do next? Time to a defensible decision is often measured in weeks. Time to implementation and a result finance can rely on follows different clocks. A credible plan separates them instead of offering one number that means three things.',
    faq: [
      { question: 'How quickly can a company identify a first action?', answer: 'With a clear decision scope and usable records, a focused first phase can often identify a defensible next action in weeks. Timing depends on data access, number of sites, and decision complexity.' },
      { question: 'Why do verified results take longer?', answer: 'Procurement, equipment lead times, operating windows, permits, seasonality, and the need for sufficient post-project data can extend the time required to confirm a result.' },
      { question: 'What speeds up a program?', answer: 'A named internal data owner, decision-maker access, existing metering or records, capital already approved in principle, and early checks of funding and procurement calendars can all reduce avoidable delay.' },
    ],
    sections: [
      { type: 'body', content: `Three different questions hide inside “how fast can you know what to do next?” Time to a defensible decision, time to implemented action, and time to a result finance can rely on are not the same.

Trouble starts when someone quotes the first number and delivers against the third, or when a buyer expects the third and is sold only the first. A credible program separates the clocks.` },
      { type: 'subheading', content: 'First, establish what data exists' },
      { type: 'body', content: `Utility records, equipment registers, production volumes, previous audits, existing metering, and targeted site visits can establish a useful starting point. The delay is often not analysis. It is waiting for internal records. Naming a data owner before work begins can remove more delay than adding people to the project team.

The first decision phase then normalises useful data, compares sites or processes where appropriate, screens out what is not material, and produces a recommended action with stated assumptions. The aim is not to assess everything immediately. It is to identify the first move.` },
      { type: 'subheading', content: 'Then turn the decision into a plan' },
      { type: 'body', content: `Specifications, bidder lists, real quotes, total-cost comparison, funding applications, internal approvals, and a schedule against operational windows all take time. Drafting can be faster with technology. Human review, contractor capacity, site conditions, and procurement calendars do not compress in the same way.

Controls and operational changes can often move sooner. Larger electrical or mechanical projects may be governed by lead times, permits, utility interconnection, or shutdown windows. The plan should make those dependencies visible before a promise is made.` },
      { type: 'subheading', content: 'Finally, verify the result' },
      { type: 'body', content: `Weather, production, and seasonality can make early results indicative rather than conclusive. A written starting point and measurement method agreed before implementation help finance distinguish early signals from a result that has been tested over a relevant operating period.

The most useful schedule starts where information or a credible opportunity already exists, sequences a practical early win beside longer capital work, and sets decision gates that ask whether the work has changed what happens next.` },
      { type: 'pullquote', content: 'A realistic program does not promise that every result arrives at once. It shows what is knowable now, what can move next, and what requires time to verify.', attribution: 'Rob Kirkby, Enduring Advantage' },
    ],
  },
];

#!/usr/bin/env python3
"""Append three new CFO-ICP-targeted articles to articlesData.ts."""

path = '/home/ubuntu/enduring-advantage/client/src/lib/articlesData.ts'

with open(path, 'r') as f:
    content = f.read()

# The three new articles as a raw string to insert before the closing "];
new_articles = r"""
  // ─────────────────────────────────────────────────────────────────────────
  // ARTICLE 9 — The Accountability Gap
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'the-accountability-gap-why-sustainability-strategies-gather-dust',
    category: 'Financial Performance',
    title: 'The Accountability Gap: Why Sustainability Strategies Gather Dust',
    subtitle: 'The difference between a plan that gets executed and one that sits on a shelf is almost always the same thing — an accountable owner on the other side of the deliverable.',
    author: 'Rob Kirkby',
    authorTitle: 'Founder & Principal Advisor, Enduring Advantage',
    date: 'June 2026',
    readTime: '7 min read',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    heroAlt: 'Executive reviewing sustainability strategy documents at a boardroom table',
    excerpt: 'Most organisations have a sustainability strategy. Very few have a sustainability result. The gap between the two is not a strategy problem — it is an accountability problem.',
    featured: false,
    tags: ['accountability', 'execution', 'sustainability strategy', 'CFO', 'board defensibility', 'results'],
    faq: [
      {
        question: 'Why do most sustainability strategies fail to get executed?',
        answer: 'The primary reason is the absence of an accountable owner who stays engaged beyond the strategy phase. Consultants deliver plans and leave. Internal teams lack the mandate, the SME bench, or the cross-functional authority to drive execution. Without a named person accountable for each deliverable, the plan becomes a document rather than a programme.'
      },
      {
        question: 'What is the accountability gap in sustainability advisory?',
        answer: 'The accountability gap is the structural disconnect between the firm that designs the sustainability strategy and the organisation that must execute it. Big-4 and strategy consultants are paid to diagnose and recommend — not to stay until the work is done. This is not a bug in their model; it is a feature. Enduring Advantage is designed around the opposite principle: we stay until it is done.'
      },
      {
        question: 'How can a CFO ensure sustainability investments actually deliver results?',
        answer: 'By requiring that any advisory engagement include a named accountable owner — a coach or programme manager — who remains engaged through execution, not just through the strategy deck. The deliverable should include a payback period per initiative, a named implementation partner, and a milestone schedule with clear accountability at each step.'
      },
      {
        question: 'What is the difference between a sustainability strategy and a sustainability result?',
        answer: 'A strategy is a prioritised list of initiatives with projected outcomes. A result is a verified, measured change in operational performance — energy consumption, waste output, water use, or carbon intensity — that flows to the income statement. The difference is execution, and execution requires accountability.'
      }
    ],
    sections: [
      {
        type: 'body',
        content: `There is a sentence that appears, in various forms, in almost every serious analysis of why sustainability programmes underperform. Innovation Vista put it most directly: "The difference between a strategy that gets executed and one that gathers dust is almost always the presence of an accountable leader on the other side of the deliverable."\n\nMost CFOs have experienced this. A credible firm arrives, conducts a thorough assessment, produces an immaculate strategy document, presents it to the board — and then leaves. Twelve months later, the document is still on the shelf. The initiatives it recommended have not been funded, staffed, or started. The targets the company announced publicly are quietly receding.\n\nThis is not a strategy problem. The strategy was probably sound. It is an accountability problem. And it is the most expensive problem in sustainability today.`
      },
      {
        type: 'subheading',
        content: 'Why the Standard Model Produces Shelf-Ware'
      },
      {
        type: 'body',
        content: `The Big-4 and strategy consulting model is built around diagnosis and recommendation. The partner who leads the engagement is paid to produce a high-quality plan. They are not paid — and their economics do not support — staying on site to manage the procurement of a heat-recovery system in a manufacturing facility in Mississauga or the renegotiation of a power purchase agreement for a distribution centre in the Netherlands.\n\nThis is not a criticism. It is a structural reality. The model that makes strategy consulting profitable is incompatible with the model that makes execution happen. The CFO who commissions a six-figure strategy engagement and expects execution to follow is misunderstanding what they bought.\n\nThe result is predictable: 47% of finance leaders express doubt that their organisation will actually hit the sustainability commitments it has already made publicly. That is not a confidence problem. It is a rational assessment of a system with no accountable owner at the execution stage.`
      },
      {
        type: 'stat-row',
        stats: [
          { value: '47%', label: 'of finance leaders doubt their organisation will hit its announced sustainability targets' },
          { value: '71%', label: 'of core sustainability reporting work is outsourced because internal teams cannot staff it' },
          { value: '6-fig', label: 'average cost of a strategy engagement that produces a plan but no execution' }
        ]
      },
      {
        type: 'subheading',
        content: 'The Three Conditions for Execution'
      },
      {
        type: 'body',
        content: `In our experience, sustainability initiatives get executed when three conditions are present simultaneously. Remove any one of them and the initiative stalls.\n\n**A named accountable owner.** Not a committee. Not a shared responsibility. A specific person — internal or external — who is accountable for the outcome and whose engagement does not end when the strategy document is delivered. This person must have the authority to convene the relevant functions, the subject-matter expertise to evaluate options, and the mandate to make decisions without re-escalating every choice to the CFO.\n\n**A payback number attached to each initiative.** Sustainability initiatives compete for capital against every other investment the organisation can make. Without a credible, source-graded payback period attached to each initiative, they will lose that competition every time. The CFO's own bar, documented in multiple surveys, is three years or less. Any initiative that cannot demonstrate a three-year payback in the current capital environment will not get funded — regardless of its environmental merit.\n\n**A vendor-neutral selection process.** The single fastest way to destroy execution momentum is to have the advisory firm that recommended an initiative also profit from its implementation. When the advisor has a financial relationship with the vendor they are recommending, the CFO's defensibility evaporates. The board will ask the question. The auditor will ask the question. The answer must be clean.`
      },
      {
        type: 'pullquote',
        content: 'The CFO who commissions a six-figure strategy engagement and expects execution to follow is misunderstanding what they bought. Strategy and execution are different products. Most firms only sell one of them.',
        attribution: 'Rob Kirkby, Founder, Enduring Advantage'
      },
      {
        type: 'subheading',
        content: 'What Board-Defensible Execution Looks Like'
      },
      {
        type: 'body',
        content: `A board-defensible sustainability programme has a specific structure. It begins with a verified baseline — not a self-reported estimate, but an auditable measurement of current operational performance across energy, water, waste, and material inputs. Without this, every projected saving is a guess, and the board will treat it as one.\n\nFrom the verified baseline, each candidate initiative is scored against four criteria: projected savings in dollars, projected GHG reduction, payback period, and financing eligibility. The initiatives are ranked. The highest-ranking initiative — the one with the greatest material impact relative to its cost and complexity — is selected first. It is executed. The results are measured against the baseline. Then the process repeats.\n\nThis is not a novel methodology. It is the application of standard capital allocation discipline to sustainability. The reason it is rare is not that it is difficult. It is that most advisory models are not designed to stay through execution. They are designed to leave after the ranking.\n\nEnduring Advantage is designed around the opposite principle. The coach and the subject-matter experts remain engaged through execution, through measurement, and through the next iteration. The accountability does not end when the deck is delivered. It ends when the result is on the income statement.`
      },
      {
        type: 'subheading',
        content: 'Frequently Asked Questions'
      },
      {
        type: 'body',
        content: `**Why do most sustainability strategies fail to get executed?**\nThe primary reason is the absence of an accountable owner who stays engaged beyond the strategy phase. Consultants deliver plans and leave. Internal teams lack the mandate, the SME bench, or the cross-functional authority to drive execution. Without a named person accountable for each deliverable, the plan becomes a document rather than a programme.\n\n**What is the accountability gap in sustainability advisory?**\nThe accountability gap is the structural disconnect between the firm that designs the sustainability strategy and the organisation that must execute it. Big-4 and strategy consultants are paid to diagnose and recommend — not to stay until the work is done. Enduring Advantage is designed around the opposite principle: we stay until it is done.\n\n**How can a CFO ensure sustainability investments actually deliver results?**\nBy requiring that any advisory engagement include a named accountable owner who remains engaged through execution, not just through the strategy deck. The deliverable should include a payback period per initiative, a named implementation partner, and a milestone schedule with clear accountability at each step.\n\n**What is the difference between a sustainability strategy and a sustainability result?**\nA strategy is a prioritised list of initiatives with projected outcomes. A result is a verified, measured change in operational performance that flows to the income statement. The difference is execution, and execution requires accountability.`
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTICLE 10 — The Data Defensibility Problem
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'the-data-defensibility-problem-why-96-percent-of-cfos-cant-stand-behind-their-sustainability-numbers',
    category: 'Financial Performance',
    title: 'The Data Defensibility Problem: Why 96% of CFOs Cannot Stand Behind Their Sustainability Numbers',
    subtitle: 'Before you can defend a sustainability target to the board, you need to be able to defend the data it is built on. Most organisations cannot. Here is what to do about it.',
    author: 'Campbell Ohrlis',
    authorTitle: 'Principal Advisor, Enduring Advantage',
    date: 'June 2026',
    readTime: '8 min read',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    heroAlt: 'CFO reviewing sustainability data and financial reports on dual screens',
    excerpt: 'Ninety-six percent of finance leaders report problems with the non-financial data they receive. Varying formats, inconsistencies, incomplete records, unclear definitions. Only 4% report none of these problems. This is not a reporting problem. It is a defensibility problem.',
    featured: false,
    tags: ['data quality', 'greenwashing', 'board defensibility', 'CFO', 'sustainability reporting', 'baseline'],
    faq: [
      {
        question: 'Why do most CFOs struggle to defend their sustainability data to the board?',
        answer: 'Because the data collection and quality-control processes for non-financial metrics are far less mature than those for financial metrics. Sustainability data is often collected by operational teams using inconsistent methodologies, stored in spreadsheets, and aggregated without audit trails. When the board or auditor asks a pointed question about a specific number, the CFO cannot trace it back to a verified source.'
      },
      {
        question: 'What is the difference between a sustainability estimate and a verified baseline?',
        answer: 'An estimate is a projection based on industry averages, engineering assumptions, or self-reported operational data. A verified baseline is an auditable measurement of actual operational performance — energy consumption by meter, water use by facility, waste output by stream — with a clear methodology, a named data source, and a documented quality-control process. Only a verified baseline is defensible to a board, an auditor, or a regulator.'
      },
      {
        question: 'How does poor sustainability data quality create greenwashing risk?',
        answer: 'When a company announces a sustainability target — a net-zero commitment, a 30% emissions reduction by 2030 — and that target is built on unverified data, the company is exposed to greenwashing risk even if its intentions are entirely genuine. If the baseline was overstated, the target will be missed. If the methodology was inconsistent, the progress will be unmeasurable. The 55% of CFOs who fear greenwashing risk are not worried about bad intentions — they are worried about bad data.'
      },
      {
        question: 'What should a CFO demand from a sustainability data process?',
        answer: 'A CFO should demand the same rigour from sustainability data that they demand from financial data: a named data source for every metric, a documented collection methodology, a quality-control process that flags inconsistencies, and an audit trail that can be traced back to the original measurement. Any sustainability programme that cannot meet this standard is not board-defensible.'
      }
    ],
    sections: [
      {
        type: 'body',
        content: `Ninety-six percent of finance leaders report problems with the non-financial data they receive. Varying formats, inconsistencies, incomplete records, unclear definitions. Only 4% report none of these problems.\n\nThis is not a reporting problem. It is a defensibility problem.\n\nThe CFO who stands in front of the board and announces a net-zero commitment by 2035 is making a public, attributable statement. If that commitment is built on data that 96% of their peers cannot stand behind, the exposure is not theoretical. It is the single most personally damaging outcome in the sustainability space: being the executive who announced a target the company quietly missed — and whose name is attached to it.`
      },
      {
        type: 'stat-row',
        stats: [
          { value: '96%', label: 'of finance leaders report problems with the non-financial data they receive (EY)' },
          { value: '55%', label: 'of CFOs fear their sustainability reporting lacks credibility and risks being perceived as greenwashing (EY)' },
          { value: '4%', label: 'of organisations report no problems with their sustainability data quality' }
        ]
      },
      {
        type: 'subheading',
        content: 'The Four Data Problems CFOs Actually Face'
      },
      {
        type: 'body',
        content: `EY's research identifies the specific failure modes with precision: varying data formats (39%), inconsistencies between sources (35%), incomplete records (34%), and unclear definitions (33%). These are not abstract data-governance concerns. They are the specific reasons a CFO cannot answer a pointed question from the audit committee without hedging.\n\n**Varying formats** mean that energy consumption data from a facility in Calgary arrives in gigajoules, from a facility in London in kilowatt-hours, and from a facility in Singapore in a spreadsheet with no units labelled. Aggregating these into a single portfolio number requires assumptions. Assumptions are not defensible.\n\n**Inconsistencies** mean that the same metric — say, Scope 2 electricity emissions — is calculated using market-based accounting in one region and location-based accounting in another. The number looks like a single figure. It is not.\n\n**Incomplete records** mean that a facility acquired two years ago has no historical baseline. The company's reported progress since the acquisition is measured against a starting point that does not exist.\n\n**Unclear definitions** mean that "waste diverted from landfill" includes composting in one facility and incineration-with-energy-recovery in another. Both are reported as the same metric. They are not the same thing.`
      },
      {
        type: 'pullquote',
        content: 'Once finance leaders drill into the data and see how much needs to be done, their conservative tendency kicks in, with a healthy skepticism about the organisation\'s ability to hit those commitments.',
        attribution: 'Matt Bell, EY'
      },
      {
        type: 'subheading',
        content: 'What a Verified Baseline Actually Requires'
      },
      {
        type: 'body',
        content: `A verified baseline is not a self-reported estimate. It is an auditable measurement of actual operational performance — energy consumption by meter, water use by facility, waste output by stream — with a clear methodology, a named data source, and a documented quality-control process.\n\nBuilding one requires four things that most organisations do not currently have in place:\n\n**Meter-level data collection.** Not utility bill aggregates. Not engineering estimates. Actual consumption data from the point of use, collected at a frequency that allows anomaly detection.\n\n**A single methodology applied consistently.** The same calculation approach, the same emission factors, the same boundary definitions, applied to every facility in the portfolio. Not best-practice-per-region. One approach.\n\n**A quality-control layer.** A process that flags data that falls outside expected ranges, identifies missing records, and requires resolution before the data is included in the baseline. The 96% problem is a quality-control problem.\n\n**An audit trail.** Every number in the baseline traceable back to a primary source — a meter reading, a utility invoice, a waste manifest — with a documented chain of custody. This is what the auditor will ask for. It is what the board should ask for.`
      },
      {
        type: 'subheading',
        content: 'The Payback on Getting the Data Right'
      },
      {
        type: 'body',
        content: `There is a direct financial return on data quality investment that most organisations miss entirely. When the baseline is verified and the data is clean, the organisation can identify with precision where the largest operational inefficiencies are. Not at the portfolio level — at the facility level, at the process level, at the equipment level.\n\nThis precision is what converts a sustainability programme from a cost centre into a profit driver. The IEA estimates that energy efficiency alone can deliver more than a third of all carbon reductions to 2030 — and that it is "most often cost-effective." The BCG and CO2 AI research documents that 82% of companies that pursued decarbonisation captured measurable economic benefit, with leaders netting an average of $221 million per company.\n\nThose results are not available to organisations operating on unverified data. You cannot optimise what you cannot measure. And you cannot defend what you cannot trace.\n\nThe CFO who invests in a verified baseline is not spending money on compliance infrastructure. They are building the foundation for every profitable sustainability initiative that follows — and the defensibility that makes every board conversation about sustainability a conversation about value creation, not exposure.`
      },
      {
        type: 'subheading',
        content: 'Frequently Asked Questions'
      },
      {
        type: 'body',
        content: `**Why do most CFOs struggle to defend their sustainability data to the board?**\nBecause the data collection and quality-control processes for non-financial metrics are far less mature than those for financial metrics. Sustainability data is often collected by operational teams using inconsistent methodologies, stored in spreadsheets, and aggregated without audit trails.\n\n**What is the difference between a sustainability estimate and a verified baseline?**\nAn estimate is a projection based on industry averages or self-reported data. A verified baseline is an auditable measurement of actual operational performance with a clear methodology, a named data source, and a documented quality-control process. Only a verified baseline is defensible to a board, an auditor, or a regulator.\n\n**How does poor sustainability data quality create greenwashing risk?**\nWhen a sustainability target is built on unverified data, the company is exposed to greenwashing risk even if its intentions are genuine. If the baseline was overstated, the target will be missed. If the methodology was inconsistent, the progress will be unmeasurable.\n\n**What should a CFO demand from a sustainability data process?**\nThe same rigour they demand from financial data: a named data source for every metric, a documented collection methodology, a quality-control process that flags inconsistencies, and an audit trail that can be traced back to the original measurement.`
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ARTICLE 11 — The Regulatory Patchwork
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'the-regulatory-patchwork-why-profit-first-sustainability-survives-any-rule-change',
    category: 'Policy & Regulation',
    title: 'The Regulatory Patchwork: Why Profit-First Sustainability Survives Any Rule Change',
    subtitle: 'The EU just narrowed CSRD. The SEC is rescinding its climate rule. California and 21 other jurisdictions are moving in the opposite direction. The CFO who built their sustainability programme around compliance deadlines is now exposed. The one who built it around profit is not.',
    author: 'Rob Kirkby',
    authorTitle: 'Founder & Principal Advisor, Enduring Advantage',
    date: 'June 2026',
    readTime: '9 min read',
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    heroAlt: 'Senior executive reviewing regulatory documents at a desk with city skyline',
    excerpt: 'The regulatory picture for sustainability is not converging. It is fragmenting. The CFO who built their programme around compliance deadlines is now navigating a patchwork of diverging regimes. The one who built it around profit is not — because profitable operational improvements are robust to regulatory whiplash.',
    featured: false,
    tags: ['regulation', 'CSRD', 'SEC', 'regulatory resilience', 'CFO', 'profit-first', 'compliance'],
    faq: [
      {
        question: 'What happened to the EU CSRD sustainability reporting requirements?',
        answer: 'The EU Omnibus I package, adopted in February 2026 and in force from March 2026, significantly narrowed the scope of CSRD. The threshold was raised to approximately 1,000+ employees AND €450M+ net turnover, listed SMEs were exempted, and a "Stop the Clock" transition relief was introduced. CSRD amendments apply from FY2027, with first reports due in 2028. Many companies that had been preparing for CSRD compliance are now outside its scope.'
      },
      {
        question: 'What is the current status of the SEC climate disclosure rule?',
        answer: 'The SEC formally proposed rescission of its climate-related disclosure rules in June 2026 (press release 2026-49). The SEC stopped defending the rule in March 2025, so it is effectively dead in practice, though technically still in a 60-day comment period with a final vote expected in late 2026. US companies that built their sustainability programmes around SEC compliance are now in a period of regulatory uncertainty.'
      },
      {
        question: 'If major regulations are being rolled back, why should a CFO invest in sustainability now?',
        answer: 'Because the profitable moves in sustainability — energy efficiency, waste reduction, resource optimisation — are not dependent on regulatory requirements. They deliver operational savings regardless of what the regulator does. A company that reduces its energy consumption by 30% saves money whether or not there is a disclosure requirement. The regulatory case for sustainability is fragile. The financial case is not.'
      },
      {
        question: 'What is regulatory resilience in the context of sustainability strategy?',
        answer: 'Regulatory resilience means building a sustainability programme around initiatives that deliver financial value independent of any specific regulatory requirement. Profit-first initiatives — those with a three-year-or-less payback in operational savings — are robust to regulatory whiplash because their business case does not depend on compliance. They survive rule changes, political shifts, and jurisdictional divergence because the savings are real regardless of the regulatory environment.'
      }
    ],
    sections: [
      {
        type: 'body',
        content: `In February 2026, the EU adopted the Omnibus I package, raising the CSRD threshold to approximately 1,000 employees and €450 million in net turnover, exempting listed SMEs, and introducing transition relief. In June 2026, the SEC formally proposed rescinding its climate-related disclosure rules entirely. The rule it stopped defending in March 2025 is now officially on its way out.\n\nAt the same time, California's SB 253 and SB 261 are advancing. The UK's Sustainability Reporting Standards become mandatory from January 2027. ISSB-aligned regimes are active or progressing in 21 jurisdictions covering more than 60% of global GDP.\n\nThe regulatory picture for sustainability is not converging. It is fragmenting. A multi-site company operating across North America and Europe now faces a patchwork of diverging requirements — some tightening, some retreating, all moving at different speeds.\n\nThe CFO who built their sustainability programme around compliance deadlines is now exposed. The one who built it around profit is not.`
      },
      {
        type: 'stat-row',
        stats: [
          { value: '21', label: 'jurisdictions with active or progressing ISSB-aligned sustainability reporting regimes' },
          { value: '60%+', label: 'of global GDP covered by jurisdictions advancing sustainability reporting requirements' },
          { value: '91%', label: 'of organisations integrating sustainability strategically expect increased revenue vs 74% of peers — a 17-point gap (BDO)' }
        ]
      },
      {
        type: 'subheading',
        content: 'The Compliance-First Trap'
      },
      {
        type: 'body',
        content: `The compliance-first approach to sustainability has a structural flaw that the current regulatory environment has made impossible to ignore: it frames every sustainability investment as a cost, and it ties the business case for that cost to a specific regulatory requirement.\n\nWhen the requirement changes — and it will change, as it has just changed dramatically in both the EU and the US — the business case evaporates. The CFO who approved a $2 million investment in CSRD compliance infrastructure in 2024 is now explaining to the board why that investment was necessary. The CFO who approved a $2 million investment in energy efficiency in 2024 is showing the board the $600,000 in annual savings it generated.\n\nThe compliance-first frame also creates a specific political vulnerability that 70% of sustainability experts now identify as significant: it associates the company's sustainability programme with regulatory obligation rather than business performance. In the current environment — where 87% of US companies are maintaining or increasing sustainability investment but doing it quietly, and only 25% of S&P 500 firms still use "ESG" in their report titles — the compliance-first frame is the wrong frame.`
      },
      {
        type: 'pullquote',
        content: 'The profitable moves in sustainability are robust to regulatory whiplash. A company that reduces its energy consumption by 30% saves money whether or not there is a disclosure requirement. The financial case does not depend on the regulatory case.',
        attribution: 'Rob Kirkby, Founder, Enduring Advantage'
      },
      {
        type: 'subheading',
        content: 'What Regulatory Resilience Actually Means'
      },
      {
        type: 'body',
        content: `Regulatory resilience is not about ignoring regulation. It is about building a sustainability programme whose business case does not depend on any specific regulatory requirement.\n\nThe test is simple: if the relevant regulation were rescinded tomorrow, would this initiative still deliver a positive return? If the answer is yes, the initiative is regulatory-resilient. If the answer is no — if the only reason to do it is to satisfy a reporting requirement — then it is regulatory-fragile.\n\nEnergy efficiency passes the test. Waste reduction passes the test. Supply chain optimisation passes the test. Water use reduction passes the test. These initiatives deliver operational savings that flow directly to the income statement, regardless of what the regulator does.\n\nCarbon offset purchases, in most cases, do not pass the test. Compliance reporting infrastructure, in most cases, does not pass the test. Sustainability communications programmes, in most cases, do not pass the test.\n\nThe CFO who wants to build a programme that survives the next regulatory shift — and there will be a next one — should start by asking which of their current sustainability investments would still make sense if every reporting requirement disappeared tomorrow.`
      },
      {
        type: 'subheading',
        content: 'The Incentive Window That Is Actually Closing'
      },
      {
        type: 'body',
        content: `There is one genuine urgency argument in the current environment that is not about compliance. The US One Big Beautiful Budget Act (OBBBA), signed in July 2025, phases out the IRA's clean-electricity credits. Construction must begin by July 4, 2026 or be in service by December 31, 2027 to qualify.\n\nFor multi-site companies with energy-intensive operations, this is a real and closing window. The economics of certain renewable energy and efficiency investments are materially better before the credit phases out than after. This is not a compliance argument. It is a capital allocation argument: the same investment delivers a better return if made now than if made in 2028.\n\nThis is the kind of regulatory context that belongs in a sustainability programme — not as a compliance driver, but as a capital allocation input. The question is not "what do we have to do before the deadline?" It is "what is the most profitable thing we can do before this incentive closes, and how do we fund it?"\n\nThe answer to that question is different for every company, at every location. It requires a verified baseline, a systematic evaluation of options, and a vendor-neutral selection process. It is not available from a compliance consultant. It is available from an advisor who sits on the buyer's side of the table and whose only interest is in the quality of the outcome.`
      },
      {
        type: 'subheading',
        content: 'Frequently Asked Questions'
      },
      {
        type: 'body',
        content: `**What happened to the EU CSRD sustainability reporting requirements?**\nThe EU Omnibus I package, adopted in February 2026, significantly narrowed the scope of CSRD. The threshold was raised to approximately 1,000+ employees AND €450M+ net turnover, listed SMEs were exempted, and transition relief was introduced. CSRD amendments apply from FY2027, with first reports due in 2028.\n\n**What is the current status of the SEC climate disclosure rule?**\nThe SEC formally proposed rescission of its climate-related disclosure rules in June 2026. The SEC stopped defending the rule in March 2025, so it is effectively dead in practice, though technically still in a 60-day comment period with a final vote expected in late 2026.\n\n**If major regulations are being rolled back, why should a CFO invest in sustainability now?**\nBecause the profitable moves in sustainability — energy efficiency, waste reduction, resource optimisation — deliver operational savings regardless of what the regulator does. The financial case for these initiatives does not depend on the regulatory case. They are robust to regulatory whiplash.\n\n**What is regulatory resilience in the context of sustainability strategy?**\nRegulatory resilience means building a sustainability programme around initiatives that deliver financial value independent of any specific regulatory requirement. Profit-first initiatives — those with a three-year-or-less payback in operational savings — survive rule changes, political shifts, and jurisdictional divergence because the savings are real regardless of the regulatory environment.`
      }
    ]
  },
"""

# Insert before the closing "];
closing = '];

export function getArticleBySlug'
if closing in content:
    content = content.replace(closing, new_articles + closing, 1)
    print("OK: inserted 3 new articles")
else:
    print("MISS: could not find closing bracket")

with open(path, 'w') as f:
    f.write(content)
print("Done.")

"""
Apply the provided landing page copy to Home.tsx
Sections: Hero, Stats band, Problem/Villain, How it works, Proof, Why us, Risk reverser, Objections, Final CTA
"""
import re

path = '/home/ubuntu/enduring-advantage/client/src/pages/Home.tsx'
with open(path, 'r') as f:
    content = f.read()

# ── 1. HERO: eyebrow badge ────────────────────────────────────────────────────
content = content.replace(
    "The Opportunity Problem",
    "For the CFO who got handed sustainability and a number to defend",
)

# ── 2. HERO: headline ─────────────────────────────────────────────────────────
content = content.replace(
    "7,500+ solutions.\n                <br />\n                <em style={{ color: '#86efac', fontStyle: 'italic' }}>Too much complexity.</em>\n                <br />\n                One right next action.",
    "Every vendor told you what to measure.\n                <br />\n                <em style={{ color: '#86efac', fontStyle: 'italic' }}>We tell you what to DO —</em>\n                <br />\n                and we stay until it's done.",
)

# ── 3. HERO: subhead ──────────────────────────────────────────────────────────
content = content.replace(
    "This is a tremendous time to be a buyer of sustainability solutions — billions in capital, brilliant people, and more options than any organisation can evaluate. The problem is not scarcity. It is complexity: too many options, too little clarity, and no way to know which one moves the needle most. We cover the whole market, find the single highest-impact action, and stay until it is done.",
    "We sit on your side of the table, run your own data across every site, and hand you the prioritised, costed plan: which moves, which vendors, how to fund them, and the return on each. No equipment sales. No referral fees. No hourly billing.",
)

# ── 4. HERO: primary CTA label ────────────────────────────────────────────────
content = content.replace(
    "Get a Board-Defensible Plan",
    "Get your highest-payback move",
)

# ── 5. HERO: CTA micro-copy ───────────────────────────────────────────────────
content = content.replace(
    "30 minutes. No pitch. We identify your highest-value next action — and tell you exactly what to do about it.",
    "30 minutes. No pitch. We identify your highest-payback move — and tell you exactly what to do about it.",
)

# ── 6. STATS BAND: update the stats array data ───────────────────────────────
# Update stats in data.ts via separate edit — handled below

# ── 7. CLIMATE IMPACTS section header ─────────────────────────────────────────
content = content.replace(
    "The Opportunity",
    "The Problem",
    1,  # only first occurrence (the section eyebrow)
)
content = content.replace(
    "This Isn't a Problem Area.\n                <br />\n                <em style={{ color: 'var(--color-sage-light)' }}>It's an Opportunity.</em>",
    "You're Accountable for a Number\n                <br />\n                <em style={{ color: 'var(--color-sage-light)' }}>You Can't Yet Defend.</em>",
)
content = content.replace(
    "You can have a material impact on the corporate bottom line and market cap with a systematic approach to taking advantage of the opportunities available. The barrier isn't ambition — it's knowing what to do next.",
    "It landed on your desk because there was no one else senior enough and trusted enough with the numbers. Now the board, the auditor and the CEO all want answers — and your inbox is full of vendors and consultant decks, none of which net out to \"here is your prioritised plan and the payback.\" You need a decision, not more data.",
)

# ── 8. CLIMATE IMPACTS cards — rewrite to villain comparison ──────────────────
# Card 1: Big-4 consultants
content = content.replace(
    "title: 'Every Vendor Told You What to Measure. Not One Told You What to DO.',\n    description:\n      'There has never been more capital, more innovation, or more smart people working on sustainability solutions. The market is not scarce — it is overflowing. The problem is that customers lack the knowledge, data, and tools to take maximum advantage of their buying power. The complexity is not conducive to good decision-making.',\n    stat: '7,500+',\n    statLabel: 'solutions available — and almost no way to know which one moves your needle',",
    "title: 'Big-4 / Strategy Consultants',\n    description:\n      'Credible deck, six-figure bill — then they leave. The execution is orphaned and the plan gathers dust. The accountability gap is not a bug in that model — it is a feature.',\n    stat: '47%',\n    statLabel: 'of CFOs doubt their sustainability strategy will actually get executed — Deloitte',",
)

# Card 2: Point-tool vendors
content = content.replace(
    "title: 'Accountable for a Number You Cannot Yet Defend.',\n    description:\n      '55% of CFOs fear their sustainability reporting will be perceived as greenwashing — and 96% report problems with the non-financial data they receive. The accountability gap is not a data, tools, and decision problem. We make you defensible, in the only language the board speaks.',\n    stat: '96%',\n    statLabel: 'of finance leaders report problems with the sustainability data they receive — EY',",
    "title: 'Point-Tool Vendors',\n    description:\n      'Each solves one bucket and adds to the sprawl. No whole-portfolio view, no idea whose side they are on. You end up with more dashboards and the same unanswered question: what do I actually do next?',\n    stat: '7,500+',\n    statLabel: 'solutions in the market — each one selling you its own slice of the problem',",
)

# Card 3: ESG software
content = content.replace(
    "title: 'The Advisor Who Diagnoses and Leaves.',\n    description:\n      'The Big-4 model is designed to close the engagement cleanly and move on. The accountability gap is not a bug in that model — it is a feature. The result: a six-figure deck that gathers dust, and a CFO left holding a strategy that was never executed. We put a coach and the experts on it until it is done.',\n    stat: '47%',\n    statLabel: 'of CFOs doubt their sustainability strategy will actually get executed — Deloitte',",
    "title: 'ESG Software & Platforms',\n    description:\n      'Organises your data — but never tells you what to do with it. You are still the one who has to decide. The hidden villain: your own income statement books the cost of these tools but hides the value they were supposed to unlock.',\n    stat: '96%',\n    statLabel: 'of finance leaders report problems with the sustainability data they receive — EY',",
)

# Card 4: Internal hire
content = content.replace(
    "title: 'Done Right, It Is the Most Profitable Thing You Will Do This Year.',\n    description:\n      '82% of companies that act on decarbonisation capture economic benefit. Leaders net ~$221M per company. 91% of organisations integrating sustainability strategically expect increased revenue versus 74% of peers — a 17-point gap. Yet only 21% actually integrate it strategically. That 79% is the entire addressable market.',\n    stat: '3 yrs',\n    statLabel: 'or less payback — the CFO\\'s own bar for \\'very compelling\\' — Trane Technologies',",
    "title: 'An Internal Hire or Team',\n    description:\n      'No bench, no portfolio logic, and most of the work gets outsourced anyway. The hidden villain: your own income statement books the cost of these investments but hides the value — the loss you avoided. That is why \"trust us\" fails.',\n    stat: '3 yrs',\n    statLabel: 'or less — the payback bar CFOs call \"very compelling\" — Trane Technologies',",
)

# ── 9. INVESTMENT CASE section header ─────────────────────────────────────────
content = content.replace(
    "The Investment Case",
    "How It Works",
    1,
)
content = content.replace(
    "The Systematic Approach\n                  <br />\n                  <em style={{ color: 'var(--color-sage)' }}>to Maximum Advantage.</em>",
    "A Decision and a Costed Plan.\n                  <br />\n                  <em style={{ color: 'var(--color-sage)' }}>Per Location. Per Site.</em>",
)
content = content.replace(
    "Misperception, complexity, lack of data, and lack of tools prevent most organisations from taking full advantage of what is available. Enduring Advantage has the data, the tools, the discipline, the software, the coaches, and the subject matter experts to cut through the complexity — and identify what to do next, then ensure it gets done.",
    "We run your data, per location. We hand you the decision — a prioritised, costed plan with the moves, the vendors, the funding, and the payback on each. Then we stay until it is done.",
)

# ── 10. INVESTMENT CASE commitment box ────────────────────────────────────────
content = content.replace(
    "We cover the whole sustainability market — all areas, all solution types, all financing instruments. We look for the one action with the biggest material positive impact, execute it, and repeat. No other model gives the same results.",
    "You don't commit to a programme on day one. Start with a fixed-fee diagnostic: we run your data and hand you the highest-payback move per site, with the number attached. If there is no material opportunity, you walk — and you have risked a fixed, modest fee, not a quarter's budget.",
)

# ── 11. INVESTMENT CASE step titles + descriptions ────────────────────────────
content = content.replace(
    "title: 'Map the Entire Playing Field',\n    description:\n      'With 7,500+ sustainability solutions available, the first problem is knowing what exists. Enduring Advantage covers the whole market — every category, every solution type, every financing instrument. We play on the biggest field so you don\\'t have to.',",
    "title: 'We run your data, per location',\n    description:\n      'Your sites are different — London \u2260 Washington \u2260 Toronto. We ingest and quality-control your operational data across every site, producing a verified baseline that is the foundation of every credible recommendation.',",
)
content = content.replace(
    "title: 'Build the Numbers You Can Stand Behind',\n    description:\n      '96% of finance leaders report problems with sustainability data — formats, inconsistencies, gaps, unclear definitions. We ingest and quality-control your operational data to produce a verified, auditable baseline. Not because the regulator says so. Because you cannot defend a number you cannot prove, and a CFO who cannot stand behind the data is exposed.',",
    "title: 'We hand you the decision',\n    description:\n      'A prioritised, costed plan: the moves, the vendors to use, the funding, and the payback on each. Answers, not a dashboard. Not a framework. A decision you can take to the board.',",
)
content = content.replace(
    "title: 'ACTIO: Find the Highest-Impact Action First',\n    description:\n      'The average enterprise has 400–1,000 candidate sustainability initiatives. ACTIO scores every one across projected savings, GHG reduction, payback period, and financing eligibility — then surfaces the single initiative with the greatest material impact. We do the right things in the right order, every time.',",
    "title: 'We stay until it\u2019s done',\n    description:\n      'A named coach and an SME bench own execution and verify the savings — then re-optimise as new data arrives. The accountability gap is not a bug in the old model — it is a feature. Execution is our deliverable, not the deck.',",
)
content = content.replace(
    "title: 'On Your Side of the Table — Not Selling You a Box',\n    description:\n      'Every vendor in your inbox is paid to sell you their own solution. We sit on your side. No equipment sales. No referral fees. No hourly billing. We tell you which vendors to use because we are paid to solve your P&L, not to close a deal. That is the only model that produces an unbiased answer.',",
    "title: 'Vendor-neutral — by structure, not policy',\n    description:\n      'We sell nothing but the decision. No equipment, no referral fees, no hourly billing. We tell you which vendors to use because we are paid to solve your P&L, not to close a deal. Competitors would need to fundamentally restructure their businesses to offer the same.',",
)
content = content.replace(
    "title: 'Unlock the Capital the Market Has Ready',\n    description:\n      'Verified baselines and ACTIO-ranked initiatives unlock green bonds, sustainability-linked loans, and PACE financing that are unavailable to companies without credible data. The capital is there. The barrier is the data infrastructure to access it.',",
    "title: 'You keep the savings',\n    description:\n      'Verified baselines and ACTIO-ranked initiatives unlock green bonds, sustainability-linked loans, and PACE financing. The capital is there. The barrier is the data infrastructure to access it — and that is exactly what we build.',",
)
content = content.replace(
    "title: 'Repeat. Continuously Improve. Compound the Advantage.',\n    description:\n      'After each initiative is delivered, we run the process again. The systematic approach to identifying and executing the highest-value next action — continuously, in the right order — is what produces the best possible results. No other model would give the same outcomes.',",
    "title: 'Start small. Prove it. Scale.',\n    description:\n      'You do not commit to a programme on day one. Start with a fixed-fee diagnostic with a clear milestone exit. If there is no material opportunity, you walk. If there is — and there always is — we have a number to work from.',",
)

# ── 12. CONTACT CTA section ───────────────────────────────────────────────────
content = content.replace(
    "You Have the Mandate.\n                <br />\n                <em style={{ color: 'var(--color-sage)' }}>We Give You the Plan.</em>",
    "Get Your Highest-Payback Move.\n                <br />\n                <em style={{ color: 'var(--color-sage)' }}>We Stay Until It's Done.</em>",
)
content = content.replace(
    "You are accountable for a sustainability outcome you did not choose, on a timeline you did not set, with data you cannot fully defend. We sit on your side of the table, look at your data across every location, and hand you the prioritised plan — which moves, which vendors, how to fund it, and the payback on each. Not because the regulator says so. Because, done right, it is the most profitable thing you will do this year.",
    "Book the diagnostic conversation. We run your data, identify your highest-payback move per site, and hand you the costed plan — which moves, which vendors, how to fund them, and the return on each. Fixed fee. Clear milestone exit. No commitment beyond the first conversation.",
)

with open(path, 'w') as f:
    f.write(content)
print("Done — all landing page copy applied.")

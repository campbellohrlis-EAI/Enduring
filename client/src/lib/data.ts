// =============================================================================
// ENDURING ADVANTAGE, Content Data
// Sustainability topics, curated articles, and impact statistics
// =============================================================================

export interface Topic {
  id: string;
  label: string;
  category: 'climate' | 'business' | 'finance' | 'policy' | 'nature';
  size: 'sm' | 'md' | 'lg';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  url: string;
  source: string;
  readTime: string;
  featured?: boolean;
  imageUrl?: string;
  tags?: string[]; // matrix cell labels and synonyms this article covers
}

export interface Stat {
  value: string;
  label: string;
  description: string;
}

// =============================================================================
// REVOLVING TOPIC CLOUD
// Original 30 topics + all 36 Sustainability Playing Field matrix items
// =============================================================================
export const topics: Topic[] = [
  // ── Original research topics ──────────────────────────────────────────────
  { id: 't1',  label: 'Net Zero Strategy',        category: 'climate',  size: 'lg' },
  { id: 't2',  label: 'Carbon Pricing',            category: 'finance',  size: 'md' },
  { id: 't3',  label: 'ESG Reporting',             category: 'business', size: 'lg' },
  { id: 't4',  label: 'Supply Chain Risk',         category: 'business', size: 'md' },
  { id: 't5',  label: 'Renewable Energy',          category: 'climate',  size: 'lg' },
  { id: 't6',  label: 'Biodiversity Loss',         category: 'nature',   size: 'md' },
  { id: 't7',  label: 'Green Finance',             category: 'finance',  size: 'md' },
  { id: 't8',  label: 'Water Scarcity',            category: 'nature',   size: 'sm' },
  { id: 't9',  label: 'Circular Economy',          category: 'business', size: 'md' },
  { id: 't10', label: 'Climate Disclosure',        category: 'policy',   size: 'md' },
  { id: 't11', label: 'Just Transition',           category: 'policy',   size: 'sm' },
  { id: 't12', label: 'Nature-Based Solutions',    category: 'nature',   size: 'md' },
  { id: 't13', label: 'Scope 3 Emissions',         category: 'climate',  size: 'sm' },
  { id: 't14', label: 'Green Bonds',               category: 'finance',  size: 'sm' },
  { id: 't15', label: 'TCFD Framework',            category: 'policy',   size: 'sm' },
  { id: 't16', label: 'decarbonization',           category: 'climate',  size: 'lg' },
  { id: 't17', label: 'Climate Risk',              category: 'business', size: 'lg' },
  { id: 't18', label: 'Carbon Markets',            category: 'finance',  size: 'md' },
  { id: 't19', label: 'Energy Transition',         category: 'climate',  size: 'md' },
  { id: 't20', label: 'Sustainable Investment',    category: 'finance',  size: 'lg' },
  { id: 't21', label: 'Corporate Governance',      category: 'business', size: 'sm' },
  { id: 't22', label: 'Paris Agreement',           category: 'policy',   size: 'md' },
  { id: 't23', label: 'Climate Adaptation',        category: 'climate',  size: 'sm' },
  { id: 't24', label: 'Soil Carbon',               category: 'nature',   size: 'sm' },
  { id: 't25', label: 'Stranded Assets',           category: 'finance',  size: 'sm' },
  { id: 't26', label: 'Science-Based Targets',     category: 'policy',   size: 'md' },
  { id: 't27', label: 'Extreme Weather',           category: 'climate',  size: 'md' },
  { id: 't28', label: 'Ocean Acidification',       category: 'nature',   size: 'sm' },
  { id: 't29', label: 'Food Security',             category: 'nature',   size: 'sm' },
  { id: 't30', label: 'Green Infrastructure',      category: 'business', size: 'sm' },

  // ── Operational Efficiency (matrix column 1) ──────────────────────────────
  { id: 'm1',  label: 'Cleaning',                  category: 'business', size: 'sm' },
  { id: 'm2',  label: 'Energy Efficiency',         category: 'climate',  size: 'md' },
  { id: 'm3',  label: 'Insurance',                 category: 'business', size: 'sm' },
  { id: 'm4',  label: 'Maintenance',               category: 'business', size: 'sm' },
  { id: 'm5',  label: 'Waste Reduction',           category: 'nature',   size: 'sm' },
  { id: 'm6',  label: 'Water Management',          category: 'nature',   size: 'md' },

  // ── Occupant Experience (matrix column 2) ─────────────────────────────────
  { id: 'm7',  label: 'Comfort',                   category: 'business', size: 'sm' },
  { id: 'm8',  label: 'Workplace Health',          category: 'business', size: 'md' },
  { id: 'm9',  label: 'Noise Pollution',           category: 'nature',   size: 'sm' },
  { id: 'm10', label: 'Productivity',              category: 'business', size: 'md' },
  { id: 'm11', label: 'Safety',                    category: 'business', size: 'sm' },
  { id: 'm12', label: 'Well-being',                category: 'business', size: 'md' },

  // ── De-Carbonization (matrix column 3) ───────────────────────────────────
  { id: 'm13', label: 'Carbon Credits',            category: 'finance',  size: 'md' },
  { id: 'm14', label: 'Electrification',           category: 'climate',  size: 'md' },
  { id: 'm15', label: 'Fuel Switching',            category: 'climate',  size: 'sm' },
  { id: 'm16', label: 'Green Energy Certificates', category: 'finance',  size: 'sm' },
  { id: 'm17', label: 'Sustainable Purchasing',    category: 'business', size: 'sm' },

  // ── Environment (matrix column 4) ────────────────────────────────────────
  { id: 'm18', label: 'Clean Air',                 category: 'nature',   size: 'sm' },
  { id: 'm19', label: 'Clean Water',               category: 'nature',   size: 'sm' },
  { id: 'm20', label: 'Pollution Abatement',       category: 'nature',   size: 'sm' },
  { id: 'm21', label: 'Waste Management',          category: 'nature',   size: 'sm' },

  // ── Brand Enhancement (matrix column 5) ──────────────────────────────────
  { id: 'm22', label: 'DEI',                       category: 'policy',   size: 'sm' },
  { id: 'm23', label: 'Certifications',            category: 'business', size: 'sm' },
  { id: 'm24', label: 'Nature Positive',           category: 'nature',   size: 'md' },
  { id: 'm25', label: 'Onsite Green Energy',       category: 'climate',  size: 'sm' },
  { id: 'm26', label: 'Sustainability Reporting',  category: 'policy',   size: 'md' },

  // ── Risk Management (matrix column 6) ────────────────────────────────────
  { id: 'm27', label: 'Commodity Hedging',         category: 'finance',  size: 'sm' },
  { id: 'm28', label: 'Digital Risk',              category: 'business', size: 'sm' },
  { id: 'm29', label: 'Natural Disasters',         category: 'climate',  size: 'sm' },
  { id: 'm30', label: 'Pandemics',                 category: 'policy',   size: 'sm' },
  { id: 'm31', label: 'Supply Chain',              category: 'business', size: 'md' },
];

export const categoryColors: Record<string, string> = {
  climate:  'bg-emerald-100 text-emerald-800',
  business: 'bg-blue-100 text-blue-800',
  finance:  'bg-amber-100 text-amber-800',
  policy:   'bg-slate-100 text-slate-700',
  nature:   'bg-lime-100 text-lime-800',
};

export const categoryBgColors: Record<string, string> = {
  climate:  '#d1fae5',
  business: '#dbeafe',
  finance:  '#fef3c7',
  policy:   '#f1f5f9',
  nature:   '#ecfccb',
};

export const categoryTextColors: Record<string, string> = {
  climate:  '#065f46',
  business: '#1e40af',
  finance:  '#92400e',
  policy:   '#334155',
  nature:   '#3f6212',
};

// =============================================================================
// CURATED ARTICLES
// Original 12 + 24 new articles sourced across the 6 matrix categories
// =============================================================================
export const articles: Article[] = [
  // ── Original featured articles ────────────────────────────────────────────
  {
    id: 'a1',
    title: '70% of Global Executives Say Climate Change Will Affect Their Business This Decade',
    excerpt: 'A landmark S&P Global survey reveals that the majority of top executives at large companies worldwide now expect climate change to materially reshape their business strategy within three years, signalling a decisive shift in corporate risk perception.',
    category: 'Business Risk',
    categoryColor: 'business',
    url: 'https://www.spglobal.com/market-intelligence/en/news-insights/articles/2024/9/70-of-global-execs-say-climate-change-will-affect-their-business-this-decade-83271345',
    source: 'S&P Global',
    readTime: '6 min read',
    featured: true,
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/business-sustainability-FXHrVYkzXHCPDSVDwDNkZN.webp',
    tags: ['Climate Risk', 'Corporate Governance', 'ESG Reporting', 'Business Strategy', 'Supply Chain'],
  },
  {
    id: 'a2',
    title: 'How Sustainability Continues to Benefit Businesses in 2025',
    excerpt: 'Companies report that sustainability initiatives have improved their bottom line through lower operational costs, more efficient resource use, and entirely new revenue streams, demonstrating that environmental responsibility and profitability are not in conflict.',
    category: 'Business Case',
    categoryColor: 'business',
    url: 'https://www.stantonchase.com/insights/blog/profit-despite-politics-how-sustainability-continues-to-benefit-businesses-in-2025',
    source: 'Stanton Chase',
    readTime: '7 min read',
    featured: true,
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/sustainability-investment-UvZf43FWhsaZigEs6hnKH3.webp',
    tags: ['Sustainability Reporting', 'Energy Efficiency', 'Operational Efficiency', 'Circular Economy', 'Brand Enhancement'],
  },
  {
    id: 'a3',
    title: 'Building the Business Case for Sustainability',
    excerpt: 'KPMG\'s comprehensive guide connects specific sustainability opportunities across climate, nature, and social priorities with tangible financial business outcomes, providing CFOs with the framework they need to justify and accelerate investment.',
    category: 'Finance',
    categoryColor: 'finance',
    url: 'https://kpmg.com/kpmg-us/content/dam/kpmg/pdf/2025/building-the-business-case-for-sustainability-main-report.pdf',
    source: 'KPMG',
    readTime: '12 min read',
    featured: true,
    imageUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/climate-impact-kRX23eDxmyeYhRciVW9dKY.webp',
    tags: ['Sustainability Reporting', 'Climate Risk', 'Green Finance', 'Biodiversity Loss', 'Supply Chain', 'Energy Efficiency'],
  },
  {
    id: 'a4',
    title: 'Water Scarcity: The Next Major Business Risk You Cannot Ignore',
    excerpt: 'Zurich Insurance warns that failure to address water risk leads to higher borrowing costs, reduced investor confidence, and greater vulnerability to operational disruptions, with water scarcity now ranked among the greatest threats to business continuity.',
    category: 'Climate Risk',
    categoryColor: 'climate',
    url: 'https://www.zurich.com/insights/business/water-scarcity-the-next-major-business-risk',
    source: 'Zurich Insurance',
    readTime: '5 min read',
    tags: ['Water', 'Clean Water', 'Water Management', 'Climate Risk', 'Natural Disasters', 'Extreme Weather'],
  },
  {
    id: 'a5',
    title: 'Climate Change and Corporate Governance: Navigating 2025 and Beyond',
    excerpt: 'The effects of climate change are becoming increasingly visible not only in the natural environment but also in boardrooms worldwide. NACD examines how governance frameworks must evolve to address physical and transition risks at the highest levels of corporate leadership.',
    category: 'Governance',
    categoryColor: 'policy',
    url: 'https://prod.nacdonline.org/all-governance/governance-resources/governance-research/outlook-and-challenges/2025-governance-outlook/climate-change-and-corporate-governance-navigating-2025-and-beyond/',
    source: 'NACD',
    readTime: '8 min read',
    tags: ['Corporate Governance', 'Climate Risk', 'Sustainability Reporting', 'Risk Management', 'Extreme Weather'],
  },
  {
    id: 'a6',
    title: 'Pathways to Net Zero: Circular Economy Strategies for Climate Action',
    excerpt: 'The Environmental Defense Fund outlines how circular economy principles, keeping resources in use, eliminating waste, and regenerating natural systems, represent one of the most powerful and underutilized levers for corporate decarbonization.',
    category: 'Net Zero',
    categoryColor: 'climate',
    url: 'https://business.edf.org/insights/pathways-to-net-zero-circular-economy-strategies-for-climate-action/',
    source: 'Environmental Defense Fund',
    readTime: '9 min read',
    tags: ['Circular Economy', 'Net Zero Strategy', 'decarbonization', 'Waste Management', 'Waste', 'Pollution Abatement'],
  },
  {
    id: 'a7',
    title: 'Why Green Bonds Still Matter for Corporate Finance',
    excerpt: 'Green bonds remain the label of choice in the sustainable debt market, representing close to 40% of all sustainable finance issuances. Morgan Stanley examines why they continue to attract institutional capital and how companies can leverage them strategically.',
    category: 'Green Finance',
    categoryColor: 'finance',
    url: 'https://www.morganstanley.com/im/en-us/individual-investor/insights/articles/why-green-bonds-still-matter.html',
    source: 'Morgan Stanley',
    readTime: '6 min read',
    tags: ['Green Finance', 'Green Bonds', 'Sustainable Investment', 'Carbon Credits', 'Green Energy Certificates'],
  },
  {
    id: 'a8',
    title: 'Integrating Biodiversity into ESG Reporting: A Strategic Imperative',
    excerpt: 'As governments increasingly mandate nature-related risk disclosure, companies that proactively integrate biodiversity into their ESG frameworks gain a first-mover advantage, reducing regulatory exposure and attracting sustainability-focused investors.',
    category: 'Biodiversity',
    categoryColor: 'nature',
    url: 'https://iamericas.org/integrating-biodiversity-into-esg-reporting-a-strategic-imperative-for-sustainable-business/',
    source: 'Inter-American Dialogue',
    readTime: '7 min read',
    tags: ['Biodiversity Loss', 'ESG Reporting', 'Sustainability Reporting', 'Nature Positive Activities', 'Environment'],
  },
  {
    id: 'a9',
    title: 'Companies Will Still Face Pressure to Manage Climate Risk',
    excerpt: 'Over 60% of CFOs surveyed acknowledge that returning to past polluting practices is not in their company\'s best interest. The business case for sustainability has become structural, driven by supply chain exposure, investor expectations, and regulatory momentum.',
    category: 'Business Strategy',
    categoryColor: 'business',
    url: 'https://www.theinvadingsea.com/2025/05/04/corporate-sustainability-trump-climate-change-supply-chains-emissions-renewable-energy/',
    source: 'The Invading Sea',
    readTime: '5 min read',
    tags: ['Climate Risk', 'Supply Chain', 'ESG Reporting', 'Corporate Governance', 'Sustainability Reporting'],
  },
  {
    id: 'a10',
    title: 'Making the Business Case for Sustainability: 8 Ways It Pays Off',
    excerpt: 'Harvard Business School Online outlines eight concrete financial pathways through which sustainability investments generate measurable returns, from cost reduction and talent retention to brand equity and access to capital.',
    category: 'Business Case',
    categoryColor: 'business',
    url: 'https://online.hbs.edu/blog/post/business-case-for-sustainability',
    source: 'Harvard Business School',
    readTime: '8 min read',
    tags: ['Business Strategy', 'Energy Efficiency', 'Operational Efficiency', 'Sustainability Reporting', 'Brand Enhancement', 'Green Finance'],
  },
  {
    id: 'a11',
    title: 'Water: Essential for Life, Critical for Business, Why Companies Must Act Now',
    excerpt: 'The UN Global Compact documents how water scarcity, pollution, and climate-related water shocks are already disrupting supply chains, increasing operational costs, and threatening brand reputation, making corporate water stewardship a financial imperative.',
    category: 'Water Risk',
    categoryColor: 'nature',
    url: 'https://unglobalcompact.org/compactjournal/water-essential-life-critical-business-why-companies-must-act-now',
    source: 'UN Global Compact',
    readTime: '6 min read',
    tags: ['Water', 'Clean Water', 'Water Management', 'Pollution Abatement', 'Supply Chain', 'Climate Risk'],
  },
  {
    id: 'a12',
    title: 'Beyond the Business Case Debate: Reasserting Strategic Value of Sustainability',
    excerpt: 'BSR explores how forward-thinking leaders are moving past the tired debate about whether sustainability pays, and instead aligning it with a coherent vision of long-term business and societal success, making it central to competitive strategy.',
    category: 'Strategy',
    categoryColor: 'business',
    url: 'https://www.bsr.org/en/blog/beyond-the-business-case-debate-reasserting-strategic-value-sustainability',
    source: 'BSR',
    readTime: '7 min read',
    tags: ['Business Strategy', 'Sustainability Reporting', 'Corporate Governance', 'Brand Enhancement'],
  },

  // ── Operational Efficiency ────────────────────────────────────────────────
  {
    id: 'b1',
    title: 'Building a Sustainable Business Operations Model: How to Cut Waste and Increase Profitability',
    excerpt: 'This article explores how businesses can adopt sustainable practices to reduce waste, optimize resources, and enhance profitability for long-term success, covering lean manufacturing, recycling, and technology integration.',
    category: 'Operational Efficiency',
    categoryColor: 'business',
    url: 'https://eskuad.com/blog/building-a-sustainable-business-operations-model-how-to-cut-waste-and-increase-profitability',
    source: 'Eskuad',
    readTime: '12 min read',
    tags: ['Operational Efficiency', 'waste', 'waste management', 'waste reduction', 'recycling', 'energy efficiency', 'energy management', 'maintenance', 'circular economy', 'circular'],
  },
  {
    id: 'b2',
    title: 'Top Strategies for Sustainable Maintenance',
    excerpt: 'Key strategies for sustainable maintenance, including circular economy principles, predictive maintenance, and service optimization, to reduce environmental impact and improve operational efficiency.',
    category: 'Maintenance',
    categoryColor: 'business',
    url: 'https://www.manwinwin.com/maintenance-and-sustainability/',
    source: 'ManWinWin Software',
    readTime: '8 min read',
    tags: ['maintenance', 'predictive maintenance', 'asset management', 'Operational Efficiency', 'circular economy', 'circular', 'energy efficiency', 'waste'],
  },
  {
    id: 'b3',
    title: 'Building a More Sustainable Operation with Predictive Maintenance',
    excerpt: 'How predictive maintenance can significantly boost sustainability and efficiency in manufacturing by lowering carbon emissions, minimising environmental risks, reducing waste, and extending asset lifespans.',
    category: 'Maintenance',
    categoryColor: 'business',
    url: 'https://www.assetwatch.com/blog/building-a-more-sustainable-operation-with-predictive-maintenance',
    source: 'AssetWatch',
    readTime: '8 min read',
    tags: ['maintenance', 'predictive maintenance', 'asset management', 'Operational Efficiency', 'energy efficiency', 'waste', 'pollution abatement', 'pollution'],
  },

  // ── Occupant Experience ───────────────────────────────────────────────────
  {
    id: 'c1',
    title: 'Make Well-being a Part of the Occupant Experience',
    excerpt: 'How prioritizing building improvements that focus on occupant well-being, particularly through improved indoor air quality, can support productivity, attract and retain talent, and demonstrate commitment to ESG goals.',
    category: 'Well-being',
    categoryColor: 'business',
    url: 'https://www.honeywell.com/us/en/news/featured-stories/2023/06/make-well-being-a-part-of-the-occupant-experience',
    source: 'Honeywell',
    readTime: '5 min read',
    tags: ['well-being', 'wellbeing', 'mental health', 'employee wellness', 'health', 'well-being', 'indoor air quality', 'wellness', 'occupant experience', 'productivity', 'performance', 'connected building', 'workplace', 'clean air', 'ESG reporting'],
  },
  {
    id: 'c2',
    title: 'Laying the Foundation for Success in the Connected-Building Era',
    excerpt: 'McKinsey discusses how connected buildings are evolving beyond energy efficiency to focus on enhancing the occupant experience through data-driven insights, personalised environments, and predictive awareness.',
    category: 'Productivity',
    categoryColor: 'business',
    url: 'https://www.mckinsey.com/industries/industrials/our-insights/laying-the-foundation-for-success-in-the-connected-building-era',
    source: 'McKinsey',
    readTime: '8 min read',
    tags: ['productivity', 'performance', 'connected building', 'workplace', 'occupant experience', 'well-being', 'wellbeing', 'energy efficiency', 'comfort', 'indoor environment', 'safety', 'health and safety'],
  },

  // ── De-Carbonization ──────────────────────────────────────────────────────
  {
    id: 'd1',
    title: 'What Every Leader Needs to Know About Carbon Credits',
    excerpt: 'A primer for business leaders on the carbon credit market, discussing how to participate, identify high-quality credits, and understand the roles of standards and regulations in achieving net-zero goals.',
    category: 'Carbon Credits',
    categoryColor: 'finance',
    url: 'https://www.hbs.edu/faculty/Pages/item.aspx?num=65138',
    source: 'Harvard Business School',
    readTime: '5 min read',
    tags: ['carbon credits', 'carbon offset', 'carbon market', 'Carbon Markets', 'Net Zero Strategy', 'decarbonization', 'De-Carbonization'],
  },
  {
    id: 'd2',
    title: 'Carbon Credits: An Overview of a Climate Controversy',
    excerpt: 'The Harvard Law School Forum delves into the controversies surrounding carbon credits, examining how Net Zero frameworks and reporting standards treat them, common criticisms, and their implications for developing countries.',
    category: 'Carbon Credits',
    categoryColor: 'climate',
    url: 'https://corpgov.law.harvard.edu/2024/12/05/carbon-credits-an-overview-of-a-climate-controversy/',
    source: 'Harvard Law School',
    readTime: '10 min read',
    tags: ['carbon credits', 'carbon offset', 'carbon market', 'Carbon Markets', 'Net Zero Strategy', 'sustainability reporting', 'ESG reporting', 'disclosure', 'decarbonization'],
  },
  {
    id: 'd3',
    title: 'Electrification: Tracking Progress Toward decarbonization',
    excerpt: 'The IEA tracks the progress of electrification as a key decarbonization strategy, covering trends in electric transport, heat pumps, industrial electrification, and the policy measures driving adoption.',
    category: 'Electrification',
    categoryColor: 'climate',
    url: 'https://www.iea.org/energy-system/electricity/electrification',
    source: 'International Energy Agency',
    readTime: '8 min read',
    tags: ['electrification', 'electric vehicle', 'heat pump', 'decarbonization', 'Energy Transition', 'fuel switching', 'hydrogen', 'biofuel', 'low carbon fuel', 'De-Carbonization', 'energy efficiency', 'energy saving'],
  },
  {
    id: 'd4',
    title: "Why the Future of Procurement is Sustainability",
    excerpt: 'McKinsey explores how procurement can be a strategic lever for companies to achieve sustainability goals and gain a competitive edge through innovation and strategic supplier partnerships.',
    category: 'Sustainable Purchasing',
    categoryColor: 'business',
    url: 'https://www.mckinsey.com/capabilities/operations/our-insights/procurements-sustainable-revolution',
    source: 'McKinsey',
    readTime: '6 min read',
    tags: ['sustainable purchasing', 'procurement', 'sustainable supply', 'responsible sourcing', 'supply chain', 'supplier', 'sourcing', 'Operational Efficiency', 'De-Carbonization'],
  },

  // ── Environment ───────────────────────────────────────────────────────────
  {
    id: 'e1',
    title: 'Why and How Business Leaders Should Include Air Quality in Decision-Making',
    excerpt: 'The World Economic Forum highlights the importance of integrating air quality into corporate strategy, emphasising its impact on health, productivity, and economic outcomes for businesses of all sizes.',
    category: 'Clean Air',
    categoryColor: 'nature',
    url: 'https://www.weforum.org/stories/2024/09/how-to-prioritize-clean-air-in-businesses-pollution/',
    source: 'World Economic Forum',
    readTime: '6 min read',
    tags: ['clean air', 'air quality', 'air pollution', 'pollution abatement', 'pollution', 'contamination', 'health', 'well-being', 'indoor air quality', 'wellness', 'Environment'],
  },
  {
    id: 'e2',
    title: 'How Public-Private Partnerships Can Drive Innovations in Water Efficiency',
    excerpt: 'The World Economic Forum discusses the critical role of public-private partnerships in addressing global water security challenges, highlighting how collaboration and technological innovation can enhance water efficiency.',
    category: 'Clean Water',
    categoryColor: 'nature',
    url: 'https://www.weforum.org/stories/2024/08/how-public-private-partnerships-can-drive-innovations-in-water-efficiency-and-sustainability/',
    source: 'World Economic Forum',
    readTime: '7 min read',
    tags: ['clean water', 'water quality', 'water treatment', 'water pollution', 'water', 'water scarcity', 'water management', 'water efficiency', 'pollution abatement', 'pollution', 'Environment', 'food security', 'food system'],
  },
  {
    id: 'e3',
    title: 'The Sustainability Imperative: Waste Management and Business Resilience',
    excerpt: 'BCG discusses how emerging market companies are facing increasing pressure to adopt sustainable practices, including improved waste management, to unlock growth opportunities and build long-term resilience.',
    category: 'Waste Management',
    categoryColor: 'nature',
    url: 'https://www.bcg.com/publications/2023/the-importance-of-sustainability-in-business',
    source: 'BCG',
    readTime: '15 min read',
    tags: ['waste management', 'waste', 'recycling', 'circular', 'circular economy', 'pollution abatement', 'pollution', 'contamination', 'Environment', 'Operational Efficiency'],
  },

  // ── Brand Enhancement ─────────────────────────────────────────────────────
  {
    id: 'f1',
    title: 'Circular Economy in Practice: Case Studies and Company Examples',
    excerpt: 'The Ellen MacArthur Foundation showcases case studies and company examples demonstrating the practical application of circular economy principles across industries, illustrating how these models benefit both people and the environment.',
    category: 'Circular Economy',
    categoryColor: 'business',
    url: 'https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/examples',
    source: 'Ellen MacArthur Foundation',
    readTime: '3 min read',
    tags: ['circular economy', 'circular', 'closed loop', 'waste', 'waste management', 'recycling', 'nature positive', 'restoration', 'rewilding', 'nature-based', 'Brand Enhancement', 'pollution abatement', 'pollution'],
  },

  // ── Occupant Experience (Noise, Comfort, Pandemics, Certifications) ────────
  {
    id: 'h1',
    title: 'Thermal and Acoustic Comfort in Workplaces',
    excerpt: 'GBCI highlights the critical role of thermal and acoustic comfort in fostering productive and healthy work environments within commercial buildings. Addressing noise pollution and ensuring optimal acoustic conditions are essential for employee well-being, directly impacting performance and overall job satisfaction.',
    category: 'Occupant Experience',
    categoryColor: 'business',
    url: 'https://www.gbci.org/thermal-and-acoustic-comfort-workplaces',
    source: 'GBCI',
    readTime: '5 min read',
    tags: ['noise', 'acoustic', 'sound', 'comfort', 'occupant experience', 'indoor environment', 'health', 'well-being', 'wellbeing', 'mental health', 'employee wellness', 'productivity', 'performance', 'connected building', 'workplace'],
  },
  {
    id: 'h2',
    title: 'WELL Certification Boosts Occupant Satisfaction, Health, Well-being and Productivity',
    excerpt: 'A groundbreaking study demonstrates that WELL Certification significantly enhances occupant satisfaction, perceived health, well-being, and productivity within buildings. The findings make a compelling business case for adopting healthy building standards, directly impacting employee performance and corporate sustainability goals.',
    category: 'Occupant Experience',
    categoryColor: 'business',
    url: 'https://resources.wellcertified.com/press-releases/groundbreaking-study-finds-well-certification-boosts-occupant-satisfaction-and-perceived-health-well-being-and-productivity/',
    source: 'WELL Certified',
    readTime: '4 min read',
    tags: ['comfort', 'occupant experience', 'indoor environment', 'health', 'well-being', 'wellbeing', 'mental health', 'employee wellness', 'productivity', 'performance', 'connected building', 'workplace', 'certification', 'LEED', 'BREEAM', 'B Corp', 'ISO'],
  },
  {
    id: 'h3',
    title: 'How Resilient Businesses Created Advantage in Adversity During COVID-19',
    excerpt: 'BCG analyses how resilient companies not only survived but thrived during the COVID-19 pandemic by leveraging anticipation, cushioning, adaptation, and shaping advantages. The research highlights the strategic value of resilience in turning crises into opportunities for differential growth and sustained corporate performance.',
    category: 'Risk Management',
    categoryColor: 'business',
    url: 'https://www.bcg.com/publications/2021/how-resilient-companies-created-advantages-in-adversity-during-covid',
    source: 'BCG',
    readTime: '10 min read',
    tags: ['pandemic', 'epidemic', 'health crisis', 'COVID', 'natural disaster', 'disaster recovery', 'business continuity', 'resilience', 'safety', 'health and safety', 'occupational health', 'Risk Management'],
  },
  {
    id: 'h4',
    title: 'Moving Beyond Compliance: How Sustainability Certifications Drive Business Growth',
    excerpt: 'PwC discusses how sustainability certifications, ISO, B Corp, LEED, and BREEAM, are crucial for businesses to move beyond mere compliance and drive growth. They enhance brand reputation, attract investors, achieve cost savings through efficiency, and open new market opportunities.',
    category: 'Brand Enhancement',
    categoryColor: 'business',
    url: 'https://www.pwc.com/mt/en/publications/sustainability/sustainability-certifications-moving-beyond-compliance-to-drive-business-growth.html',
    source: 'PwC',
    readTime: '4 min read',
    tags: ['certification', 'LEED', 'BREEAM', 'B Corp', 'ISO', 'Brand Enhancement', 'sustainability reporting', 'ESG reporting', 'disclosure', 'CSRD', 'GRI', 'circular economy', 'circular'],
  },

  // ── Risk Management ───────────────────────────────────────────────────────
  {
    id: 'g1',
    title: 'Digital Risk: Transforming Risk Management for the 2020s',
    excerpt: 'McKinsey discusses how digital transformations can create business value by improving the efficiency and quality of risk decisions, and how to adapt digital change to the risk context in financial services.',
    category: 'Digital Risk',
    categoryColor: 'business',
    url: 'https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/digital-risk-transforming-risk-management-for-the-2020s',
    source: 'McKinsey',
    readTime: '12 min read',
    tags: ['digital risk', 'cyber', 'cybersecurity', 'digital transformation', 'Risk Management', 'Corporate Governance'],
  },
  {
    id: 'g2',
    title: 'Feasibility Study for Commodity Hedging',
    excerpt: 'KPMG explores the importance of analysing exposure to commodity and energy markets and developing effective hedging strategies to minimise financial risks and ensure stability for businesses navigating volatile markets.',
    category: 'Commodity Hedging',
    categoryColor: 'finance',
    url: 'https://kpmg.com/de/en/insights/business-performance-and-resilience/Feasibility-commodity-hedging.html',
    source: 'KPMG',
    readTime: '8 min read',
    tags: ['commodity hedging', 'hedging', 'commodity risk', 'price volatility', 'Risk Management', 'energy management', 'energy consumption', 'Operational Efficiency'],
  },
  {
    id: 'g3',
    title: 'Strategic Climate Risk Management',
    excerpt: 'Deloitte highlights how financial services firms can proactively address climate risk, including the impact of extreme weather and natural disasters, to enhance sustainability and capitalise on new opportunities.',
    category: 'Climate Risk',
    categoryColor: 'climate',
    url: 'https://www.deloitte.com/us/en/industries/financial-services/about/climate-risk-management.html',
    source: 'Deloitte',
    readTime: '13 min read',
    tags: ['extreme weather', 'flood', 'drought', 'storm', 'heat wave', 'natural disaster', 'disaster recovery', 'business continuity', 'resilience', 'Climate Risk', 'insurance', 'risk transfer', 'climate insurance', 'Risk Management'],
  },
  {
    id: 'g4',
    title: 'How to Lead in Sustainable Supply Chain Management',
    excerpt: 'KPMG discusses the evolving landscape of global supply chains, emphasising the need for responsible sourcing, ESG compliance, and strategic transformation to manage risks and build resilience against disruption.',
    category: 'Supply Chain',
    categoryColor: 'business',
    url: 'https://kpmg.com/ch/en/insights/esg-sustainability/sustainable-supply-chain.html',
    source: 'KPMG',
    readTime: '10 min read',
    tags: ['supply chain', 'supplier', 'procurement', 'sourcing', 'sustainable purchasing', 'sustainable supply', 'responsible sourcing', 'Risk Management', 'ESG reporting', 'disclosure', 'Scope 3 Emissions'],
  },

  // ── Environment: Food Security ────────────────────────────────────────────
  {
    id: 'i1',
    title: 'Building Food and Agriculture Businesses for a Green Future',
    excerpt: 'McKinsey examines how climate change, supply chain disruption, and shifting consumer expectations are forcing food and agriculture businesses to rethink their operating models. The article outlines how sustainability, from reducing waste to improving climate-risk transparency, is becoming the defining competitive advantage in the sector.',
    category: 'Food Security',
    categoryColor: 'nature',
    url: 'https://www.mckinsey.com/industries/agriculture/our-insights/building-food-and-agriculture-businesses-for-a-green-future',
    source: 'McKinsey',
    readTime: '8 min read',
    tags: ['food security', 'food system', 'agriculture', 'food supply', 'supply chain', 'supplier', 'procurement', 'sourcing', 'Climate Risk', 'sustainable purchasing', 'sustainable supply', 'responsible sourcing', 'Environment', 'waste', 'waste management'],
  },

  // ── Brand Enhancement: DEI ────────────────────────────────────────────────
  {
    id: 'i2',
    title: 'Diversity Matters Even More: The Case for Holistic Impact',
    excerpt: 'McKinsey\'s landmark fourth report in its diversity series demonstrates that companies in the top quartile for gender and ethnic diversity are significantly more likely to outperform peers on profitability. The research makes a compelling case that DEI is not a compliance exercise but a core driver of innovation, talent retention, and long-term financial performance.',
    category: 'DEI',
    categoryColor: 'business',
    url: 'https://www.mckinsey.com/featured-insights/diversity-and-inclusion/diversity-matters-even-more-the-case-for-holistic-impact',
    source: 'McKinsey',
    readTime: '10 min read',
    tags: ['DEI', 'diversity', 'equity', 'inclusion', 'Brand Enhancement', 'ESG reporting', 'disclosure', 'sustainability reporting', 'CSRD', 'GRI', 'Corporate Governance'],
  },
];

// =============================================================================
// ENDURING ADVANTAGE, Sustainability Playing Field Matrix Data
// Shared between SustainabilityMatrix component and CommandPalette
// =============================================================================

export interface CellMeta {
  description: string;
  searchTerms: string[];
  articleSlug?: string;
}

export const CELL_META: Record<string, CellMeta> = {
  // Operational Efficiency
  Cleaning: {
    description: 'Sustainable cleaning practices that reduce chemical use, water consumption, and operational costs.',
    searchTerms: ['cleaning', 'janitorial', 'sanitation'],
  },
  Energy: {
    description: 'Energy management strategies to cut consumption, lower bills, and reduce carbon emissions.',
    searchTerms: ['energy efficiency', 'energy management', 'energy consumption'],
  },
  Insurance: {
    description: 'Climate-linked insurance products and risk transfer strategies for physical and transition risks.',
    searchTerms: ['insurance', 'risk transfer', 'climate insurance'],
  },
  Maintenance: {
    description: 'Predictive and sustainable maintenance programs that extend asset life and reduce waste.',
    searchTerms: ['maintenance', 'predictive maintenance', 'asset management'],
  },
  Waste: {
    description: 'Waste reduction, recycling, and circular economy strategies that cut costs and environmental impact.',
    searchTerms: ['waste', 'recycling', 'waste management', 'waste reduction'],
  },
  Water: {
    description: 'Water stewardship and efficiency programs addressing scarcity, cost, and regulatory risk.',
    searchTerms: ['water', 'water scarcity', 'water management', 'water efficiency'],
  },

  // Occupant Experience
  Comfort: {
    description: 'Building systems and design choices that improve thermal, visual, and acoustic comfort for occupants.',
    searchTerms: ['comfort', 'occupant experience', 'indoor environment'],
  },
  Health: {
    description: 'Indoor air quality, ventilation, and wellness initiatives that protect occupant health and productivity.',
    searchTerms: ['health', 'well-being', 'indoor air quality', 'wellness'],
  },
  Noise: {
    description: 'Acoustic design and noise mitigation strategies that improve focus, wellbeing, and satisfaction.',
    searchTerms: ['noise', 'acoustic', 'sound'],
  },
  Productivity: {
    description: 'Workspace and environmental improvements proven to enhance employee output and engagement.',
    searchTerms: ['productivity', 'performance', 'connected building', 'workplace'],
  },
  Safety: {
    description: 'Physical safety systems and protocols that protect people and reduce liability exposure.',
    searchTerms: ['safety', 'health and safety', 'occupational health'],
  },
  'Well-being': {
    description: 'Holistic programs addressing mental and physical wellbeing to attract and retain talent.',
    searchTerms: ['well-being', 'wellbeing', 'mental health', 'employee wellness'],
  },

  // De-Carbonization
  'Carbon Credits': {
    description: 'Voluntary and compliance carbon markets enabling companies to offset residual emissions on the path to net zero.',
    searchTerms: ['carbon credits', 'carbon offset', 'carbon market'],
  },
  Electrification: {
    description: 'Switching from fossil fuels to electricity across transport, heating, and industrial processes.',
    searchTerms: ['electrification', 'electric vehicle', 'heat pump'],
  },
  'Energy Efficiency': {
    description: 'Technology and process improvements that deliver the same output with less energy input.',
    searchTerms: ['energy efficiency', 'energy saving', 'efficiency'],
  },
  'Fuel Switching': {
    description: 'Transitioning from high-carbon fuels to lower-carbon alternatives including hydrogen and biofuels.',
    searchTerms: ['fuel switching', 'hydrogen', 'biofuel', 'low carbon fuel'],
  },
  'Green Energy Certificates': {
    description: 'Renewable Energy Certificates (RECs) and Guarantees of Origin that verify green electricity procurement.',
    searchTerms: ['green energy certificate', 'renewable energy certificate', 'REC', 'guarantee of origin'],
  },
  'Sustainable Purchasing': {
    description: 'Procurement strategies that embed environmental and social criteria into supplier selection and contracts.',
    searchTerms: ['sustainable purchasing', 'procurement', 'sustainable supply', 'responsible sourcing'],
  },

  // Environment
  'Clean Air': {
    description: 'Air quality management strategies that protect health, comply with regulation, and reduce liability.',
    searchTerms: ['clean air', 'air quality', 'air pollution'],
  },
  'Clean Water': {
    description: 'Water quality protection and treatment initiatives that safeguard communities and ecosystems.',
    searchTerms: ['clean water', 'water quality', 'water treatment', 'water pollution'],
  },
  'Food Security': {
    description: 'Strategies addressing climate-driven disruptions to agricultural supply chains and food systems.',
    searchTerms: ['food security', 'food system', 'agriculture', 'food supply'],
  },
  'Biodiversity Loss': {
    description: 'Nature-positive strategies that halt ecosystem degradation and align with emerging TNFD disclosure requirements.',
    searchTerms: ['biodiversity', 'nature', 'ecosystem', 'TNFD'],
  },
  'Pollution Abatement': {
    description: 'Technologies and processes that reduce industrial pollution across air, water, and land.',
    searchTerms: ['pollution', 'pollution abatement', 'contamination'],
  },
  'Waste Management': {
    description: 'End-to-end waste strategies from reduction and reuse through to responsible disposal and recovery.',
    searchTerms: ['waste management', 'waste', 'recycling', 'circular'],
  },

  // Brand Enhancement
  'Circular Economy': {
    description: 'Business models that keep materials in use, eliminate waste, and regenerate natural systems.',
    searchTerms: ['circular economy', 'circular', 'closed loop'],
  },
  DEI: {
    description: 'Diversity, equity, and inclusion programs that build culture, reduce risk, and improve performance.',
    searchTerms: ['DEI', 'diversity', 'equity', 'inclusion'],
  },
  Certifications: {
    description: 'Third-party sustainability certifications (LEED, BREEAM, B Corp) that validate and communicate performance.',
    searchTerms: ['certification', 'LEED', 'BREEAM', 'B Corp', 'ISO'],
  },
  'Nature Positive Activities': {
    description: 'Initiatives that restore and enhance biodiversity, going beyond "do no harm" to active regeneration.',
    searchTerms: ['nature positive', 'restoration', 'rewilding', 'nature-based'],
  },
  'Onsite Green Energy': {
    description: 'On-site renewable generation (solar, wind, geothermal) that reduces grid dependence and energy costs.',
    searchTerms: ['onsite energy', 'solar', 'rooftop solar', 'on-site renewable'],
  },
  'Sustainability Reporting': {
    description: 'ESG disclosure frameworks (GRI, SASB, CSRD, TCFD) that build investor confidence and regulatory compliance.',
    searchTerms: ['sustainability reporting', 'ESG reporting', 'disclosure', 'CSRD', 'GRI'],
  },

  // Risk Management
  'Commodity Hedging': {
    description: 'Financial instruments and strategies that protect against volatile commodity and energy price movements.',
    searchTerms: ['commodity hedging', 'hedging', 'commodity risk', 'price volatility'],
  },
  'Digital Risk Management': {
    description: 'Cyber and digital risk frameworks that protect sustainability data, systems, and reporting integrity.',
    searchTerms: ['digital risk', 'cyber', 'cybersecurity', 'digital transformation'],
  },
  'Extreme Weather': {
    description: 'Physical climate risk assessment and resilience planning for floods, heat, drought, and storms.',
    searchTerms: ['extreme weather', 'flood', 'drought', 'storm', 'heat wave'],
  },
  'Natural Disasters': {
    description: 'Business continuity and disaster recovery strategies for climate-amplified natural hazard events.',
    searchTerms: ['natural disaster', 'disaster recovery', 'business continuity', 'resilience'],
  },
  Pandemics: {
    description: 'Operational resilience and supply chain strategies informed by pandemic preparedness frameworks.',
    searchTerms: ['pandemic', 'epidemic', 'health crisis', 'COVID'],
  },
  'Strategic Location': {
    description: 'Think of it as layering heat maps: one layer for hurricane exposure, one for sea-level rise, one for freshwater availability, one for wildfire probability. Every location has its own unique configuration of risk layers, and the combination tells a very different story than any single layer alone. Property values collapse when a critical mass expects flooding. It does not have to happen first.',
    searchTerms: ['location risk', 'sea level rise', 'flood risk', 'property risk', 'supply chain shortening', 'insurance availability'],
    articleSlug: 'location-risk-heat-map-layers',
  },
  'Supply Chain': {
    description: 'End-to-end supply chain sustainability covering Scope 3 emissions, ESG compliance, and resilience.',
    searchTerms: ['supply chain', 'supplier', 'procurement', 'sourcing'],
    articleSlug: 'the-polycrisis-what-your-clients-advisors-need-to-know',
  },
  'Water Scarcity': {
    description: 'Water dependency mapping, stress-zone assessment, and mitigation prioritization for operations and supply chains facing freshwater scarcity.',
    searchTerms: ['water scarcity', 'drought', 'freshwater', 'water risk', 'water stress', 'water dependency'],
    articleSlug: 'water-scarcity-corporate-water-dependency',
  },
  'Biodiversity Disclosure': {
    description: 'TNFD-aligned biodiversity impact and dependency assessment, producing disclosure-ready reports for investors and regulators.',
    searchTerms: ['biodiversity', 'TNFD', 'nature disclosure', 'habitat', 'species'],
    articleSlug: 'nature-loss-the-supply-chain-risk-cfos-are-not-pricing',
  },
  'TNFD Readiness': {
    description: 'LEAP framework assessment covering locate, evaluate, assess, and prepare phases for nature-related financial disclosure readiness.',
    searchTerms: ['TNFD', 'nature risk', 'LEAP', 'nature disclosure', 'biodiversity framework'],
    articleSlug: 'tnfd-what-financial-advisors-need-to-know',
  },
  'Freshwater Dependency': {
    description: 'Operational and supply chain freshwater dependency inventory, overlaid against WRI Aqueduct water stress projections to 2050.',
    searchTerms: ['freshwater', 'water dependency', 'water inventory', 'water supply', 'watershed'],
  },
  'Nature-Based Solutions': {
    description: 'Nature-based interventions (wetland restoration, reforestation, green infrastructure) that deliver measurable financial and environmental returns.',
    searchTerms: ['nature-based solutions', 'NbS', 'reforestation', 'wetland', 'green infrastructure'],
  },
  'Ecosystem Services': {
    description: 'Valuation of ecosystem services that underpin business operations, including pollination, soil health, carbon sequestration, and flood regulation.',
    searchTerms: ['ecosystem', 'natural capital', 'ecosystem services', 'pollination', 'soil health'],
  },
  'Ocean Acidification': {
    description: 'Rising ocean acidity is dissolving shellfish supply chains, degrading coral reef assets worth $36B/yr in tourism, and creating new insurance gaps for coastal infrastructure. Affects seafood, pharma, hospitality, and coastal real estate.',
    searchTerms: ['ocean acidification', 'marine', 'coral reef', 'shellfish', 'ocean risk', 'coastal'],
    articleSlug: 'ocean-acidification-the-marine-supply-chain-risk',
  },
};

export const COLUMNS = [
  {
    heading: 'Operational Efficiency',
    color: '#0D3349',
    lightBg: 'rgba(201,168,76,0.08)',
    items: ['Cleaning', 'Energy', 'Insurance', 'Maintenance', 'Waste', 'Water'],
  },
  {
    heading: 'Occupant Experience',
    color: '#1D4A62',
    lightBg: 'rgba(13,51,73,0.07)',
    items: ['Comfort', 'Health', 'Noise', 'Productivity', 'Safety', 'Well-being'],
  },
  {
    heading: 'De-Carbonization',
    color: '#C9A84C',
    lightBg: 'rgba(201,168,76,0.08)',
    items: [
      'Carbon Credits',
      'Electrification',
      'Energy Efficiency',
      'Fuel Switching',
      'Green Energy Certificates',
      'Sustainable Purchasing',
    ],
  },
  {
    heading: 'Environment',
    color: '#315A68',
    lightBg: 'rgba(13,51,73,0.06)',
    items: [
      'Clean Air',
      'Clean Water',
      'Food Security',
      'Biodiversity Loss',
      'Pollution Abatement',
      'Waste Management',
    ],
  },
  {
    heading: 'Brand Enhancement',
    color: '#8A6B2E',
    lightBg: 'rgba(201,168,76,0.07)',
    items: [
      'Circular Economy',
      'DEI',
      'Certifications',
      'Nature Positive Activities',
      'Onsite Green Energy',
      'Sustainability Reporting',
    ],
  },
  {
    heading: 'Risk Management',
    color: '#0D3349',
    lightBg: 'rgba(13,51,73,0.08)',
    items: [
      'Commodity Hedging',
      'Digital Risk Management',
      'Extreme Weather',
      'Natural Disasters',
      'Strategic Location',
      'Supply Chain',
    ],
  },
  {
    heading: 'Nature Risk',
    color: '#315A68',
    lightBg: 'rgba(13,51,73,0.06)',
    items: [
      'Water Scarcity',
      'Biodiversity Disclosure',
      'TNFD Readiness',
      'Freshwater Dependency',
      'Nature-Based Solutions',
      'Ocean Acidification',
    ],
  },
];

export type MatrixSectorKey = 'all' | 'cfo' | 'municipalities' | 'firstNations' | 'agriculture' | 'realEstate' | 'buildings' | 'industrial' | 'transportation';

export interface MatrixSector {
  key: MatrixSectorKey;
  label: string;
  shortLabel: string;
  route?: string;
  summary: string;
  priorityColumns: string[];
  priorityTopics: string[];
  briefingTitle: string;
}

// Audience priorities use the existing public decision routes as their source.
// They guide the order in which visitors inspect the field; they do not replace
// the full cross-functional comparison required to identify the Next Best Thing.
export const MATRIX_SECTORS: MatrixSector[] = [
  {
    key: 'all',
    label: 'All decision fields',
    shortLabel: 'All fields',
    summary: 'View the complete playing field before applying an audience lens.',
    priorityColumns: COLUMNS.map((column) => column.heading),
    priorityTopics: [],
    briefingTitle: 'Full Decision-Matrix Briefing',
  },
  {
    key: 'cfo',
    label: 'CFOs & Finance',
    shortLabel: 'CFOs',
    route: '/cfo',
    summary: 'Prioritize capital-return, operating-cost, supply-chain, location, and nature-risk questions that need to stand up to committee.',
    priorityColumns: ['Operational Efficiency', 'De-Carbonization', 'Risk Management', 'Nature Risk'],
    priorityTopics: ['Energy', 'Energy Efficiency', 'Commodity Hedging', 'Supply Chain', 'Strategic Location', 'Water Scarcity', 'TNFD Readiness'],
    briefingTitle: 'CFO & Finance Decision-Matrix Briefing',
  },
  {
    key: 'municipalities',
    label: 'Municipalities',
    shortLabel: 'Municipalities',
    route: '/municipalities',
    summary: 'Prioritize resilient assets, service-level exposure, water, natural assets, and capital-plan readiness.',
    priorityColumns: ['Operational Efficiency', 'Environment', 'Risk Management', 'Nature Risk'],
    priorityTopics: ['Water', 'Clean Water', 'Extreme Weather', 'Natural Disasters', 'Strategic Location', 'Water Scarcity', 'Nature-Based Solutions'],
    briefingTitle: 'Municipal Decision-Matrix Briefing',
  },
  {
    key: 'firstNations',
    label: 'First Nations',
    shortLabel: 'First Nations',
    route: '/first-nations',
    summary: 'Prioritize community-held water, energy, natural-asset, resilience, and capacity decisions on the Nation’s terms.',
    priorityColumns: ['Operational Efficiency', 'De-Carbonization', 'Environment', 'Risk Management', 'Nature Risk'],
    priorityTopics: ['Energy', 'Water', 'Clean Water', 'Energy Efficiency', 'Natural Disasters', 'Water Scarcity', 'Ecosystem Services'],
    briefingTitle: 'First Nations Decision-Matrix Briefing',
  },
  {
    key: 'agriculture',
    label: 'Agriculture & Food',
    shortLabel: 'Agriculture',
    route: '/agriculture',
    summary: 'Prioritize water dependency, food security, input exposure, supply continuity, and ecosystem conditions.',
    priorityColumns: ['Operational Efficiency', 'De-Carbonization', 'Environment', 'Risk Management', 'Nature Risk'],
    priorityTopics: ['Water', 'Food Security', 'Sustainable Purchasing', 'Supply Chain', 'Extreme Weather', 'Water Scarcity', 'Freshwater Dependency'],
    briefingTitle: 'Agriculture & Food Decision-Matrix Briefing',
  },
  {
    key: 'realEstate',
    label: 'Real Estate & Infrastructure',
    shortLabel: 'Real estate',
    route: '/real-estate',
    summary: 'Prioritize asset performance, occupant conditions, energy, location exposure, water, and insurability.',
    priorityColumns: ['Operational Efficiency', 'Occupant Experience', 'De-Carbonization', 'Risk Management', 'Nature Risk'],
    priorityTopics: ['Energy', 'Maintenance', 'Comfort', 'Health', 'Energy Efficiency', 'Strategic Location', 'Extreme Weather', 'Water Scarcity'],
    briefingTitle: 'Real Estate & Infrastructure Decision-Matrix Briefing',
  },
  {
    key: 'buildings',
    label: 'Buildings',
    shortLabel: 'Buildings',
    route: '/buildings',
    summary: 'Prioritize building systems, occupant conditions, operating cost, resilience, and practical delivery sequencing.',
    priorityColumns: ['Operational Efficiency', 'Occupant Experience', 'De-Carbonization', 'Environment', 'Risk Management'],
    priorityTopics: ['Energy', 'Maintenance', 'Water', 'Comfort', 'Health', 'Energy Efficiency', 'Clean Air', 'Extreme Weather'],
    briefingTitle: 'Buildings Decision-Matrix Briefing',
  },
  {
    key: 'industrial',
    label: 'Industrial',
    shortLabel: 'Industrial',
    route: '/industrial',
    summary: 'Prioritize process efficiency, maintenance, energy, water, material exposure, site resilience, and delivery conditions that protect margin and throughput.',
    priorityColumns: ['Operational Efficiency', 'De-Carbonization', 'Environment', 'Risk Management', 'Nature Risk'],
    priorityTopics: ['Energy', 'Maintenance', 'Water', 'Energy Efficiency', 'Fuel Switching', 'Clean Air', 'Pollution Abatement', 'Waste Management', 'Extreme Weather', 'Supply Chain', 'Water Scarcity'],
    briefingTitle: 'Industrial Decision-Matrix Briefing',
  },
  {
    key: 'transportation',
    label: 'Transportation',
    shortLabel: 'Transportation',
    route: '/transportation',
    summary: 'Prioritize fleet lifecycle, route and depot conditions, fuel or charging fit, service reliability, supply continuity, and physical network resilience.',
    priorityColumns: ['Operational Efficiency', 'De-Carbonization', 'Environment', 'Risk Management', 'Nature Risk'],
    priorityTopics: ['Energy', 'Maintenance', 'Electrification', 'Fuel Switching', 'Sustainable Purchasing', 'Clean Air', 'Extreme Weather', 'Strategic Location', 'Supply Chain', 'Water Scarcity'],
    briefingTitle: 'Transportation Decision-Matrix Briefing',
  },
];

import { GENERATED_ARTICLE_SEO } from './generatedArticleSeo';
import { IS_COMING_SOON } from '../shared/siteMode';

const SITE_URL = 'https://enduringadvantage.com';
const SITE_NAME = 'Enduring Advantage';
const DEFAULT_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/og-share-image_e1f37039.png';
const LOGO = `${SITE_URL}/favicon-512.png`;

export type StaticSeo = {
  title: string;
  description: string;
  image?: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  authorTitle?: string;
  authorBio?: string;
  authorPhoto?: string;
  authorUrl?: string;
  authorLinkedIn?: string;
  section?: string;
  tags?: readonly string[];
  sources?: readonly { label: string; url: string }[];
  noIndex?: boolean;
};

const NOT_FOUND_SEO: StaticSeo = {
  title: 'Page Not Found',
  description: 'The requested Enduring Advantage page could not be found.',
  noIndex: true,
};

const COMING_SOON_SEO: StaticSeo = {
  title: 'Coming Soon',
  description: 'Enduring Advantage is refining its website. Please check back shortly.',
  image: DEFAULT_IMAGE,
  ogImageAlt: 'Enduring Advantage',
  noIndex: true,
};

const PUBLIC_GENERATED_ARTICLE_SEO = Object.fromEntries(
  Object.entries(GENERATED_ARTICLE_SEO as Record<string, StaticSeo>)
    .filter(([, article]) => String(article.author) !== 'Campbell Ohrlis'),
) as Record<string, StaticSeo>;

export const STATIC_SEO: Record<string, StaticSeo> = {
  '/': {
    title: 'Profitable Sustainability, the Right Things in the Right Order | Enduring Advantage',
    description: 'Climate change, biodiversity loss and pollution are already in your costs. Thousands of new sustainability solutions mean there is almost certainly one that pays your business back well. Enduring Advantage finds the one with the best financial return, your Next Best Thing, and quarterbacks it to done. Then the next one.',
  },
  '/services': {
    title: 'How Your Next Best Thing Gets Found and Delivered',
    description: 'You get one project, the reason it is that project, the plan to deliver it and the result reported against your baseline. Then the next one. Assess, collect, identify, plan, deliver, report, repeat. No equipment sales. No referral fees.',
  },
  '/actio': {
    title: 'actio, The Decision Platform for Your Next Best Action',
    description: 'The Catalys-developed and owned actio platform combines operating, market, and jurisdictional context to screen what is not material and identify the one action that stands above the rest.',
  },
  '/about': {
    title: 'About Enduring Advantage',
    description: "Enduring Advantage is a software enabled, managed sustainability decision partner for CFOs. Energy Advantage's 30 years of experience collecting and managing client data, the actio decision platform developed by Catalys, and a named Coach who quarterbacks delivery.",
  },
  '/contact': {
    title: 'Find Your Next Best Thing',
    description: 'Tell us the decision in front of you. Rob Kirkby or Campbell Ohrlis will come back within one business day and say whether there is likely a material opportunity worth pursuing.',
  },
  '/diagnostic': {
    title: 'The Diagnostic. Start With the Data You Have',
    description: 'Your first engagement with Enduring Advantage. A situation assessment, the start of data collection and the first low risk wins, built on the data you hold today.',
  },
  '/scorecard': {
    title: 'Sustainability Investment Readiness Scorecard',
    description: 'Assess your organization’s readiness to unlock financial returns from sustainability investment across five decision conditions.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/scorecard-og-image-5aa6sMzUaAWAnWiNpAZNhx.png',
  },
  '/partners': {
    title: 'Become a Partner',
    description: 'A partner delivery model for accounting, consulting, and engineering firms. You bring the client relationship; Enduring Advantage brings Energy Advantage’s 30 years of experience collecting and managing client data, decision support, and delivery support behind it.',
  },
  '/coach-model': {
    title: 'One Coach. Full Accountability',
    description: 'You get one named Coach, a senior advisor with 10 to 20 years of management consulting experience, accountable from the decision through delivery and reporting. No committees. No hand-off chains.',
  },
  '/questions': {
    title: 'Questions Leaders Ask Before Starting',
    description: 'Straight answers on cost, proof, data, method and fit, and on what happens if you do nothing.',
  },
  '/articles': {
    title: 'Research & Insights',
    description: 'Original research for finance leaders and operational decision-makers on the environmental polycrisis, nature risk, location risk, and capital decisions.',
  },
  '/articles/topic/hiring-advisory': {
    title: 'Hiring & Advisory Guides',
    description: 'Practical guidance for finance and operations leaders evaluating sustainability advisory support: what to ask, when to seek help, how to hire, and how to structure a first engagement.',
  },
  '/articles/topic/supply-chain': {
    title: 'Supply Chain Research & Decision Tools',
    description: 'Research and practical decision tools for finance, procurement, and operations leaders screening supplier, freight, and sourcing exposure into a defensible next action.',
    image: 'https://enduringadvantage.com/manus-storage/supply-chain-port-hero_56855d6a.jpg',
  },
  '/articles/author/rob-kirkby': {
    title: 'Rob Kirkby, Research & Insights',
    description: 'Research by Rob Kirkby on climate risk, energy systems, and resilient capital decisions for operating and finance leaders.',
    image: `${SITE_URL}/manus-storage/RobKirkby_402e0e7f.jpeg`,
  },
  '/playing-field': {
    title: 'The Sustainability Playing Field',
    description: 'See the whole field of credible sustainability options in one view, then see how your own data turns it into one next move.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'Read how Enduring Advantage collects, uses, and safeguards personal information.',
  },
  '/terms': {
    title: 'Terms of Use',
    description: 'Review the terms that govern use of enduringadvantage.com and related advisory information.',
  },
  '/partners/thank-you': {
    title: 'Partner Application Received',
    description: 'Your Enduring Advantage partner application has been received.',
    noIndex: true,
  },
  '/checklist/thank-you': {
    title: 'Your Six-Step Decision Checklist',
    description: 'Your Enduring Advantage decision checklist is ready to download.',
    noIndex: true,
  },
  '/404': NOT_FOUND_SEO,
  '/cfo': {
    title: 'Capital Decisions That Stand Up to Committee',
    description: 'Your sustainability line can pay. Enduring Advantage finds the one project that clears your hurdle rate and improves environmental performance, delivers it and reports the result. Then the next one.',
    image: `${SITE_URL}/manus-storage/icp-hero-cfo_454b0d8b.jpg`,
  },
  '/municipalities': {
    title: 'Asset Renewal, Sequenced and Funded',
    description: 'Which line goes first, why, and what it saved. Enduring Advantage helps staff and council pick the renewal that pays, fund it and prove it.',
    image: `${SITE_URL}/manus-storage/icp-hero-municipal-v2_06893690.jpg`,
  },
  '/first-nations': {
    title: 'Working With Chief and Council',
    description: "Chief and council choose what to do first, on the Nation's terms and with the Nation's own records. Enduring Advantage finds the project that pays and leaves a clearer record each cycle.",
    image: `${SITE_URL}/manus-storage/icp-hero-first-nations-v2_6119d81c.jpg`,
  },
  '/agriculture': {
    title: 'Straight Answers on Farm Sustainability Money',
    description: 'Which program or upgrade actually pays on your acres. One answer, with the numbers, before you sign anything.',
    image: `${SITE_URL}/manus-storage/icp-hero-agriculture-v2_293d0259.jpg`,
  },
  '/real-estate': {
    title: 'Retrofit Decisions That Stand on Their Own Economics',
    description: 'Which project belongs in the capex reserve first, and what it returns. One defensible answer across the portfolio.',
    image: `${SITE_URL}/manus-storage/icp-hero-real-estate-v2_3b4ac9e1.jpg`,
  },
  '/buildings': {
    title: 'Building Decisions That Stand Up to Portfolio Review',
    description: 'Thousands of possible upgrades across a portfolio. One next decision, with the evidence an owner, operator or lender can test.',
    image: `${SITE_URL}/manus-storage/buildings-service-hero_1372a0f0.jpg`,
  },
  '/industrial': {
    title: 'Industrial Decisions That Protect Margin and Throughput',
    description: 'More opportunities than downtime windows. One next decision for the plant, ranked on your return and ready before the shutdown.',
    image: `${SITE_URL}/manus-storage/industrial-sector-hero_0ae48206.jpg`,
  },
  '/transportation': {
    title: 'Transportation Decisions That Work on the Route and in the Budget',
    description: 'One fleet or network decision that holds on the route and in the budget, screened against the full field before a vehicle, charger or fuel is chosen.',
    image: `${SITE_URL}/manus-storage/transportation-sector-hero_698fdd95.jpg`,
  },
  ...PUBLIC_GENERATED_ARTICLE_SEO,
};

function normalizeRoute(route: string) {
  return route.length > 1 ? route.replace(/\/+$/, '') : route;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeJsonForHtml(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

function fullTitle(page: StaticSeo) {
  return page.title.includes(SITE_NAME) ? page.title : `${page.title} | ${SITE_NAME}`;
}

export function getStaticSeo(route: string) {
  if (IS_COMING_SOON) return COMING_SOON_SEO;
  return STATIC_SEO[normalizeRoute(route)] ?? NOT_FOUND_SEO;
}

export function isKnownPublicRoute(route: string) {
  // The holding page is available only at the canonical root. Keeping unknown
  // paths unknown prevents 200 responses for typos and common security-contact
  // probes while retaining a noindex holding response where needed.
  if (IS_COMING_SOON) return normalizeRoute(route) === '/';
  return Boolean(STATIC_SEO[normalizeRoute(route)]);
}

function buildStructuredData(route: string, page: StaticSeo, title: string, canonical: string, image: string) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: LOGO },
      description: 'Software enabled, managed sustainability decision support for CFOs, with delivery through the right partners.',
      email: 'partnerships@enduringadvantage.com',
      telephone: '+1-800-697-3456',
      sameAs: ['https://www.linkedin.com/company/enduring-advantage-inc/'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'en-CA',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: page.description,
      inLanguage: 'en-CA',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      primaryImageOfPage: { '@type': 'ImageObject', url: image },
    },
  ];

  if (page.ogType === 'article') {
    const authorUrl = page.authorUrl
      ? (page.authorUrl.startsWith('http') ? page.authorUrl : `${SITE_URL}${page.authorUrl}`)
      : undefined;
    const authorImage = page.authorPhoto
      ? (page.authorPhoto.startsWith('http') ? page.authorPhoto : `${SITE_URL}${page.authorPhoto}`)
      : undefined;
    graph.push({
      '@type': 'Article',
      '@id': `${canonical}#article`,
      headline: page.title,
      description: page.description,
      mainEntityOfPage: { '@id': canonical },
      image,
      datePublished: page.publishedTime,
      dateModified: page.modifiedTime ?? page.publishedTime,
      author: {
        '@type': 'Person',
        name: page.author,
        jobTitle: page.authorTitle,
        description: page.authorBio,
        url: authorUrl,
        image: authorImage,
        sameAs: page.authorLinkedIn ? [page.authorLinkedIn] : undefined,
        worksFor: { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME },
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
      articleSection: page.section,
      keywords: page.tags?.join(', '),
      citation: page.sources?.map((source) => ({
        '@type': 'CreativeWork',
        name: source.label,
        url: source.url,
      })),
      inLanguage: 'en-CA',
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

function buildArticleMeta(page: StaticSeo) {
  if (page.ogType !== 'article') return '';
  const tags = (page.tags ?? []).map((tag) => `    <meta property="article:tag" content="${escapeHtml(tag)}" />`).join('\n');
  return [
    `    <meta property="article:published_time" content="${escapeHtml(page.publishedTime ?? '')}" />`,
    `    <meta property="article:modified_time" content="${escapeHtml(page.modifiedTime ?? page.publishedTime ?? '')}" />`,
    `    <meta property="article:author" content="${escapeHtml(page.author ?? SITE_NAME)}" />`,
    `    <meta property="article:section" content="${escapeHtml(page.section ?? 'Research & Insights')}" />`,
    tags,
  ].filter(Boolean).join('\n');
}

export function injectStaticSeo(html: string, route: string) {
  const normalizedRoute = normalizeRoute(route);
  const page = getStaticSeo(normalizedRoute);
  const title = fullTitle(page);
  const canonical = `${SITE_URL}${IS_COMING_SOON ? '/' : normalizedRoute}`;
  const image = page.image ?? DEFAULT_IMAGE;
  const imageAlt = page.ogImageAlt ?? `${SITE_NAME} research and decision support`;
  const description = page.description;
  const robots = page.noIndex
    ? 'noindex, nofollow, noarchive'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  const structuredData = escapeJsonForHtml(buildStructuredData(normalizedRoute, page, title, canonical, image));
  const articleMeta = buildArticleMeta(page);

  const replacements: Array<[RegExp, string]> = [
    [/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`],
    [/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`],
    [/<meta name="robots" content="[^"]*"\s*\/>/, `<meta name="robots" content="${robots}" />`],
    [/<meta name="googlebot" content="[^"]*"\s*\/>/, `<meta name="googlebot" content="${robots}" />`],
    [/<meta name="bingbot" content="[^"]*"\s*\/>/, `<meta name="bingbot" content="${robots}" />`],
    [/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`],
    [/<link rel="alternate" href="[^"]*" hreflang="en-CA"\s*\/>/, `<link rel="alternate" href="${canonical}" hreflang="en-CA" />`],
    [/<link rel="alternate" href="[^"]*" hreflang="x-default"\s*\/>/, `<link rel="alternate" href="${canonical}" hreflang="x-default" />`],
    [/<meta property="og:type" content="[^"]*"\s*\/>/, `<meta property="og:type" content="${page.ogType ?? 'website'}" />`],
    [/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`],
    [/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`],
    [/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`],
    [/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${image}" />`],
    [/<meta property="og:image:alt" content="[^"]*"\s*\/>/, `<meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />`],
    [/<meta name="twitter:url" content="[^"]*"\s*\/>/, `<meta name="twitter:url" content="${canonical}" />`],
    [/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`],
    [/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`],
    [/<meta name="twitter:image" content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${image}" />`],
    [/<meta name="twitter:image:alt" content="[^"]*"\s*\/>/, `<meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />`],
  ];

  const withMetadata = replacements.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), html);
  const additions = [articleMeta, `    <script type="application/ld+json" data-static-seo="structured-data">${structuredData}</script>`]
    .filter(Boolean)
    .join('\n');
  return withMetadata.replace('</head>', `${additions}\n  </head>`);
}

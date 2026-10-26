import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articles } from '../client/src/lib/articlesData';
import { IS_COMING_SOON } from '../shared/siteMode';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://enduringadvantage.com';
const LASTMOD = '2026-09-22';

const publicPages = [
  { path: '/', title: 'Enduring Advantage', description: 'Independent sustainability decision and delivery support for large customers and supply chain partners.', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', title: 'Services', description: 'The Enduring Advantage decision protocol, from available data to one accountable next action and delivery support.', priority: '0.9', changefreq: 'monthly' },
  { path: '/actio', title: 'actio Platform', description: 'How the Catalys-developed actio platform supports a defensible next sustainability decision.', priority: '0.85', changefreq: 'monthly' },
  { path: '/about', title: 'About Enduring Advantage', description: 'The delivery company in the Energy Advantage group, combining data-management experience, decision support, and human-led delivery.', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', title: 'Request My 30-Minute Triage', description: 'Request a principal-led conversation to clarify the decision and identify the right next step.', priority: '0.9', changefreq: 'monthly' },
  { path: '/diagnostic', title: 'The Diagnostic', description: 'A structured sustainability starting point built from the data you have today.', priority: '0.8', changefreq: 'monthly' },
  { path: '/scorecard', title: 'Sustainability Investment Readiness Scorecard', description: 'Assess the decision conditions that support financially grounded sustainability investment.', priority: '0.8', changefreq: 'monthly' },
  { path: '/partners', title: 'Channel Partner Programme', description: 'A partner delivery model for accounting, consulting, engineering, and advisory firms.', priority: '0.85', changefreq: 'monthly' },
  { path: '/coach-model', title: 'The Coach Model', description: 'A principal-led delivery relationship from first decision through implementation.', priority: '0.75', changefreq: 'monthly' },
  { path: '/questions', title: 'Questions Leaders Ask Before Starting', description: 'Straight answers about data, financial return, implementation, and the Next Best Thing process.', priority: '0.75', changefreq: 'monthly' },
  { path: '/playing-field', title: 'Sustainability Playing Field', description: 'A visual decision field that brings client evidence, provider options and jurisdictional reality together to identify the Next Best Thing.', priority: '0.85', changefreq: 'monthly' },
  { path: '/articles', title: 'Research & Insights', description: 'Research for finance leaders and operating decision-makers on environmental risk, capital decisions, and delivery.', priority: '0.9', changefreq: 'weekly' },
  { path: '/articles/topic/hiring-advisory', title: 'Hiring & Advisory Guides', description: 'Decision-led guidance for leaders evaluating sustainability advisory support.', priority: '0.8', changefreq: 'weekly' },
  { path: '/articles/topic/supply-chain', title: 'Supply Chain Research & Decision Tools', description: 'Research and decision tools for supplier, freight, and sourcing exposure.', priority: '0.8', changefreq: 'weekly' },
  { path: '/articles/author/rob-kirkby', title: 'Rob Kirkby, Research & Insights', description: 'Research by Rob Kirkby on climate risk, energy systems, and resilient capital decisions.', priority: '0.6', changefreq: 'monthly' },
  { path: '/cfo', title: 'CFO & Finance Leaders', description: 'Capital-decision support for finance leaders identifying the next environmental action that stands up to committee.', priority: '0.85', changefreq: 'monthly' },
  { path: '/municipalities', title: 'Municipalities', description: 'Asset renewal, funding readiness, and capital-plan sequencing for municipal leaders.', priority: '0.85', changefreq: 'monthly' },
  { path: '/first-nations', title: 'First Nations', description: 'Council-led, capacity-conscious prioritisation of opportunities on the Nation’s terms.', priority: '0.85', changefreq: 'monthly' },
  { path: '/agriculture', title: 'Agriculture', description: 'Independent screening of programs, contracts, and farm investment decisions.', priority: '0.85', changefreq: 'monthly' },
  { path: '/real-estate', title: 'Real Estate', description: 'Portfolio-specific operating and capital decision support for real-estate leaders.', priority: '0.85', changefreq: 'monthly' },
  { path: '/buildings', title: 'Buildings', description: 'Operating and capital decision support for building owners, operators, and channel partners.', priority: '0.85', changefreq: 'monthly' },
  { path: '/industrial', title: 'Industrial', description: 'Plant-level screening of energy, process, maintenance, water, waste, and resilience decisions.', priority: '0.85', changefreq: 'monthly' },
  { path: '/transportation', title: 'Transportation & Logistics', description: 'Fleet, route, depot, fuel, and network decision support for transportation and logistics leaders.', priority: '0.85', changefreq: 'monthly' },
  { path: '/privacy-policy', title: 'Privacy Policy', description: 'How Enduring Advantage collects, uses, and safeguards personal information.', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', title: 'Terms of Use', description: 'Terms governing use of enduringadvantage.com and related advisory information.', priority: '0.3', changefreq: 'yearly' },
] as const;

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function absoluteUrl(value: string) {
  return value.startsWith('http://') || value.startsWith('https://') ? value : `${SITE_URL}${value}`;
}

function routeUrl(route: string) {
  return `${SITE_URL}${route}`;
}

const activeArticles = IS_COMING_SOON ? [] : articles;
const activePublicPages = IS_COMING_SOON
  ? [{ path: '/', title: 'Coming Soon', description: 'Enduring Advantage is refining its website. Please check back shortly.', priority: '0.1', changefreq: 'yearly' }]
  : publicPages;

const articleSeo = Object.fromEntries(
  activeArticles.map((article) => [
    `/articles/${article.slug}`,
    {
      title: article.title,
      description: article.subtitle,
      image: absoluteUrl(article.ogImage ?? article.heroImage),
      ogImageAlt: article.heroAlt,
      ogType: 'article',
      publishedTime: article.date,
      modifiedTime: article.updatedAt ?? LASTMOD,
      author: article.author,
      authorTitle: article.authorTitle,
      authorBio: article.authorBio,
      authorPhoto: article.authorPhoto,
      authorUrl: article.authorUrl,
      authorLinkedIn: article.authorLinkedIn,
      section: article.category,
      tags: article.tags ?? [],
      sources: article.sources ?? [],
    },
  ]),
);

const generatedSeo = `// This file is generated by scripts/generate-discovery.ts. Do not edit manually.\n\nexport const GENERATED_ARTICLE_SEO = ${JSON.stringify(articleSeo, null, 2)} as const;\n`;
fs.writeFileSync(path.join(PROJECT_ROOT, 'server', 'generatedArticleSeo.ts'), generatedSeo, 'utf8');

const sitemapPages = activePublicPages.map((page) => `  <url>\n    <loc>${routeUrl(page.path)}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`);
const sitemapArticles = activeArticles.map((article) => {
  const image = absoluteUrl(article.ogImage ?? article.heroImage);
  return `  <url>\n    <loc>${routeUrl(`/articles/${article.slug}`)}</loc>\n    <lastmod>${article.updatedAt ?? LASTMOD}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n    <image:image>\n      <image:loc>${escapeXml(image)}</image:loc>\n      <image:title>${escapeXml(article.title)}</image:title>\n      <image:caption>${escapeXml(article.subtitle)}</image:caption>\n    </image:image>\n  </url>`;
});
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n  <!-- Generated from the active public route and article inventories. -->\n  <!-- Do not list legacy redirect, thank-you, quiz, or error routes here. -->\n\n${[...sitemapPages, ...sitemapArticles].join('\n\n')}\n\n</urlset>\n`;
fs.writeFileSync(path.join(PROJECT_ROOT, 'client', 'public', 'sitemap.xml'), sitemap, 'utf8');

const pageInventory = activePublicPages
  .filter((page) => !['/privacy-policy', '/terms'].includes(page.path))
  .map((page) => `- [${page.title}](${routeUrl(page.path)}): ${page.description}`)
  .join('\n');
const articleInventory = activeArticles
  .map((article) => `- [${article.title}](${routeUrl(`/articles/${article.slug}`)}): ${article.excerpt}`)
  .join('\n');
const llms = IS_COMING_SOON
  ? `# Enduring Advantage\n\n> Enduring Advantage is refining its website. Please check back shortly.\n\n## Website\n\n- [Enduring Advantage](https://enduringadvantage.com/)\n- Language: Canadian English (en-CA)\n`
  : `# Enduring Advantage\n\n> Software enabled, managed sustainability decision support for CFOs and operating leaders.\n\nEnduring Advantage finds the sustainability moves that pay best, helps customers deliver them in the right order, and reports savings and environmental results as work proceeds. The firm combines Energy Advantage’s 30 years of experience collecting and managing client data, the Catalys-developed actio decision platform, and human-led delivery support.\n\nThe firm is vendor-neutral by structure. It does not install equipment, sell products, or take referral fees. Its advisory fee is a retainer plus a share of verified results; Coach and specialist time is passed through at cost. Enduring Advantage is the delivery company and integrator. Catalys develops and owns actio, which is licensed to Enduring Advantage at a channel rate.\n\n## Canonical Discovery Files\n\n- [Website](https://enduringadvantage.com/)\n- [XML Sitemap](https://enduringadvantage.com/sitemap.xml)\n- [Robots Directives](https://enduringadvantage.com/robots.txt)\n- Language: Canadian English (en-CA)\n\n## Public Pages\n\n${pageInventory}\n\n## Articles and Research\n\n${articleInventory}\n\n## Topics\n\nSustainability investment, financial return, capital planning, operating data, energy management, decarbonisation, water, waste, pollution, biodiversity, nature risk, natural capital, climate risk, supply-chain risk, strategic location, extreme-weather exposure, Scope 1/2/3 emissions, green finance, procurement, fleet, buildings, industrial operations, transportation, and channel partnerships.\n\n## Contact\n\n- Website: https://enduringadvantage.com\n- Email: partnerships@enduringadvantage.com\n- Phone: 1-800-697-3456\n- Address: 5515 North Service Road, Suite 303, Burlington, ON, L7L 6G4, Canada\n- [Book a 30-minute triage](https://calendar.app.google/ozpmtufXwN4uhE2r6)\n`;
fs.writeFileSync(path.join(PROJECT_ROOT, 'client', 'public', 'llms.txt'), llms, 'utf8');

console.log(`Generated discovery files for ${activePublicPages.length} public pages and ${activeArticles.length} active articles.`);

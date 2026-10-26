import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
import * as esbuild from 'esbuild';

const require = createRequire(import.meta.url);
const root = '/home/ubuntu/enduring-advantage';
const srcRoot = path.join(root, 'client/src');
const exportPath = path.join(root, 'reports/reserve-site-content-2026-10-10.json');

const pages = [
  ['Home', '/', 'pages/Home.tsx'],
  ['Services', '/services', 'pages/Services.tsx'],
  ['About', '/about', 'pages/About.tsx'],
  ['Contact', '/contact', 'pages/Contact.tsx'],
  ['Diagnostic', '/diagnostic', 'pages/Diagnostic.tsx'],
  ['Scorecard', '/scorecard', 'pages/Scorecard.tsx'],
  ['Partners', '/partners', 'pages/Partners.tsx'],
  ['Partner Application Thank You', '/partners/thank-you', 'pages/PartnersThankYou.tsx'],
  ['Coach Model', '/coach-model', 'pages/CoachModel.tsx'],
  ['Questions', '/questions', 'pages/Questions.tsx'],
  ['Articles Index', '/articles', 'pages/Articles.tsx'],
  ['Article Detail Template', '/articles/:slug', 'pages/ArticleDetail.tsx'],
  ['Author Page Template', '/articles/author/:slug', 'pages/AuthorPage.tsx'],
  ['Sustainability Playing Field', '/playing-field', 'pages/PlayingField.tsx'],
  ['actio Platform', '/actio', 'pages/Actio.tsx'],
  ['Hiring & Advisory Research Hub', '/articles/topic/hiring-advisory', 'pages/HiringAdvisory.tsx'],
  ['Supply Chain Research Hub', '/articles/topic/supply-chain', 'pages/SupplyChain.tsx'],
  ['Checklist Thank You', '/checklist/thank-you', 'pages/ChecklistThankYou.tsx'],
  ['Privacy Policy', '/privacy-policy', 'pages/PrivacyPolicy.tsx'],
  ['Terms of Use', '/terms', 'pages/Terms.tsx'],
  ['Not Found', '/404', 'pages/NotFound.tsx'],
];

const sharedSources = [
  ['Primary navigation', 'components/Navigation.tsx'],
  ['Footer and consultation CTA', 'components/Footer.tsx'],
  ['Cookie consent', 'components/CookieConsent.tsx'],
  ['Sustainability matrix', 'components/SustainabilityMatrix.tsx'],
  ['actio explainer', 'components/ActioExplainer.tsx'],
  ['Playing Field option cloud', 'components/PlayingFieldOptionCloud.tsx'],
  ['Home-page topic cloud', 'components/TopicCloud.tsx'],
  ['Mobile consultation bar', 'components/MobileConsultationBar.tsx'],
  ['Sector meeting checklist', 'components/SectorMeetingChecklist.tsx'],
  ['Author reading route', 'components/AuthorReadingRoute.tsx'],
  ['Author related reading', 'components/AuthorRelatedReading.tsx'],
];

const editorialKeys = new Set([
  'title', 'description', 'subtitle', 'excerpt', 'body', 'content', 'question', 'answer',
  'q', 'a', 'label', 'heading', 'name', 'copy', 'text', 'message', 'caption', 'placeholder',
  'kicker', 'eyebrow', 'summary', 'tagline', 'alt', 'attribution', 'aria-label', 'tooltip',
]);
const ignoredPropertyKeys = new Set([
  'className', 'href', 'src', 'style', 'color', 'background', 'fontFamily', 'fontSize',
  'fontWeight', 'lineHeight', 'padding', 'margin', 'width', 'height', 'transition', 'transform',
  'border', 'boxShadow', 'animation', 'zIndex', 'display', 'position', 'target', 'rel',
]);

function clean(text) {
  return text
    .replace(/\r/g, '')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function staticText(node) {
  if (!node) return '';
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) return `${node.head.text}${node.templateSpans.map((span) => `[dynamic: ${staticText(span.literal)}]`).join('')}`;
  if (ts.isJsxText(node)) return node.getText();
  if (ts.isJsxExpression(node)) return staticText(node.expression);
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) return staticText(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) return `${staticText(node.left)}${staticText(node.right)}`;
  if (ts.isConditionalExpression(node)) return `${staticText(node.whenTrue)} ${staticText(node.whenFalse)}`;
  return '';
}

function isEditorial(text) {
  const value = clean(text);
  if (!value || value.length < 2) return false;
  if (/^(https?:|\/|#|rgba\(|oklch\(|var\(|linear-gradient\(|translate|scale\(|rotate\(|M\d)/i.test(value)) return false;
  if (/\.(png|jpe?g|webp|svg|pdf|ico)(\?|$)/i.test(value)) return false;
  if (/^(mailto:|tel:)/i.test(value)) return false;
  if (/^(flex|grid|block|inline|none|absolute|relative|sticky|fixed|hidden|visible)$/i.test(value)) return false;
  if (/^(font-|bg-|text-|px-|py-|mx-|my-|gap-|rounded-|hover:|focus:|animate-)/.test(value)) return false;
  return /[A-Za-z]/.test(value);
}

function tagName(node) {
  const opening = node.openingElement;
  return opening && ts.isIdentifier(opening.tagName) ? opening.tagName.text.toLowerCase() : '';
}
function jsxText(node) {
  return clean(node.children.map((child) => {
    if (ts.isJsxText(child)) return child.getText();
    if (ts.isJsxExpression(child)) return staticText(child.expression);
    if (ts.isJsxElement(child) || ts.isJsxFragment(child)) return jsxText(child);
    return '';
  }).join(' '));
}
function propertyName(node) {
  if (!ts.isPropertyAssignment(node) && !ts.isShorthandPropertyAssignment(node)) return '';
  return node.name.getText().replace(/['"]/g, '');
}
function extractCopy(relativePath) {
  const filePath = path.join(srcRoot, relativePath);
  const source = fs.readFileSync(filePath, 'utf8');
  const ast = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const output = [];
  const seen = new Set();
  const add = (kind, value) => {
    const text = clean(value);
    const key = `${kind}:${text}`;
    if (!isEditorial(text) || seen.has(key)) return;
    seen.add(key);
    output.push({ kind, text });
  };
  function visit(node) {
    if (ts.isJsxElement(node)) {
      const tag = tagName(node);
      const text = jsxText(node);
      if (/^h[1-6]$/.test(tag)) add(tag.toUpperCase(), text);
      else if (['p', 'li', 'blockquote', 'figcaption'].includes(tag)) add('Copy', text);
      else if (['button', 'a'].includes(tag)) add('CTA or link', text);
      else if (['label', 'legend'].includes(tag)) add('Form label', text);
    }
    if (ts.isPropertyAssignment(node)) {
      const key = propertyName(node);
      if (editorialKeys.has(key) && !ignoredPropertyKeys.has(key)) {
        const text = staticText(node.initializer);
        if (text) add(key[0].toUpperCase() + key.slice(1), text);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return output;
}

function loadModule(stem) {
  const input = path.join(srcRoot, 'lib', `${stem}.ts`);
  const out = `/tmp/reserve-site-review-${stem}.cjs`;
  esbuild.buildSync({ entryPoints: [input], bundle: true, platform: 'node', format: 'cjs', outfile: out, logLevel: 'silent' });
  delete require.cache[out];
  return require(out);
}

const articlesData = loadModule('articlesData');
const icp = loadModule('icpPageData');
const matrix = loadModule('matrixData');
const checklist = loadModule('checklistData');
const legacy = loadModule('data');

const pagesExport = pages.map(([name, route, source]) => ({
  name,
  route,
  source,
  status: 'Reserved for restoration',
  copy: extractCopy(source),
}));

const sharedExport = sharedSources.map(([name, source]) => ({ name, source, copy: extractCopy(source) }));
const audiencePages = Object.values(icp.icpPages);
const reviewArticles = articlesData.campbellArticlesHeldForReview.map((article) => ({ ...article, reviewStatus: 'Held for editorial review' }));
const activeArticles = articlesData.articles.map((article) => ({ ...article, reviewStatus: 'Published in the reserve framework' }));

const payload = {
  generatedAt: '2026-10-10',
  scope: 'Dormant full-site framework only. The temporary Coming Soon holding page is deliberately excluded.',
  currentPublicationStatus: {
    mode: 'coming-soon',
    note: 'All current public routes are gated behind the temporary holding page. The material in this export is the full framework preserved for later restoration.',
  },
  routes: [
    ...pagesExport,
    ...audiencePages.map((page) => ({
      name: page.navLabel,
      route: page.route,
      source: 'pages/IcpLandingPages.tsx + lib/icpPageData.ts',
      status: 'Reserved for restoration',
      copy: [],
      audiencePage: page,
    })),
    { name: 'Legacy supplier directory', route: '/suppliers', source: 'App.tsx', status: 'Redirects to /playing-field on restoration', copy: [] },
    { name: 'Legacy investment case', route: '/investment-case', source: 'App.tsx', status: 'Redirects to /services on restoration', copy: [] },
    { name: 'Legacy case studies', route: '/case-studies/:slug', source: 'pages/CaseStudy.tsx', status: 'Redirects to the home page on restoration', copy: extractCopy('pages/CaseStudy.tsx') },
  ],
  shared: sharedExport,
  articleLibrary: {
    publishedInReserveFramework: activeArticles,
    heldForEditorialReview: reviewArticles,
  },
  sustainabilityPlayingField: {
    columns: matrix.COLUMNS,
    cellMeta: matrix.CELL_META,
    sectors: matrix.MATRIX_SECTORS,
    optionCloudTopics: legacy.topics,
    externalResearchCards: legacy.articles,
  },
  checklist: {
    pdfVariants: checklist.CHECKLIST_PDF_VARIANTS,
    roleOptions: checklist.CHECKLIST_ROLE_OPTIONS,
  },
};

fs.mkdirSync(path.dirname(exportPath), { recursive: true });
fs.writeFileSync(exportPath, JSON.stringify(payload, null, 2));
console.log(`Wrote ${exportPath}`);
console.log(`Routes: ${payload.routes.length}; active articles: ${activeArticles.length}; held articles: ${reviewArticles.length}; audience pages: ${audiencePages.length}.`);

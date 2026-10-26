import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = '/home/ubuntu/enduring-advantage';
const srcRoot = path.join(root, 'client/src');
const outputPath = path.join(root, 'editable-site-content.md');

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
  ['Privacy Policy', '/privacy-policy', 'pages/PrivacyPolicy.tsx'],
  ['Terms of Use', '/terms', 'pages/Terms.tsx'],
  ['Not Found', '/404', 'pages/NotFound.tsx'],
];

const sharedSources = [
  ['Navigation', 'components/Navigation.tsx'],
  ['Footer and Consultation CTA', 'components/Footer.tsx'],
  ['Cookie Consent', 'components/CookieConsent.tsx'],
  ['Sustainability Playing Field', 'components/SustainabilityMatrix.tsx'],
  ['actio Explainer', 'components/ActioExplainer.tsx'],
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
  if (ts.isTemplateExpression(node)) {
    return `${node.head.text}${node.templateSpans.map((span) => `[… ]${staticText(span.literal)}`).join('')}`;
  }
  if (ts.isJsxText(node)) return node.getText();
  if (ts.isJsxExpression(node)) return staticText(node.expression);
  if (ts.isParenthesizedExpression(node)) return staticText(node.expression);
  if (ts.isAsExpression(node)) return staticText(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    return `${staticText(node.left)}${staticText(node.right)}`;
  }
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
    if (ts.isJsxSelfClosingElement(child)) return '';
    return '';
  }).join(' '));
}

function propertyName(node) {
  if (!ts.isPropertyAssignment(node) && !ts.isShorthandPropertyAssignment(node)) return '';
  return node.name.getText().replace(/['"]/g, '');
}

function extractPageCopy(relativePath) {
  const filePath = path.join(srcRoot, relativePath);
  if (!fs.existsSync(filePath)) return [];
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
      else if (['p', 'li', 'blockquote', 'figcaption'].includes(tag)) add('COPY', text);
      else if (['button', 'a'].includes(tag)) add('CTA / LINK', text);
      else if (['label', 'legend'].includes(tag)) add('FORM LABEL', text);
    }

    if (ts.isPropertyAssignment(node)) {
      const key = propertyName(node);
      if (editorialKeys.has(key) && !ignoredPropertyKeys.has(key)) {
        const text = staticText(node.initializer);
        if (text) add(key.toUpperCase(), text);
      }
    }

    ts.forEachChild(node, visit);
  }
  visit(ast);
  return output;
}

function markdownEscape(text) {
  return text.replace(/\n{3,}/g, '\n\n').trim();
}

function formatCopy(items) {
  if (!items.length) return '_No static editorial copy was identified in this source file._\n';
  return items.map(({ kind, text }) => {
    if (/^H[1-6]$/.test(kind)) return `### ${markdownEscape(text)}`;
    if (kind === 'CTA / LINK') return `> **CTA / link:** ${markdownEscape(text)}`;
    if (kind === 'FORM LABEL') return `> **Form label:** ${markdownEscape(text)}`;
    if (kind === 'TITLE' || kind === 'DESCRIPTION' || kind === 'SUBTITLE' || kind === 'EXCERPT') return `> **${kind.toLowerCase()}:** ${markdownEscape(text)}`;
    return markdownEscape(text);
  }).join('\n\n');
}

function property(objectNode, key) {
  const prop = objectNode.properties?.find((item) => ts.isPropertyAssignment(item) && propertyName(item) === key);
  return prop ? staticText(prop.initializer) : '';
}

function arrayProperty(objectNode, key) {
  const prop = objectNode.properties?.find((item) => ts.isPropertyAssignment(item) && propertyName(item) === key);
  return prop && ts.isArrayLiteralExpression(prop.initializer) ? prop.initializer.elements : [];
}

function exportArticles() {
  const relativePath = 'lib/articlesData.ts';
  const filePath = path.join(srcRoot, relativePath);
  const source = fs.readFileSync(filePath, 'utf8');
  const ast = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let articlesArray = null;
  const find = (node) => {
    if (ts.isVariableDeclaration(node) && node.name.getText() === 'articles' && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      articlesArray = node.initializer;
    }
    ts.forEachChild(node, find);
  };
  find(ast);
  if (!articlesArray) return '_Article data could not be located._\n';

  const entries = [];
  for (const item of articlesArray.elements) {
    if (!ts.isObjectLiteralExpression(item)) continue;
    const title = property(item, 'title') || 'Untitled article';
    const slug = property(item, 'slug');
    const meta = [
      ['URL', slug ? `/articles/${slug}` : ''],
      ['Category', property(item, 'category')],
      ['Author', property(item, 'author')],
      ['Author title', property(item, 'authorTitle')],
      ['Date', property(item, 'date')],
      ['Read time', property(item, 'readTime')],
    ].filter(([, value]) => value);
    entries.push(`## ${title}\n\n${meta.map(([key, value]) => `**${key}:** ${value}`).join('  \n')}`);
    for (const [label, value] of [['Subtitle', property(item, 'subtitle')], ['Excerpt', property(item, 'excerpt')], ['Author bio', property(item, 'authorBio')]]) {
      if (value) entries.push(`**${label}:** ${markdownEscape(value)}`);
    }
    const sections = arrayProperty(item, 'sections');
    if (sections.length) {
      entries.push('### Article body');
      for (const section of sections) {
        if (!ts.isObjectLiteralExpression(section)) continue;
        const type = property(section, 'type') || 'body';
        const content = property(section, 'content');
        const attribution = property(section, 'attribution');
        if (content) entries.push(type === 'subheading' ? `#### ${content}` : `${type === 'pullquote' ? '> ' : ''}${markdownEscape(content)}${attribution ? `\n\n> — ${attribution}` : ''}`);
        const stats = arrayProperty(section, 'stats');
        for (const stat of stats) {
          if (ts.isObjectLiteralExpression(stat)) entries.push(`**${property(stat, 'value')}** — ${property(stat, 'label')}`);
        }
      }
    }
    const faqs = arrayProperty(item, 'faq');
    if (faqs.length) {
      entries.push('### Article FAQs');
      for (const faq of faqs) {
        if (ts.isObjectLiteralExpression(faq)) entries.push(`**Q: ${property(faq, 'question')}**\n\n${property(faq, 'answer')}`);
      }
    }
  }
  return entries.join('\n\n---\n\n');
}

const sections = [];
sections.push(`# Enduring Advantage — Editable Website Content\n\n> **Export date:** ${new Date().toISOString().slice(0, 10)}  \n> **Purpose:** This is a copy-editing export of the current public website. Each public route is marked clearly so you can revise wording before changes are applied to the site.\n\n## Route index\n\n| Page | URL |\n|---|---|\n${pages.map(([name, url]) => `| ${name} | ${url} |`).join('\n')}`);

for (const [name, url, source] of pages) {
  sections.push(`# ${name}\n\n**URL:** \`${url}\`\n\n${formatCopy(extractPageCopy(source))}`);
}

sections.push(`# Shared site content\n\nThis section contains reusable navigation, footer, consultation CTA, consent, and methodology copy that may appear on more than one page.`);
for (const [name, source] of sharedSources) {
  sections.push(`## ${name}\n\n${formatCopy(extractPageCopy(source))}`);
}

sections.push(`# Article library\n\nEach article is listed separately below, including its metadata, body copy, pull quotes, stat labels, and article-specific FAQs.\n\n${exportArticles()}`);

sections.push(`# Route notes\n\n- \`/investment-case\` is a legacy route that redirects visitors to \`/services\`.\n- \`/case-studies/:slug\` is retained only to redirect legacy case-study URLs to the Home page. It has no independent editable page copy.\n- \`/articles/:slug\` and \`/articles/author/:slug\` use the article library and author data above.\n- The booking URL, Formspree configuration, supplier records, analytics labels, and styling tokens are intentionally excluded from this copy-editing document.`);

fs.writeFileSync(outputPath, `${sections.join('\n\n---\n\n')}\n`, 'utf8');
console.log(`Wrote ${outputPath}`);

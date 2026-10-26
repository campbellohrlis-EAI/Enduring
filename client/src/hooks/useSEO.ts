// =============================================================================
// ENDURING ADVANTAGE, useSEO Hook
// Manages per-page meta tags, Open Graph, Twitter Card, JSON-LD structured data
// and canonical URLs for Google and AI search engine discoverability
// =============================================================================

import { useEffect } from 'react';

const SITE_URL = 'https://enduringadvantage.com';
const SITE_NAME = 'Enduring Advantage';
const DEFAULT_DESCRIPTION =
  'Enduring Advantage helps large customers and supply chain partners turn environmental pressure into a commercial advantage. We identify what is material, build a human-tested plan, and quarterback delivery.';
const DEFAULT_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/105529065/LmEg7noYisctrGYUzQzRKZ/og-share-image_e1f37039.png';
const TWITTER_HANDLE = '@EnduringAdvantage';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    tags?: string[];
    section?: string;
  };
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  let el = document.querySelector<HTMLScriptElement>('script[data-seo="json-ld"]');
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('data-seo', 'json-ld');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath = '/',
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  article,
  jsonLd,
  noIndex = false,
}: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title
      ? title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | The Right Things in the Right Order`;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    // ── Document title ──────────────────────────────────────────────────────
    document.title = fullTitle;

    // ── Core meta ───────────────────────────────────────────────────────────
    setMeta('description', description);
    if (noIndex) {
      setMeta('robots', 'noindex, nofollow');
    } else {
      setMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    // ── Canonical ───────────────────────────────────────────────────────────
    setLink('canonical', canonicalUrl);

    // ── Open Graph ──────────────────────────────────────────────────────────
    setMeta('og:type', ogType, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:locale', 'en_CA', true);

    if (ogType === 'article' && article) {
      setMeta('article:published_time', article.publishedTime, true);
      if (article.modifiedTime) setMeta('article:modified_time', article.modifiedTime, true);
      setMeta('article:author', article.author, true);
      if (article.section) setMeta('article:section', article.section, true);
      (article.tags ?? []).forEach((tag, i) => {
        let el = document.querySelector<HTMLMetaElement>(`meta[property="article:tag"][data-idx="${i}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute('property', 'article:tag');
          el.setAttribute('data-idx', String(i));
          document.head.appendChild(el);
        }
        el.setAttribute('content', tag);
      });
    }

    // ── Twitter Card ────────────────────────────────────────────────────────
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', TWITTER_HANDLE);
    setMeta('twitter:creator', TWITTER_HANDLE);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // ── JSON-LD structured data ──────────────────────────────────────────────
    if (jsonLd) {
      setJsonLd(jsonLd);
    }
  }, [title, description, canonicalPath, ogImage, ogType, article, jsonLd, noIndex]);
}

// ── Pre-built structured data helpers ────────────────────────────────────────

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Enduring Advantage',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-512.png`,
  description: DEFAULT_DESCRIPTION,
  sameAs: [
    'https://www.linkedin.com/company/enduring-advantage-inc/',
    'https://twitter.com/EnduringAdvantage',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'partnerships@enduringadvantage.com',
    telephone: '+1-800-697-3456',
  },
  areaServed: ['CA', 'US', 'GB'],
  knowsAbout: [
    'Sustainability Advisory',
    'ESG Strategy',
    'Net Zero Planning',
    'Carbon Accounting',
    'Sustainability Decision Intelligence',
    'Scope 3 Emissions',
    'Green Finance Structuring',
    'Natural Capital',
    'Operational Savings',
    'actio Decision Engine',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
};

export function articleSchema(article: {
  title: string;
  subtitle: string;
  author: string;
  authorTitle?: string;
  authorBio?: string;
  authorPhoto?: string;
  authorUrl?: string;
  authorLinkedIn?: string;
  date: string;
  updatedAt?: string;
  slug: string;
  heroImage: string;
  tags?: string[];
  category: string;
  sources?: { label: string; url: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.subtitle,
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: article.authorTitle,
      description: article.authorBio,
      url: article.authorUrl ? `${SITE_URL}${article.authorUrl}` : undefined,
      sameAs: article.authorLinkedIn ? [article.authorLinkedIn] : undefined,
      image: article.authorPhoto ? `${SITE_URL}${article.authorPhoto}` : undefined,
      worksFor: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon-512.png`,
      },
    },
    datePublished: article.date,
    dateModified: article.updatedAt ?? article.date,
    image: article.heroImage,
    url: `${SITE_URL}/articles/${article.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/articles/${article.slug}`,
    },
    articleSection: article.category,
    keywords: (article.tags ?? []).join(', '),
    citation: article.sources?.map((source) => ({
      '@type': 'CreativeWork',
      name: source.label,
      url: source.url,
    })),
    about: {
      '@type': 'Thing',
      name: 'Sustainability Advisory',
    },
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

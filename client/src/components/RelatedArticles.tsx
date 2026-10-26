// ENDURING ADVANTAGE, Related article cards
// Design reminder: financial-editorial reading path, never fabricated proof or outcomes.

import { Link } from 'wouter';
import { ArrowRight, Clock } from 'lucide-react';
import type { Article } from '@/lib/articlesData';

export default function RelatedArticles({
  articles,
  kicker = 'Further reading',
  title = 'Research for the decision in front of you.',
  archiveHref = '/articles',
  archiveLabel = 'Explore all research',
}: {
  articles: Article[];
  kicker?: string;
  title?: string;
  archiveHref?: string;
  archiveLabel?: string;
}) {
  if (!articles.length) return null;

  return (
    <section style={{ background: '#0D3349', padding: 'clamp(4rem, 7vw, 6rem) 0' }}>
      <div className="container">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between" style={{ marginBottom: '2.25rem' }}>
          <div style={{ maxWidth: '650px' }}>
            <p style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>
              {kicker}
            </p>
            <h2 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.8vw, 3.1rem)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.1, margin: '0.65rem 0 0' }}>
              {title}
            </h2>
          </div>
          <Link href={archiveHref} className="inline-flex items-center gap-1.5" style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {archiveLabel} <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <article key={article.slug} className="group flex h-full flex-col transition-transform duration-200 hover:-translate-y-1" style={{ background: 'rgba(250,247,242,0.05)', border: '1px solid rgba(201,168,76,0.28)', padding: '1.45rem' }}>
              <div className="flex items-center justify-between gap-3" style={{ marginBottom: '0.9rem' }}>
                <span style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{article.category}</span>
                <span className="inline-flex items-center gap-1" style={{ color: 'rgba(250,247,242,0.5)', fontFamily: 'var(--font-body)', fontSize: '0.72rem', whiteSpace: 'nowrap' }}><Clock size={12} /> {article.readTime}</span>
              </div>
              <h3 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 600, lineHeight: 1.15, margin: 0 }}>{article.title}</h3>
              <p style={{ color: 'rgba(250,247,242,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.91rem', lineHeight: 1.62, margin: '0.8rem 0 1.2rem' }}>{article.excerpt}</p>
              <Link href={`/articles/${article.slug}`} className="mt-auto inline-flex items-center gap-1.5" style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.83rem', fontWeight: 700, textDecoration: 'none' }}>
                Read the article <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from 'wouter';
import { ArrowRight, Clock } from 'lucide-react';
import type { Article } from '@/lib/articlesData';

export default function AuthorRelatedReading({ authorName, articles }: { authorName: string; articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section style={{ background: 'var(--color-slate-deep)', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ gap: '1rem', marginBottom: '1.75rem' }}>
          <div>
            <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em', margin: '0 0 0.65rem', textTransform: 'uppercase' }}>Continue the research</p>
            <h2 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', lineHeight: 1.08, margin: 0 }}>Related climate-risk reading</h2>
          </div>
          <p style={{ color: 'rgba(250,247,242,0.66)', fontFamily: 'var(--font-body)', fontSize: '0.87rem', lineHeight: 1.6, margin: 0, maxWidth: '380px' }}>
            Additional research selected for readers following {authorName}’s work on physical exposure and resilient capital decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1px', background: 'rgba(201,168,76,0.38)', border: '1px solid rgba(201,168,76,0.38)' }}>
          {articles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} style={{ background: 'rgba(250,247,242,0.04)', color: 'inherit', display: 'flex', flexDirection: 'column', minHeight: '265px', padding: '1.35rem', textDecoration: 'none', transition: 'background 180ms cubic-bezier(0.23, 1, 0.32, 1), transform 180ms cubic-bezier(0.23, 1, 0.32, 1)' }} onMouseEnter={(event) => { event.currentTarget.style.background = 'rgba(250,247,242,0.1)'; event.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseLeave={(event) => { event.currentTarget.style.background = 'rgba(250,247,242,0.04)'; event.currentTarget.style.transform = 'translateY(0)'; }}>
              <p style={{ color: '#F0D070', fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', margin: '0 0 0.7rem', textTransform: 'uppercase' }}>{article.category}</p>
              <h3 style={{ color: '#FAF7F2', fontFamily: 'var(--font-display)', fontSize: '1.33rem', lineHeight: 1.12, margin: '0 0 0.8rem' }}>{article.title}</h3>
              <p style={{ color: 'rgba(250,247,242,0.68)', fontFamily: 'var(--font-body)', fontSize: '0.8rem', lineHeight: 1.55, margin: '0 0 1rem' }}>{article.excerpt}</p>
              <div style={{ alignItems: 'center', color: '#C9A84C', display: 'flex', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 800, gap: '0.35rem', marginTop: 'auto' }}>
                <Clock size={13} aria-hidden="true" /> {article.readTime} <span style={{ marginLeft: 'auto', alignItems: 'center', display: 'inline-flex', gap: '0.3rem' }}>Read <ArrowRight size={13} aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

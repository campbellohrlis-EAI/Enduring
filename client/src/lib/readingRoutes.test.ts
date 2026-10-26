import { describe, expect, it } from 'vitest';
import { getCompletedReadingRouteArticleSlugs, getReadingRoutesForArticle, markReadingRouteArticleComplete } from './readingRoutes';

function createStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  };
}

describe('author reading-route progress', () => {
  it('maps Rob’s two research articles to the climate-risk route', () => {
    expect(getReadingRoutesForArticle('why-global-warming-is-accelerating')).toEqual([
      expect.objectContaining({ id: 'rob-climate-risk', authorSlug: 'rob-kirkby' }),
    ]);
    expect(getReadingRoutesForArticle('the-oceans-are-taking-the-heat')).toEqual([
      expect.objectContaining({ id: 'rob-climate-risk', authorSlug: 'rob-kirkby' }),
    ]);
  });

  it('records only valid route articles and returns private completion progress', () => {
    const storage = createStorage();

    expect(markReadingRouteArticleComplete('rob-climate-risk', 'why-global-warming-is-accelerating', storage)).toEqual([
      'why-global-warming-is-accelerating',
    ]);
    expect(markReadingRouteArticleComplete('rob-climate-risk', 'not-a-route-article', storage)).toEqual([
      'why-global-warming-is-accelerating',
    ]);
    expect(markReadingRouteArticleComplete('rob-climate-risk', 'the-oceans-are-taking-the-heat', storage)).toEqual([
      'why-global-warming-is-accelerating',
      'the-oceans-are-taking-the-heat',
    ]);
    expect(getCompletedReadingRouteArticleSlugs('rob-climate-risk', storage)).toHaveLength(2);
  });

  it('ignores malformed or stale completion values', () => {
    const storage = createStorage({
      'enduring-advantage:reading-route-completions': JSON.stringify({
        'rob-climate-risk': ['why-global-warming-is-accelerating', 'stale-route-item'],
      }),
    });

    expect(getCompletedReadingRouteArticleSlugs('rob-climate-risk', storage)).toEqual([
      'why-global-warming-is-accelerating',
    ]);
  });
});

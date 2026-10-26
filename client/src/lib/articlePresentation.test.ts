import { describe, expect, it } from 'vitest';
import { createEmailShareDetails, createLinkedInReadyPost, createXReadyPost, formatArticleDate, getArticleCanonicalPath, getArticleShareUrl, getTrackedArticleShareUrl, getTrackedPageShareUrl } from './articlePresentation';

describe('article presentation helpers', () => {
  it('formats ISO editorial dates in Canadian English', () => {
    expect(formatArticleDate('2026-09-22')).toBe('22 September 2026');
  });

  it('preserves an unrecognised date instead of inventing a timestamp', () => {
    expect(formatArticleDate('reviewed soon')).toBe('reviewed soon');
  });

  it('creates a canonical article path and share URL without query parameters', () => {
    expect(getArticleCanonicalPath('from-thousands-of-options-to-one-decision')).toBe('/articles/from-thousands-of-options-to-one-decision');
    expect(getArticleShareUrl('from-thousands-of-options-to-one-decision')).toBe('https://enduringadvantage.com/articles/from-thousands-of-options-to-one-decision');
    expect(getArticleShareUrl('from-thousands-of-options-to-one-decision', 'https://enduringadvantage.com')).toBe('https://enduringadvantage.com/articles/from-thousands-of-options-to-one-decision');
  });

  it('adds unambiguous campaign attribution to article share URLs', () => {
    expect(getTrackedArticleShareUrl('seven-of-nine', 'linkedin')).toBe('https://enduringadvantage.com/articles/seven-of-nine?utm_source=linkedin&utm_medium=social&utm_campaign=article_share&utm_content=seven-of-nine');
    expect(getTrackedArticleShareUrl('seven-of-nine', 'copy_link')).toBe('https://enduringadvantage.com/articles/seven-of-nine?utm_source=copy_link&utm_medium=share&utm_campaign=article_share&utm_content=seven-of-nine');
  });

  it('adds social attribution to a shareable author reading route without losing its anchor', () => {
    expect(getTrackedPageShareUrl('/articles/author/rob-kirkby#rob-reading-route', 'linkedin', {
      campaign: 'reading_route',
      content: 'rob-climate-risk',
    })).toBe('https://enduringadvantage.com/articles/author/rob-kirkby?utm_source=linkedin&utm_medium=social&utm_campaign=reading_route&utm_content=rob-climate-risk#rob-reading-route');
  });

  it('creates a LinkedIn-ready post from approved article context', () => {
    const post = createLinkedInReadyPost({
      slug: 'seven-of-nine',
      title: 'Seven of Nine',
      excerpt: 'Every one of the seven breached boundaries is at its worst level on record.',
      tags: ['Climate Risk', 'CFO Strategy'],
    });

    expect(post).toContain('Seven of Nine');
    expect(post).toContain('Every one of the seven breached boundaries is at its worst level on record.');
    expect(post).toContain('utm_source=linkedin');
    expect(post).toContain('#ClimateRisk #CFOStrategy');
  });

  it('creates an X-ready post that stays within the composer character limit', () => {
    const post = createXReadyPost({
      title: 'Seven of Nine',
      excerpt: 'Every one of the seven breached boundaries is at its worst level on record. The decision field is not short of possible responses, but it is short of a clear next action.',
      tags: ['Climate Risk', 'CFO Strategy'],
    });

    expect(post.length).toBeLessThanOrEqual(256);
    expect(post).toContain('Seven of Nine');
    expect(post).toContain('#ClimateRisk #CFOStrategy');
  });

  it('creates a tracked email subject and body from article context', () => {
    const email = createEmailShareDetails({
      slug: 'seven-of-nine',
      title: 'Seven of Nine',
      excerpt: 'Every one of the seven breached boundaries is at its worst level on record.',
    });

    expect(email.subject).toBe('Worth a read: Seven of Nine');
    expect(email.body).toContain('Seven of Nine');
    expect(email.body).toContain('utm_source=email');
    expect(email.body).toContain('utm_medium=share');
  });
});

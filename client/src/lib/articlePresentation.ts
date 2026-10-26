export type ArticleShareChannel = 'linkedin' | 'x' | 'email' | 'copy_link' | 'copy_excerpt' | 'native_share';

const SHARE_ATTRIBUTION: Record<ArticleShareChannel, { source: string; medium: string }> = {
  linkedin: { source: 'linkedin', medium: 'social' },
  x: { source: 'x', medium: 'social' },
  email: { source: 'email', medium: 'share' },
  copy_link: { source: 'copy_link', medium: 'share' },
  copy_excerpt: { source: 'linkedin_post', medium: 'social' },
  native_share: { source: 'native_share', medium: 'share' },
};

export function formatArticleDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return isoDate;

  const monthName = new Intl.DateTimeFormat('en-CA', {
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));

  return `${day} ${monthName} ${year}`;
}

export function getArticleCanonicalPath(slug: string) {
  return `/articles/${slug}`;
}

export function getArticleShareUrl(slug: string, origin?: string) {
  const siteOrigin = origin ?? 'https://enduringadvantage.com';
  return `${siteOrigin}${getArticleCanonicalPath(slug)}`;
}

export function getTrackedArticleShareUrl(
  slug: string,
  channel: ArticleShareChannel,
  origin?: string,
) {
  const attribution = SHARE_ATTRIBUTION[channel];
  const url = new URL(getArticleShareUrl(slug, origin));

  url.searchParams.set('utm_source', attribution.source);
  url.searchParams.set('utm_medium', attribution.medium);
  url.searchParams.set('utm_campaign', 'article_share');
  url.searchParams.set('utm_content', slug);

  return url.toString();
}

export function getTrackedPageShareUrl(
  path: string,
  channel: Extract<ArticleShareChannel, 'linkedin' | 'x'>,
  options: { campaign: string; content: string; origin?: string },
) {
  const attribution = SHARE_ATTRIBUTION[channel];
  const url = new URL(path, options.origin ?? 'https://enduringadvantage.com');

  url.searchParams.set('utm_source', attribution.source);
  url.searchParams.set('utm_medium', attribution.medium);
  url.searchParams.set('utm_campaign', options.campaign);
  url.searchParams.set('utm_content', options.content);

  return url.toString();
}

function toHashtag(tag: string) {
  const normalized = tag.replace(/[^A-Za-z0-9]+/g, '');
  return normalized ? `#${normalized}` : '';
}

export function createLinkedInReadyPost({
  slug,
  title,
  excerpt,
  tags,
}: {
  slug: string;
  title: string;
  excerpt?: string;
  tags?: string[];
}) {
  const lead = excerpt?.trim() || `A new Enduring Advantage perspective on ${title}.`;
  const hashtags = (tags ?? []).slice(0, 3).map(toHashtag).filter(Boolean);
  const tagLine = hashtags.length > 0 ? hashtags.join(' ') : '#Sustainability #CapitalAllocation';

  return `${title}\n\n${lead}\n\nRead the full perspective: ${getTrackedArticleShareUrl(slug, 'linkedin')}\n\n${tagLine}`;
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  const shortened = value.slice(0, Math.max(0, maxLength - 1));
  const lastSpace = shortened.lastIndexOf(' ');
  return `${(lastSpace > 0 ? shortened.slice(0, lastSpace) : shortened).trim()}…`;
}

export function createXReadyPost({
  title,
  excerpt,
  tags,
}: {
  title: string;
  excerpt?: string;
  tags?: string[];
}) {
  const tagLine = (tags ?? []).slice(0, 2).map(toHashtag).filter(Boolean).join(' ');
  const lead = excerpt?.trim() || `A new Enduring Advantage perspective on ${title}.`;
  const suffix = tagLine ? `\n\n${tagLine}` : '';
  const availableLeadLength = Math.max(60, 250 - title.length - suffix.length - 4);

  return `${title}\n\n${truncateText(lead, availableLeadLength)}${suffix}`;
}

export function createEmailShareDetails({
  slug,
  title,
  excerpt,
}: {
  slug: string;
  title: string;
  excerpt?: string;
}) {
  const subject = `Worth a read: ${title}`;
  const body = [
    'I thought you might find this Enduring Advantage research useful.',
    '',
    title,
    excerpt?.trim() || 'A practical perspective on the next sustainability decision.',
    '',
    `Read the full article: ${getTrackedArticleShareUrl(slug, 'email')}`,
  ].join('\n');

  return { subject, body };
}

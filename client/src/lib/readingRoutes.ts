export type ReadingRoute = {
  id: string;
  authorSlug: string;
  anchor: string;
  label: string;
  heading: string;
  intro: string;
  articles: { slug: string; note: string }[];
};

export const AUTHOR_READING_ROUTES: Record<string, ReadingRoute> = {
  'campbell-ohrlis': {
    id: 'campbell-start-here',
    authorSlug: 'campbell-ohrlis',
    anchor: 'start-here',
    label: 'A reading route',
    heading: 'Start here. Then follow the decision.',
    intro: 'Four pieces that move from the financial premise to a practical, accountable next action.',
    articles: [
      { slug: 'sustainability-is-not-a-cost-centre', note: 'Start with the financial logic behind a better environmental decision.' },
      { slug: 'which-solution-works-here', note: 'Learn how to narrow thousands of options to the decision that belongs first.' },
      { slug: 'how-sustainability-consultants-help-improve-your-supply-chain', note: 'Screen supply-chain exposure and commercial leverage before you ask suppliers for more data.' },
      { slug: 'how-fast-can-you-know-what-to-do-next', note: 'Turn a working set into an accountable action, without waiting for a perfect brief.' },
    ],
  },
  'rob-kirkby': {
    id: 'rob-climate-risk',
    authorSlug: 'rob-kirkby',
    anchor: 'rob-reading-route',
    label: 'Rob’s climate-risk reading route',
    heading: 'Understand the system. Then price the exposure.',
    intro: 'Two linked reads that move from the drivers of faster warming to the ocean heat signal accumulating beneath it, so capital and resilience decisions reflect the conditions assets will face.',
    articles: [
      { slug: 'why-global-warming-is-accelerating', note: 'Begin with the emissions and feedbacks that are accelerating physical climate exposure.' },
      { slug: 'the-oceans-are-taking-the-heat', note: 'Then examine why ocean heat is a system-level signal for risk, resilience, and long-lived assets.' },
    ],
  },
};

const READING_ROUTE_STORAGE_KEY = 'enduring-advantage:reading-route-completions';
type CompletionStore = Record<string, string[]>;
type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

function getBrowserStorage(): StorageLike | null {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getRouteById(routeId: string) {
  return Object.values(AUTHOR_READING_ROUTES).find((route) => route.id === routeId);
}

function readCompletionStore(storage = getBrowserStorage()): CompletionStore {
  if (!storage) return {};

  try {
    const parsed = JSON.parse(storage.getItem(READING_ROUTE_STORAGE_KEY) ?? '{}') as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).flatMap(([routeId, slugs]) => (
        Array.isArray(slugs) && slugs.every((slug) => typeof slug === 'string')
          ? [[routeId, slugs] as const]
          : []
      )),
    );
  } catch {
    return {};
  }
}

export function getCompletedReadingRouteArticleSlugs(routeId: string, storage = getBrowserStorage()) {
  const route = getRouteById(routeId);
  if (!route) return [];

  const routeSlugs = new Set(route.articles.map((article) => article.slug));
  return (readCompletionStore(storage)[routeId] ?? []).filter((slug) => routeSlugs.has(slug));
}

export function markReadingRouteArticleComplete(routeId: string, articleSlug: string, storage = getBrowserStorage()) {
  const route = getRouteById(routeId);
  if (!route || !storage || !route.articles.some((article) => article.slug === articleSlug)) {
    return getCompletedReadingRouteArticleSlugs(routeId, storage);
  }

  const store = readCompletionStore(storage);
  const completed = new Set(store[routeId] ?? []);
  completed.add(articleSlug);
  store[routeId] = Array.from(completed);

  try {
    storage.setItem(READING_ROUTE_STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Reading-route progress is a private convenience. A blocked local store must not interrupt reading.
  }

  return getCompletedReadingRouteArticleSlugs(routeId, storage);
}

export function getReadingRoutesForArticle(articleSlug: string) {
  return Object.values(AUTHOR_READING_ROUTES).filter((route) => (
    route.articles.some((article) => article.slug === articleSlug)
  ));
}

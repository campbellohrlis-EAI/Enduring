// =============================================================================
// ENDURING ADVANTAGE, useBookmarks hook
// Persists a reading list of saved article slugs to localStorage.
// =============================================================================

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ea_bookmarks';

export interface BookmarkedArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  savedAt: number; // epoch ms
}

function load(): BookmarkedArticle[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BookmarkedArticle[];
  } catch {
    return [];
  }
}

function save(items: BookmarkedArticle[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage full or unavailable, fail silently
  }
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>(load);

  // Keep localStorage in sync whenever state changes
  useEffect(() => {
    save(bookmarks);
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.some((b) => b.slug === slug),
    [bookmarks],
  );

  const addBookmark = useCallback((article: Omit<BookmarkedArticle, 'savedAt'>) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.slug === article.slug)) return prev;
      return [{ ...article, savedAt: Date.now() }, ...prev];
    });
  }, []);

  const removeBookmark = useCallback((slug: string) => {
    setBookmarks((prev) => prev.filter((b) => b.slug !== slug));
  }, []);

  const toggleBookmark = useCallback(
    (article: Omit<BookmarkedArticle, 'savedAt'>) => {
      setBookmarks((prev) => {
        if (prev.some((b) => b.slug === article.slug)) {
          return prev.filter((b) => b.slug !== article.slug);
        }
        return [{ ...article, savedAt: Date.now() }, ...prev];
      });
    },
    [],
  );

  return { bookmarks, isBookmarked, addBookmark, removeBookmark, toggleBookmark };
}

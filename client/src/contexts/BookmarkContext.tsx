// =============================================================================
// ENDURING ADVANTAGE, Bookmark Context
// Manages the user's reading list with localStorage persistence
// =============================================================================

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Article } from '@/lib/data';

interface BookmarkContextValue {
  bookmarks: Article[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (article: Article) => void;
  clearBookmarks: () => void;
}

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

const STORAGE_KEY = 'ea-bookmarks';

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever bookmarks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
      // storage full or unavailable, silently ignore
    }
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((b) => b.id === id),
    [bookmarks]
  );

  const toggleBookmark = useCallback((article: Article) => {
    setBookmarks((prev) =>
      prev.some((b) => b.id === article.id)
        ? prev.filter((b) => b.id !== article.id)
        : [article, ...prev]
    );
  }, []);

  const clearBookmarks = useCallback(() => setBookmarks([]), []);

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, clearBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error('useBookmarks must be used inside BookmarkProvider');
  return ctx;
}

'use client';

import { useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Bookmark } from '@/lib/types';

export function useBookmarks() {
  const { bookmarks, addBookmark, removeBookmark, isBookmarked, loadBookmarks } =
    useAppStore();

  const toggleBookmark = useCallback(
    (surahId: number, pageNumber: number) => {
      if (isBookmarked(surahId, pageNumber)) {
        removeBookmark(surahId, pageNumber);
      } else {
        const bookmark: Bookmark = {
          surahId,
          pageNumber,
          timestamp: Date.now(),
        };
        addBookmark(bookmark);
      }
    },
    [isBookmarked, removeBookmark, addBookmark]
  );

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    loadBookmarks,
  };
}

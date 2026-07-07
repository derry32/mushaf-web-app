'use client';

import { useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Bookmark } from '@/lib/types';

export function useBookmarks() {
  const { bookmarks, addBookmark, removeBookmark, isBookmarked, loadBookmarks } =
    useAppStore();

  const toggleBookmark = useCallback(
    (surahId: number, pageNumber: number) => {
      const { showToast } = useAppStore.getState();

      if (isBookmarked(surahId, pageNumber)) {
        removeBookmark(surahId, pageNumber);
        showToast(`Penanda halaman ${pageNumber} dihapus`);
      } else {
        const bookmark: Bookmark = {
          surahId,
          pageNumber,
          timestamp: Date.now(),
        };
        addBookmark(bookmark);
        showToast(`Halaman ${pageNumber} ditandai`);
      }

      // Haptic feedback
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
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

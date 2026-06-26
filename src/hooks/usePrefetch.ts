'use client';

import { useCallback, useRef } from 'react';
import { buildPageUrl } from '@/lib/constants';

/**
 * Pre-fetches adjacent mushaf pages (N-1 and N+1) into browser cache
 * using Image() constructor for zero-lag navigation.
 */
export function usePrefetch() {
  const prefetchedPages = useRef<Set<number>>(new Set());

  const prefetchPage = useCallback((pageNumber: number) => {
    if (prefetchedPages.current.has(pageNumber)) return;

    const img = new Image();
    img.src = buildPageUrl(pageNumber);
    prefetchedPages.current.add(pageNumber);
  }, []);

  const prefetchAdjacent = useCallback(
    (currentPage: number, startPage: number, endPage: number) => {
      // Pre-fetch next page
      if (currentPage + 1 <= endPage) {
        prefetchPage(currentPage + 1);
      }
      // Pre-fetch previous page
      if (currentPage - 1 >= startPage) {
        prefetchPage(currentPage - 1);
      }
    },
    [prefetchPage]
  );

  const clearCache = useCallback(() => {
    prefetchedPages.current.clear();
  }, []);

  return { prefetchPage, prefetchAdjacent, clearCache };
}

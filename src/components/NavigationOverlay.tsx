'use client';

import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { getSurahById } from '@/lib/constants';
import BookmarkButton from './BookmarkButton';
import ThemeToggle from './ThemeToggle';
import { useEffect, useRef } from 'react';

interface NavigationOverlayProps {
  surahId: number;
  currentPage: number;
  startPage: number;
  endPage: number;
}

export default function NavigationOverlay({
  surahId,
  currentPage,
  startPage,
  endPage,
}: NavigationOverlayProps) {
  const showOverlay = useAppStore((s) => s.showOverlay);
  const setShowOverlay = useAppStore((s) => s.setShowOverlay);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const surah = getSurahById(surahId);
  const totalPages = endPage - startPage + 1;
  const currentIndex = currentPage - startPage + 1;

  // Auto-hide overlay after 4 seconds
  useEffect(() => {
    if (showOverlay) {
      timerRef.current = setTimeout(() => {
        setShowOverlay(false);
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showOverlay, setShowOverlay]);

  return (
    <div
      className={`absolute inset-0 z-50 pointer-events-none transition-opacity duration-300
                  ${showOverlay ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top bar */}
      <div
        className={`absolute top-0 left-0 right-0 pointer-events-auto
                    bg-overlay backdrop-blur-md border-b border-card-border/50
                    transition-transform duration-300
                    ${showOverlay ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex items-center justify-between px-4 py-3 safe-top">
          {/* Back button */}
          <Link
            href="/"
            id="nav-back-home"
            className="flex h-10 w-10 items-center justify-center rounded-xl
                       bg-card border border-card-border text-foreground
                       transition-all duration-200 hover:bg-accent/10 hover:text-accent active:scale-90"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>

          {/* Surah title */}
          <div className="text-center flex-1 mx-4">
            <h2 className="text-sm font-semibold text-foreground truncate">
              {surah?.name_latin || 'Mushaf'}
            </h2>
            <p className="text-xs text-muted">
              {surah?.name_arabic}
            </p>
          </div>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 pointer-events-auto
                    bg-overlay backdrop-blur-md border-t border-card-border/50
                    transition-transform duration-300
                    ${showOverlay ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex items-center justify-between px-4 py-3 safe-bottom">
          {/* Page indicator */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">
              {currentPage}
            </span>
            <div className="flex-1 h-1.5 w-24 sm:w-40 rounded-full bg-card-border overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: `${(currentIndex / totalPages) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted">
              {currentIndex}/{totalPages}
            </span>
          </div>

          {/* Bookmark button */}
          <BookmarkButton surahId={surahId} pageNumber={currentPage} />
        </div>
      </div>
    </div>
  );
}

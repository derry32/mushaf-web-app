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
  onPageSelect: (page: number) => void;
  onBackClick: () => void;
  isTwoPageView?: boolean;
}

export default function NavigationOverlay({
  surahId,
  currentPage,
  startPage,
  endPage,
  onPageSelect,
  onBackClick,
  isTwoPageView = false,
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
          <button
            onClick={onBackClick}
            id="nav-back-home"
            className="flex h-10 w-10 items-center justify-center rounded-xl
                       bg-card border border-card-border text-foreground
                       transition-all duration-200 hover:bg-accent/10 hover:text-accent active:scale-90"
            aria-label="Kembali ke Beranda"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>

          {/* Surah title */}
          <div className="text-center flex-1 mx-4">
            <h2 className="text-sm font-semibold text-foreground truncate">
              {surah?.name_latin || 'Mushaf'}
            </h2>
            <p className="text-xs text-muted">
              {surah?.name_arabic}
            </p>
          </div>

          {/* Toggles (Bookmarks & Theme) */}
          <div className="flex items-center gap-2">
            <Link
              href="/bookmarks"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-card-border text-foreground hover:bg-accent/10 hover:text-accent transition-all duration-200 active:scale-90"
              aria-label="Daftar Penanda"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </Link>
            <ThemeToggle />
          </div>
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
            <span className="text-sm font-medium text-foreground min-w-[3rem] text-right">
              {isTwoPageView && currentPage < endPage 
                ? `${currentPage}-${currentPage + 1}` 
                : currentPage}
            </span>
            <div className="flex-1 relative h-6 sm:w-40 flex items-center group">
              <input
                type="range"
                min={startPage}
                max={endPage}
                step={isTwoPageView ? 2 : 1}
                value={currentPage}
                onChange={(e) => onPageSelect(Number(e.target.value))}
                className="w-full h-1.5 bg-card-border rounded-full appearance-none cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-accent/50
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-4
                           [&::-webkit-slider-thumb]:h-4
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:bg-accent
                           [&::-webkit-slider-thumb]:shadow-md
                           transition-all"
                dir="rtl" // RTL for slider to match Swiper dir
                aria-label="Pilih Halaman"
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

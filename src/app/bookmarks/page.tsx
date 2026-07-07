'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBookmarks } from '@/hooks/useBookmarks';
import { getSurahById } from '@/lib/constants';

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark, loadBookmarks } = useBookmarks();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadBookmarks();
    setIsLoaded(true);
  }, [loadBookmarks]);

  // Sort bookmarks by timestamp (newest first)
  const sortedBookmarks = [...bookmarks].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-overlay backdrop-blur-md border-b border-card-border/50">
        <div className="mx-auto max-w-2xl px-4 py-4 flex items-center justify-between safe-top">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-card-border text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Daftar Penanda</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-4 py-6 space-y-4 pb-12">
        {!isLoaded ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        ) : sortedBookmarks.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Belum ada penanda</h2>
            <p className="text-sm text-muted">
              Halaman yang Anda tandai saat membaca akan muncul di sini.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {sortedBookmarks.map((bookmark) => {
              const surah = getSurahById(bookmark.surahId);
              const date = new Date(bookmark.timestamp).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <div
                  key={`${bookmark.surahId}-${bookmark.pageNumber}`}
                  className="flex items-center justify-between gap-4 p-4 bg-card border border-card-border rounded-2xl animate-fade-in-up"
                >
                  <Link
                    href={`/read/${bookmark.surahId}?page=${bookmark.pageNumber}`}
                    className="flex-1 min-w-0 group"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                        {surah?.name_latin || 'Juz Amma'}
                      </span>
                      <span className="text-xs text-muted/60">•</span>
                      <span className="text-xs text-muted">{date}</span>
                    </div>
                    <p className="text-2xl font-arabic text-foreground/80">
                      {surah?.name_arabic}
                    </p>
                    <p className="text-sm text-accent mt-1">
                      Halaman {bookmark.pageNumber}
                    </p>
                  </Link>

                  <button
                    onClick={() => toggleBookmark(bookmark.surahId, bookmark.pageNumber)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    aria-label="Hapus penanda"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

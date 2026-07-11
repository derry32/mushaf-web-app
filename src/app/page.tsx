'use client';

import { useEffect } from 'react';
import SurahCard from '@/components/SurahCard';
import LastReadBanner from '@/components/LastReadBanner';
import ThemeToggle from '@/components/ThemeToggle';
import { useAppStore } from '@/store/useAppStore';
import { SURAT_PILIHAN, JUZ_AMMA_META, JUZ_AMMA_SURAHS } from '@/lib/constants';
import Link from 'next/link';

export default function HomePage() {
  const { loadLastRead, loadBookmarks } = useAppStore();

  // Load persisted state on mount
  useEffect(() => {
    loadLastRead();
    loadBookmarks();
  }, [loadLastRead, loadBookmarks]);

  return (
    <div className="min-h-dvh">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-40 bg-overlay backdrop-blur-md border-b border-card-border/50">
        <div className="mx-auto max-w-2xl px-4 py-4 flex items-center justify-between safe-top">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              سُوَرٌ مُخْتَارَةٌ
            </h1>
            <p className="text-sm text-muted mt-0.5">Surat Pilihan &amp; Juz &lsquo;Amma</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="mx-auto max-w-2xl px-4 py-6 space-y-6 pb-12">
        {/* Bismillah */}
        <div className="text-center mb-2 animate-fade-in-up">
          <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-card border border-card-border shadow-sm shadow-accent/5">
            <span className="text-lg font-arabic text-foreground/90">
              بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيْمِ
            </span>
          </div>
        </div>

        {/* Last Read Banner */}
        <LastReadBanner />

        {/* ===== SURAT PILIHAN SECTION ===== */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-6 w-1 rounded-full bg-accent" />
            <h2 className="text-lg font-semibold text-foreground">Surat Pilihan</h2>
          </div>

          <div className="grid gap-3">
            {SURAT_PILIHAN.map((surah, index) => (
              <div key={surah.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms` }}>
                <SurahCard surah={surah} index={index} />
              </div>
            ))}
          </div>
        </section>

        {/* ===== JUZ AMMA SECTION ===== */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-6 w-1 rounded-full bg-accent" />
            <h2 className="text-lg font-semibold text-foreground">Juz &lsquo;Amma</h2>
          </div>

          {/* Juz Amma main entry card */}
          <Link
            href="/read/juz-amma"
            id="juz-amma-card"
            className="group relative block overflow-hidden rounded-2xl border border-accent/30
                       bg-gradient-to-br from-accent/10 via-accent/5 to-transparent
                       transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-accent/15
                       active:scale-[0.99] mb-4 animate-fade-in-up"
            style={{ animationDelay: '320ms' }}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl
                                  bg-accent/20 text-accent font-bold text-lg
                                  transition-colors group-hover:bg-accent group-hover:text-white">
                    30
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {JUZ_AMMA_META.name_latin}
                    </h3>
                    <p className="text-sm text-muted">
                      {JUZ_AMMA_META.total_surahs} Surat • Hal {JUZ_AMMA_META.start_page}–{JUZ_AMMA_META.end_page}
                    </p>
                  </div>
                </div>
                <span className="text-3xl font-arabic text-accent/80 leading-none">
                  {JUZ_AMMA_META.name_arabic}
                </span>
              </div>

              {/* Quick info chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                 bg-accent/10 text-accent text-xs font-medium">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  Baca dari awal
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full
                                 bg-card border border-card-border text-muted text-xs">
                  An-Naba&apos; → An-Nas
                </span>
              </div>
            </div>
          </Link>

          {/* Expandable list of individual surahs */}
          <details className="group/details">
            <summary className="cursor-pointer list-none flex items-center gap-2 text-sm text-muted
                                hover:text-accent transition-colors mb-3 select-none">
              <svg className="w-4 h-4 transition-transform group-open/details:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              Lihat daftar {JUZ_AMMA_META.total_surahs} surat
            </summary>

            <div className="grid gap-2 pl-1">
              {JUZ_AMMA_SURAHS.map((surah, index) => (
                <Link
                  key={surah.id}
                  href={`/read/${surah.id}`}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl
                             border border-card-border bg-card
                             transition-all duration-200 hover:border-accent/30 hover:bg-accent/5
                             active:scale-[0.98] animate-fade-in-up"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg
                                     bg-accent/10 text-accent text-xs font-medium">
                      {surah.id}
                    </span>
                    <span className="text-sm font-medium text-foreground truncate">
                      {surah.name_latin}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-base font-arabic text-foreground/70">
                      {surah.name_arabic}
                    </span>
                    <span className="text-xs text-muted">
                      {surah.total_verses} ayat
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </details>
        </section>

      </main>
    </div>
  );
}

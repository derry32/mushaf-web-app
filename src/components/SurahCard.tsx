'use client';

import Link from 'next/link';
import { Surah } from '@/lib/types';

interface SurahCardProps {
  surah: Surah;
  index: number;
}

export default function SurahCard({ surah, index }: SurahCardProps) {
  return (
    <Link
      href={`/read/${surah.id}`}
      id={`surah-card-${surah.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-card-border bg-card
                 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/10
                 active:scale-[0.98]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Accent gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-light
                      opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="p-5 sm:p-6">
        {/* Header row: number badge + Arabic name */}
        <div className="flex items-center justify-between mb-4">
          {/* Number badge */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl
                          bg-accent/10 text-accent font-semibold text-sm
                          transition-colors group-hover:bg-accent group-hover:text-white">
            {surah.id}
          </div>

          {/* Arabic name */}
          <h3 className="text-2xl sm:text-3xl font-arabic text-foreground leading-none">
            {surah.name_arabic}
          </h3>
        </div>

        {/* Latin name */}
        <h4 className="text-lg font-semibold text-foreground mb-2">
          {surah.name_latin}
        </h4>

        {/* Meta info row */}
        <div className="flex items-center gap-3 text-sm text-muted">
          <span className="inline-flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {surah.total_verses} Ayat
          </span>
          <span className="w-1 h-1 rounded-full bg-muted/50" />
          <span>{surah.revelation_type}</span>
          <span className="w-1 h-1 rounded-full bg-muted/50" />
          <span>Hal {surah.start_page}–{surah.end_page}</span>
        </div>
      </div>

      {/* Bottom gradient on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-accent/5 to-transparent
                      opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
}

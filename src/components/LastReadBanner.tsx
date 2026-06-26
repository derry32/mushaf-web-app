'use client';

import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { getSurahById } from '@/lib/constants';

export default function LastReadBanner() {
  const lastRead = useAppStore((s) => s.lastRead);

  if (!lastRead) return null;

  const surah = getSurahById(lastRead.surahId);
  const timeAgo = getTimeAgo(lastRead.timestamp);

  return (
    <Link
      href={`/read/${lastRead.surahId}?page=${lastRead.pageNumber}`}
      id="last-read-banner"
      className="group relative block overflow-hidden rounded-2xl border border-accent/30
                 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent
                 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
    >
      <div className="flex items-center gap-4 p-4 sm:p-5">
        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl
                        bg-accent/20 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted mb-0.5">Lanjutkan membaca</p>
          <p className="text-base font-semibold text-foreground truncate">
            {surah?.name_latin || lastRead.surahName} — Halaman {lastRead.pageNumber}
          </p>
          <p className="text-xs text-muted mt-0.5">{timeAgo}</p>
        </div>

        {/* Arrow */}
        <div className="shrink-0 text-accent transition-transform group-hover:translate-x-1">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>

      {/* Animated pulse dot */}
      <div className="absolute top-3 right-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
        </span>
      </div>
    </Link>
  );
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'Baru saja';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit yang lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam yang lalu`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Kemarin';
  return `${days} hari yang lalu`;
}

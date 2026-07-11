'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import MushafViewer from '@/components/MushafViewer';
import { useAppStore } from '@/store/useAppStore';
import { getPageRange, getSurahById, JUZ_AMMA_META } from '@/lib/constants';

function ReaderContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { loadLastRead, loadBookmarks } = useAppStore();

  const surahId = params.surahId as string;
  const initialPage = searchParams.get('page');

  // Load persisted state
  useEffect(() => {
    loadLastRead();
    loadBookmarks();
  }, [loadLastRead, loadBookmarks]);

  // Determine page range
  const isJuzAmma = surahId === 'juz-amma';
  const numericSurahId = isJuzAmma ? 0 : parseInt(surahId, 10);

  const { start, end } = getPageRange(isJuzAmma ? 'juz-amma' : numericSurahId);

  // Get surah info for title
  const surah = isJuzAmma ? null : getSurahById(numericSurahId);
  const title = isJuzAmma ? JUZ_AMMA_META.name_latin : surah?.name_latin || 'Mushaf';

  // Update document title
  useEffect(() => {
    document.title = `${title} — Mushaf Digital`;
  }, [title]);

  return (
    <MushafViewer
      surahId={numericSurahId}
      startPage={start}
      endPage={end}
      initialPage={initialPage ? parseInt(initialPage, 10) : undefined}
    />
  );
}

export default function ReadPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh w-full items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
            <span className="text-sm text-muted">Memuat mushaf...</span>
          </div>
        </div>
      }
    >
      <ReaderContent />
    </Suspense>
  );
}

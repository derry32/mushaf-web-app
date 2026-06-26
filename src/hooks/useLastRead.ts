'use client';

import { useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { LastRead } from '@/lib/types';

export function useLastRead() {
  const { lastRead, setLastRead, loadLastRead } = useAppStore();

  const saveLastRead = useCallback(
    (surahId: number, pageNumber: number, surahName: string) => {
      const entry: LastRead = {
        surahId,
        pageNumber,
        timestamp: Date.now(),
        surahName,
      };
      setLastRead(entry);
    },
    [setLastRead]
  );

  return {
    lastRead,
    saveLastRead,
    loadLastRead,
  };
}

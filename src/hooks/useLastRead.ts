'use client';

import { useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { LastRead } from '@/lib/types';

export function useLastRead() {
  const { lastRead, setLastRead, loadLastRead } = useAppStore();

  const saveLastRead = useCallback(
    (surahId: number, pageNumber: number, surahName: string) => {
      const today = new Date().toISOString().split('T')[0];
      const entry: LastRead = {
        surahId,
        pageNumber,
        timestamp: Date.now(),
        surahName,
        isFinished: false,
        date: today,
      };
      setLastRead(entry);
    },
    [setLastRead]
  );

  const markAsFinished = useCallback(() => {
    if (lastRead) {
      setLastRead({ ...lastRead, isFinished: true });
    }
  }, [lastRead, setLastRead]);

  return {
    lastRead,
    saveLastRead,
    loadLastRead,
    markAsFinished,
  };
}

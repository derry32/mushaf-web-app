'use client';

import { create } from 'zustand';
import { Bookmark, LastRead } from '@/lib/types';

interface AppState {
  // Theme
  theme: 'light' | 'dark' | 'sepia';
  setTheme: (theme: 'light' | 'dark' | 'sepia') => void;
  toggleTheme: () => void;

  // Current reading state
  currentPage: number;
  setCurrentPage: (page: number) => void;

  // Overlay visibility
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
  toggleOverlay: () => void;

  // Bookmarks (persisted to localStorage)
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (surahId: number, pageNumber: number) => void;
  isBookmarked: (surahId: number, pageNumber: number) => boolean;
  loadBookmarks: () => void;

  // Last read (persisted to localStorage)
  lastRead: LastRead | null;
  setLastRead: (lastRead: LastRead) => void;
  loadLastRead: () => void;

  // Toast Notification
  toast: { message: string; isVisible: boolean };
  showToast: (message: string) => void;
  hideToast: () => void;
}

const BOOKMARKS_KEY = 'mushaf-bookmarks';
const LAST_READ_KEY = 'mushaf-last-read';
const THEME_KEY = 'mushaf-theme';

export const useAppStore = create<AppState>((set, get) => ({
  // Theme
  theme: 'light',
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_KEY, theme);
      document.documentElement.classList.remove('light', 'dark', 'theme-sepia');
      if (theme === 'dark') document.documentElement.classList.add('dark');
      if (theme === 'sepia') document.documentElement.classList.add('theme-sepia');
    }
  },
  toggleTheme: () => {
    const current = get().theme;
    const newTheme = current === 'light' ? 'sepia' : current === 'sepia' ? 'dark' : 'light';
    get().setTheme(newTheme);
  },

  // Current reading state
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  // Overlay
  showOverlay: false,
  setShowOverlay: (show) => set({ showOverlay: show }),
  toggleOverlay: () => set((state) => ({ showOverlay: !state.showOverlay })),

  // Bookmarks
  bookmarks: [],
  addBookmark: (bookmark) => {
    const bookmarks = [...get().bookmarks, bookmark];
    set({ bookmarks });
    if (typeof window !== 'undefined') {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
  },
  removeBookmark: (surahId, pageNumber) => {
    const bookmarks = get().bookmarks.filter(
      (b) => !(b.surahId === surahId && b.pageNumber === pageNumber)
    );
    set({ bookmarks });
    if (typeof window !== 'undefined') {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
  },
  isBookmarked: (surahId, pageNumber) => {
    return get().bookmarks.some(
      (b) => b.surahId === surahId && b.pageNumber === pageNumber
    );
  },
  loadBookmarks: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      if (stored) {
        try {
          set({ bookmarks: JSON.parse(stored) });
        } catch {
          set({ bookmarks: [] });
        }
      }
    }
  },

  // Last read
  lastRead: null,
  setLastRead: (lastRead) => {
    set({ lastRead });
    if (typeof window !== 'undefined') {
      localStorage.setItem(LAST_READ_KEY, JSON.stringify(lastRead));
    }
  },
  loadLastRead: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LAST_READ_KEY);
      if (stored) {
        try {
          set({ lastRead: JSON.parse(stored) });
        } catch {
          set({ lastRead: null });
        }
      }

      // Load theme preference
      const savedTheme = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | 'sepia' | null;
      if (savedTheme) {
        set({ theme: savedTheme });
        document.documentElement.classList.remove('light', 'dark', 'theme-sepia');
        if (savedTheme === 'dark') document.documentElement.classList.add('dark');
        if (savedTheme === 'sepia') document.documentElement.classList.add('theme-sepia');
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        set({ theme: 'dark' });
        document.documentElement.classList.add('dark');
      }
    }
  },

  // Toast
  toast: { message: '', isVisible: false },
  showToast: (message) => set({ toast: { message, isVisible: true } }),
  hideToast: () => set((state) => ({ toast: { ...state.toast, isVisible: false } })),
}));

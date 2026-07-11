'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Saat SSR / sebelum mount, render seolah-olah light mode untuk mencegah hydration mismatch
  const currentTheme = mounted ? theme : 'light';

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl
                 bg-card border border-card-border text-foreground
                 transition-all duration-300 hover:bg-accent/10 hover:text-accent
      active:scale-90"
      aria-label={`Ganti tema (Saat ini: ${currentTheme})`}
    >
      {/* Sun icon (Light) */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-500
                    ${currentTheme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>

      {/* Book icon (Sepia) */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-500
                    ${currentTheme === 'sepia' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>

      {/* Moon icon (Dark) */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-500
                    ${currentTheme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>

      {/* Star/Sparkles icon (Emerald) */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-500
                    ${currentTheme === 'emerald' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-1.81.42l.74 5.345c.08.577-.506 1.003-.997.74l-4.78-2.532a.562.562 0 00-.53 0l-4.78 2.532c-.49.263-1.077-.163-.997-.74l.74-5.345a.563.563 0 00-.181-.42l-4.204-3.602c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    </button>
  );
}

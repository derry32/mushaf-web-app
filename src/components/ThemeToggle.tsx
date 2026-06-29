'use client';

import { useAppStore } from '@/store/useAppStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl
                 bg-card border border-card-border text-foreground
                 transition-all duration-300 hover:bg-accent/10 hover:text-accent
      active:scale-90"
      aria-label={`Ganti tema (Saat ini: ${theme})`}
    >
      {/* Sun icon */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-500
                    ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
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

      {/* Moon icon (Dark) */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-500
                    ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : theme === 'light' ? 'rotate-90 scale-0 opacity-0' : '-rotate-90 scale-0 opacity-0'}`}
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

      {/* Book/Document icon (Sepia) */}
      <svg
        className={`absolute w-5 h-5 transition-all duration-500
                    ${theme === 'sepia' ? 'rotate-0 scale-100 opacity-100' : theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : '-rotate-90 scale-0 opacity-0'}`}
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
    </button>
  );
}

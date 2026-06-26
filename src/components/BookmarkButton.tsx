'use client';

import { useBookmarks } from '@/hooks/useBookmarks';

interface BookmarkButtonProps {
  surahId: number;
  pageNumber: number;
}

export default function BookmarkButton({ surahId, pageNumber }: BookmarkButtonProps) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const active = isBookmarked(surahId, pageNumber);

  return (
    <button
      id={`bookmark-btn-${pageNumber}`}
      onClick={(e) => {
        e.stopPropagation();
        toggleBookmark(surahId, pageNumber);
      }}
      className={`flex h-10 w-10 items-center justify-center rounded-xl border
                   transition-all duration-300 active:scale-90
                   ${active
                     ? 'bg-accent border-accent text-white shadow-lg shadow-accent/30'
                     : 'bg-card border-card-border text-foreground hover:bg-accent/10 hover:text-accent'
                   }`}
      aria-label={active ? 'Hapus penanda' : 'Tandai halaman ini'}
    >
      <svg
        className={`w-5 h-5 transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`}
        fill={active ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    </button>
  );
}

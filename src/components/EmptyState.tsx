import React from 'react';

interface EmptyStateProps {
  type: 'lastRead' | 'bookmark';
}

export default function EmptyState({ type }: EmptyStateProps) {
  const message = type === 'lastRead' 
    ? "Belum ada riwayat bacaan." 
    : "Belum ada halaman yang ditandai.";
    
  return (
    <div className="w-full flex flex-col items-center justify-center p-10 bg-card/40 backdrop-blur-md rounded-2xl border border-card-border/50 text-center animate-fade-in shadow-sm relative overflow-hidden">
      {/* Decorative background pattern */}
      <svg className="absolute inset-0 w-full h-full text-muted/5 opacity-50" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern id="empty-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0L40 20L20 40L0 20Z" fill="currentColor" opacity="0.5"/>
            <circle cx="20" cy="20" r="2" fill="currentColor"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#empty-pattern)" />
      </svg>

      <div className="relative mb-6">
        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full" />
        <svg 
          className="w-20 h-20 text-accent/80 relative z-10 drop-shadow-sm" 
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}
        >
          {type === 'lastRead' ? (
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          ) : (
             <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          )}
        </svg>
      </div>
      <p className="text-sm text-muted mb-2 relative z-10">{message}</p>
      <h3 className="text-xl font-medium text-foreground tracking-tight relative z-10">
        Mulai perjalanan membaca Anda
      </h3>
    </div>
  );
}

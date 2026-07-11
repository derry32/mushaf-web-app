'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { buildPageUrl } from '@/lib/constants';

interface MushafPageProps {
  pageNumber: number;
}

export default function MushafPage({ pageNumber }: MushafPageProps) {
  const theme = useAppStore((s) => s.theme);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageUrl = buildPageUrl(pageNumber);

  return (
    <div
      className="relative flex items-center justify-center w-full h-full select-none"
      style={{ touchAction: 'pinch-zoom' }}
    >
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
            <span className="text-sm text-muted">Memuat halaman {pageNumber}...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center px-8">
            {/* Placeholder mushaf page for development */}
            <div className="w-full max-w-sm aspect-[2/3] rounded-lg border-2 border-dashed border-card-border
                            flex flex-col items-center justify-center gap-3 bg-card/50">
              <svg className="w-16 h-16 text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <div className="text-center">
                <p className="text-xl font-arabic text-foreground/60 mb-1">صفحة {pageNumber}</p>
                <p className="text-sm text-muted">Halaman {pageNumber}</p>
                <p className="text-xs text-muted/60 mt-2">
                  File SVG belum tersedia di Supabase Storage
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actual SVG image */}
      <img
        src={imageUrl}
        alt={`Halaman mushaf ${pageNumber}`}
        className={`max-w-full max-h-full object-contain transition-all duration-300
                    ${theme === 'dark' ? 'mushaf-dark-filter' : theme === 'sepia' ? 'mushaf-sepia-filter' : ''}
                    ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={theme === 'emerald' ? {
          filter: 'invert(1) hue-rotate(130deg) saturate(3) brightness(2.2)',
          mixBlendMode: 'screen'
        } : undefined}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        draggable={false}
      />
    </div>
  );
}

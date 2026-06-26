'use client';

import { useRef, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

import MushafPage from './MushafPage';
import NavigationOverlay from './NavigationOverlay';
import { useAppStore } from '@/store/useAppStore';
import { usePrefetch } from '@/hooks/usePrefetch';
import { useLastRead } from '@/hooks/useLastRead';
import { getSurahById } from '@/lib/constants';
import { useRouter } from 'next/navigation';

interface MushafViewerProps {
  surahId: number;
  startPage: number;
  endPage: number;
  initialPage?: number;
}

export default function MushafViewer({ surahId, startPage, endPage, initialPage }: MushafViewerProps) {
  const router = useRouter();
  const swiperRef = useRef<SwiperType | null>(null);
  const { currentPage, setCurrentPage, toggleOverlay } = useAppStore();
  const { prefetchAdjacent } = usePrefetch();
  const { saveLastRead } = useLastRead();

  const totalPages = endPage - startPage + 1;
  const pages = Array.from({ length: totalPages }, (_, i) => startPage + i);

  // Initial slide index
  const initialSlideIndex = initialPage
    ? Math.max(0, Math.min(initialPage - startPage, totalPages - 1))
    : 0;

  const surah = getSurahById(surahId);
  const surahName = surah?.name_latin || `Surah ${surahId}`;

  // Update current page and trigger pre-fetch
  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const pageIndex = swiper.activeIndex;
      const page = startPage + pageIndex;
      setCurrentPage(page);
      prefetchAdjacent(page, startPage, endPage);
      saveLastRead(surahId, page, surahName);
    },
    [totalPages, startPage, endPage, setCurrentPage, prefetchAdjacent, saveLastRead, surahId, surahName]
  );

  // Set initial page on mount
  useEffect(() => {
    const page = initialPage || startPage;
    setCurrentPage(page);
    prefetchAdjacent(page, startPage, endPage);
  }, [initialPage, startPage, endPage, setCurrentPage, prefetchAdjacent]);

  // Handle tap to toggle overlay
  const handleTap = useCallback(() => {
    toggleOverlay();
  }, [toggleOverlay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/');
        return;
      }
      if (!swiperRef.current) return;
      if (e.key === 'ArrowLeft') {
        swiperRef.current.slideNext(); // RTL: left arrow = next slide (leftwards)
      } else if (e.key === 'ArrowRight') {
        swiperRef.current.slidePrev(); // RTL: right arrow = prev slide (rightwards)
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <div
      className="relative w-full h-dvh bg-background overflow-hidden"
      onClick={handleTap}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        initialSlide={initialSlideIndex}
        dir="rtl"
        slidesPerView={1}
        spaceBetween={0}
        speed={300}
        cssMode={false}
        allowTouchMove={true}
        className="w-full h-full"
      >
        {/* RTL: pages rendered normally, Swiper handles RTL layout */}
        {pages.map((pageNum) => (
          <SwiperSlide key={pageNum} className="flex items-center justify-center">
            <MushafPage pageNumber={pageNum} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation overlay */}
      <NavigationOverlay
        surahId={surahId}
        currentPage={currentPage}
        startPage={startPage}
        endPage={endPage}
      />
    </div>
  );
}

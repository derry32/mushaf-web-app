'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/zoom';

import MushafPage from './MushafPage';
import NavigationOverlay from './NavigationOverlay';
import CompletionModal from './CompletionModal';
import { useAppStore } from '@/store/useAppStore';
import { usePrefetch } from '@/hooks/usePrefetch';
import { useLastRead } from '@/hooks/useLastRead';
import { useWakeLock } from '@/hooks/useWakeLock';
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
  useWakeLock(true); // Keep screen awake while this component is mounted
  
  const swiperRef = useRef<SwiperType | null>(null);
  const [isTwoPageView, setIsTwoPageView] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const { currentPage, setCurrentPage, toggleOverlay } = useAppStore();
  const { prefetchAdjacent } = usePrefetch();
  const { lastRead, saveLastRead, markAsFinished } = useLastRead();

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

  const handlePageSelect = useCallback((page: number) => {
    if (swiperRef.current) {
      const index = page - startPage;
      swiperRef.current.slideTo(index);
    }
  }, [startPage]);

  // Handle tap to toggle overlay
  const handleTap = useCallback((e: React.MouseEvent) => {
    // Only toggle if we are not clicking the modal
    if (!showCompletionModal) {
      toggleOverlay();
    }
  }, [toggleOverlay, showCompletionModal]);

  const handleFinishReading = useCallback(() => {
    markAsFinished();
    router.push('/');
  }, [markAsFinished, router]);

  const handleBackRequest = useCallback(() => {
    // Determine if we are currently at the last slide
    const isAtEnd = swiperRef.current?.isEnd || false;
    
    // Trigger B: Show modal only when clicking back FROM the last page
    if (isAtEnd && !lastRead?.isFinished) {
      setShowCompletionModal(true);
    } else {
      router.push('/');
    }
  }, [router, lastRead?.isFinished]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBackRequest();
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
        modules={[Zoom]}
        zoom={{
          maxRatio: 3,
          minRatio: 1,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        onReachBeginning={() => {
          if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
        }}
        onReachEnd={() => {
          if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
        }}
        initialSlide={initialSlideIndex}
        dir="rtl"
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          }
        }}
        onBreakpoint={(swiper, breakpointParams) => {
          setIsTwoPageView(breakpointParams.slidesPerView === 2);
        }}
        spaceBetween={0}
        speed={300}
        cssMode={false}
        allowTouchMove={true}
        className="w-full h-full"
      >
        {/* RTL: pages rendered normally, Swiper handles RTL layout */}
        {pages.map((pageNum, index) => (
          <SwiperSlide key={pageNum} className="flex items-center justify-center">
            <div className={`swiper-zoom-container relative ${
              isTwoPageView 
                ? (index % 2 === 0 ? 'book-spine-right' : 'book-spine-left') 
                : ''
            }`}>
              <MushafPage pageNumber={pageNum} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation overlay */}
      <NavigationOverlay
        surahId={surahId}
        currentPage={currentPage}
        startPage={startPage}
        endPage={endPage}
        onPageSelect={handlePageSelect}
        onBackClick={handleBackRequest}
        isTwoPageView={isTwoPageView}
      />

      {/* Completion Modal */}
      <CompletionModal 
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onFinish={handleFinishReading}
      />
    </div>
  );
}

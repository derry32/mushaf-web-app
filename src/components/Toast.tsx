'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function Toast() {
  const { toast, hideToast } = useAppStore();

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toast.isVisible, hideToast]);

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 ${
        toast.isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-4 scale-95'
      }`}
    >
      <div className="bg-foreground text-background px-4 py-2 rounded-full shadow-lg shadow-black/10 flex items-center gap-2 text-sm font-medium">
        <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {toast.message}
      </div>
    </div>
  );
}

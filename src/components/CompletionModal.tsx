'use client';

import { useEffect } from 'react';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export default function CompletionModal({ isOpen, onClose, onFinish }: CompletionModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-card rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-scale-in">
        
        {/* Geometric Pattern Header (SVG) */}
        <div className="h-24 bg-accent/10 relative flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full text-accent/20 opacity-50" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0L40 20L20 40L0 20Z" fill="currentColor" opacity="0.3"/>
                <path d="M20 10L30 20L20 30L10 20Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="20" cy="20" r="3" fill="currentColor"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#islamic-pattern)" />
          </svg>
        </div>

        <div className="px-6 py-6 text-center">
          <h3 className="text-xl font-bold text-foreground mb-3 font-serif">
            Khatam / Selesai Membaca?
          </h3>
          <p className="text-sm text-muted mb-8 leading-relaxed">
            Anda telah mencapai halaman terakhir surat ini. Apakah Anda sudah selesai membacanya?
          </p>

          <div className="flex items-center gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-card-border text-foreground font-medium transition-colors hover:bg-accent/5 active:scale-95"
              aria-label="Belum Selesai"
            >
              Belum
            </button>
            <button
              onClick={onFinish}
              className="flex-1 py-3 px-4 rounded-xl bg-accent text-white font-medium shadow-md shadow-accent/20 transition-transform hover:bg-accent-light active:scale-95"
              aria-label="Sudah Selesai"
            >
              Sudah Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

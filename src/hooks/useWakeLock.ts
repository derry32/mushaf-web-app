'use client';

import { useEffect, useRef } from 'react';

export function useWakeLock(isActive: boolean = true) {
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Check if WakeLock API is supported
    if (!('wakeLock' in navigator)) {
      console.log('[WakeLock] API not supported in this browser.');
      return;
    }

    let isMounted = true;

    const requestWakeLock = async () => {
      try {
        if (!isActive) {
          releaseWakeLock();
          return;
        }

        if (wakeLockRef.current) return;

        const wakeLock = await navigator.wakeLock.request('screen');
        
        if (isMounted) {
          wakeLockRef.current = wakeLock;
          console.log('[WakeLock] Screen wake lock activated.');

          wakeLock.addEventListener('release', () => {
            console.log('[WakeLock] Screen wake lock released.');
            wakeLockRef.current = null;
          });
        } else {
          wakeLock.release();
        }
      } catch (err: any) {
        console.error(`[WakeLock] Failed to request: ${err.name}, ${err.message}`);
      }
    };

    const releaseWakeLock = async () => {
      if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
        } catch (err) {
          console.error('[WakeLock] Failed to release:', err);
        }
      }
    };

    // Handle document visibility change
    // When switching tabs, wake lock is automatically released by the browser.
    // We need to re-request it when the user comes back.
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isActive) {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Initial request
    requestWakeLock();

    return () => {
      isMounted = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      releaseWakeLock();
    };
  }, [isActive]);
}

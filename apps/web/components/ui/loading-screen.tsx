'use client';

import React, { useEffect, useState } from 'react';
import { Cross } from 'lucide-react';

const SESSION_KEY = 'qoas_loaded';
const FADE_IN_MS = 600;
const HOLD_MS = 2000;
const FADE_OUT_MS = 550;

/**
 * SacredLoadingScreen
 *
 * Appears immediately on initial page load of each browser session before page content paints.
 * Fades out smoothly, revealing the homepage content with zero FOUC/flash.
 * Subsequent navigations in the same session skip it completely.
 */
export function SacredLoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [entered, setEntered] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    const isAlreadyLoaded =
      !!sessionStorage.getItem(SESSION_KEY) || !!localStorage.getItem(SESSION_KEY);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isAlreadyLoaded || prefersReducedMotion) {
      document.documentElement.classList.remove('qoas-loading');
      sessionStorage.setItem(SESSION_KEY, '1');
      localStorage.setItem(SESSION_KEY, '1');
      setVisible(false);
      return;
    }

    // Ensure qoas-loading is set for smooth sequence
    document.documentElement.classList.add('qoas-loading');
    setVisible(true);

    const enterFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });

    const fadeTimer = setTimeout(() => {
      setFading(true);
      // Remove loading class so main content smoothly fades in via CSS transition
      document.documentElement.classList.remove('qoas-loading');
    }, HOLD_MS);

    const unmountTimer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setVisible(false);
    }, HOLD_MS + FADE_OUT_MS);

    return () => {
      cancelAnimationFrame(enterFrame);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
      document.documentElement.classList.remove('qoas-loading');
    };
  }, []);

  // During SSR or after loading finishes, if not visible return null
  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading Queen of All Saints Church"
      aria-live="polite"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-8"
      style={{
        background:
          'linear-gradient(160deg, hsl(214,75%,8%) 0%, hsl(214,65%,14%) 50%, hsl(214,75%,8%) 100%)',
        opacity: fading ? 0 : entered || !mounted ? 1 : 0,
        transition: fading
          ? `opacity ${FADE_OUT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
          : `opacity ${FADE_IN_MS}ms cubic-bezier(0, 0, 0.2, 1)`,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        aria-hidden="true"
        style={{
          width: 180,
          height: 180,
          background: 'radial-gradient(circle, rgba(201,162,39,0.25) 0%, transparent 70%)',
          animation: 'candle-glow 3s ease-in-out infinite',
        }}
      />

      {/* Cross logo */}
      <div
        className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-2xl"
        aria-hidden="true"
        style={{
          background: 'hsl(214,70%,18%)',
          borderColor: 'hsl(43,69%,47%)',
          boxShadow: '0 0 45px rgba(201,162,39,0.35)',
          animation: 'loader-cross-grow 0.9s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        <Cross className="h-12 w-12 text-amber-300" style={{ color: 'hsl(43,69%,65%)' }} />
      </div>

      {/* Text block */}
      <div className="flex flex-col items-center gap-2 text-center">
        <p
          className="text-2xl font-bold tracking-wide text-white"
          style={{
            fontFamily: "'Playfair Display', serif",
            animation: 'loader-text-rise 0.7s ease-out 0.3s both',
          }}
        >
          Welcome to
        </p>
        <p
          className="text-3xl font-extrabold sm:text-4xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: 'hsl(43,69%,65%)',
            animation: 'loader-text-rise 0.7s ease-out 0.45s both',
          }}
        >
          Queen of All Saints Church
        </p>
        <p
          className="mt-1 text-lg font-bold text-white/85"
          style={{
            fontFamily: "'Noto Sans Tamil', sans-serif",
            animation: 'loader-text-rise 0.7s ease-out 0.6s both',
          }}
          lang="ta"
        >
          அனைத்து புனிதர்களின் அரசி ஆலயம்
        </p>
        <p
          className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-white/60"
          style={{ animation: 'loader-text-rise 0.7s ease-out 0.75s both' }}
        >
          Diocese of Tiruchirappalli
        </p>
      </div>
    </div>
  );
}

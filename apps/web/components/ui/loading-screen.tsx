'use client';

import React, { useEffect, useState } from 'react';
import { Cross } from 'lucide-react';

const SESSION_KEY = 'qoas_loaded';
const FADE_IN_MS = 600;
const HOLD_MS = 2200;
const FADE_OUT_MS = 550;

/**
 * SacredLoadingScreen
 *
 * Shows ONLY on the very first page load of each browser session.
 * Subsequent navigations (clicking menus, etc.) skip it entirely.
 *
 * Uses sessionStorage key 'qoas_loaded' — cleared when the browser tab closes.
 * Respects prefers-reduced-motion.
 */
export function SacredLoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      sessionStorage.setItem(SESSION_KEY, '1');
      return;
    }

    sessionStorage.setItem(SESSION_KEY, '1');
    setVisible(true);

    const enterFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });

    const fadeTimer = setTimeout(() => setFading(true), HOLD_MS);
    const unmountTimer = setTimeout(() => setVisible(false), HOLD_MS + FADE_OUT_MS);

    return () => {
      cancelAnimationFrame(enterFrame);
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading Queen of All Saints Church"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8"
      style={{
        background: 'linear-gradient(160deg, hsl(214,70%,10%) 0%, hsl(214,60%,18%) 100%)',
        opacity: fading ? 0 : entered ? 1 : 0,
        transition: fading
          ? `opacity ${FADE_OUT_MS}ms ease-out`
          : `opacity ${FADE_IN_MS}ms ease-in`,
        pointerEvents: fading || !entered ? 'none' : 'auto',
      }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        aria-hidden="true"
        style={{
          width: 160,
          height: 160,
          background: 'radial-gradient(circle, rgba(201,162,39,0.18) 0%, transparent 70%)',
          animation: 'candle-glow 3s ease-in-out infinite',
        }}
      />

      {/* Cross logo */}
      <div
        className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 shadow-2xl"
        aria-hidden="true"
        style={{
          background: 'hsl(214,70%,20%)',
          borderColor: 'hsl(43,69%,47%)',
          boxShadow: '0 0 40px rgba(201,162,39,0.30)',
          animation: 'loader-cross-grow 0.9s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        <Cross className="text-gold-400 h-12 w-12" style={{ color: 'hsl(43,69%,65%)' }} />
      </div>

      {/* Text block */}
      <div className="flex flex-col items-center gap-2 text-center">
        <p
          className="text-2xl font-bold tracking-wide text-white"
          style={{
            fontFamily: "'Playfair Display', serif",
            animation: 'loader-text-rise 0.7s ease-out 0.5s both',
          }}
        >
          Welcome to
        </p>
        <p
          className="text-3xl font-bold"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: 'hsl(43,69%,65%)',
            animation: 'loader-text-rise 0.7s ease-out 0.65s both',
          }}
        >
          Queen of All Saints Church
        </p>
        <p
          className="mt-1 text-lg font-medium text-white/70"
          style={{
            fontFamily: "'Noto Sans Tamil', sans-serif",
            animation: 'loader-text-rise 0.7s ease-out 0.9s both',
          }}
          lang="ta"
        >
          அனைத்து புனிதர்களின் அரசி ஆலயம்
        </p>
        <p
          className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-white/40"
          style={{ animation: 'loader-text-rise 0.7s ease-out 1.1s both' }}
        >
          Diocese of Tiruchirappalli
        </p>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const SESSION_KEY = 'qoas_loaded';
const FADE_IN_MS = 800;
const HOLD_MS = 3800;
const FADE_OUT_MS = 700;

/**
 * SacredLoadingScreen
 *
 * Displays the official Queen of All Saints parish seal/emblem with a sacred halo,
 * Tamil invocation, and smooth loading progress bar before transitioning to the app.
 */
export function SacredLoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [entered, setEntered] = useState(false);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(12);

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

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 14 + 6);
      });
    }, 350);

    const fadeTimer = setTimeout(() => {
      setProgress(100);
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
      clearInterval(progressInterval);
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
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-8 px-4"
      style={{
        background:
          'radial-gradient(ellipse at center, hsl(214, 65%, 15%) 0%, hsl(214, 75%, 8%) 60%, hsl(214, 85%, 5%) 100%)',
        opacity: fading ? 0 : entered || !mounted ? 1 : 0,
        transition: fading
          ? `opacity ${FADE_OUT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
          : `opacity ${FADE_IN_MS}ms cubic-bezier(0, 0, 0.2, 1)`,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          width: 320,
          height: 320,
          background: 'radial-gradient(circle, rgba(218,165,32,0.22) 0%, rgba(201,162,39,0.08) 50%, transparent 70%)',
          animation: 'candle-glow 3.5s ease-in-out infinite',
        }}
      />

      {/* Official Parish Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        <div
          className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 shadow-2xl p-2.5 transition-all sm:h-36 sm:w-36"
          aria-hidden="true"
          style={{
            background: 'hsl(214, 70%, 16%)',
            borderColor: 'hsl(43, 75%, 52%)',
            boxShadow: '0 0 50px rgba(218, 165, 32, 0.45), 0 0 100px rgba(201, 162, 39, 0.2)',
            animation: 'loader-cross-grow 1s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <Image
            src="/images/logo.png"
            alt="Queen of All Saints Parish Emblem"
            width={130}
            height={130}
            priority
            className="h-full w-full object-contain drop-shadow-md"
          />
        </div>

        {/* Subtle decorative emblem ring */}
        <div
          className="absolute -inset-3 rounded-full border border-gold-400/30 pointer-events-none"
          style={{ animation: 'cross-breathe 3s ease-in-out infinite' }}
        />
      </div>

      {/* Parish Typography & Text Block */}
      <div className="flex flex-col items-center gap-2 text-center max-w-lg">
        <p
          className="text-xs font-extrabold uppercase tracking-[0.3em] text-gold-300/80"
          style={{
            color: 'hsl(43, 75%, 68%)',
            animation: 'loader-text-rise 0.7s ease-out 0.2s both',
          }}
        >
          Diocese of Tiruchirappalli
        </p>

        <h1
          className="text-2xl font-black tracking-tight text-white sm:text-4xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            textShadow: '0 2px 20px rgba(0,0,0,0.6)',
            animation: 'loader-text-rise 0.7s ease-out 0.35s both',
          }}
        >
          Queen of All Saints Church
        </h1>

        <p
          className="text-base font-bold text-amber-200/90 sm:text-lg"
          style={{
            fontFamily: "'Noto Sans Tamil', sans-serif",
            animation: 'loader-text-rise 0.7s ease-out 0.5s both',
          }}
          lang="ta"
        >
          அனைத்து புனிதர்களின் அரசி ஆலயம்
        </p>

        <p
          className="mt-1 text-xs font-semibold text-slate-300/70"
          style={{ animation: 'loader-text-rise 0.7s ease-out 0.65s both' }}
        >
          Crawford, Tiruchirappalli · Digital Parish Portal
        </p>
      </div>

      {/* Loading Progress Bar */}
      <div className="w-56 space-y-2 text-center sm:w-64">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80 border border-slate-700/50">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(43, 85%, 45%) 0%, hsl(43, 95%, 65%) 100%)',
              boxShadow: '0 0 12px rgba(218, 165, 32, 0.7)',
            }}
          />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Loading Sacred Portal... {Math.min(progress, 100)}%
        </p>
      </div>
    </div>
  );
}

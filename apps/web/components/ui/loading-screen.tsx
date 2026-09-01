'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const SESSION_KEY = 'qoas_loaded';
const DURATION_MS = 1400;
const FADE_OUT_MS = 500;

/**
 * SacredLoadingScreen
 *
 * A reverent, Catholic-themed entrance animation for Queen of All Saints Parish.
 * Displays the official Marian parish seal with golden rays, sacred Latin & Tamil invocations,
 * and a smooth golden progress glow.
 */
export function SacredLoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isAlreadyLoaded = !!sessionStorage.getItem(SESSION_KEY);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isAlreadyLoaded || prefersReducedMotion) {
      document.documentElement.classList.remove('qoas-loading');
      setVisible(false);
      return;
    }

    document.documentElement.classList.add('qoas-loading');
    setVisible(true);

    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / DURATION_MS) * 100));
      setProgress(pct);

      if (elapsed < DURATION_MS) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setFading(true);
        document.documentElement.classList.remove('qoas-loading');
        sessionStorage.setItem(SESSION_KEY, '1');

        setTimeout(() => {
          setVisible(false);
        }, FADE_OUT_MS);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove('qoas-loading');
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Welcome to Queen of All Saints Church"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center px-6"
      style={{
        background:
          'radial-gradient(ellipse at 50% 40%, hsl(214, 70%, 14%) 0%, hsl(214, 75%, 8%) 55%, hsl(214, 85%, 4%) 100%)',
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_OUT_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Background Sacred Geometric Halo */}
      <div
        className="pointer-events-none absolute h-[380px] w-[380px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle, rgba(218,165,32,0.4) 0%, rgba(201,162,39,0.15) 50%, transparent 70%)',
          animation: 'candle-glow 4s ease-in-out infinite',
        }}
      />

      {/* Official Parish Logo Container */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer glowing halo ring */}
        <div
          className="pointer-events-none absolute -inset-4 rounded-full border border-gold-400/30"
          style={{ animation: 'cross-breathe 3.5s ease-in-out infinite' }}
        />

        <div
          className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 p-2 shadow-2xl transition-all sm:h-36 sm:w-36"
          style={{
            background: 'hsl(214, 70%, 15%)',
            borderColor: 'hsl(43, 75%, 52%)',
            boxShadow:
              '0 0 40px rgba(218, 165, 32, 0.45), 0 0 80px rgba(201, 162, 39, 0.25)',
            animation: 'loader-cross-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <Image
            src="/images/logo.png"
            alt="Queen of All Saints Parish Emblem"
            width={140}
            height={140}
            priority
            className="h-full w-full object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Typography & Sacred Invocations */}
      <div className="flex flex-col items-center gap-2 text-center">
        <p
          className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-gold-300"
          style={{ animation: 'loader-text-rise 0.6s ease-out 0.15s both' }}
        >
          Diocese of Tiruchirappalli
        </p>

        <h1
          className="font-display text-2xl font-black tracking-tight text-white sm:text-4xl"
          style={{
            textShadow: '0 2px 20px rgba(0,0,0,0.7)',
            animation: 'loader-text-rise 0.6s ease-out 0.25s both',
          }}
        >
          Queen of All Saints Church
        </h1>

        <p
          className="text-sm font-bold text-amber-200/90 sm:text-base"
          style={{
            fontFamily: "'Noto Sans Tamil', sans-serif",
            animation: 'loader-text-rise 0.6s ease-out 0.35s both',
          }}
          lang="ta"
        >
          அனைத்து புனிதர்களின் அரசி ஆலயம்
        </p>

        <p
          className="mt-1 font-serif text-xs italic tracking-wide text-gold-300/80 sm:text-sm"
          style={{ animation: 'loader-text-rise 0.6s ease-out 0.45s both' }}
        >
          &ldquo;Regina Sanctorum Omnium, Ora Pro Nobis&rdquo;
        </p>
      </div>

      {/* Smooth Sacred Golden Progress Bar */}
      <div className="mt-8 w-48 sm:w-60">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10 border border-white/15">
          <div
            className="h-full rounded-full transition-all duration-150 ease-out"
            style={{
              width: `${progress}%`,
              background:
                'linear-gradient(90deg, hsl(43, 85%, 45%) 0%, hsl(43, 95%, 65%) 100%)',
              boxShadow: '0 0 14px rgba(218, 165, 32, 0.8)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

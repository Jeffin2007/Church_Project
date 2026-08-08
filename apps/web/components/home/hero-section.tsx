'use client';

import { buttonClassName } from '@/components/ui/button';
import { SafeImage } from '@/components/ui/safe-image';
import { Candle } from '@/components/ui/micro-interactions';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

/**
 * HeroSection
 *
 * Implements a high-performance, GPU-accelerated cinematic church entrance experience.
 * Uses requestAnimationFrame + CSS variables to achieve zero React re-renders during scrolling.
 * Symmetrical altar candle alignment across 320px mobile to 4K desktop.
 */
export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const sy = Math.min(window.scrollY, 900);
            const opacity = Math.max(0, 1 - sy / 550);
            const bgTranslateY = sy * 0.25; // Rich GPU parallax depth
            const bgScale = 1.05 + (sy / 900) * 0.15; // Smooth scroll-driven dynamic zoom (1.05 -> 1.20)
            const contentTranslateY = -sy * 0.12;

            heroRef.current.style.setProperty('--hero-opacity', `${opacity.toFixed(3)}`);
            heroRef.current.style.setProperty('--hero-bg-y', `${bgTranslateY.toFixed(1)}px`);
            heroRef.current.style.setProperty('--hero-bg-scale', `${bgScale.toFixed(3)}`);
            heroRef.current.style.setProperty(
              '--hero-content-y',
              `${contentTranslateY.toFixed(1)}px`,
            );
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Welcome to Queen of All Saints Church"
      className="relative h-screen min-h-[600px] w-full overflow-hidden"
      style={
        {
          '--hero-opacity': '1',
          '--hero-bg-y': '0px',
          '--hero-bg-scale': '1.05',
          '--hero-content-y': '0px',
        } as React.CSSProperties
      }
    >
      {/* ── Background image with interactive scroll zoom & GPU parallax ── */}
      <div
        className="absolute inset-0 transition-transform duration-75 ease-out"
        aria-hidden="true"
        style={{
          transform: 'translate3d(0, var(--hero-bg-y), 0) scale(var(--hero-bg-scale))',
          willChange: 'transform',
        }}
      >
        <SafeImage
          src="/images/hero/church-altar.webp"
          alt=""
          fill
          priority
          className="animate-zoom-slow scale-105 object-cover"
          sizes="100vw"
          placeholderLabel="Queen of All Saints Church Altar"
          placeholderClassName="absolute inset-0"
        />
        {/* Layered cinematic gradient overlays for optimal text contrast and sacred atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/60 to-slate-950/95" />
        <div
          className="animate-float-slow absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(212,175,55,0.18),transparent)]"
          aria-hidden="true"
        />
      </div>

      {/* ── Hero Content with smooth scroll opacity fade & gentle rise ── */}
      <div
        className="relative z-10 flex h-full items-center pb-16 pt-12 sm:pb-20"
        style={{
          opacity: 'var(--hero-opacity)',
          transform: 'translate3d(0, var(--hero-content-y), 0)',
          willChange: 'opacity, transform',
        }}
      >
        <div className="container-sacred w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Church identity badge */}
            <div
              className="animate-fade-in-down"
              style={{ animationDuration: '0.9s', animationFillMode: 'both' }}
            >
              <p className="xs:text-xs mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white drop-shadow-md sm:tracking-[0.25em] md:text-sm">
                Queen of All Saints Church
              </p>
              <p className="xs:text-[11px] mb-4 text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-300 drop-shadow-md sm:mb-6 md:text-xs">
                Diocese of Tiruchirappalli
              </p>
            </div>

            {/* Main heading */}
            <h1
              className="animate-fade-in font-display xs:text-4xl mb-4 text-3xl font-extrabold leading-[1.12] text-white drop-shadow-xl sm:mb-5 sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                animationDelay: '200ms',
                animationDuration: '1s',
                animationFillMode: 'both',
              }}
            >
              A Parish Family
              <br />
              <span className="text-gradient-gold">United in Faith</span>
            </h1>

            {/* Tamil subtitle */}
            <p
              className="animate-fade-in-up xs:text-xl mb-8 text-lg font-bold text-amber-100 drop-shadow-lg sm:mb-10 sm:text-2xl lg:text-3xl"
              lang="ta"
              style={{
                animationDelay: '400ms',
                animationDuration: '1s',
                animationFillMode: 'both',
                fontFamily: "'Noto Sans Tamil', sans-serif",
              }}
            >
              அனைத்து புனிதர்களின் அரசி ஆலயம்
            </p>

            {/* CTAs — Stack cleanly on mobile (<640px) */}
            <div
              className="animate-fade-in-up flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:gap-5"
              style={{
                animationDelay: '600ms',
                animationDuration: '1s',
                animationFillMode: 'both',
              }}
            >
              <Link
                href="#mass-timings"
                className={buttonClassName(
                  'primary',
                  'lg',
                  'group h-12 w-full max-w-xs px-6 text-sm font-semibold shadow-2xl transition-all duration-300 hover:scale-105 sm:h-14 sm:w-auto sm:px-8 sm:text-base',
                )}
              >
                Mass Timings
                <ChevronRight
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="#parish-family"
                className="group inline-flex h-12 w-full max-w-xs items-center justify-center rounded-md border-2 border-white/30 bg-white/10 px-6 text-sm font-semibold text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20 sm:h-14 sm:w-auto sm:px-8 sm:text-base"
              >
                Join Our Parish Family
                <ChevronRight
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Symmetrical Centered Altar Candle Pair & Scroll Indicator ── */}
      <div
        className="absolute bottom-3 left-0 right-0 z-20 flex items-end justify-center px-4 sm:bottom-6 md:bottom-8"
        aria-hidden="true"
        style={{
          opacity: 'var(--hero-opacity)',
          animation: 'loader-text-rise 1s ease-out 1s both',
        }}
      >
        <div className="flex w-full max-w-xl items-end justify-center gap-6 sm:gap-14 md:gap-20">
          {/* Left Altar Candle — Symmetrical Slot */}
          <div className="flex w-20 items-end justify-end sm:w-28">
            <Candle candleHeight={40} className="sm:hidden" aria-label="Left altar candle" />
            <Candle
              candleHeight={50}
              className="hidden sm:inline-flex"
              aria-label="Left altar candle"
            />
          </div>

          {/* Mathematically Centered Scroll Indicator */}
          <div className="flex shrink-0 flex-col items-center gap-1 pb-0.5 opacity-90">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-amber-200 drop-shadow-md">
              Scroll
            </span>
            <div className="h-6 w-px animate-pulse rounded-full bg-gradient-to-b from-amber-300 via-white to-transparent" />
          </div>

          {/* Right Altar Candle — Equal Slot & Symmetry */}
          <div className="flex w-20 items-end justify-start sm:w-28">
            <Candle candleHeight={40} className="sm:hidden" aria-label="Right altar candle" />
            <Candle
              candleHeight={50}
              className="hidden sm:inline-flex"
              aria-label="Right altar candle"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

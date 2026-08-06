'use client';

import { buttonClassName } from '@/components/ui/button';
import { SafeImage } from '@/components/ui/safe-image';
import { Candle } from '@/components/ui/micro-interactions';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= 1200) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      aria-label="Welcome to Queen of All Saints Church"
      className="relative h-screen min-h-[640px] w-full overflow-hidden"
    >
      {/* ── Background image with slow Ken-Burns zoom & subtle parallax ── */}
      <div
        className="absolute inset-0 transition-transform duration-75 ease-out"
        aria-hidden="true"
        style={{
          transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
          willChange: 'transform',
        }}
      >
        <SafeImage
          src="/images/hero/church-altar.webp"
          alt=""
          fill
          priority
          className="animate-zoom-slow object-cover"
          sizes="100vw"
          placeholderLabel="Queen of All Saints Church"
          placeholderClassName="absolute inset-0"
        />
        {/* Layered cinematic gradient overlay for high contrast readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/65 to-slate-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(212,175,55,0.15),transparent)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container-sacred w-full">
          <div className="mx-auto max-w-4xl text-center">
            {/* Church identity */}
            <div
              className="animate-fade-in-down"
              style={{ animationDuration: '0.9s', animationFillMode: 'both' }}
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-white drop-shadow-md md:text-sm">
                Queen of All Saints Church
              </p>
              <p className="mb-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-300 drop-shadow-md md:text-xs">
                Diocese of Tiruchirappalli
              </p>
            </div>

            {/* Main heading */}
            <h1
              className="animate-fade-in font-display mb-5 text-5xl font-extrabold leading-[1.08] text-white drop-shadow-xl md:text-6xl lg:text-7xl"
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
              className="animate-fade-in-up mb-10 text-xl font-bold text-amber-100 drop-shadow-lg md:text-2xl lg:text-3xl"
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

            {/* CTAs */}
            <div
              className="animate-fade-in-up flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
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
                  'group h-14 px-8 text-base font-semibold shadow-2xl transition-all duration-300 hover:scale-105',
                )}
              >
                Mass Timings
                <ChevronRight
                  className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="#parish-family"
                className="group inline-flex h-14 items-center justify-center rounded-md border-2 border-white/30 bg-white/10 px-8 text-base font-semibold text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20"
              >
                Join Our Parish Family
                <ChevronRight
                  className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Candle pair — centered decorative candles ── */}
      <div
        className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 items-end justify-center gap-16 opacity-85 sm:bottom-16 sm:gap-24"
        aria-hidden="true"
        style={{
          animation: 'loader-text-rise 1s ease-out 1.2s both',
        }}
      >
        <Candle candleHeight={52} />
        <Candle candleHeight={52} />
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 animate-bounce sm:bottom-6"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 drop-shadow">
            Scroll
          </span>
          <div className="mt-1 h-8 w-px rounded-full bg-gradient-to-b from-white/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}

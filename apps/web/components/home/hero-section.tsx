'use client';

import { buttonClassName } from '@/components/ui/button';
import { SafeImage } from '@/components/ui/safe-image';
import { Candle } from '@/components/ui/micro-interactions';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section
      aria-label="Welcome to Queen of All Saints Church"
      className="relative h-screen min-h-[640px] w-full overflow-hidden"
    >
      {/* ── Background image with slow Ken-Burns zoom ── */}
      <div className="absolute inset-0" aria-hidden="true">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(201,162,39,0.08),transparent)]" />
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
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 md:text-sm">
                Queen of All Saints Church
              </p>
              {/* mb reduced: diocese label was shoving h1 too far down on mobile */}
              <p className="text-gold-400 mb-6 text-[11px] font-medium uppercase tracking-[0.2em] md:text-xs">
                Diocese of Tiruchirappalli
              </p>
            </div>

            {/* Main heading */}
            <h1
              className="animate-fade-in font-display mb-5 text-5xl font-bold leading-[1.08] text-white md:text-6xl lg:text-7xl"
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

            {/* Tamil subtitle — mb reduced from mb-14; was pushing CTAs too far */}
            <p
              className="animate-fade-in-up mb-10 text-xl font-medium text-white/85 md:text-2xl lg:text-3xl"
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
                className="group inline-flex h-14 items-center justify-center rounded-md border-2 border-white/30 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20"
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

      {/* ── Candle pair — subtle ambient micro-interaction ── */}
      <div
        className="absolute bottom-16 left-1/2 z-10 hidden -translate-x-1/2 items-end gap-20 opacity-70 sm:flex"
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
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Scroll
          </span>
          <div className="mt-1 h-8 w-px rounded-full bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

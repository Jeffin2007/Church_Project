'use client';

import { useEffect, useState, useMemo } from 'react';
import { PARISH } from '@/lib/parish-data';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { buttonClassName } from '@/components/ui/button';
import { Flag, Star } from 'lucide-react';
import Link from 'next/link';

function getFeastDate(year: number): Date {
  const aug1 = new Date(year, 7, 1);
  const aug1dow = aug1.getDay();
  const daysToFirstFri = (5 - aug1dow + 7) % 7;
  const firstFriday = 1 + daysToFirstFri;
  const thirdFriday = firstFriday + 14;
  return new Date(year, 7, thirdFriday);
}

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  started: boolean;
  ended: boolean;
  withinWindow: boolean;
}

function calcCountdown(target: Date): CountdownState {
  const now = Date.now();
  const feastEnd = new Date(target);
  feastEnd.setDate(feastEnd.getDate() + PARISH.feast.durationDays + 2);

  if (now > feastEnd.getTime()) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      started: false,
      ended: true,
      withinWindow: false,
    };
  }

  const diff = target.getTime() - now;
  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      started: true,
      ended: false,
      withinWindow: true,
    };
  }

  const days = Math.floor(diff / 86400000);
  return {
    days,
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    started: false,
    ended: false,
    withinWindow: days <= 60,
  };
}

export function FeastCountdown() {
  // null = not yet hydrated — renders nothing on server, calculates on client
  const [cd, setCd] = useState<CountdownState | null>(null);

  const feastDate = useMemo(() => {
    // This only runs on the client after mount
    if (typeof window === 'undefined') return new Date(new Date().getFullYear(), 7, 15);
    const now = new Date();
    const thisYear = getFeastDate(now.getFullYear());
    const end = new Date(thisYear);
    end.setDate(end.getDate() + PARISH.feast.durationDays + 2);
    return now > end ? getFeastDate(now.getFullYear() + 1) : thisYear;
  }, []);

  // Populate on client mount, then tick every second
  useEffect(() => {
    setCd(calcCountdown(feastDate));
    const id = setInterval(() => setCd(calcCountdown(feastDate)), 1000);
    return () => clearInterval(id);
  }, [feastDate]);

  // Server render and first client render: return null (no mismatch)
  if (!cd) return null;

  // Only show within 60-day window or during feast
  if (cd.ended || (!cd.started && !cd.withinWindow)) return null;

  const feastDateStr = feastDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section aria-label="Annual Feast Countdown" className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, hsl(214,75%,16%) 0%, hsl(214,60%,24%) 55%, hsl(0,67%,22%) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpolygon points='28,3 33,19 49,19 36,29 41,45 28,35 15,45 20,29 7,19 23,19' fill='%23C9A227'/%3E%3C/svg%3E")`,
          backgroundSize: '56px 56px',
        }}
      />

      <div className="section-padding-sm relative">
        <div className="container-sacred">
          <ScrollReveal animation="fade-in-up">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 flex justify-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border-4 shadow-xl md:h-[4.5rem] md:w-[4.5rem]"
                  style={{ borderColor: 'hsl(43,69%,55%)', background: 'hsl(214,60%,18%)' }}
                >
                  {cd.started ? (
                    <Star className="h-8 w-8" style={{ color: 'hsl(43,70%,62%)' }} />
                  ) : (
                    <Flag className="h-8 w-8" style={{ color: 'hsl(43,70%,62%)' }} />
                  )}
                </div>
              </div>

              <p
                className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'hsl(43,60%,68%)' }}
              >
                Annual Parish Celebration
              </p>
              <h2 className="font-display mb-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {PARISH.feast.title}
              </h2>
              <p
                className="mb-3 text-base text-white/80"
                lang="ta"
                style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
              >
                {PARISH.feast.titleTa}
              </p>
              <p className="mb-10 text-sm md:text-base" style={{ color: 'hsl(43,55%,65%)' }}>
                {cd.started ? 'Feast in progress! Join us.' : `Flag Hoisting: ${feastDateStr}`}
              </p>

              {cd.started ? (
                <div
                  className="inline-flex items-center gap-3 rounded-full border-2 px-8 py-4"
                  style={{ borderColor: 'hsl(43,69%,55%)', background: 'hsl(214,50%,12%)' }}
                >
                  <Star
                    className="h-5 w-5 animate-pulse"
                    style={{ color: 'hsl(43,70%,62%)' }}
                    aria-hidden="true"
                  />
                  <span className="text-lg font-bold text-white">Feast is happening now!</span>
                  <Star
                    className="h-5 w-5 animate-pulse"
                    style={{ color: 'hsl(43,70%,62%)' }}
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <div
                  className="mx-auto grid max-w-xl grid-cols-2 gap-4 sm:max-w-2xl sm:grid-cols-4 sm:gap-5"
                  aria-label="Countdown to Annual Feast"
                >
                  {[
                    { value: cd.days, label: 'Days', labelTa: 'நாட்கள்' },
                    { value: cd.hours, label: 'Hours', labelTa: 'மணி' },
                    { value: cd.minutes, label: 'Minutes', labelTa: 'நிமிடம்' },
                    { value: cd.seconds, label: 'Seconds', labelTa: 'வினாடி' },
                  ].map(({ value, label, labelTa }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center rounded-2xl border-2 px-4 py-5 sm:px-5 sm:py-6"
                      style={{ borderColor: 'hsl(43,50%,35%)', background: 'hsl(214,50%,12%)' }}
                    >
                      <span
                        className="font-display text-3xl font-bold tabular-nums sm:text-4xl md:text-5xl"
                        style={{ color: 'hsl(43,70%,65%)' }}
                      >
                        {String(value).padStart(2, '0')}
                      </span>
                      <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/65">
                        {label}
                      </span>
                      <span
                        className="text-[10px] text-white/45"
                        lang="ta"
                        style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                      >
                        {labelTa}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/feast"
                  className={buttonClassName('primary', 'lg', 'h-12 px-8')}
                  style={{ background: 'hsl(43,69%,47%)', color: 'hsl(214,75%,12%)' }}
                >
                  View Feast Schedule
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

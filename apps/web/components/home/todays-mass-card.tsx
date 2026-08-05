'use client';

import { useMemo, useState, useEffect } from 'react';
import { PARISH } from '@/lib/parish-data';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useLiturgicalSeason } from '@/context/liturgical-season-context';
import { getDailyHighlight } from '@/lib/liturgical-season';
import {
  Clock,
  Cross,
  Flame,
  Heart,
  Star,
  Calendar,
  ArrowRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const DOW_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DOW_ICONS = [Cross, Calendar, Calendar, Calendar, Flame, Heart, Star];

function getTodaySlot(dow: number) {
  return (
    PARISH.massTimings.find((slot) => {
      if (Array.isArray(slot.dow)) return (slot.dow as readonly number[]).includes(dow);
      return slot.dow === dow;
    }) ?? PARISH.massTimings[0]
  );
}

function getNextMass(
  masses: readonly { time: string; type: string; typeTa: string; language?: string }[],
) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  for (const mass of masses) {
    const [hourStr, minuteStr] = mass.time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10) || 0;
    const massTimeInMinutes = hour * 60 + minute;

    if (massTimeInMinutes > currentTimeInMinutes) {
      return mass;
    }
  }

  return masses[0];
}

export function TodaysMassCard() {
  const { seasonInfo } = useLiturgicalSeason();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const highlight = useMemo(() => getDailyHighlight(new Date()), [mounted]);

  const { slot, dow, dateStr, Icon, nextMass } = useMemo(() => {
    const today = mounted ? new Date() : new Date(0);
    const d = today.getDay();
    const todaySlot = getTodaySlot(d);
    return {
      slot: todaySlot,
      dow: d,
      dateStr: mounted
        ? today.toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '',
      Icon: DOW_ICONS[d] ?? Cross,
      nextMass: mounted ? getNextMass(todaySlot.masses) : todaySlot.masses[0],
    };
  }, [mounted]);

  return (
    <section
      aria-label="Today's Mass & Liturgical Highlight"
      className="section-padding-sm relative overflow-hidden"
    >
      {/* Dark Marian gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, hsl(214,75%,11%) 0%, hsl(214,70%,17%) 50%, hsl(214,65%,22%) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 4v40M4 24h40' stroke='%23C9A227' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-sacred relative">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto max-w-4xl">
            <div className="hover:border-gold-400/50 group overflow-hidden rounded-2xl border-2 border-white/20 bg-white/[0.08] shadow-2xl backdrop-blur-md transition-all duration-500 hover:shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
              {/* Top gold bar */}
              <div
                className="h-1.5 w-full bg-gradient-to-r from-[hsl(43,69%,47%)] via-[hsl(43,70%,65%)] to-[hsl(43,69%,47%)]"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left side - Today's Mass Info + Liturgical Season */}
                <div className="p-6 sm:p-8">
                  {/* Season Badge & Date */}
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(43,69%,47%)] shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6 text-[hsl(214,75%,12%)]" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-[hsl(43,70%,72%)]">
                          {mounted ? DOW_NAMES[dow] : '\u00A0'}
                        </p>
                        <p className="text-xs font-medium text-white/80">
                          {mounted ? dateStr : '\u00A0'}
                        </p>
                      </div>
                    </div>

                    <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold">
                      <Sparkles className="h-3 w-3" aria-hidden="true" />
                      {seasonInfo.label}
                    </span>
                  </div>

                  {/* Liturgical Reading / Verse */}
                  <div className="mb-6 rounded-xl border border-white/15 bg-white/[0.06] p-4">
                    <div className="text-gold-300 mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                      <BookOpen className="h-4 w-4" />
                      <span>{highlight.heading}</span>
                    </div>
                    <p className="text-sm italic leading-relaxed text-white/90">
                      &ldquo;{highlight.body}&rdquo;
                    </p>
                    <p
                      className="mt-2 text-xs leading-relaxed text-white/70"
                      lang="ta"
                      style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                    >
                      &ldquo;{highlight.bodyTa}&rdquo;
                    </p>
                  </div>

                  {/* Next Mass Highlight */}
                  <div className="mb-4">
                    <p className="text-gold-400 mb-2 text-xs font-bold uppercase tracking-[0.18em]">
                      Next Mass Today
                    </p>
                    <div className="border-gold-500/40 rounded-xl border bg-white/[0.1] p-4 shadow-inner">
                      <div className="flex items-center gap-3">
                        <Clock className="text-gold-400 h-5 w-5" aria-hidden="true" />
                        <div className="flex-1">
                          <p className="text-2xl font-bold text-white">{nextMass.time}</p>
                          <p className="text-sm font-semibold text-white/90">{nextMass.type}</p>
                          <p
                            className="text-xs text-white/70"
                            lang="ta"
                            style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                          >
                            {nextMass.typeTa}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Full Today's Mass Schedule */}
                <div className="border-l border-white/10 bg-black/20 p-6 sm:p-8">
                  <h3 className="mb-4 flex items-center justify-between text-lg font-bold text-white">
                    <span>Today's Mass Schedule</span>
                    <span className="text-gold-300 text-xs font-normal">Sanctuary Main Altar</span>
                  </h3>
                  <ul className="space-y-3" aria-label="Today's Mass times">
                    {slot.masses.map((mass, i) => (
                      <li
                        key={i}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${
                          mass.time === nextMass.time
                            ? 'border-gold-400/60 bg-gold-500/20 shadow-md'
                            : 'border-white/10 bg-white/[0.05]'
                        }`}
                      >
                        <div>
                          <p className="text-base font-bold text-white">{mass.time}</p>
                          <p className="text-xs font-medium text-white/75">
                            {mass.language || 'English'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gold-300 text-sm font-bold">{mass.type}</p>
                          <p
                            className="text-[11px] text-white/60"
                            lang="ta"
                            style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                          >
                            {mass.typeTa}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Prayer Tagline */}
                  <div className="border-gold-400/30 bg-gold-500/10 mt-6 rounded-lg border px-4 py-2.5 text-center">
                    <p className="text-gold-300 text-xs font-bold">
                      Queen of All Saints, Pray for Us • அனைத்து புனிதர்களின் அரசியே,
                      வேண்டிக்கொள்ளும்
                    </p>
                  </div>

                  {/* View Full Schedule CTA */}
                  <Link
                    href="/mass-timings"
                    className="bg-gold-500/20 text-gold-300 hover:bg-gold-500/30 mt-5 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-colors hover:text-white"
                  >
                    View Complete Weekly Schedule
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

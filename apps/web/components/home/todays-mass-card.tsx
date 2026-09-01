'use client';

import { useMemo, useState, useEffect } from 'react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useLiturgicalSeason } from '@/context/liturgical-season-context';
import { getDailyHighlight } from '@/lib/liturgical-season';
import { getLiveNextMass, parseTimeToMinutes } from '@/lib/mass-schedule-helper';
import { useLanguage } from '@/context/language-context';
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
  Radio,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

const DOW_ICONS = [Cross, Calendar, Calendar, Calendar, Flame, Heart, Star];

export function TodaysMassCard() {
  const { seasonInfo } = useLiturgicalSeason();
  const { isTamil, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Mount effect and 10-second ticker to update real-time clock and next mass
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const highlight = useMemo(() => getDailyHighlight(currentTime), [currentTime]);

  const liveMass = useMemo(() => getLiveNextMass(currentTime), [currentTime]);

  const { dateStr, Icon, currentMinutes } = useMemo(() => {
    const d = currentTime.getDay();
    return {
      dateStr: mounted
        ? currentTime.toLocaleDateString(isTamil ? 'ta-IN' : 'en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '',
      Icon: DOW_ICONS[d] ?? Cross,
      currentMinutes: currentTime.getHours() * 60 + currentTime.getMinutes(),
    };
  }, [mounted, currentTime, isTamil]);

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
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(43,69%,47%)] shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6 text-[hsl(214,75%,12%)]" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-lg font-extrabold text-[hsl(43,70%,72%)]" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                          {mounted ? (isTamil ? liveMass.dayNameTa || liveMass.dayName : liveMass.dayName) : '\u00A0'}
                        </p>
                        <p className="text-xs font-semibold text-white/85" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                          {mounted ? dateStr : '\u00A0'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold shadow-sm" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                        <Sparkles className="h-3 w-3" aria-hidden="true" />
                        {isTamil ? seasonInfo.labelTa || seasonInfo.label : seasonInfo.label}
                      </span>
                      {mounted && (
                        <span className="text-[11px] font-semibold text-amber-200/90">
                          🕒 {t('Live', 'நேரலை')}: {liveMass.currentTimeStr}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Liturgical Reading / Verse */}
                  <div className="mb-6 rounded-xl border border-white/15 bg-white/[0.06] p-4">
                    <div className="text-gold-300 mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                      <BookOpen className="h-4 w-4" />
                      <span>{isTamil ? highlight.headingTa || highlight.heading : highlight.heading}</span>
                    </div>
                    <p className="text-sm italic leading-relaxed text-white/90" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                      &ldquo;{isTamil ? highlight.bodyTa : highlight.body}&rdquo;
                    </p>
                  </div>

                  {/* Next Mass Highlight (Dynamic Real-Time) */}
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-gold-400 text-xs font-black uppercase tracking-[0.18em]" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                        {isTamil ? liveMass.labelTa || liveMass.label : liveMass.label}
                      </p>
                      {liveMass.isHappeningNow ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400 bg-emerald-500/30 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-300 animate-pulse">
                          <Radio className="h-3 w-3" /> {t('Live Now', 'இப்போது நடைபெறுகிறது')}
                        </span>
                      ) : liveMass.allTodayMassesCompleted ? (
                        <span className="text-gold-300 text-[10px] font-bold" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                          {t("Today's Celebrations Concluded", 'இன்றைய திருப்பலிகள் நிறைவடைந்தன')}
                        </span>
                      ) : null}
                    </div>

                    <div
                      className={`rounded-xl border p-4 shadow-inner transition-all ${
                        liveMass.isHappeningNow
                          ? 'border-emerald-400/80 bg-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                          : 'border-gold-500/50 bg-white/[0.1]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock
                          className={`h-6 w-6 ${
                            liveMass.isHappeningNow ? 'text-emerald-400 animate-pulse' : 'text-gold-400'
                          }`}
                          aria-hidden="true"
                        />
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-black text-white">{liveMass.time}</p>
                            <span className="text-xs font-bold text-amber-200">
                              ({liveMass.language})
                            </span>
                          </div>
                          <p className="text-sm font-bold text-white/95" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                            {isTamil ? liveMass.typeTa : liveMass.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Full Today's Mass Schedule */}
                <div className="border-l border-white/10 bg-black/20 p-6 sm:p-8">
                  <h3 className="mb-4 flex items-center justify-between text-lg font-bold text-white" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                    <span>{isTamil ? `${liveMass.todaySlot.dayTa || liveMass.todaySlot.day} திருப்பலி அட்டவணை` : `${liveMass.todaySlot.day} Mass Schedule`}</span>
                    <span className="text-gold-300 text-xs font-medium">{t('Sanctuary Main Altar', 'முக்கிய பீடம்')}</span>
                  </h3>
                  <ul className="space-y-3" aria-label="Today's Mass times">
                    {liveMass.todaySlot.masses.map((mass, i) => {
                      const massMin = parseTimeToMinutes(mass.time);
                      const isPast = currentMinutes > massMin + 45;
                      const isCurrent =
                        currentMinutes >= massMin && currentMinutes <= massMin + 45;
                      const isNext = mass.time === liveMass.activeMassTime;

                      return (
                        <li
                          key={i}
                          className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${
                            isCurrent
                              ? 'border-emerald-400/80 bg-emerald-500/20 shadow-lg ring-2 ring-emerald-400/30'
                              : isNext
                                ? 'border-gold-400/70 bg-gold-500/20 shadow-md ring-2 ring-gold-400/20'
                                : isPast
                                  ? 'border-white/5 bg-white/[0.02] opacity-60'
                                  : 'border-white/10 bg-white/[0.05]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-base font-bold text-white">{mass.time}</p>
                              {isPast && (
                                <span className="inline-flex items-center text-[10px] text-emerald-400/80 font-bold gap-0.5">
                                  <CheckCircle2 className="h-3 w-3" /> {t('Completed', 'நிறைவுற்றது')}
                                </span>
                              )}
                              {isCurrent && (
                                <span className="rounded bg-emerald-500/80 px-1.5 py-0.2 text-[9px] font-black uppercase text-white">
                                  {t('In Progress', 'நடைபெறுகிறது')}
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-medium text-white/80">
                              {mass.language || 'English'}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gold-300 text-sm font-bold" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                              {isTamil ? mass.typeTa : mass.type}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Prayer Tagline */}
                  <div className="border-gold-400/30 bg-gold-500/10 mt-6 rounded-lg border px-4 py-2.5 text-center">
                    <p className="text-gold-300 text-xs font-bold" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                      {t('Queen of All Saints, Pray for Us', 'அனைத்து புனிதர்களின் அரசியே, எங்களுக்காக வேண்டிக்கொள்ளும்')}
                    </p>
                  </div>

                  {/* View Full Schedule CTA */}
                  <Link
                    href="/mass-timings"
                    className="bg-gold-500/20 text-gold-300 hover:bg-gold-500/30 mt-5 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-colors hover:text-white"
                    style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                  >
                    {t('View Complete Weekly Schedule', 'முழுமையான வார அட்டவணையைக் காண்க')}
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

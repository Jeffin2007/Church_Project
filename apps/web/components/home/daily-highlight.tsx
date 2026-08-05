'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useLiturgicalSeason } from '@/context/liturgical-season-context';
import { getDailyHighlight } from '@/lib/liturgical-season';
import { buttonClassName } from '@/components/ui/button';
import { BookOpen, Clock, Star, Flame } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ── Icon map per highlight type ───────────────────────────────────────────────
const TYPE_ICONS: Record<string, LucideIcon> = {
  'feast-prayer': Star,
  'season-prayer': BookOpen,
  'mass-reminder': Clock,
  novena: Flame,
};

// ── Season accent gradient map ────────────────────────────────────────────────
type SeasonGradient = {
  outer: string; // card ring / border colour
  top: string; // top decorative bar gradient
  icon: string; // icon container background
  badge: string; // badge bg/text
};

const SEASON_STYLES: Record<string, SeasonGradient> = {
  'marian-feast': {
    outer: 'border-[hsl(43,70%,62%)]',
    top: 'from-[hsl(214,75%,20%)] via-[hsl(43,70%,45%)] to-[hsl(214,65%,25%)]',
    icon: 'bg-[hsl(214,60%,15%)]',
    badge: 'bg-[hsl(43,70%,62%)] text-[hsl(214,75%,15%)]',
  },
  marian: {
    outer: 'border-rose-300',
    top: 'from-rose-600 via-rose-400 to-pink-500',
    icon: 'bg-rose-50',
    badge: 'bg-rose-100 text-rose-800',
  },
  advent: {
    outer: 'border-violet-300',
    top: 'from-violet-700 via-violet-500 to-purple-600',
    icon: 'bg-violet-50',
    badge: 'bg-violet-100 text-violet-900',
  },
  christmas: {
    outer: 'border-red-300',
    top: 'from-red-700 via-red-500 to-yellow-500',
    icon: 'bg-red-50',
    badge: 'bg-red-100 text-red-800',
  },
  lent: {
    outer: 'border-purple-300',
    top: 'from-purple-800 via-purple-600 to-purple-700',
    icon: 'bg-purple-50',
    badge: 'bg-purple-100 text-purple-900',
  },
  easter: {
    outer: 'border-green-300',
    top: 'from-green-600 via-emerald-500 to-green-400',
    icon: 'bg-green-50',
    badge: 'bg-green-100 text-green-900',
  },
  ordinary: {
    outer: 'border-primary/30',
    top: 'from-primary via-primary-500 to-gold-500',
    icon: 'bg-primary/10',
    badge: 'bg-primary/10 text-primary',
  },
};

export function DailyLiturgicalHighlight() {
  const { seasonInfo } = useLiturgicalSeason();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const highlight = useMemo(() => getDailyHighlight(new Date()), [mounted]);

  const styles = SEASON_STYLES[seasonInfo.season] ?? SEASON_STYLES['ordinary'];
  const Icon = TYPE_ICONS[highlight.type] ?? BookOpen;
  const todayStr = useMemo(
    () =>
      mounted
        ? new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '',
    [mounted],
  );

  const isFeast = seasonInfo.season === 'marian-feast';

  return (
    <section aria-label="Today's Liturgical Highlight" className="section-padding bg-ivory-100">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto max-w-3xl">
            {/* ── Card ── */}
            <div
              className={`bg-card relative overflow-hidden rounded-2xl border-2 shadow-xl transition-all duration-500 ${styles.outer}`}
            >
              {/* Top colour bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${styles.top}`} aria-hidden="true" />

              {/* Star ornament watermark — feast only */}
              {isFeast && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cpolygon points='32,4 37,22 56,22 41,34 46,52 32,41 18,52 23,34 8,22 27,22' fill='%23C9A227'/%3E%3C/svg%3E")`,
                    backgroundSize: '64px 64px',
                  }}
                />
              )}

              <div className="relative p-6 sm:p-8">
                {/* ── Header row ── */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm ${styles.icon}`}
                    >
                      {isFeast ? (
                        <Star className="h-6 w-6" style={{ color: 'hsl(43,70%,45%)' }} />
                      ) : (
                        <Icon className="text-primary h-6 w-6" />
                      )}
                    </div>

                    <div>
                      <p className="text-muted-foreground text-[11px] font-semibold uppercase tracking-[0.18em]">
                        Today&apos;s Liturgical Highlight
                      </p>
                      <p className="text-muted-foreground text-xs">{todayStr}</p>
                    </div>
                  </div>

                  {/* Season badge */}
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 self-start rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
                  >
                    {isFeast && <Star className="h-3 w-3" aria-hidden="true" />}
                    {seasonInfo.label}
                  </span>
                </div>

                {/* ── Divider ── */}
                <div className="divider-sacred mb-5" />

                {/* ── Main content ── */}
                <div className="space-y-3">
                  <h2 className="font-display text-foreground text-2xl font-bold leading-snug sm:text-3xl">
                    {highlight.heading}
                  </h2>

                  {/* English body */}
                  <p className="text-foreground/80 text-base italic leading-relaxed">
                    &ldquo;{highlight.body}&rdquo;
                  </p>

                  {/* Tamil body */}
                  <p
                    className="text-muted-foreground text-sm leading-loose"
                    lang="ta"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  >
                    &ldquo;{highlight.bodyTa}&rdquo;
                  </p>
                </div>

                {/* ── Parish prayer tagline (feast only) ── */}
                {isFeast && (
                  <div className="mt-5 rounded-xl border border-[hsl(43,60%,75%)] bg-[hsl(214,60%,12%)] px-5 py-3 text-center">
                    <p className="text-sm font-semibold text-[hsl(43,70%,72%)]">
                      Queen of All Saints, pray for us.
                    </p>
                    <p
                      className="mt-1 text-xs text-[hsl(43,60%,60%)]"
                      lang="ta"
                      style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                    >
                      அனைத்து புனிதர்களின் அரசியே, எங்களுக்காக வேண்டிக்கொள்ளும்.
                    </p>
                  </div>
                )}

                {/* ── CTA ── */}
                {highlight.cta && (
                  <div className="mt-6">
                    <Link
                      href={highlight.cta.href as string}
                      className={buttonClassName('primary', 'sm', 'inline-flex')}
                    >
                      {highlight.cta.label}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

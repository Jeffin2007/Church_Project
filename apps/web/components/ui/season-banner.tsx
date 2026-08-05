'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLiturgicalSeason } from '@/context/liturgical-season-context';
import { Sparkles, Star, X } from 'lucide-react';

// ── Marian Feast Banner ───────────────────────────────────────────────────────
// Rich full-width banner shown only during the parish annual feast (Nov 1–10).
// Uses the season CSS tokens so it inherits the blue+gold palette automatically.

function MarianFeastBanner({ onDismiss }: { onDismiss: () => void }) {
  const today = new Date();
  const day = today.getDate(); // 1–10 within Nov
  const isFeastDay = day === 10; // Nov 10 = climax day (adapt to actual feast day if needed)

  return (
    <div
      role="banner"
      aria-label="Queen of All Saints Parish Annual Feast"
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, hsl(214,75%,18%) 0%, hsl(214,65%,25%) 60%, hsl(43,70%,28%) 100%)',
        borderBottom: '2px solid hsl(43,70%,50%)',
      }}
    >
      {/* ── Repeating star watermark (inline — no asset needed) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpolygon points='24,3 28,18 43,18 31,27 35,42 24,33 13,42 17,27 5,18 20,18' fill='%23C9A227'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Content ── */}
      <div className="container relative mx-auto flex flex-col items-center justify-center gap-2 px-6 py-3 text-center sm:flex-row sm:gap-4 sm:py-2.5">
        {/* Star icons */}
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <Star
            className="fill-gold-400 text-gold-400 h-4 w-4"
            style={{ color: 'hsl(43,70%,62%)' }}
          />
          <Star
            className="fill-gold-400 text-gold-400 h-5 w-5"
            style={{ color: 'hsl(43,70%,62%)' }}
          />
          <Star
            className="fill-gold-400 text-gold-400 h-4 w-4"
            style={{ color: 'hsl(43,70%,62%)' }}
          />
        </div>

        {/* Text */}
        <div className="space-y-0.5">
          <p className="text-sm font-bold leading-tight text-white sm:text-base">
            {isFeastDay
              ? '🎉 Feast Day — Queen of All Saints'
              : `Novena Day ${day} — Feast of Queen of All Saints`}
          </p>
          <p
            className="text-xs font-medium"
            style={{ color: 'hsl(43,65%,72%)', fontFamily: "'Noto Sans Tamil', sans-serif" }}
            lang="ta"
          >
            {isFeastDay
              ? 'அனைத்து புனிதர்களின் அரசி பெருவிழா'
              : `நொவேனா ${day}ஆம் நாள் — அனைத்து புனிதர்களின் அரசி`}
          </p>
        </div>

        {/* Star icons (right side) */}
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <Star className="fill-gold-400 h-4 w-4" style={{ color: 'hsl(43,70%,62%)' }} />
          <Star className="fill-gold-400 h-5 w-5" style={{ color: 'hsl(43,70%,62%)' }} />
          <Star className="fill-gold-400 h-4 w-4" style={{ color: 'hsl(43,70%,62%)' }} />
        </div>

        {/* View schedule CTA */}
        <Link
          href="/feast"
          className="ml-2 hidden shrink-0 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:inline-flex"
        >
          View Schedule
        </Link>
      </div>

      {/* Dismiss */}
      <button
        onClick={onDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1.5 text-white/50 transition-colors hover:text-white"
        aria-label="Dismiss feast banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// ── Generic Season Banner ─────────────────────────────────────────────────────
function GenericSeasonBanner({ onDismiss }: { onDismiss: () => void }) {
  const { seasonInfo } = useLiturgicalSeason();

  return (
    <div
      role="banner"
      aria-label={`Liturgical season: ${seasonInfo.label}`}
      className="relative flex items-center justify-center gap-3 px-4 py-2 text-sm font-medium transition-colors duration-700"
      style={{
        backgroundColor: `hsl(var(--season-banner-bg))`,
        color: `hsl(var(--season-banner-text))`,
        borderBottom: `1px solid hsl(var(--season-accent) / 0.25)`,
      }}
    >
      <Sparkles className="h-4 w-4 shrink-0 opacity-80" aria-hidden="true" />
      <span className="text-center">
        <span className="font-semibold">{seasonInfo.label}</span>
        {' — '}
        <span className="opacity-90">{seasonInfo.description}</span>
        {' · '}
        <span style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }} lang="ta">
          {seasonInfo.labelTa}
        </span>
      </span>
      <button
        onClick={onDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Dismiss season banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// ── Exported component ────────────────────────────────────────────────────────
export function SeasonBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { seasonInfo } = useLiturgicalSeason();

  if (dismissed || seasonInfo.season === 'ordinary') return null;

  if (seasonInfo.season === 'marian-feast') {
    return <MarianFeastBanner onDismiss={() => setDismissed(true)} />;
  }

  return <GenericSeasonBanner onDismiss={() => setDismissed(true)} />;
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { PARISH } from '@/lib/parish-data';
import { Bell } from 'lucide-react';

/**
 * NoticeTicker
 * Scrolling marquee-style ticker below the navbar.
 * Pauses on hover. Language-aware via localStorage.
 */
export function NoticeTicker() {
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Sync language with navbar toggle
  useEffect(() => {
    const stored = window.localStorage.getItem('qoas_lang') as 'en' | 'ta' | null;
    if (stored) setLang(stored);

    const onLangChange = () => {
      const next = window.localStorage.getItem('qoas_lang') as 'en' | 'ta' | null;
      if (next) setLang(next);
    };
    window.addEventListener('languageChange', onLangChange);
    return () => window.removeEventListener('languageChange', onLangChange);
  }, []);

  const items = PARISH.notices;
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className="border-primary/20 bg-primary/5 relative overflow-hidden border-b py-2"
      aria-label="Parish notices ticker"
      role="marquee"
    >
      {/* Bell icon — fixed left */}
      <div
        className="bg-primary absolute left-0 top-0 z-10 flex h-full items-center px-3"
        aria-hidden="true"
      >
        <Bell className="h-3.5 w-3.5 text-white" />
      </div>

      {/* Scrolling track */}
      <div
        ref={trackRef}
        className="ml-10 flex items-center gap-0 whitespace-nowrap"
        style={{
          animation: paused ? 'none' : 'ticker-scroll 60s linear infinite',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {doubled.map((notice, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className="text-foreground/80 px-6 text-xs font-medium"
              lang={lang === 'ta' ? 'ta' : undefined}
              style={lang === 'ta' ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {lang === 'ta' ? notice.textTa : notice.text}
            </span>
            {/* Separator dot */}
            <span className="text-primary/40 select-none text-xs" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </div>

      {/* Fade edges */}
      <div
        className="from-background/80 pointer-events-none absolute inset-y-0 left-10 w-8 bg-gradient-to-r to-transparent"
        aria-hidden="true"
      />
      <div
        className="from-background/80 pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l to-transparent"
        aria-hidden="true"
      />

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="ticker-scroll"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

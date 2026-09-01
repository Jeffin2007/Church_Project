'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';

/**
 * LanguagePromptModal
 *
 * Balanced Dual-Prompt Catholic-themed modal for first-time visitors.
 * Gives equal visual weight to both English and Tamil.
 * Persists the user's preference in localStorage so they are never prompted again.
 */
export function LanguagePromptModal() {
  const { hasPrompted, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || hasPrompted) {
    return null;
  }

  const handleSelectLanguage = (lang: 'en' | 'ta') => {
    setLanguage(lang);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-prompt-title"
      className="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Darkened blur backdrop */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-fade-in" />

      {/* Catholic-Themed Sacred Modal Card */}
      <div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border-2 border-gold-400/60 p-6 text-white shadow-[0_0_50px_rgba(201,162,39,0.35)] sm:p-8 animate-scale-in"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, hsl(214, 75%, 15%) 0%, hsl(214, 75%, 9%) 70%, hsl(214, 85%, 5%) 100%)',
        }}
      >
        {/* Subtle Ambient Gold Candle Glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(218,165,32,0.6) 0%, transparent 70%)',
          }}
        />

        {/* Official Parish Seal with Glowing Halo */}
        <div className="relative mb-6 flex flex-col items-center justify-center">
          <div
            className="pointer-events-none absolute -inset-2 rounded-full border border-gold-400/40"
            style={{ animation: 'cross-breathe 3s ease-in-out infinite' }}
          />
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-gold-400 bg-[hsl(214,70%,16%)] p-2 shadow-xl sm:h-24 sm:w-24">
            <Image
              src="/images/logo.png"
              alt="Queen of All Saints Parish Emblem"
              width={90}
              height={90}
              priority
              className="h-full w-full object-contain"
            />
          </div>
          <span className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.25em] text-gold-300">
            Diocese of Tiruchirappalli · திருச்சி மறைமாவட்டம்
          </span>
        </div>

        {/* Balanced Dual-Prompt Headers */}
        <div className="space-y-4 text-center">
          {/* English Header */}
          <div className="space-y-1">
            <h2
              id="language-prompt-title"
              className="font-display text-xl font-black text-white sm:text-2xl"
            >
              Please choose your preferred language.
            </h2>
            <p className="text-xs font-semibold text-slate-300/85">
              Queen of All Saints Catholic Church · K.K. Nagar, Trichy
            </p>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 py-1">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="text-xs font-serif text-gold-400">✝</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>

          {/* Tamil Header */}
          <div className="space-y-1">
            <h3
              className="text-lg font-extrabold text-amber-200 sm:text-xl"
              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
              lang="ta"
            >
              உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்.
            </h3>
            <p
              className="text-xs font-semibold text-amber-300/80"
              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
              lang="ta"
            >
              அனைத்து புனிதர்களின் அரசி ஆலயம் · கே.கே. நகர், திருச்சி
            </p>
          </div>
        </div>

        {/* Dual Equal-Weight Language Selection Buttons */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* English Button */}
          <button
            type="button"
            onClick={() => handleSelectLanguage('en')}
            className="group relative flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-white/20 bg-white/10 p-4 text-center transition-all duration-300 hover:border-gold-400 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(201,162,39,0.4)] active:scale-95"
          >
            <span className="text-lg font-black text-white group-hover:text-gold-300">
              English
            </span>
            <span className="text-[11px] font-semibold text-slate-300">
              Continue in English
            </span>
          </button>

          {/* Tamil Button */}
          <button
            type="button"
            onClick={() => handleSelectLanguage('ta')}
            className="group relative flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-gold-400/40 bg-gold-500/10 p-4 text-center transition-all duration-300 hover:border-gold-400 hover:bg-gold-500/20 hover:shadow-[0_0_25px_rgba(201,162,39,0.5)] active:scale-95"
            style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
          >
            <span className="text-lg font-black text-amber-200 group-hover:text-gold-300">
              தமிழ்
            </span>
            <span className="text-[11px] font-semibold text-amber-300/90">
              தமிழில் தொடரவும்
            </span>
          </button>
        </div>

        {/* Subtitle note */}
        <p className="mt-6 text-center text-[11px] font-medium text-slate-400">
          You can change your language anytime from the menu bar at the top.
          <br />
          <span lang="ta" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
            மேல் முகப்புப் பட்டையிலிருந்து எந்த நேரத்திலும் உங்கள் மொழியை மாற்றிக்கொள்ளலாம்.
          </span>
        </p>
      </div>
    </div>
  );
}

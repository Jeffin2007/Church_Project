'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function HeaderNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, isTamil, t } = useLanguage();

  const navLinks = [
    { href: '/', labelEn: 'Home', labelTa: 'முகப்பு' },
    { href: '/about', labelEn: 'About', labelTa: 'எங்களைப் பற்றி' },
    { href: '/history', labelEn: 'History', labelTa: 'வரலாறு' },
    { href: '/mass-timings', labelEn: 'Mass Timings', labelTa: 'திருப்பலி நேரங்கள்' },
    { href: '/ministries', labelEn: 'Ministries', labelTa: 'பக்த சபைகள்' },
    { href: '/gallery', labelEn: 'Gallery', labelTa: 'கேலரி' },
    { href: '/contact', labelEn: 'Contact', labelTa: 'தொடர்பு' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[hsl(214,75%,11%)]/95 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-[hsl(214,75%,11%)]/85">
      <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between px-3 py-2 sm:h-20 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-gold-400/80 bg-[hsl(214,70%,16%)] p-1 shadow-[0_0_15px_rgba(201,162,39,0.5)] transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
            <Image
              src="/images/logo.png"
              alt="Queen of All Saints Logo"
              width={44}
              height={44}
              priority
              sizes="(max-width: 640px) 40px, 44px"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <span
              className="font-display block truncate text-sm font-black leading-tight tracking-tight text-white drop-shadow-sm sm:text-lg lg:text-xl"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t('Queen of All Saints', 'அனைத்து புனிதர்களின் அரசி')}
            </span>
            <span
              className="text-gold-300 block truncate text-[10px] font-extrabold uppercase tracking-wider sm:text-[11px]"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {isTamil ? (
                <>
                  <span className="inline sm:hidden">கத்தோலிக்க ஆலயம் · திருச்சி</span>
                  <span className="hidden sm:inline">ரோமன் கத்தோலிக்க ஆலயம் · திருச்சி</span>
                </>
              ) : (
                <>
                  <span className="inline sm:hidden">RC Church · Trichy</span>
                  <span className="hidden sm:inline">Roman Catholic Church · Trichy</span>
                </>
              )}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const label = isTamil ? link.labelTa : link.labelEn;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-gold-300 bg-white/10 font-bold shadow-inner'
                    : 'hover:text-gold-300 text-white/85 hover:bg-white/5'
                }`}
                style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
              >
                {label}
                {isActive && (
                  <span className="bg-gold-400 absolute bottom-0 left-3 right-3 h-0.5 rounded-full shadow-[0_0_8px_#C5973A]" />
                )}
              </Link>
            );
          })}
          <Link
            href="/about-platform"
            className="text-gold-400 hover:text-gold-300 hover:bg-gold-500/10 border-gold-400/30 ml-1 flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <Sparkles className="text-gold-400 h-3.5 w-3.5" />
            <span>{t('Platform', 'தளம்')}</span>
          </Link>
        </nav>

        {/* Right Controls: Theme Toggle + Language Switcher + CTA + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />

          {/* Language Toggle Pill */}
          <div
            className="flex items-center rounded-full border border-gold-400/40 bg-slate-900/80 p-0.5 shadow-inner"
            role="group"
            aria-label="Language Selector"
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-gold-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ta')}
              className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${
                language === 'ta'
                  ? 'bg-gold-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
            >
              தமிழ்
            </button>
          </div>

          <Link
            href="/login"
            className="from-gold-400 via-gold-500 to-gold-600 hidden items-center gap-2 rounded-xl bg-gradient-to-r px-4 py-2.5 text-xs font-black text-slate-950 shadow-[0_4px_20px_rgba(201,162,39,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_24px_rgba(201,162,39,0.5)] active:scale-95 sm:inline-flex"
            style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
          >
            <span>{t('Parish Portal Login', 'பங்கு போர்ட்டல்')}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl border border-white/20 p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="text-gold-300 h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="animate-fade-in-down space-y-2 border-t border-white/10 bg-[hsl(214,75%,10%)] px-4 pb-6 pt-3 shadow-2xl lg:hidden">
          {/* Mobile Theme & Language Switcher Row */}
          <div className="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2.5">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <span className="text-xs font-bold text-slate-300">
                {t('Theme', 'வடிவமைப்பு')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="text-gold-400 h-4 w-4" />
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    language === 'en'
                      ? 'bg-gold-400 text-slate-950'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('ta')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                    language === 'ta'
                      ? 'bg-gold-400 text-slate-950'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                >
                  தமிழ்
                </button>
              </div>
            </div>
          </div>

          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const label = isTamil ? link.labelTa : link.labelEn;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-gold-500/20 text-gold-300 border-gold-400/40 border'
                    : 'hover:text-gold-300 text-white/90 hover:bg-white/10'
                }`}
                style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
              >
                <span>{label}</span>
                <ChevronRight className="text-gold-400/60 h-4 w-4" />
              </Link>
            );
          })}
          <Link
            href="/about-platform"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gold-300 border-gold-400/30 bg-gold-500/10 flex items-center justify-between rounded-xl border px-4 py-3 text-xs font-bold"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="text-gold-400 h-4 w-4" />
              <span>{t('About Platform', 'தளம் பற்றி')}</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Link>
          <div className="pt-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="from-gold-400 to-gold-600 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r py-3.5 text-xs font-black text-slate-950 shadow-xl"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              <span>{t('Parish Portal Login →', 'பங்கு போர்ட்டல் உள்நுழைவு →')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

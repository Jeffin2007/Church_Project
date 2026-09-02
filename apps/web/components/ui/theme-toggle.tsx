'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isTamil } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`h-9 w-9 rounded-full border border-gold-400/40 bg-slate-900/40 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = (theme === 'system' ? resolvedTheme : theme) === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/50 bg-slate-900/80 text-gold-300 shadow-inner transition-all duration-300 hover:scale-105 hover:border-gold-400 hover:bg-slate-800 hover:text-white dark:border-gold-400/40 dark:bg-slate-900/90 ${className}`}
      aria-label={
        isDark
          ? isTamil
            ? 'பகல் முறைக்கு மாற்றவும் (Light Mode)'
            : 'Switch to Light Mode'
          : isTamil
            ? 'இரவு முறைக்கு மாற்றவும் (Dark Mode)'
            : 'Switch to Dark Mode'
      }
      title={
        isDark
          ? isTamil
            ? 'பகல் முறை (Light Mode)'
            : 'Light Mode'
          : isTamil
            ? 'இரவு முறை (Dark Mode)'
            : 'Dark Mode'
      }
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-gold-300 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}

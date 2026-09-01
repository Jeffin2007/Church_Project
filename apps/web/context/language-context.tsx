'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Language = 'en' | 'ta';

export const LANGUAGE_STORAGE_KEY = 'qoas_lang';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  isTamil: boolean;
  isEnglish: boolean;
  t: (en: string, ta?: string) => string;
  hasPrompted: boolean;
  setHasPrompted: (prompted: boolean) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [hasPrompted, setHasPrompted] = useState<boolean>(true); // Default true to avoid flash before hydration

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      if (saved === 'en' || saved === 'ta') {
        setLanguageState(saved);
        setHasPrompted(true);
      } else {
        // User has not chosen yet -> Show balanced dual-prompt modal
        setHasPrompted(false);
      }
    } catch {
      setHasPrompted(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setHasPrompted(true);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.documentElement.lang = lang === 'ta' ? 'ta' : 'en';
    } catch {
      // Ignore localStorage errors (e.g. strict private browsing)
    }
  };

  const t = (en: string, ta?: string): string => {
    if (language === 'ta' && ta && ta.trim()) {
      return ta;
    }
    return en;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isTamil: language === 'ta',
        isEnglish: language === 'en',
        t,
        hasPrompted,
        setHasPrompted,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

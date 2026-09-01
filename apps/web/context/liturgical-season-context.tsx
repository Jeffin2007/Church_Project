'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  getLiturgicalSeason,
  type SeasonInfo,
  type LiturgicalSeason,
} from '@/lib/liturgical-season';

interface LiturgicalSeasonContextValue {
  seasonInfo: SeasonInfo;
  season: LiturgicalSeason;
}

const LiturgicalSeasonContext = createContext<LiturgicalSeasonContextValue | null>(null);

/**
 * Reads the current date, determines the liturgical season,
 * applies the `data-season` attribute to <html>, and exposes
 * the season info to all child components.
 */
export function LiturgicalSeasonProvider({ children }: { children: ReactNode }) {
  const [seasonInfo, setSeasonInfo] = useState<SeasonInfo>(() => getLiturgicalSeason());

  useEffect(() => {
    const updateSeason = () => {
      const info = getLiturgicalSeason();
      setSeasonInfo(info);

      // Apply season to <html> so CSS [data-season='...'] selectors activate
      document.documentElement.setAttribute('data-season', info.season);

      // Apply star-ornament background class during the parish feast
      if (info.season === 'marian-feast') {
        document.body.classList.add('feast-star-bg');
      } else {
        document.body.classList.remove('feast-star-bg');
      }
    };

    updateSeason();
    const interval = setInterval(updateSeason, 60000); // Check every minute

    return () => {
      clearInterval(interval);
      document.documentElement.removeAttribute('data-season');
      document.body.classList.remove('feast-star-bg');
    };
  }, []);

  return (
    <LiturgicalSeasonContext.Provider value={{ seasonInfo, season: seasonInfo.season }}>
      {children}
    </LiturgicalSeasonContext.Provider>
  );
}

export function useLiturgicalSeason(): LiturgicalSeasonContextValue {
  const ctx = useContext(LiturgicalSeasonContext);
  if (!ctx) {
    throw new Error('useLiturgicalSeason must be used inside LiturgicalSeasonProvider');
  }
  return ctx;
}

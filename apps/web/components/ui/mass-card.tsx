import React from 'react';
import { Clock, Globe, User, Sparkles } from 'lucide-react';
import { ParishBadge } from './parish-badge';

export interface MassCardProps {
  title: string;
  tamilTitle?: string;
  time: string;
  day?: string;
  language?: 'Tamil' | 'English' | 'Bilingual' | string;
  celebrant?: string;
  intention?: string;
  isHighlight?: boolean;
  badge?: string;
  className?: string;
}

export const MassCard: React.FC<MassCardProps> = ({
  title,
  tamilTitle,
  time,
  day,
  language = 'Tamil',
  celebrant,
  intention,
  isHighlight = false,
  badge,
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isHighlight
          ? 'border-gold/60 bg-gradient-to-br from-card via-card to-gold/5 shadow-lg dark:border-gold/50 dark:to-gold/10'
          : 'border-border bg-card text-card-foreground shadow-sm hover:border-gold/40 hover:shadow-md'
      } ${className}`}
    >
      {/* Top indicator bar */}
      <div
        className={`h-1.5 w-full ${
          isHighlight
            ? 'bg-gradient-to-r from-primary via-gold to-secondary'
            : 'bg-gradient-to-r from-primary/30 to-secondary/30'
        }`}
      />

      <div className="p-5 sm:p-6">
        {/* Header row: Day and Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {day && (
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {day}
            </span>
          )}

          <div className="flex items-center gap-1.5 ml-auto">
            {badge && (
              <ParishBadge variant="solemnity" size="sm">
                {badge}
              </ParishBadge>
            )}
            {language && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary dark:bg-secondary/20 dark:text-secondary-300">
                <Globe className="h-3 w-3" />
                {language}
              </span>
            )}
          </div>
        </div>

        {/* Title and Tamil Title */}
        <div className="mt-3">
          <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl flex items-center gap-2">
            {isHighlight && <Sparkles className="h-4 w-4 text-gold shrink-0" />}
            {title}
          </h3>
          {tamilTitle && (
            <p className="font-tamil text-xs sm:text-sm font-medium text-primary/80 dark:text-gold/80 mt-0.5">
              {tamilTitle}
            </p>
          )}
        </div>

        {/* Time Badge - Bold and prominent */}
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted/50 p-3 text-foreground dark:bg-muted/30">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold-300">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Scheduled Time</div>
            <div className="font-mono text-base sm:text-lg font-bold tracking-tight text-foreground">
              {time}
            </div>
          </div>
        </div>

        {/* Optional Celebrant and Intention */}
        {(celebrant || intention) && (
          <div className="mt-4 space-y-1.5 border-t border-border/60 pt-3 text-xs sm:text-sm">
            {celebrant && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-3.5 w-3.5 shrink-0 text-gold-600 dark:text-gold-400" />
                <span>
                  Celebrant:{' '}
                  <strong className="font-medium text-foreground">{celebrant}</strong>
                </span>
              </div>
            )}
            {intention && (
              <p className="italic text-muted-foreground line-clamp-2">
                &ldquo;{intention}&rdquo;
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

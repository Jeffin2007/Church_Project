import React from 'react';
import { SacredDivider } from './sacred-divider';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  tamilTitle?: string;
  align?: 'center' | 'left';
  ornament?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  tamilTitle,
  align = 'center',
  ornament = true,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 sm:mb-14 ${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      {/* Liturgical Eyebrow */}
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-primary dark:border-gold/30 dark:bg-gold/15 dark:text-gold-300 ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          <span>{eyebrow}</span>
        </div>
      )}

      {/* Main Title */}
      <h2
        className={`mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl ${
          eyebrow ? 'mt-3.5' : ''
        }`}
      >
        {title}
      </h2>

      {/* Optional Tamil Subtitle */}
      {tamilTitle && (
        <p className="mt-1.5 font-tamil text-sm font-medium text-primary/80 dark:text-gold/80 sm:text-base">
          {tamilTitle}
        </p>
      )}

      {/* Sacred Ornament Divider */}
      {ornament && (
        <div className={isCenter ? 'mx-auto' : 'mr-auto ml-0'}>
          <SacredDivider
            symbol="cross"
            width="sm"
            className={isCenter ? 'my-3.5' : 'my-3.5 !ml-0'}
          />
        </div>
      )}

      {/* Descriptive Lead / Subtitle */}
      {subtitle && (
        <p
          className={`text-sm text-muted-foreground sm:text-base lg:text-lg leading-relaxed ${
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          } ${!ornament ? 'mt-3' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

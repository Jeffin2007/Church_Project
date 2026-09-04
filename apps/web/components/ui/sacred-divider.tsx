import React from 'react';

export interface SacredDividerProps {
  symbol?: 'cross' | 'star' | 'diamond' | 'none';
  width?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

export const SacredDivider: React.FC<SacredDividerProps> = ({
  symbol = 'cross',
  width = 'md',
  className = '',
}) => {
  const widthClasses = {
    sm: 'max-w-xs',
    md: 'max-w-md',
    lg: 'max-w-xl',
    full: 'w-full',
  };

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`relative mx-auto my-8 flex items-center justify-center ${widthClasses[width]} ${className}`}
    >
      {/* Left gradient line */}
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold dark:via-gold/30 dark:to-gold/60" />

      {/* Emblem */}
      {symbol !== 'none' && (
        <div className="mx-3 flex items-center justify-center text-gold dark:text-gold-400">
          {symbol === 'cross' && (
            <svg
              className="h-4 w-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 2h4v5h5v4h-5v11h-4V11H5V7h5V2z" />
            </svg>
          )}

          {symbol === 'star' && (
            <svg
              className="h-4 w-4 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2l2.4 6.6L21 11l-5.4 4.2L17.5 22 12 18.2 6.5 22l1.9-6.8L3 11l6.6-2.4L12 2z" />
            </svg>
          )}

          {symbol === 'diamond' && (
            <div className="h-2.5 w-2.5 rotate-45 border border-gold/70 bg-gold/30 dark:border-gold-400 dark:bg-gold-500/20" />
          )}
        </div>
      )}

      {/* Right gradient line */}
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold dark:via-gold/30 dark:to-gold/60" />
    </div>
  );
};

import React from 'react';

export interface ParishBadgeProps {
  children: React.ReactNode;
  variant?:
    | 'burgundy'
    | 'marian'
    | 'gold'
    | 'solemnity'
    | 'ordinary'
    | 'penitential'
    | 'martyr'
    | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  pulse?: boolean;
  className?: string;
}

export const ParishBadge: React.FC<ParishBadgeProps> = ({
  children,
  variant = 'burgundy',
  size = 'md',
  icon,
  pulse = false,
  className = '',
}) => {
  const variantStyles = {
    burgundy:
      'bg-primary/10 text-primary border border-primary/20 dark:bg-primary/20 dark:text-primary-300 dark:border-primary/40',
    marian:
      'bg-secondary/10 text-secondary border border-secondary/20 dark:bg-secondary/25 dark:text-secondary-300 dark:border-secondary/40',
    gold:
      'bg-gold/15 text-amber-900 border border-gold/40 dark:bg-gold/20 dark:text-gold-300 dark:border-gold/50',
    solemnity:
      'bg-amber-50 text-amber-900 border border-gold/50 dark:bg-slate-800 dark:text-gold-300 dark:border-gold/60 font-semibold',
    ordinary:
      'bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700',
    penitential:
      'bg-purple-50 text-purple-800 border border-purple-300 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-700',
    martyr:
      'bg-red-50 text-red-800 border border-red-300 dark:bg-red-950/40 dark:text-red-300 dark:border-red-700',
    outline:
      'border border-border text-foreground dark:border-border/80 dark:text-foreground/90',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

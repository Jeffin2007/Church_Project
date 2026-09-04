import React from 'react';
import Link from 'next/link';

export interface ChurchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'burgundy' | 'marian' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export function churchButtonClassName(
  variant: ChurchButtonProps['variant'] = 'burgundy',
  size: ChurchButtonProps['size'] = 'md',
  extra = '',
): string {
  const base =
    'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none group';

  const variants = {
    burgundy:
      'bg-primary text-white hover:bg-primary-600 active:bg-primary-800 shadow-md hover:shadow-lg hover:shadow-primary/20 border border-primary-500/30 dark:border-gold/30',
    marian:
      'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-800 shadow-md hover:shadow-lg hover:shadow-secondary/25 border border-secondary-400/30 dark:border-secondary-300/30',
    gold:
      'bg-gold text-slate-900 font-semibold hover:bg-gold-300 active:bg-gold-500 shadow-md hover:shadow-lg hover:shadow-gold/30 border border-gold-300 dark:border-gold-400/40 candlelight-glow-subtle',
    outline:
      'border-2 border-primary/30 text-primary hover:border-primary hover:bg-primary/5 dark:border-gold/40 dark:text-gold-300 dark:hover:border-gold dark:hover:bg-gold/10',
    ghost:
      'text-foreground hover:bg-gold/10 hover:text-primary dark:hover:text-gold-300',
  };

  // Touch target friendly sizing: sm is min 40px, md is min 44px, lg is min 48px
  const sizes = {
    sm: 'min-h-[40px] px-3.5 py-1.5 text-xs sm:text-sm gap-1.5',
    md: 'min-h-[44px] px-5 py-2.5 text-sm gap-2',
    lg: 'min-h-[48px] px-7 py-3 text-base gap-2.5 font-semibold',
  };

  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(' ');
}

export const ChurchButton: React.FC<ChurchButtonProps> = ({
  variant = 'burgundy',
  size = 'md',
  href,
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const content = (
    <>
      {isLoading ? (
        <svg
          className="h-4 w-4 animate-spin text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {rightIcon}
        </span>
      )}
    </>
  );

  if (href && !disabled && !isLoading) {
    return (
      <Link href={href} className={churchButtonClassName(variant, size, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={churchButtonClassName(variant, size, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};

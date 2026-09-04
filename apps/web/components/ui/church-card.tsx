import React from 'react';

export interface ChurchCardProps {
  children: React.ReactNode;
  variant?: 'standard' | 'gold-trim' | 'burgundy-trim' | 'marian-trim';
  arch?: boolean;
  hoverEffect?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ChurchCard: React.FC<ChurchCardProps> = ({
  children,
  variant = 'standard',
  arch = false,
  hoverEffect = true,
  className = '',
  onClick,
}) => {
  const variantStyles = {
    standard: 'border-border/80 bg-card text-card-foreground shadow-sm',
    'gold-trim':
      'border-gold/40 bg-card text-card-foreground shadow-md hover:border-gold hover:shadow-gold/15',
    'burgundy-trim':
      'border-primary/30 bg-card text-card-foreground shadow-md hover:border-primary/70 hover:shadow-primary/10',
    'marian-trim':
      'border-secondary/30 bg-card text-card-foreground shadow-md hover:border-secondary/70 hover:shadow-secondary/15',
  };

  const archStyles = arch
    ? 'rounded-t-[2.5rem] sm:rounded-t-[3.5rem] rounded-b-xl'
    : 'rounded-2xl';

  const hoverStyles = hoverEffect
    ? 'transition-all duration-400 hover:-translate-y-1 hover:shadow-xl'
    : '';

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden border ${archStyles} ${variantStyles[variant]} ${hoverStyles} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Subtle top liturgical accent line */}
      {variant === 'gold-trim' && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      )}
      {variant === 'burgundy-trim' && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
      {variant === 'marian-trim' && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
      )}

      {children}
    </div>
  );
};

export const ChurchCardHeader: React.FC<{
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, icon, action, className = '' }) => {
  return (
    <div className={`flex items-start justify-between gap-3 p-5 sm:p-6 pb-2 sm:pb-3 ${className}`}>
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold-600 dark:bg-gold/15 dark:text-gold-400">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">{title}</h3>
          {subtitle && (
            <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export const ChurchCardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return <div className={`p-5 sm:p-6 pt-2 sm:pt-3 ${className}`}>{children}</div>;
};

export const ChurchCardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div
      className={`flex items-center justify-between border-t border-border/60 bg-muted/30 px-5 py-3 sm:px-6 sm:py-4 ${className}`}
    >
      {children}
    </div>
  );
};

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** When true, renders children directly (useful when wrapping a <Link>). */
  asChild?: boolean;
}

/**
 * The base <button> styling. Exported so <LinkButton> can reuse it.
 */
export function buttonClassName(
  variant: ButtonProps['variant'] = 'primary',
  size: ButtonProps['size'] = 'md',
  extra = '',
) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-primary text-white hover:bg-primary-700 focus:ring-primary',
    secondary: 'bg-secondary-200 text-foreground hover:bg-secondary-300 focus:ring-secondary-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline:
      'border border-border text-foreground hover:bg-muted focus:ring-primary dark:border-border dark:text-foreground dark:hover:bg-muted',
    ghost: 'text-foreground hover:bg-muted dark:text-foreground dark:hover:bg-muted',
  };

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(' ');
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  asChild = false,
  children,
  ...props
}) => {
  // When used as a slot container (e.g. wrapping <Link>), render a plain span
  // that passes the styling classes down to the child. Consumers should use
  // <Link className={buttonClassName(...)}> directly when possible.
  if (asChild) {
    return <span className={buttonClassName(variant, size, className)}>{children}</span>;
  }

  return (
    <button className={buttonClassName(variant, size, className)} {...props}>
      {children}
    </button>
  );
};

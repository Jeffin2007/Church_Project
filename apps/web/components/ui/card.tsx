import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`rounded-lg border border-border bg-card text-card-foreground p-5 shadow transition-colors ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}> = ({ title, subtitle, action }) => {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
      <div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

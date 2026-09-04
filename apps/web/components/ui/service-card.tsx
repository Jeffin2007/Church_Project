import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

export interface ServiceCardProps {
  title: string;
  tamilTitle?: string;
  icon?: React.ReactNode;
  description: string;
  schedule?: string;
  requirements?: string[];
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  tamilTitle,
  icon,
  description,
  schedule,
  requirements,
  actionHref,
  actionLabel = 'Inquire / Request',
  className = '',
}) => {
  return (
    <div
      className={`group relative flex flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl ${className}`}
    >
      {/* Icon and Titles */}
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-primary dark:bg-gold/15 dark:text-gold-400 group-hover:scale-105 transition-transform">
            {icon}
          </div>
        )}
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors sm:text-xl">
            {title}
          </h3>
          {tamilTitle && (
            <p className="font-tamil text-xs sm:text-sm font-medium text-primary/80 dark:text-gold/80 mt-0.5">
              {tamilTitle}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Schedule if available */}
      {schedule && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted/50 p-2.5 text-xs text-foreground dark:bg-muted/30">
          <Clock className="h-4 w-4 text-gold shrink-0" />
          <span>{schedule}</span>
        </div>
      )}

      {/* Requirements if available */}
      {requirements && requirements.length > 0 && (
        <div className="mt-4 border-t border-border/50 pt-3">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Key Prerequisites
          </div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action link */}
      {actionHref && (
        <div className="mt-auto pt-5">
          <Link
            href={actionHref}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary dark:text-gold hover:underline"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
};

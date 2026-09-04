import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { ParishBadge } from './parish-badge';
import { SafeImage } from './safe-image';

export interface EventDate {
  day: string;
  month: string;
  year?: string;
}

export interface EventCardProps {
  title: string;
  tamilTitle?: string;
  date: EventDate | string;
  time?: string;
  location?: string;
  description?: string;
  category?: string;
  image?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  tamilTitle,
  date,
  time,
  location,
  description,
  category,
  image,
  actionHref,
  actionLabel = 'Details',
  className = '',
}) => {
  const isDateObj = typeof date === 'object';

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl ${className}`}
    >
      {/* Optional Card Image Banner */}
      {image && (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <SafeImage
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {category && (
            <div className="absolute top-3 right-3">
              <ParishBadge variant="solemnity" size="sm">
                {category}
              </ParishBadge>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Calendar date badge */}
          {isDateObj ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-gold/40 bg-gold/10 px-3 py-2 text-center text-primary dark:bg-gold/15 dark:text-gold-300 shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {date.month}
              </span>
              <span className="font-heading text-xl font-bold leading-none text-foreground">
                {date.day}
              </span>
              {date.year && (
                <span className="text-[9px] text-muted-foreground mt-0.5">{date.year}</span>
              )}
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold-600 dark:bg-gold/15 dark:text-gold-400 shrink-0">
              <Calendar className="h-6 w-6" />
            </div>
          )}

          {/* Title and metadata */}
          <div className="flex-1">
            {!image && category && (
              <ParishBadge variant="gold" size="sm" className="mb-2">
                {category}
              </ParishBadge>
            )}
            <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors sm:text-xl">
              {title}
            </h3>
            {tamilTitle && (
              <p className="font-tamil text-xs font-medium text-primary/80 dark:text-gold/80 mt-0.5">
                {tamilTitle}
              </p>
            )}
          </div>
        </div>

        {/* Time and Location details */}
        <div className="mt-4 flex flex-col gap-1.5 text-xs sm:text-sm text-muted-foreground">
          {time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
              <span>{time}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-gold-600 dark:text-gold-400" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="mt-3 line-clamp-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}

        {/* Footer Action */}
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
    </article>
  );
};

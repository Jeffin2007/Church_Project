import React from 'react';
import Link from 'next/link';
import { Bell, AlertCircle, FileText, ArrowRight, Calendar } from 'lucide-react';
import { ParishBadge } from './parish-badge';

export interface AnnouncementCardProps {
  title: string;
  date: string;
  content: string | React.ReactNode;
  category?: 'pastoral' | 'bulletin' | 'feast' | 'general' | 'urgent';
  author?: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  date,
  content,
  category = 'general',
  author,
  actionHref,
  actionLabel = 'Read Full Announcement',
  className = '',
}) => {
  const categoryConfig = {
    urgent: {
      badge: 'Urgent Notice',
      badgeVariant: 'martyr' as const,
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      border: 'border-red-400/50 dark:border-red-500/40',
    },
    pastoral: {
      badge: 'Pastoral Letter',
      badgeVariant: 'burgundy' as const,
      icon: <FileText className="h-5 w-5 text-primary" />,
      border: 'border-primary/40 dark:border-primary/50',
    },
    feast: {
      badge: 'Feast Announcement',
      badgeVariant: 'solemnity' as const,
      icon: <Bell className="h-5 w-5 text-gold-600" />,
      border: 'border-gold/50 dark:border-gold/50',
    },
    bulletin: {
      badge: 'Parish Bulletin',
      badgeVariant: 'marian' as const,
      icon: <FileText className="h-5 w-5 text-secondary" />,
      border: 'border-secondary/40 dark:border-secondary/50',
    },
    general: {
      badge: 'Parish News',
      badgeVariant: 'outline' as const,
      icon: <Bell className="h-5 w-5 text-muted-foreground" />,
      border: 'border-border',
    },
  };

  const current = categoryConfig[category];

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-card p-5 sm:p-6 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md ${current.border} ${className}`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {current.icon}
          <ParishBadge variant={current.badgeVariant} size="sm">
            {current.badge}
          </ParishBadge>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{date}</span>
        </div>
      </div>

      {/* Main Title */}
      <h3 className="mt-3.5 font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors sm:text-xl">
        {title}
      </h3>

      {/* Author/Source if present */}
      {author && (
        <p className="mt-1 text-xs text-muted-foreground font-medium">
          By: <span className="text-foreground">{author}</span>
        </p>
      )}

      {/* Content */}
      <div className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {typeof content === 'string' ? (
          <p className="line-clamp-3">{content}</p>
        ) : (
          content
        )}
      </div>

      {/* Optional action button */}
      {actionHref && (
        <div className="mt-4 pt-3 border-t border-border/50">
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

import React from 'react';
import { Phone, Mail, Award, Calendar, Sparkles } from 'lucide-react';
import { SafeImage } from './safe-image';

export interface PriestCardProps {
  name: string;
  tamilName?: string;
  role: string;
  tamilRole?: string;
  image?: string;
  ordinationDate?: string;
  feastDay?: string;
  bio?: string;
  phone?: string;
  email?: string;
  motto?: string;
  className?: string;
}

export const PriestCard: React.FC<PriestCardProps> = ({
  name,
  tamilName,
  role,
  tamilRole,
  image = '/images/priests/default-priest.webp',
  ordinationDate,
  feastDay,
  bio,
  phone,
  email,
  motto,
  className = '',
}) => {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl ${className}`}
    >
      {/* Top gold accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-gold to-secondary" />

      {/* Priest Portrait with Arch framing */}
      <div className="relative pt-6 px-6 flex justify-center">
        <div className="relative h-44 w-36 sm:h-52 sm:w-44 overflow-hidden rounded-t-[3.5rem] rounded-b-xl border-2 border-gold/40 shadow-md bg-muted">
          <SafeImage
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6 text-center">
        {/* Name and Tamil Name */}
        <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">{name}</h3>
        {tamilName && (
          <p className="font-tamil text-xs sm:text-sm font-medium text-primary/80 dark:text-gold/80 mt-0.5">
            {tamilName}
          </p>
        )}

        {/* Clergy Role Badge */}
        <div className="mt-2.5 inline-flex items-center justify-center gap-1.5 self-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-primary dark:text-gold-300">
          <span>{role}</span>
          {tamilRole && <span className="font-tamil opacity-75">({tamilRole})</span>}
        </div>

        {/* Motto */}
        {motto && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs italic text-muted-foreground">
            <Sparkles className="h-3 w-3 text-gold shrink-0" />
            <span>&ldquo;{motto}&rdquo;</span>
          </div>
        )}

        {/* Bio */}
        {bio && (
          <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {bio}
          </p>
        )}

        {/* Ordination & Feast Details */}
        {(ordinationDate || feastDay) && (
          <div className="mt-4 border-t border-border/60 pt-3 flex flex-col gap-1.5 text-xs text-muted-foreground text-left">
            {ordinationDate && (
              <div className="flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400 shrink-0" />
                <span>Ordination: {ordinationDate}</span>
              </div>
            )}
            {feastDay && (
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-gold-600 dark:text-gold-400 shrink-0" />
                <span>Patronal Feast: {feastDay}</span>
              </div>
            )}
          </div>
        )}

        {/* Contact Links */}
        {(phone || email) && (
          <div className="mt-auto pt-4 flex items-center justify-center gap-3">
            {phone && (
              <a
                href={`tel:${phone}`}
                aria-label={`Call ${name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/50 text-foreground transition-colors hover:border-gold hover:text-primary dark:hover:text-gold"
              >
                <Phone className="h-4 w-4" />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                aria-label={`Email ${name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/50 text-foreground transition-colors hover:border-gold hover:text-primary dark:hover:text-gold"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

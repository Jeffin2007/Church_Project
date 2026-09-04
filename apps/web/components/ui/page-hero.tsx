import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { SacredDivider } from './sacred-divider';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeroProps {
  title: string | React.ReactNode;
  tamilTitle?: string;
  eyebrow?: string;
  description?: string | React.ReactNode;
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  tamilTitle,
  eyebrow,
  description,
  backgroundImage = '/images/hero/church-altar.webp',
  breadcrumbs,
  badge,
  actions,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <section
      className={`relative overflow-hidden bg-[#001428] text-white pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 ${className}`}
    >
      {/* Background image with sacred atmospheric overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 opacity-65"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Cathedral Marian Blue & Deep Navy vignette - ensures high contrast readability while keeping image vividly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001833]/85 via-[#002244]/75 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/25 via-transparent to-transparent" />
      </div>

      <div className="container-sacred relative z-10">
        {/* Optional Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={`mb-6 flex items-center gap-1.5 text-xs font-medium text-white/75 sm:text-sm ${
              isCenter ? 'justify-center' : 'justify-start'
            }`}
          >
            <Link
              href="/"
              className="flex items-center gap-1 text-white/80 transition-colors hover:text-gold"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((item, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3 w-3 text-white/50" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-white/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-gold">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'}`}>
          {/* Eyebrow or Custom Badge */}
          {badge ? (
            <div className="mb-4">{badge}</div>
          ) : eyebrow ? (
            <div
              className={`mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-200 backdrop-blur-sm ${
                isCenter ? 'mx-auto' : ''
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <span>{eyebrow}</span>
            </div>
          ) : null}

          {/* Page Title */}
          <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-sm">
            {title}
          </h1>

          {/* Tamil translation title */}
          {tamilTitle && (
            <p className="mt-2 font-tamil text-base sm:text-lg lg:text-xl font-medium text-gold-300 drop-shadow-sm">
              {tamilTitle}
            </p>
          )}

          {/* Liturgical divider */}
          <div className={isCenter ? 'mx-auto' : 'mr-auto ml-0'}>
            <SacredDivider
              symbol="cross"
              width="sm"
              className={isCenter ? 'my-4 sm:my-6' : 'my-4 sm:my-6 !ml-0'}
            />
          </div>

          {/* Lead description */}
          {description && (
            <p
              className={`text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed font-normal ${
                isCenter ? 'mx-auto' : ''
              }`}
            >
              {description}
            </p>
          )}

          {/* Action buttons */}
          {actions && (
            <div
              className={`mt-8 flex flex-wrap gap-4 ${
                isCenter ? 'justify-center' : 'justify-start'
              }`}
            >
              {actions}
            </div>
          )}
        </div>
      </div>

      {/* Subtle cathedral bottom border curve or accent line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
};

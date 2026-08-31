'use client';

import { PARISH } from '@/lib/parish-data';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Church, Cross, Users, Heart, Calendar, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  church: Church,
  cross: Cross,
  users: Users,
  heart: Heart,
  calendar: Calendar,
  star: Star,
};

export function ParishStats() {
  return (
    <section
      aria-label="Parish Statistics"
      className="section-padding-sm border-border from-primary/5 via-background to-gold-500/5 border-y bg-gradient-to-br"
    >
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mb-12 text-center">
            <p className="text-primary mb-2 text-sm font-semibold uppercase tracking-[0.2em]">
              Our Parish at a Glance · ஒரு பார்வையில் நம் பங்கு
            </p>
            <h2 className="font-display text-foreground text-3xl font-bold md:text-4xl">
              Built on Faith Since{' '}
              <span className="text-gradient-primary">{PARISH.identity.founded}</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* lg:grid-cols-3 prevents cards being too narrow on 1024–1279px; xl expands to 6 */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">
          {PARISH.stats.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon] ?? Church;
            return (
              <ScrollReveal key={stat.label} animation="scale-in" delay={i * 70}>
                <div className="border-border bg-card hover:border-primary group flex flex-col items-center rounded-2xl border-2 px-4 py-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  {/* Icon */}
                  <div className="bg-primary/10 group-hover:bg-primary mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
                    <Icon
                      className="text-primary h-6 w-6 transition-colors group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Value */}
                  <p className="font-display text-foreground text-3xl font-bold md:text-4xl">
                    {stat.value}
                  </p>

                  {/* Label */}
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {stat.label}
                  </p>
                  <p
                    className="mt-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300"
                    lang="ta"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  >
                    {stat.labelTa}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Tagline */}
        <ScrollReveal animation="fade-in-up" delay={250}>
          <div className="mt-10 text-center">
            <p className="text-base font-bold italic text-slate-800 dark:text-slate-200">
              &ldquo;{PARISH.identity.tagline}&rdquo;
            </p>
            <p
              className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300"
              lang="ta"
              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
            >
              &ldquo;{PARISH.identity.taglineTa}&rdquo;
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

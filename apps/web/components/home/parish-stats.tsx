'use client';

import { PARISH } from '@/lib/parish-data';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Church, Cross, Users, Heart, Calendar, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const ICON_MAP: Record<string, LucideIcon> = {
  church: Church,
  cross: Cross,
  users: Users,
  heart: Heart,
  calendar: Calendar,
  star: Star,
};

export function ParishStats() {
  const { isTamil, t } = useLanguage();

  return (
    <section
      aria-label="Parish Statistics"
      className="section-padding-sm border-border from-primary/5 via-background to-gold-500/5 border-y bg-gradient-to-br"
    >
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mb-12 text-center">
            <p
              className="text-primary dark:text-gold-400 mb-2 text-sm font-black uppercase tracking-[0.2em]"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t('Our Parish at a Glance', 'ஒரு பார்வையில் நம் பங்கு')}
            </p>
            <h2
              className="font-display text-slate-950 dark:text-white text-3xl font-black md:text-4xl"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {isTamil ? (
                <>
                  <span className="text-primary dark:text-gold-400 font-black">{PARISH.identity.founded}</span> முதல் இறை நம்பிக்கையில்
                </>
              ) : (
                <>
                  Built on Faith Since{' '}
                  <span className="text-primary dark:text-gold-400 font-black">{PARISH.identity.founded}</span>
                </>
              )}
            </h2>
          </div>
        </ScrollReveal>

        {/* lg:grid-cols-3 prevents cards being too narrow on 1024–1279px; xl expands to 6 */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">
          {PARISH.stats.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon] ?? Church;
            return (
              <ScrollReveal key={stat.label} animation="scale-in" delay={i * 70}>
                <div className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/90 hover:border-primary group flex flex-col items-center rounded-2xl border-2 px-4 py-6 text-center shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  {/* Icon */}
                  <div className="bg-primary/10 dark:bg-primary/20 group-hover:bg-primary mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
                    <Icon
                      className="text-primary dark:text-gold-400 h-6 w-6 transition-colors group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Value */}
                  <p className="font-display text-slate-950 dark:text-white text-3xl font-black md:text-4xl">
                    {stat.value}
                  </p>

                  {/* Label */}
                  <p
                    className="mt-2 text-xs font-black uppercase tracking-wider text-slate-950 dark:text-slate-200"
                    style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                  >
                    {isTamil ? stat.labelTa : stat.label}
                  </p>
                  {!isTamil && (
                    <p
                      className="mt-1 text-xs font-black text-primary dark:text-gold-400"
                      lang="ta"
                      style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                    >
                      {stat.labelTa}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Tagline */}
        <ScrollReveal animation="fade-in-up" delay={250}>
          <div className="mt-10 text-center">
            <p
              className="text-lg font-black italic text-slate-950 dark:text-white"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              &ldquo;{isTamil ? PARISH.identity.taglineTa : PARISH.identity.tagline}&rdquo;
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

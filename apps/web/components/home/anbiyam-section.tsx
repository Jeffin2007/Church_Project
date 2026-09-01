'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH } from '@/lib/parish-data';
import { SafeImage } from '@/components/ui/safe-image';
import { Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export function AnbiyamSection() {
  const { isTamil, t } = useLanguage();

  return (
    <section className="section-padding bg-secondary-200/30 dark:bg-slate-900/50">
      <div className="container-sacred">
        {/* ── Header ── */}
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p
              className="text-primary dark:text-gold-400 mb-4 text-sm font-black uppercase tracking-[0.2em]"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t('Small Faith Communities · அன்பியங்கள்', 'அன்பியங்கள் · சிறு கிறிஸ்தவ சமூகம்')}
            </p>
            <h2
              className="font-display mb-4 text-4xl font-black leading-tight text-slate-950 dark:text-white md:text-5xl lg:text-6xl"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {isTamil ? (
                <>
                  பங்கு <span className="text-primary dark:text-rose-400 font-black">அன்பியங்கள்</span>
                </>
              ) : (
                <>
                  <span className="text-secondary-800 dark:text-secondary-300 font-black">Parish</span>{' '}
                  <span className="text-primary dark:text-rose-400 font-black">Anbiyams</span>
                </>
              )}
            </h2>
            <p
              className="text-lg font-black text-slate-900 dark:text-slate-200 md:text-xl"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t(
                '13 neighbourhood communities woven together by faith and fellowship',
                'நம்பிக்கையிலும் நட்பிலும் ஒன்றிணைந்த 13 அன்பியங்கள்',
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* ── Cards ── */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {PARISH.anbiyams.map((anbiyam, i) => (
            <ScrollReveal key={anbiyam.id} animation="scale-in" delay={i * 50} threshold={0.05}>
              <Card className="hover:border-primary group flex h-full flex-col justify-between overflow-hidden rounded-2xl border-2 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/90 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                <div>
                  {/* Cover photo */}
                  <div className="bg-slate-50 dark:bg-slate-800/80 relative flex aspect-square items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800 p-3">
                    <SafeImage
                      src={anbiyam.image}
                      alt={anbiyam.name}
                      fill
                      loading="lazy"
                      className="object-contain p-2 transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      placeholderClassName="absolute inset-0"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3
                      className="font-display mb-0.5 text-base font-black leading-snug text-slate-950 dark:text-white"
                      style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                    >
                      {isTamil ? anbiyam.nameTa : anbiyam.name}
                    </h3>
                    {!isTamil && (
                      <p
                        className="mb-3 text-xs font-bold text-primary dark:text-rose-400"
                        lang="ta"
                        style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                      >
                        {anbiyam.nameTa}
                      </p>
                    )}

                    {/* Incharge */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="bg-primary/10 dark:bg-primary/20 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        <Users className="text-primary dark:text-gold-400 h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                      <p
                        className="text-xs font-extrabold text-slate-900 dark:text-slate-200"
                        style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                      >
                        {anbiyam.incharge}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Protected Join Anbiyam CTA */}
                <div className="p-4 pt-0">
                  <Link
                    href={`/login?redirect=/family/anbiyam`}
                    className="text-primary dark:text-rose-300 hover:text-white dark:hover:text-white border-primary/40 dark:border-rose-500/40 bg-primary/10 dark:bg-rose-950/40 hover:bg-primary dark:hover:bg-primary inline-flex w-full items-center justify-center gap-1 rounded-xl border py-2 text-xs font-extrabold transition-colors shadow-sm"
                    style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                  >
                    <span>{t('Join Anbiyam', 'அன்பியத்தில் இணைய')}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

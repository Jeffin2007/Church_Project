'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH } from '@/lib/parish-data';
import { SafeImage } from '@/components/ui/safe-image';
import { Sparkles, Landmark } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function HistoryTimeline() {
  const { isTamil, t } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden bg-background text-foreground">
      {/* Cathedral SVG grid texture & ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' stroke='%23C9A227' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.15),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container-sacred relative z-10">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
            <div className="border-gold-500/40 bg-gold-500/10 text-gold-700 dark:text-gold-300 mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
              <Landmark className="h-3.5 w-3.5" />
              <span>{t('Sacred Heritage', 'பங்கு வரலாறு')}</span>
            </div>
            <h2 className="font-display mb-4 text-4xl font-bold leading-tight text-slate-950 dark:text-white md:text-5xl lg:text-6xl" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
              {isTamil ? (
                <>
                  பங்கு <span className="text-gradient-gold">வரலாற்று மைல்கற்கள்</span>
                </>
              ) : (
                <>
                  Parish <span className="text-gradient-gold">History & Milestones</span>
                </>
              )}
            </h2>
            <p className="text-lg font-medium text-slate-700 dark:text-white/90" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
              {t(
                'From a humble home in K.K. Nagar to a thriving independent parish',
                'கேகேநகரில் ஒரு சிறிய இல்லத்திலிருந்து வளர்ந்து நிற்கும் அருள்பணி தளம்',
              )}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mx-auto max-w-5xl pb-8">
          {/* Animated Gold Spine Line — Perfectly centered on desktop (left-1/2 -translate-x-1/2), left-6 on mobile */}
          <div
            className="from-gold-500 via-gold-400 to-amber-600 dark:from-gold-400 dark:via-gold-300 dark:to-gold-500 absolute bottom-0 left-6 top-0 w-1 -translate-x-1/2 bg-gradient-to-b shadow-[0_0_12px_rgba(201,162,39,0.3)] md:left-1/2"
            aria-hidden="true"
          />

          <div className="space-y-16 md:space-y-24">
            {PARISH.history.milestones.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={event.year}
                  className={`relative flex flex-col items-start md:flex-row ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Year Marker Circle Node — Anchored on golden spine */}
                  <div className="border-gold-500 dark:border-gold-400 absolute left-6 top-10 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 bg-white text-slate-900 shadow-lg dark:bg-gradient-to-br dark:from-[hsl(214,75%,18%)] dark:to-[hsl(214,80%,10%)] dark:text-gold-300 md:left-1/2 md:top-12">
                    <span className="text-primary dark:text-gold-300 px-1 text-center text-xs font-black tracking-tight md:text-sm">
                      {event.year}
                    </span>
                  </div>

                  {/* Horizontal Connector Line (Desktop) — Connects center spine to card edge */}
                  <div
                    className={`from-gold-400 to-gold-400/20 absolute top-16 z-0 hidden h-0.5 bg-gradient-to-r md:block ${
                      isEven ? 'left-1/2 ml-7 w-6 lg:w-10' : 'right-1/2 mr-7 w-6 lg:w-10'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Spacer for 50/50 balance */}
                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" aria-hidden="true" />

                  {/* Card Container */}
                  <div
                    className={`relative z-10 ml-14 w-[calc(100%-3.5rem)] md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isEven ? 'md:pl-8 md:pr-0 lg:pl-12' : 'md:pl-0 md:pr-8 lg:pr-12'
                    }`}
                  >
                    <ScrollReveal
                      animation={isEven ? 'slide-in-left' : 'slide-in-right'}
                      delay={index * 100}
                      duration={900}
                      threshold={0.12}
                      className="h-full"
                    >
                      <Card className="hover:border-gold/60 group overflow-hidden border border-border/80 bg-card text-card-foreground p-0 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-card/90">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <SafeImage
                            src={event.image}
                            alt={isTamil ? event.titleTa : event.title}
                            fill
                            loading="lazy"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            placeholderClassName="absolute inset-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5">
                            <span className="text-gold-400 mb-1 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                              <Sparkles className="h-3 w-3" />
                              {t('Milestone', 'மைல்கல்')}
                            </span>
                            <h3 className="font-display text-xl font-bold text-white drop-shadow-md md:text-2xl" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                              {isTamil ? event.titleTa : event.title}
                            </h3>
                          </div>
                        </div>
                        <div className="space-y-3 p-6 md:p-7">
                          <p className="text-sm font-normal leading-relaxed text-slate-800 dark:text-slate-100 md:text-base" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                            {isTamil ? event.bodyTa : event.body}
                          </p>
                        </div>
                      </Card>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH } from '@/lib/parish-data';
import { SafeImage } from '@/components/ui/safe-image';
import { Sparkles, Landmark } from 'lucide-react';

export function HistoryTimeline() {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-[hsl(214,65%,16%)] via-[hsl(214,60%,20%)] to-[hsl(214,70%,14%)] text-white">
      {/* Cathedral SVG grid texture & ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' stroke='%23C9A227' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.15),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container-sacred relative z-10">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
            <div className="border-gold-400/40 bg-gold-500/10 text-gold-300 mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
              <Landmark className="h-3.5 w-3.5" />
              <span>Sacred Heritage · பங்கு வரலாறு</span>
            </div>
            <h2 className="font-display mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Parish <span className="text-gradient-gold">History & Milestones</span>
            </h2>
            <p className="text-lg font-medium text-white/90">
              From a humble home in K.K. Nagar to a thriving independent parish
            </p>
            <p
              className="mt-1 text-sm text-white/75"
              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
              lang="ta"
            >
              கேகேநகரில் ஒரு சிறிய வீட்டிலிருந்து தனி பங்கு வரை
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mx-auto max-w-5xl pb-4">
          {/* Animated Gold Spine */}
          <div
            className="from-gold-400 via-gold-300 to-gold-500 absolute bottom-0 left-8 top-0 w-1 bg-gradient-to-b shadow-[0_0_12px_rgba(201,162,39,0.5)] md:left-1/2 md:-translate-x-px"
            aria-hidden="true"
          />

          <div className="space-y-16 md:space-y-24">
            {PARISH.history.milestones.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={event.year}
                  className={`relative flex items-stretch pt-2 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Year Marker Badge */}
                  <div className="border-gold-400 absolute left-8 top-8 z-20 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 bg-gradient-to-br from-[hsl(214,75%,18%)] to-[hsl(214,80%,10%)] shadow-[0_0_20px_rgba(201,162,39,0.4)] md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                    <span className="text-gold-300 px-1 text-center text-xs font-black tracking-tight md:text-sm">
                      {event.year}
                    </span>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" aria-hidden="true" />

                  {/* Card */}
                  <div
                    className={`w-full md:w-[calc(50%-2.5rem)] ${isEven ? 'md:pr-10 lg:pr-14' : 'md:pl-10 lg:pl-14'}`}
                  >
                    <ScrollReveal
                      animation={isEven ? 'slide-in-left' : 'slide-in-right'}
                      delay={index * 100}
                      duration={900}
                      threshold={0.12}
                      className="h-full"
                    >
                      <Card className="hover:border-gold-400/60 group ml-20 overflow-hidden border-2 border-white/20 bg-white/[0.08] p-0 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] md:ml-0">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <SafeImage
                            src={event.image}
                            alt={event.title}
                            fill
                            loading="lazy"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            placeholderClassName="absolute inset-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(214,70%,12%)] via-black/30 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5">
                            <span className="text-gold-400 mb-1 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider">
                              <Sparkles className="h-3 w-3" />
                              Milestone
                            </span>
                            <h3 className="font-display text-xl font-bold text-white drop-shadow md:text-2xl">
                              {event.title}
                            </h3>
                            <p
                              className="text-gold-200 mt-0.5 text-xs font-medium"
                              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                              lang="ta"
                            >
                              {event.titleTa}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3 p-6 md:p-7">
                          <p className="text-sm font-medium leading-relaxed text-white/90 md:text-base">
                            {event.body}
                          </p>
                          <p
                            className="text-xs font-medium leading-loose text-white/75 md:text-sm"
                            style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                            lang="ta"
                          >
                            {event.bodyTa}
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

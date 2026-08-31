'use client';

import { Card } from '@/components/ui/card';
import { buttonClassName } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH } from '@/lib/parish-data';
import { Flag, Sparkles, Church, PartyPopper, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

const EVENT_ICONS: LucideIcon[] = [Flag, Sparkles, Church, PartyPopper, ChevronDown];

export function FeastSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background — Marian blue to maroon gradient */}
      <div
        className="from-primary/95 via-secondary-700/90 to-burgundy-900/95 absolute inset-0 bg-gradient-to-br"
        aria-hidden="true"
      />

      {/* Star ornament */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Cpolygon points='36,4 42,24 62,24 46,36 52,56 36,44 20,56 26,36 10,24 30,24' fill='%23C9A227'/%3E%3C/svg%3E")`,
          backgroundSize: '72px 72px',
        }}
      />

      <div className="section-padding relative">
        <div className="container-sacred">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <ScrollReveal animation="fade-in-up">
              <div className="mb-16 text-center md:mb-20">
                <div className="mb-6 flex justify-center">
                  <div className="border-gold-400/60 flex h-20 w-20 items-center justify-center rounded-full border-4 bg-white/10 shadow-2xl backdrop-blur-sm md:h-24 md:w-24">
                    <Church
                      className="h-10 w-10 md:h-12 md:w-12"
                      style={{ color: 'hsl(43,70%,65%)' }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <p
                  className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'hsl(43,60%,72%)' }}
                >
                  Annual Parish Celebration · ஆண்டு திருவிழா
                </p>
                <h2 className="font-display mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                  {PARISH.feast.title}
                </h2>
                <p
                  className="mb-2 text-xl font-medium text-white/85"
                  lang="ta"
                  style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                >
                  {PARISH.feast.titleTa}
                </p>

                {/* Chariot note */}
                <p
                  className="text-amber-200 mx-auto mt-5 max-w-2xl text-sm font-semibold md:text-base"
                >
                  {PARISH.feast.chariots}
                </p>
                <p
                  className="mx-auto mt-2 max-w-2xl text-xs font-semibold text-white/85 md:text-sm"
                  lang="ta"
                  style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                >
                  {PARISH.feast.chariotsTa}
                </p>
              </div>
            </ScrollReveal>

            {/* Event cards */}
            <div className="mb-16 grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {PARISH.feast.events.map((ev, i) => {
                const Icon = EVENT_ICONS[i] ?? Sparkles;
                return (
                  <ScrollReveal key={ev.title} animation="fade-in-up" delay={i * 90}>
                    <Card className="card-sacred hover:border-gold-400/60 group h-full border-white/20 bg-white/10 p-0 shadow-xl backdrop-blur-md hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl">
                      <div className="flex items-start gap-4 p-6 md:p-7">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-lg transition-transform duration-500 group-hover:scale-105"
                          style={{ background: 'hsl(43,69%,47%)' }}
                        >
                          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-display mb-1 text-lg font-bold text-white md:text-xl">
                            {ev.title}
                          </h3>
                          <p
                            className="text-amber-300 mb-2 text-xs font-semibold"
                            lang="ta"
                            style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                          >
                            {ev.titleTa}
                          </p>
                          <p className="text-sm font-medium text-white/90">{ev.desc}</p>
                          <p
                            className="mt-2 text-xs font-semibold text-white/80"
                            lang="ta"
                            style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                          >
                            {ev.descTa}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Schedule blurb + CTAs */}
            <ScrollReveal animation="fade-in-up" delay={260}>
              <Card className="border-gold-400/25 rounded-2xl border-2 bg-white/5 p-0 shadow-xl backdrop-blur-md">
                <div className="p-8 text-center md:p-12">
                  <p className="mb-4 text-base leading-relaxed text-white/90 md:text-lg">
                    {PARISH.feast.schedule}
                  </p>
                  <p
                    className="mb-8 text-sm leading-loose text-white/70 md:mb-10"
                    lang="ta"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  >
                    {PARISH.feast.scheduleTa}
                  </p>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                    <Link
                      href="/feast"
                      className={buttonClassName('primary', 'lg', 'h-12 px-8')}
                      style={{ background: 'hsl(43,69%,47%)', color: 'hsl(214,75%,15%)' }}
                    >
                      View Feast Schedule
                    </Link>
                    <Link
                      href="/gallery"
                      className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-white/50 bg-white/10 px-8 text-base font-medium text-white transition-colors duration-300 hover:bg-white/20"
                    >
                      View Past Celebrations
                    </Link>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

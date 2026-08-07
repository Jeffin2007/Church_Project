'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH } from '@/lib/parish-data';
import { SafeImage } from '@/components/ui/safe-image';
import { Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function AnbiyamSection() {
  return (
    <section className="section-padding bg-secondary-200/30">
      <div className="container-sacred">
        {/* ── Header ── */}
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-primary dark:text-gold-400 mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              Small Faith Communities
            </p>
            <h2 className="font-display mb-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl lg:text-6xl dark:text-white">
              Parish <span className="text-gradient-primary">Anbiyams</span>
            </h2>
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-300">
              13 neighbourhood communities woven together by faith and fellowship
            </p>
            <p
              className="mt-1 text-base font-semibold text-slate-800 dark:text-slate-300"
              lang="ta"
              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
            >
              நம்பிக்கையிலும் நட்பிலும் ஒன்றிணைந்த 13 அன்பியங்கள்
            </p>
          </div>
        </ScrollReveal>

        {/* ── Cards ── */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {PARISH.anbiyams.map((anbiyam, i) => (
            <ScrollReveal key={anbiyam.id} animation="scale-in" delay={i * 50} threshold={0.05}>
              <Card className="hover:border-primary group flex h-full flex-col justify-between overflow-hidden border-2 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                <div>
                  {/* Cover photo */}
                  <div className="bg-primary/5 relative flex aspect-square items-center justify-center overflow-hidden rounded-t-2xl p-4">
                    <SafeImage
                      src={anbiyam.image}
                      alt={anbiyam.name}
                      fill
                      loading="lazy"
                      className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      placeholderClassName="absolute inset-0"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-display mb-0.5 text-base font-extrabold leading-snug text-slate-900 dark:text-slate-100">
                      {anbiyam.name}
                    </h3>
                    <p
                      className="mb-3 text-xs font-semibold text-slate-700 dark:text-slate-300"
                      lang="ta"
                      style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                    >
                      {anbiyam.nameTa}
                    </p>

                    {/* Incharge */}
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        <Users className="text-primary h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {anbiyam.incharge}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Protected Join Anbiyam CTA */}
                <div className="p-4 pt-0">
                  <Link
                    href={`/login?redirect=/family/anbiyam`}
                    className="text-primary hover:text-primary-600 border-primary/20 hover:bg-primary/5 inline-flex w-full items-center justify-center gap-1 rounded-lg border py-1.5 text-[11px] font-bold transition-colors"
                  >
                    <span>Join Anbiyam</span>
                    <ChevronRight className="h-3 w-3" />
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

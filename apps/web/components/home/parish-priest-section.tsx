'use client';

import { Card } from '@/components/ui/card';
import { buttonClassName } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH } from '@/lib/parish-data';
import { Mail, Phone, Quote, ChevronDown } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/language-context';

export function ParishPriestSection() {
  const [showTimeline, setShowTimeline] = useState(false);
  const { isTamil, t } = useLanguage();

  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900/60">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-primary dark:text-gold-400 mb-4 text-sm font-black uppercase tracking-[0.2em]">
              {t('Our Shepherd', 'எங்கள் ஆயன்')}
            </p>
            <h2 className="font-display text-slate-950 dark:text-white text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              {isTamil ? (
                <>
                  பங்குத்தந்தை <span className="text-primary dark:text-gold-400 font-black">{PARISH.clergy.current.nameTa}</span>
                </>
              ) : (
                <>
                  Meet Your <span className="text-primary dark:text-gold-400 font-black">Parish Priest</span>
                </>
              )}
            </h2>
          </div>
        </ScrollReveal>

        {/* Priest profile card */}
        <ScrollReveal animation="scale-in" delay={100} threshold={0.1}>
          <div className="mx-auto max-w-5xl">
            <Card className="overflow-hidden border-2 shadow-2xl">
              <div className="grid gap-0 lg:grid-cols-5">
                {/* Portrait */}
                <div className="relative lg:col-span-2">
                  {/* Mobile: 4/3 landscape crop avoids tall clip; portrait from sm up */}
                  <div className="relative aspect-[4/3] sm:aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[480px]">
                    <SafeImage
                      src="/images/priest/fr-arokiyaswamy.jpg"
                      alt={isTamil ? `${PARISH.clergy.current.nameTa} — பங்குத்தந்தை` : `${PARISH.clergy.current.name} — Parish Priest`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      placeholderLabel={isTamil ? PARISH.clergy.current.nameTa : PARISH.clergy.current.name}
                      placeholderClassName="absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r" />
                  </div>
                  {/* Gold spine */}
                  <div
                    className="from-primary via-gold-500 to-primary absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r lg:bottom-auto lg:right-0 lg:top-0 lg:h-full lg:w-1 lg:bg-gradient-to-b"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="flex min-w-0 max-w-full flex-col justify-center overflow-hidden p-4 sm:p-7 lg:col-span-3 lg:p-14">
                  <div className="min-w-0 max-w-full space-y-6 break-words">
                    <div>
                      <h2 className="font-display mb-1.5 text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl md:text-4xl lg:text-5xl dark:text-white" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                        {isTamil ? PARISH.clergy.current.nameTa : PARISH.clergy.current.name}
                      </h2>
                      <p className="text-amber-800 dark:text-gold-300 mt-2 text-base font-extrabold tracking-wide sm:text-lg md:text-xl" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                        {isTamil ? `${PARISH.clergy.current.roleTa} · ${PARISH.clergy.current.since} முதல்` : `${PARISH.clergy.current.role} · since ${PARISH.clergy.current.since}`}
                      </p>
                    </div>

                    <div className="divider-sacred" />

                    {/* Quote */}
                    <div className="relative min-w-0 max-w-full">
                      <Quote
                        className="text-primary/40 absolute -left-1 -top-2 h-7 w-7"
                        aria-hidden="true"
                      />
                      <blockquote className="pl-7 text-base font-semibold italic leading-relaxed text-slate-950 md:text-lg dark:text-white" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                        &ldquo;{isTamil ? PARISH.clergy.current.quoteTa : PARISH.clergy.current.quote}&rdquo;
                      </blockquote>
                    </div>

                    {/* Bio */}
                    <div className="min-w-0 max-w-full space-y-2 break-words">
                      <p className="text-sm font-medium leading-relaxed text-slate-900 sm:text-base dark:text-slate-100" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                        {isTamil ? PARISH.clergy.current.bioTa : PARISH.clergy.current.bio}
                      </p>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                      <div className="bg-primary/10 dark:bg-primary/20 border-primary/20 flex min-w-0 max-w-full items-center gap-2.5 rounded-xl border px-3.5 py-2 text-sm">
                        <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm">
                          <Phone className="h-4 w-4 text-white" aria-hidden="true" />
                        </div>
                        <span className="tracking-medium font-bold text-slate-950 dark:text-white">
                          {PARISH.clergy.current.phone}
                        </span>
                      </div>
                      <div className="bg-primary/10 dark:bg-primary/20 border-primary/20 flex min-w-0 max-w-full items-center gap-2.5 rounded-xl border px-3.5 py-2 text-sm">
                        <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-sm">
                          <Mail className="h-4 w-4 text-white" aria-hidden="true" />
                        </div>
                        <span className="tracking-medium break-all font-bold text-slate-950 dark:text-white">
                          {PARISH.clergy.current.email}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/contact"
                        className={buttonClassName('primary', 'lg', 'font-bold shadow-md')}
                        style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                      >
                        {t('Contact Parish Office', 'பங்கு அலுவலகத்தை தொடர்பு கொள்ள')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </ScrollReveal>

        {/* Priest timeline toggle */}
        <ScrollReveal animation="fade-in-up" delay={200}>
          <div className="mx-auto mt-10 max-w-5xl">
            <button
              onClick={() => setShowTimeline((v) => !v)}
              className="border-slate-200 bg-white hover:border-primary flex w-full items-center justify-between rounded-xl border-2 px-6 py-4 text-left shadow-md transition-colors dark:border-slate-800 dark:bg-slate-900"
              aria-expanded={showTimeline}
            >
              <div>
                <p className="font-display text-slate-950 text-lg font-black dark:text-white" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                  {t('Parish Priest Timeline (1977 – Present)', 'பங்குத் தந்தையர் வரலாறு (1977 – தற்போது வரை)')}
                </p>
              </div>
              <ChevronDown
                className={`text-primary h-5 w-5 shrink-0 transition-transform duration-300 ${showTimeline ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {showTimeline && (
              <Card className="animate-fade-in-up mt-3 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {PARISH.clergy.timeline.map((p, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-3 px-6 py-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-start sm:gap-6 dark:hover:bg-slate-800/60"
                    >
                      <div className="shrink-0 sm:w-32">
                        <span className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-black text-primary dark:border-gold-400/30 dark:bg-gold-500/20 dark:text-gold-300">
                          {p.years}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-extrabold text-slate-950 dark:text-white">{isTamil ? p.nameTa || p.name : p.name}</p>
                        <p className="text-primary mt-0.5 text-xs font-extrabold uppercase tracking-wider dark:text-gold-400">{isTamil ? p.roleTa || p.role : p.role}</p>
                        <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                          {isTamil ? p.noteTa || p.note : p.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

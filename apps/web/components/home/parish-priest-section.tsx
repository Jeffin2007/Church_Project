'use client';

import { Card } from '@/components/ui/card';
import { buttonClassName } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH } from '@/lib/parish-data';
import { Mail, Phone, Quote, ChevronDown } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';
import Link from 'next/link';
import { useState } from 'react';

export function ParishPriestSection() {
  const [showTimeline, setShowTimeline] = useState(false);

  return (
    <section className="section-padding bg-secondary-200/30">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              Our Shepherd · எங்கள் ஆயன்
            </p>
            <h2 className="font-display text-foreground text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Meet Your <span className="text-gradient-primary">Parish Priest</span>
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
                      alt="Rev. Fr. ArokiyaSwamy O.Praem — Parish Priest"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      placeholderLabel="Rev. Fr. ArokiyaSwamy O.Praem"
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
                <div className="flex flex-col justify-center p-7 lg:col-span-3 lg:p-14">
                  <div className="space-y-5">
                    <div>
                      <h2 className="font-display text-foreground mb-1 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
                        {PARISH.clergy.current.name}
                      </h2>
                      <p
                        className="text-muted-foreground text-sm"
                        lang="ta"
                        style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                      >
                        {PARISH.clergy.current.nameTa}
                      </p>
                      <p className="text-gold-600 mt-1 text-lg font-semibold">
                        {PARISH.clergy.current.role} · since {PARISH.clergy.current.since}
                      </p>
                    </div>

                    <div className="divider-sacred" />

                    {/* Quote */}
                    <div className="relative">
                      <Quote
                        className="text-primary/20 absolute -left-1 -top-2 h-7 w-7"
                        aria-hidden="true"
                      />
                      <blockquote className="text-muted-foreground pl-7 text-base italic leading-relaxed">
                        &ldquo;{PARISH.clergy.current.quote}&rdquo;
                      </blockquote>
                      <p
                        className="text-muted-foreground/75 mt-2 pl-7 text-xs italic"
                        lang="ta"
                        style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                      >
                        &ldquo;{PARISH.clergy.current.quoteTa}&rdquo;
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {PARISH.clergy.current.bio}
                    </p>
                    <p
                      className="text-muted-foreground/80 text-xs leading-loose"
                      lang="ta"
                      style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                    >
                      {PARISH.clergy.current.bioTa}
                    </p>

                    {/* Contact */}
                    <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                          <Phone className="text-primary h-4 w-4" aria-hidden="true" />
                        </div>
                        <span className="text-foreground font-medium">
                          {PARISH.clergy.current.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                          <Mail className="text-primary h-4 w-4" aria-hidden="true" />
                        </div>
                        <span className="text-foreground font-medium">
                          {PARISH.clergy.current.email}
                        </span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <Link href="/contact" className={buttonClassName('outline', 'lg')}>
                        Contact Parish Office
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
              className="border-border bg-card hover:border-primary flex w-full items-center justify-between rounded-xl border-2 px-6 py-4 text-left transition-colors"
              aria-expanded={showTimeline}
            >
              <div>
                <p className="font-display text-foreground text-lg font-bold">
                  Parish Priest Timeline (1977 – Present)
                </p>
                <p
                  className="text-muted-foreground text-sm"
                  lang="ta"
                  style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                >
                  பங்குத் தந்தையர் வரலாறு
                </p>
              </div>
              <ChevronDown
                className={`text-primary h-5 w-5 shrink-0 transition-transform duration-300 ${showTimeline ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {showTimeline && (
              <Card className="animate-fade-in-up mt-2 overflow-hidden border-2">
                <div className="divide-border divide-y">
                  {PARISH.clergy.timeline.map((p, i) => (
                    <div
                      key={i}
                      className={`flex gap-4 px-6 py-4 ${i % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
                    >
                      <div className="w-28 shrink-0">
                        <p className="text-primary text-xs font-bold">{p.years}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground text-sm font-semibold">{p.name}</p>
                        <p className="text-gold-600 text-xs font-medium">{p.role}</p>
                        <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                          {p.note}
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

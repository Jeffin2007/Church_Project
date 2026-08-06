'use client';

import { Card } from '@/components/ui/card';
import { buttonClassName } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH } from '@/lib/parish-data';
import { Music, Users } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';
import Link from 'next/link';

export function ChoirTeamsSection() {
  return (
    <section className="section-padding bg-secondary-200/30">
      <div className="container-sacred">
        {/* ── Header ── */}
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="text-primary dark:text-gold-400 mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              Voices of Worship · வழிபாட்டு குரல்கள்
            </p>
            <h2 className="font-display mb-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl lg:text-6xl dark:text-white">
              <span className="text-gradient-primary">Choir</span> Teams
            </h2>
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
              Six teams glorifying God with sacred music at every Mass
            </p>
            <p
              className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400"
              lang="ta"
              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
            >
              ஆறு குழுக்கள் ஒவ்வொரு திருப்பலியிலும் புனித இசையால் இறைவனை மகிமைப்படுத்துகின்றன
            </p>
            <p className="text-primary dark:text-gold-400 mt-4 text-sm font-bold">
              Incharge:{' '}
              <span className="font-extrabold text-slate-950 dark:text-white">
                Selvan Jeffin Josva S
              </span>
            </p>
          </div>
        </ScrollReveal>

        {/* ── Team cards — 1 col mobile, 2 tablet, 3 desktop ── */}
        <div className="mx-auto mb-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PARISH.choirTeams.map((team, i) => (
            <ScrollReveal key={team.id} animation="fade-in-up" delay={i * 70} threshold={0.08}>
              <Card className="card-sacred hover:border-primary group h-full p-0 hover:-translate-y-1 hover:shadow-2xl">
                {/* Cover photo */}
                <div className="bg-primary/5 relative aspect-[16/10] overflow-hidden">
                  <SafeImage
                    src={team.image}
                    alt={team.name}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholderClassName="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                  {/* Music icon badge */}
                  <div className="bg-primary absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform duration-500 group-hover:scale-105">
                    <Music className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>

                  {/* Name overlay */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="font-display text-xl font-bold leading-tight text-white drop-shadow-md md:text-2xl">
                      {team.name}
                    </h3>
                    <p
                      className="text-gold-300 mt-1 text-xs font-semibold drop-shadow"
                      lang="ta"
                      style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                    >
                      {team.nameTa}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col gap-4 p-5 md:p-6">
                  <p className="text-sm font-semibold leading-relaxed text-slate-900 dark:text-slate-100">
                    {team.desc}
                  </p>
                  <p
                    className="text-xs font-semibold leading-loose text-slate-800 dark:text-slate-200"
                    lang="ta"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  >
                    {team.descTa}
                  </p>

                  {/* Incharge / Leader */}
                  <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-100/90 px-3.5 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800/90">
                    <Users
                      className="text-primary dark:text-gold-400 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                        Led by:{' '}
                      </span>
                      <span className="text-xs font-extrabold text-slate-950 dark:text-white">
                        {team.incharge}
                      </span>
                    </div>
                  </div>

                  {/* Join request button */}
                  <Link
                    href={`/choir/${team.id}`}
                    className="border-primary/40 bg-primary/10 text-primary dark:bg-primary/20 dark:border-primary/50 hover:bg-primary dark:hover:bg-primary flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-xs font-extrabold shadow-sm transition-all duration-300 hover:text-white dark:text-slate-100"
                  >
                    <Music className="h-3.5 w-3.5" aria-hidden="true" />
                    View Team Page
                  </Link>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* ── General choir join banner ── */}
        <ScrollReveal animation="fade-in-up" delay={250}>
          <Card className="border-primary/30 from-primary/10 via-gold-500/10 to-primary/5 rounded-2xl border-2 bg-gradient-to-br p-0 shadow-xl">
            <div className="flex flex-col items-center justify-between gap-6 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="bg-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-lg">
                  <Music className="h-7 w-7 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-black text-slate-950 md:text-3xl dark:text-white">
                    Join the Choir
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-slate-800 md:text-base dark:text-slate-200">
                    Parishioners may request to join any one of the six choir teams. Contact Selvan
                    Jeffin Josva S for more details.
                  </p>
                </div>
              </div>
              <Link
                href="/join/choir"
                className={buttonClassName(
                  'primary',
                  'lg',
                  'h-12 shrink-0 px-8 font-extrabold shadow-xl',
                )}
              >
                Request to Join
              </Link>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}

'use client';

import { Card } from '@/components/ui/card';
import { buttonClassName } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH } from '@/lib/parish-data';
import { Calendar, Clock, Flame, Cross, Heart, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';

const DAY_ICONS: Record<string, React.ElementType> = {
  Sunday: Cross,
  'Monday – Wednesday': Flame,
  Thursday: Star,
  Friday: Heart,
  Saturday: Calendar,
};

export function MassTimingsSection() {
  const confessions = [
    { day: 'Saturday', dayTa: 'சனி', time: '5:00 PM – 5:45 PM' },
    { day: 'Sunday', dayTa: 'ஞாயிறு', time: 'Before Each Mass' },
    { day: 'Weekdays', dayTa: 'வாரநாட்கள்', time: 'By Appointment' },
  ];

  return (
    <section
      id="mass-timings"
      className="section-padding relative overflow-hidden bg-[hsl(214,60%,14%)] text-white"
    >
      {/* Subtle cathedral pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 4v40M4 24h40' stroke='%23C9A227' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-sacred relative">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="text-gold-400 mb-3 text-xs font-bold uppercase tracking-[0.25em]">
              Weekly Worship Schedule · வாராந்திர வழிபாட்டு அட்டவணை
            </p>
            <h2 className="font-display mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              <span className="text-gradient-gold">Holy Mass</span> Timings
            </h2>
            <p className="text-lg font-medium text-white/90">
              Complete weekly schedule for Holy Mass and devotions
            </p>
            <p
              className="mt-1 text-sm text-white/80"
              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
              lang="ta"
            >
              திருப்பலி மற்றும் பக்தி நிகழ்வுகளுக்கான முழுமையான வார அட்டவணை
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto mb-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PARISH.massTimings.map((slot, i) => {
            const Icon = DAY_ICONS[slot.day] ?? Clock;
            return (
              <ScrollReveal key={slot.day} animation="fade-in-up" delay={i * 90}>
                <Card className="hover:border-gold-400/60 group h-full overflow-hidden border-2 border-white/20 bg-white/[0.08] shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                  <div className="space-y-5 p-6">
                    {/* Header: White Day Title, Light White Tamil, Cathedral Gold Icon */}
                    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                      <div className="bg-gold-400 flex h-12 w-12 items-center justify-center rounded-xl text-slate-950 shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6 font-bold" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-white">{slot.day}</h3>
                        <p
                          className="text-xs font-semibold text-white/85"
                          style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                          lang="ta"
                        >
                          {slot.dayTa}
                        </p>
                      </div>
                    </div>

                    {/* Mass list: White Background Time Chips with Dark Text */}
                    <ul className="space-y-3">
                      {slot.masses.map((m, j) => (
                        <li
                          key={j}
                          className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-slate-900 shadow-md transition-transform duration-200 group-hover:scale-[1.01]"
                        >
                          <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 shrink-0 text-slate-700" aria-hidden="true" />
                            <div>
                              <p className="text-base font-extrabold text-slate-950">{m.time}</p>
                              <p className="text-xs font-semibold text-slate-700">
                                {m.language || 'English'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="rounded-md border border-slate-300 bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-900">
                              {m.type}
                            </span>
                            <p
                              className="mt-1 text-[11px] font-semibold text-slate-800"
                              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                              lang="ta"
                            >
                              {m.typeTa}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Confession */}
        <ScrollReveal animation="fade-in-up" delay={200}>
          <div className="mx-auto max-w-4xl">
            <Card className="border-gold-400/40 border-2 bg-white/[0.08] shadow-2xl backdrop-blur-md">
              <div className="p-8">
                <div className="mb-6 text-center">
                  <div className="bg-gold-500/20 text-gold-300 border-gold-400/30 mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Sacrament of Reconciliation</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Confession Schedule
                  </h3>
                  <p
                    className="mt-1 text-xs font-medium text-white/80"
                    lang="ta"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  >
                    பாவசங்கீர்த்தனம் அருட்சாதனம் நேரங்கள்
                  </p>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  {confessions.map((c) => (
                    <div
                      key={c.day}
                      className="rounded-xl border border-white/15 bg-white px-5 py-4 text-center text-slate-900 shadow-lg"
                    >
                      <p className="text-base font-extrabold text-slate-950">{c.day}</p>
                      <p
                        className="text-xs font-bold text-slate-800"
                        lang="ta"
                        style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                      >
                        {c.dayTa}
                      </p>
                      <p className="text-burgundy-700 bg-burgundy-50 border-burgundy-200 mt-2 rounded border px-2 py-1 text-xs font-extrabold">
                        {c.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-in-up" delay={300}>
          <div className="mt-12 text-center">
            <Link
              href="/mass-timings"
              className={buttonClassName('primary', 'lg', 'h-12 px-8 font-bold shadow-xl')}
            >
              View Detailed Schedule
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

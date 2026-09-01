'use client';

import { Card } from '@/components/ui/card';
import { buttonClassName } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH } from '@/lib/parish-data';
import { Calendar, Clock, Flame, Cross, Heart, Star, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

const DAY_ICONS: Record<string, React.ElementType> = {
  Sunday: Cross,
  'Monday – Wednesday': Flame,
  Thursday: Star,
  Friday: Heart,
  Saturday: Calendar,
};

export function MassTimingsSection() {
  const { isTamil, t } = useLanguage();

  const confessions = [
    { day: 'Saturday', dayTa: 'சனிக்கிழமை', time: '5:00 PM – 5:45 PM' },
    { day: 'Sunday', dayTa: 'ஞாயிற்றுக்கிழமை', time: isTamil ? 'ஒவ்வொரு திருப்பலிக்கு முன்' : 'Before Each Mass' },
    { day: 'Weekdays', dayTa: 'வாரநாட்கள்', time: isTamil ? 'அருட்தந்தையரிடம் முன் அனுமதி பெற்று' : 'By Appointment' },
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
            <p
              className="text-gold-400 mb-3 text-xs font-bold uppercase tracking-[0.25em]"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t(
                'Weekly Worship Schedule · வாராந்திர வழிபாட்டு அட்டவணை',
                'வாராந்திர வழிபாட்டு அட்டவணை',
              )}
            </p>
            <h2
              className="font-display mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {isTamil ? (
                <>
                  <span className="text-gradient-gold">புனித திருப்பலி</span> நேரங்கள்
                </>
              ) : (
                <>
                  <span className="text-gradient-gold">Holy Mass</span> Timings
                </>
              )}
            </h2>
            <p
              className="text-lg font-medium text-white/90"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t(
                'Complete weekly schedule for Holy Mass and devotions',
                'திருப்பலி மற்றும் பக்தி நிகழ்வுகளுக்கான முழுமையான வார அட்டவணை',
              )}
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto mb-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PARISH.massTimings.map((slot, i) => {
            const Icon = DAY_ICONS[slot.day] ?? Clock;
            return (
              <ScrollReveal key={slot.day} animation="fade-in-up" delay={i * 90}>
                <Card className="hover:border-gold-400/60 group h-full overflow-hidden border-2 border-white/20 bg-slate-900/90 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <div className="space-y-5 p-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 border-b border-white/15 pb-4">
                      <div className="bg-gold-400 flex h-12 w-12 items-center justify-center rounded-xl text-slate-950 shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6 font-bold" aria-hidden="true" />
                      </div>
                      <div>
                        <h3
                          className="font-display text-xl font-black text-white"
                          style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                        >
                          {isTamil ? slot.dayTa : slot.day}
                        </h3>
                        {!isTamil && (
                          <p
                            className="text-xs font-bold text-gold-300"
                            style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                            lang="ta"
                          >
                            {slot.dayTa}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Mass list */}
                    <ul className="space-y-3">
                      {slot.masses.map((m, j) => (
                        <li
                          key={j}
                          className="flex flex-col gap-2 rounded-xl bg-slate-950/80 border border-slate-700/80 p-3.5 shadow-md transition-all duration-200 hover:border-gold-400/50 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-500/20 border border-gold-400/30 text-gold-400">
                              <Clock className="h-4 w-4" aria-hidden="true" />
                            </div>
                            <div>
                              <p className="text-base font-black text-gold-300 tracking-wide">{m.time}</p>
                              <span className="inline-block text-[11px] font-bold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
                                {isTamil ? (m.language === 'Tamil' ? 'தமிழ்' : 'ஆங்கிலம்') : (m.language || 'English')}
                              </span>
                            </div>
                          </div>
                          <div className="sm:text-right">
                            <span
                              className="inline-block rounded-md border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-black text-white"
                              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                            >
                              {isTamil ? m.typeTa : m.type}
                            </span>
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
            <Card className="border-gold-400/40 border-2 bg-slate-900/90 shadow-2xl backdrop-blur-md">
              <div className="p-8">
                <div className="mb-6 text-center">
                  <div className="bg-gold-500/20 text-gold-300 border-gold-400/30 mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{t('Sacrament of Reconciliation', 'பாவசங்கீர்த்தனம் அருட்சாதனம்')}</span>
                  </div>
                  <h3
                    className="font-display text-2xl font-bold text-white"
                    style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                  >
                    {t('Confession Schedule', 'பாவசங்கீர்த்தனம் நேரங்கள்')}
                  </h3>
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  {confessions.map((c) => (
                    <div
                      key={c.day}
                      className="rounded-xl border border-white/15 bg-white/10 px-5 py-4 text-center text-white shadow-lg backdrop-blur-sm"
                    >
                      <p
                        className="text-base font-extrabold text-white"
                        style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                      >
                        {isTamil ? c.dayTa : c.day}
                      </p>
                      <p className="text-gold-300 bg-gold-500/20 border-gold-400/40 mt-2 rounded border px-2 py-1 text-xs font-extrabold">
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
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t('View Detailed Schedule', 'முழு அட்டவணையைப் பார்க்க')}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Cross, Heart, Users } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';

const pillars = [
  {
    icon: Cross,
    title: 'Holy Mass',
    desc: 'Daily & Sunday Celebrations',
    color: 'text-primary dark:text-gold-400',
  },
  {
    icon: Heart,
    title: 'Community',
    desc: 'Active Parish Ministries',
    color: 'text-burgundy-700 dark:text-rose-400',
  },
  {
    icon: Users,
    title: 'Service',
    desc: 'Outreach & Charity',
    color: 'text-amber-700 dark:text-amber-400',
  },
];

export function WelcomeSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-sacred">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Image reveal ── */}
          <ScrollReveal animation="slide-in-left" threshold={0.15}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10">
              <div className="relative aspect-[4/3]">
                <SafeImage
                  src="/images/church/exterior.webp"
                  alt="Queen of All Saints Church Exterior"
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholderLabel="Queen of All Saints Church"
                  placeholderClassName="absolute inset-0"
                />
                {/* Gold ornament bar at bottom of image */}
                <div className="from-primary via-gold-500 to-primary absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r" />
              </div>
            </div>
          </ScrollReveal>

          {/* ── Text content ── */}
          <div className="space-y-8">
            <ScrollReveal animation="fade-in-up" delay={100}>
              <p className="text-primary font-black uppercase tracking-[0.25em]">Welcome Home</p>
              <h2 className="font-display mt-3 text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl lg:text-6xl">
                Welcome to
                <br />
                <span className="font-black text-slate-950 drop-shadow-sm">
                  Queen of All Saints
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-up" delay={200}>
              <div className="space-y-5">
                <p className="text-lg font-bold leading-relaxed text-slate-950 md:text-xl md:leading-loose">
                  A parish community centred on the{' '}
                  <span className="border-primary/50 bg-primary/10 rounded border px-2.5 py-0.5 font-black text-slate-950">
                    Holy Eucharist
                  </span>
                  , rooted in{' '}
                  <span className="border-primary/50 bg-primary/10 rounded border px-2.5 py-0.5 font-black text-slate-950">
                    prayer
                  </span>
                  , and dedicated to{' '}
                  <span className="border-primary/50 bg-primary/10 rounded border px-2.5 py-0.5 font-black text-slate-950">
                    service
                  </span>
                  .
                </p>
                <p className="text-base font-bold leading-relaxed text-slate-950 md:text-lg md:leading-loose">
                  Since 1977, our parish has been a beacon of faith in Tiruchirappalli, welcoming
                  all who seek the love of Christ and the intercession of Our Blessed Mother, the{' '}
                  <span className="decoration-gold-600 font-black text-slate-950 underline decoration-2 underline-offset-4">
                    Queen of All Saints
                  </span>
                  .
                </p>
              </div>
            </ScrollReveal>

            {/* ── Three-pillar cards — Equal height & alignment ── */}
            <div className="grid items-stretch gap-4 pt-4 sm:grid-cols-3">
              {pillars.map(({ icon: Icon, title, desc, color }, i) => (
                <ScrollReveal
                  key={title}
                  animation="scale-in"
                  delay={300 + i * 100}
                  className="h-full"
                >
                  <Card className="bg-card hover:border-primary group flex h-full min-h-[150px] flex-col justify-between border-2 border-slate-300 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800">
                    <div>
                      <Icon
                        className={`mb-3 h-8 w-8 transition-transform duration-300 group-hover:scale-110 ${color}`}
                      />
                      <h3 className="mb-1 text-base font-extrabold text-slate-900 dark:text-white">
                        {title}
                      </h3>
                    </div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{desc}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

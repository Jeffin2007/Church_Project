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
    color: 'text-primary',
  },
  {
    icon: Heart,
    title: 'Community',
    desc: 'Active Parish Ministries',
    color: 'text-burgundy-600',
  },
  {
    icon: Users,
    title: 'Service',
    desc: 'Outreach & Charity',
    color: 'text-gold-600',
  },
];

export function WelcomeSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-sacred">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Image reveal ── */}
          <ScrollReveal animation="slide-in-left" threshold={0.15}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
              <div className="relative aspect-[4/3]">
                <SafeImage
                  src="/images/church/exterior.webp"
                  alt="Queen of All Saints Church"
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholderLabel="Queen of All Saints Church"
                  placeholderClassName="absolute inset-0"
                />
                {/* Gold ornament bar at bottom of image */}
                <div className="from-primary via-gold-500 to-primary absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r" />
              </div>
            </div>
          </ScrollReveal>

          {/* ── Text content ── */}
          <div className="space-y-8">
            <ScrollReveal animation="fade-in-up" delay={100}>
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                Welcome Home
              </p>
              <h2 className="font-display text-foreground mt-3 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Welcome to
                <br />
                <span className="text-gradient-primary">Queen of All Saints</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-up" delay={200}>
              <div className="space-y-4">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  A parish community centred on the{' '}
                  <span className="text-foreground font-semibold">Holy Eucharist</span>, rooted in{' '}
                  <span className="text-foreground font-semibold">prayer</span>, and dedicated to{' '}
                  <span className="text-foreground font-semibold">service</span>.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Since 1977, our parish has been a beacon of faith in Tiruchirappalli, welcoming
                  all who seek the love of Christ and the intercession of Our Blessed Mother, the
                  Queen of All Saints.
                </p>
              </div>
            </ScrollReveal>

            {/* ── Three-pillar cards ── */}
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {pillars.map(({ icon: Icon, title, desc, color }, i) => (
                <ScrollReveal key={title} animation="scale-in" delay={300 + i * 100}>
                  <Card className="hover:border-primary group border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <Icon
                      className={`mb-3 h-8 w-8 transition-transform duration-300 group-hover:scale-110 ${color}`}
                    />
                    <h3 className="text-foreground mb-1 text-sm font-bold">{title}</h3>
                    <p className="text-muted-foreground text-xs">{desc}</p>
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

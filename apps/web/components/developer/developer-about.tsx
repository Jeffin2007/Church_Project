'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Card } from '@/components/ui/card';
import { Target, Lightbulb, Heart } from 'lucide-react';

const PILLARS = [
  {
    icon: Lightbulb,
    title: 'The Vision',
    body: 'When I looked at our parish, I saw families travelling to the office for forms that could be submitted in minutes online. I saw records kept in paper registers that could be lost in a flood. I saw a community rich in faith but underserved by its tools. The vision was simple: build a system worthy of this parish.',
  },
  {
    icon: Heart,
    title: 'The Motivation',
    body: 'I grew up in this parish. I attended catechism here, served as an altar server, and sang in the choir. Every line of code in this platform carries a memory of this community. This is not a project — it is a personal offering to the parish that shaped my faith.',
  },
  {
    icon: Target,
    title: 'The Goal',
    body: 'The goal was never to impress with technology. The goal was to remove friction from parish life so that families can spend less time on administration and more time in worship, service, and community. Technology should be invisible — and faith should be central.',
  },
];

export function DeveloperAbout() {
  return (
    <section className="section-padding bg-secondary-200/30">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              In His Own Words
            </p>
            <h2 className="font-display text-foreground mb-4 text-4xl font-bold md:text-5xl">
              Vision, Motivation &amp; <span className="text-gradient-primary">Purpose</span>
            </h2>
          </div>
        </ScrollReveal>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <ScrollReveal key={p.title} animation="fade-in-up" delay={i * 90}>
                <Card className="hover:border-primary group h-full border-2 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="bg-primary/10 group-hover:bg-primary mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-all group-hover:scale-110">
                    <Icon
                      className="text-primary h-7 w-7 transition-colors group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-display text-foreground mb-4 text-xl font-bold">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

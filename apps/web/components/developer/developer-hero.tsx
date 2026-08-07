'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { CinematicPortrait } from './portrait-animation';
import { Code2, Cpu, Cross } from 'lucide-react';

export function DeveloperHero() {
  return (
    <section className="from-primary/8 via-background to-gold-500/5 relative overflow-hidden bg-gradient-to-br py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='35' y='10' width='10' height='60' fill='%23123B6D'/%3E%3Crect x='10' y='28' width='60' height='10' fill='%23123B6D'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      <div className="container-sacred relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Portrait */}
          <ScrollReveal animation="slide-in-left" threshold={0.1}>
            <div className="flex justify-center lg:justify-end">
              <CinematicPortrait />
            </div>
          </ScrollReveal>

          {/* Text */}
          <div className="space-y-6">
            <ScrollReveal animation="fade-in-up" delay={100}>
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
                  <Code2 className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div className="bg-gold-500 flex h-10 w-10 items-center justify-center rounded-full">
                  <Cpu className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
                  <Cross className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
              </div>
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                Platform Developer
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-up" delay={180}>
              <h1 className="font-display text-foreground text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Jeffin Josva S
              </h1>
              <p className="text-gold-600 mt-2 text-xl font-semibold">
                Founder &amp; Lead Developer
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-up" delay={260}>
              <p className="text-muted-foreground text-lg leading-relaxed">
                <span className="text-foreground font-semibold">Queen of All Saints</span> Digital
                Parish Platform
              </p>
              <p className="text-muted-foreground mt-1 text-base">
                Diocese of Tiruchirappalli · Built with faith and purpose
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-up" delay={340}>
              <div className="divider-sacred" />
              <p className="text-muted-foreground mt-5 text-base italic leading-relaxed">
                &ldquo;I built this platform not as a product, but as an act of service to my parish
                family and to the God who has been faithful to me.&rdquo;
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

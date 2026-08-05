'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Cross } from 'lucide-react';

export function PlatformClosingSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="from-primary/95 via-primary/90 to-burgundy-900/90 absolute inset-0 bg-gradient-to-br"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='35' y='10' width='10' height='60' fill='%23FFFFFF'/%3E%3Crect x='10' y='28' width='60' height='10' fill='%23FFFFFF'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />
      <div className="container-sacred relative">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/30 bg-white/10 shadow-2xl backdrop-blur-sm">
                <Cross className="h-10 w-10 text-white" aria-hidden="true" />
              </div>
            </div>
            <h2 className="font-display mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Technology at the Service of Faith
            </h2>
            <p className="mb-4 text-xl leading-relaxed text-white/90">
              Technology should never replace the spiritual life of the parish.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-white/80">
              This platform exists to strengthen worship, service, communication, and community —
              while preserving the traditions and values of the Catholic Church. Every feature was
              built with one question in mind:
            </p>
            <p className="font-display text-gold-400 mb-8 text-2xl font-bold italic md:text-3xl">
              "Does this help our parish family grow closer to God?"
            </p>
            <div className="mx-auto max-w-xl rounded-2xl border-2 border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-base text-white/85">
                <span className="font-semibold text-white">Queen of All Saints Church</span> —
                Amalapuram, K.K. Nagar, Tiruchirappalli
              </p>
              <p
                className="mt-2 text-sm text-white/70"
                lang="ta"
                style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
              >
                நம்பிக்கையிலும் ஒற்றுமையிலும் வளரும் பங்கு குடும்பம் — 1977 முதல் இன்று வரை.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

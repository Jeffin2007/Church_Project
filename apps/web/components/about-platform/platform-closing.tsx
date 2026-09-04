'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Cross } from 'lucide-react';

export function PlatformClosingSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Sacred Marian Midnight Navy & Deep Royal Backdrop */}
      <div
        className="from-[#001026] via-[#002244] to-[#001429] absolute inset-0 bg-gradient-to-br"
        aria-hidden="true"
      />
      {/* Subtle Sacred Gold Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent opacity-70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='35' y='10' width='10' height='60' fill='%23D4AF37'/%3E%3Crect x='10' y='28' width='60' height='10' fill='%23D4AF37'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />
      <div className="container-sacred relative">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/60 bg-gradient-to-br from-gold/25 via-gold/10 to-transparent shadow-[0_0_35px_rgba(212,175,55,0.35)] backdrop-blur-md">
                <Cross className="h-10 w-10 text-gold" aria-hidden="true" />
              </div>
            </div>
            <h2 className="font-heading mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl drop-shadow-sm">
              Technology at the Service of Faith
            </h2>
            <p className="mb-4 text-xl leading-relaxed text-white/90">
              Technology should never replace the spiritual life of the parish.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-white/80">
              This platform exists to strengthen worship, service, communication, and community —
              while preserving the sacred traditions and values of the Catholic Church. Every feature was
              built with one question in mind:
            </p>
            <p className="font-serif text-gold-300 mb-8 text-2xl font-bold italic md:text-3xl drop-shadow">
              &ldquo;Does this help our parish family grow closer to God?&rdquo;
            </p>
            <div className="mx-auto max-w-xl rounded-2xl border border-gold/30 bg-white/[0.07] p-6 shadow-xl backdrop-blur-md">
              <p className="text-base text-white/90 font-medium">
                <span className="font-semibold text-white">Queen of All Saints Church</span> —
                Amalapuram, K.K. Nagar, Tiruchirappalli
              </p>
              <p
                className="mt-2 text-sm text-gold-200/80"
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

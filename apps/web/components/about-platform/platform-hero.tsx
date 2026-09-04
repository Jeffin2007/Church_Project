'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Smartphone, Shield, Heart, Cross } from 'lucide-react';
import { PARISH } from '@/lib/parish-data';

export function PlatformHeroSection() {
  return (
    <section className="from-primary/8 via-background to-background relative overflow-hidden bg-gradient-to-b py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='35' y='10' width='10' height='60' fill='%23123B6D'/%3E%3Crect x='10' y='28' width='60' height='10' fill='%23123B6D'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />
      <div className="container-sacred relative">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto max-w-3xl text-center">
            {/* ── Parish Approval Badge ── */}
            <div className="mb-10 flex justify-center">
              <div
                className="inline-flex items-center gap-4 rounded-2xl border-2 border-gold/50 bg-gradient-to-r from-[#001833] via-[#002852] to-[#001833] px-6 py-4 shadow-xl"
                role="img"
                aria-label="Official Digital Platform — Queen of All Saints Church, Diocese of Tiruchirappalli"
              >
                {/* Cross seal */}
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-[#001429] shadow-inner"
                  aria-hidden="true"
                >
                  <Cross className="h-7 w-7 text-gold" />
                </div>

                {/* Badge text */}
                <div className="text-left">
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: 'hsl(43,60%,65%)' }}
                  >
                    Official Digital Platform
                  </p>
                  <p className="font-display text-base font-bold leading-snug text-white">
                    {PARISH.identity.name}
                  </p>
                  <p className="text-xs font-medium" style={{ color: 'hsl(43,40%,70%)' }}>
                    {PARISH.identity.diocese}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Three feature icons ── */}
            <div className="mb-6 flex justify-center gap-4">
              {([Smartphone, Shield, Heart] as const).map((Icon, i) => (
                <div
                  key={i}
                  className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-2xl"
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
              ))}
            </div>

            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              Digital Parish Platform
            </p>
            <h1 className="font-display text-foreground mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              About This Platform
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Understanding how technology serves our parish family — simply, securely, and
              faithfully.
            </p>
            <p
              className="text-muted-foreground mt-3 text-base"
              lang="ta"
              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
            >
              இந்த டிஜிட்டல் தளம் எப்படி நம் பங்கு குடும்பத்திற்கு சேவை செய்கிறது என்பதை
              புரிந்துகொள்வோம்.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Card } from '@/components/ui/card';
import { Cross, Users, Home } from 'lucide-react';

const THANKS = [
  {
    icon: Cross,
    to: 'The Parish Priest',
    toTa: 'பங்குத் தந்தை',
    message:
      'For trusting a parishioner with the responsibility of building this platform. Your spiritual guidance, patience, and blessing made this possible.',
  },
  {
    icon: Users,
    to: 'Parish Office & Coordinators',
    toTa: 'பங்கு அலுவலகம் & ஒருங்கிணைப்பாளர்கள்',
    message:
      'For your tireless feedback, testing, and willingness to change workflows you had followed for decades. Your service to this parish is immeasurable.',
  },
  {
    icon: Home,
    to: 'Our Parish Families',
    toTa: 'நம் பங்கு குடும்பங்கள்',
    message:
      'For your trust, your patience during development, and your encouragement. Every family that registered on this platform gave it purpose and meaning.',
  },
];

export function DeveloperAcknowledgements() {
  return (
    <section className="section-padding bg-background">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              With Gratitude
            </p>
            <h2 className="font-display text-foreground mb-4 text-4xl font-bold md:text-5xl">
              <span className="text-gradient-primary">Acknowledgements</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              This platform was not built alone. It was built with, for, and because of this
              community.
            </p>
          </div>
        </ScrollReveal>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {THANKS.map((t, i) => {
            const Icon = t.icon;
            return (
              <ScrollReveal key={t.to} animation="scale-in" delay={i * 90}>
                <Card className="border-primary/15 from-primary/5 to-gold-500/5 h-full border-2 bg-gradient-to-br p-7 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-full shadow-lg">
                      <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="font-display text-foreground mb-1 text-lg font-bold">{t.to}</h3>
                  <p
                    className="text-muted-foreground mb-4 text-xs"
                    lang="ta"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  >
                    {t.toTa}
                  </p>
                  <div className="divider-sacred mb-4" />
                  <p className="text-muted-foreground text-sm italic leading-relaxed">
                    &ldquo;{t.message}&rdquo;
                  </p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
        <ScrollReveal animation="fade-in-up" delay={200}>
          <p className="text-muted-foreground mx-auto mt-10 max-w-2xl text-center text-sm italic">
            "To God be the glory — for it is He who gave the skill, the time, and the purpose."
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

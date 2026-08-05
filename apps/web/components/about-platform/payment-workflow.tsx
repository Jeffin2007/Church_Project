'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Card } from '@/components/ui/card';
import { Home, Shield, CheckCircle2, Receipt, BookOpen, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STEPS: { icon: LucideIcon; label: string; labelTa: string; desc: string }[] = [
  {
    icon: Home,
    label: 'Family Initiates Payment',
    labelTa: 'குடும்பம் கட்டணம் செய்கிறது',
    desc: 'Select the contribution type — tithes, feast offerings, candles, or special donations — and enter the amount.',
  },
  {
    icon: Shield,
    label: 'Secure Payment Gateway',
    labelTa: 'பாதுகாப்பான கட்டண நுழைவாயில்',
    desc: 'Payments are processed through Razorpay, a certified and secure payment gateway. Your card details are encrypted end-to-end and never stored on parish servers.',
  },
  {
    icon: CheckCircle2,
    label: 'Payment Verified',
    labelTa: 'கட்டணம் சரிபார்க்கப்படுகிறது',
    desc: 'The payment gateway confirms the transaction in real time. Failed or incomplete payments are flagged immediately and no amount is deducted.',
  },
  {
    icon: Receipt,
    label: 'Digital Receipt Generated',
    labelTa: 'டிஜிட்டல் ரசீது வழங்கப்படுகிறது',
    desc: 'A permanent digital receipt with a unique transaction ID is generated immediately. You can download, print, or share it at any time.',
  },
  {
    icon: BookOpen,
    label: 'Parish Records Updated',
    labelTa: 'பங்கு பதிவுகள் புதுப்பிக்கப்படுகின்றன',
    desc: 'The contribution is recorded automatically in the parish financial ledger. No manual entry is needed. The Parish Office is notified instantly.',
  },
];

export function PaymentWorkflowSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              Transparent & Secure
            </p>
            <h2 className="font-display text-foreground mb-4 text-4xl font-bold md:text-5xl">
              How Online <span className="text-gradient-primary">Payments Work</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Every contribution is processed securely, receipted instantly, and recorded
              permanently.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-4xl space-y-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.label} animation="slide-in-left" delay={i * 70}>
                <Card className="hover:border-primary group flex items-start gap-5 border-2 p-6 transition-all duration-500 hover:shadow-lg">
                  <div className="bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white shadow-md">
                    {i + 1}
                  </div>
                  <div className="flex flex-1 items-start gap-4">
                    <div className="bg-primary/10 group-hover:bg-primary mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all group-hover:scale-110">
                      <Icon
                        className="text-primary h-5 w-5 transition-colors group-hover:text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="font-display text-foreground mb-1 text-lg font-bold">
                        {step.label}
                      </h3>
                      <p
                        className="text-muted-foreground mb-1 text-xs"
                        lang="ta"
                        style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                      >
                        {step.labelTa}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Razorpay security badge */}
        <ScrollReveal animation="fade-in-up" delay={200}>
          <div className="border-primary/20 bg-primary/5 mx-auto mt-10 flex max-w-md items-center justify-center gap-4 rounded-2xl border-2 px-6 py-5">
            <Lock className="text-primary h-8 w-8 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-foreground font-semibold">Secured by Razorpay</p>
              <p className="text-muted-foreground text-xs">
                PCI-DSS certified · 256-bit SSL encryption · RBI regulated
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

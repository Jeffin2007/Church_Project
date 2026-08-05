'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Home, Send, ClipboardCheck, UserCheck, CalendarCheck, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const STEPS: { icon: LucideIcon; label: string; labelTa: string; desc: string }[] = [
  {
    icon: Home,
    label: 'Family Submits Request',
    labelTa: 'குடும்பம் கோரிக்கை செய்கிறது',
    desc: 'You fill out a simple online form from your phone or computer — no need to visit the parish office.',
  },
  {
    icon: Send,
    label: 'Request Received',
    labelTa: 'கோரிக்கை பெறப்படுகிறது',
    desc: 'The Parish Office is notified instantly. Your request is logged with a unique reference number.',
  },
  {
    icon: ClipboardCheck,
    label: 'Parish Office Review',
    labelTa: 'பங்கு அலுவலக மதிப்பாய்வு',
    desc: 'Staff review your details and confirm all required information is complete. They may contact you if anything is needed.',
  },
  {
    icon: UserCheck,
    label: 'Parish Priest Approval',
    labelTa: 'பங்குத் தந்தையின் அனுமதி',
    desc: 'The Parish Priest reviews and approves the request based on parish guidelines and sacramental requirements.',
  },
  {
    icon: CalendarCheck,
    label: 'Appointment Scheduled',
    labelTa: 'சந்திப்பு திட்டமிடப்படுகிறது',
    desc: 'A date and time is confirmed with your family. You receive a notification through the platform.',
  },
  {
    icon: CheckCircle2,
    label: 'Service Completed',
    labelTa: 'சேவை நிறைவடைகிறது',
    desc: 'The sacrament or service is completed and your parish record is updated automatically. Digital confirmation is sent to you.',
  },
];

export function RequestWorkflowSection() {
  return (
    <section className="section-padding bg-secondary-200/30">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              Simple Process
            </p>
            <h2 className="font-display text-foreground mb-4 text-4xl font-bold md:text-5xl">
              How Online Requests <span className="text-gradient-primary">Work</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From submission to completion — every step is clear, transparent, and traceable.
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal on lg, vertical on mobile */}
        <div className="mx-auto max-w-6xl">
          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal
                  key={step.label}
                  animation="fade-in-up"
                  delay={i * 80}
                  threshold={0.08}
                >
                  <div className="relative flex flex-col items-center text-center">
                    {/* Connector line — desktop only */}
                    {i < STEPS.length - 1 && (
                      <div
                        className="from-primary/50 to-primary/20 absolute left-[calc(50%+2rem)] top-7 hidden h-0.5 w-[calc(100%-4rem)] bg-gradient-to-r lg:block"
                        aria-hidden="true"
                      />
                    )}

                    {/* Icon circle */}
                    <div className="border-background bg-primary relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full border-4 shadow-lg">
                      <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                    </div>

                    {/* Step number */}
                    <p className="text-primary mb-2 text-xs font-bold uppercase tracking-wider">
                      Step {i + 1}
                    </p>

                    {/* Label */}
                    <h3 className="font-display text-foreground mb-1 text-sm font-bold leading-snug">
                      {step.label}
                    </h3>
                    <p
                      className="text-muted-foreground mb-2 text-xs"
                      lang="ta"
                      style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                    >
                      {step.labelTa}
                    </p>

                    {/* Description */}
                    <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

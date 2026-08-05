'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Card } from '@/components/ui/card';
import { Mail, Briefcase } from 'lucide-react';

export function DeveloperContact() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="from-primary/95 via-primary/90 to-burgundy-900/90 absolute inset-0 bg-gradient-to-br"
        aria-hidden="true"
      />
      <div className="container-sacred relative">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-gold-300 mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              Get in Touch
            </p>
            <h2 className="font-display mb-6 text-3xl font-bold text-white md:text-4xl">
              Contact the Developer
            </h2>
            <p className="mb-10 text-lg text-white/80">
              For platform-related technical enquiries, partnership proposals, or professional
              correspondence.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Card className="group border-2 border-white/20 bg-white/10 p-6 text-left backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 transition-all group-hover:scale-110">
                  <Mail className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/60">
                  Personal Email
                </p>
                <a
                  href="mailto:jeffinjosva03@gmail.com"
                  className="hover:text-gold-400 font-semibold text-white transition-colors hover:underline"
                >
                  jeffinjosva03@gmail.com
                </a>
                <p className="mt-2 text-xs text-white/60">
                  Technical support, bug reports, general enquiries
                </p>
              </Card>
              <Card className="group border-2 border-white/20 bg-white/10 p-6 text-left backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 transition-all group-hover:scale-110">
                  <Briefcase className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-white/60">
                  Professional
                </p>
                <p className="font-semibold text-white">Jeffin Josva S</p>
                <p className="mt-1 text-xs text-white/60">
                  Founder &amp; Lead Developer
                  <br />
                  Queen of All Saints Digital Parish Platform
                </p>
              </Card>
            </div>
            <p className="mt-10 text-sm text-white/50">
              This is an official acknowledgement page for the Queen of All Saints Church Digital
              Platform.
              <br />
              It is not a personal portfolio.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

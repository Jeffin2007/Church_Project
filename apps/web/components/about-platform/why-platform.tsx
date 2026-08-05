'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Card } from '@/components/ui/card';
import {
  ClipboardList,
  MessageSquare,
  Lock,
  Globe,
  FileCheck,
  BookOpen,
  Users,
  Home,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const REASONS: { icon: LucideIcon; title: string; titleTa: string; desc: string }[] = [
  {
    icon: ClipboardList,
    title: 'Simplify Parish Administration',
    titleTa: 'நிர்வாகத்தை எளிதாக்குகிறது',
    desc: 'Reduce the workload on parish staff by moving paper registers, certificates, and family records to a secure digital system.',
  },
  {
    icon: MessageSquare,
    title: 'Better Communication',
    titleTa: 'சிறந்த தகவல் தொடர்பு',
    desc: 'Reach every parish family instantly with announcements, Mass timings, feast schedules, and important notices.',
  },
  {
    icon: Lock,
    title: 'Secure Parish Records',
    titleTa: 'பாதுகாப்பான பங்கு பதிவுகள்',
    desc: 'Baptism, marriage, and confirmation records are stored safely and can never be lost, damaged, or misplaced.',
  },
  {
    icon: Globe,
    title: 'Online Services',
    titleTa: 'ஆன்லைன் சேவைகள்',
    desc: 'Request sacramental certificates, appointments, and contributions from the comfort of your home — any time, any day.',
  },
  {
    icon: FileCheck,
    title: 'Reduced Paperwork',
    titleTa: 'காகித பணிகள் குறைகின்றன',
    desc: 'Forms, receipts, and records are handled digitally — saving time for families and parish staff alike.',
  },
  {
    icon: BookOpen,
    title: 'Preserve Parish History',
    titleTa: 'பங்கு வரலாறு பாதுகாக்கப்படுகிறது',
    desc: 'The history, photographs, and milestones of our parish since 1977 are preserved digitally for future generations.',
  },
  {
    icon: Users,
    title: 'Encourage Ministry Participation',
    titleTa: 'பணி பங்கேற்பை ஊக்குவிக்கிறது',
    desc: 'Families can discover, join, and stay connected with parish ministries and anbiyams through the platform.',
  },
  {
    icon: Home,
    title: 'Strengthen Parish–Family Connection',
    titleTa: 'பங்கு–குடும்ப தொடர்பை வலுப்படுத்துகிறது',
    desc: 'The platform keeps families informed, involved, and spiritually connected to their parish community.',
  },
];

export function WhyPlatformSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              Why We Built This
            </p>
            <h2 className="font-display text-foreground mb-4 text-4xl font-bold md:text-5xl">
              Why Our Parish Adopted
              <br />
              <span className="text-gradient-primary">This Platform</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Eight reasons this digital platform was built for our parish family.
            </p>
          </div>
        </ScrollReveal>
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <ScrollReveal key={r.title} animation="scale-in" delay={i * 55} threshold={0.07}>
                <Card className="hover:border-primary group h-full border-2 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <div className="bg-primary/10 group-hover:bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
                    <Icon
                      className="text-primary h-6 w-6 transition-colors group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-display text-foreground mb-2 text-base font-bold">
                    {r.title}
                  </h3>
                  <p
                    className="text-muted-foreground mb-2 text-xs"
                    lang="ta"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  >
                    {r.titleTa}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{r.desc}</p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

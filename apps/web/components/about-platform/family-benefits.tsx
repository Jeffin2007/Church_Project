'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Card } from '@/components/ui/card';
import { Home, Heart, FileText, Bell, Receipt, CalendarDays } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const SERVICES: {
  icon: LucideIcon;
  title: string;
  titleTa: string;
  desc: string;
  color: string;
}[] = [
  {
    icon: Home,
    title: 'Family Portal',
    titleTa: 'குடும்ப போர்டல்',
    color: 'primary',
    desc: 'Register your family, manage member details, view your sacramental history, and stay updated with parish news — all in one secure place.',
  },
  {
    icon: Heart,
    title: 'Online Contributions',
    titleTa: 'ஆன்லைன் காணிக்கை',
    color: 'gold',
    desc: 'Make tithes, feast contributions, and special offerings securely online. Receive instant digital receipts for every transaction.',
  },
  {
    icon: FileText,
    title: 'Sacramental Requests',
    titleTa: 'அருட்சாதன கோரிக்கைகள்',
    color: 'burgundy',
    desc: 'Request baptism, marriage, confirmation, and other sacramental appointments directly from your phone without visiting the parish office.',
  },
  {
    icon: Bell,
    title: 'Parish Announcements',
    titleTa: 'பங்கு அறிவிப்புகள்',
    color: 'primary',
    desc: 'Never miss an important notice. Feast schedules, novena times, and special events are delivered directly to your family portal.',
  },
  {
    icon: Receipt,
    title: 'Digital Receipts',
    titleTa: 'டிஜிட்டல் ரசீதுகள்',
    color: 'gold',
    desc: 'Every contribution and payment generates a permanent digital receipt that can be downloaded or printed whenever needed.',
  },
  {
    icon: CalendarDays,
    title: 'Parish Calendar',
    titleTa: 'பங்கு காலண்டர்',
    color: 'burgundy',
    desc: 'View the full liturgical calendar, feast days, novena schedules, ministry meetings, and parish events in one organised place.',
  },
];

const ACCENT = {
  primary: 'bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white',
  gold: 'bg-gold-500/10 group-hover:bg-gold-500 text-gold-600 group-hover:text-white',
  burgundy:
    'bg-burgundy-600/10 group-hover:bg-burgundy-600 text-burgundy-600 group-hover:text-white',
};

export function FamilyBenefitsSection() {
  return (
    <section className="section-padding bg-secondary-200/30">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              How It Helps You
            </p>
            <h2 className="font-display text-foreground mb-4 text-4xl font-bold md:text-5xl">
              <span className="text-gradient-primary">How It Helps</span> Your Family
            </h2>
            <p className="text-muted-foreground text-lg">
              Six services designed to make parish life simpler for every family.
            </p>
          </div>
        </ScrollReveal>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const cls = ACCENT[s.color as keyof typeof ACCENT];
            return (
              <ScrollReveal key={s.title} animation="fade-in-up" delay={i * 70}>
                <Card className="hover:border-primary group h-full border-2 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${cls}`}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-foreground mb-1 text-xl font-bold">{s.title}</h3>
                  <p
                    className="text-muted-foreground mb-3 text-xs font-medium"
                    lang="ta"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  >
                    {s.titleTa}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

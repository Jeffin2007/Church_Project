'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Card } from '@/components/ui/card';
import { Phone, Mail, Clock, Wrench, AlertCircle } from 'lucide-react';
import { PARISH } from '@/lib/parish-data';

const SUPPORT_ITEMS = [
  {
    icon: Phone,
    title: 'Parish Office',
    titleTa: 'பங்கு அலுவலகம்',
    detail: PARISH.contact.phone,
    sub: 'For all service requests and appointments',
    href: `tel:${PARISH.contact.phone.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    title: 'Parish Email',
    titleTa: 'பங்கு மின்னஞ்சல்',
    detail: PARISH.contact.email,
    sub: 'For certificates, requests, and correspondence',
    href: `mailto:${PARISH.contact.email}`,
  },
  {
    icon: Clock,
    title: 'Office Hours',
    titleTa: 'அலுவலக நேரம்',
    detail: 'Monday – Saturday',
    sub: '9:00 AM – 12:00 PM · 4:00 PM – 7:00 PM',
    href: undefined,
  },
  {
    icon: Wrench,
    title: 'Technical Support',
    titleTa: 'தொழில்நுட்ப ஆதரவு',
    detail: 'jeffinjosva03@gmail.com',
    sub: 'Platform issues, login problems, technical errors',
    href: 'mailto:jeffinjosva03@gmail.com',
  },
  {
    icon: AlertCircle,
    title: 'Report an Issue',
    titleTa: 'சிக்கல் புகாரளிக்கவும்',
    detail: 'Contact the Parish Office',
    sub: 'Any data errors, missing records, or concerns',
    href: `mailto:${PARISH.contact.email}?subject=Platform%20Issue%20Report`,
  },
];

export function TechnicalSupportSection() {
  return (
    <section className="section-padding bg-secondary-200/30">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              We Are Here to Help
            </p>
            <h2 className="font-display text-foreground mb-4 text-4xl font-bold md:text-5xl">
              <span className="text-gradient-primary">Technical Support</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              If you need help using this platform, these are your contact points.
            </p>
          </div>
        </ScrollReveal>
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORT_ITEMS.map((item, i) => {
            const Icon = item.icon;
            const inner = (
              <Card className="hover:border-primary group h-full border-2 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <div className="bg-primary/10 group-hover:bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all group-hover:scale-110">
                  <Icon
                    className="text-primary h-6 w-6 transition-colors group-hover:text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display text-foreground mb-1 text-lg font-bold">
                  {item.title}
                </h3>
                <p
                  className="text-muted-foreground mb-3 text-xs"
                  lang="ta"
                  style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                >
                  {item.titleTa}
                </p>
                <p className="text-primary break-all text-sm font-semibold">{item.detail}</p>
                <p className="text-muted-foreground mt-1 text-xs">{item.sub}</p>
              </Card>
            );
            return (
              <ScrollReveal key={item.title} animation="fade-in-up" delay={i * 70}>
                {item.href ? (
                  <a href={item.href} className="block h-full">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

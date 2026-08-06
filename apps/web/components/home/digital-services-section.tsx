'use client';

import { Card } from '@/components/ui/card';
import { buttonClassName } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { DollarSign, Baby, Heart, FileText, Users, UserPlus, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface DigitalService {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  accent: 'primary' | 'gold' | 'burgundy';
}

const services: DigitalService[] = [
  {
    title: 'Online Offerings',
    description: 'Make your tithes and offerings securely online',
    icon: DollarSign,
    href: '/offerings',
    accent: 'primary',
  },
  {
    title: 'Request Baptism',
    description: "Schedule your child's baptism sacrament",
    icon: Baby,
    href: '/sacraments/baptism',
    accent: 'gold',
  },
  {
    title: 'Marriage Services',
    description: 'Plan your Catholic wedding ceremony',
    icon: Heart,
    href: '/sacraments/marriage',
    accent: 'burgundy',
  },
  {
    title: 'Certificates',
    description: 'Request baptism, confirmation, or marriage certificates',
    icon: FileText,
    href: '/certificates',
    accent: 'primary',
  },
  {
    title: 'Join Ministries',
    description: 'Become part of our parish ministry teams',
    icon: Users,
    href: '/ministries/join',
    accent: 'gold',
  },
  {
    title: 'Family Portal',
    description: 'Register your family and access member resources',
    icon: UserPlus,
    href: '/portal',
    accent: 'burgundy',
  },
];

const iconBg: Record<DigitalService['accent'], string> = {
  primary: 'bg-primary/10 group-hover:bg-primary',
  gold: 'bg-gold-500/10 group-hover:bg-gold-500',
  burgundy: 'bg-burgundy-600/10 group-hover:bg-burgundy-600',
};

const iconColor: Record<DigitalService['accent'], string> = {
  primary: 'text-primary group-hover:text-white',
  gold: 'text-gold-600 group-hover:text-white',
  burgundy: 'text-burgundy-600 group-hover:text-white',
};

const borderHover: Record<DigitalService['accent'], string> = {
  primary: 'hover:border-primary',
  gold: 'hover:border-gold-500',
  burgundy: 'hover:border-burgundy-600',
};

export function DigitalServicesSection() {
  return (
    <section id="parish-family" className="section-padding bg-secondary-200/30">
      <div className="container-sacred">
        {/* ── Section header ── */}
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              Modern Parish Life
            </p>
            <h2 className="font-display text-foreground mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Digital <span className="text-gradient-primary">Parish Services</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Access sacraments, register, give, and connect — anytime, anywhere
            </p>
          </div>
        </ScrollReveal>

        {/* ── Service cards ── */}
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} animation="fade-in-up" delay={i * 70}>
                <Link href={service.href} className="block h-full">
                  <Card
                    className={`card-sacred group h-full p-0 hover:-translate-y-1 hover:shadow-2xl ${borderHover[service.accent]}`}
                  >
                    <div className="flex h-full flex-col p-7 md:p-8">
                      {/* Icon */}
                      <div className="mb-5">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-500 ${iconBg[service.accent]}`}
                        >
                          <Icon
                            className={`h-7 w-7 transition-colors duration-500 ${iconColor[service.accent]}`}
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <h3 className="font-display mb-2 text-xl font-extrabold text-slate-950 md:text-[1.35rem] dark:text-white">
                          {service.title}
                        </h3>
                        <p className="text-sm font-medium leading-relaxed text-slate-800 md:text-base dark:text-slate-200">
                          {service.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="text-primary mt-6 flex items-center gap-1 text-sm font-semibold">
                        <span className="group-hover:underline">Learn More</span>
                        <ChevronRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Help card ── */}
        <ScrollReveal animation="fade-in-up" delay={300}>
          <div className="mx-auto mt-16 max-w-3xl">
            <Card className="border-primary/20 bg-primary/5 rounded-2xl border-2 p-0 shadow-lg">
              <div className="p-8 text-center md:p-12">
                <p className="text-foreground mb-3 text-xl font-semibold md:text-2xl">
                  Need Assistance?
                </p>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed md:text-base">
                  Our parish office is here to help you with any questions about our services.
                </p>
                <Link href="/contact" className={buttonClassName('outline', 'lg', 'h-12 px-8')}>
                  Contact Parish Office
                </Link>
              </div>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

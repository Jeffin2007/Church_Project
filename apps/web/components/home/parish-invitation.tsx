'use client';

import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { buttonClassName } from '@/components/ui/button';
import { PARISH } from '@/lib/parish-data';
import { Cross, Users, Heart, Phone } from 'lucide-react';
import Link from 'next/link';

const WAYS = [
  {
    icon: Cross,
    title: 'Attend Holy Mass',
    titleTa: 'திருப்பலியில் கலந்துகொள்ளுங்கள்',
    desc: 'Join us every Sunday and daily for the Holy Eucharist.',
    descTa: 'ஒவ்வொரு ஞாயிறும் தினசரி திருப்பலியில் கலந்துகொள்ளுங்கள்.',
    href: '#mass-timings',
    label: 'View Mass Timings',
    style: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white',
  },
  {
    icon: Users,
    title: 'Join a Ministry',
    titleTa: 'ஒரு அமைப்பில் சேருங்கள்',
    desc: 'Serve God and community through one of our ten vibrant ministries.',
    descTa: 'பத்து உயிரோட்டமான அமைப்புகளில் ஒன்றில் கடவுளுக்கும் சமூகத்திற்கும் சேவை செய்யுங்கள்.',
    href: '#ministries',
    label: 'Join a Ministry',
    style: 'bg-gold-500/10 text-gold-600 group-hover:bg-gold-500 group-hover:text-white',
  },
  {
    icon: Heart,
    title: 'Serve the Parish',
    titleTa: 'பங்கிற்கு சேவை செய்யுங்கள்',
    desc: 'Volunteer with anbiyams, feast preparations, or charitable works.',
    descTa: 'அன்பியங்கள், திருவிழா ஏற்பாடுகள் அல்லது தொண்டு பணிகளில் உதவுங்கள்.',
    href: '/portal',
    label: 'Register Your Family',
    style:
      'bg-burgundy-600/10 text-burgundy-600 group-hover:bg-burgundy-600 group-hover:text-white',
  },
  {
    icon: Phone,
    title: 'Contact the Office',
    titleTa: 'அலுவலகத்தை தொடர்பு கொள்ளுங்கள்',
    desc: 'We are here to help — for sacraments, certificates, and more.',
    descTa: 'அருட்சாதனங்கள், சான்றிதழ்கள் மற்றும் உதவிக்கு எங்களை அழையுங்கள்.',
    href: '/contact',
    label: 'Contact Parish Office',
    style: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white',
  },
] as const;

export function ParishInvitation() {
  return (
    <section
      aria-label="Join our parish family"
      className="section-padding relative overflow-hidden"
    >
      {/* Warm ivory background with subtle gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, hsl(214,70%,97%) 0%, hsl(40,43%,98%) 50%, hsl(43,69%,96%) 100%)',
        }}
        aria-hidden="true"
      />
      {/* Subtle cross watermark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect x='35' y='10' width='10' height='60' fill='%23123B6D'/%3E%3Crect x='10' y='28' width='60' height='10' fill='%23123B6D'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-sacred relative">
        {/* ── Header ── */}
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              You Are Welcome Here
            </p>
            <h2 className="font-display text-foreground mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Become Part of Our
              <br />
              <span className="text-gradient-primary">Parish Family</span>
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Join us in worship, fellowship, and service.
            </p>
            <p
              className="text-muted-foreground mt-2 text-base"
              lang="ta"
              style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
            >
              வழிபாட்டிலும், நட்பிலும், சேவையிலும் எங்களுடன் இணையுங்கள்.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Four ways ── */}
        <div className="mx-auto mb-16 grid max-w-5xl gap-8 sm:grid-cols-2">
          {WAYS.map(({ icon: Icon, title, titleTa, desc, descTa, href, label, style }, i) => (
            <ScrollReveal key={title} animation="fade-in-up" delay={i * 80}>
              <Link
                href={href}
                className="border-border bg-background hover:border-primary group flex h-full flex-col gap-5 rounded-2xl border-2 p-8 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl md:p-9"
              >
                {/* Icon */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-500 ${style}`}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-display text-foreground mb-1 text-xl font-bold md:text-2xl">
                    {title}
                  </h3>
                  <p
                    className="text-muted-foreground mb-3 text-xs font-medium"
                    lang="ta"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  >
                    {titleTa}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    {desc}
                  </p>
                  <p
                    className="text-muted-foreground/75 mt-2 text-xs leading-loose"
                    lang="ta"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  >
                    {descTa}
                  </p>
                </div>

                {/* CTA arrow */}
                <div className="text-primary flex items-center gap-2 text-sm font-semibold">
                  <span className="group-hover:underline">{label}</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Bottom contact bar ── */}
        <ScrollReveal animation="fade-in-up" delay={200}>
          <div className="border-primary/20 bg-background mx-auto max-w-3xl rounded-2xl border-2 p-8 shadow-lg md:p-10">
            <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
              <div>
                <h3 className="font-display text-foreground mb-2 text-xl font-bold md:text-2xl">
                  {PARISH.identity.name}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {PARISH.contact.address}
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-5">
                  <a
                    href={`tel:${PARISH.contact.phone.replace(/\s/g, '')}`}
                    className="text-primary text-sm font-medium hover:underline md:text-base"
                  >
                    📞 {PARISH.contact.phone}
                  </a>
                  <a
                    href={`mailto:${PARISH.contact.email}`}
                    className="text-primary text-sm font-medium hover:underline md:text-base"
                  >
                    ✉️ {PARISH.contact.email}
                  </a>
                </div>
              </div>
              <Link
                href="/contact"
                className={buttonClassName('primary', 'lg', 'h-12 shrink-0 px-8')}
              >
                Contact Parish Office
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

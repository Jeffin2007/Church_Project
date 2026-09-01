'use client';

import { Card } from '@/components/ui/card';
import { buttonClassName } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { DollarSign, Baby, Heart, Users, UserPlus, ChevronRight, Church } from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

interface DigitalService {
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
  icon: LucideIcon;
  href: string;
  accent: 'primary' | 'gold' | 'burgundy';
}

const services: DigitalService[] = [
  {
    titleEn: 'Online Offerings',
    titleTa: 'ஆன்லைன் காணிக்கை',
    descEn: 'Make your tithes and offerings securely online',
    descTa: 'பங்கு வளர்ச்சி மற்றும் நற்செய்தி பணிகளுக்கு காணிக்கை செலுத்துங்கள்',
    icon: DollarSign,
    href: '/offerings',
    accent: 'primary',
  },
  {
    titleEn: 'Request Baptism',
    titleTa: 'ஞானஸ்நானம் விண்ணப்பம்',
    descEn: "Schedule your child's baptism sacrament",
    descTa: 'குழந்தைக்கான திருமுழுக்கு அருட்சாதனத்தை பதிவு செய்யுங்கள்',
    icon: Baby,
    href: '/sacraments/baptism',
    accent: 'gold',
  },
  {
    titleEn: 'Marriage Services',
    titleTa: 'திருமண அருட்சாதனம்',
    descEn: 'Plan your Catholic wedding ceremony',
    descTa: 'கத்தோலிக்க திருமண சடங்குகள் மற்றும் ஆவணங்களை பதிவு செய்யுங்கள்',
    icon: Heart,
    href: '/sacraments/marriage',
    accent: 'burgundy',
  },
  {
    titleEn: 'Mass Intentions',
    titleTa: 'திருப்பலி கருத்துக்கள்',
    descEn: 'Request Holy Mass offerings and thanksgiving intentions online',
    descTa: 'நன்றி திருப்பலி மற்றும் நினைவு திருப்பலி கருத்துக்களை பதிவு செய்யுங்கள்',
    icon: Church,
    href: '/family/mass-intentions',
    accent: 'primary',
  },
  {
    titleEn: 'Join Ministries',
    titleTa: 'பக்த சபைகளில் இணைய',
    descEn: 'Become part of our parish ministry teams',
    descTa: 'பங்கின் பல்வேறு பக்த சபைகளில் இணைந்து இறைப்பணியாற்றுங்கள்',
    icon: Users,
    href: '/ministries/join',
    accent: 'gold',
  },
  {
    titleEn: 'Family Portal',
    titleTa: 'குடும்ப போர்ட்டல்',
    descEn: 'Register your family and access member resources',
    descTa: 'பங்கு குடும்ப அட்டை விவரங்கள் மற்றும் சான்றிதழ்களை அணுகுங்கள்',
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
  const { isTamil, t } = useLanguage();

  return (
    <section id="parish-family" className="section-padding bg-secondary-200/30 dark:bg-slate-900/50">
      <div className="container-sacred">
        {/* ── Section header ── */}
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p
              className="text-primary dark:text-gold-400 mb-4 text-sm font-black uppercase tracking-[0.2em]"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t('Modern Parish Life · இணைய சேவைகள்', 'இணையவழி பங்கு சேவைகள்')}
            </p>
            <h2
              className="font-display mb-6 text-4xl font-black leading-tight text-slate-950 dark:text-white md:text-5xl lg:text-6xl"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {isTamil ? (
                <>
                  இணையவழி <span className="text-primary dark:text-rose-400 font-black">பங்கு சேவைகள்</span>
                </>
              ) : (
                <>
                  Digital <span className="text-primary dark:text-rose-400 font-black">Parish Services</span>
                </>
              )}
            </h2>
            <p
              className="text-lg font-black text-slate-900 dark:text-slate-200 md:text-xl"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t(
                'Book Mass intentions, request sacraments, and stay connected with our parish.',
                'திருப்பலி கருத்துக்கள் பதிவு செய்தல், அருட்சாதன விண்ணப்பங்கள் மற்றும் பங்கு சேவைகளை எளிதாக அணுகுங்கள்.',
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* ── Service cards ── */}
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            const title = isTamil ? service.titleTa : service.titleEn;
            const desc = isTamil ? service.descTa : service.descEn;

            return (
              <ScrollReveal key={service.titleEn} animation="fade-in-up" delay={i * 70}>
                <Link href={service.href} className="block h-full">
                  <Card
                    className={`card-sacred group h-full rounded-2xl border-2 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/90 p-0 shadow-md hover:-translate-y-1 hover:shadow-2xl ${borderHover[service.accent]}`}
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
                        <h3
                          className="font-display mb-2 text-xl font-black text-slate-950 dark:text-white md:text-[1.35rem]"
                          style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                        >
                          {title}
                        </h3>
                        <p
                          className="text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-300 md:text-base"
                          style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                        >
                          {desc}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div
                        className="text-primary dark:text-rose-400 mt-6 flex items-center gap-1 text-sm font-black"
                        style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                      >
                        <span className="group-hover:underline">{t('Learn More', 'மேலும் அறிய')}</span>
                        <ChevronRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Help card — Need Assistance Section ── */}
        <ScrollReveal animation="fade-in-up" delay={300}>
          <div className="mx-auto mt-16 max-w-3xl">
            <Card className="border-primary/30 from-primary/15 via-gold-500/15 to-primary/10 rounded-2xl border-2 bg-gradient-to-br p-0 shadow-xl dark:border-primary/40 dark:from-primary/25 dark:via-gold-500/20 dark:to-primary/20">
              <div className="p-8 text-center md:p-12">
                <p
                  className="font-display mb-3 text-2xl font-black text-slate-950 dark:text-white md:text-3xl"
                  style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                >
                  {t('Need Assistance?', 'உதவி தேவையா?')}
                </p>
                <p
                  className="mb-8 text-sm font-bold leading-relaxed text-slate-800 dark:text-slate-200 md:text-base"
                  style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                >
                  {t(
                    'Our parish office is here to help you with any questions about our sacraments, services, and parish life.',
                    'அருட்சாதனங்கள், பங்கு சேவைகள் மற்றும் வழிபாடுகள் பற்றிய கேள்விகளுக்கு எமது பங்கு அலுவலகம் உதவ தயாராக உள்ளது.',
                  )}
                </p>
                <Link
                  href="/contact"
                  className={buttonClassName('primary', 'lg', 'h-12 px-8 font-extrabold shadow-lg')}
                  style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                >
                  {t('Contact Parish Office', 'பங்கு அலுவலகத்தை தொடர்பு கொள்ள')}
                </Link>
              </div>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

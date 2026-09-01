'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Cross, Heart, Users } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';
import { useLanguage } from '@/context/language-context';

export function WelcomeSection() {
  const { isTamil, t } = useLanguage();

  const pillars = [
    {
      icon: Cross,
      title: t('Holy Mass', 'புனித திருப்பலி'),
      desc: t('Daily & Sunday Celebrations', 'தினசரி மற்றும் ஞாயிறு வழிபாடுகள்'),
      color: 'text-primary dark:text-gold-400',
    },
    {
      icon: Heart,
      title: t('Community', 'பங்கு சமூகம்'),
      desc: t('Active Parish Ministries', 'இயங்கும் பக்த சபைகள் & அன்பியங்கள்'),
      color: 'text-burgundy-700 dark:text-rose-400',
    },
    {
      icon: Users,
      title: t('Service', 'சமூக சேவை'),
      desc: t('Outreach & Charity', 'ஏழை எளியோர் நல உதவி'),
      color: 'text-amber-700 dark:text-amber-400',
    },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-sacred">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Image reveal ── */}
          <ScrollReveal animation="slide-in-left" threshold={0.15}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10">
              <div className="relative aspect-[4/3]">
                <SafeImage
                  src="/images/church/exterior.webp"
                  alt="Queen of All Saints Church Exterior"
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholderLabel="Queen of All Saints Church"
                  placeholderClassName="absolute inset-0"
                />
                {/* Gold ornament bar at bottom of image */}
                <div className="from-primary via-gold-500 to-primary absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r" />
              </div>
            </div>
          </ScrollReveal>

          {/* ── Text content ── */}
          <div className="space-y-8">
            <ScrollReveal animation="fade-in-up" delay={100}>
              <p
                className="text-primary dark:text-gold-400 font-black uppercase tracking-[0.25em] text-sm"
                style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
              >
                {t('Welcome Home', 'நல்வரவு')}
              </p>
              <h2
                className="font-display mt-3 text-4xl font-black leading-tight text-slate-950 dark:text-white md:text-5xl lg:text-6xl"
                style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
              >
                {isTamil ? (
                  <>
                    நல்வரவு!
                    <br />
                    <span className="font-black text-primary dark:text-rose-400 drop-shadow-sm">
                      அனைத்து புனிதர்களின் அரசி ஆலயம்
                    </span>
                  </>
                ) : (
                  <>
                    Welcome to
                    <br />
                    <span className="font-black text-primary dark:text-rose-400 drop-shadow-sm">
                      Queen of All Saints
                    </span>
                  </>
                )}
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-in-up" delay={200}>
              <div
                className="space-y-5"
                style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
              >
                {isTamil ? (
                  <>
                    <p className="text-lg font-bold leading-relaxed text-slate-900 dark:text-slate-200 md:text-xl md:leading-loose">
                      <span className="rounded-md border border-primary/40 bg-primary/10 dark:bg-rose-950/40 dark:border-rose-500/40 px-2.5 py-0.5 font-black text-primary dark:text-rose-300">
                        தூய நற்கருணை
                      </span>
                      யில் மையம் கொண்டு,{' '}
                      <span className="rounded-md border border-primary/40 bg-primary/10 dark:bg-rose-950/40 dark:border-rose-500/40 px-2.5 py-0.5 font-black text-primary dark:text-rose-300">
                        செபத்தில்
                      </span>{' '}
                      வேரூன்றி, பிறரன்புப்{' '}
                      <span className="rounded-md border border-primary/40 bg-primary/10 dark:bg-rose-950/40 dark:border-rose-500/40 px-2.5 py-0.5 font-black text-primary dark:text-rose-300">
                        பணியில்
                      </span>{' '}
                      அர்ப்பணிக்கப்பட்ட ஒரு கிறிஸ்தவ சமூகம்.
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-slate-800 dark:text-slate-300 md:text-lg md:leading-loose">
                      1977-ஆம் ஆண்டு முதல், திருச்சிராப்பள்ளி கே.கே. நகரில் நம்பிக்கையின் திருவிளக்காக மிளிரும் நமது ஆலயம், கிறிஸ்துவின் அன்பையும் அன்னை மரியாவின் பரிந்துரையையும் நாடிவரும் அனைவரையும் அன்போடு வரவேற்கிறது.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-bold leading-relaxed text-slate-900 dark:text-slate-200 md:text-xl md:leading-loose">
                      A parish community centred on the{' '}
                      <span className="rounded-md border border-primary/40 bg-primary/10 dark:bg-rose-950/40 dark:border-rose-500/40 px-2.5 py-0.5 font-black text-primary dark:text-rose-300">
                        Holy Eucharist
                      </span>
                      , rooted in{' '}
                      <span className="rounded-md border border-primary/40 bg-primary/10 dark:bg-rose-950/40 dark:border-rose-500/40 px-2.5 py-0.5 font-black text-primary dark:text-rose-300">
                        prayer
                      </span>
                      , and dedicated to{' '}
                      <span className="rounded-md border border-primary/40 bg-primary/10 dark:bg-rose-950/40 dark:border-rose-500/40 px-2.5 py-0.5 font-black text-primary dark:text-rose-300">
                        service
                      </span>
                      .
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-slate-800 dark:text-slate-300 md:text-lg md:leading-loose">
                      Since 1977, our parish has been a beacon of faith in Tiruchirappalli, welcoming
                      all who seek the love of Christ and the intercession of Our Blessed Mother, the{' '}
                      <span className="font-black text-primary dark:text-rose-400 underline decoration-primary dark:decoration-rose-400 decoration-2 underline-offset-4">
                        Queen of All Saints
                      </span>
                      .
                    </p>
                  </>
                )}
              </div>
            </ScrollReveal>

            {/* ── Three-pillar cards — Equal height & alignment ── */}
            <div className="grid items-stretch gap-4 pt-4 sm:grid-cols-3">
              {pillars.map(({ icon: Icon, title, desc, color }, i) => (
                <ScrollReveal
                  key={title}
                  animation="scale-in"
                  delay={300 + i * 100}
                  className="h-full"
                >
                  <Card className="hover:border-primary group flex h-full min-h-[150px] flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/90 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div>
                      <Icon
                        className={`mb-3 h-8 w-8 transition-transform duration-300 group-hover:scale-110 ${color}`}
                      />
                      <h3
                        className="mb-1 text-base font-black text-slate-950 dark:text-white"
                        style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                      >
                        {title}
                      </h3>
                    </div>
                    <p
                      className="text-xs font-bold text-slate-700 dark:text-slate-300"
                      style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                    >
                      {desc}
                    </p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

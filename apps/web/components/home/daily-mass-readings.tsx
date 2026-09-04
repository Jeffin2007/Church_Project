'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export function DailyMassReadingsSection() {
  const { isTamil, t } = useLanguage();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Lazy load Catholic Gallery scripts when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Inject scripts once lazy loaded
  useEffect(() => {
    if (!isIntersecting) return;

    // Load English script
    if (!document.querySelector('script[src*="cg_mrc_widget.js"]')) {
      const scriptEng = document.createElement('script');
      scriptEng.src =
        'https://cdn1.catholicgallery.org/wp-content/uploads/widgets/rich-card/cg_mrc_widget.js';
      scriptEng.async = true;
      document.body.appendChild(scriptEng);
    }

    // Load Tamil script
    if (!document.querySelector('script[src*="cg_mrc_widget_tam.js"]')) {
      const scriptTam = document.createElement('script');
      scriptTam.src =
        'https://cdn1.catholicgallery.org/wp-content/uploads/widgets/rich-card/cg_mrc_widget_tam.js';
      scriptTam.async = true;
      document.body.appendChild(scriptTam);
    }
  }, [isIntersecting]);

  return (
    <section
      id="daily-readings"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-16 text-foreground sm:py-24"
    >
      {/* Sacred Stained Glass & Candle Glow Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15 dark:opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 20%, rgba(212, 175, 55, 0.25), transparent 70%),
                            radial-gradient(circle at 10% 80%, rgba(0, 35, 102, 0.4), transparent 50%),
                            radial-gradient(circle at 90% 80%, rgba(139, 0, 0, 0.3), transparent 50%)`,
        }}
      />
      {/* Subtle Cross watermark overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-rule='evenodd'%3E%3Cpath d='M30 0v60M0 20h60' stroke='%23d4af37' stroke-width='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 text-center">
          <div className="border-gold/40 bg-gold/10 text-primary dark:text-gold-300 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-widest shadow-sm">
            <BookOpen className="h-4 w-4" /> {t('Liturgy of the Word', 'இறைவார்த்தை வழிபாடு')}
          </div>
          <h2 className="font-heading text-3xl font-black tracking-tight text-foreground sm:text-5xl" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
            {t("Today's Bible Verse", 'இன்றைய வேத வசனம் & வாசகங்கள்')}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl font-serif text-sm italic sm:text-base" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
            {t(
              '"Your word is a lamp for my feet, a light on my path." — Psalm 119:105',
              '"உம் வார்த்தையே என் கால்களுக்கு விளக்கு, என் பாதைக்கு ஒளி." — திருப்பாடல்கள் 119:105',
            )}
          </p>
        </div>

        {/* Mass Readings Card (Separated by Selected Language) */}
        <div className="mx-auto max-w-3xl">
          {isTamil ? (
            /* Tamil Mass Readings Card */
            <div className="glass-card flex flex-col justify-between space-y-4 rounded-3xl border border-gold/40 bg-card p-6 shadow-xl text-card-foreground sm:p-8">
              <div className="border-border/80 flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-rose-600 px-2.5 py-0.5 text-xs font-black text-white">
                    தமிழ்
                  </span>
                  <h4 className="font-heading text-lg font-bold text-foreground" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
                    இன்றைய திருப்பலி வாசகங்கள்
                  </h4>
                </div>
                <span className="text-gold-600 dark:text-gold-400 text-xs font-semibold">Catholic Gallery Tamil</span>
              </div>

              {/* Official Catholic Gallery Tamil Widget Container */}
              <div className="min-h-[300px] w-full overflow-hidden rounded-2xl">
                <div
                  className="cg_mrc_widget_tam"
                  style={{ width: '100%', maxWidth: '100%', margin: 'auto' }}
                />
              </div>
            </div>
          ) : (
            /* English Mass Readings Card */
            <div className="glass-card flex flex-col justify-between space-y-4 rounded-3xl border border-gold/40 bg-card p-6 shadow-xl text-card-foreground sm:p-8">
              <div className="border-border/80 flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-blue-600 px-2.5 py-0.5 text-xs font-black text-white">
                    EN
                  </span>
                  <h4 className="font-heading text-lg font-bold text-foreground">
                    Daily Mass Readings (English)
                  </h4>
                </div>
                <span className="text-gold-600 dark:text-gold-400 text-xs font-semibold">Catholic Gallery</span>
              </div>

              {/* Official Catholic Gallery English Widget Container */}
              <div className="min-h-[300px] w-full overflow-hidden rounded-2xl">
                <div
                  className="cg_mrc_widget"
                  style={{ width: '100%', maxWidth: '100%', margin: 'auto' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

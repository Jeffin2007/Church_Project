'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Heart, Quote } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const SCRIPTURE_QUOTES = [
  {
    text: 'Ignorance of Scripture is ignorance of Christ.',
    textTa: 'மறைநூலை அறியாமை கிறிஸ்துவை அறியாமையே ஆகும்.',
    author: 'St. Jerome',
    authorTa: 'புனித ஜெரோம்',
  },
  {
    text: 'Your word is a lamp for my feet and a light to my path.',
    textTa: 'உம் வார்த்தையே என் கால்களுக்கு விளக்கு, என் பாதைக்கு ஒளி.',
    author: 'Psalm 119:105',
    authorTa: 'திருப்பாடல்கள் 119:105',
  },
  {
    text: 'Faith comes from hearing, and hearing through the word of Christ.',
    textTa: 'கிறிஸ்துவைப் பற்றிய நற்செய்தியைக் கேட்பதால் நம்பிக்கை உண்டாகிறது.',
    author: 'Romans 10:17',
    authorTa: 'உரோமையர் 10:17',
  },
  {
    text: 'Blessed are those who hear the word of God and keep it.',
    textTa: 'இறைவார்த்தையைக் கேட்டு அதன்படி நடப்போரே பேறுபெற்றோர்.',
    author: 'Luke 11:28',
    authorTa: 'லூக்கா 11:28',
  },
  {
    text: 'The Sacred Scriptures are the soul of theology.',
    textTa: 'திருவிவிலியமே இறையியலின் ஆன்மாவாகும்.',
    author: 'Vatican II',
    authorTa: 'இரண்டாம் வத்திக்கான் சங்கம்',
  },
  {
    text: 'The Gospel is the power of God for salvation.',
    textTa: 'நற்செய்தி மீட்பளிக்கும் கடவுளின் வல்லமையாய் இருக்கிறது.',
    author: 'Romans 1:16',
    authorTa: 'உரோமையர் 1:16',
  },
];

export function DailyMassReadingsSection() {
  const { isTamil, t } = useLanguage();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto rotate quotes every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % SCRIPTURE_QUOTES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

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

  const currentQuote = SCRIPTURE_QUOTES[currentQuoteIndex];

  return (
    <section
      id="daily-readings"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-24"
    >
      {/* Sacred Stained Glass & Candle Glow Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
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

      <div className="relative mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 text-center">
          <div className="border-gold-400/40 bg-gold-500/10 text-gold-300 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-black uppercase tracking-widest shadow-md">
            <BookOpen className="h-4 w-4" /> {t('Liturgy of the Word', 'இறைவார்த்தை வழிபாடு')}
          </div>
          <h2 className="font-heading text-3xl font-black tracking-tight text-white sm:text-5xl" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
            {t("Today's Word of God", 'இன்றைய இறைவார்த்தை')}
          </h2>
          <p className="text-gold-200/90 mx-auto max-w-2xl font-serif text-sm italic sm:text-base" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
            {t(
              '"Your word is a lamp for my feet, a light on my path." — Psalm 119:105',
              '"உம் வார்த்தையே என் கால்களுக்கு விளக்கு, என் பாதைக்கு ஒளி." — திருப்பாடல்கள் 119:105',
            )}
          </p>

          {/* Liturgical Season Badge (Phase 7) */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-300" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
              {t('🟢 18th Sunday in Ordinary Time · Liturgical Year B', '🟢 பொதுக்காலம் 18-ஆம் ஞாயிறு · வழிபாட்டு ஆண்டு ஆ')}
            </span>
          </div>
        </div>

        {/* PHASE 3 — Spiritual Reflection Panel */}
        <div className="border-gold-400/40 space-y-4 rounded-3xl border-2 bg-gradient-to-r from-[hsl(214,75%,12%)] via-[hsl(214,70%,15%)] to-[hsl(214,75%,12%)] p-6 shadow-2xl sm:p-8">
          <div className="border-gold-400/20 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gold-500/20 text-gold-300 border-gold-400/40 flex h-10 w-10 items-center justify-center rounded-2xl border">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white sm:text-2xl" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
                {t('Prepare Your Heart Before Holy Mass', 'திருப்பலிக்கு முன் இதயத்தை ஆயத்தப்படுத்துதல்')}
              </h3>
            </div>
            <span className="text-gold-300 font-serif text-xs italic" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
              {t('Eucharistic Preparation', 'நற்கருணை வழிபாட்டு ஆயத்தம்')}
            </span>
          </div>

          <p className="text-gold-200 font-serif text-sm italic sm:text-base" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
            {t(
              '"Before listening to Christ in the Eucharist, listen to Him in His Word."',
              '"நற்கருணையில் கிறிஸ்துவை சந்திக்கும் முன், அவரது இறைவார்த்தையில் அவருக்கு செவிமடுப்போம்."',
            )}
          </p>

          <p className="text-xs font-medium leading-relaxed text-slate-200 sm:text-sm" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
            {t(
              "Reading the Holy Scriptures before attending Mass helps us understand God's message more deeply, prepares our hearts for the Eucharistic celebration, and allows us to participate in the Sacred Liturgy with greater faith and devotion.",
              'திருப்பலிக்கு வரும் முன் அன்றைய வாசகங்களை வாசித்து தியானிப்பது, இறைவனின் செய்தியை ஆழமாக புரிந்துகொள்ளவும், நற்கருணை வழிபாட்டில் அதிக பக்தியோடு பங்கேற்கவும் உதவுகிறது.',
            )}
          </p>
        </div>

        {/* PHASE 4 — Inspirational Rotating Scripture Quotes */}
        <div className="border-border/60 space-y-1 rounded-2xl border bg-slate-900/80 p-4 text-center shadow-lg backdrop-blur-md">
          <div className="text-gold-300 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
            <Quote className="h-3.5 w-3.5" /> {t('Inspirational Catholic Reflection', 'கத்தோலிக்க ஆன்மீக சிந்தனை')}
          </div>
          <div className="flex min-h-[44px] flex-col justify-center transition-all duration-700 ease-in-out">
            <p className="font-heading text-sm font-bold text-white sm:text-base" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
              &ldquo;{isTamil ? currentQuote?.textTa || currentQuote?.text : currentQuote?.text}&rdquo;
            </p>
            <span className="text-amber-300 font-serif text-xs font-semibold italic">
              — {isTamil ? currentQuote?.authorTa || currentQuote?.author : currentQuote?.author}
            </span>
          </div>
        </div>

        {/* PHASE 5 — Before Mass Reminder Banner */}
        <div className="flex items-start gap-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-200 shadow-md sm:p-5 sm:text-sm">
          <div className="flex-shrink-0 text-2xl">📖</div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
              {t('Before Mass Preparation Notice', 'திருப்பலிக்கு முந்தைய தயாரிப்பு')}
            </h4>
            <p className="leading-relaxed" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
              {t(
                "Spend a few minutes reading today's Scriptures before coming to Holy Mass. When we hear the same readings proclaimed during the Eucharistic celebration, our hearts are already prepared to receive Christ more fruitfully.",
                'திருப்பலிக்கு புறப்படும் முன் சில நிமிடங்கள் இறைவார்த்தையை வாசித்து சிந்தியுங்கள். திருப்பலியில் அதே இறைவார்த்தை வாசிக்கப்படும் போது, கிறிஸ்துவை முழு மனதோடு பெற்றுக்கொள்ள நம் உள்ளம் ஆயத்தமாகும்.',
              )}
            </p>
          </div>
        </div>

        {/* PHASE 1 & 2 — Mass Readings Card (Separated by Selected Language) */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-heading text-2xl font-bold text-white" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
              {t("Today's Liturgical Readings", 'இன்றைய திருப்பலி வாசகங்கள்')}
            </h3>
            <p className="mt-1 text-xs font-medium text-slate-200" style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}>
              {t(
                'Official Catholic Mass Readings for today',
                'அன்னை திருச்சபையின் இன்றைய அதிகாரப்பூர்வ திருப்பலி வாசகங்கள்',
              )}
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            {isTamil ? (
              /* Tamil Mass Readings Card */
              <div className="border-gold-400/40 flex flex-col justify-between space-y-4 rounded-3xl border-2 bg-slate-900/90 p-6 shadow-2xl">
                <div className="border-gold-400/30 flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-rose-600 px-2.5 py-0.5 text-xs font-black text-white">
                      தமிழ்
                    </span>
                    <h4 className="font-heading text-lg font-bold text-white" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
                      இன்றைய திருப்பலி வாசகங்கள்
                    </h4>
                  </div>
                  <span className="text-gold-300 text-xs font-semibold">Catholic Gallery Tamil</span>
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
              <div className="border-gold-400/40 flex flex-col justify-between space-y-4 rounded-3xl border-2 bg-slate-900/90 p-6 shadow-2xl">
                <div className="border-gold-400/30 flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-blue-600 px-2.5 py-0.5 text-xs font-black text-white">
                      EN
                    </span>
                    <h4 className="font-heading text-lg font-bold text-white">
                      Daily Mass Readings (English)
                    </h4>
                  </div>
                  <span className="text-gold-300 text-xs font-semibold">Catholic Gallery</span>
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
      </div>
    </section>
  );
}

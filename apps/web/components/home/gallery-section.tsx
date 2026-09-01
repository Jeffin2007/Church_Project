'use client';

import { useState, useCallback } from 'react';
import { buttonClassName } from '@/components/ui/button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { PARISH, type GalleryCategory, type GalleryImage } from '@/lib/parish-data';
import { X, ZoomIn } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe-image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

type LightboxImage = GalleryImage;

const CATEGORIES: { id: GalleryCategory; label: string; labelTa: string }[] = [
  { id: 'all', label: 'All Photos', labelTa: 'அனைத்தும்' },
  { id: 'events', label: 'Parish Events', labelTa: 'பங்கு நிகழ்வுகள்' },
  { id: 'community', label: 'Community', labelTa: 'சமூகம்' },
  { id: 'feast', label: 'Feast', labelTa: 'திருவிழா' },
  { id: 'mass', label: 'Holy Mass', labelTa: 'திருப்பலி' },
];

/** Varied aspect ratios create a cinematic masonry rhythm */
const GALLERY_ASPECTS = [
  'aspect-[4/3]',
  'aspect-[3/4]',
  'aspect-[16/10]',
  'aspect-[5/4]',
  'aspect-square',
  'aspect-[3/2]',
] as const;

export function GallerySection() {
  const { isTamil, t } = useLanguage();
  const [selected, setSelected] = useState<GalleryCategory>('all');
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);

  const filtered =
    selected === 'all' ? PARISH.gallery : PARISH.gallery.filter((img) => img.category === selected);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section className="section-padding bg-background">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p
              className="text-primary dark:text-gold-400 mb-4 text-sm font-black uppercase tracking-[0.2em]"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t('Moments of Faith · நம்பிக்கையின் தருணங்கள்', 'நம்பிக்கையின் தருணங்கள்')}
            </p>
            <h2
              className="font-display mb-4 text-4xl font-black leading-tight text-slate-950 dark:text-white md:text-5xl lg:text-6xl"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {isTamil ? (
                <>
                  பங்கு <span className="text-primary dark:text-rose-400 font-black">புகைப்பட தொகுப்பு</span>
                </>
              ) : (
                <>
                  Parish <span className="text-primary dark:text-rose-400 font-black">Gallery</span>
                </>
              )}
            </h2>
            <p
              className="text-lg font-black text-slate-900 dark:text-slate-200 md:text-xl"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t(
                'Capturing the spirit and life of our faith community',
                'எங்கள் பங்கு சமூகத்தின் ஆன்மீக மற்றும் கூட்டு வாழ்வின் தருணங்கள்',
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* Category filter */}
        <ScrollReveal animation="fade-in-up" delay={100}>
          <div
            className="mb-12 flex flex-wrap justify-center gap-3"
            role="group"
            aria-label="Filter gallery by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelected(cat.id)}
                aria-pressed={selected === cat.id}
                className={`rounded-full px-5 py-2.5 text-sm font-black transition-all duration-300 ${
                  selected === cat.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:border-primary hover:text-primary dark:hover:text-gold-300 border shadow-sm'
                }`}
                style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
              >
                {isTamil ? cat.labelTa : cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Masonry grid */}
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <div className="text-muted-foreground py-16 text-center">
              <p>{t('No photos in this category yet. Check back soon!', 'இந்த பிரிவில் இன்னும் புகைப்படங்கள் இல்லை.')}</p>
            </div>
          ) : (
            <div className="columns-1 gap-6 sm:columns-2 sm:gap-7 lg:columns-3 lg:gap-8">
              {(filtered as readonly LightboxImage[]).map((image, i) => (
                <ScrollReveal
                  key={image.src}
                  animation="scale-in"
                  delay={i * 50}
                  duration={800}
                  threshold={0.06}
                >
                  <div
                    className="group mb-6 cursor-pointer break-inside-avoid overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:mb-7 lg:mb-8"
                    onClick={() => setLightbox(image)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${image.alt}`}
                    onKeyDown={(e) => e.key === 'Enter' && setLightbox(image)}
                  >
                    <div
                      className={`relative w-full overflow-hidden ${GALLERY_ASPECTS[i % GALLERY_ASPECTS.length]}`}
                    >
                      <SafeImage
                        src={image.src}
                        alt={image.alt}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        placeholderClassName="absolute inset-0"
                      />
                      <div className="bg-primary/60 absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <ZoomIn className="mb-2 h-8 w-8 text-white" aria-hidden="true" />
                        <p
                          className="px-4 text-center text-sm font-semibold text-white"
                          style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
                        >
                          {isTamil ? image.altTa : image.alt}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>

        <ScrollReveal animation="fade-in-up" delay={200}>
          <div className="mt-16 text-center">
            <Link
              href="/gallery"
              className={buttonClassName('outline', 'lg', 'h-12 px-8')}
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {t('View Complete Gallery', 'முழு தொகுப்பையும் பார்க்க')}
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
        >
          <button
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeImage
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={900}
              className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <p
              className="mt-4 text-center text-sm text-white/90"
              style={isTamil ? { fontFamily: "'Noto Sans Tamil', sans-serif" } : undefined}
            >
              {isTamil ? lightbox.altTa : lightbox.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

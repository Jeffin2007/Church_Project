'use client';

import { useState } from 'react';
import { SafeImage } from '@/components/ui/safe-image';
import { ZoomIn, X } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { ParishBadge } from '@/components/ui/parish-badge';

export default function GalleryPage() {
  const [filter, setFilter] = useState<'ALL' | 'FEAST' | 'MASS' | 'EVENTS' | 'COMMUNITY'>('ALL');
  const [activeImage, setActiveImage] = useState<{ src: string; caption: string } | null>(null);

  const images = [
    {
      src: '/images/hero/church-altar.webp',
      category: 'MASS',
      title: 'Main Sanctuary Altar',
      year: '2026',
    },
    {
      src: '/images/church/exterior.webp',
      category: 'COMMUNITY',
      title: 'Church Front Exterior',
      year: '2026',
    },
    {
      src: '/images/feast/celebration/feast-mass.jpg',
      category: 'FEAST',
      title: 'Annual Parish Feast High Mass',
      year: '2025',
    },
    {
      src: '/images/feast/procession/grand-procession.jpg',
      category: 'FEAST',
      title: 'Grand Marian Car Procession',
      year: '2025',
    },
    {
      src: '/images/feast/novena/novena-evening.jpg',
      category: 'FEAST',
      title: 'Solemn Evening Novena Devotions',
      year: '2025',
    },
    {
      src: '/images/gallery/events/gallery-img-29.webp',
      category: 'EVENTS',
      title: 'Parish Youth Cultural Festival',
      year: '2026',
    },
    {
      src: '/images/gallery/events/gallery-img-30.webp',
      category: 'EVENTS',
      title: 'Catechism Annual Day Celebration',
      year: '2026',
    },
    {
      src: '/images/gallery/events/gallery-img-31.webp',
      category: 'EVENTS',
      title: 'Christmas Midnight Vigil Mass',
      year: '2025',
    },
    {
      src: '/images/gallery/events/gallery-img-32.webp',
      category: 'EVENTS',
      title: 'Easter Sunday Joyful Celebration',
      year: '2026',
    },
    {
      src: '/images/gallery/events/gallery-img-37.webp',
      category: 'COMMUNITY',
      title: 'Anbiyam Family Prayer Fellowship',
      year: '2026',
    },
    {
      src: '/images/gallery/events/gallery-img-39.webp',
      category: 'COMMUNITY',
      title: 'Vincent de Paul Charity Distribution',
      year: '2026',
    },
    {
      src: '/images/gallery/events/gallery-img-40.webp',
      category: 'MASS',
      title: 'First Holy Communion Ceremony',
      year: '2026',
    },
  ];

  const filteredImages =
    filter === 'ALL' ? images : images.filter((img) => img.category === filter);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* Page Hero */}
      <PageHero
        title="Sacred Moments & Parish Life"
        tamilTitle="பங்கு புகைப்பட தொகுப்பு"
        eyebrow="Visual Archives · புகைப்பட கேலரி"
        description="Highlights from annual feast celebrations, Eucharistic liturgies, Holy Sacraments, and Anbiyam community fellowship."
        backgroundImage="/images/hero/church-altar.webp"
        breadcrumbs={[{ label: 'Photo Gallery' }]}
        align="center"
      />

      {/* Filter Tabs */}
      <section className="container-sacred">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3" role="tablist">
          {[
            { key: 'ALL', label: 'All Moments' },
            { key: 'FEAST', label: 'Annual Feast' },
            { key: 'MASS', label: 'Holy Mass & Liturgy' },
            { key: 'EVENTS', label: 'Parish Events' },
            { key: 'COMMUNITY', label: 'Anbiyams & Charity' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={filter === tab.key}
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
                filter === tab.key
                  ? 'bg-primary text-white shadow-md ring-2 ring-gold/50 dark:ring-gold'
                  : 'border border-border/80 bg-card text-muted-foreground hover:border-gold/50 hover:bg-muted/60 hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid with Cathedral Arch Tops */}
      <section className="container-sacred">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() =>
                setActiveImage({ src: img.src, caption: `${img.title} (${img.year})` })
              }
              className="group relative cursor-pointer overflow-hidden rounded-t-[2.5rem] rounded-b-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl dark:border-border/60"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <SafeImage
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute bottom-3 left-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ParishBadge variant="solemnity" size="sm">
                    {img.category}
                  </ParishBadge>
                  <p className="font-heading mt-1.5 text-sm font-bold text-white drop-shadow">
                    {img.title}
                  </p>
                  <p className="text-gold text-[11px] font-medium">{img.year}</p>
                </div>

                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full overflow-hidden rounded-2xl border-2 border-gold/60 bg-card p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-gold hover:text-black"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black">
              <SafeImage src={activeImage.src} alt="" fill className="object-contain" />
            </div>

            <div className="p-4 text-center">
              <p className="font-heading text-base sm:text-lg font-bold text-foreground">
                {activeImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

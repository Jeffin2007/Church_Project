'use client';

import { useState } from 'react';
import { SafeImage } from '@/components/ui/safe-image';
import { Camera, ZoomIn } from 'lucide-react';

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
    <div className="space-y-16 pb-20">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(214,75%,12%)] via-[hsl(214,70%,18%)] to-[hsl(214,65%,22%)] py-20 text-white md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 4v40M4 24h40' stroke='%23C9A227' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="container-sacred relative z-10 mx-auto max-w-5xl text-center">
          <div className="border-gold-400/40 bg-gold-500/20 text-gold-300 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
            <Camera className="h-3.5 w-3.5" />
            <span>Parish Photo Gallery · புகைப்பட தொகுப்பு</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Sacred Moments & <span className="text-gradient-gold">Parish Life</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            Highlights from annual feast celebrations, Eucharistic liturgies, Sacraments, and
            Anbiyam community fellowship.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container-sacred mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { key: 'ALL', label: 'All Photos' },
            { key: 'FEAST', label: 'Annual Feast' },
            { key: 'MASS', label: 'Holy Mass & Liturgy' },
            { key: 'EVENTS', label: 'Parish Events' },
            { key: 'COMMUNITY', label: 'Anbiyams & Ministries' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key as typeof filter)}
              className={`rounded-full px-5 py-2 text-xs font-bold shadow transition-all ${
                filter === tab.key
                  ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
                  : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border-border/80 border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="container-sacred mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() =>
                setActiveImage({ src: img.src, caption: `${img.title} (${img.year})` })
              }
              className="border-border/80 bg-card hover:border-primary group relative cursor-pointer overflow-hidden rounded-2xl border-2 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <SafeImage
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="bg-gold-400 rounded-md px-2 py-0.5 text-[10px] font-extrabold text-slate-950 shadow">
                    {img.category}
                  </span>
                  <p className="font-display mt-1 text-sm font-bold text-white drop-shadow">
                    {img.title}
                  </p>
                  <p className="text-gold-200 text-[11px] font-semibold">{img.year}</p>
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-slate-950/60 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="bg-card border-gold-400 relative max-w-4xl overflow-hidden rounded-2xl border-2 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-xl">
              <SafeImage src={activeImage.src} alt="" fill className="object-contain" />
            </div>
            <div className="p-4 text-center">
              <p className="font-display text-foreground text-base font-bold">
                {activeImage.caption}
              </p>
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="bg-primary text-primary-foreground mt-3 rounded-lg px-4 py-1.5 text-xs font-bold shadow"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

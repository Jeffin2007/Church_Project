'use client';

import { Image, Plus } from 'lucide-react';

export default function AdminGalleryPage() {
  const albums = [
    { id: 'g1', title: 'Parish Annual Feast 2025', count: 48, category: 'Feast', date: 'Oct 2025' },
    {
      id: 'g2',
      title: 'Easter Vigil Holy Mass & Procession',
      count: 32,
      category: 'Liturgy',
      date: 'Apr 2025',
    },
    {
      id: 'g3',
      title: 'Christmas Carols & Midnight Mass',
      count: 64,
      category: 'Celebration',
      date: 'Dec 2025',
    },
    {
      id: 'g4',
      title: 'First Holy Communion Ceremony',
      count: 24,
      category: 'Sacrament',
      date: 'May 2025',
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Image className="h-4 w-4" /> Media & Visual Archive
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Parish Photo & Video Gallery Albums
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Manage public photograph albums, feast photo galleries, and liturgical event archives.
          </p>
        </div>

        <button
          type="button"
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Gallery Album</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {albums.map((alb) => (
          <div
            key={alb.id}
            className="border-border/80 bg-card hover:border-primary group overflow-hidden rounded-2xl border p-4 shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-xl">
              <div className="text-primary/30 absolute inset-0 flex items-center justify-center text-4xl font-bold">
                🖼️
              </div>
              <span className="bg-gold-400 absolute bottom-2 left-2 rounded px-2 py-0.5 text-[10px] font-black text-slate-950">
                {alb.count} Photos
              </span>
            </div>
            <div className="mt-4 space-y-1">
              <span className="text-primary text-[10px] font-bold uppercase">{alb.category}</span>
              <h3 className="font-heading text-foreground group-hover:text-primary text-base font-bold">
                {alb.title}
              </h3>
              <p className="text-muted-foreground text-xs">{alb.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

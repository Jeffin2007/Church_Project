import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Queen of All Saints Parish',
  description: 'Parish feast celebrations, sacraments, and event photos',
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <h1 className="font-heading text-primary text-4xl font-bold">Parish Photo Gallery</h1>
        <p className="text-muted-foreground text-lg">
          Highlights from parish feast celebrations, Sacramental liturgies, and community events.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          'Annual Parish Feast',
          'First Holy Communion',
          'Christmas Midnight Mass',
          'Easter Vigil',
          'Anbiyam Gathering',
          'Youth Day',
        ].map((title) => (
          <div key={title} className="bg-card overflow-hidden rounded-xl border shadow-sm">
            <div className="bg-muted flex h-48 items-center justify-center text-4xl">📸</div>
            <div className="p-4">
              <h3 className="font-heading text-base font-bold">{title}</h3>
              <p className="text-muted-foreground mt-1 text-xs">Parish Archives — 2026</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

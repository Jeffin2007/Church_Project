import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parish History | Queen of All Saints Parish',
  description: 'History and heritage of Queen of All Saints Roman Catholic Church',
};

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <h1 className="font-heading text-primary text-4xl font-bold">Parish History & Heritage</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Tracing the spiritual journey and growth of our parish family across generations.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <span className="text-gold-600 dark:text-gold-400 text-xs font-bold">FOUNDATION</span>
          <h3 className="font-heading mt-1 text-xl font-bold">Establishing the Sanctuary</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Established to serve Catholic families in the region, the church began with a small
            chapel dedicated to Our Lady, Queen of All Saints.
          </p>
        </div>

        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <span className="text-gold-600 dark:text-gold-400 text-xs font-bold">EXPANSION</span>
          <h3 className="font-heading mt-1 text-xl font-bold">Building Community & Anbiyams</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            As the parish grew, seven basic Christian communities (Anbiyams) were established to
            foster neighborhood prayer meetings and solidarity.
          </p>
        </div>
      </div>
    </div>
  );
}

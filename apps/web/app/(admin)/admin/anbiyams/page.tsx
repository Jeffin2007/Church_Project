import type { Metadata } from 'next';
import { PARISH } from '@/lib/parish-data';

export const metadata: Metadata = { title: 'Anbiyams | Admin Portal' };

export default function AdminAnbiyamsPage() {
  const anbiyams = PARISH.anbiyams;
  const totalFamilies = anbiyams.reduce((sum, a) => sum + (a.families || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-primary text-3xl font-bold">Anbiyam Units Management</h1>
        <p className="text-muted-foreground text-sm">
          Oversee the {anbiyams.length} Basic Christian Community (Anbiyam) units of the parish.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Total Anbiyams</p>
          <p className="font-heading text-primary mt-1 text-3xl font-bold">{anbiyams.length}</p>
        </div>
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Total Families</p>
          <p className="font-heading text-secondary mt-1 text-3xl font-bold">{totalFamilies}</p>
        </div>
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Active Leaders</p>
          <p className="font-heading text-gold-600 dark:text-gold-400 mt-1 text-3xl font-bold">{anbiyams.length}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {anbiyams.map((a) => (
          <div
            key={a.id}
            className="bg-card border-border rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading text-primary text-base font-bold">{a.name}</h3>
                <p className="text-muted-foreground text-xs">{a.nameTa}</p>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">
                Active
              </span>
            </div>
            <div className="text-muted-foreground mt-3 space-y-1 text-xs">
              <p>
                👤 Incharge: <span className="text-foreground font-semibold">{a.incharge}</span>
              </p>
              <p>
                🏠 Families: <span className="text-foreground font-semibold">{a.families}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

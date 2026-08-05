import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Parish Reports | Admin Portal' };

export default function AdminReportsPage() {
  const reports = [
    {
      title: 'Monthly Family Dues Report',
      period: 'August 2026',
      generated: '2026-08-01',
      status: 'Ready',
    },
    {
      title: 'Annual Parishioner Census',
      period: 'Year 2025-26',
      generated: '2026-07-01',
      status: 'Ready',
    },
    {
      title: 'Sacrament Statistics Report',
      period: 'Q1-Q2 2026',
      generated: '2026-07-15',
      status: 'Ready',
    },
    {
      title: 'Anbiyam Activity Report',
      period: 'July 2026',
      generated: '2026-07-31',
      status: 'Ready',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-primary text-3xl font-bold">Parish Reports</h1>
        <p className="text-muted-foreground text-sm">
          Generate and download parish administrative reports.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reports.map((r) => (
          <div
            key={r.title}
            className="bg-card border-border rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-heading text-foreground text-base font-bold">{r.title}</h3>
                <p className="text-muted-foreground text-xs">Period: {r.period}</p>
                <p className="text-muted-foreground text-xs">Generated: {r.generated}</p>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">
                {r.status}
              </span>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="border-primary text-primary hover:bg-primary/10 flex-1 rounded-md border py-2 text-xs font-semibold transition-colors">
                📄 View Report
              </button>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1 rounded-md py-2 text-xs font-semibold transition-colors">
                ⬇️ Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

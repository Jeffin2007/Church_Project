import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Payment Receipts | Parish Portal' };

const receipts = [
  {
    id: 'REC-2026-0401',
    description: 'Monthly Dues — July 2026',
    amount: '₹500',
    date: '2026-07-10',
    paymentId: 'PAY-2026-0401',
  },
  {
    id: 'REC-2026-0320',
    description: 'Monthly Dues — June 2026',
    amount: '₹500',
    date: '2026-06-08',
    paymentId: 'PAY-2026-0320',
  },
  {
    id: 'REC-2026-0210',
    description: 'Festival Offering — Feast Day May 2026',
    amount: '₹1,000',
    date: '2026-05-15',
    paymentId: 'PAY-2026-0210',
  },
];

export default function FamilyReceiptsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-secondary text-3xl font-bold">Payment Receipts</h1>
        <p className="text-muted-foreground text-sm">
          Download official receipts for all your parish contributions.
        </p>
      </div>

      <div className="space-y-3">
        {receipts.map((r) => (
          <div
            key={r.id}
            className="bg-card border-border flex items-center justify-between rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <h3 className="text-foreground text-sm font-semibold">{r.description}</h3>
              <p className="text-muted-foreground mt-0.5 text-xs">
                Receipt: {r.id} · Date: {r.date}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary font-bold">{r.amount}</span>
              <button className="bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors">
                ⬇️ PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

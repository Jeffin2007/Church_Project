import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Payments | Admin Portal' };

const payments = [
  {
    id: 'PAY-2026-0421',
    family: 'QOAS-2024-0001',
    type: 'Monthly Dues',
    amount: '₹500',
    date: '2026-08-01',
    status: 'Completed',
  },
  {
    id: 'PAY-2026-0420',
    family: 'QOAS-2024-0002',
    type: 'Festival Offering',
    amount: '₹1,000',
    date: '2026-07-28',
    status: 'Completed',
  },
  {
    id: 'PAY-2026-0419',
    family: 'QOAS-2024-0003',
    type: 'Building Fund',
    amount: '₹2,000',
    date: '2026-07-25',
    status: 'Pending',
  },
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-primary text-3xl font-bold">Payments & Parish Dues</h1>
          <p className="text-muted-foreground text-sm">
            Track family contributions and sacrament fees.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold">
          + Record Payment
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Total This Month', value: '₹1,45,000', sub: 'From 342 families' },
          { label: 'Pending Dues', value: '₹23,500', sub: '47 families overdue' },
          { label: 'Annual Collections', value: '₹18,40,000', sub: 'Jan – Aug 2026' },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border p-5 shadow-sm">
            <p className="text-muted-foreground text-xs font-semibold uppercase">{s.label}</p>
            <p className="font-heading text-primary mt-1 text-2xl font-bold">{s.value}</p>
            <p className="text-muted-foreground mt-1 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">Payment ID</th>
              <th className="p-4">Family</th>
              <th className="p-4">Type</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-muted/20">
                <td className="text-primary p-4 font-semibold">{p.id}</td>
                <td className="p-4 font-medium">{p.family}</td>
                <td className="text-muted-foreground p-4">{p.type}</td>
                <td className="p-4 font-semibold">{p.amount}</td>
                <td className="text-muted-foreground p-4">{p.date}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      p.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

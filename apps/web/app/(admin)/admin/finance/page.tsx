import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Finance & Accounts | Admin Portal' };

export default function AdminFinancePage() {
  const ledger = [
    {
      date: '2026-08-01',
      description: 'Monthly Dues Collection',
      credit: '₹45,000',
      debit: '—',
      balance: '₹2,45,000',
    },
    {
      date: '2026-07-31',
      description: 'Parish Maintenance Expenses',
      credit: '—',
      debit: '₹12,000',
      balance: '₹2,00,000',
    },
    {
      date: '2026-07-28',
      description: 'Festival Offerings (Feast of Queen of All Saints)',
      credit: '₹38,500',
      debit: '—',
      balance: '₹2,12,000',
    },
    {
      date: '2026-07-25',
      description: 'Choir Equipment Purchase',
      credit: '—',
      debit: '₹8,500',
      balance: '₹1,73,500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-primary text-3xl font-bold">Finance & Parish Accounts</h1>
        <p className="text-muted-foreground text-sm">
          Parish income, expenses, and general ledger.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Parish Fund Balance', value: '₹2,45,000', sub: 'As of Aug 2026' },
          { label: 'Total Income (YTD)', value: '₹18,40,000', sub: 'Jan – Aug 2026' },
          { label: 'Total Expenses (YTD)', value: '₹12,75,000', sub: 'Jan – Aug 2026' },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border p-5 shadow-sm">
            <p className="text-muted-foreground text-xs font-semibold uppercase">{s.label}</p>
            <p className="font-heading text-primary mt-1 text-2xl font-bold">{s.value}</p>
            <p className="text-muted-foreground mt-1 text-xs">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <div className="border-b p-4">
          <h3 className="font-heading text-lg font-bold">General Ledger</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-green-700">Credit</th>
              <th className="p-4 text-red-700">Debit</th>
              <th className="p-4">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {ledger.map((l, i) => (
              <tr key={i} className="hover:bg-muted/20">
                <td className="text-muted-foreground p-4">{l.date}</td>
                <td className="p-4 font-medium">{l.description}</td>
                <td className="p-4 font-semibold text-green-700">{l.credit}</td>
                <td className="p-4 font-semibold text-red-700">{l.debit}</td>
                <td className="text-primary p-4 font-bold">{l.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

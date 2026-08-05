import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Anbiyam Dashboard | Parish Portal' };

export default function AnbiyamDashboardPage() {
  const families = [
    { number: 'QOAS-2024-0001', head: 'Joseph Anthony', members: 4, duesPaid: true },
    { number: 'QOAS-2024-0003', head: 'George Francis', members: 3, duesPaid: false },
    { number: 'QOAS-2024-0007', head: 'Maria Thomas', members: 5, duesPaid: true },
    { number: 'QOAS-2024-0012', head: 'Peter Xavier', members: 4, duesPaid: true },
    { number: 'QOAS-2024-0019', head: 'Anthony Mary', members: 6, duesPaid: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-gold-700 dark:text-gold-400 text-3xl font-bold">
          St. Thomas Anbiyam Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Leader: Robin Antony · North Zone · 48 Registered Families
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Total Families</p>
          <p className="font-heading text-gold-700 dark:text-gold-400 mt-1 text-3xl font-bold">
            48
          </p>
        </div>
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Dues Paid (Aug)</p>
          <p className="font-heading mt-1 text-3xl font-bold text-green-600">41 / 48</p>
        </div>
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Next Meeting</p>
          <p className="font-heading text-primary mt-1 text-xl font-bold">Aug 10, 4 PM</p>
        </div>
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <div className="border-b p-4">
          <h3 className="font-heading text-lg font-bold">Anbiyam Families Overview</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">Family No.</th>
              <th className="p-4">Family Head</th>
              <th className="p-4">Members</th>
              <th className="p-4">Aug Dues</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {families.map((f) => (
              <tr key={f.number} className="hover:bg-muted/20">
                <td className="text-primary p-4 font-semibold">{f.number}</td>
                <td className="p-4 font-medium">{f.head}</td>
                <td className="p-4">{f.members}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      f.duesPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {f.duesPaid ? 'Paid' : 'Pending'}
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

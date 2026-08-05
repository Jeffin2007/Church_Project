import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Parish Families | Admin Portal' };

export default function AdminFamiliesPage() {
  const families = [
    {
      number: 'QOAS-2024-0001',
      head: 'Joseph Anthony',
      anbiyam: 'St. Thomas Anbiyam',
      members: 4,
      phone: '+91 9876543210',
      status: 'Active',
    },
    {
      number: 'QOAS-2024-0002',
      head: 'Francis Xavier',
      anbiyam: 'St. Joseph Anbiyam',
      members: 5,
      phone: '+91 9876543211',
      status: 'Active',
    },
    {
      number: 'QOAS-2024-0003',
      head: 'Maria Dominic',
      anbiyam: 'St. Jude Anbiyam',
      members: 3,
      phone: '+91 9876543212',
      status: 'Active',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-primary text-3xl font-bold">
            Parish Families Directory
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage registered parish families and family numbers.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold">
          + Register Family
        </button>
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">Family No.</th>
              <th className="p-4">Family Head</th>
              <th className="p-4">Anbiyam</th>
              <th className="p-4">Members</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {families.map((f) => (
              <tr key={f.number} className="hover:bg-muted/20">
                <td className="text-primary p-4 font-semibold">{f.number}</td>
                <td className="p-4 font-medium">{f.head}</td>
                <td className="text-muted-foreground p-4">{f.anbiyam}</td>
                <td className="p-4">{f.members}</td>
                <td className="text-muted-foreground p-4">{f.phone}</td>
                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                    {f.status}
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

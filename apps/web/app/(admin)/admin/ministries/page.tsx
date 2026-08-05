import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Parish Ministries | Admin Portal' };

const ministries = [
  { name: 'Youth Movement', coordinator: 'Jeffin Joseph', members: 42, status: 'Active' },
  { name: 'Legion of Mary', coordinator: 'Maria Theresa', members: 28, status: 'Active' },
  { name: 'Altar Servers Association', coordinator: 'Thomas Peter', members: 18, status: 'Active' },
  { name: 'Parish Choir', coordinator: 'Angela Maria', members: 25, status: 'Active' },
  { name: 'Vincent de Paul Society', coordinator: 'Francis George', members: 32, status: 'Active' },
  {
    name: 'Catechism Teachers Association',
    coordinator: 'Mary Anthony',
    members: 15,
    status: 'Active',
  },
];

export default function AdminMinistriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-primary text-3xl font-bold">Parish Ministries</h1>
          <p className="text-muted-foreground text-sm">
            Manage parish ministry groups, coordinators, and members.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold">
          + Add Ministry
        </button>
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">Ministry Name</th>
              <th className="p-4">Coordinator</th>
              <th className="p-4">Members</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {ministries.map((m) => (
              <tr key={m.name} className="hover:bg-muted/20">
                <td className="text-foreground p-4 font-semibold">{m.name}</td>
                <td className="text-muted-foreground p-4">{m.coordinator}</td>
                <td className="p-4 font-medium">{m.members}</td>
                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">
                    {m.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-primary text-xs font-semibold hover:underline">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

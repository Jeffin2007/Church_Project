import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Request Types | Admin Portal' };

const types = [
  {
    name: 'Baptism',
    description: 'Certificate of Holy Baptism',
    requiresApproval: true,
    active: true,
  },
  {
    name: 'Confirmation',
    description: 'Certificate of Confirmation sacrament',
    requiresApproval: true,
    active: true,
  },
  {
    name: 'First Holy Communion',
    description: 'Record and scheduling of First Communion',
    requiresApproval: true,
    active: true,
  },
  {
    name: 'Marriage',
    description: 'Marriage preparation and registration',
    requiresApproval: true,
    active: true,
  },
  {
    name: 'Death Certificate',
    description: 'Certificate of Catholic burial rites',
    requiresApproval: false,
    active: true,
  },
  {
    name: 'Baptism Certificate (Copy)',
    description: 'Duplicate copy of baptism records',
    requiresApproval: false,
    active: true,
  },
  {
    name: 'Other',
    description: 'Miscellaneous parish administration requests',
    requiresApproval: false,
    active: true,
  },
];

export default function AdminRequestTypesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-primary text-3xl font-bold">
            Request Types Configuration
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage the types of sacramental and parish requests available.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold">
          + Add Request Type
        </button>
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">Type Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Requires Priest Approval</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {types.map((t) => (
              <tr key={t.name} className="hover:bg-muted/20">
                <td className="text-foreground p-4 font-semibold">{t.name}</td>
                <td className="text-muted-foreground p-4">{t.description}</td>
                <td className="p-4">{t.requiresApproval ? '✅ Yes' : '—'}</td>
                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">
                    Active
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

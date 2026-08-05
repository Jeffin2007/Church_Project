import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Parish Members | Admin Portal' };

export default function AdminMembersPage() {
  const members = [
    {
      name: 'Joseph Anthony',
      family: 'QOAS-2024-0001',
      relation: 'Head',
      gender: 'Male',
      dob: '1982-04-12',
      baptized: true,
      confirmed: true,
    },
    {
      name: 'Mary Joseph',
      family: 'QOAS-2024-0001',
      relation: 'Wife',
      gender: 'Female',
      dob: '1985-09-20',
      baptized: true,
      confirmed: true,
    },
    {
      name: 'John Joseph',
      family: 'QOAS-2024-0001',
      relation: 'Son',
      gender: 'Male',
      dob: '2010-06-15',
      baptized: true,
      confirmed: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-primary text-3xl font-bold">Parishioners Directory</h1>
          <p className="text-muted-foreground text-sm">
            Individual parishioner records and sacramental statuses.
          </p>
        </div>
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Family No.</th>
              <th className="p-4">Relation</th>
              <th className="p-4">DOB</th>
              <th className="p-4">Baptized</th>
              <th className="p-4">Confirmed</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {members.map((m, idx) => (
              <tr key={idx} className="hover:bg-muted/20">
                <td className="text-foreground p-4 font-semibold">{m.name}</td>
                <td className="text-primary p-4 font-medium">{m.family}</td>
                <td className="text-muted-foreground p-4">{m.relation}</td>
                <td className="text-muted-foreground p-4">{m.dob}</td>
                <td className="p-4">{m.baptized ? '✅ Yes' : '❌ No'}</td>
                <td className="p-4">{m.confirmed ? '✅ Yes' : '❌ No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Volunteers | Admin Portal' };

const volunteers = [
  {
    name: 'Joseph Anthony',
    ministry: 'Vincent de Paul Society',
    role: 'Food Distribution',
    phone: '+91 9876543210',
    active: true,
  },
  {
    name: 'Maria Theresa',
    ministry: 'Legion of Mary',
    role: 'House Visits',
    phone: '+91 9876543211',
    active: true,
  },
  {
    name: 'Thomas Peter',
    ministry: 'Altar Servers Association',
    role: 'Senior Server',
    phone: '+91 9876543212',
    active: true,
  },
  {
    name: 'Angela Maria',
    ministry: 'Parish Choir',
    role: 'Lead Cantor',
    phone: '+91 9876543213',
    active: true,
  },
  {
    name: 'Francis George',
    ministry: 'Youth Movement',
    role: 'Youth Leader',
    phone: '+91 9876543214',
    active: false,
  },
];

export default function AdminVolunteersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-primary text-3xl font-bold">Parish Volunteers</h1>
          <p className="text-muted-foreground text-sm">
            Parishioners serving in ministry and parish volunteer roles.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold">
          + Add Volunteer
        </button>
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">Volunteer</th>
              <th className="p-4">Ministry</th>
              <th className="p-4">Role</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {volunteers.map((v) => (
              <tr key={v.name} className="hover:bg-muted/20">
                <td className="text-foreground p-4 font-semibold">{v.name}</td>
                <td className="text-muted-foreground p-4">{v.ministry}</td>
                <td className="p-4">{v.role}</td>
                <td className="text-muted-foreground p-4">{v.phone}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      v.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {v.active ? 'Active' : 'Inactive'}
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

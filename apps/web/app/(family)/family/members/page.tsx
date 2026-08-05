import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Family Members | Parish Portal' };

const members = [
  {
    name: 'Joseph Anthony',
    relation: 'Head of Family',
    dob: '1982-04-12',
    gender: 'Male',
    phone: '+91 9876543210',
    baptized: true,
    confirmed: true,
  },
  {
    name: 'Mary Joseph',
    relation: 'Wife',
    dob: '1985-09-20',
    gender: 'Female',
    phone: '+91 9876543211',
    baptized: true,
    confirmed: true,
  },
  {
    name: 'John Joseph',
    relation: 'Son',
    dob: '2010-06-15',
    gender: 'Male',
    phone: '—',
    baptized: true,
    confirmed: true,
  },
  {
    name: 'Anita Joseph',
    relation: 'Daughter',
    dob: '2014-02-28',
    gender: 'Female',
    phone: '—',
    baptized: true,
    confirmed: false,
  },
];

export default function FamilyMembersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-secondary text-3xl font-bold">Family Members</h1>
          <p className="text-muted-foreground text-sm">
            All members registered under Family No: QOAS-2024-0001
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {members.map((m) => (
          <div key={m.name} className="bg-card border-border rounded-xl border p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/10 text-secondary flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold">
                {m.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-foreground font-semibold">{m.name}</h3>
                <p className="text-muted-foreground text-xs">
                  {m.relation} · {m.gender}
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-muted/40 rounded p-2">
                <p className="text-muted-foreground">Date of Birth</p>
                <p className="font-semibold">{m.dob}</p>
              </div>
              <div className="bg-muted/40 rounded p-2">
                <p className="text-muted-foreground">Phone</p>
                <p className="font-semibold">{m.phone}</p>
              </div>
              <div className="bg-muted/40 rounded p-2">
                <p className="text-muted-foreground">Baptized</p>
                <p className="font-semibold">{m.baptized ? '✅ Yes' : '❌ No'}</p>
              </div>
              <div className="bg-muted/40 rounded p-2">
                <p className="text-muted-foreground">Confirmed</p>
                <p className="font-semibold">{m.confirmed ? '✅ Yes' : '❌ No'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

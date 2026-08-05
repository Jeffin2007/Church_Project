import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Anbiyams | Admin Portal' };

const anbiyams = [
  {
    name: 'St. Thomas Anbiyam',
    leader: 'Robin Antony',
    families: 48,
    zone: 'North Zone',
    meetingDay: 'Every Sunday (4 PM)',
  },
  {
    name: 'St. Joseph Anbiyam',
    leader: 'Joseph Francis',
    families: 52,
    zone: 'South Zone',
    meetingDay: 'Every Sunday (5 PM)',
  },
  {
    name: 'St. Jude Anbiyam',
    leader: 'Maria Theresa',
    families: 41,
    zone: 'East Zone',
    meetingDay: 'Every Saturday (6 PM)',
  },
  {
    name: 'St. Antony Anbiyam',
    leader: 'Peter Anthony',
    families: 55,
    zone: 'West Zone',
    meetingDay: 'Every Sunday (3 PM)',
  },
  {
    name: 'St. Xavier Anbiyam',
    leader: 'Xavier John',
    families: 44,
    zone: 'Central Zone',
    meetingDay: 'Every Saturday (5 PM)',
  },
  {
    name: 'St. Teresa Anbiyam',
    leader: 'Teresa Dominic',
    families: 38,
    zone: 'South-West Zone',
    meetingDay: 'Every Sunday (5 PM)',
  },
  {
    name: 'Our Lady of Good Health Anbiyam',
    leader: 'Mary Joseph',
    families: 64,
    zone: 'North-East Zone',
    meetingDay: 'Every Sunday (4 PM)',
  },
];

export default function AdminAnbiyamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-primary text-3xl font-bold">Anbiyam Units Management</h1>
        <p className="text-muted-foreground text-sm">
          Oversee the 7 Basic Christian Community (Anbiyam) units of the parish.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Total Anbiyams</p>
          <p className="font-heading text-primary mt-1 text-3xl font-bold">7</p>
        </div>
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Total Families</p>
          <p className="font-heading text-secondary mt-1 text-3xl font-bold">342</p>
        </div>
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Active Leaders</p>
          <p className="font-heading text-gold-600 dark:text-gold-400 mt-1 text-3xl font-bold">7</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {anbiyams.map((a) => (
          <div
            key={a.name}
            className="bg-card border-border rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-heading text-primary text-base font-bold">{a.name}</h3>
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">
                Active
              </span>
            </div>
            <div className="text-muted-foreground mt-3 space-y-1 text-xs">
              <p>
                👤 Leader: <span className="text-foreground font-semibold">{a.leader}</span>
              </p>
              <p>
                🏠 Families: <span className="text-foreground font-semibold">{a.families}</span>
              </p>
              <p>
                📍 Zone: <span className="text-foreground font-semibold">{a.zone}</span>
              </p>
              <p>
                📅 Meeting: <span className="text-foreground font-semibold">{a.meetingDay}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

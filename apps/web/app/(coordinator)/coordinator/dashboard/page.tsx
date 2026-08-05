import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Coordinator Dashboard | Parish Portal' };

const members = [
  { name: 'Jeffin Joseph', role: 'Coordinator', joinedDate: '2023-09-01', active: true },
  { name: 'Maria Antony', role: 'Program Lead', joinedDate: '2024-01-15', active: true },
  { name: 'Thomas George', role: 'Treasurer', joinedDate: '2024-03-01', active: true },
  { name: 'Angela Maria', role: 'Secretary', joinedDate: '2024-06-10', active: true },
];

const upcomingEvents = [
  { title: 'Youth Prayer Day', date: '2026-08-10', location: 'Parish Hall', time: '9:00 AM' },
  {
    title: 'Community Service Drive',
    date: '2026-08-17',
    location: 'Parish Grounds',
    time: '8:00 AM',
  },
];

export default function CoordinatorDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-secondary text-3xl font-bold">
          Youth Movement — Coordinator Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Coordinator: Jeffin Joseph · 42 Active Members
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Total Members</p>
          <p className="font-heading text-secondary mt-1 text-3xl font-bold">42</p>
        </div>
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Active Volunteers</p>
          <p className="font-heading mt-1 text-3xl font-bold text-green-600">38</p>
        </div>
        <div className="bg-card rounded-xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-semibold uppercase">Upcoming Events</p>
          <p className="font-heading text-primary mt-1 text-3xl font-bold">2</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Ministry Members */}
        <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading mb-4 text-lg font-bold">Core Ministry Team</h3>
          <div className="space-y-3">
            {members.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between border-b pb-3 last:border-0"
              >
                <div>
                  <p className="text-sm font-semibold">{m.name}</p>
                  <p className="text-muted-foreground text-xs">{m.role}</p>
                </div>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading mb-4 text-lg font-bold">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((e) => (
              <div key={e.title} className="border-b pb-4 last:border-0 last:pb-0">
                <h4 className="text-sm font-semibold">{e.title}</h4>
                <p className="text-muted-foreground mt-1 text-xs">
                  📅 {e.date} · {e.time}
                </p>
                <p className="text-muted-foreground text-xs">📍 {e.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

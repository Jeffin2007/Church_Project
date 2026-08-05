import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Parish Ministries | Family Portal' };

const ministries = [
  {
    name: 'Youth Movement',
    coordinator: 'Jeffin Joseph',
    members: 42,
    desc: 'Faith formation and service activities for parish youth.',
  },
  {
    name: 'Legion of Mary',
    coordinator: 'Maria Theresa',
    members: 28,
    desc: "Marian devotion and apostolic works under Our Lady's guidance.",
  },
  {
    name: 'Parish Choir',
    coordinator: 'Angela Maria',
    members: 25,
    desc: 'Liturgical music and worship for all Sunday and feast Masses.',
  },
  {
    name: 'Vincent de Paul Society',
    coordinator: 'Francis George',
    members: 32,
    desc: 'Charitable service to the poor, sick, and needy parishioners.',
  },
];

export default function FamilyMinistriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-secondary text-3xl font-bold">Parish Ministries</h1>
        <p className="text-muted-foreground text-sm">Explore and join parish ministry groups.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ministries.map((m) => (
          <div
            key={m.name}
            className="bg-card border-border rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="font-heading text-foreground text-base font-bold">{m.name}</h3>
            <p className="text-muted-foreground mt-2 text-xs">{m.desc}</p>
            <div className="text-muted-foreground mt-3 text-xs">
              <span>
                Coordinator: <strong className="text-foreground">{m.coordinator}</strong>
              </span>
              <span className="ml-3">
                Members: <strong className="text-foreground">{m.members}</strong>
              </span>
            </div>
            <button className="border-secondary text-secondary hover:bg-secondary/10 mt-4 w-full rounded-md border py-2 text-xs font-semibold transition-colors">
              Request to Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

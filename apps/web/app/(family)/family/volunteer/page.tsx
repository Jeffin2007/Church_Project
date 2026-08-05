import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Volunteer Signup | Parish Portal' };

const opportunities = [
  {
    ministry: 'Vincent de Paul Society',
    role: 'Food Distribution Volunteer',
    time: 'Every 1st Sunday 9 AM',
    contact: 'Francis George',
  },
  {
    ministry: 'Youth Movement',
    role: 'Youth Program Helper',
    time: 'Every Saturday 4 PM',
    contact: 'Jeffin Joseph',
  },
  {
    ministry: 'Parish Choir',
    role: 'Choir Member',
    time: 'Sunday & Feast day Masses',
    contact: 'Angela Maria',
  },
  {
    ministry: 'Catechism',
    role: 'Sunday School Assistant',
    time: 'Every Sunday 8 AM',
    contact: 'Mary Anthony',
  },
];

export default function FamilyVolunteerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-secondary text-3xl font-bold">Volunteer Opportunities</h1>
        <p className="text-muted-foreground text-sm">
          Serve your parish community through active volunteer ministry.
        </p>
      </div>

      <div className="bg-secondary/5 border-secondary/20 rounded-xl border p-5">
        <p className="text-secondary text-sm font-semibold">
          "The greatest among you shall be your servant." — Matthew 23:11
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          Register your interest and our coordinators will get in touch with you.
        </p>
      </div>

      <div className="space-y-4">
        {opportunities.map((o) => (
          <div
            key={o.role}
            className="bg-card border-border flex items-center justify-between rounded-xl border p-5 shadow-sm"
          >
            <div className="space-y-1">
              <h3 className="text-foreground font-semibold">{o.role}</h3>
              <p className="text-muted-foreground text-xs">Ministry: {o.ministry}</p>
              <p className="text-muted-foreground text-xs">Schedule: {o.time}</p>
              <p className="text-muted-foreground text-xs">Contact: {o.contact}</p>
            </div>
            <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 ml-4 shrink-0 rounded-md px-4 py-2 text-xs font-semibold transition-colors">
              Sign Up
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

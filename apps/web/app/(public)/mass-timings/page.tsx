import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Holy Mass Timings | Queen of All Saints Parish',
  description: 'Mass schedule, Novena, and Sacrament timings',
};

export default function MassTimingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <h1 className="font-heading text-primary text-4xl font-bold">
          Holy Mass & Sacrament Schedule
        </h1>
        <p className="text-muted-foreground text-lg">
          Join us in Eucharistic celebration and sacred devotions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading text-primary text-xl font-bold">Sunday Masses</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between border-b pb-2">
              <span>First Mass (Tamil):</span> <span className="font-semibold">6:30 AM</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Second Mass (English):</span> <span className="font-semibold">8:30 AM</span>
            </li>
            <li className="flex justify-between">
              <span>Evening Mass (Tamil):</span> <span className="font-semibold">5:30 PM</span>
            </li>
          </ul>
        </div>

        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <h3 className="font-heading text-secondary text-xl font-bold">Weekday Services</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between border-b pb-2">
              <span>Monday – Saturday Mass:</span> <span className="font-semibold">6:30 AM</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Wednesday Novena:</span> <span className="font-semibold">6:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>First Friday Adoration:</span> <span className="font-semibold">6:00 PM</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

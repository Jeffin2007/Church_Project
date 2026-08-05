import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Appointments | Parish Portal' };

export default function FamilyAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-secondary text-3xl font-bold">Priest Appointments</h1>
          <p className="text-muted-foreground text-sm">
            Book and manage appointments with the parish priest.
          </p>
        </div>
        <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg px-4 py-2 text-sm font-semibold">
          + Book Appointment
        </button>
      </div>

      <div className="bg-card border-border text-muted-foreground rounded-xl border p-12 text-center">
        <p className="mb-4 text-4xl">📅</p>
        <p className="text-foreground font-semibold">No upcoming appointments</p>
        <p className="mt-1 text-sm">
          Click &quot;Book Appointment&quot; to schedule a meeting with Father.
        </p>
        <p className="text-muted-foreground mt-3 text-xs">
          Office hours: Mon – Sat (9 AM – 1 PM, 4 PM – 7 PM)
        </p>
      </div>
    </div>
  );
}

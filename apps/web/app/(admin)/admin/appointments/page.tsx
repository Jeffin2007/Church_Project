import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Appointments | Admin Portal' };

const appointments = [
  {
    id: 'APT-001',
    family: 'QOAS-2024-0001',
    name: 'Joseph Anthony',
    purpose: 'Marriage Counselling',
    date: '2026-08-06',
    time: '10:00 AM',
    priest: 'Fr. Parish Priest',
    status: 'Confirmed',
  },
  {
    id: 'APT-002',
    family: 'QOAS-2024-0014',
    name: 'Francis Xavier',
    purpose: 'Baptism Preparation',
    date: '2026-08-07',
    time: '11:30 AM',
    priest: 'Fr. Parish Priest',
    status: 'Scheduled',
  },
  {
    id: 'APT-003',
    family: 'QOAS-2024-0028',
    name: 'Maria Dominic',
    purpose: 'General Confession',
    date: '2026-08-08',
    time: '9:00 AM',
    priest: 'Fr. Parish Priest',
    status: 'Pending',
  },
];

const statusColors: Record<string, string> = {
  Confirmed: 'bg-green-100 text-green-800',
  Scheduled: 'bg-blue-100 text-blue-800',
  Pending: 'bg-yellow-100 text-yellow-800',
};

export default function AdminAppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-primary text-3xl font-bold">Priest Appointments</h1>
          <p className="text-muted-foreground text-sm">
            Schedule and manage parishioner appointments with the priest.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold">
          + New Appointment
        </button>
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Parishioner</th>
              <th className="p-4">Purpose</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Priest</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {appointments.map((a) => (
              <tr key={a.id} className="hover:bg-muted/20">
                <td className="text-primary p-4 font-semibold">{a.id}</td>
                <td className="p-4">
                  <div className="font-medium">{a.name}</div>
                  <div className="text-muted-foreground text-xs">{a.family}</div>
                </td>
                <td className="text-muted-foreground p-4">{a.purpose}</td>
                <td className="p-4">
                  <div className="font-medium">{a.date}</div>
                  <div className="text-muted-foreground text-xs">{a.time}</div>
                </td>
                <td className="text-muted-foreground p-4">{a.priest}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusColors[a.status] ?? ''}`}
                  >
                    {a.status}
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

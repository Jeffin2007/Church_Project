import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sacrament Requests | Admin Portal' };

const requests = [
  {
    id: 'REQ-2026-089',
    family: 'QOAS-2024-0001',
    type: 'Baptism Certificate',
    submittedBy: 'Joseph Anthony',
    date: '2026-08-04',
    status: 'Pending Review',
  },
  {
    id: 'REQ-2026-088',
    family: 'QOAS-2024-0014',
    type: 'Marriage Certificate',
    submittedBy: 'Francis Xavier',
    date: '2026-08-03',
    status: 'Approved',
  },
  {
    id: 'REQ-2026-087',
    family: 'QOAS-2024-0028',
    type: 'First Communion Request',
    submittedBy: 'Maria Dominic',
    date: '2026-08-02',
    status: 'Scheduled',
  },
  {
    id: 'REQ-2026-086',
    family: 'QOAS-2024-0005',
    type: 'Death Certificate',
    submittedBy: 'Peter John',
    date: '2026-07-30',
    status: 'Completed',
  },
];

const statusColors: Record<string, string> = {
  'Pending Review': 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-blue-100 text-blue-800',
  Scheduled: 'bg-purple-100 text-purple-800',
  Completed: 'bg-green-100 text-green-800',
};

export default function AdminRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-primary text-3xl font-bold">
            Sacrament & Certificate Requests
          </h1>
          <p className="text-muted-foreground text-sm">
            Review and process family sacramental requests.
          </p>
        </div>
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">Request ID</th>
              <th className="p-4">Family</th>
              <th className="p-4">Type</th>
              <th className="p-4">Submitted By</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-muted/20">
                <td className="text-primary p-4 font-semibold">{r.id}</td>
                <td className="p-4 font-medium">{r.family}</td>
                <td className="text-muted-foreground p-4">{r.type}</td>
                <td className="p-4">{r.submittedBy}</td>
                <td className="text-muted-foreground p-4">{r.date}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusColors[r.status] ?? 'bg-gray-100 text-gray-800'}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-primary text-xs font-semibold hover:underline">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

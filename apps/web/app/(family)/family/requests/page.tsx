import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sacrament Requests | Parish Portal' };

const myRequests = [
  {
    id: 'REQ-2026-089',
    type: 'Baptism Certificate',
    submittedOn: '2026-08-04',
    status: 'Pending Review',
    note: 'For John Joseph — duplicate copy needed.',
  },
];

const statusColors: Record<string, string> = {
  'Pending Review': 'bg-yellow-100 text-yellow-800',
  Approved: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

export default function FamilyRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-secondary text-3xl font-bold">Sacrament Requests</h1>
          <p className="text-muted-foreground text-sm">
            Submit and track requests for sacramental certificates and services.
          </p>
        </div>
        <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg px-4 py-2 text-sm font-semibold">
          + New Request
        </button>
      </div>

      {myRequests.length === 0 ? (
        <div className="bg-card border-border text-muted-foreground rounded-xl border p-12 text-center">
          <p className="mb-4 text-4xl">📜</p>
          <p className="font-semibold">No requests submitted yet.</p>
          <p className="mt-1 text-sm">
            Click &quot;New Request&quot; to submit a sacrament or certificate request.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myRequests.map((r) => (
            <div key={r.id} className="bg-card border-border rounded-xl border p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-foreground font-semibold">{r.type}</h3>
                  <p className="text-muted-foreground mt-1 text-xs">{r.note}</p>
                  <p className="text-muted-foreground mt-1 text-xs">Submitted: {r.submittedOn}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusColors[r.status] ?? ''}`}
                >
                  {r.status}
                </span>
              </div>
              <p className="text-muted-foreground mt-3 text-xs font-semibold">Ref: {r.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Certificates | Parish Portal' };

const certs = [
  {
    id: 'CERT-2026-0042',
    name: 'John Joseph',
    type: 'Baptism Certificate',
    issuedDate: '2026-08-04',
  },
  {
    id: 'CERT-2024-0018',
    name: 'Joseph Anthony',
    type: 'Marriage Certificate',
    issuedDate: '2024-03-15',
  },
];

export default function FamilyCertificatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-secondary text-3xl font-bold">My Certificates</h1>
        <p className="text-muted-foreground text-sm">Download issued sacramental certificates.</p>
      </div>

      {certs.length === 0 ? (
        <div className="bg-card border-border text-muted-foreground rounded-xl border p-12 text-center">
          <p className="mb-4 text-4xl">🎓</p>
          <p className="font-semibold">No certificates issued yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {certs.map((c) => (
            <div
              key={c.id}
              className="bg-card border-border rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-foreground font-semibold">{c.type}</h3>
                  <p className="text-muted-foreground mt-1 text-xs">Issued to: {c.name}</p>
                  <p className="text-muted-foreground text-xs">Date: {c.issuedDate}</p>
                  <p className="text-primary mt-2 text-xs font-semibold">{c.id}</p>
                </div>
                <span className="text-3xl">🎓</span>
              </div>
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-4 w-full rounded-md py-2 text-xs font-semibold transition-colors">
                ⬇️ Download PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

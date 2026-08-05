import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Certificates | Admin Portal' };

const certificates = [
  {
    id: 'CERT-2026-0042',
    family: 'QOAS-2024-0001',
    name: 'John Joseph',
    type: 'Baptism Certificate',
    issuedDate: '2026-08-04',
    status: 'Issued',
  },
  {
    id: 'CERT-2026-0041',
    family: 'QOAS-2024-0014',
    name: 'Maria Francis',
    type: 'Confirmation Certificate',
    issuedDate: '2026-07-28',
    status: 'Issued',
  },
  {
    id: 'CERT-2026-0040',
    family: 'QOAS-2024-0028',
    name: 'Thomas Maria',
    type: 'Marriage Certificate',
    issuedDate: '2026-07-20',
    status: 'Pending',
  },
];

export default function AdminCertificatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-primary text-3xl font-bold">Parish Certificates</h1>
          <p className="text-muted-foreground text-sm">
            Issue and manage sacramental and parish certificates.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold">
          + Issue Certificate
        </button>
      </div>

      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/40 text-muted-foreground border-b text-xs uppercase">
            <tr>
              <th className="p-4">Certificate ID</th>
              <th className="p-4">Recipient</th>
              <th className="p-4">Family</th>
              <th className="p-4">Type</th>
              <th className="p-4">Date Issued</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {certificates.map((c) => (
              <tr key={c.id} className="hover:bg-muted/20">
                <td className="text-primary p-4 font-semibold">{c.id}</td>
                <td className="p-4 font-medium">{c.name}</td>
                <td className="text-muted-foreground p-4">{c.family}</td>
                <td className="text-muted-foreground p-4">{c.type}</td>
                <td className="text-muted-foreground p-4">{c.issuedDate}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      c.status === 'Issued'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-primary text-xs font-semibold hover:underline">
                    Download
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

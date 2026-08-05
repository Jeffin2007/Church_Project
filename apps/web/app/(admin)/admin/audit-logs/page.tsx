'use client';

import { ShieldAlert } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const logs = [
    {
      id: 'al-101',
      user: 'priest@queenofallsaints.in',
      action: 'CERTIFICATE_GENERATED',
      entity: 'Certificate',
      ip: '106.51.24.12',
      time: '2026-08-05 08:30:14 PM',
    },
    {
      id: 'al-100',
      user: 'admin@queenofallsaints.in',
      action: 'ANNOUNCEMENT_CREATED',
      entity: 'Announcement',
      ip: '106.51.24.12',
      time: '2026-08-05 07:15:00 PM',
    },
    {
      id: 'al-099',
      user: 'office@queenofallsaints.in',
      action: 'PAYMENT_RECORDED',
      entity: 'Payment',
      ip: '182.73.11.88',
      time: '2026-08-05 04:45:22 PM',
    },
    {
      id: 'al-098',
      user: 'robin@queenofallsaints.in',
      action: 'FAMILY_TRANSFER_REQUESTED',
      entity: 'FamilyTransferRequest',
      ip: '157.33.91.04',
      time: '2026-08-04 11:20:10 AM',
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" /> Security & Compliance Trail
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Parish Audit Logs
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Immutable security log of all administrative actions, certificate issues, and financial
            entries.
          </p>
        </div>
      </div>

      <div className="border-border/80 bg-card overflow-hidden rounded-2xl border shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-muted/50 text-muted-foreground border-b text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="p-4">Log ID</th>
                <th className="p-4">User Email</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y font-mono text-[11px]">
              {logs.map((l) => (
                <tr key={l.id} className="hover:bg-muted/20 transition-colors">
                  <td className="text-primary p-4 font-bold">{l.id}</td>
                  <td className="text-foreground p-4">{l.user}</td>
                  <td className="p-4">
                    <span className="bg-gold-500/20 text-gold-300 border-gold-400/40 rounded-md border px-2 py-0.5 text-[10px] font-black">
                      {l.action}
                    </span>
                  </td>
                  <td className="text-muted-foreground p-4">{l.entity}</td>
                  <td className="text-muted-foreground p-4">{l.ip}</td>
                  <td className="text-muted-foreground p-4">{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

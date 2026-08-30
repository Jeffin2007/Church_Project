'use client';

import { useState } from 'react';
import { useFamily } from '@/context/family-context';
import { FileText, Check, Clock, Search, Filter } from 'lucide-react';

const statusColors: Record<string, string> = {
  'PENDING_REVIEW': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  'Pending Review': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  'PROCESSING': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  'Approved': 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  'Scheduled': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  'READY_FOR_PICKUP': 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  'COMPLETED': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  'Completed': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
};

export default function AdminRequestsPage() {
  const { requests, family } = useFamily();
  const [searchTerm, setSearchTerm] = useState('');

  const sampleStaticRequests = [
    {
      id: 'REQ-2026-089',
      family: 'QOAS-CARD-101',
      type: 'Baptism Certificate',
      submittedBy: 'C. Thomas',
      date: '2026-08-20',
      status: 'PENDING_REVIEW',
    },
    {
      id: 'REQ-2026-088',
      family: 'QOAS-CARD-702',
      type: 'Marriage Certificate',
      submittedBy: 'Henry Felix Pinto',
      date: '2026-08-18',
      status: 'Approved',
    },
    {
      id: 'REQ-2026-087',
      family: 'QOAS-CARD-501',
      type: 'First Holy Communion Certificate',
      submittedBy: 'S. Arockia Nathan',
      date: '2026-08-15',
      status: 'Scheduled',
    },
    {
      id: 'REQ-2026-086',
      family: 'QOAS-CARD-601',
      type: 'Confirmation Certificate',
      submittedBy: 'Jamesraj',
      date: '2026-08-10',
      status: 'COMPLETED',
    },
  ];

  // Merge live requests submitted by family with static registry requests
  const liveItems = requests.map((r) => ({
    id: r.id,
    family: family.familyNumber || 'QOAS-CARD-101',
    type: r.certificateType,
    submittedBy: r.memberName || family.headName,
    date: r.submittedOn,
    status: r.status,
  }));

  const allRequests = [...liveItems, ...sampleStaticRequests];

  const filtered = allRequests.filter(
    (r) =>
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.family.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <FileText className="h-4 w-4" /> Parish Registry Console
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Sacrament & Certificate Requests
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Review and process parishioner certificate requests, verify baptism & marriage registries, and issue official copies.
          </p>
        </div>
      </div>

      <div className="border-border/80 bg-card overflow-hidden rounded-3xl border-2 shadow-xl">
        <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b p-6">
          <div className="relative w-full max-w-md">
            <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by Request ID, Family Card, or Parishioner Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-muted/40 border-border/80 focus:ring-primary w-full rounded-xl border py-2.5 pl-10 pr-4 text-xs outline-none focus:ring-2"
            />
          </div>
          <span className="bg-primary/10 text-primary rounded-xl px-3 py-1.5 text-xs font-bold">
            Total Requests: {filtered.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-muted/50 text-muted-foreground border-b text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="p-4">Request ID</th>
                <th className="p-4">Family Card No.</th>
                <th className="p-4">Certificate Type</th>
                <th className="p-4">Submitted By</th>
                <th className="p-4">Submission Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                  <td className="text-primary font-mono p-4 font-bold">{r.id}</td>
                  <td className="p-4">
                    <span className="bg-primary/10 text-primary rounded px-2 py-0.5 font-bold font-mono">
                      {r.family}
                    </span>
                  </td>
                  <td className="text-foreground font-bold p-4">{r.type}</td>
                  <td className="p-4 text-muted-foreground font-semibold">{r.submittedBy}</td>
                  <td className="text-muted-foreground p-4">{r.date}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase ${
                        statusColors[r.status] ?? 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {r.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-3 py-1.5 text-xs font-bold transition-all">
                      Process Certificate →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

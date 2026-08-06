'use client';

import { useState } from 'react';
import { Check, X, Clock, Search } from 'lucide-react';

interface CertRequestAdmin {
  id: string;
  family: string;
  name: string;
  type: string;
  purpose: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const initialCertificates: CertRequestAdmin[] = [
  {
    id: 'CERT-2026-0043',
    family: 'QOAS-2024-0001',
    name: 'Joseph Anthony',
    type: 'Marriage Certificate',
    purpose: 'Visa & Passport Renewal',
    requestDate: '2026-08-05',
    status: 'Pending',
  },
  {
    id: 'CERT-2026-0042',
    family: 'QOAS-2024-0001',
    name: 'John Joseph',
    type: 'Baptism Certificate',
    purpose: 'School Admission & First Communion Records',
    requestDate: '2026-08-04',
    status: 'Approved',
  },
  {
    id: 'CERT-2026-0041',
    family: 'QOAS-2024-0014',
    name: 'Maria Francis',
    type: 'Confirmation Certificate',
    purpose: 'Pastoral Marriage Preparation',
    requestDate: '2026-07-28',
    status: 'Approved',
  },
  {
    id: 'CERT-2026-0040',
    family: 'QOAS-2024-0028',
    name: 'Thomas Maria',
    type: 'Marriage Certificate',
    purpose: 'Legal Registry',
    requestDate: '2026-07-20',
    status: 'Pending',
  },
];

export default function AdminCertificatesPage() {
  const [certs, setCerts] = useState<CertRequestAdmin[]>(initialCertificates);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'Pending' | 'Approved' | 'Rejected'>('ALL');

  const handleApprove = (id: string) => {
    setCerts((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'Approved' } : c)));
  };

  const handleReject = (id: string) => {
    setCerts((prev) => prev.map((c) => (c.id === id ? { ...c, status: 'Rejected' } : c)));
  };

  const filtered = certs.filter((c) => {
    const matchesFilter = filter === 'ALL' || c.status === filter;
    const matchesSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.family.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-primary text-2xl font-bold sm:text-3xl">
            Certificate Approvals & Verification
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Review family certificate requests, verify baptism/marriage registry records, and
            approve for physical office collection.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-card border-border flex flex-col gap-4 rounded-xl border p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute left-3 top-2.5 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by ID, name, family #, or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-background border-border focus:ring-primary h-9 w-full rounded-lg border pl-9 pr-4 text-xs outline-none focus:ring-2"
          />
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold">
          {(['ALL', 'Pending', 'Approved', 'Rejected'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                filter === tab
                  ? 'bg-primary text-primary-foreground font-bold'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/40 text-muted-foreground border-b text-[11px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Request ID</th>
                <th className="p-4">Recipient</th>
                <th className="p-4">Family No.</th>
                <th className="p-4">Certificate Type</th>
                <th className="p-4">Purpose</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-muted-foreground p-8 text-center">
                    No certificate requests found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                    <td className="text-primary p-4 font-bold">{c.id}</td>
                    <td className="text-foreground p-4 font-semibold">{c.name}</td>
                    <td className="text-muted-foreground p-4 font-mono">{c.family}</td>
                    <td className="p-4 font-medium">{c.type}</td>
                    <td className="text-muted-foreground max-w-xs truncate p-4">{c.purpose}</td>
                    <td className="text-muted-foreground whitespace-nowrap p-4">{c.requestDate}</td>
                    <td className="p-4">
                      {c.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                          <Clock className="h-3 w-3" />
                          <span>Pending</span>
                        </span>
                      )}
                      {c.status === 'Approved' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                          <Check className="h-3 w-3" />
                          <span>Approved</span>
                        </span>
                      )}
                      {c.status === 'Rejected' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
                          <X className="h-3 w-3" />
                          <span>Rejected</span>
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {c.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleApprove(c.id)}
                            className="flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow transition-colors hover:bg-emerald-700"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(c.id)}
                            className="flex items-center gap-1 rounded-md bg-rose-600 px-2.5 py-1 text-xs font-bold text-white shadow transition-colors hover:bg-rose-700"
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs font-medium">Reviewed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

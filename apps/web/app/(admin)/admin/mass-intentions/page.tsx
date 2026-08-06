'use client';

import { useState } from 'react';
import { Church, Check, X, Search } from 'lucide-react';
import { useFamily } from '@/context/family-context';

export default function AdminMassIntentionsPage() {
  const { massIntentions, updateMassIntentionStatus } = useFamily();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filtered = massIntentions.filter((item) => {
    const matchesSearch =
      item.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.familyNumber.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'ALL') return matchesSearch;
    return matchesSearch && item.status === filterType;
  });

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Church className="h-4 w-4" /> Parish Registry Console · Mass Intentions
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Mass Intentions Console
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Review submitted Mass Intentions, verify Razorpay offerings, assign Mass dates, and
            confirm scheduling.
          </p>
        </div>
      </div>

      <div className="border-border/80 bg-card overflow-hidden rounded-3xl border-2 shadow-xl">
        <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b p-6">
          <div className="relative w-full max-w-md">
            <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by Person Name, Family Code, or Title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-muted/40 border-border/80 focus:ring-primary w-full rounded-xl border py-2.5 pl-10 pr-4 text-xs outline-none focus:ring-2"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-muted-foreground">Filter:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-background focus:ring-primary rounded-xl border p-2 font-bold outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING_CONFIRMATION">Pending Confirmation</option>
              <option value="MASS_SCHEDULED">Mass Scheduled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-muted/50 text-muted-foreground border-b text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="p-4">Ref Code</th>
                <th className="p-4">Family & Contact</th>
                <th className="p-4">Intention Details</th>
                <th className="p-4">Requested Date</th>
                <th className="p-4">Offering (Razorpay)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="text-primary p-4 font-bold">{item.id}</td>
                  <td className="p-4">
                    <div className="text-foreground font-bold">{item.personName}</div>
                    <div className="text-muted-foreground text-[11px]">
                      {item.familyNumber} ({item.mobileNumber})
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 rounded px-2 py-0.5 text-[10px] font-bold">
                      {item.requestType}
                    </span>
                    <div className="text-foreground mt-1 font-bold">{item.title}</div>
                    <div className="text-muted-foreground text-[11px]">{item.description}</div>
                  </td>
                  <td className="p-4 font-bold">
                    {item.preferredDate} ({item.preferredTime})
                  </td>
                  <td className="p-4">
                    <span className="font-heading text-sm font-black">₹{item.offeringAmount}</span>
                    <span className="block text-[10px] font-bold text-emerald-400">
                      ✓ {item.paymentStatus} ({item.transactionId.slice(0, 12)}...)
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-400">
                      {item.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {item.status === 'PENDING_CONFIRMATION' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateMassIntentionStatus(
                              item.id,
                              'MASS_SCHEDULED',
                              `${item.preferredDate} ${item.preferredTime}`,
                              'Rev. Fr. Parish Priest',
                            )
                          }
                          className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white shadow hover:bg-emerald-500"
                        >
                          <Check className="h-3.5 w-3.5" /> Approve & Schedule
                        </button>
                        <button
                          type="button"
                          onClick={() => updateMassIntentionStatus(item.id, 'REJECTED')}
                          className="bg-destructive hover:bg-destructive/90 inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-bold text-white shadow"
                        >
                          <X className="h-3.5 w-3.5" /> Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => updateMassIntentionStatus(item.id, 'COMPLETED')}
                        className="border-border bg-muted hover:bg-muted/80 inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-[11px] font-bold"
                      >
                        Mark Offered & Completed
                      </button>
                    )}
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

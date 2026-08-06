'use client';

import { useState } from 'react';
import { Home, Check, X, Clock, Lock, Search } from 'lucide-react';
import { useFamily } from '@/context/family-context';

export default function AdminFamiliesPage() {
  const { family, approveAnbiyamChange, rejectAnbiyamChange, sacramentalSummary } = useFamily();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Header */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Home className="h-4 w-4" /> Parish Registry & Census Console
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Parish Families Directory
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Manage registered parish families, review Anbiyam transfer requests, and inspect Census
            data.
          </p>
        </div>
      </div>

      {/* Pending Anbiyam Transfer Request Review Box */}
      {family.anbiyamTransferStatus === 'PENDING_APPROVAL' && (
        <div className="space-y-4 rounded-3xl border-2 border-amber-500/40 bg-amber-500/10 p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-black uppercase text-slate-950">
                  <Clock className="inline h-3 w-3" /> Pending Anbiyam Transfer Request
                </span>
                <span className="text-primary text-xs font-bold">{family.familyNumber}</span>
              </div>
              <h3 className="font-heading text-foreground text-lg font-bold">
                {family.name} ({family.headName})
              </h3>
              <p className="text-muted-foreground text-xs">
                Current Anbiyam: <span className="font-bold">{family.anbiyam}</span> → Requested:{' '}
                <span className="text-gold-300 font-bold">{family.anbiyamRequestedChange}</span>
              </p>
              {family.anbiyamRequestReason && (
                <p className="text-foreground text-xs italic">"{family.anbiyamRequestReason}"</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={approveAnbiyamChange}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow transition-all hover:bg-emerald-500"
              >
                <Check className="h-4 w-4" /> Approve Transfer
              </button>
              <button
                type="button"
                onClick={rejectAnbiyamChange}
                className="bg-destructive hover:bg-destructive/90 inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow transition-all"
              >
                <X className="h-4 w-4" /> Reject Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Directory Table with Confidential Admin Caste Display */}
      <div className="border-border/80 bg-card overflow-hidden rounded-3xl border-2 shadow-xl">
        <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b p-6">
          <div className="relative w-full max-w-md">
            <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by Family Number, Head Name, or Anbiyam..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-muted/40 border-border/80 focus:ring-primary w-full rounded-xl border py-2.5 pl-10 pr-4 text-xs outline-none focus:ring-2"
            />
          </div>
          <span className="bg-primary/10 text-primary rounded-xl px-3 py-1.5 text-xs font-bold">
            Total Active Registered Families: 1
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-muted/50 text-muted-foreground border-b text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="p-4">Family No.</th>
                <th className="p-4">Family Name & Head</th>
                <th className="p-4">Anbiyam & Ward</th>
                <th className="p-4">Religion & Denomination</th>
                <th className="p-4">Community (Admin Only)</th>
                <th className="p-4">Sacraments</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              <tr className="hover:bg-muted/20 transition-colors">
                <td className="text-primary p-4 font-bold">{family.familyNumber}</td>
                <td className="p-4">
                  <div className="text-foreground font-bold">{family.name}</div>
                  <div className="text-muted-foreground text-[11px]">Head: {family.headName}</div>
                </td>
                <td className="p-4">
                  <div className="font-bold">{family.anbiyam}</div>
                  <div className="text-muted-foreground text-[11px]">{family.ward}</div>
                </td>
                <td className="p-4">
                  <span className="bg-primary/10 text-primary rounded px-2 py-0.5 font-bold">
                    {family.religion}
                  </span>
                  {family.otherChristianDenomination && (
                    <span className="text-muted-foreground mt-0.5 block text-[10px]">
                      {family.otherChristianDenomination}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {/* Confidential Caste display for Super Admin & Priest */}
                  <span className="bg-gold-500/20 text-gold-300 border-gold-400/40 inline-flex items-center gap-1 rounded border px-2 py-0.5 font-black uppercase">
                    <Lock className="h-3 w-3" /> {family.communityCaste || 'N/A'}
                  </span>
                </td>
                <td className="p-4 font-bold text-emerald-400">
                  ✓ {sacramentalSummary.baptizedCount}/{sacramentalSummary.totalMembers} Baptized
                </td>
                <td className="p-4">
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-400">
                    {family.status}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

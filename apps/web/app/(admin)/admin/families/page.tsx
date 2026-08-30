'use client';

import { useState, useMemo } from 'react';
import { Home, Check, X, Clock, Search, Key, Phone, MapPin, Users, Download, Filter } from 'lucide-react';
import { useFamily } from '@/context/family-context';
import { ALL_PARISH_FAMILIES, searchParishFamilies } from '@/lib/parish-families';
import { PARISH } from '@/lib/parish-data';

export default function AdminFamiliesPage() {
  const { family, approveAnbiyamChange, rejectAnbiyamChange } = useFamily();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnbiyam, setSelectedAnbiyam] = useState<string>('ALL');
  const [showCredentials, setShowCredentials] = useState(false);

  const filteredFamilies = useMemo(() => {
    let list = searchParishFamilies(searchTerm);
    if (selectedAnbiyam !== 'ALL') {
      list = list.filter((f) => f.anbiyam.toLowerCase().includes(selectedAnbiyam.toLowerCase()));
    }
    return list;
  }, [searchTerm, selectedAnbiyam]);

  const totalActive = ALL_PARISH_FAMILIES.filter(
    (f) => !f.familyName.toLowerCase().includes('unassigned') && f.familyName !== '',
  ).length;

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Header */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Home className="h-4 w-4" /> Parish Registry Console
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Parish Families Directory
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Live database of all 451 registered parish families across all 13 Anbiyams with separate account credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowCredentials(!showCredentials)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all border ${
              showCredentials
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-muted/60 text-muted-foreground border-border/80 hover:text-foreground'
            }`}
          >
            <Key className="h-4 w-4" /> {showCredentials ? 'Hide Credentials' : 'Show Login Credentials'}
          </button>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="border-border/80 bg-card rounded-2xl border p-4 shadow">
          <div className="text-muted-foreground text-[11px] font-bold uppercase">Total Families</div>
          <div className="text-foreground mt-1 text-2xl font-black">{totalActive}</div>
          <div className="text-emerald-400 mt-0.5 text-[10px] font-semibold">100% Families Connected</div>
        </div>
        <div className="border-border/80 bg-card rounded-2xl border p-4 shadow">
          <div className="text-muted-foreground text-[11px] font-bold uppercase">Anbiyams / Units</div>
          <div className="text-foreground mt-1 text-2xl font-black">13</div>
          <div className="text-primary mt-0.5 text-[10px] font-semibold">All Wards Connected</div>
        </div>
        <div className="border-border/80 bg-card rounded-2xl border p-4 shadow">
          <div className="text-muted-foreground text-[11px] font-bold uppercase">Indexed Phone Nos</div>
          <div className="text-foreground mt-1 text-2xl font-black">
            {ALL_PARISH_FAMILIES.filter((f) => f.contactNo).length}
          </div>
          <div className="text-muted-foreground mt-0.5 text-[10px]">Active for SMS & Login</div>
        </div>
        <div className="border-border/80 bg-card rounded-2xl border p-4 shadow">
          <div className="text-muted-foreground text-[11px] font-bold uppercase">Filtered Count</div>
          <div className="text-foreground mt-1 text-2xl font-black">{filteredFamilies.length}</div>
          <div className="text-primary mt-0.5 text-[10px]">Showing matches</div>
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

      {/* Filter Tabs by Anbiyam */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs">
        <button
          type="button"
          onClick={() => setSelectedAnbiyam('ALL')}
          className={`shrink-0 rounded-xl px-3.5 py-2 font-bold transition-all ${
            selectedAnbiyam === 'ALL'
              ? 'bg-primary text-primary-foreground shadow'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          All Anbiyams ({ALL_PARISH_FAMILIES.length})
        </button>
        {PARISH.anbiyams.map((anb) => (
          <button
            key={anb.name}
            type="button"
            onClick={() => setSelectedAnbiyam(anb.name)}
            className={`shrink-0 rounded-xl px-3.5 py-2 font-semibold transition-all ${
              selectedAnbiyam === anb.name
                ? 'bg-primary text-primary-foreground shadow'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {anb.name} ({anb.families})
          </button>
        ))}
      </div>

      {/* Search & Directory Table */}
      <div className="border-border/80 bg-card overflow-hidden rounded-3xl border-2 shadow-xl">
        <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b p-6">
          <div className="relative w-full max-w-md">
            <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by Card No, Family Name, Contact, Address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-muted/40 border-border/80 focus:ring-primary w-full rounded-xl border py-2.5 pl-10 pr-4 text-xs outline-none focus:ring-2"
            />
          </div>
          <span className="bg-primary/10 text-primary rounded-xl px-3 py-1.5 text-xs font-bold">
            Showing {filteredFamilies.length} Families
          </span>
        </div>

        <div className="max-h-[650px] overflow-x-auto overflow-y-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-muted/80 text-muted-foreground sticky top-0 z-10 border-b text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
              <tr>
                <th className="p-4">Card No.</th>
                <th className="p-4">Family Head</th>
                <th className="p-4">Anbiyam</th>
                <th className="p-4">Contact No.</th>
                <th className="p-4">Residential Address</th>
                {showCredentials && <th className="p-4">Login Credentials</th>}
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              {filteredFamilies.map((fam, idx) => (
                <tr key={`${fam.anbiyam}-${fam.cardNo}-${idx}`} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <span className="bg-primary/10 text-primary font-mono rounded px-2 py-0.5 font-bold">
                      {fam.cardNo === 'Nan' ? 'N/A' : fam.cardNo}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-foreground font-bold">{fam.headName || fam.familyName || '—'}</div>
                    <div className="text-primary text-[10px] font-bold">
                      Family Head
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-foreground">{fam.anbiyam}</span>
                  </td>
                  <td className="p-4">
                    {fam.contactNo ? (
                      <div className="flex items-center gap-1.5 text-foreground font-mono">
                        <Phone className="text-primary h-3 w-3" /> {fam.contactNo}
                      </div>
                    ) : (
                      <span className="text-muted-foreground italic">Not Provided</span>
                    )}
                  </td>
                  <td className="p-4 max-w-xs truncate text-muted-foreground" title={fam.address}>
                    {fam.address ? (
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="text-muted-foreground h-3 w-3 shrink-0" />
                        <span className="truncate">{fam.address}</span>
                      </div>
                    ) : (
                      <span className="italic">Registered in Parish</span>
                    )}
                  </td>
                  {showCredentials && (
                    <td className="p-4 bg-amber-500/5">
                      <div className="font-mono text-[11px] font-bold text-amber-400">
                        user: <span className="text-foreground">{fam.username}</span>
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        pass: <span className="text-foreground">{fam.defaultPassword ?? '(phone unlisted)'}</span>
                      </div>
                    </td>
                  )}
                  <td className="p-4">
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-400">
                      Active
                    </span>
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

'use client';

import { useState } from 'react';
import { Heart, Check, Search, PhoneCall } from 'lucide-react';
import { useFamily } from '@/context/family-context';

export default function AdminPastoralVisitsPage() {
  const { homeCommunionVisits, updateHomeCommunionStatus } = useFamily();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filtered = homeCommunionVisits.filter((item) => {
    const matchesSearch =
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.familyNumber.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'ALL') return matchesSearch;
    return matchesSearch && item.status === filterType;
  });

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Heart className="h-4 w-4 text-rose-400" /> Parish Pastoral Care Console · Home
            Communion
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Pastoral Visits & Home Communion Console
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Manage requested Home Communion visits for elderly, sick, and bedridden parishioners.
          </p>
        </div>
      </div>

      <div className="border-border/80 bg-card overflow-hidden rounded-3xl border-2 shadow-xl">
        <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b p-6">
          <div className="relative w-full max-w-md">
            <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by Patient Name, Address, or Family Code..."
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
              <option value="ALL">All Visits</option>
              <option value="PENDING_VISIT">Pending Visit</option>
              <option value="VISITED">Visited</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-muted/50 text-muted-foreground border-b text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="p-4">Ref Code</th>
                <th className="p-4">Patient Name & Age</th>
                <th className="p-4">Reason & Address</th>
                <th className="p-4">Requested Date</th>
                <th className="p-4">Family Mobile</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="text-primary p-4 font-bold">{item.id}</td>
                  <td className="p-4">
                    <div className="text-foreground font-bold">{item.patientName}</div>
                    <div className="text-muted-foreground text-[11px]">
                      {item.relationship} · Age: {item.age} yrs
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="rounded border-rose-400/40 bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                      {item.reason}
                    </span>
                    <div className="text-foreground mt-1 font-bold">{item.address}</div>
                    {item.additionalNotes && (
                      <div className="text-muted-foreground text-[11px] italic">
                        "{item.additionalNotes}"
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-bold">
                    {item.preferredDate} ({item.preferredTime})
                  </td>
                  <td className="p-4 font-bold">
                    <a
                      href={`tel:${item.mobileNumber}`}
                      className="text-primary inline-flex items-center gap-1 hover:underline"
                    >
                      <PhoneCall className="h-3.5 w-3.5" /> {item.mobileNumber}
                    </a>
                  </td>
                  <td className="p-4">
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-400">
                      {item.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {item.status === 'PENDING_VISIT' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateHomeCommunionStatus(item.id, 'VISITED', 'Rev. Fr. Parish Priest')
                          }
                          className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white shadow hover:bg-emerald-500"
                        >
                          <Check className="h-3.5 w-3.5" /> Mark Visited
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          updateHomeCommunionStatus(item.id, 'COMPLETED', 'Rev. Fr. Parish Priest')
                        }
                        className="border-border bg-muted hover:bg-muted/80 inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-[11px] font-bold"
                      >
                        Complete Record
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

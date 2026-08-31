'use client';

import { useState } from 'react';
import { Users, Search } from 'lucide-react';
import { ALL_PARISH_FAMILIES } from '@/lib/parish-families';

export default function AdminMembersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnbiyam, setSelectedAnbiyam] = useState('ALL');

  const anbiyams = ['ALL', ...Array.from(new Set(ALL_PARISH_FAMILIES.map((f) => f.anbiyam)))];

  const filteredMembers = ALL_PARISH_FAMILIES.flatMap((fam) => {
    const list = [];
    if (fam.headName) {
      list.push({
        name: fam.headName,
        cardNo: fam.cardNo,
        anbiyam: fam.anbiyam,
        relation: 'Head of Family',
        contact: fam.contactNo,
        address: fam.address,
      });
    }
    if (fam.spouseName) {
      list.push({
        name: fam.spouseName,
        cardNo: fam.cardNo,
        anbiyam: fam.anbiyam,
        relation: 'Spouse',
        contact: fam.contactNo,
        address: fam.address,
      });
    }
    return list;
  }).filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.cardNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.anbiyam.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAnbiyam = selectedAnbiyam === 'ALL' || m.anbiyam === selectedAnbiyam;
    return matchesSearch && matchesAnbiyam;
  });

  return (
    <div className="space-y-6">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Users className="h-4 w-4" /> Parish Registry · Individual Parishioners
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Parishioners Directory
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Live database of registered parish individuals and family heads across all 13 Anbiyams.
          </p>
        </div>
        <div className="bg-primary/10 text-primary rounded-xl px-4 py-2 text-xs font-bold">
          {filteredMembers.length} Registered Parishioners
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="text-muted-foreground absolute left-3.5 top-3 h-4 w-4" />
          <input
            type="text"
            placeholder="Search parishioner name, card number, or anbiyam..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-card border-border/80 text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-2xl border py-2.5 pl-10 pr-4 text-xs font-semibold outline-none focus:ring-2"
          />
        </div>
        <select
          value={selectedAnbiyam}
          onChange={(e) => setSelectedAnbiyam(e.target.value)}
          className="bg-card border-border/80 text-foreground focus:ring-primary rounded-2xl border px-4 py-2.5 text-xs font-bold outline-none focus:ring-2"
        >
          {anbiyams.map((anb) => (
            <option key={anb} value={anb}>
              {anb === 'ALL' ? 'All Anbiyams (13 Units)' : anb}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-card border-border/80 overflow-hidden rounded-3xl border shadow-xl">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-muted/80 text-muted-foreground sticky top-0 z-10 border-b text-[10px] font-black uppercase tracking-wider backdrop-blur-md">
              <tr>
                <th className="p-4">Card No.</th>
                <th className="p-4">Parishioner Name</th>
                <th className="p-4">Role in Family</th>
                <th className="p-4">Anbiyam</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Address</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              {filteredMembers.map((m, idx) => (
                <tr key={`${m.cardNo}-${m.name}-${idx}`} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <span className="bg-primary/10 text-primary font-mono rounded px-2 py-0.5 font-bold">
                      {m.cardNo === 'Nan' ? 'N/A' : m.cardNo}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-foreground font-bold">{m.name}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      m.relation === 'Head of Family'
                        ? 'bg-primary/15 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {m.relation}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-foreground">{m.anbiyam}</td>
                  <td className="p-4">
                    {m.contact ? (
                      <span className="font-mono text-foreground">{m.contact}</span>
                    ) : (
                      <span className="text-muted-foreground italic">N/A</span>
                    )}
                  </td>
                  <td className="p-4 max-w-xs truncate text-muted-foreground" title={m.address}>
                    {m.address || '—'}
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

'use client';

import { useState } from 'react';
import { UserCheck, Search, Filter, Plus, CheckCircle } from 'lucide-react';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  const users = [
    {
      id: 'u1',
      name: 'Most Rev. Fr. Parish Priest',
      email: 'priest@queenofallsaints.in',
      role: 'PARISH_PRIEST',
      status: 'ACTIVE',
      lastLogin: '2026-08-05 10:15 AM',
    },
    {
      id: 'u2',
      name: 'System Administrator',
      email: 'admin@queenofallsaints.in',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      lastLogin: '2026-08-05 09:30 AM',
    },
    {
      id: 'u3',
      name: 'Parish Secretary',
      email: 'office@queenofallsaints.in',
      role: 'OFFICE_STAFF',
      status: 'ACTIVE',
      lastLogin: '2026-08-04 04:20 PM',
    },
    {
      id: 'u4',
      name: 'Robin (Anbiyam Leader)',
      email: 'robin@queenofallsaints.in',
      role: 'ANBIYAM_LEADER',
      status: 'ACTIVE',
      lastLogin: '2026-08-03 07:10 PM',
    },
    {
      id: 'u5',
      name: 'Jeffin (Youth Coordinator)',
      email: 'jeffin@queenofallsaints.in',
      role: 'MINISTRY_COORDINATOR',
      status: 'ACTIVE',
      lastLogin: '2026-08-02 02:45 PM',
    },
    {
      id: 'u6',
      name: 'St. Mary Family Head',
      email: 'familyhead@queenofallsaints.in',
      role: 'FAMILY_HEAD',
      status: 'ACTIVE',
      lastLogin: '2026-08-01 11:00 AM',
    },
  ];

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="animate-in fade-in space-y-8">
      {/* Header */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <UserCheck className="h-4 w-4" /> Identity & RBAC Control
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Parish System Users & Roles
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Manage authenticated accounts, permissions, and security roles across 8 access levels.
          </p>
        </div>

        <button
          type="button"
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Provision User Account</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-4">
        <div className="border-border/80 bg-card rounded-2xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-bold uppercase">Total Users</p>
          <h3 className="font-heading text-foreground mt-1 text-2xl font-bold">24</h3>
        </div>
        <div className="border-border/80 bg-card rounded-2xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-bold uppercase">Priests & Clergy</p>
          <h3 className="font-heading mt-1 text-2xl font-bold text-emerald-500">2</h3>
        </div>
        <div className="border-border/80 bg-card rounded-2xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-bold uppercase">
            Coordinators & Leaders
          </p>
          <h3 className="font-heading text-gold-400 mt-1 text-2xl font-bold">12</h3>
        </div>
        <div className="border-border/80 bg-card rounded-2xl border p-5 shadow-sm">
          <p className="text-muted-foreground text-xs font-bold uppercase">Family Accounts</p>
          <h3 className="font-heading mt-1 text-2xl font-bold text-blue-400">342</h3>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="border-border/80 bg-card flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-4 shadow-sm">
        <div className="relative min-w-[240px] flex-1">
          <Search className="text-muted-foreground absolute left-3 top-3 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-background focus:ring-primary h-10 w-full rounded-xl border pl-10 pr-4 text-xs outline-none focus:ring-2"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="text-muted-foreground h-4 w-4" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-background focus:ring-primary rounded-xl border p-2.5 font-semibold outline-none focus:ring-2"
          >
            <option value="ALL">All Roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="PARISH_PRIEST">Parish Priest</option>
            <option value="OFFICE_STAFF">Office Staff</option>
            <option value="ANBIYAM_LEADER">Anbiyam Leader</option>
            <option value="MINISTRY_COORDINATOR">Ministry Coordinator</option>
            <option value="FAMILY_HEAD">Family Head</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border-border/80 bg-card overflow-hidden rounded-2xl border shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-muted/50 text-muted-foreground border-b text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="p-4">User Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Account Status</th>
                <th className="p-4">Last Login</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                    <td className="text-foreground p-4 font-bold">{u.name}</td>
                    <td className="text-muted-foreground p-4">{u.email}</td>
                    <td className="p-4">
                      <span className="bg-primary/20 text-primary border-primary/40 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-400">
                        <CheckCircle className="h-3 w-3" /> {u.status}
                      </span>
                    </td>
                    <td className="text-muted-foreground p-4">{u.lastLogin}</td>
                    <td className="p-4 text-right">
                      <button type="button" className="text-primary font-bold hover:underline">
                        Edit Role
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-muted-foreground p-8 text-center">
                    No users matching criteria found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

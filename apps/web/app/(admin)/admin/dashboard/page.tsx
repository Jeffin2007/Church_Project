'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Users, Scroll, CreditCard, Plus, ArrowUpRight } from 'lucide-react';
import { AnnouncementWidget } from '@/components/announcements/announcement-widget';
import { AnnouncementModal } from '@/components/announcements/announcement-modal';

export default function AdminDashboardPage() {
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  const stats = [
    {
      title: 'Total Registered Families',
      value: '342',
      change: '+12 this month',
      icon: Home,
      color: 'text-blue-500',
    },
    {
      title: 'Active Parishioners',
      value: '1,280',
      change: '7 Anbiyams',
      icon: Users,
      color: 'text-emerald-500',
    },
    {
      title: 'Pending Sacrament Requests',
      value: '8',
      change: 'Requires Priest Review',
      icon: Scroll,
      color: 'text-amber-500',
    },
    {
      title: 'Monthly Collections',
      value: '₹1,45,000',
      change: '84% target reached',
      icon: CreditCard,
      color: 'text-purple-500',
    },
  ];

  const recentRequests = [
    {
      id: 'REQ-2026-089',
      family: 'St. Mary Family',
      number: 'QOAS-2024-0001',
      type: 'Baptism Certificate',
      date: '2026-08-04',
      status: 'Pending Review',
    },
    {
      id: 'REQ-2026-088',
      family: 'St. Joseph Family',
      number: 'QOAS-2024-0014',
      type: 'Marriage Certificate',
      date: '2026-08-03',
      status: 'Approved',
    },
    {
      id: 'REQ-2026-087',
      family: 'St. Teresa Family',
      number: 'QOAS-2024-0028',
      type: 'First Communion Request',
      date: '2026-08-02',
      status: 'Scheduled',
    },
    {
      id: 'REQ-2026-086',
      family: 'St. Anthony Family',
      number: 'QOAS-2024-0042',
      type: 'Confirmation Request',
      date: '2026-07-31',
      status: 'Completed',
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8">
      {/* Header Banner */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="font-heading text-primary text-3xl font-extrabold tracking-tight">
            Parish Administration Console
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Queen of All Saints Roman Catholic Church · Real-time operational overview
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAnnouncementModalOpen(true)}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-xs font-black text-slate-950 shadow-lg transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>New Parish Announcement</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="border-border/80 bg-card hover:border-primary/50 group rounded-2xl border p-6 shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                  {s.title}
                </span>
                <div className={`bg-muted/60 rounded-xl p-2.5 ${s.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-heading text-foreground mt-3 text-3xl font-bold">{s.value}</h3>
              <p className="text-primary mt-2 text-xs font-semibold">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Recent Requests Table */}
        <div className="space-y-8 lg:col-span-2">
          <div className="border-border/80 bg-card rounded-2xl border p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-foreground text-lg font-bold">
                  Recent Sacrament & Certificate Requests
                </h3>
                <p className="text-muted-foreground text-xs">
                  Applications awaiting review or issue
                </p>
              </div>
              <Link
                href="/admin/requests"
                className="text-primary inline-flex items-center gap-1 text-xs font-bold hover:underline"
              >
                <span>View All Requests</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead className="bg-muted/50 text-muted-foreground border-b text-[10px] font-black uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Request ID</th>
                    <th className="p-3">Family</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-border/40 divide-y">
                  {recentRequests.map((r) => (
                    <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                      <td className="text-primary p-3 font-bold">{r.id}</td>
                      <td className="p-3">
                        <div className="text-foreground font-bold">{r.family}</div>
                        <div className="text-muted-foreground text-[10px]">{r.number}</div>
                      </td>
                      <td className="text-foreground p-3 font-semibold">{r.type}</td>
                      <td className="text-muted-foreground p-3">{r.date}</td>
                      <td className="p-3">
                        <span className="bg-gold-500/20 text-gold-300 border-gold-400/40 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Global Announcement Widget */}
        <div>
          <AnnouncementWidget
            roleTitle="Admin Staff"
            onCreateClick={() => setIsAnnouncementModalOpen(true)}
          />
        </div>
      </div>

      {/* Modal */}
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        currentRole="Admin"
      />
    </div>
  );
}

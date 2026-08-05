'use client';

import { useState } from 'react';
import { Home, Heart, Calendar, Clock, Plus, AlertCircle } from 'lucide-react';
import { AnnouncementWidget } from '@/components/announcements/announcement-widget';
import { AnnouncementModal } from '@/components/announcements/announcement-modal';

export default function AnbiyamDashboardPage() {
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const stats = [
    { title: 'Total Assigned Families', value: '48', change: 'St. Thomas Anbiyam', icon: Home },
    { title: 'August Dues Collected', value: '₹14,500', change: '41 / 48 Paid (85%)', icon: Heart },
    {
      title: 'Next Prayer Meeting',
      value: 'Aug 10',
      change: '4:00 PM @ St. Joseph House',
      icon: Calendar,
    },
    { title: 'Prayer Intentions', value: '6', change: 'Sick & Elderly', icon: AlertCircle },
  ];

  const families = [
    {
      number: 'QOAS-2024-0001',
      head: 'Joseph Anthony',
      members: 4,
      phone: '+91 98421 00001',
      duesPaid: true,
    },
    {
      number: 'QOAS-2024-0003',
      head: 'George Francis',
      members: 3,
      phone: '+91 98421 00003',
      duesPaid: false,
    },
    {
      number: 'QOAS-2024-0007',
      head: 'Maria Thomas',
      members: 5,
      phone: '+91 98421 00007',
      duesPaid: true,
    },
    {
      number: 'QOAS-2024-0012',
      head: 'Peter Xavier',
      members: 4,
      phone: '+91 98421 00012',
      duesPaid: true,
    },
    {
      number: 'QOAS-2024-0019',
      head: 'Anthony Mary',
      members: 6,
      phone: '+91 98421 00019',
      duesPaid: false,
    },
  ];

  const prayerRequests = [
    {
      family: 'St. Joseph Family',
      request: 'Prayers for speedy recovery of Mr. Anthony after cardiac procedure.',
      date: 'Aug 04',
    },
    {
      family: 'St. Mary Family',
      request: 'Thanksgiving Rosary prayer for birth of newborn baby girl.',
      date: 'Aug 02',
    },
  ];

  const visitSchedule = [
    {
      date: 'Aug 07 (Fri)',
      time: '05:00 PM',
      family: 'QOAS-2024-0003 (George Francis)',
      purpose: 'Pastoral Visit & Dues Support',
    },
    {
      date: 'Aug 09 (Sun)',
      time: '04:00 PM',
      family: 'QOAS-2024-0019 (Anthony Mary)',
      purpose: 'Prayer Meeting Prep',
    },
  ];

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div className="animate-in fade-in space-y-8">
      {toastMsg && (
        <div className="border-gold-400/40 text-gold-300 fixed right-8 top-20 z-50 animate-bounce rounded-2xl border-2 bg-slate-900 p-4 text-xs font-bold shadow-2xl">
          ✨ {toastMsg}
        </div>
      )}

      {/* Header Banner */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-gold-400 mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Home className="h-4 w-4" /> Anbiyam Pastoral Leadership
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            St. Thomas Anbiyam — Leader Console
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Leader: Robin Antony · Ward 4 · 48 Assigned Families
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAnnouncementModalOpen(true)}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-lg transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Post Anbiyam Notice</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="border-border/80 bg-card rounded-2xl border p-6 shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs font-bold uppercase">{s.title}</span>
                <div className="bg-gold-500/20 text-gold-300 rounded-xl p-2.5">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-heading text-foreground mt-3 text-3xl font-bold">{s.value}</h3>
              <p className="text-primary mt-2 text-xs font-semibold">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
        <h3 className="font-heading text-foreground text-lg font-bold">Anbiyam Leader Actions</h3>
        <div className="grid gap-3 sm:grid-cols-4">
          <button
            type="button"
            onClick={() => triggerToast('Monthly dues recorded successfully!')}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            💳 Record Dues Collection
          </button>
          <button
            type="button"
            onClick={() => triggerToast('Prayer meeting scheduled!')}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            📅 Schedule Prayer Meeting
          </button>
          <button
            type="button"
            onClick={() => triggerToast('Prayer request added to intentions list!')}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            🙏 Add Prayer Request
          </button>
          <button
            type="button"
            onClick={() => triggerToast('Family visit logged!')}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            🏠 Schedule House Visit
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Families & Dues Table */}
          <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
            <h3 className="font-heading text-foreground text-lg font-bold">
              Assigned Families & Monthly Dues
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead className="bg-muted/50 text-muted-foreground border-b text-[10px] font-black uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Family No.</th>
                    <th className="p-3">Family Head</th>
                    <th className="p-3">Members</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Dues Status</th>
                  </tr>
                </thead>
                <tbody className="divide-border/40 divide-y">
                  {families.map((f) => (
                    <tr key={f.number} className="hover:bg-muted/20 transition-colors">
                      <td className="text-primary p-3 font-bold">{f.number}</td>
                      <td className="text-foreground p-3 font-bold">{f.head}</td>
                      <td className="text-muted-foreground p-3">{f.members}</td>
                      <td className="text-muted-foreground p-3">{f.phone}</td>
                      <td className="p-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase ${
                            f.duesPaid
                              ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-400'
                              : 'border border-red-500/40 bg-red-500/20 text-red-400'
                          }`}
                        >
                          {f.duesPaid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* House Visit & Prayer Intentions */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border-border/80 bg-card space-y-3 rounded-2xl border p-6 shadow-xl">
              <h3 className="font-heading text-foreground flex items-center gap-2 text-base font-bold">
                <Clock className="text-primary h-4 w-4" /> House Visit Schedule
              </h3>
              <div className="space-y-2">
                {visitSchedule.map((v) => (
                  <div
                    key={v.family}
                    className="bg-muted/40 border-border/60 rounded-xl border p-3 text-xs"
                  >
                    <span className="text-primary font-bold">
                      {v.date} · {v.time}
                    </span>
                    <p className="text-foreground mt-0.5 font-bold">{v.family}</p>
                    <p className="text-muted-foreground text-[11px]">{v.purpose}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-border/80 bg-card space-y-3 rounded-2xl border p-6 shadow-xl">
              <h3 className="font-heading text-foreground flex items-center gap-2 text-base font-bold">
                <Heart className="h-4 w-4 text-rose-500" /> Family Prayer Requests
              </h3>
              <div className="space-y-2">
                {prayerRequests.map((p) => (
                  <div
                    key={p.family}
                    className="bg-muted/40 border-border/60 rounded-xl border p-3 text-xs"
                  >
                    <span className="text-gold-400 font-bold">
                      {p.family} ({p.date})
                    </span>
                    <p className="text-foreground mt-0.5 italic">"{p.request}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Announcement Widget */}
        <div>
          <AnnouncementWidget
            roleTitle="Anbiyam Leader"
            onCreateClick={() => setIsAnnouncementModalOpen(true)}
          />
        </div>
      </div>

      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        currentRole="Anbiyam Leader"
      />
    </div>
  );
}

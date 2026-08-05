'use client';

import { useState } from 'react';
import { Users, HeartHandshake, CalendarDays, CheckSquare, Plus } from 'lucide-react';
import { AnnouncementWidget } from '@/components/announcements/announcement-widget';
import { AnnouncementModal } from '@/components/announcements/announcement-modal';

export default function CoordinatorDashboardPage() {
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const stats = [
    { title: 'Total Ministry Members', value: '42', change: 'Youth Movement', icon: Users },
    { title: 'Active Volunteers', value: '38', change: '90% Participation', icon: HeartHandshake },
    {
      title: 'Pending Applications',
      value: '3',
      change: 'Awaiting Coordinator Review',
      icon: CheckSquare,
    },
    { title: 'Scheduled Events', value: '4', change: 'This Month', icon: CalendarDays },
  ];

  const volunteerApplications = [
    {
      id: 'vol-1',
      name: 'Stephenraj A.',
      phone: '+91 94431 88990',
      motivation: 'Desire to sing in Youth Choir & lead retreats',
      status: 'Pending Review',
    },
    {
      id: 'vol-2',
      name: 'Catherine Therese',
      phone: '+91 98940 12345',
      motivation: 'Volunteer for Sunday Catechism teaching',
      status: 'Pending Review',
    },
  ];

  const tasks = [
    { id: 't1', title: 'Finalize Youth Retreat Choir Playlist', due: 'Aug 08', done: true },
    { id: 't2', title: 'Collect Parent Consent Forms for Camping', due: 'Aug 12', done: false },
    { id: 't3', title: 'Submit Monthly Financial Statement to Office', due: 'Aug 15', done: false },
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

      {/* Header */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="font-heading text-primary text-3xl font-extrabold tracking-tight">
            Youth Movement & Ministry Portal
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Coordinator: Jeffin Joseph · Parish Organizations Management
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsAnnouncementModalOpen(true)}
            className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-lg transition-all hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>Create Announcement</span>
          </button>
        </div>
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
                <div className="bg-primary/10 text-primary rounded-xl p-2.5">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-heading text-foreground mt-3 text-3xl font-bold">{s.value}</h3>
              <p className="text-primary mt-2 text-xs font-semibold">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Action Bar */}
      <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
        <h3 className="font-heading text-foreground text-lg font-bold">
          Coordinator Quick Actions
        </h3>
        <div className="grid gap-3 sm:grid-cols-4">
          <button
            type="button"
            onClick={() => triggerToast('Attendance recorded for Youth Sunday meeting!')}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            📋 Record Attendance
          </button>
          <button
            type="button"
            onClick={() => triggerToast('Document uploaded to ministry portal!')}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            📄 Upload Document
          </button>
          <button
            type="button"
            onClick={() => triggerToast('Photo album upload initiated!')}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            🖼️ Upload Event Photos
          </button>
          <button
            type="button"
            onClick={() => setIsAnnouncementModalOpen(true)}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            📢 Post Ministry Notice
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Volunteer Requests */}
          <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
            <h3 className="font-heading text-foreground text-lg font-bold">
              Pending Volunteer Applications
            </h3>
            <div className="space-y-3">
              {volunteerApplications.map((v) => (
                <div
                  key={v.id}
                  className="bg-muted/40 border-border/60 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 text-xs"
                >
                  <div>
                    <h4 className="text-foreground text-sm font-bold">
                      {v.name} ({v.phone})
                    </h4>
                    <p className="text-muted-foreground mt-1">"{v.motivation}"</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast(`Application for ${v.name} approved!`)}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow transition-all hover:bg-emerald-500"
                  >
                    ✓ Approve Member
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Task List */}
          <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
            <h3 className="font-heading text-foreground text-lg font-bold">Ministry Task List</h3>
            <div className="space-y-3">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="border-border/40 flex items-center justify-between border-b pb-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked={t.done}
                      className="accent-primary h-4 w-4 cursor-pointer rounded"
                    />
                    <span
                      className={
                        t.done
                          ? 'text-muted-foreground font-medium line-through'
                          : 'text-foreground font-bold'
                      }
                    >
                      {t.title}
                    </span>
                  </div>
                  <span className="text-muted-foreground font-semibold">Due: {t.due}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Announcement Widget */}
        <div>
          <AnnouncementWidget
            roleTitle="Ministry Coordinator"
            onCreateClick={() => setIsAnnouncementModalOpen(true)}
          />
        </div>
      </div>

      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        currentRole="Coordinator"
      />
    </div>
  );
}

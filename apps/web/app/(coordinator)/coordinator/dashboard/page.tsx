'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  HeartHandshake,
  CalendarDays,
  CheckSquare,
  Plus,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { AnnouncementWidget } from '@/components/announcements/announcement-widget';
import { AnnouncementModal } from '@/components/announcements/announcement-modal';
import {
  getVolunteerRequests,
  approveVolunteerRequest,
  rejectVolunteerRequest,
  subscribeToVolunteerRequests,
  type VolunteerRequestItem,
} from '@/lib/volunteer-store';

export default function CoordinatorDashboardPage() {
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [requests, setRequests] = useState<VolunteerRequestItem[]>([]);

  useEffect(() => {
    setRequests(getVolunteerRequests());
    const unsubscribe = subscribeToVolunteerRequests((updated) => {
      setRequests(updated);
    });
    return () => unsubscribe();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const pendingRequests = requests.filter((r) => r.status === 'Pending');
  const approvedRequests = requests.filter((r) => r.status === 'Approved');

  const stats = [
    {
      title: 'Total Registrations',
      value: requests.length.toString(),
      change: 'Cumulative Requests',
      icon: Users,
    },
    {
      title: 'Active Volunteers',
      value: approvedRequests.length.toString(),
      change: 'Accepted to Rosters',
      icon: HeartHandshake,
    },
    {
      title: 'Pending Applications',
      value: pendingRequests.length.toString(),
      change: 'Needs Coordinator Review',
      icon: CheckSquare,
    },
    {
      title: 'Scheduled Events',
      value: '4',
      change: 'This Month',
      icon: CalendarDays,
    },
  ];

  const handleApprove = (id: string, name: string) => {
    approveVolunteerRequest(id, 'Ministry Coordinator', 'Active Ministry Volunteer');
    triggerToast(`Volunteer application for ${name} has been APPROVED!`);
  };

  const handleReject = (id: string, name: string) => {
    rejectVolunteerRequest(id, 'Ministry Coordinator', 'Declined by coordinator.');
    triggerToast(`Volunteer application for ${name} was declined.`);
  };

  const tasks = [
    { id: 't1', title: 'Finalize Youth Retreat Choir Playlist & Rehearsals', due: 'Aug 08', done: true },
    { id: 't2', title: 'Collect Parent Consent Forms for Camping', due: 'Aug 12', done: false },
    { id: 't3', title: 'Review new Catechism teacher applications', due: 'Aug 15', done: false },
  ];

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
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold text-secondary">
              Parish Team Coordinator
            </span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              Active Management Hub
            </span>
          </div>
          <h1 className="font-heading text-primary mt-1 text-3xl font-extrabold tracking-tight">
            Team Coordinator & Volunteer Portal
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Review and accept parishioner volunteer applications, manage ministry rosters, and organize parish events.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/coordinator/volunteers"
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-secondary/90 hover:scale-105"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Open Volunteer Workspace</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsAnnouncementModalOpen(true)}
            className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-lg transition-all hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>Post Notice</span>
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
          <Link
            href="/coordinator/volunteers"
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all block"
          >
            🤝 Review Volunteer Applications
          </Link>
          <Link
            href="/coordinator/members"
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all block"
          >
            👥 Active Ministry Roster
          </Link>
          <Link
            href="/coordinator/events"
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all block"
          >
            📅 Schedule Ministry Event
          </Link>
          <button
            type="button"
            onClick={() => setIsAnnouncementModalOpen(true)}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            📢 Broadcast Ministry Notice
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          {/* Volunteer Requests */}
          <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-foreground text-lg font-bold">
                Pending Volunteer Applications ({pendingRequests.length})
              </h3>
              <Link
                href="/coordinator/volunteers"
                className="text-secondary inline-flex items-center gap-1 text-xs font-bold hover:underline"
              >
                <span>View Full Workspace</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="rounded-xl border border-dashed p-6 text-center text-xs text-muted-foreground">
                🎉 No pending applications! All volunteer requests have been reviewed and accepted.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingRequests.slice(0, 4).map((v) => (
                  <div
                    key={v.id}
                    className="bg-muted/40 border-border/60 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4 text-xs"
                  >
                    <div className="max-w-md">
                      <div className="flex items-center gap-2">
                        <h4 className="text-foreground text-sm font-bold">{v.applicantMember}</h4>
                        <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                          {v.familyNumber}
                        </span>
                      </div>
                      <p className="text-secondary font-semibold text-xs mt-0.5">{v.organizationName}</p>
                      <p className="text-muted-foreground mt-1 line-clamp-2 italic">
                        &quot;{v.reason}&quot;
                      </p>
                      <div className="text-muted-foreground mt-1 text-[10px]">
                        Phone: {v.contactPhone} · Submitted: {v.submittedDate}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleApprove(v.id, v.applicantMember)}
                        className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow transition-all hover:bg-emerald-700 active:scale-95"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(v.id, v.applicantMember)}
                        className="inline-flex items-center gap-1 rounded-xl bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 border border-rose-200 hover:bg-rose-100 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-300 transition-all"
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

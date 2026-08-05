'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Church, Calendar, Clock, FileCheck, Megaphone } from 'lucide-react';
import { AnnouncementWidget } from '@/components/announcements/announcement-widget';
import { AnnouncementModal } from '@/components/announcements/announcement-modal';

export default function PriestDashboardPage() {
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const todayMasses = [
    {
      time: '06:30 AM',
      lang: 'Tamil',
      type: 'Morning Mass',
      intention: 'In memory of Deceased Family Members of St. Mary Anbiyam',
    },
    {
      time: '06:30 PM',
      lang: 'Tamil',
      type: 'Evening Novena Mass',
      intention: 'Thanksgiving for successful surgery of Joseph',
    },
  ];

  const pendingApprovals = [
    {
      id: 'REQ-2026-089',
      family: 'St. Mary Family (QOAS-2024-0001)',
      type: 'Baptism Certificate',
      applicant: 'Anthony & Maria',
      status: 'Requires Priest Signature',
    },
    {
      id: 'REQ-2026-088',
      family: 'St. Joseph Family (QOAS-2024-0014)',
      type: 'Marriage Certificate',
      applicant: 'Paul & Rita',
      status: 'Requires Priest Signature',
    },
    {
      id: 'REQ-2026-087',
      family: 'St. Teresa Family (QOAS-2024-0028)',
      type: 'First Holy Communion',
      applicant: 'Little Agnes',
      status: 'Catechism Approved',
    },
  ];

  const upcomingAppointments = [
    {
      time: '10:00 AM',
      name: 'Mr. David & Family',
      purpose: 'Nuptial Blessing Counseling',
      phone: '+91 98765 43210',
    },
    {
      time: '04:30 PM',
      name: 'St. Jude Anbiyam Leaders',
      purpose: 'Ward Boundaries Review',
      phone: '+91 98421 11223',
    },
  ];

  const handleAction = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="animate-in fade-in space-y-8">
      {/* Toast Alert */}
      {actionSuccess && (
        <div className="border-gold-400/40 text-gold-300 fixed right-8 top-20 z-50 animate-bounce rounded-2xl border-2 bg-slate-900 p-4 text-xs font-bold shadow-2xl">
          ✨ {actionSuccess}
        </div>
      )}

      {/* Header Banner */}
      <div className="border-gold-400/30 rounded-3xl border-2 bg-gradient-to-r from-[hsl(214,75%,12%)] via-[hsl(214,70%,16%)] to-[hsl(214,75%,12%)] p-8 text-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="border-gold-400/40 bg-gold-500/20 text-gold-300 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-black uppercase tracking-widest">
              <Church className="h-3.5 w-3.5" /> Pastoral Care & Shepherding
            </div>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
              Welcome, Rev. Fr. Parish Priest
            </h1>
            <p className="text-sm font-medium text-white/85">
              Queen of All Saints Roman Catholic Parish · Today: Wednesday, August 5, 2026
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsAnnouncementModalOpen(true)}
              className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-xs font-black text-slate-950 shadow-xl transition-all hover:scale-105"
            >
              <Megaphone className="h-4 w-4" />
              <span>Issue Pastoral Notice</span>
            </button>
          </div>
        </div>

        {/* Liturgical Status Strip */}
        <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 text-xs sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="text-[10px] font-bold uppercase text-white/60">Liturgical Season</span>
            <p className="mt-0.5 text-sm font-bold text-emerald-400">
              🟢 18th Sunday in Ordinary Time
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="text-[10px] font-bold uppercase text-white/60">Upcoming Feast</span>
            <p className="text-gold-300 mt-0.5 text-sm font-bold">
              ⭐ Feast of Queen of All Saints (Oct 24)
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="text-[10px] font-bold uppercase text-white/60">Emergency Notice</span>
            <p className="mt-0.5 text-sm font-bold text-amber-300">
              ☔ Heavy Rain Mass Adjustments Active
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
        <h3 className="font-heading text-foreground text-lg font-bold">Pastoral Quick Actions</h3>
        <div className="grid gap-3 sm:grid-cols-5">
          <button
            type="button"
            onClick={() => setIsAnnouncementModalOpen(true)}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            📢 Issue Announcement
          </button>
          <button
            type="button"
            onClick={() => handleAction('Certificates approved & digitally signed!')}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            🎓 Approve Certificate
          </button>
          <button
            type="button"
            onClick={() => handleAction('Appointment confirmed!')}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            📅 Approve Appointment
          </button>
          <button
            type="button"
            onClick={() => handleAction('Pastoral message sent to Anbiyam leaders!')}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            💬 Send Pastoral Message
          </button>
          <button
            type="button"
            onClick={() => handleAction('Official parish letter PDF generated!')}
            className="border-border/80 hover:border-primary hover:bg-primary/5 text-foreground rounded-xl border p-3 text-center text-xs font-bold transition-all"
          >
            📜 Generate Letter
          </button>
        </div>
      </div>

      {/* Main Priest Dashboard Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column (2 Cols) */}
        <div className="space-y-8 lg:col-span-2">
          {/* Today's Mass & Intentions */}
          <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
            <h3 className="font-heading text-foreground flex items-center gap-2 text-lg font-bold">
              <Church className="text-primary h-5 w-5" /> Today's Mass Timings & Holy Intentions
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {todayMasses.map((m) => (
                <div
                  key={m.time}
                  className="bg-muted/40 border-border/60 space-y-2 rounded-xl border p-4 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-primary flex items-center gap-1 text-sm font-bold">
                      <Clock className="h-4 w-4" /> {m.time}
                    </span>
                    <span className="bg-gold-500/20 text-gold-300 rounded px-2 py-0.5 text-[10px] font-bold">
                      {m.lang}
                    </span>
                  </div>
                  <h4 className="text-foreground font-bold">{m.type}</h4>
                  <p className="text-muted-foreground italic">"Intention: {m.intention}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Certificate & Sacrament Requests */}
          <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-foreground flex items-center gap-2 text-lg font-bold">
                <FileCheck className="text-gold-400 h-5 w-5" /> Sacrament Requests Awaiting Approval
              </h3>
              <Link
                href="/admin/requests"
                className="text-primary text-xs font-bold hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {pendingApprovals.map((p) => (
                <div
                  key={p.id}
                  className="bg-muted/30 border-border/60 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">{p.id}</span>
                      <span className="bg-primary/20 text-primary rounded px-2 py-0.5 text-[10px] font-bold">
                        {p.type}
                      </span>
                    </div>
                    <p className="text-foreground mt-1 font-bold">{p.family}</p>
                    <p className="text-muted-foreground text-[11px]">Applicant: {p.applicant}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAction(`Approved request ${p.id} successfully!`)}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow transition-all hover:bg-emerald-500"
                  >
                    ✓ Approve & Sign
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Appointments & Announcements */}
        <div className="space-y-8">
          {/* Today's Appointments */}
          <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
            <h3 className="font-heading text-foreground flex items-center gap-2 text-lg font-bold">
              <Calendar className="h-5 w-5 text-emerald-500" /> Today's Appointments
            </h3>
            <div className="space-y-3">
              {upcomingAppointments.map((ap) => (
                <div
                  key={ap.time}
                  className="bg-muted/40 border-border/60 space-y-1 rounded-xl border p-3 text-xs"
                >
                  <div className="text-primary flex items-center justify-between font-bold">
                    <span>🕒 {ap.time}</span>
                    <span className="text-muted-foreground text-[10px]">{ap.phone}</span>
                  </div>
                  <p className="text-foreground font-bold">{ap.name}</p>
                  <p className="text-muted-foreground">{ap.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Announcement Widget */}
          <AnnouncementWidget
            roleTitle="Parish Priest"
            onCreateClick={() => setIsAnnouncementModalOpen(true)}
          />
        </div>
      </div>

      {/* Modal */}
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        currentRole="Parish Priest"
      />
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Church, Megaphone, Heart, PhoneCall, Check } from 'lucide-react';
import { AnnouncementWidget } from '@/components/announcements/announcement-widget';
import { AnnouncementModal } from '@/components/announcements/announcement-modal';
import { EmergencyPastoralCareCard } from '@/components/pastoral/emergency-pastoral-care-card';
import { CompactDailyReadingsWidget } from '@/components/home/compact-daily-readings';
import { useFamily } from '@/context/family-context';

export default function PriestDashboardPage() {
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const {
    massIntentions,
    homeCommunionVisits,
    updateMassIntentionStatus,
    updateHomeCommunionStatus,
  } = useFamily();

  const pendingMasses = massIntentions.filter(
    (item) => item.status === 'PENDING_CONFIRMATION' || item.status === 'MASS_SCHEDULED',
  );

  const pendingVisits = homeCommunionVisits.filter((item) => item.status === 'PENDING_VISIT');

  const handleAction = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
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
              Queen of All Saints Roman Catholic Parish Presbytery
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
            <p className="mt-0.5 text-sm font-bold text-emerald-400">🟢 Ordinary Time</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="text-[10px] font-bold uppercase text-white/60">
              Mass Intentions Today
            </span>
            <p className="text-gold-300 mt-0.5 text-sm font-bold">
              ⭐ {pendingMasses.length} Intentions Scheduled
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="text-[10px] font-bold uppercase text-white/60">
              Pending Sick Visits
            </span>
            <p className="mt-0.5 text-sm font-bold text-rose-300">
              🍷 {pendingVisits.length} Home Communion Visits
            </p>
          </div>
        </div>
      </div>

      {/* PHASE 3 — Emergency Pastoral Care Banner */}
      <EmergencyPastoralCareCard />

      {/* PHASE 10 — Compact Daily Mass Readings Widget */}
      <CompactDailyReadingsWidget />

      {/* Main Priest Dashboard Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column (2 Cols) */}
        <div className="space-y-8 lg:col-span-2">
          {/* PHASE 1 & 6 — Today's Mass Intentions */}
          <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
            <div className="border-border/60 flex items-center justify-between border-b pb-3">
              <h3 className="font-heading text-foreground flex items-center gap-2 text-lg font-bold">
                <Church className="text-primary h-5 w-5" /> Today's Mass Intentions & Offerings
              </h3>
              <Link
                href="/admin/mass-intentions"
                className="text-primary text-xs font-bold hover:underline"
              >
                Manage All Intentions →
              </Link>
            </div>

            <div className="space-y-3">
              {pendingMasses.map((m) => (
                <div
                  key={m.id}
                  className="bg-muted/40 border-border/60 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">{m.id}</span>
                      <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 rounded px-2 py-0.5 text-[10px] font-bold">
                        {m.requestType}
                      </span>
                      <span className="font-bold text-emerald-400">
                        ₹{m.offeringAmount} ({m.paymentStatus})
                      </span>
                    </div>
                    <h4 className="text-foreground font-bold">
                      {m.title} — {m.personName}
                    </h4>
                    <p className="text-muted-foreground text-[11px]">
                      Requested Date: {m.preferredDate} ({m.preferredTime}) · Language: {m.language}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {m.status === 'PENDING_CONFIRMATION' && (
                      <button
                        type="button"
                        onClick={() => {
                          updateMassIntentionStatus(
                            m.id,
                            'MASS_SCHEDULED',
                            `${m.preferredDate} ${m.preferredTime}`,
                            'Rev. Fr. Parish Priest',
                          );
                          handleAction(`Mass Intention ${m.id} scheduled!`);
                        }}
                        className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-emerald-500"
                      >
                        ✓ Confirm & Schedule Mass
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PHASE 2 & 6 — Pending Home Communion Visits */}
          <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
            <div className="border-border/60 flex items-center justify-between border-b pb-3">
              <h3 className="font-heading text-foreground flex items-center gap-2 text-lg font-bold">
                <Heart className="h-5 w-5 text-rose-400" /> Pending Holy Communion Visits for the
                Sick
              </h3>
              <Link
                href="/admin/pastoral-visits"
                className="text-primary text-xs font-bold hover:underline"
              >
                Console View →
              </Link>
            </div>

            <div className="space-y-3">
              {pendingVisits.map((v) => (
                <div
                  key={v.id}
                  className="bg-muted/30 border-border/60 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">{v.id}</span>
                      <span className="rounded border-rose-400/40 bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                        {v.reason}
                      </span>
                    </div>
                    <h4 className="text-foreground font-bold">
                      {v.patientName} ({v.relationship}, Age {v.age})
                    </h4>
                    <p className="text-muted-foreground text-[11px]">
                      Address: {v.address} · Preferred: {v.preferredDate} ({v.preferredTime})
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${v.mobileNumber}`}
                      className="border-border bg-background text-primary hover:bg-muted inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-bold"
                    >
                      <PhoneCall className="h-3.5 w-3.5" /> Call Family
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        updateHomeCommunionStatus(v.id, 'VISITED', 'Rev. Fr. Parish Priest');
                        handleAction(`Pastoral visit for ${v.patientName} marked as completed!`);
                      }}
                      className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-emerald-500"
                    >
                      <Check className="h-3.5 w-3.5" /> Mark Visited
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Announcement Widget */}
        <div className="space-y-8">
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

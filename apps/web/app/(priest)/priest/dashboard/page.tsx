'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Church, Heart, PhoneCall, Check, Compass, CheckCircle2, XCircle } from 'lucide-react';
import { AnnouncementWidget } from '@/components/announcements/announcement-widget';
import { AnnouncementModal } from '@/components/announcements/announcement-modal';
import { EmergencyPastoralCareCard } from '@/components/pastoral/emergency-pastoral-care-card';
import { CompactDailyReadingsWidget } from '@/components/home/compact-daily-readings';
import { useFamily } from '@/context/family-context';
import { getLiveNextMass } from '@/lib/mass-schedule-helper';

export default function PriestDashboardPage() {
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const {
    family,
    massIntentions,
    homeCommunionVisits,
    updateMassIntentionStatus,
    updateHomeCommunionStatus,
    approveAnbiyamChange,
    rejectAnbiyamChange,
  } = useFamily();

  const pendingMasses = massIntentions.filter(
    (item) => item.status === 'PENDING_CONFIRMATION' || item.status === 'MASS_SCHEDULED',
  );

  const pendingVisits = homeCommunionVisits.filter((item) => item.status === 'PENDING_VISIT');

  const liveMass = useMemo(() => getLiveNextMass(), []);

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
            <div className="border-gold-400/40 bg-gold-500/20 text-gold-300 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-wider">
              <Cross className="h-3.5 w-3.5" /> Clergy Administration Portal
            </div>
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Welcome, Rev. Fr. Arockiasamy
            </h1>
            <p className="text-sm font-medium text-white/80">
              Parish Priest & Administrator · Queen of All Saints Roman Catholic Parish, Trichy
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleAction('Liturgical Calendar & Mass Registers Refreshed')}
              className="border-gold-400/40 bg-gold-500/20 text-gold-300 hover:bg-gold-500/30 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition-all"
            >
              <RefreshCw className="h-4 w-4" /> Refresh Schedule
            </button>
          </div>
        </div>

        {/* Liturgical Status Strip */}
        <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 text-xs sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="text-[10px] font-bold uppercase text-white/60">Liturgical Season</span>
            <p className="mt-0.5 text-sm font-bold text-emerald-400">🟢 Ordinary Time</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="text-[10px] font-bold uppercase text-white/60">
              {liveMass.label}
            </span>
            <p className="text-gold-300 mt-0.5 text-sm font-bold">
              ⛪ {liveMass.time} ({liveMass.language})
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="text-[10px] font-bold uppercase text-white/60">
              Mass Intentions
            </span>
            <p className="text-gold-300 mt-0.5 text-sm font-bold">
              ⭐ {pendingMasses.length} Intentions Registered
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

      {/* Pending Anbiyam Transfer Request for Clergy Approval */}
      {family.anbiyamTransferStatus === 'PENDING_APPROVAL' && (
        <div className="border-2 border-amber-500/50 bg-amber-500/10 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/30 pb-3">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500/20 text-amber-600 dark:text-amber-300 p-2.5 rounded-2xl">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-base font-extrabold text-foreground">
                  Pending Anbiyam Ward Transfer Request
                </h3>
                <p className="text-muted-foreground text-xs">
                  Review family jurisdiction change submitted by parishioner
                </p>
              </div>
            </div>
            <span className="bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
              Action Required
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <div className="bg-background/80 rounded-2xl p-3 border">
              <span className="text-muted-foreground block font-semibold">Family Code & Head</span>
              <span className="font-bold text-foreground text-sm">{family.name} ({family.familyNumber})</span>
            </div>
            <div className="bg-background/80 rounded-2xl p-3 border">
              <span className="text-muted-foreground block font-semibold">Current Ward</span>
              <span className="font-bold text-rose-600 dark:text-rose-400 text-sm">{family.anbiyam}</span>
            </div>
            <div className="bg-background/80 rounded-2xl p-3 border">
              <span className="text-muted-foreground block font-semibold">Requested Target Ward</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{family.anbiyamRequestedChange}</span>
            </div>
            <div className="bg-background/80 rounded-2xl p-3 border">
              <span className="text-muted-foreground block font-semibold">Reason for Request</span>
              <span className="italic text-foreground font-medium">{family.anbiyamRequestReason || 'Ward relocation'}</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                rejectAnbiyamChange();
                handleAction('Anbiyam transfer request rejected.');
              }}
              className="px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-500/10 rounded-xl border border-rose-500/30 flex items-center gap-1.5"
            >
              <XCircle className="h-4 w-4" /> Reject Request
            </button>
            <button
              type="button"
              onClick={() => {
                approveAnbiyamChange();
                handleAction(`Anbiyam transfer approved! Family re-assigned to ${family.anbiyamRequestedChange}.`);
              }}
              className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <CheckCircle2 className="h-4 w-4" /> Approve & Re-assign Ward
            </button>
          </div>
        </div>
      )}

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
                  className="bg-muted/40 border-border/60 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 text-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-primary font-mono font-bold">{m.id}</span>
                      <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 rounded px-2 py-0.5 text-[10px] font-extrabold">
                        {m.requestType}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-400">
                        ✓ PAID & VERIFIED (₹{m.offeringAmount})
                      </span>
                    </div>
                    <h4 className="text-foreground text-sm font-extrabold">
                      {m.title} — <span className="text-primary">{m.personName}</span>
                    </h4>
                    <p className="text-muted-foreground text-[11px] font-medium">
                      <strong className="text-foreground">Family:</strong> {m.familyName} (
                      {m.familyNumber}) ·{' '}
                      <strong className="text-foreground">Requested Date:</strong> {m.preferredDate}{' '}
                      ({m.preferredTime}) · <strong className="text-foreground">Language:</strong>{' '}
                      {m.language}
                    </p>
                    {m.description && (
                      <p className="text-muted-foreground text-[11px] italic">"{m.description}"</p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
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
                          handleAction(`Mass Intention ${m.id} confirmed and scheduled!`);
                        }}
                        className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-black text-white shadow-lg transition-all hover:scale-105 hover:bg-emerald-500"
                      >
                        ✓ Confirm Mass
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        updateMassIntentionStatus(m.id, 'PENDING_CONFIRMATION');
                        handleAction(`Mass Intention ${m.id} marked for rescheduling.`);
                      }}
                      className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20"
                    >
                      Reschedule
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateMassIntentionStatus(m.id, 'COMPLETED');
                        handleAction(`Mass Intention ${m.id} marked as completed.`);
                      }}
                      className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-300 hover:bg-blue-500/20"
                    >
                      Mark Completed
                    </button>
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

'use client';

import { useState } from 'react';
import { Calendar, CheckCircle2, QrCode, Ticket } from 'lucide-react';
import { useFamily, ParishEventItem } from '@/context/family-context';

export default function FamilyEventsPage() {
  const { events, registerForEvent, cancelEventRegistration, members } = useFamily();
  const [selectedEventForPass, setSelectedEventForPass] = useState<ParishEventItem | null>(null);
  const [registeringEventId, setRegisteringEventId] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState(members[0]?.name || 'Joseph Anthony');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeringEventId) return;
    registerForEvent(registeringEventId, selectedMember);
    setRegisteringEventId(null);
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Calendar className="h-4 w-4" /> Parish Life · Event Registration
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Parish Events & Camps
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Register family members for spiritual retreats, youth camps, catechism programs,
            pilgrimages, and feast volunteering.
          </p>
        </div>
      </div>

      {/* Events List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="border-border/80 bg-card hover:border-gold-400/60 flex flex-col justify-between rounded-3xl border-2 p-6 shadow-xl transition-all"
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 rounded-md border px-2.5 py-0.5 text-[10px] font-extrabold uppercase">
                  {ev.category}
                </span>
                {ev.registered && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Registered
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">{ev.title}</h3>
                <p className="text-muted-foreground mt-1 text-xs font-medium leading-relaxed">
                  {ev.description}
                </p>
              </div>

              <div className="bg-muted/40 border-border/60 space-y-1 rounded-2xl border p-3 text-xs">
                <p className="text-foreground font-bold">
                  📅 {ev.date} · {ev.time}
                </p>
                <p className="text-muted-foreground text-[11px]">📍 Venue: {ev.venue}</p>
                {ev.registeredMemberName && (
                  <p className="mt-1 text-[11px] font-bold text-emerald-400">
                    Attendee: {ev.registeredMemberName} ({ev.passCode})
                  </p>
                )}
              </div>
            </div>

            <div className="border-border/60 mt-6 flex flex-wrap gap-2 border-t pt-4">
              {ev.registered ? (
                <>
                  <button
                    type="button"
                    onClick={() => setSelectedEventForPass(ev)}
                    className="from-gold-400 to-gold-600 inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-gradient-to-r px-4 py-2.5 text-xs font-black text-slate-950 shadow hover:scale-105"
                  >
                    <Ticket className="h-4 w-4" /> Download Pass
                  </button>
                  <button
                    type="button"
                    onClick={() => cancelEventRegistration(ev.id)}
                    className="border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-xl border px-3 py-2 text-xs font-bold"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setRegisteringEventId(ev.id)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 rounded-xl px-4 py-2.5 text-xs font-bold shadow hover:scale-105"
                >
                  Register Member
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      {registeringEventId && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground w-full max-w-md space-y-6 rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  Select Family Member
                </h3>
                <p className="text-muted-foreground text-xs">
                  Register family member for event entry pass
                </p>
              </div>
              <button
                type="button"
                onClick={() => setRegisteringEventId(null)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Select Attendee *
                </label>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name} ({m.relation})
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-border flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setRegisteringEventId(null)}
                  className="border-border rounded-xl border px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="from-gold-400 to-gold-600 rounded-xl bg-gradient-to-r px-5 py-2 font-black text-slate-950 shadow transition-all hover:scale-105"
                >
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital Pass Modal */}
      {selectedEventForPass && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400 w-full max-w-md space-y-6 rounded-3xl border-2 bg-slate-900 p-6 text-center text-white shadow-2xl">
            <div className="border-gold-400/30 border-b pb-4">
              <span className="text-gold-300 block text-[10px] font-black uppercase tracking-widest">
                Queen of All Saints Digital Entry Pass
              </span>
              <h3 className="font-heading mt-1 text-2xl font-black text-white">
                {selectedEventForPass.title}
              </h3>
            </div>

            <div className="space-y-3 rounded-2xl bg-white p-6 text-slate-950 shadow-inner">
              <div className="flex items-center justify-center">
                <QrCode className="h-28 w-28 text-slate-900" />
              </div>
              <p className="font-mono text-lg font-black tracking-widest text-slate-900">
                {selectedEventForPass.passCode}
              </p>
              <div className="border-t border-slate-200 pt-2 text-xs font-bold text-slate-700">
                Attendee: {selectedEventForPass.registeredMemberName}
              </div>
            </div>

            <div className="space-y-1 text-xs font-medium text-slate-300">
              <p>📍 {selectedEventForPass.venue}</p>
              <p>
                🕒 {selectedEventForPass.date} ({selectedEventForPass.time})
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedEventForPass(null)}
                className="from-gold-400 to-gold-600 rounded-xl bg-gradient-to-r px-6 py-2.5 text-xs font-black text-slate-950 shadow hover:scale-105"
              >
                Close Pass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

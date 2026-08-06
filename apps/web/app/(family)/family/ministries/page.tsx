'use client';

import { useState } from 'react';
import { UserPlus, CheckCircle2 } from 'lucide-react';

const ministries = [
  {
    name: 'Youth Movement',
    type: 'Youth Group',
    coordinator: 'Jeffin Joseph',
    members: 42,
    desc: 'Faith formation and service activities for parish youth.',
  },
  {
    name: 'Legion of Mary',
    type: 'Ministry',
    coordinator: 'Maria Theresa',
    members: 28,
    desc: "Marian devotion and apostolic works under Our Lady's guidance.",
  },
  {
    name: 'Parish Liturgical Choir',
    type: 'Choir',
    coordinator: 'Angela Maria',
    members: 25,
    desc: 'Liturgical music and worship for all Sunday and feast Masses.',
  },
  {
    name: 'Vincent de Paul Society',
    type: 'Ministry',
    coordinator: 'Francis George',
    members: 32,
    desc: 'Charitable service to the poor, sick, and needy parishioners.',
  },
  {
    name: 'St. Thomas Anbiyam',
    type: 'Anbiyam',
    coordinator: 'Robin Antony',
    members: 18,
    desc: 'Neighbourhood small Christian community meetings & prayer.',
  },
  {
    name: 'Sunday Catechism',
    type: 'Catechism',
    coordinator: 'Mary Anthony',
    members: 15,
    desc: 'Faith education assistant teachers for parish children.',
  },
];

const familyMembers = [
  'Joseph Anthony (Family Head)',
  'Maria Joseph (Spouse)',
  'John Joseph (Son)',
  'Theresa Joseph (Daughter)',
];

export default function FamilyMinistriesPage() {
  const [selectedMinistry, setSelectedMinistry] = useState<(typeof ministries)[0] | null>(null);
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);
  const [reason, setReason] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMinistry || !reason.trim()) return;

    setSubmittedMessage(true);
    setSelectedMinistry(null);
    setReason('');
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-secondary text-2xl font-bold sm:text-3xl">
          Parish Ministries & Organizations
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Explore parish groups and submit membership requests for your family members.
        </p>
      </div>

      {submittedMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <span>
            Application submitted! The Ministry Coordinator and Parish Priest will review your
            request.
          </span>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {ministries.map((m) => (
          <div
            key={m.name}
            className="bg-card border-border flex flex-col justify-between rounded-xl border p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="bg-primary/10 text-primary rounded px-2 py-0.5 text-[10px] font-bold uppercase">
                  {m.type}
                </span>
                <span className="text-muted-foreground text-xs">{m.members} active members</span>
              </div>
              <h3 className="font-heading text-foreground mt-2 text-lg font-bold">{m.name}</h3>
              <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{m.desc}</p>
              <div className="text-muted-foreground mt-3 text-xs">
                <span>
                  Coordinator:{' '}
                  <strong className="text-foreground font-semibold">{m.coordinator}</strong>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedMinistry(m)}
              className="border-secondary text-secondary hover:bg-secondary/10 mt-5 flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-xs font-bold transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Request to Join</span>
            </button>
          </div>
        ))}
      </div>

      {/* Modal: Select Member & Submit Joining Request */}
      {selectedMinistry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-card border-border w-full max-w-lg space-y-4 rounded-2xl border p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-heading text-foreground text-lg font-bold">
                Join {selectedMinistry.name}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedMinistry(null)}
                className="text-muted-foreground hover:text-foreground text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* STEP 1: Select Family Member */}
              <div>
                <label className="text-foreground mb-1 block text-sm font-extrabold">
                  1. Which family member wishes to join? *
                </label>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="bg-background border-border focus:ring-primary w-full rounded-lg border p-2.5 font-medium outline-none focus:ring-2"
                >
                  {familyMembers.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* STEP 2: Selected Organization */}
              <div>
                <label className="text-foreground mb-1 block text-sm font-extrabold">
                  2. Selected Organization
                </label>
                <input
                  type="text"
                  disabled
                  value={`[${selectedMinistry.type}] ${selectedMinistry.name}`}
                  className="bg-muted text-foreground w-full rounded-lg border p-2.5 font-bold outline-none"
                />
              </div>

              {/* STEP 3: Reason for Joining */}
              <div>
                <label className="text-foreground mb-1 block text-sm font-extrabold">
                  3. Reason for Joining & Service Interest *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share why this member wants to participate in this ministry..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="bg-background border-border focus:ring-primary w-full rounded-lg border p-2.5 outline-none focus:ring-2"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMinistry(null)}
                  className="border-border text-muted-foreground hover:bg-muted rounded-lg border px-4 py-2 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5 py-2 text-xs font-bold shadow"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

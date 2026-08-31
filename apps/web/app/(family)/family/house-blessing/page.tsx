'use client';

import { useState } from 'react';
import { Home, Plus, CheckCircle2 } from 'lucide-react';
import { useFamily } from '@/context/family-context';

export default function FamilyHouseBlessingPage() {
  const { houseBlessings, addHouseBlessingRequest, family, members } = useFamily();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [familyMemberName, setFamilyMemberName] = useState(members[0]?.name || family.headName);
  const [newAddress, setNewAddress] = useState(family.address);
  const [landmark, setLandmark] = useState(family.landmark);
  const [mobileNumber, setMobileNumber] = useState(family.headPhone || members[0]?.phone || '');
  const [preferredDate, setPreferredDate] = useState(
    () => new Date().toISOString().split('T')[0] ?? '2026-08-30',
  );
  const [notes, setNotes] = useState(
    'Annual house blessing and enthronement of Sacred Heart image.',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHouseBlessingRequest({
      familyNumber: family.familyNumber,
      familyName: family.name,
      familyMemberName,
      newAddress,
      landmark,
      mobileNumber,
      preferredDate,
      notes,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Home className="h-4 w-4" /> Pastoral Care · Annual House Blessing
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            House Blessing Requests
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Schedule the Parish Priest or Assistant Priest to visit and bless your home.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>+ Request House Blessing</span>
        </button>
      </div>

      {/* House Blessings List */}
      <div className="space-y-4">
        {houseBlessings.map((item) => (
          <div
            key={item.id}
            className="border-border/80 bg-card hover:border-gold-400 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 p-6 shadow-xl transition-all"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-md px-2.5 py-0.5 text-[10px] font-bold">
                  {item.id}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> {item.status.replace(/_/g, ' ')}
                </span>
              </div>
              <h3 className="font-heading text-foreground text-lg font-bold">
                {item.familyName} ({item.familyMemberName})
              </h3>
              <p className="text-muted-foreground text-xs font-medium">
                Address: {item.newAddress} · Landmark: {item.landmark}
              </p>
              <p className="text-muted-foreground text-[11px]">
                Mobile: {item.mobileNumber} · Preferred Date: <strong>{item.preferredDate}</strong>
              </p>
              {item.notes && <p className="text-foreground text-xs italic">"{item.notes}"</p>}
            </div>

            <div className="bg-muted/40 border-border/60 rounded-2xl border p-4 text-right text-xs">
              <span className="text-gold-300 block text-[10px] font-extrabold uppercase">
                Status
              </span>
              <span className="font-heading text-foreground text-base font-bold">
                {item.status.replace(/_/g, ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground max-h-[88vh] w-full max-w-lg space-y-6 overflow-y-auto rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  Request House Blessing Visit
                </h3>
                <p className="text-muted-foreground text-xs">
                  Notification will automatically be sent to the Parish Priest and Admin Office
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Family Member Name *
                </label>
                <select
                  value={familyMemberName}
                  onChange={(e) => setFamilyMemberName(e.target.value)}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name} ({m.relation})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  House Address *
                </label>
                <input
                  type="text"
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">Landmark</label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  />
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Mobile Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Preferred Blessing Date *
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Notes & Special Requests
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Enthronement of Sacred Heart picture..."
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                />
              </div>

              <div className="border-border flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border-border rounded-xl border px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="from-gold-400 to-gold-600 rounded-xl bg-gradient-to-r px-5 py-2 font-black text-slate-950 shadow transition-all hover:scale-105"
                >
                  Submit House Blessing Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

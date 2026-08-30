'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Plus, CheckCircle2, AlertTriangle, User } from 'lucide-react';
import { useFamily, HomeCommunionItem } from '@/context/family-context';

export default function FamilyHomeCommunionPage() {
  const { homeCommunionVisits, addHomeCommunionRequest, family, members } = useFamily();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [patientName, setPatientName] = useState(members[0]?.name || family.headName || '');
  const [relationship, setRelationship] = useState('Self');
  const [age, setAge] = useState(65);
  const [mobileNumber, setMobileNumber] = useState(family.headPhone || '');
  const [homePhone, setHomePhone] = useState('');
  const [reason, setReason] = useState<HomeCommunionItem['reason']>('Elderly');
  const [preferredDate, setPreferredDate] = useState(
    () => new Date().toISOString().split('T')[0] ?? '2026-08-30',
  );
  const [preferredTime, setPreferredTime] = useState('04:30 PM');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const hasPhoneNumber = Boolean(family.headPhone && family.headPhone.trim().length > 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasPhoneNumber) return;

    addHomeCommunionRequest({
      familyNumber: family.familyNumber,
      familyName: family.name,
      address: family.address,
      patientName,
      relationship,
      age,
      mobileNumber,
      homePhone,
      reason,
      preferredDate,
      preferredTime,
      additionalNotes,
    });

    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Header */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Heart className="h-4 w-4 text-rose-400" /> Pastoral Care · Sacraments for the Sick
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Holy Communion for the Sick
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Request the Parish Priest or Extraordinary Minister of Holy Communion to visit your
            home.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>+ Request Home Communion Visit</span>
        </button>
      </div>

      {/* Respectful Pastoral Note Before Form */}
      <div className="border-gold-400/40 bg-gold-500/10 space-y-2 rounded-3xl border-2 p-6 text-xs shadow-xl">
        <div className="text-gold-300 flex items-center gap-2 font-bold">
          <Heart className="text-gold-300 h-5 w-5" />
          <h3 className="font-heading text-foreground text-base font-bold">
            Pastoral Home Visit Care Note
          </h3>
        </div>
        <p className="text-muted-foreground font-medium leading-relaxed">
          If a member of your family is unable to attend Holy Mass because of illness, old age, or
          physical limitations, the Parish Priest can visit your home to administer Holy Communion.
        </p>
      </div>

      {/* Mandatory Phone Validation Banner if profile phone missing */}
      {!hasPhoneNumber && (
        <div className="space-y-3 rounded-3xl border-2 border-amber-500/40 bg-amber-500/10 p-6 text-xs text-amber-300 shadow-xl">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <AlertTriangle className="h-5 w-5" />
            <h4 className="font-heading text-base font-bold">Missing Family Phone Number</h4>
          </div>
          <p className="text-foreground font-medium">
            Please update your family phone number in your profile before requesting pastoral
            services.
          </p>
          <div>
            <Link
              href="/family/profile"
              className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2 text-xs font-black text-slate-950 shadow transition-all hover:scale-105"
            >
              <User className="h-4 w-4" />
              <span>Update Profile</span>
            </Link>
          </div>
        </div>
      )}

      {/* Scheduled Visits List */}
      <div className="space-y-4">
        {homeCommunionVisits.map((item) => (
          <div
            key={item.id}
            className="border-border/80 bg-card hover:border-primary/60 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 p-6 shadow-xl transition-all"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-md px-2.5 py-0.5 text-[10px] font-bold">
                  {item.id}
                </span>
                <span className="rounded-md border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400 dark:text-rose-300">
                  {item.reason}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 dark:text-emerald-300">
                  <CheckCircle2 className="h-3 w-3" /> {item.status.replace(/_/g, ' ')}
                </span>
              </div>
              <h3 className="font-heading text-foreground text-lg font-bold">
                {item.patientName} ({item.relationship}, Age {item.age})
              </h3>
              <p className="text-muted-foreground text-xs font-medium">
                Address: {item.address} · Contact: {item.mobileNumber}
              </p>
              {item.additionalNotes && (
                <p className="text-foreground text-xs italic">"{item.additionalNotes}"</p>
              )}
            </div>

            <div className="bg-muted/40 border-border/60 rounded-2xl border p-4 text-right text-xs">
              <span className="text-primary block text-[10px] font-extrabold uppercase">
                Requested Visit
              </span>
              <span className="font-heading text-foreground text-base font-bold">
                {item.preferredDate}
              </span>
              <span className="text-muted-foreground block text-[11px]">{item.preferredTime}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Request Modal */}
      {isModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground max-h-[88vh] w-full max-w-lg space-y-6 overflow-y-auto rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  Request Holy Communion Home Visit
                </h3>
                <p className="text-muted-foreground text-xs">
                  Schedule a priest pastoral visit for elderly or bedridden family members
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

            {!hasPhoneNumber ? (
              <div className="space-y-4 text-xs">
                <div className="space-y-2 rounded-2xl border-amber-500/40 bg-amber-500/10 p-4 font-bold text-amber-300">
                  <p>
                    Please update your family phone number in your profile before requesting
                    pastoral services.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link
                    href="/family/profile"
                    className="from-gold-400 to-gold-600 rounded-xl bg-gradient-to-r px-5 py-2 text-xs font-black text-slate-950 shadow"
                  >
                    Update Profile Now
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Auto-filled details */}
                <div className="bg-muted/40 border-border/60 space-y-1 rounded-2xl p-3 text-[11px]">
                  <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                    Auto-Filled Family Details
                  </span>
                  <p className="font-bold">
                    {family.familyNumber} — {family.name}
                  </p>
                  <p className="text-muted-foreground">{family.address}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-muted-foreground mb-1 block font-bold">
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                    />
                  </div>

                  <div>
                    <label className="text-muted-foreground mb-1 block font-bold">
                      Relationship *
                    </label>
                    <input
                      type="text"
                      required
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="text-muted-foreground mb-1 block font-bold">Age *</label>
                    <input
                      type="number"
                      required
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value) || 0)}
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

                  <div>
                    <label className="text-muted-foreground mb-1 block font-bold">Home Phone</label>
                    <input
                      type="text"
                      placeholder="Optional"
                      value={homePhone}
                      onChange={(e) => setHomePhone(e.target.value)}
                      className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Reason for Visit *
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value as HomeCommunionItem['reason'])}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  >
                    <option value="Elderly">Elderly</option>
                    <option value="Sick">Sick</option>
                    <option value="Bedridden">Bedridden</option>
                    <option value="Recovering after Surgery">Recovering after Surgery</option>
                    <option value="Disability">Disability</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-muted-foreground mb-1 block font-bold">
                      Preferred Date *
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
                      Preferred Time *
                    </label>
                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                    >
                      <option value="09:00 AM">09:00 AM (Morning Visit)</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="04:30 PM">04:30 PM (Evening Visit)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Additional Notes
                  </label>
                  <textarea
                    rows={2}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="e.g. Bedside communion visit requested..."
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
                    Submit Home Communion Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

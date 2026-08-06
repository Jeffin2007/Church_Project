'use client';

import { useState } from 'react';
import { Heart, Plus, CheckCircle2, EyeOff } from 'lucide-react';
import { useFamily, FamilyPrayerItem } from '@/context/family-context';

export default function FamilyPrayerRequestPage() {
  const { prayerRequests, addPrayerRequest, family } = useFamily();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [category, setCategory] = useState<FamilyPrayerItem['category']>('Healing');
  const [intentionDetails, setIntentionDetails] = useState(
    'Special prayer for family peace and health.',
  );
  const [keepAnonymous, setKeepAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPrayerRequest({
      familyNumber: family.familyNumber,
      familyName: family.name,
      category,
      intentionDetails,
      keepAnonymous,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Heart className="h-4 w-4 text-rose-400" /> Pastoral Care · Family Prayer Intentions
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Family Prayer Requests
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Submit prayer intentions directly to the Parish Priest and Intercessory Prayer Group.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>+ Submit Prayer Intention</span>
        </button>
      </div>

      {/* Prayer Requests List */}
      <div className="space-y-4">
        {prayerRequests.map((item) => (
          <div
            key={item.id}
            className="border-border/80 bg-card flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 p-6 shadow-xl transition-all hover:border-rose-400"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-md px-2.5 py-0.5 text-[10px] font-bold">
                  {item.id}
                </span>
                <span className="rounded-md border border-rose-400/40 bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                  {item.category}
                </span>
                {item.keepAnonymous && (
                  <span className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold">
                    <EyeOff className="h-3 w-3" /> Anonymous Intention
                  </span>
                )}
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> {item.status.replace(/_/g, ' ')}
                </span>
              </div>
              <h3 className="font-heading text-foreground text-lg font-bold">
                {item.keepAnonymous ? 'Anonymous Parishioner' : item.familyName}
              </h3>
              <p className="text-foreground text-xs font-medium italic leading-relaxed">
                "{item.intentionDetails}"
              </p>
            </div>

            <div className="bg-muted/40 border-border/60 rounded-2xl border p-4 text-right text-xs">
              <span className="block text-[10px] font-extrabold uppercase text-rose-300">
                Priest Prayer Status
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
                  Submit Prayer Intention
                </h3>
                <p className="text-muted-foreground text-xs">
                  Your intention will be remembered by the Parish Priest during Holy Mass and Novena
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
                  Prayer Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FamilyPrayerItem['category'])}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                >
                  <option value="Healing">Healing & Health</option>
                  <option value="Family">Family Harmony & Peace</option>
                  <option value="Thanksgiving">Thanksgiving Blessing</option>
                  <option value="Examination">Examination & Academic Success</option>
                  <option value="Employment">Employment & Job Opportunities</option>
                  <option value="Travel">Safe Travel Protection</option>
                  <option value="Other">Other Intention</option>
                </select>
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Intention Details *
                </label>
                <textarea
                  rows={3}
                  required
                  value={intentionDetails}
                  onChange={(e) => setIntentionDetails(e.target.value)}
                  placeholder="Describe your prayer request..."
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                />
              </div>

              <div className="border-border/60 bg-muted/30 flex items-center justify-between rounded-2xl border p-3">
                <div className="space-y-0.5">
                  <span className="text-foreground block font-bold">Keep Request Anonymous</span>
                  <span className="text-muted-foreground text-[11px]">
                    Hide family name on public prayer lists
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={keepAnonymous}
                  onChange={(e) => setKeepAnonymous(e.target.checked)}
                  className="accent-gold-400 h-5 w-5 rounded"
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
                  Submit Prayer Intention
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

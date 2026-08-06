'use client';

import { useState } from 'react';
import { FileText, Plus, CheckCircle2 } from 'lucide-react';
import { useFamily } from '@/context/family-context';

export default function FamilyRequestsPage() {
  const { requests, addSacramentRequest, members } = useFamily();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [certificateType, setCertificateType] = useState('Baptism Certificate');
  const [memberName, setMemberName] = useState(members[0]?.name || 'Joseph Anthony');
  const [purpose, setPurpose] = useState('Government Passport & Visa Verification');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSacramentRequest({ certificateType, memberName, purpose });
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <FileText className="h-4 w-4" /> Sacramental Certificate Requests
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Sacrament & Certificate Requests
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Submit and track official sacramental certificates, duplicate copies, and parish
            records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>+ New Certificate Request</span>
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((r) => (
          <div
            key={r.id}
            className="border-border/80 bg-card hover:border-primary/60 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 p-6 shadow-xl transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-md px-2.5 py-0.5 text-[10px] font-bold">
                  {r.id}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> {r.status.replace(/_/g, ' ')}
                </span>
              </div>
              <h3 className="font-heading text-foreground text-lg font-bold">
                {r.certificateType} — {r.memberName}
              </h3>
              <p className="text-muted-foreground text-xs font-medium">
                Purpose: <span className="text-foreground font-bold">{r.purpose}</span>
              </p>
            </div>

            <div className="bg-muted/40 border-border/60 rounded-2xl border p-4 text-right text-xs">
              <span className="text-muted-foreground block text-[10px] font-extrabold uppercase">
                Submitted On
              </span>
              <span className="font-heading text-foreground text-sm font-bold">
                {r.submittedOn}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* New Request Modal */}
      {isModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground w-full max-w-lg space-y-6 rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  New Certificate Request
                </h3>
                <p className="text-muted-foreground text-xs">
                  Request an official sacrament extract signed by the Parish Priest
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
                  Certificate Type *
                </label>
                <select
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                >
                  <option value="Baptism Certificate">Baptism Certificate Extract</option>
                  <option value="First Communion Certificate">First Communion Certificate</option>
                  <option value="Confirmation Certificate">Confirmation Certificate</option>
                  <option value="Marriage Certificate">Holy Matrimony Certificate Extract</option>
                  <option value="Parish Membership Certificate">
                    Parish Membership Certificate
                  </option>
                </select>
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Select Family Member *
                </label>
                <select
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
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
                  Reason & Purpose *
                </label>
                <textarea
                  rows={3}
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Government verification, school admission, or marriage Banns..."
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
                  Submit Certificate Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

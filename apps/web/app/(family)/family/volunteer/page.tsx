'use client';

import { useState } from 'react';
import { Plus, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface OrganizationRequest {
  id: string;
  familyMember: string;
  organizationType: string;
  organizationName: string;
  reason: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const initialRequests: OrganizationRequest[] = [
  {
    id: 'REQ-ORG-001',
    familyMember: 'John Joseph (Son)',
    organizationType: 'Youth Group',
    organizationName: 'Parish Youth Movement',
    reason: 'Active participation in youth faith formation and retreats.',
    submittedDate: '2026-08-04',
    status: 'Pending',
  },
  {
    id: 'REQ-ORG-002',
    familyMember: 'Maria Joseph (Spouse)',
    organizationType: 'Choir',
    organizationName: 'Parish Liturgical Choir',
    reason: 'Sings soprano in Sunday 8:00 AM Mass.',
    submittedDate: '2026-08-01',
    status: 'Approved',
  },
];

const familyMembers = [
  'Joseph Anthony (Family Head)',
  'Maria Joseph (Spouse)',
  'John Joseph (Son)',
  'Theresa Joseph (Daughter)',
];

const organizationTypes = [
  { type: 'Ministry', name: 'Vincent de Paul Society' },
  { type: 'Choir', name: 'Parish Liturgical Choir' },
  { type: 'Anbiyam', name: 'St. Thomas Anbiyam' },
  { type: 'Volunteer Group', name: 'Parish Service Volunteers' },
  { type: 'Youth Group', name: 'Parish Youth Movement' },
  { type: 'Catechism', name: 'Sunday Catechism Teachers' },
];

export default function FamilyVolunteerPage() {
  const [requests, setRequests] = useState<OrganizationRequest[]>(initialRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);
  const [selectedOrgIndex, setSelectedOrgIndex] = useState(0);
  const [reason, setReason] = useState('');
  const [successBanner, setSuccessBanner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    const orgObj = organizationTypes[selectedOrgIndex];
    const newReq: OrganizationRequest = {
      id: `REQ-ORG-${Math.floor(100 + Math.random() * 900)}`,
      familyMember: selectedMember,
      organizationType: orgObj.type,
      organizationName: orgObj.name,
      reason: reason,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };

    setRequests([newReq, ...requests]);
    setIsModalOpen(false);
    setReason('');
    setSuccessBanner(true);
    setTimeout(() => setSuccessBanner(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-secondary text-2xl font-bold sm:text-3xl">
            Ministry & Volunteer Signup
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Request to enroll family members into parish ministries, choir, anbiyam, youth group, or
            catechism.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow transition-all sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>New Joining Request</span>
        </button>
      </div>

      {/* Scripture Banner */}
      <div className="border-secondary/20 bg-secondary/5 rounded-xl border p-4 text-xs">
        <p className="text-secondary text-sm font-bold">
          "As each has received a gift, use it to serve one another." — 1 Peter 4:10
        </p>
        <p className="text-muted-foreground mt-1">
          Select which family member wishes to serve. All joining requests are reviewed by the
          Ministry Coordinator and Parish Priest.
        </p>
      </div>

      {successBanner && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          ✓ Request submitted successfully! Coordinator and Parish Priest have been notified for
          review.
        </div>
      )}

      {/* Submitted Requests List */}
      <div className="space-y-4">
        <h3 className="font-heading text-foreground text-base font-bold">
          Your Membership Requests
        </h3>
        {requests.map((r) => (
          <div
            key={r.id}
            className="bg-card border-border flex flex-col gap-3 rounded-xl border p-5 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary/10 text-primary rounded px-2.5 py-0.5 text-xs font-bold">
                  {r.organizationType}
                </span>
                <h4 className="text-foreground text-base font-bold">{r.organizationName}</h4>
              </div>
              <p className="text-muted-foreground text-xs">
                Applicant:{' '}
                <strong className="text-foreground font-semibold">{r.familyMember}</strong>
              </p>
              <p className="text-muted-foreground text-xs">Reason: "{r.reason}"</p>
              <p className="text-muted-foreground text-[11px]">Submitted: {r.submittedDate}</p>
            </div>

            <div className="shrink-0">
              {r.status === 'Pending' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Pending Review</span>
                </span>
              )}

              {r.status === 'Approved' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Enrolled & Active</span>
                </span>
              )}

              {r.status === 'Rejected' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Not Approved</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Request to Join Organization */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-card border-border w-full max-w-lg space-y-4 rounded-2xl border p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-heading text-foreground text-lg font-bold">
                Join Organization / Ministry
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
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

              {/* STEP 2: Select Organization */}
              <div>
                <label className="text-foreground mb-1 block text-sm font-extrabold">
                  2. Select Organization / Ministry *
                </label>
                <select
                  value={selectedOrgIndex}
                  onChange={(e) => setSelectedOrgIndex(Number(e.target.value))}
                  className="bg-background border-border focus:ring-primary w-full rounded-lg border p-2.5 font-medium outline-none focus:ring-2"
                >
                  {organizationTypes.map((o, idx) => (
                    <option key={o.name} value={idx}>
                      [{o.type}] — {o.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* STEP 3: Reason for Joining */}
              <div>
                <label className="text-foreground mb-1 block text-sm font-extrabold">
                  3. Reason for Joining & Availability *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why this member wishes to serve or join..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="bg-background border-border focus:ring-primary w-full rounded-lg border p-2.5 outline-none focus:ring-2"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border-border text-muted-foreground hover:bg-muted rounded-lg border px-4 py-2 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5 py-2 text-xs font-bold shadow"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

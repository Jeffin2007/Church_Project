'use client';

import { useState, useEffect } from 'react';
import { Plus, Clock, CheckCircle2, XCircle, Award, Sparkles, HeartHandshake } from 'lucide-react';
import { useFamily } from '@/context/family-context';
import {
  getVolunteerRequests,
  submitVolunteerRequest,
  subscribeToVolunteerRequests,
  type VolunteerRequestItem,
} from '@/lib/volunteer-store';

const organizationTypes = [
  { type: 'Youth Movement' as const, name: 'Parish Youth Movement' },
  { type: 'Liturgical Choir' as const, name: 'Parish Liturgical Choir' },
  { type: 'Sunday Catechism' as const, name: 'Sunday Catechism Teachers' },
  { type: 'Vincent de Paul' as const, name: 'Society of St. Vincent de Paul (SVP)' },
  { type: 'Legion of Mary' as const, name: 'Legion of Mary (Marian Association)' },
  { type: 'Altar Servers' as const, name: 'Altar Servers Association' },
  { type: 'Parish Volunteers' as const, name: 'Parish Service & Feast Volunteers' },
];

export default function FamilyVolunteerPage() {
  const { family, members } = useFamily();
  const [requests, setRequests] = useState<VolunteerRequestItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedOrgIndex, setSelectedOrgIndex] = useState(0);
  const [reason, setReason] = useState('');
  const [skills, setSkills] = useState('');
  const [availability, setAvailability] = useState('');
  const [successBanner, setSuccessBanner] = useState(false);

  useEffect(() => {
    setRequests(getVolunteerRequests());
    const unsubscribe = subscribeToVolunteerRequests((updated) => {
      setRequests(updated);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (members && members.length > 0 && !selectedMember) {
      setSelectedMember(members[0]?.name || `${family.headName} (Head)`);
    }
  }, [members, family.headName, selectedMember]);

  // Filter requests submitted by this family or match family number
  const familyRequests = requests.filter(
    (r) =>
      r.familyNumber.toLowerCase() === family.familyNumber.toLowerCase() ||
      r.familyNumber.includes(family.familyNumber.replace(/\D/g, '')) ||
      members.some((m) => r.applicantMember.toLowerCase().includes(m.name.toLowerCase())),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    const orgObj = organizationTypes[selectedOrgIndex] || organizationTypes[0];
    const memberName = selectedMember || (members[0]?.name ?? family.headName);

    submitVolunteerRequest({
      applicantMember: memberName,
      familyNumber: family.familyNumber,
      contactPhone: family.headPhone || '+91 94421 00000',
      contactEmail: family.headEmail,
      organizationType: orgObj.type,
      organizationName: orgObj.name,
      reason: reason.trim(),
      skillsOrExperience: skills.trim() || undefined,
      availability: availability.trim() || undefined,
    });

    setIsModalOpen(false);
    setReason('');
    setSkills('');
    setAvailability('');
    setSuccessBanner(true);
    setTimeout(() => setSuccessBanner(false), 6000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold text-secondary">
              Parish Service & Community
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {family.familyNumber}
            </span>
          </div>
          <h1 className="font-heading text-secondary mt-1 text-2xl font-bold sm:text-3xl">
            Ministry & Volunteer Signup
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Request to enroll your family members into parish ministries, choir, youth movement, catechism, or feast service.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex shrink-0 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold shadow-lg transition-all hover:scale-105 sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>New Joining Request</span>
        </button>
      </div>

      {/* Scripture Banner */}
      <div className="border-secondary/20 bg-secondary/5 rounded-2xl border p-5 text-xs">
        <p className="text-secondary text-sm font-bold">
          &quot;As each has received a gift, use it to serve one another.&quot; — 1 Peter 4:10
        </p>
        <p className="text-muted-foreground mt-1">
          Select which family member wishes to serve. All joining requests are reviewed in real-time by the
          assigned Team Coordinator and the Parish Priest.
        </p>
      </div>

      {successBanner && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 animate-in fade-in">
          ✓ Volunteer application submitted successfully! Team Coordinator has received your application and will review and assign your ministry role.
        </div>
      )}

      {/* Submitted Requests List */}
      <div className="space-y-4">
        <h3 className="font-heading text-foreground text-base font-bold">
          Your Family&apos;s Ministry & Volunteer Requests
        </h3>

        {familyRequests.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center text-xs text-muted-foreground bg-card">
            <HeartHandshake className="mx-auto h-8 w-8 text-secondary/60 mb-2" />
            <p className="font-semibold text-sm text-foreground">No active volunteer requests yet.</p>
            <p className="mt-1">Click &quot;New Joining Request&quot; to sign up for Youth Movement, Choir, Catechism, or Parish Service!</p>
          </div>
        ) : (
          familyRequests.map((r) => (
            <div
              key={r.id}
              className="bg-card border-border flex flex-col gap-4 rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1.5 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-primary/10 text-primary rounded-lg px-2.5 py-0.5 text-xs font-bold">
                    {r.organizationType}
                  </span>
                  <h4 className="text-foreground text-base font-bold">{r.organizationName}</h4>
                </div>

                <p className="text-muted-foreground text-xs">
                  Applicant:{' '}
                  <strong className="text-foreground font-semibold">{r.applicantMember}</strong>
                </p>

                <p className="text-muted-foreground text-xs italic">&quot;{r.reason}&quot;</p>

                {r.skillsOrExperience && (
                  <p className="text-muted-foreground text-[11px]">
                    <strong className="text-foreground">Skills:</strong> {r.skillsOrExperience}
                  </p>
                )}

                <p className="text-muted-foreground text-[10px]">App ID: {r.id} · Submitted: {r.submittedDate}</p>

                {r.assignedRole && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    <Award className="h-4 w-4" />
                    <span>Assigned Role: {r.assignedRole}</span>
                  </div>
                )}

                {r.coordinatorNotes && (
                  <div className="mt-1 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-700 dark:bg-slate-900/50 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    <strong className="text-foreground">Coordinator Feedback:</strong> {r.coordinatorNotes}
                  </div>
                )}
              </div>

              <div className="shrink-0 sm:text-right">
                {r.status === 'Pending' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1.5 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    <Clock className="h-4 w-4" />
                    <span>Pending Coordinator Review</span>
                  </span>
                )}

                {r.status === 'Approved' && (
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1.5 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Approved & Enrolled</span>
                    </span>
                    {r.reviewedBy && (
                      <p className="text-[10px] text-muted-foreground">Accepted by {r.reviewedBy}</p>
                    )}
                  </div>
                )}

                {r.status === 'Rejected' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3.5 py-1.5 text-xs font-bold text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
                    <XCircle className="h-4 w-4" />
                    <span>Declined</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Request to Join Organization */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card border-border w-full max-w-lg space-y-4 rounded-3xl border p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h2 className="font-heading text-foreground text-lg font-bold">
                  Join Organization / Ministry
                </h2>
              </div>
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
                <label className="text-foreground mb-1 block text-xs font-bold">
                  1. Select Family Member Applicant *
                </label>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border p-2.5 font-medium outline-none focus:ring-2"
                >
                  {members.map((m) => (
                    <option key={m.id} value={`${m.name} (${m.relation})`}>
                      {m.name} ({m.relation})
                    </option>
                  ))}
                </select>
              </div>

              {/* STEP 2: Select Organization */}
              <div>
                <label className="text-foreground mb-1 block text-xs font-bold">
                  2. Select Target Organization / Ministry *
                </label>
                <select
                  value={selectedOrgIndex}
                  onChange={(e) => setSelectedOrgIndex(Number(e.target.value))}
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border p-2.5 font-medium outline-none focus:ring-2"
                >
                  {organizationTypes.map((o, idx) => (
                    <option key={o.name} value={idx}>
                      [{o.type}] — {o.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* STEP 3: Skills / Experience */}
              <div>
                <label className="text-foreground mb-1 block text-xs font-bold">
                  3. Skills, Talents, or Past Experience (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Singing, Musical Instruments, Teaching, Floral Arrangement, Audio/Visual"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                />
              </div>

              {/* STEP 4: Availability */}
              <div>
                <label className="text-foreground mb-1 block text-xs font-bold">
                  4. Availability
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunday mornings, Saturday evenings, Feast days"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                />
              </div>

              {/* STEP 5: Reason for Joining */}
              <div>
                <label className="text-foreground mb-1 block text-xs font-bold">
                  5. Motivation & Reason for Joining *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why this member wishes to serve in this parish ministry..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="bg-background border-border focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border-border text-muted-foreground hover:bg-muted rounded-xl border px-4 py-2 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-5 py-2 text-xs font-bold shadow-lg transition-all"
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

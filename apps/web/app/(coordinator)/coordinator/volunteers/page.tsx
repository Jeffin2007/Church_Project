'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Check,
  X,
  Clock,
  Bell,
  Search,
  CheckCircle2,
  Users,
  Phone,
  Mail,
  Filter,
  UserCheck,
  Award,
} from 'lucide-react';
import {
  getVolunteerRequests,
  approveVolunteerRequest,
  rejectVolunteerRequest,
  subscribeToVolunteerRequests,
  type VolunteerRequestItem,
} from '@/lib/volunteer-store';

const TEAM_CATEGORIES = [
  'All Ministries & Teams',
  'Youth Movement',
  'Liturgical Choir',
  'Sunday Catechism',
  'Vincent de Paul',
  'Altar Servers',
  'Parish Volunteers',
] as const;

export default function CoordinatorVolunteersPage() {
  const [requests, setRequests] = useState<VolunteerRequestItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('All Ministries & Teams');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Pending' | 'Approved' | 'Rejected'>('ALL');

  // Accept Modal State
  const [acceptingItem, setAcceptingItem] = useState<VolunteerRequestItem | null>(null);
  const [assignedRoleInput, setAssignedRoleInput] = useState('');
  const [coordinatorNoteInput, setCoordinatorNoteInput] = useState('');

  // Reject Modal State
  const [rejectingItem, setRejectingItem] = useState<VolunteerRequestItem | null>(null);
  const [rejectReasonInput, setRejectReasonInput] = useState('');

  // Notification Banner
  const [bannerMsg, setBannerMsg] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  useEffect(() => {
    setRequests(getVolunteerRequests());
    const unsubscribe = subscribeToVolunteerRequests((updated) => {
      setRequests(updated);
    });
    return () => unsubscribe();
  }, []);

  const showBanner = (type: 'success' | 'danger', text: string) => {
    setBannerMsg({ type, text });
    setTimeout(() => setBannerMsg(null), 5000);
  };

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      // Team filter
      if (selectedTeam !== 'All Ministries & Teams' && r.organizationType !== selectedTeam) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'ALL' && r.status !== statusFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.applicantMember.toLowerCase().includes(q);
        const matchesFamily = r.familyNumber.toLowerCase().includes(q);
        const matchesOrg = r.organizationName.toLowerCase().includes(q);
        const matchesSkills = (r.skillsOrExperience || '').toLowerCase().includes(q);
        const matchesReason = r.reason.toLowerCase().includes(q);
        if (!matchesName && !matchesFamily && !matchesOrg && !matchesSkills && !matchesReason) {
          return false;
        }
      }
      return true;
    });
  }, [requests, selectedTeam, statusFilter, searchQuery]);

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const approvedCount = requests.filter((r) => r.status === 'Approved').length;
  const totalCount = requests.length;

  const handleOpenAcceptModal = (item: VolunteerRequestItem) => {
    setAcceptingItem(item);
    setAssignedRoleInput(
      item.organizationType === 'Youth Movement'
        ? 'Youth Group Activity Leader'
        : item.organizationType === 'Liturgical Choir'
          ? 'Choir Member & Vocalist'
          : item.organizationType === 'Sunday Catechism'
            ? 'Assistant Catechism Instructor'
            : item.organizationType === 'Vincent de Paul'
              ? 'Charity Field Volunteer'
              : item.organizationType === 'Altar Servers'
                ? 'Senior Altar Server'
                : 'Parish Service Volunteer',
    );
    setCoordinatorNoteInput(
      `Welcome to ${item.organizationName}! Your volunteer request has been approved by the Team Coordinator.`,
    );
  };

  const handleConfirmAccept = () => {
    if (!acceptingItem) return;

    approveVolunteerRequest(
      acceptingItem.id,
      'Ministry Coordinator',
      assignedRoleInput.trim() || 'Active Ministry Volunteer',
      coordinatorNoteInput.trim(),
    );

    showBanner(
      'success',
      `Application ${acceptingItem.id} for ${acceptingItem.applicantMember} has been APPROVED as "${assignedRoleInput}". Notification sent to Parish Priest!`,
    );
    setAcceptingItem(null);
  };

  const handleOpenRejectModal = (item: VolunteerRequestItem) => {
    setRejectingItem(item);
    setRejectReasonInput('Ministry capacity reached for current term. Please re-apply in the next quarter.');
  };

  const handleConfirmReject = () => {
    if (!rejectingItem) return;

    rejectVolunteerRequest(
      rejectingItem.id,
      'Ministry Coordinator',
      rejectReasonInput.trim(),
    );

    showBanner(
      'danger',
      `Application ${rejectingItem.id} for ${rejectingItem.applicantMember} has been declined.`,
    );
    setRejectingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {bannerMsg && (
        <div
          className={`fixed right-6 top-20 z-50 flex items-center gap-3 rounded-2xl border p-4 text-xs font-bold shadow-2xl backdrop-blur-md animate-in slide-in-from-top-3 ${
            bannerMsg.type === 'success'
              ? 'border-emerald-500/40 bg-emerald-950/90 text-emerald-200'
              : 'border-rose-500/40 bg-rose-950/90 text-rose-200'
          }`}
        >
          {bannerMsg.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          ) : (
            <X className="h-5 w-5 text-rose-400" />
          )}
          <span>{bannerMsg.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
              Parish Organizations & Ministries
            </span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              Live Approvals Desk
            </span>
          </div>
          <h1 className="font-heading mt-1 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
            Team Coordinator Volunteer Approvals
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Review, evaluate, and accept parishioner family applications to join youth movement, choir,
            catechism, and charitable ministries.
          </p>
        </div>
      </div>

      {/* Priest Notification Banner */}
      <div className="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/90 p-4 text-xs text-blue-950 shadow-sm dark:border-blue-800/40 dark:bg-blue-950/30 dark:text-blue-200">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold">Automated Pastoral Synced Alerts Active</p>
            <p className="text-blue-800/80 dark:text-blue-300/80 text-[11px]">
              When you accept any volunteer application, the Parish Priest portal and Family dashboard are
              immediately updated with role assignments.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 shadow-sm dark:border-amber-900/30 dark:bg-amber-950/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-amber-800 dark:text-amber-300">
              Pending Coordinator Review
            </span>
            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="mt-2 text-3xl font-black text-amber-900 dark:text-amber-200">
            {pendingCount}
          </div>
          <p className="text-muted-foreground mt-1 text-[11px]">Awaiting your acceptance / assignment</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm dark:border-emerald-900/30 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300">
              Active Accepted Volunteers
            </span>
            <UserCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-2 text-3xl font-black text-emerald-900 dark:text-emerald-200">
            {approvedCount}
          </div>
          <p className="text-muted-foreground mt-1 text-[11px]">Assigned to active ministry rosters</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-card p-4 shadow-sm dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs font-bold uppercase">Total Registrations</span>
            <Users className="text-primary h-5 w-5" />
          </div>
          <div className="text-foreground mt-2 text-3xl font-black">{totalCount}</div>
          <p className="text-muted-foreground mt-1 text-[11px]">Cumulative family volunteer requests</p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
        {/* Team Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-muted-foreground mr-2 font-bold flex items-center gap-1 shrink-0">
            <Filter className="h-3.5 w-3.5" /> Team:
          </span>
          {TEAM_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedTeam(cat)}
              className={`shrink-0 rounded-xl px-3 py-1.5 font-bold transition-all ${
                selectedTeam === cat
                  ? 'bg-secondary text-white shadow-sm'
                  : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by volunteer name, family card, skills, or motivation..."
              className="border-input bg-background focus:ring-primary w-full rounded-xl border py-2 pl-9 pr-4 text-xs font-medium focus:outline-none focus:ring-2 sm:text-sm"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {(['ALL', 'Pending', 'Approved', 'Rejected'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                  statusFilter === st
                    ? st === 'Pending'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : st === 'Approved'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : st === 'Rejected'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {st === 'ALL' ? 'All Status' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Requests List Table */}
      <div className="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/50 text-muted-foreground border-b text-[11px] font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Applicant & Family</th>
                <th className="p-4">Target Ministry / Team</th>
                <th className="p-4">Skills & Availability</th>
                <th className="p-4">Reason / Motivation</th>
                <th className="p-4">Status & Role</th>
                <th className="p-4 text-right">Coordinator Action</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-muted-foreground p-12 text-center text-sm">
                    No volunteer requests found matching your current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                    {/* Applicant & Family */}
                    <td className="p-4 align-top">
                      <div className="font-bold text-foreground">{r.applicantMember}</div>
                      <div className="mt-0.5 inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-mono font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                        {r.familyNumber}
                      </div>
                      <div className="mt-1 flex flex-col gap-0.5 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {r.contactPhone}
                        </span>
                        {r.contactEmail && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {r.contactEmail}
                          </span>
                        )}
                      </div>
                      <div className="text-muted-foreground mt-1 text-[10px]">App ID: {r.id} · {r.submittedDate}</div>
                    </td>

                    {/* Target Ministry / Team */}
                    <td className="p-4 align-top font-semibold">
                      <span className="inline-block rounded-lg bg-secondary/15 px-2.5 py-1 text-xs font-bold text-secondary">
                        {r.organizationType}
                      </span>
                      <div className="text-foreground mt-1.5 text-xs font-bold">{r.organizationName}</div>
                    </td>

                    {/* Skills & Availability */}
                    <td className="p-4 align-top">
                      {r.skillsOrExperience ? (
                        <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          <span className="font-bold text-foreground">Skills: </span>
                          {r.skillsOrExperience}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs italic">Not specified</span>
                      )}
                      {r.availability && (
                        <div className="mt-1 text-[11px] text-muted-foreground">
                          <span className="font-bold">Available: </span>
                          {r.availability}
                        </div>
                      )}
                    </td>

                    {/* Reason */}
                    <td className="max-w-xs p-4 align-top text-xs text-muted-foreground">
                      <p className="line-clamp-3">{r.reason}</p>
                    </td>

                    {/* Status & Role */}
                    <td className="p-4 align-top">
                      {r.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Pending Review</span>
                        </span>
                      )}
                      {r.status === 'Approved' && (
                        <div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                            <Check className="h-3.5 w-3.5" />
                            <span>Accepted Volunteer</span>
                          </span>
                          {r.assignedRole && (
                            <div className="mt-1.5 flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                              <Award className="h-3.5 w-3.5 shrink-0" />
                              <span>{r.assignedRole}</span>
                            </div>
                          )}
                          {r.reviewedBy && (
                            <div className="text-muted-foreground text-[10px] mt-0.5">
                              By {r.reviewedBy} on {r.reviewedAt}
                            </div>
                          )}
                        </div>
                      )}
                      {r.status === 'Rejected' && (
                        <div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
                            <X className="h-3.5 w-3.5" />
                            <span>Declined</span>
                          </span>
                          {r.coordinatorNotes && (
                            <div className="text-muted-foreground text-[10px] mt-1 line-clamp-2">
                              {r.coordinatorNotes}
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4 align-top text-right">
                      {r.status === 'Pending' ? (
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                          <button
                            type="button"
                            onClick={() => handleOpenAcceptModal(r)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow transition-all hover:bg-emerald-700 hover:scale-105 active:scale-95"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Accept</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenRejectModal(r)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 border border-rose-200 transition-all hover:bg-rose-100 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-300"
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>Decline</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenAcceptModal(r)}
                            className="text-secondary hover:underline text-[11px] font-bold"
                          >
                            Edit Assignment
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accept / Assign Role Modal */}
      {acceptingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card border-border w-full max-w-lg rounded-3xl border p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    Accept Volunteer Application
                  </h3>
                  <p className="text-muted-foreground text-xs">{acceptingItem.organizationName}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAcceptingItem(null)}
                className="text-muted-foreground hover:text-foreground rounded-lg p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm">
              {/* Applicant Info summary */}
              <div className="rounded-2xl border border-muted bg-muted/40 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{acceptingItem.applicantMember}</span>
                  <span className="font-mono text-xs text-muted-foreground">{acceptingItem.familyNumber}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Motivation: &quot;{acceptingItem.reason}&quot;
                </div>
              </div>

              {/* Assigned Role Input */}
              <div>
                <label className="text-foreground block font-bold mb-1">
                  Assign Ministry Role / Position <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={assignedRoleInput}
                  onChange={(e) => setAssignedRoleInput(e.target.value)}
                  placeholder="e.g. Lead Cantor, Grade 4 Catechist, Youth Retreat Marshall"
                  className="border-input bg-background focus:ring-emerald-500 w-full rounded-xl border p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 sm:text-sm"
                />
              </div>

              {/* Coordinator Notes */}
              <div>
                <label className="text-foreground block font-bold mb-1">
                  Coordinator Welcome & Orientation Note
                </label>
                <textarea
                  value={coordinatorNoteInput}
                  onChange={(e) => setCoordinatorNoteInput(e.target.value)}
                  rows={3}
                  placeholder="Include rehearsal timings, meeting dates, or orientation details..."
                  className="border-input bg-background focus:ring-emerald-500 w-full rounded-xl border p-2.5 text-xs focus:outline-none focus:ring-2 sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setAcceptingItem(null)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAccept}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-emerald-700 active:scale-95"
                >
                  <Check className="h-4 w-4" />
                  <span>Confirm & Accept Volunteer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decline Modal */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card border-border w-full max-w-md rounded-3xl border p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-heading text-lg font-bold text-rose-600 dark:text-rose-400">
                Decline Application
              </h3>
              <button
                type="button"
                onClick={() => setRejectingItem(null)}
                className="text-muted-foreground hover:text-foreground rounded-lg p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm">
              <p className="text-muted-foreground">
                You are declining the application of <strong className="text-foreground">{rejectingItem.applicantMember}</strong> for{' '}
                <strong className="text-foreground">{rejectingItem.organizationName}</strong>.
              </p>

              <div>
                <label className="text-foreground block font-bold mb-1">Reason for Feedback</label>
                <textarea
                  value={rejectReasonInput}
                  onChange={(e) => setRejectReasonInput(e.target.value)}
                  rows={3}
                  className="border-input bg-background focus:ring-rose-500 w-full rounded-xl border p-2.5 text-xs focus:outline-none focus:ring-2 sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setRejectingItem(null)}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReject}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white shadow transition-all hover:bg-rose-700 active:scale-95"
                >
                  <X className="h-4 w-4" />
                  <span>Confirm Decline</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

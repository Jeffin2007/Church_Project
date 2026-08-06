'use client';

import { useState } from 'react';
import { Check, X, Clock, Bell } from 'lucide-react';

interface VolunteerReviewItem {
  id: string;
  applicantMember: string;
  familyNumber: string;
  organizationType: string;
  organizationName: string;
  reason: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  priestNotified: boolean;
}

const initialReviews: VolunteerReviewItem[] = [
  {
    id: 'REQ-ORG-001',
    applicantMember: 'John Joseph (Son)',
    familyNumber: 'QOAS-2024-0001',
    organizationType: 'Youth Group',
    organizationName: 'Parish Youth Movement',
    reason: 'Active participation in youth faith formation and retreats.',
    date: '2026-08-04',
    status: 'Pending',
    priestNotified: true,
  },
  {
    id: 'REQ-ORG-003',
    applicantMember: 'Theresa Joseph (Daughter)',
    familyNumber: 'QOAS-2024-0001',
    organizationType: 'Catechism',
    organizationName: 'Sunday Catechism Teachers',
    reason: 'Wants to assist in teaching 3rd grade catechism.',
    date: '2026-08-05',
    status: 'Pending',
    priestNotified: true,
  },
  {
    id: 'REQ-ORG-002',
    applicantMember: 'Maria Joseph (Spouse)',
    familyNumber: 'QOAS-2024-0001',
    organizationType: 'Choir',
    organizationName: 'Parish Liturgical Choir',
    reason: 'Sings soprano in Sunday 8:00 AM Mass.',
    date: '2026-08-01',
    status: 'Approved',
    priestNotified: true,
  },
];

export default function CoordinatorVolunteersPage() {
  const [reviews, setReviews] = useState<VolunteerReviewItem[]>(initialReviews);

  const handleApprove = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Approved' } : r)));
  };

  const handleReject = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-secondary text-2xl font-bold sm:text-3xl">
          Volunteer & Ministry Roster Approvals
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Review family member joining applications for ministries, youth group, choir, and
          catechism.
        </p>
      </div>

      {/* Priest Notification Banner */}
      <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50/80 p-4 text-xs text-blue-900 dark:border-blue-700/40 dark:bg-blue-950/30 dark:text-blue-200">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>
            Automatic Notification Active: Parish Priest receives real-time alerts for all
            membership approvals.
          </span>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/40 text-muted-foreground border-b text-[11px] font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">App ID</th>
                <th className="p-4">Applicant Member</th>
                <th className="p-4">Family No.</th>
                <th className="p-4">Target Organization</th>
                <th className="p-4">Reason for Joining</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Coordinator Action</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                  <td className="text-primary p-4 font-mono font-bold">{r.id}</td>
                  <td className="text-foreground p-4 font-bold">{r.applicantMember}</td>
                  <td className="text-muted-foreground p-4 font-mono">{r.familyNumber}</td>
                  <td className="p-4 font-semibold">
                    <span className="bg-secondary/10 text-secondary mr-1.5 rounded px-2 py-0.5 text-[11px]">
                      {r.organizationType}
                    </span>
                    <span>{r.organizationName}</span>
                  </td>
                  <td className="text-muted-foreground max-w-xs truncate p-4">{r.reason}</td>
                  <td className="text-muted-foreground whitespace-nowrap p-4">{r.date}</td>
                  <td className="p-4">
                    {r.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                        <Clock className="h-3 w-3" />
                        <span>Pending</span>
                      </span>
                    )}
                    {r.status === 'Approved' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                        <Check className="h-3 w-3" />
                        <span>Approved</span>
                      </span>
                    )}
                    {r.status === 'Rejected' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
                        <X className="h-3 w-3" />
                        <span>Rejected</span>
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {r.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleApprove(r.id)}
                          className="flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow transition-colors hover:bg-emerald-700"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(r.id)}
                          className="flex items-center gap-1 rounded-md bg-rose-600 px-2.5 py-1 text-xs font-bold text-white shadow transition-colors hover:bg-rose-700"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-xs font-medium">Reviewed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

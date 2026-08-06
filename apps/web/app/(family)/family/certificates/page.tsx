'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  Plus,
  FileText,
  User,
} from 'lucide-react';

interface CertificateRequest {
  id: string;
  familyMember: string;
  type: string;
  purpose: string;
  notes?: string;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectionReason?: string;
  collectionAppointmentBooked?: boolean;
}

const initialRequests: CertificateRequest[] = [
  {
    id: 'CERT-2026-0042',
    familyMember: 'John Joseph (Son)',
    type: 'Baptism Certificate',
    purpose: 'School Admission & First Communion Records',
    requestDate: '2026-08-04',
    status: 'Approved',
  },
  {
    id: 'CERT-2026-0043',
    familyMember: 'Joseph Anthony (Head)',
    type: 'Marriage Certificate',
    purpose: 'Visa & Passport Renewal',
    requestDate: '2026-08-05',
    status: 'Pending',
  },
];

const certificateTypes = [
  'Baptism',
  'First Communion',
  'Confirmation',
  'Marriage',
  'Family Certificate',
  'Death Certificate',
  'Other',
];

const familyMembers = [
  'Joseph Anthony (Family Head)',
  'Maria Joseph (Spouse)',
  'John Joseph (Son)',
  'Theresa Joseph (Daughter)',
];

export default function FamilyCertificatesPage() {
  const [requests, setRequests] = useState<CertificateRequest[]>(initialRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);
  const [certType, setCertType] = useState(certificateTypes[0]);
  const [purpose, setPurpose] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim()) return;

    const newReq: CertificateRequest = {
      id: `CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      familyMember: selectedMember,
      type: `${certType} Certificate`,
      purpose: purpose,
      notes: notes,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };

    setRequests([newReq, ...requests]);
    setIsModalOpen(false);
    setPurpose('');
    setNotes('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-secondary text-2xl font-bold sm:text-3xl">
            Sacramental Certificate Requests
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Request official parish certificates. Approved certificates must be collected in person
            from the Parish Office.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold shadow transition-all sm:text-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Request Certificate</span>
        </button>
      </div>

      {/* Info Notice */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 dark:border-amber-700/40 dark:bg-amber-950/30 dark:text-amber-200">
        <div className="flex gap-3">
          <GraduationCap className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="space-y-1">
            <p className="font-bold">Official Parish Certificate Workflow</p>
            <p className="leading-relaxed">
              Per diocesan governance, digital certificate downloads are disabled. All sacramental
              certificates are printed on sealed official parish parchment and signed by the Parish
              Priest. Submit your request below, and once approved, book an appointment to pick up
              the sealed original document.
            </p>
          </div>
        </div>
      </div>

      {submittedMessage && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
          ✓ Certificate request submitted successfully! Status is now Pending review by the Parish
          Priest & Office Staff.
        </div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-card border-border rounded-xl border p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-primary/10 text-primary rounded-md px-2.5 py-0.5 text-xs font-bold">
                    {req.id}
                  </span>
                  <h3 className="text-foreground text-base font-bold">{req.type}</h3>
                </div>

                <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <User className="h-3.5 w-3.5" />
                  <span>
                    Member:{' '}
                    <strong className="text-foreground font-semibold">{req.familyMember}</strong>
                  </span>
                </p>

                <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Purpose: {req.purpose}</span>
                </p>

                {req.notes && (
                  <p className="text-muted-foreground text-xs italic">Notes: "{req.notes}"</p>
                )}

                <p className="text-muted-foreground text-[11px]">Requested on: {req.requestDate}</p>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                {req.status === 'Pending' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Pending Review</span>
                  </span>
                )}

                {req.status === 'Approved' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Approved & Ready</span>
                  </span>
                )}

                {req.status === 'Rejected' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Request Rejected</span>
                  </span>
                )}
              </div>
            </div>

            {/* Approved Action Box */}
            {req.status === 'Approved' && (
              <div className="mt-4 border-t pt-4">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-50/60 p-3.5 text-xs dark:bg-emerald-950/20">
                  <p className="font-bold text-emerald-900 dark:text-emerald-200">
                    🎉 Notification: Certificate Approved!
                  </p>
                  <p className="mt-0.5 text-emerald-800 dark:text-emerald-300">
                    Your official original certificate is signed, sealed, and ready at the parish
                    desk.
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <Link
                      href="/family/appointments"
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white shadow transition-colors hover:bg-emerald-800"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Book Appointment to Collect Original</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal: Request Certificate */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-card border-border w-full max-w-lg space-y-4 rounded-2xl border p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="font-heading text-foreground text-lg font-bold">
                Request Sacramental Certificate
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
              <div>
                <label className="text-foreground mb-1 block font-semibold">
                  Select Family Member *
                </label>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="bg-background border-border focus:ring-primary w-full rounded-lg border p-2.5 outline-none focus:ring-2"
                >
                  {familyMembers.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-foreground mb-1 block font-semibold">
                  Certificate Type *
                </label>
                <select
                  value={certType}
                  onChange={(e) => setCertType(e.target.value)}
                  className="bg-background border-border focus:ring-primary w-full rounded-lg border p-2.5 outline-none focus:ring-2"
                >
                  {certificateTypes.map((t) => (
                    <option key={t} value={t}>
                      {t} Certificate
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-foreground mb-1 block font-semibold">
                  Purpose of Request *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Passport application, Marriage registration, School admission"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="bg-background border-border focus:ring-primary w-full rounded-lg border p-2.5 outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className="text-foreground mb-1 block font-semibold">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide any specific details or registry dates if known..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-5 py-2 text-xs font-semibold shadow"
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

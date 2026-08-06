'use client';

import { useState } from 'react';
import { Church, CreditCard, Plus, CheckCircle2 } from 'lucide-react';
import { useFamily, MassIntentionItem } from '@/context/family-context';

export default function FamilyMassIntentionsPage() {
  const { massIntentions, addMassIntention, family } = useFamily();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<MassIntentionItem | null>(null);

  // Form State
  const [requestType, setRequestType] =
    useState<MassIntentionItem['requestType']>('Thanksgiving Mass');
  const [personName, setPersonName] = useState(family.headName || 'Joseph Anthony');
  const [title, setTitle] = useState('Thanksgiving for Family Intentions');
  const [description, setDescription] = useState(
    'Special intention offered for family peace and health.',
  );
  const [preferredDate, setPreferredDate] = useState('2026-08-20');
  const [preferredTime, setPreferredTime] = useState('06:30 AM');
  const [language, setLanguage] = useState<'English' | 'Tamil'>('Tamil');
  const [mobileNumber, setMobileNumber] = useState(family.headPhone || '+91 98765 43210');

  const handleRazorpayCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    // Simulate Razorpay Checkout flow with Razorpay Test Mode Key rzp_test_TKZfmutWTC2qVz
    setTimeout(() => {
      const mockTransactionId = `pay_RzP${Math.floor(100000000 + Math.random() * 900000000)}`;

      const newItem: Omit<MassIntentionItem, 'id' | 'createdAt' | 'status'> = {
        requestType,
        personName,
        title,
        description,
        preferredDate,
        preferredTime,
        language,
        familyNumber: family.familyNumber,
        familyName: family.name,
        headName: family.headName,
        mobileNumber,
        offeringAmount: 100,
        paymentStatus: 'PAID',
        transactionId: mockTransactionId,
      };

      addMassIntention(newItem);

      const created: MassIntentionItem = {
        ...newItem,
        id: `MASS-2026-${Math.floor(100 + Math.random() * 900)}`,
        status: 'PENDING_CONFIRMATION',
        createdAt: new Date().toISOString().slice(0, 10),
      };

      setSubmittedReceipt(created);
      setIsProcessingPayment(false);
      setIsModalOpen(false);
    }, 1200);
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Header */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Church className="h-4 w-4" /> Digital Parish Services · Eucharistic Intentions
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Mass Intentions & Offerings
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Request Holy Mass intentions for thanksgiving, birthdays, anniversaries, or repose of
            the soul.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmittedReceipt(null);
            setIsModalOpen(true);
          }}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>+ Request Mass Intention (₹100)</span>
        </button>
      </div>

      {/* Success Receipt Banner if recently submitted */}
      {submittedReceipt && (
        <div className="space-y-3 rounded-3xl border-2 border-emerald-500/40 bg-emerald-500/10 p-6 text-xs text-emerald-400 shadow-xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            <h3 className="font-heading text-foreground text-lg font-bold">
              Mass Intention Submitted Successfully!
            </h3>
          </div>
          <p className="font-medium text-emerald-300">
            Your Mass Intention request has been submitted successfully. The Parish Office will
            confirm the requested Mass based on availability.
          </p>
          <div className="bg-background/80 text-foreground flex flex-wrap justify-between gap-2 rounded-2xl border border-emerald-500/30 p-4">
            <span>
              Intention Ref: <strong>{submittedReceipt.id}</strong>
            </span>
            <span>
              Razorpay Transaction: <strong>{submittedReceipt.transactionId}</strong>
            </span>
            <span>
              Offering Amount: <strong>₹100 (PAID)</strong>
            </span>
          </div>
        </div>
      )}

      {/* Mass Intentions List */}
      <div className="space-y-4">
        {massIntentions.map((item) => (
          <div
            key={item.id}
            className="border-border/80 bg-card hover:border-gold-400/60 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 p-6 shadow-xl transition-all"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary/10 text-primary rounded-md px-2.5 py-0.5 text-[10px] font-bold">
                  {item.id}
                </span>
                <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 rounded-md border px-2 py-0.5 text-[10px] font-bold">
                  {item.requestType}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> {item.status.replace(/_/g, ' ')}
                </span>
              </div>
              <h3 className="font-heading text-foreground text-lg font-bold">
                {item.title} — {item.personName}
              </h3>
              <p className="text-muted-foreground text-xs font-medium">
                Description: {item.description} · Language: {item.language}
              </p>
              <p className="text-muted-foreground text-[11px]">
                Requested Date: {item.preferredDate} ({item.preferredTime}) · Transaction:{' '}
                <span className="text-primary font-bold">{item.transactionId}</span>
              </p>
            </div>

            <div className="bg-muted/40 border-border/60 rounded-2xl border p-4 text-right text-xs">
              <span className="text-gold-300 block text-[10px] font-extrabold uppercase">
                Mass Offering
              </span>
              <span className="font-heading text-foreground text-xl font-black">
                ₹{item.offeringAmount}
              </span>
              <span className="mt-1 block text-[10px] font-bold text-emerald-400">
                ✓ {item.paymentStatus} via Razorpay
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Request Mass Intention Modal */}
      {isModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground max-h-[88vh] w-full max-w-xl space-y-6 overflow-y-auto rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  Request Holy Mass Intention
                </h3>
                <p className="text-muted-foreground text-xs">
                  Suggested Mass Offering: <strong className="text-gold-300 font-bold">₹100</strong>{' '}
                  (Integrated with Razorpay Payment)
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

            <form onSubmit={handleRazorpayCheckout} className="space-y-4 text-xs">
              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Intention Request Type *
                </label>
                <select
                  value={requestType}
                  onChange={(e) =>
                    setRequestType(e.target.value as MassIntentionItem['requestType'])
                  }
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                >
                  <option value="Thanksgiving Mass">Thanksgiving Mass</option>
                  <option value="Birthday Intention">Birthday Intention</option>
                  <option value="Wedding Anniversary">Wedding Anniversary</option>
                  <option value="Death Anniversary">Death Anniversary</option>
                  <option value="Repose of the Soul">Repose of the Soul</option>
                  <option value="Special Intention">Special Intention</option>
                  <option value="Health & Healing">Health & Healing</option>
                  <option value="Examination">Examination Intention</option>
                  <option value="Family Blessing">Family Blessing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Person / Family Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  />
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Intention Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Intention Details & Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional prayer details..."
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Preferred Mass Date *
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
                    Preferred Time Slot *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  >
                    <option value="06:30 AM">06:30 AM (Morning Mass)</option>
                    <option value="06:00 PM">06:00 PM (Evening Mass)</option>
                    <option value="08:00 AM">08:00 AM (Sunday Second Mass)</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Mass Language *
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'English' | 'Tamil')}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  >
                    <option value="Tamil">Tamil (தமிழ்)</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>

              {/* Auto-filled Contact */}
              <div className="bg-muted/40 border-border/60 space-y-2 rounded-2xl border p-3">
                <span className="text-muted-foreground text-[10px] font-bold uppercase">
                  Contact Information (Auto-Filled from Profile)
                </span>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">
                      Family Code & Name
                    </span>
                    <span className="font-bold">
                      {family.familyNumber} — {family.name}
                    </span>
                  </div>
                  <div>
                    <label className="text-muted-foreground block text-[10px] font-bold">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="bg-background w-full rounded-lg border p-1.5 font-bold outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Razorpay Offering Box */}
              <div className="border-gold-400/40 bg-gold-500/10 flex items-center justify-between rounded-2xl border p-4">
                <div>
                  <span className="text-gold-300 block font-bold">Suggested Mass Offering</span>
                  <span className="text-muted-foreground text-[11px]">
                    Secure Online Payment via Razorpay
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-heading text-foreground text-2xl font-black">₹100</span>
                </div>
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
                  disabled={isProcessingPayment}
                  className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-2.5 font-black text-slate-950 shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>
                    {isProcessingPayment ? 'Processing Razorpay...' : 'Pay ₹100 & Submit Intention'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

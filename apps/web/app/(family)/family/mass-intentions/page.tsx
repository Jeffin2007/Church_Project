'use client';

import { useState } from 'react';
import { Church, CreditCard, Plus, CheckCircle2, ShieldCheck, Heart, Calendar } from 'lucide-react';
import { useFamily, MassIntentionItem } from '@/context/family-context';
import { PaymentModal, PaymentSummaryRequest } from '@/components/payments/payment-modal';
import {
  PrintableReceiptModal,
  PaymentReceiptDetails,
} from '@/components/payments/printable-receipt-modal';

export default function FamilyMassIntentionsPage() {
  const { massIntentions, addMassIntention, family } = useFamily();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<PaymentReceiptDetails | null>(null);

  // Form State
  const [requestType, setRequestType] =
    useState<MassIntentionItem['requestType']>('Thanksgiving Mass');
  const [personName, setPersonName] = useState(family.headName || 'Joseph Anthony');
  const [title, setTitle] = useState('Thanksgiving for Family Intentions');
  const [description, setDescription] = useState(
    'Special intention offered for family peace, divine protection, and health.',
  );
  const [preferredDate, setPreferredDate] = useState('2026-08-20');
  const [preferredTime, setPreferredTime] = useState('06:30 AM');
  const [language, setLanguage] = useState<'English' | 'Tamil'>('Tamil');
  const [mobileNumber, setMobileNumber] = useState(family.headPhone || '+91 98765 43210');
  const [offeringAmount, setOfferingAmount] = useState(100);

  // Current Form Summary to pass into Checkout Modal
  const [pendingPayment, setPendingPayment] = useState<PaymentSummaryRequest | null>(null);

  const handleOpenCheckoutPreview = (e: React.FormEvent) => {
    e.preventDefault();
    const summary: PaymentSummaryRequest = {
      category: 'Mass Intention Offering',
      purpose: `${requestType}: ${title} (${personName})`,
      amount: offeringAmount,
      familyNumber: family.familyNumber,
      familyName: family.name,
      headName: personName,
      contactPhone: mobileNumber,
      contactEmail: family.headEmail,
    };
    setPendingPayment(summary);
    setIsCheckoutModalOpen(true);
  };

  const handlePaymentSuccess = (result: {
    receiptNumber: string;
    transactionId: string;
    razorpayPaymentId: string;
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => {
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
      offeringAmount: result.amount,
      paymentStatus: 'PAID',
      transactionId: result.razorpayPaymentId,
    };

    addMassIntention(newItem, result.receiptNumber);

    // Show printable receipt modal
    setActiveReceipt({
      receiptNumber: result.receiptNumber,
      transactionId: result.transactionId,
      razorpayPaymentId: result.razorpayPaymentId,
      date: result.date,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      amount: result.amount,
      category: result.category,
      description: result.description,
      familyNumber: family.familyNumber,
      familyName: family.name,
      headName: personName,
      headPhone: mobileNumber,
      status: 'CONFIRMED & PAID',
    });

    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Reverent Header */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Church className="h-4 w-4 text-amber-700 dark:text-amber-400" /> Digital Parish Services · Eucharistic Intentions
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Mass Intentions & Offerings
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Request Holy Mass intentions for thanksgiving, birthdays, anniversaries, or repose of
            departed souls.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>+ Request Mass Intention (₹100)</span>
        </button>
      </div>

      {/* Reverent Banner Explanation */}
      <div className="border-amber-500/30 bg-amber-500/10 space-y-3 rounded-3xl border-2 p-6 text-xs shadow-xl">
        <div className="flex items-center gap-2.5">
          <Heart className="text-amber-700 dark:text-amber-400 h-5 w-5 shrink-0" />
          <h3 className="font-heading text-foreground text-base font-bold">
            Sacred Tradition of Holy Mass Intentions
          </h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          The suggested Mass intention offering of <strong className="text-amber-900 dark:text-amber-300 font-bold">₹100</strong>{' '}
          is a traditional parish contribution toward the altar supplies, bread, wine, church
          maintenance, and clergy pastoral support. In the Catholic Church, offering a Mass is a
          sacred act of prayer for your family, loved ones, or departed souls.
        </p>
      </div>

      {/* Mass Intentions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-foreground flex items-center gap-2 text-xl font-bold">
            <Calendar className="text-amber-700 dark:text-amber-400 h-5 w-5" /> Your Family Mass Intention Requests
          </h2>
          <span className="text-muted-foreground text-xs font-bold">
            Total Requests: {massIntentions.length}
          </span>
        </div>

        {massIntentions.length === 0 ? (
          <div className="bg-card border-border/80 text-muted-foreground space-y-3 rounded-3xl border-2 p-12 text-center text-xs">
            <Church className="text-amber-700 dark:text-amber-400 mx-auto h-10 w-10 opacity-75" />
            <p className="text-foreground text-sm font-bold">No Mass Intentions Submitted Yet</p>
            <p>
              Click the button above to request a Holy Mass intention with Razorpay online payment.
            </p>
          </div>
        ) : (
          massIntentions.map((item) => (
            <div
              key={item.id}
              className="border-border/80 bg-card hover:border-amber-500/60 flex flex-wrap items-center justify-between gap-4 rounded-3xl border-2 p-6 shadow-xl transition-all"
            >
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-primary/10 text-primary rounded-md px-2.5 py-0.5 text-[10px] font-bold">
                    {item.id}
                  </span>
                  <span className="border-amber-500/40 bg-amber-500/15 text-amber-900 dark:text-amber-300 rounded-md border px-2 py-0.5 text-[10px] font-bold">
                    {item.requestType}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-900 dark:text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" /> {item.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <h3 className="font-heading text-foreground text-lg font-bold">
                  {item.title} — <span className="text-gold-300">{item.personName}</span>
                </h3>
                <p className="text-muted-foreground text-xs font-medium">
                  Details: {item.description} · Language:{' '}
                  <strong className="text-foreground">{item.language}</strong>
                </p>
                <p className="text-muted-foreground text-[11px]">
                  Scheduled Date: <strong>{item.preferredDate}</strong> ({item.preferredTime}) ·
                  Razorpay Txn:{' '}
                  <span className="font-mono font-bold text-amber-400">{item.transactionId}</span>
                </p>
              </div>

              <div className="bg-muted/40 border-border/60 shrink-0 rounded-2xl border p-4 text-right text-xs">
                <span className="text-gold-300 block text-[10px] font-extrabold uppercase tracking-widest">
                  Mass Offering
                </span>
                <span className="font-heading text-foreground text-2xl font-black">
                  ₹{item.offeringAmount}
                </span>
                <span className="mt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" /> Razorpay Verified
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Request Mass Intention Modal Form */}
      {isModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground max-h-[88vh] w-full max-w-xl space-y-6 overflow-y-auto rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground flex items-center gap-2 text-xl font-bold">
                  <Church className="text-gold-400 h-5 w-5" /> Request Holy Mass Intention
                </h3>
                <p className="text-muted-foreground text-xs">
                  Suggested Mass Offering: <strong className="text-gold-300 font-bold">₹100</strong>{' '}
                  (Official Razorpay Gateway)
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

            <form onSubmit={handleOpenCheckoutPreview} className="space-y-4 text-xs">
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
                  Intention Details & Prayer Request
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
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
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

              {/* Offering Amount Field */}
              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Suggested Mass Offering (₹) *
                </label>
                <input
                  type="number"
                  required
                  min={10}
                  value={offeringAmount}
                  onChange={(e) => setOfferingAmount(parseInt(e.target.value) || 100)}
                  className="bg-background focus:ring-primary font-heading text-foreground w-full rounded-xl border p-2.5 text-xl font-bold outline-none focus:ring-2"
                />
              </div>

              {/* Contact Info */}
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
                      Mobile Contact Number
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

              {/* Offering Box */}
              <div className="border-gold-400/40 bg-gold-500/10 flex items-center justify-between rounded-2xl border p-4">
                <div>
                  <span className="text-gold-300 block font-bold">Total Mass Offering</span>
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" /> Secure Online Payment via
                    Official Razorpay
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-heading text-foreground text-2xl font-black">
                    ₹{offeringAmount}
                  </span>
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
                  className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-2.5 font-black text-slate-950 shadow-lg transition-all hover:scale-105"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Proceed to Razorpay Checkout (₹{offeringAmount})</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Razorpay Payment Checkout Modal */}
      {pendingPayment && (
        <PaymentModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          paymentDetails={pendingPayment}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Printable Digital Receipt Modal */}
      <PrintableReceiptModal receipt={activeReceipt} onClose={() => setActiveReceipt(null)} />
    </div>
  );
}

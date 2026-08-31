'use client';

import { useState } from 'react';
import { CreditCard, Download, TrendingUp, Heart, Lock, ArrowRight } from 'lucide-react';
import { useFamily, CategorizedPaymentItem } from '@/context/family-context';
import { PaymentModal, PaymentSummaryRequest } from '@/components/payments/payment-modal';
import {
  PrintableReceiptModal,
  PaymentReceiptDetails,
} from '@/components/payments/printable-receipt-modal';

export default function FamilyPaymentsPage() {
  const { payments, addPayment, family } = useFamily();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<PaymentReceiptDetails | null>(null);

  // Direct Offertory Amount State
  const [amount, setAmount] = useState<number>(500);
  const [customAmountInput, setCustomAmountInput] = useState<string>('500');
  const [offeringNote, setOfferingNote] = useState<string>(
    'Sunday Parish Offertory & Thanksgiving',
  );

  // Payment summary passed to checkout gateway modal
  const [pendingPayment, setPendingPayment] = useState<PaymentSummaryRequest | null>(null);

  const totalGiving = payments.reduce((acc, curr) => acc + curr.amount, 0);

  const quickAmounts = [100, 250, 500, 1000, 2000, 5000];

  const handleSelectQuickAmount = (val: number) => {
    setAmount(val);
    setCustomAmountInput(val.toString());
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmountInput(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  const handleProceedToGateway = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 10) {
      alert('Please enter a valid offering amount of at least ₹10.');
      return;
    }

    const summary: PaymentSummaryRequest = {
      category: 'Parish Offertory',
      purpose: offeringNote.trim() || 'Parish Offertory & Contribution',
      amount,
      familyNumber: family.familyNumber,
      familyName: family.name,
      headName: family.headName,
      contactPhone: family.headPhone,
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
    // Record to family context
    addPayment({
      category: result.category as CategorizedPaymentItem['category'],
      description: result.description,
      amount: result.amount,
      date: result.date,
      status: 'PAID',
      receiptNumber: result.receiptNumber,
    });

    // Display instant verified receipt modal
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
      headName: family.headName,
      headPhone: family.headPhone,
      status: 'VERIFIED & PAID',
    });
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Top Header */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            <CreditCard className="h-4 w-4 text-amber-700 dark:text-amber-400" /> Parish Finance ·
            Offertory Portal
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Pay Parish Offertory
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Direct and secure online offertory giving for {family.name} ({family.familyNumber})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="border-border/80 bg-card text-foreground inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold shadow-sm">
            <Lock className="text-primary h-3.5 w-3.5" /> 256-Bit Razorpay Secured
          </span>
        </div>
      </div>

      {/* Main Grid: Direct Offertory Pay Card & Stats */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column (2 Cols): Single Direct Pay Offertory Form */}
        <div className="space-y-6 lg:col-span-2">
          <div className="border-gold-400/40 bg-card relative overflow-hidden rounded-3xl border-2 p-6 shadow-2xl sm:p-8">
            <div className="border-border/60 flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl font-bold">
                  <Heart className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-heading text-foreground text-xl font-black">
                    Enter Offertory Amount
                  </h2>
                  <p className="text-muted-foreground text-xs font-medium">
                    Choose or enter your offering amount to proceed directly to the payment gateway
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleProceedToGateway} className="mt-6 space-y-6">
              {/* Quick Amount Selectors */}
              <div>
                <label className="text-muted-foreground mb-2 block text-xs font-bold uppercase tracking-wider">
                  Quick Offering Amounts
                </label>
                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                  {quickAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleSelectQuickAmount(val)}
                      className={`rounded-2xl border-2 py-3 text-center text-sm font-black transition-all ${
                        amount === val
                          ? 'border-primary bg-primary/15 text-primary scale-105 shadow-md'
                          : 'border-border/80 bg-muted/30 text-foreground hover:bg-muted/60 hover:border-primary/40'
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-bold">
                  Offering Amount (₹) *
                </label>
                <div className="relative">
                  <span className="text-muted-foreground absolute left-4 top-3 text-lg font-black">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="10"
                    step="1"
                    required
                    value={customAmountInput}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount (e.g. 500)"
                    className="bg-background focus:ring-primary w-full rounded-2xl border-2 py-3 pl-9 pr-4 text-xl font-black outline-none focus:ring-2"
                  />
                </div>
              </div>

              {/* Optional Offering Intention Note */}
              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-bold">
                  Offering Purpose / Note (Optional)
                </label>
                <input
                  type="text"
                  value={offeringNote}
                  onChange={(e) => setOfferingNote(e.target.value)}
                  placeholder="e.g. Sunday Parish Offertory, Family Thanksgiving..."
                  className="bg-background focus:ring-primary w-full rounded-2xl border p-3 text-xs font-semibold outline-none focus:ring-2"
                />
              </div>

              {/* Summary Breakdown */}
              <div className="bg-muted/40 border-border/80 space-y-2 rounded-2xl border p-4 text-xs">
                <div className="text-muted-foreground flex justify-between font-medium">
                  <span>Offering Contributor</span>
                  <span className="text-foreground font-bold">
                    {family.headName} ({family.familyNumber})
                  </span>
                </div>
                <div className="text-muted-foreground flex justify-between font-medium">
                  <span>Parish Unit</span>
                  <span className="text-foreground font-bold">{family.anbiyam}</span>
                </div>
                <div className="border-border/60 text-foreground flex justify-between border-t pt-2 text-sm font-black">
                  <span>Total Payable Amount</span>
                  <span className="text-primary font-mono text-base">₹{amount}</span>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="from-gold-400 via-gold-500 to-gold-600 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r py-4 text-sm font-black text-slate-950 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95"
              >
                <span>Proceed to Payment Gateway</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Giving Summary Metrics */}
        <div className="space-y-6">
          {/* Total Giving Stat Card */}
          <div className="space-y-2 rounded-3xl border-2 border-amber-500/40 bg-amber-500/10 p-6 shadow-xl">
            <span className="block text-[10px] font-extrabold uppercase tracking-widest text-amber-400 dark:text-amber-300">
              Total Recorded Giving
            </span>
            <h3 className="font-heading text-foreground text-3xl font-black">₹{totalGiving}</h3>
            <p className="text-muted-foreground text-xs font-medium">
              Verified online & recorded offertory payments for {family.name}
            </p>
          </div>

          {/* Giving Progress Card */}
          <div className="border-border/80 bg-card space-y-4 rounded-3xl border-2 p-6 shadow-xl">
            <div className="text-primary flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="h-4 w-4" /> 2026 Parish Giving
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-bold">
                <span>Completed Contributions</span>
                <span className="text-primary font-mono font-bold">{payments.length} Receipts</span>
              </div>
              <div className="bg-muted h-2.5 w-full overflow-hidden rounded-full">
                <div className="from-gold-500 h-2.5 w-4/5 rounded-full bg-gradient-to-r to-amber-400"></div>
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                All offertory transactions receive an official digitally signed and verifiable
                parish receipt instantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Offertory Payment Records Table */}
      <div className="border-border/80 bg-card overflow-hidden rounded-3xl border-2 shadow-xl">
        <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b p-6">
          <div>
            <h3 className="font-heading text-foreground text-lg font-bold">
              Family Offertory Receipts & History
            </h3>
            <p className="text-muted-foreground text-xs">
              Complete log of all verified digital payments made by your family
            </p>
          </div>
          <span className="bg-primary/10 text-primary rounded-xl px-3 py-1.5 text-xs font-bold">
            {payments.length} Payments Recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-muted/80 text-muted-foreground border-b text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="p-4">Receipt No.</th>
                <th className="p-4">Date</th>
                <th className="p-4">Purpose / Note</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Official Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                  <td className="text-primary p-4 font-mono font-bold">
                    {p.receiptNumber || 'RCP-VERIFIED'}
                  </td>
                  <td className="p-4">{p.date}</td>
                  <td className="text-foreground p-4 font-semibold">{p.description}</td>
                  <td className="p-4 font-mono text-sm font-bold text-emerald-800 dark:text-emerald-400">
                    ₹{p.amount}
                  </td>
                  <td className="p-4">
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-[10px] font-black uppercase text-emerald-400">
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveReceipt({
                          receiptNumber: p.receiptNumber || 'RCP-ONLINE',
                          transactionId: p.id,
                          razorpayPaymentId: `pay_${p.id}`,
                          date: p.date,
                          time: '10:00 AM',
                          amount: p.amount,
                          category: p.category,
                          description: p.description,
                          familyNumber: family.familyNumber,
                          familyName: family.name,
                          headName: family.headName,
                          headPhone: family.headPhone,
                          status: 'VERIFIED & PAID',
                        })
                      }
                      className="border-border hover:bg-primary/10 hover:text-primary hover:border-primary/40 inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>View Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gateway Checkout Modal */}
      {isCheckoutModalOpen && pendingPayment && (
        <PaymentModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          paymentDetails={pendingPayment}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Verified Printable Receipt Modal */}
      {activeReceipt && (
        <PrintableReceiptModal onClose={() => setActiveReceipt(null)} receipt={activeReceipt} />
      )}
    </div>
  );
}

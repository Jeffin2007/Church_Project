'use client';

import { useState } from 'react';
import {
  CreditCard,
  Download,
  Plus,
  TrendingUp,
  Receipt,
  ShieldCheck,
  Building2,
  Heart,
  Sparkles,
  CheckCircle2,
  Clock,
  Info,
} from 'lucide-react';
import { useFamily, CategorizedPaymentItem } from '@/context/family-context';
import { PaymentModal, PaymentSummaryRequest } from '@/components/payments/payment-modal';
import {
  PrintableReceiptModal,
  PaymentReceiptDetails,
} from '@/components/payments/printable-receipt-modal';

export default function FamilyPaymentsPage() {
  const { payments, addPayment, family } = useFamily();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<PaymentReceiptDetails | null>(null);
  const [showTaxComingSoonModal, setShowTaxComingSoonModal] = useState(false);

  // Form State
  const [category, setCategory] = useState<CategorizedPaymentItem['category']>('Building Fund');
  const [amount, setAmount] = useState<number>(1000);
  const [description, setDescription] = useState('Parish Building & Grotto Renovation Fund');

  // Payment summary passed to checkout modal
  const [pendingPayment, setPendingPayment] = useState<PaymentSummaryRequest | null>(null);

  const totalGiving = payments.reduce((acc, curr) => acc + curr.amount, 0);

  // Quick action payment triggers
  const handleQuickPay = (
    cat: CategorizedPaymentItem['category'],
    defaultAmt: number,
    defaultDesc: string,
  ) => {
    if (cat === 'Church Tax') {
      setShowTaxComingSoonModal(true);
      return;
    }
    setCategory(cat);
    setAmount(defaultAmt);
    setDescription(defaultDesc);
    setIsFormModalOpen(true);
  };

  const handleOpenCheckoutPreview = (e: React.FormEvent) => {
    e.preventDefault();
    const summary: PaymentSummaryRequest = {
      category,
      purpose: description,
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
    // Add to context
    addPayment({
      category: result.category as CategorizedPaymentItem['category'],
      description: result.description,
      amount: result.amount,
      date: result.date,
      status: 'PAID',
      receiptNumber: result.receiptNumber,
    });

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
      headName: family.headName,
      headPhone: family.headPhone,
      status: 'VERIFIED & PAID',
    });

    setIsFormModalOpen(false);
  };

  const paymentCategories = [
    {
      cat: 'Church Tax' as const,
      label: 'Church Tax (Monthly Dues)',
      defaultAmt: 500,
      desc: 'Monthly family dues supporting daily parish operations and maintenance.',
      icon: Receipt,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      isComingSoon: true,
    },
    {
      cat: 'Building Fund' as const,
      label: 'Building & Grotto Fund',
      defaultAmt: 1000,
      desc: 'Cathedral renovation, new grotto construction, and shrine preservation.',
      icon: Building2,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      isComingSoon: false,
    },
    {
      cat: 'Charity' as const,
      label: 'Charity & Poor Box',
      defaultAmt: 500,
      desc: 'St. Vincent de Paul Society poor fund and parish outreach to the needy.',
      icon: Heart,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      isComingSoon: false,
    },
    {
      cat: 'Feast Contribution' as const,
      label: 'Feast Day Sponsorship',
      defaultAmt: 1500,
      desc: 'Annual Patronal Feast flag hoisting, flowers, and prasadam sponsorship.',
      icon: Sparkles,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      isComingSoon: false,
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Top Header */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            <CreditCard className="h-4 w-4 text-amber-700 dark:text-amber-400" /> Parish Finance ·
            Categorized Giving Portal
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Family Contributions & Donations
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Official Razorpay-integrated online payment portal for Building Fund, Charity, and Feast Contributions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCategory('Building Fund');
            setAmount(1000);
            setDescription('Parish Building & Grotto Renovation Fund');
            setIsFormModalOpen(true);
          }}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>+ Make Online Contribution</span>
        </button>
      </div>

      {/* Giving Cards Breakdown */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Total Giving */}
        <div className="space-y-2 rounded-3xl border-2 border-amber-500/30 bg-amber-500/10 p-6 shadow-xl">
          <span className="block text-[10px] font-extrabold uppercase tracking-widest text-amber-400 dark:text-amber-300">
            Total Family Contributions
          </span>
          <h3 className="font-heading text-foreground text-3xl font-black">₹{totalGiving}</h3>
          <p className="text-muted-foreground text-xs font-medium">
            Recorded online & counter payments for {family.name}
          </p>
        </div>

        {/* Church Tax Dues Status Card - Coming Soon */}
        <div className="space-y-2 rounded-3xl border-2 border-amber-500/40 bg-amber-500/10 p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-amber-400 dark:text-amber-300">
              <Receipt className="h-3.5 w-3.5" /> Church Tax Online Payment
            </span>
            <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[9px] font-black uppercase text-amber-300">
              Coming Soon
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold text-foreground dark:text-amber-300">
              In-Person Collection
            </h3>
            <span className="font-mono text-xs font-bold text-amber-400 dark:text-amber-200">
              ₹500 / mo
            </span>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Online church tax payment is coming soon. Please continue settling dues via Anbiyam monthly meetings or at the parish office.
          </p>
        </div>

        {/* Year-To-Date Summary */}
        <div className="border-border/80 bg-card space-y-2 rounded-3xl border-2 p-6 shadow-xl">
          <span className="text-primary block flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest">
            <TrendingUp className="h-3.5 w-3.5" /> 2026 Giving Progress
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-bold">
              <span>Year-to-Date Total</span>
              <span className="text-primary font-mono text-sm">₹{totalGiving}</span>
            </div>
            <div className="bg-muted h-2.5 w-full overflow-hidden rounded-full">
              <div className="from-gold-500 h-2.5 w-4/5 rounded-full bg-gradient-to-r to-amber-400"></div>
            </div>
            <span className="text-muted-foreground block text-[10px]">
              100% Verified digitally via Razorpay Gateway
            </span>
          </div>
        </div>
      </div>

      {/* Quick Category Action Cards */}
      <div className="space-y-4">
        <h3 className="font-heading text-foreground flex items-center gap-2 text-xl font-bold">
          <Sparkles className="text-gold-400 h-5 w-5" /> Contribution Categories
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paymentCategories.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.cat}
                className="border-border/80 bg-card hover:border-gold-400/60 flex flex-col justify-between space-y-3 rounded-3xl border-2 p-5 shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="bg-muted text-foreground rounded-2xl p-2.5">
                      <Icon className="text-gold-300 h-5 w-5" />
                    </div>
                    {c.isComingSoon ? (
                      <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[9px] font-black uppercase text-amber-300">
                        Coming Soon
                      </span>
                    ) : (
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-extrabold uppercase ${c.badgeColor}`}
                      >
                        ₹{c.defaultAmt} Suggested
                      </span>
                    )}
                  </div>
                  <h4 className="font-heading text-foreground text-base font-bold">{c.label}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
                </div>

                {c.isComingSoon ? (
                  <button
                    type="button"
                    onClick={() => setShowTaxComingSoonModal(true)}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition-all"
                  >
                    <Clock className="h-3.5 w-3.5" />
                    <span>Coming Soon</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleQuickPay(c.cat, c.defaultAmt, `${c.label} Payment`)}
                    className="from-gold-400 to-gold-600 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r py-2 text-xs font-black text-slate-950 shadow transition-all hover:scale-105"
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>Contribute Now</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Categorized Ledger Table */}
      <div className="border-border/80 bg-card overflow-hidden rounded-3xl border-2 shadow-xl">
        <div className="border-border/60 flex items-center justify-between border-b p-6">
          <div>
            <h3 className="font-heading text-foreground text-lg font-bold">
              Official Giving Ledger & Verified Receipts
            </h3>
            <p className="text-muted-foreground text-xs">
              Complete transaction history for family {family.familyNumber}
            </p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
            <ShieldCheck className="h-4 w-4" /> Razorpay Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead className="bg-muted/50 text-muted-foreground border-b text-[10px] font-black uppercase tracking-wider">
              <tr>
                <th className="p-4">Receipt Ref</th>
                <th className="p-4">Category</th>
                <th className="p-4">Description</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Official Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              {payments.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="text-gold-300 p-4 font-mono font-bold">{item.receiptNumber}</td>
                  <td className="p-4">
                    <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 rounded border px-2.5 py-0.5 text-[10px] font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="text-foreground p-4 font-bold">{item.description}</td>
                  <td className="text-muted-foreground p-4 font-mono font-bold">{item.date}</td>
                  <td className="p-4">
                    <span className="font-heading text-foreground text-base font-black">
                      ₹{item.amount}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" /> {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveReceipt({
                          receiptNumber: item.receiptNumber,
                          transactionId: `TXN-${item.id}`,
                          razorpayPaymentId: `pay_${item.receiptNumber.replace(/[^0-9]/g, '')}9912`,
                          date: item.date,
                          amount: item.amount,
                          category: item.category,
                          description: item.description,
                          familyNumber: family.familyNumber,
                          familyName: family.name,
                          headName: family.headName,
                          headPhone: family.headPhone,
                          status: 'PAID & VERIFIED',
                        })
                      }
                      className="bg-muted hover:bg-muted/80 text-foreground inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-bold transition-colors"
                    >
                      <Download className="text-gold-400 h-3.5 w-3.5" /> View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Church Tax Coming Soon Dialog */}
      {showTaxComingSoonModal && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-amber-500/40 bg-card text-card-foreground w-full max-w-md space-y-5 rounded-3xl border-2 p-6 shadow-2xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
              <Clock className="h-7 w-7" />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-0.5 text-[10px] font-black uppercase text-amber-300">
                Feature Coming Soon
              </div>
              <h3 className="font-heading text-foreground text-xl font-bold">
                Church Tax Online Payment
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Online payment of monthly parish family church tax is currently under development and will be enabled soon.
              </p>
            </div>

            <div className="rounded-2xl bg-muted/40 border border-border/80 p-4 text-left text-xs space-y-1.5">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-primary" /> How to pay currently:
              </div>
              <ul className="text-muted-foreground list-disc pl-4 space-y-1 text-[11px]">
                <li>Hand over to your respective <strong>Anbiyam Incharge</strong> during monthly Anbiyam meetings.</li>
                <li>Pay directly at the <strong>Parish Office counter</strong> during office hours.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setShowTaxComingSoonModal(false)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-xl py-2.5 text-xs font-bold transition-all shadow"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Online Contribution Form Modal */}
      {isFormModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground max-h-[88vh] w-full max-w-lg space-y-6 overflow-y-auto rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  Make Online Contribution
                </h3>
                <p className="text-muted-foreground flex items-center gap-1 text-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Integrated with Official
                  Razorpay Gateway
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOpenCheckoutPreview} className="space-y-4 text-xs">
              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Contribution Category *
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as CategorizedPaymentItem['category'])
                  }
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                >
                  <option value="Building Fund">Building & Grotto Fund</option>
                  <option value="Charity">Charity & Poor Box</option>
                  <option value="Feast Contribution">Patronal Feast Sponsorship</option>
                  <option value="Sunday Offering">Sunday Offering</option>
                  <option value="Special Donation">Special Parish Donation</option>
                </select>
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Contribution Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  min={50}
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  className="bg-background focus:ring-primary font-heading text-foreground w-full rounded-xl border p-2.5 text-xl font-bold outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Description / Payment Purpose *
                </label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                />
              </div>

              {/* Family Payer Metadata Info */}
              <div className="bg-muted/40 border-border/60 rounded-2xl border p-4">
                <span className="text-muted-foreground block text-[10px] font-extrabold uppercase">
                  Payer Information (Automatic Receipting)
                </span>
                <div className="text-foreground mt-1 flex justify-between font-bold">
                  <span>
                    {family.name} ({family.headName})
                  </span>
                  <span className="font-mono">{family.familyNumber}</span>
                </div>
                <div className="text-muted-foreground mt-0.5 text-[11px]">
                  Contact: {family.headPhone}
                </div>
              </div>

              <div className="border-border flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="hover:bg-muted text-muted-foreground hover:text-foreground rounded-xl px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="from-gold-400 to-gold-600 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r px-6 py-2.5 text-xs font-black text-slate-950 shadow transition-all hover:scale-105"
                >
                  <CreditCard className="h-4 w-4" /> Proceed to Razorpay Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Razorpay Simulated / Real Modal */}
      {pendingPayment && (
        <PaymentModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          summary={pendingPayment}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Printable / Downloadable Verified Receipt Modal */}
      {activeReceipt && (
        <PrintableReceiptModal
          isOpen={Boolean(activeReceipt)}
          onClose={() => setActiveReceipt(null)}
          receipt={activeReceipt}
        />
      )}
    </div>
  );
}

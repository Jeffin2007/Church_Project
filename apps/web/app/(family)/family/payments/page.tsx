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

  // Form State
  const [category, setCategory] = useState<CategorizedPaymentItem['category']>('Church Tax');
  const [amount, setAmount] = useState<number>(500);
  const [description, setDescription] = useState('August 2026 Monthly Family Parish Tax Dues');

  // Payment summary passed to checkout modal
  const [pendingPayment, setPendingPayment] = useState<PaymentSummaryRequest | null>(null);

  const totalGiving = payments.reduce((acc, curr) => acc + curr.amount, 0);

  // Quick action payment triggers
  const handleQuickPay = (
    cat: CategorizedPaymentItem['category'],
    defaultAmt: number,
    defaultDesc: string,
  ) => {
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
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      cat: 'Building Fund' as const,
      label: 'Building & Grotto Fund',
      defaultAmt: 1000,
      desc: 'Cathedral renovation, new grotto construction, and shrine preservation.',
      icon: Building2,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      cat: 'Charity' as const,
      label: 'Charity & Poor Box',
      defaultAmt: 500,
      desc: 'St. Vincent de Paul Society poor fund and parish outreach to the needy.',
      icon: Heart,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      cat: 'Feast Contribution' as const,
      label: 'Feast Day Sponsorship',
      defaultAmt: 1500,
      desc: 'Annual Patronal Feast flag hoisting, flowers, and prasadam sponsorship.',
      icon: Sparkles,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Top Header */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <CreditCard className="text-amber-700 dark:text-amber-400 h-4 w-4" /> Parish Finance · Categorized Giving
            Portal
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Family Dues & Online Contributions
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Official Razorpay-integrated online payment portal for Church Tax, Building Fund,
            Charity, and Feast Contributions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCategory('Church Tax');
            setAmount(500);
            setDescription('Monthly Family Parish Dues Payment');
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
        <div className="border-amber-500/30 bg-amber-500/10 space-y-2 rounded-3xl border-2 p-6 shadow-xl">
          <span className="text-amber-900 dark:text-amber-300 block text-[10px] font-extrabold uppercase tracking-widest">
            Total Family Contributions
          </span>
          <h3 className="font-heading text-foreground text-3xl font-black">₹{totalGiving}</h3>
          <p className="text-muted-foreground text-xs font-medium">
            Recorded online & counter payments for {family.name}
          </p>
        </div>

        {/* Church Tax Dues Status Card */}
        <div className="space-y-2 rounded-3xl border-2 border-emerald-500/40 bg-emerald-500/10 p-6 shadow-xl">
          <span className="block flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-emerald-900 dark:text-emerald-300">
            <Receipt className="h-3.5 w-3.5" /> Church Tax Dues Status
          </span>
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold text-emerald-900 dark:text-emerald-300">✓ Dues Up-To-Date</h3>
            <span className="font-mono text-xs font-bold text-emerald-950 dark:text-emerald-200">₹500 / mo</span>
          </div>
          <p className="text-muted-foreground text-xs">
            August 2026 Family Tax Paid · Outstanding:{' '}
            <strong className="text-emerald-900 dark:text-emerald-300">₹0</strong>
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
              <span className="text-amber-900 dark:text-amber-300">₹{totalGiving}</span>
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
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-extrabold uppercase ${c.badgeColor}`}
                    >
                      ₹{c.defaultAmt} Suggested
                    </span>
                  </div>
                  <h4 className="font-heading text-foreground text-base font-bold">{c.label}</h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickPay(c.cat, c.defaultAmt, `${c.label} Payment`)}
                  className="from-gold-400 to-gold-600 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r py-2 text-xs font-black text-slate-950 shadow transition-all hover:scale-105"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Pay {c.label}</span>
                </button>
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
                  <option value="Church Tax">Church Tax (Monthly Family Dues)</option>
                  <option value="Sunday Offering">Sunday Offering</option>
                  <option value="Building Fund">Building & Grotto Fund</option>
                  <option value="Charity">Charity & Poor Box</option>
                  <option value="Feast Contribution">Patronal Feast Sponsorship</option>
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

              <div className="border-border flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="border-border rounded-xl border px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="from-gold-400 to-gold-600 rounded-xl bg-gradient-to-r px-5 py-2.5 font-black text-slate-950 shadow transition-all hover:scale-105"
                >
                  Proceed to Razorpay (₹{amount})
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

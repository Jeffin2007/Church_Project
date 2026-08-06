'use client';

import { useState } from 'react';
import { CreditCard, Download, Plus, TrendingUp, Receipt } from 'lucide-react';
import { useFamily, CategorizedPaymentItem } from '@/context/family-context';

export default function FamilyPaymentsPage() {
  const { payments, addPayment, family } = useFamily();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<CategorizedPaymentItem | null>(null);

  // Form State
  const [category, setCategory] = useState<CategorizedPaymentItem['category']>('Church Tax');
  const [amount, setAmount] = useState<number>(500);
  const [description, setDescription] = useState('Monthly Family Parish Dues Payment');

  const totalGiving = payments.reduce((acc, curr) => acc + curr.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPayment({
      category,
      description,
      amount,
      date: new Date().toISOString().slice(0, 10),
      status: 'PAID',
    });
    setIsModalOpen(false);
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <CreditCard className="h-4 w-4" /> Parish Finance · Categorized Giving
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Family Donations & Dues History
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Categorized records for Church Tax, Sunday Offering, Building Fund, Charity, and Feast
            Contributions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>+ Make Online Contribution</span>
        </button>
      </div>

      {/* Giving Summary Cards & Breakdown */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="border-gold-400/40 bg-gold-500/10 space-y-2 rounded-3xl border-2 p-6 shadow-xl">
          <span className="text-gold-300 block text-[10px] font-extrabold uppercase tracking-widest">
            Total Family Giving
          </span>
          <h3 className="font-heading text-foreground text-3xl font-black">₹{totalGiving}</h3>
          <p className="text-muted-foreground text-xs">
            Total contributions recorded for {family.name}
          </p>
        </div>

        <div className="border-border/80 bg-card space-y-2 rounded-3xl border-2 p-6 shadow-xl">
          <span className="text-primary block flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest">
            <TrendingUp className="h-3.5 w-3.5" /> Yearly Giving Breakdown
          </span>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between font-bold">
              <span>2026 Year-to-Date</span>
              <span className="text-emerald-400">₹{totalGiving}</span>
            </div>
            <div className="bg-muted h-2 w-full rounded-full">
              <div className="h-2 w-3/4 rounded-full bg-emerald-500"></div>
            </div>
          </div>
        </div>

        <div className="border-border/80 bg-card space-y-2 rounded-3xl border-2 p-6 shadow-xl">
          <span className="text-primary block flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest">
            <Receipt className="h-3.5 w-3.5" /> Active Dues Status
          </span>
          <h3 className="font-heading text-xl font-bold text-emerald-400">✓ Dues Up-To-Date</h3>
          <p className="text-muted-foreground text-xs">August 2026 Family Tax Paid</p>
        </div>
      </div>

      {/* Categorized Payments List */}
      <div className="border-border/80 bg-card overflow-hidden rounded-3xl border-2 shadow-xl">
        <div className="border-border/60 border-b p-6">
          <h3 className="font-heading text-foreground text-lg font-bold">
            Giving Ledger & Receipts
          </h3>
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
                <th className="p-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              {payments.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="text-primary p-4 font-bold">{item.receiptNumber}</td>
                  <td className="p-4">
                    <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 rounded px-2.5 py-0.5 text-[10px] font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="text-foreground p-4 font-bold">{item.description}</td>
                  <td className="text-muted-foreground p-4 font-bold">{item.date}</td>
                  <td className="p-4">
                    <span className="font-heading text-foreground text-base font-black">
                      ₹{item.amount}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-400">
                      ✓ {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedReceipt(item)}
                      className="bg-muted hover:bg-muted/80 inline-flex items-center gap-1 rounded-xl px-3 py-1.5 font-bold"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Online Contribution Modal */}
      {isModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground max-h-[88vh] w-full max-w-lg space-y-6 overflow-y-auto rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  Make Online Contribution
                </h3>
                <p className="text-muted-foreground text-xs">
                  Integrated with Razorpay Payment Gateway
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

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
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
                  Description / Purpose *
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
                  onClick={() => setIsModalOpen(false)}
                  className="border-border rounded-xl border px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="from-gold-400 to-gold-600 rounded-xl bg-gradient-to-r px-5 py-2 font-black text-slate-950 shadow transition-all hover:scale-105"
                >
                  Pay ₹{amount} via Razorpay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400 w-full max-w-md space-y-6 rounded-3xl border-2 bg-white p-6 text-slate-900 shadow-2xl">
            <div className="border-b border-slate-200 pb-4 text-center">
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">
                Official Parish Payment Receipt
              </span>
              <h3 className="font-heading mt-1 text-2xl font-black text-slate-900">
                Queen of All Saints Church
              </h3>
              <p className="text-xs text-slate-600">Cathedral Colony, Trichy</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-slate-500">Receipt Number:</span>
                <span className="font-mono font-bold text-slate-900">
                  {selectedReceipt.receiptNumber}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-slate-500">Family Code:</span>
                <span className="font-bold text-slate-900">{family.familyNumber}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-slate-500">Family Name:</span>
                <span className="font-bold text-slate-900">{family.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-slate-500">Category:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.category}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-slate-500">Description:</span>
                <span className="font-medium text-slate-900">{selectedReceipt.description}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-slate-500">Payment Date:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between border-b pb-2 text-sm font-black">
                <span>Amount Paid:</span>
                <span className="text-emerald-700">₹{selectedReceipt.amount}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-[10px] text-slate-500">
              <span>Digitally Verified by Parish Office</span>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="from-gold-400 to-gold-600 rounded-xl bg-gradient-to-r px-5 py-2 font-black text-slate-950 shadow"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

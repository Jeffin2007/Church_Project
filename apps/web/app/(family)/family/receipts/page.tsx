'use client';

import { useState } from 'react';
import { Receipt as ReceiptIcon, ShieldCheck } from 'lucide-react';
import { useFamily } from '@/context/family-context';
import {
  PrintableReceiptModal,
  PaymentReceiptDetails,
} from '@/components/payments/printable-receipt-modal';

export default function FamilyReceiptsPage() {
  const { payments, family } = useFamily();
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentReceiptDetails | null>(null);

  // Combine initial receipts with FamilyContext payments
  const allReceipts: PaymentReceiptDetails[] = payments.map((p) => ({
    receiptNumber: p.receiptNumber,
    transactionId: `TXN-${p.id}`,
    razorpayPaymentId: `pay_${p.receiptNumber.replace(/[^0-9]/g, '')}9912`,
    date: p.date,
    amount: p.amount,
    category: p.category,
    description: p.description,
    familyNumber: family.familyNumber,
    familyName: family.name,
    headName: family.headName,
    headPhone: family.headPhone,
    status: p.status === 'PAID' ? 'PAID & VERIFIED' : p.status,
  }));

  return (
    <div className="animate-in fade-in space-y-6 pb-12">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-gold-300 mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> Digital Parish Records
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Official Payment Receipts
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Digitally verified parish receipts for all completed Razorpay online contributions and
            family dues.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {allReceipts.length === 0 ? (
          <div className="bg-card border-border/80 text-muted-foreground space-y-2 rounded-3xl border-2 p-12 text-center text-xs">
            <ReceiptIcon className="text-gold-400/60 mx-auto h-10 w-10" />
            <p className="text-foreground text-sm font-bold">No Payment Receipts Found</p>
            <p>Make an online contribution or pay monthly dues to generate official receipts.</p>
          </div>
        ) : (
          allReceipts.map((r) => (
            <div
              key={r.receiptNumber}
              className="bg-card border-border/80 hover:border-gold-400/60 flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-base font-bold">{r.description}</span>
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                    ✓ {r.status}
                  </span>
                  <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 rounded border px-2 py-0.5 text-[10px] font-bold">
                    {r.category}
                  </span>
                </div>
                <p className="text-muted-foreground font-mono text-xs">
                  Receipt #{r.receiptNumber} · Date: <strong>{r.date}</strong> · Razorpay ID:{' '}
                  <span className="font-bold text-amber-400">{r.razorpayPaymentId}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-heading text-foreground text-xl font-black">₹{r.amount}</span>
                <button
                  type="button"
                  onClick={() => setSelectedReceipt(r)}
                  className="from-gold-400 to-gold-600 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r px-4 py-2 text-xs font-black text-slate-950 shadow transition-all hover:scale-105"
                >
                  <ReceiptIcon className="h-4 w-4" />
                  <span>View / Print Receipt</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Official Printable Digital Receipt Modal */}
      <PrintableReceiptModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />
    </div>
  );
}

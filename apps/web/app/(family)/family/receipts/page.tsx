'use client';

import { useState } from 'react';
import { Receipt as ReceiptIcon, Printer, X, ShieldCheck } from 'lucide-react';

interface ReceiptItem {
  id: string;
  description: string;
  amount: string;
  date: string;
  paymentId: string;
  paymentMethod: string;
  familyNumber: string;
  headName: string;
}

const initialReceipts: ReceiptItem[] = [
  {
    id: 'REC-2026-0815',
    description: 'August 2026 Monthly Dues',
    amount: '₹500',
    date: '2026-08-06',
    paymentId: 'PAY-2026-0815',
    paymentMethod: 'Razorpay UPI Online',
    familyNumber: 'QOAS-2024-0001',
    headName: 'Joseph Anthony',
  },
  {
    id: 'REC-2026-0401',
    description: 'Monthly Dues — July 2026',
    amount: '₹500',
    date: '2026-07-10',
    paymentId: 'PAY-2026-0401',
    paymentMethod: 'Razorpay NetBanking',
    familyNumber: 'QOAS-2024-0001',
    headName: 'Joseph Anthony',
  },
  {
    id: 'REC-2026-0320',
    description: 'Monthly Dues — June 2026',
    amount: '₹500',
    date: '2026-06-08',
    paymentId: 'PAY-2026-0320',
    paymentMethod: 'Razorpay Card',
    familyNumber: 'QOAS-2024-0001',
    headName: 'Joseph Anthony',
  },
  {
    id: 'REC-2026-0210',
    description: 'Festival Offering — Feast Day May 2026',
    amount: '₹1,000',
    date: '2026-05-15',
    paymentId: 'PAY-2026-0210',
    paymentMethod: 'Razorpay UPI',
    familyNumber: 'QOAS-2024-0001',
    headName: 'Joseph Anthony',
  },
];

export default function FamilyReceiptsPage() {
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptItem | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-secondary text-2xl font-bold sm:text-3xl">
          Official Payment Receipts
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Verified parish receipts for all completed online contributions and monthly dues.
        </p>
      </div>

      <div className="space-y-3">
        {initialReceipts.map((r) => (
          <div
            key={r.id}
            className="bg-card border-border flex items-center justify-between rounded-xl border p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-foreground text-sm font-bold sm:text-base">
                  {r.description}
                </span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Verified
                </span>
              </div>
              <p className="text-muted-foreground font-mono text-xs">
                Receipt #{r.id} · Paid: {r.date} · Txn: {r.paymentId}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-primary text-sm font-extrabold sm:text-base">{r.amount}</span>
              <button
                type="button"
                onClick={() => setSelectedReceipt(r)}
                className="bg-secondary/10 text-secondary hover:bg-secondary/20 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors"
              >
                <ReceiptIcon className="h-3.5 w-3.5" />
                <span>View Receipt</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Official Digital Receipt Display */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="bg-card border-border w-full max-w-md space-y-6 rounded-2xl border p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="from-gold-400 to-gold-600 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-black text-slate-950">
                  ✝
                </div>
                <div>
                  <h3 className="font-heading text-primary text-sm font-bold leading-tight">
                    Queen of All Saints Church
                  </h3>
                  <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider">
                    Official Digital Receipt
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="text-muted-foreground hover:text-foreground text-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-muted/40 border-border/80 space-y-3 rounded-xl border p-4 text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-muted-foreground">Receipt Number</span>
                <span className="text-primary font-mono font-bold">{selectedReceipt.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Family Number</span>
                <span className="font-mono font-semibold">{selectedReceipt.familyNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Family Head</span>
                <span className="font-semibold">{selectedReceipt.headName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Description</span>
                <span className="font-medium">{selectedReceipt.description}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium">{selectedReceipt.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Transaction Ref</span>
                <span className="font-mono text-[11px]">{selectedReceipt.paymentId}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-2 text-sm font-bold">
                <span className="text-foreground">Total Paid</span>
                <span className="text-primary text-base">{selectedReceipt.amount}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Digitally Verified</span>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 font-semibold shadow"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

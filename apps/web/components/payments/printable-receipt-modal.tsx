'use client';

import React from 'react';
import { X, Printer, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface PaymentReceiptDetails {
  receiptNumber: string;
  transactionId: string;
  razorpayPaymentId: string;
  date: string;
  time?: string;
  amount: number;
  category: string;
  description: string;
  familyNumber: string;
  familyName: string;
  headName?: string;
  headPhone?: string;
  status?: string;
}

interface PrintableReceiptModalProps {
  receipt: PaymentReceiptDetails | null;
  onClose: () => void;
}

export function PrintableReceiptModal({ receipt, onClose }: PrintableReceiptModalProps) {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const textContent = `
====================================================
QUEEN OF ALL SAINTS ROMAN CATHOLIC CHURCH
Cathedral Colony, Trichy - 620001, Tamil Nadu
OFFICIAL DIGITAL PAYMENT RECEIPT
====================================================

Receipt Number : ${receipt.receiptNumber}
Transaction ID : ${receipt.transactionId}
Razorpay Pay ID: ${receipt.razorpayPaymentId}
Payment Date   : ${receipt.date} ${receipt.time || ''}
Status         : ${receipt.status || 'PAID (CONFIRMED)'}

----------------------------------------------------
FAMILY DETAILS
----------------------------------------------------
Family Code    : ${receipt.familyNumber}
Family Name    : ${receipt.familyName}
Head of Family : ${receipt.headName || 'N/A'}
Contact Phone  : ${receipt.headPhone || 'N/A'}

----------------------------------------------------
PAYMENT BREAKDOWN
----------------------------------------------------
Category       : ${receipt.category}
Purpose        : ${receipt.description}
Amount Paid    : ₹${receipt.amount}.00 (INR)

----------------------------------------------------
Verification   : Digitally Verified by Parish Finance Office
====================================================
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${receipt.receiptNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md print:bg-white print:p-0">
      <div className="border-gold-400/40 bg-card text-card-foreground max-h-[92vh] w-full max-w-lg space-y-6 overflow-y-auto rounded-3xl border-2 p-6 shadow-2xl print:max-w-full print:border-none print:p-0 print:shadow-none">
        {/* Header Bar - Hidden during print */}
        <div className="border-border/60 flex items-center justify-between border-b pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <h3 className="font-heading text-foreground text-lg font-bold">
              Official Digital Receipt
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Printable Receipt Card Body */}
        <div
          id="printable-receipt-card"
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 text-slate-900"
        >
          {/* Church Header */}
          <div className="border-b-2 border-slate-900 pb-4 text-center">
            <div className="from-gold-500 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br to-amber-700 text-2xl font-black text-white shadow-sm">
              ✝
            </div>
            <h2 className="font-heading text-xl font-extrabold uppercase tracking-wide text-slate-900">
              Queen of All Saints Church
            </h2>
            <p className="text-xs font-bold text-slate-600">
              Cathedral Colony, Trichy – 620 001 · Diocese of Tiruchirapalli
            </p>
            <p className="mt-1 text-[10px] font-semibold text-slate-500">
              Official Digital Contribution & Dues Receipt
            </p>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>Payment Successfully Verified</span>
            </div>
            <span className="rounded-md bg-emerald-700 px-2.5 py-0.5 text-[10px] font-black uppercase text-white">
              {receipt.status || 'PAID'}
            </span>
          </div>

          {/* Receipt Details Table */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-500">Receipt Number</span>
              <span className="font-mono font-bold text-slate-900">{receipt.receiptNumber}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-500">Transaction ID</span>
              <span className="font-mono font-bold text-slate-800">{receipt.transactionId}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-500">Razorpay Payment ID</span>
              <span className="font-mono font-bold text-amber-800">
                {receipt.razorpayPaymentId}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-slate-500">Date & Time</span>
              <span className="font-bold text-slate-900">
                {receipt.date} {receipt.time ? `· ${receipt.time}` : ''}
              </span>
            </div>
          </div>

          {/* Family Info */}
          <div className="space-y-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs">
            <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Parishioner Family Details
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="block text-[10px] text-slate-500">Family Code</span>
                <span className="font-mono font-bold text-slate-900">{receipt.familyNumber}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500">Family Name</span>
                <span className="font-bold text-slate-900">{receipt.familyName}</span>
              </div>
              {receipt.headName && (
                <div>
                  <span className="block text-[10px] text-slate-500">Head of Family</span>
                  <span className="font-semibold text-slate-800">{receipt.headName}</span>
                </div>
              )}
              {receipt.headPhone && (
                <div>
                  <span className="block text-[10px] text-slate-500">Contact</span>
                  <span className="font-medium text-slate-800">{receipt.headPhone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="block font-black text-amber-900">{receipt.category}</span>
                <span className="block text-[11px] text-slate-600">{receipt.description}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] font-bold uppercase text-slate-500">Amount</span>
                <span className="font-heading text-2xl font-black text-slate-950">
                  ₹{receipt.amount}.00
                </span>
              </div>
            </div>
          </div>

          {/* Footer Signature */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-[10px] text-slate-500">
            <div>
              <p className="font-bold text-slate-700">Parish Finance Office</p>
              <p>Queen of All Saints Church, Trichy</p>
            </div>
            <div className="text-right font-mono text-[9px]">
              <p className="text-slate-400">Computer Generated Receipt</p>
              <p className="text-slate-400">No Manual Signature Required</p>
            </div>
          </div>
        </div>

        {/* Action Buttons - Hidden during print */}
        <div className="border-border/60 flex flex-wrap items-center justify-between gap-3 border-t pt-4 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="border-border hover:bg-muted rounded-xl border px-4 py-2 text-xs font-bold transition-colors"
          >
            Close Window
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="bg-muted hover:bg-muted/80 text-foreground inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all"
            >
              <Download className="h-4 w-4" /> Download (.TXT)
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="from-gold-400 to-gold-600 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r px-5 py-2 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
            >
              <Printer className="h-4 w-4" /> Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

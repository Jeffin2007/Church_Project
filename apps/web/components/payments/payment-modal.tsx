'use client';

import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, CreditCard, AlertCircle, RotateCcw, Loader2 } from 'lucide-react';
import {
  loadRazorpaySDK,
  launchRazorpayCheckout,
  getRazorpayKeyId,
  RazorpayPaymentSuccessResponse,
} from '@/lib/razorpay';

export interface PaymentSummaryRequest {
  category: string;
  purpose: string;
  amount: number;
  familyNumber: string;
  familyName: string;
  headName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentDetails: PaymentSummaryRequest;
  onSuccess: (paymentResult: {
    receiptNumber: string;
    transactionId: string;
    razorpayPaymentId: string;
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => void;
}

export function PaymentModal({ isOpen, onClose, paymentDetails, onSuccess }: PaymentModalProps) {
  const [sdkStatus, setSdkStatus] = useState<'IDLE' | 'LOADING' | 'READY' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setSdkStatus('LOADING');
      loadRazorpaySDK()
        .then((success) => {
          if (success) {
            setSdkStatus('READY');
          } else {
            setSdkStatus('ERROR');
            setErrorMessage(
              'Unable to load official Razorpay SDK. Please check your internet connection.',
            );
          }
        })
        .catch((err) => {
          setSdkStatus('ERROR');
          setErrorMessage(err?.message || 'Error initializing payment gateway SDK.');
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const keyId = getRazorpayKeyId();

  const handleRetrySdkLoad = () => {
    setErrorMessage(null);
    setSdkStatus('LOADING');
    loadRazorpaySDK()
      .then((success) => {
        if (success) {
          setSdkStatus('READY');
        } else {
          setSdkStatus('ERROR');
          setErrorMessage('Retry failed. Unable to load Razorpay SDK.');
        }
      })
      .catch(() => {
        setSdkStatus('ERROR');
        setErrorMessage('Failed to connect to Razorpay server.');
      });
  };

  const handlePayNow = async () => {
    setErrorMessage(null);
    setIsProcessingCheckout(true);

    const rcpNumber = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const txnId = `TXN-QOAS-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const launched = await launchRazorpayCheckout({
      amountInRupees: paymentDetails.amount,
      purpose: paymentDetails.purpose,
      category: paymentDetails.category,
      familyName: paymentDetails.familyName,
      familyNumber: paymentDetails.familyNumber,
      contactPhone: paymentDetails.contactPhone,
      contactEmail: paymentDetails.contactEmail,
      onSuccess: (resp: RazorpayPaymentSuccessResponse) => {
        setIsProcessingCheckout(false);
        onSuccess({
          receiptNumber: rcpNumber,
          transactionId: txnId,
          razorpayPaymentId: resp.razorpay_payment_id,
          amount: paymentDetails.amount,
          category: paymentDetails.category,
          description: paymentDetails.purpose,
          date: new Date().toISOString().slice(0, 10),
        });
        onClose();
      },
      onFailure: (err: unknown) => {
        setIsProcessingCheckout(false);
        setErrorMessage(
          typeof err === 'object' && err !== null && 'error' in err
            ? (err as { error: { description: string } }).error.description
            : 'Payment cancelled or unsuccessful. You may retry payment.',
        );
      },
      onDismiss: () => {
        setIsProcessingCheckout(false);
      },
    });

    if (!launched) {
      setIsProcessingCheckout(false);
      setSdkStatus('ERROR');
      setErrorMessage('Razorpay Checkout failed to open. Please click retry.');
    }
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="border-gold-400/40 bg-card text-card-foreground max-h-[90vh] w-full max-w-md space-y-6 overflow-y-auto rounded-3xl border-2 p-6 shadow-2xl">
        {/* Header */}
        <div className="border-border/60 flex items-start justify-between border-b pb-4">
          <div>
            <div className="text-gold-300 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Secure Parish Checkout
            </div>
            <h3 className="font-heading text-foreground mt-0.5 text-xl font-extrabold">
              Confirm Payment
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Family & Account Details */}
        <div className="bg-muted/40 border-border/60 space-y-2 rounded-2xl border p-4 text-xs">
          <div className="border-border/40 flex justify-between border-b pb-2">
            <span className="text-muted-foreground font-bold">Family Code</span>
            <span className="text-foreground font-mono font-extrabold">
              {paymentDetails.familyNumber}
            </span>
          </div>
          <div className="border-border/40 flex justify-between border-b pb-2">
            <span className="text-muted-foreground font-bold">Family Name</span>
            <span className="text-foreground font-bold">{paymentDetails.familyName}</span>
          </div>
          {paymentDetails.headName && (
            <div className="flex justify-between">
              <span className="text-muted-foreground font-bold">Contributor</span>
              <span className="text-foreground font-bold">{paymentDetails.headName}</span>
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="border-gold-400/30 bg-gold-500/10 space-y-3 rounded-2xl border p-4 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground font-bold">Payment Category</span>
            <span className="text-gold-300 font-extrabold">{paymentDetails.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-bold">Purpose / Details</span>
            <span className="text-foreground line-clamp-2 max-w-[200px] text-right font-medium">
              {paymentDetails.purpose}
            </span>
          </div>

          <div className="border-border/60 border-t pt-2">
            <div className="text-muted-foreground flex justify-between text-xs font-bold">
              <span>Base Contribution</span>
              <span>₹{paymentDetails.amount}.00</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-emerald-400">
              <span>Razorpay Processing Fee</span>
              <span>₹0.00 (Waived)</span>
            </div>
            <div className="border-gold-400/30 flex items-baseline justify-between border-t pt-2 font-black">
              <span className="text-foreground text-sm">Total Payable</span>
              <span className="font-heading text-gold-400 text-2xl font-black">
                ₹{paymentDetails.amount}.00
              </span>
            </div>
          </div>
        </div>

        {/* Error / Retry Banner */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-400">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
            <div className="flex-1 space-y-1">
              <p className="font-bold">{errorMessage}</p>
              {sdkStatus === 'ERROR' && (
                <button
                  type="button"
                  onClick={handleRetrySdkLoad}
                  className="inline-flex items-center gap-1 font-extrabold underline hover:text-red-300"
                >
                  <RotateCcw className="h-3 w-3" /> Retry Loading SDK
                </button>
              )}
            </div>
          </div>
        )}

        {/* Razorpay Trust & Key Banner */}
        <div className="bg-background/80 border-border/60 text-muted-foreground space-y-2 rounded-2xl border p-3 text-center text-[10px]">
          <div className="flex items-center justify-center gap-2">
            <span className="flex items-center gap-1 font-bold text-emerald-400">
              <Lock className="h-3 w-3" /> 256-Bit SSL Encrypted
            </span>
            <span>·</span>
            <span className="font-bold text-blue-400">Razorpay Verified Gateway</span>
          </div>
          <p className="font-mono text-[9px]">
            Merchant Key ID: <span className="text-foreground font-bold">{keyId}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="border-border flex justify-end gap-3 border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessingCheckout}
            className="border-border hover:bg-muted rounded-xl border px-4 py-2.5 text-xs font-bold transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          {sdkStatus === 'LOADING' ? (
            <button
              type="button"
              disabled
              className="bg-muted text-muted-foreground inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold"
            >
              <Loader2 className="text-gold-400 h-4 w-4 animate-spin" />
              Initializing Razorpay SDK...
            </button>
          ) : sdkStatus === 'ERROR' ? (
            <button
              type="button"
              onClick={handleRetrySdkLoad}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-2.5 text-xs font-bold text-white shadow transition-all hover:bg-red-700"
            >
              <RotateCcw className="h-4 w-4" /> Retry Razorpay Connection
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePayNow}
              disabled={isProcessingCheckout}
              className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-2.5 text-xs font-black text-slate-950 shadow-lg transition-all hover:scale-105 disabled:opacity-50"
            >
              <CreditCard className="h-4 w-4" />
              <span>
                {isProcessingCheckout
                  ? 'Opening Razorpay Checkout...'
                  : `Pay Now (₹${paymentDetails.amount})`}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

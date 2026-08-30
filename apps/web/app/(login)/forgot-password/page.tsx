'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Church, Users, ArrowRight } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="bg-card text-card-foreground border-border/80 rounded-3xl border p-8 shadow-2xl backdrop-blur-md">
        <div className="space-y-2 text-center">
          <div className="bg-primary/10 text-primary border-primary/20 mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-xl font-bold shadow-inner">
            <Church className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-primary text-2xl font-bold">Reset Family Password</h1>
          <p className="text-muted-foreground text-xs">
            Enter your Family Card Number or registered mobile number to reset access.
          </p>
        </div>

        {submitted ? (
          <div className="mt-6 space-y-4 text-center">
            <div className="bg-primary/10 text-primary border-primary/20 rounded-2xl border p-4 text-sm font-medium">
              If a family card or account matching <strong>{identifier}</strong> exists in the parish registry, an SMS verification code has been sent to your registered contact number.
            </div>
            <Link
              href="/login"
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold shadow transition-colors"
            >
              ← Return to Login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-6 space-y-4 text-sm"
          >
            <div>
              <label className="text-foreground mb-1.5 flex items-center gap-1.5 text-xs font-bold">
                <Users className="h-3.5 w-3.5 text-primary" /> Family Card No. or Mobile Number
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 101, 151, 301, or 94421 00000"
                className="bg-background focus:ring-primary focus:border-primary w-full rounded-xl border p-3 font-medium shadow-sm outline-none transition-all focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold shadow-lg transition-all"
            >
              Request Password Reset Code <ArrowRight className="h-4 w-4" />
            </button>

            <div className="pt-2 text-center">
              <Link href="/login" className="text-muted-foreground hover:text-foreground text-xs font-semibold">
                ← Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


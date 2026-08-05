'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="bg-card text-card-foreground border-border/80 rounded-2xl border p-8 shadow-2xl">
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-primary text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground text-xs">
            Enter your registered email to receive a password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="mt-6 space-y-4 text-center">
            <div className="bg-primary/10 text-primary rounded-xl p-4 text-sm">
              If an account with <strong>{email}</strong> exists, a password reset link has been
              sent.
            </div>
            <Link
              href="/login"
              className="text-primary block text-xs font-semibold hover:underline"
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
              <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@queenofallsaints.in"
                className="bg-background focus:ring-primary w-full rounded-md border p-2.5 outline-none focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md py-2.5 font-medium transition-colors"
            >
              Send Password Reset Link
            </button>

            <div className="pt-2 text-center">
              <Link href="/login" className="text-muted-foreground hover:text-foreground text-xs">
                Back to login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

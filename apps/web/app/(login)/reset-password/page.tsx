'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="bg-card text-card-foreground border-border/80 rounded-2xl border p-8 shadow-2xl">
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-primary text-2xl font-bold">Create New Password</h1>
          <p className="text-muted-foreground text-xs">Enter your new secure password below.</p>
        </div>

        {done ? (
          <div className="mt-6 space-y-4 text-center">
            <div className="bg-primary/10 text-primary rounded-xl p-4 text-sm font-semibold">
              Password updated successfully!
            </div>
            <Link
              href="/login"
              className="bg-primary text-primary-foreground hover:bg-primary/90 block rounded-md py-2.5 text-xs font-semibold"
            >
              Sign in with New Password
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="mt-6 space-y-4 text-sm"
          >
            <div>
              <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                New Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="bg-background focus:ring-primary w-full rounded-md border p-2.5 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••••••"
                className="bg-background focus:ring-primary w-full rounded-md border p-2.5 outline-none focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md py-2.5 font-medium transition-colors"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

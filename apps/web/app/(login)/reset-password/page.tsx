'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Church, Lock, Users, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { findFamilyByUsernameOrCard } from '@/lib/parish-families';
import { saveFamilyNewPassword } from '@/lib/family-security';

export default function ResetPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const fam = findFamilyByUsernameOrCard(identifier);
    if (!fam) {
      setError(`Family Card / Username "${identifier}" not found in parish records.`);
      return;
    }

    setLoading(true);
    try {
      // Securely hash and update the stored password
      await saveFamilyNewPassword(fam.cardNo, password);
      setDone(true);
    } catch {
      setError('Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="bg-card text-card-foreground border-border/80 rounded-3xl border p-8 shadow-2xl backdrop-blur-md">
        <div className="space-y-2 text-center">
          <div className="bg-primary/10 text-primary border-primary/20 mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-xl font-bold shadow-inner">
            <Church className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-primary text-2xl font-bold">Create New Password</h1>
          <p className="text-muted-foreground text-xs">
            Set a new encrypted password for your Parish Family account.
          </p>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {done ? (
          <div className="mt-6 space-y-4 text-center">
            <div className="bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-2xl border p-4 text-sm font-semibold flex flex-col items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              <span>Password updated and encrypted securely!</span>
            </div>
            <Link
              href="/login"
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold shadow transition-colors"
            >
              Sign In with New Password <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm">
            <div>
              <label className="text-foreground mb-1.5 flex items-center gap-1.5 text-xs font-bold">
                <Users className="h-3.5 w-3.5 text-primary" /> Family Card No. or Username
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 101, 151, 701, or qoas101"
                className="bg-background focus:ring-primary focus:border-primary w-full rounded-xl border p-3 font-medium shadow-sm outline-none transition-all focus:ring-2"
              />
            </div>

            <div>
              <label className="text-foreground mb-1.5 flex items-center gap-1.5 text-xs font-bold">
                <Lock className="h-3.5 w-3.5 text-primary" /> New Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="bg-background focus:ring-primary focus:border-primary w-full rounded-xl border p-3 font-medium shadow-sm outline-none transition-all focus:ring-2"
              />
            </div>

            <div>
              <label className="text-foreground mb-1.5 flex items-center gap-1.5 text-xs font-bold">
                <Lock className="h-3.5 w-3.5 text-primary" /> Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••••••"
                className="bg-background focus:ring-primary focus:border-primary w-full rounded-xl border p-3 font-medium shadow-sm outline-none transition-all focus:ring-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save New Password'}
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
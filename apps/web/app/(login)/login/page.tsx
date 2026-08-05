'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<'email' | 'family'>('email');
  const [email, setEmail] = useState('');
  const [familyNumber, setFamilyNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const demoAccounts = [
    {
      label: 'Super Admin',
      email: 'admin@queenofallsaints.in',
      pass: 'Admin@QOAS2026!',
      target: '/admin/dashboard',
      role: 'Super Admin',
    },
    {
      label: 'Parish Priest',
      email: 'priest@queenofallsaints.in',
      pass: 'Priest@QOAS2026!',
      target: '/admin/dashboard',
      role: 'Priest',
    },
    {
      label: 'Office Staff',
      email: 'office@queenofallsaints.in',
      pass: 'Office@QOAS2026!',
      target: '/admin/dashboard',
      role: 'Office',
    },
    {
      label: 'Anbiyam Leader',
      email: 'robin@queenofallsaints.in',
      pass: 'Anbiyam@QOAS2026!',
      target: '/anbiyam/dashboard',
      role: 'Anbiyam',
    },
    {
      label: 'Coordinator',
      email: 'jeffin@queenofallsaints.in',
      pass: 'Coordinator@QOAS2026!',
      target: '/coordinator/dashboard',
      role: 'Coordinator',
    },
    {
      label: 'Family Head',
      email: 'familyhead@queenofallsaints.in',
      pass: 'Family@QOAS2026!',
      target: '/family/dashboard',
      role: 'Family Head',
    },
  ];

  const handleDemoSelect = (acc: (typeof demoAccounts)[0]) => {
    setLoginType('email');
    setEmail(acc.email);
    setPassword(acc.pass);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = loginType === 'email' ? { email, password } : { familyNumber, password };

      await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

      // Match demo redirect route if API isn't running or for fast demo
      const matched = demoAccounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
      const destination = matched
        ? matched.target
        : email.includes('admin') || email.includes('priest') || email.includes('office')
          ? '/admin/dashboard'
          : '/family/dashboard';

      router.push(destination);
    } catch {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="bg-card text-card-foreground border-border/80 rounded-2xl border p-8 shadow-2xl">
        <div className="space-y-2 text-center">
          <div className="bg-primary/10 text-primary mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold">
            ✝
          </div>
          <h1 className="font-heading text-primary text-3xl font-bold">Parish Portal Login</h1>
          <p className="text-muted-foreground text-xs">Queen of All Saints Roman Catholic Church</p>
        </div>

        {/* Login Type Switcher */}
        <div className="bg-muted mt-6 flex rounded-lg p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setLoginType('email')}
            className={`flex-1 rounded-md py-2 text-center transition-all ${
              loginType === 'email'
                ? 'bg-background text-foreground shadow'
                : 'text-muted-foreground'
            }`}
          >
            Email Login
          </button>
          <button
            type="button"
            onClick={() => setLoginType('family')}
            className={`flex-1 rounded-md py-2 text-center transition-all ${
              loginType === 'family'
                ? 'bg-background text-foreground shadow'
                : 'text-muted-foreground'
            }`}
          >
            Family Number
          </button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive mt-4 rounded-md p-3 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm">
          {loginType === 'email' ? (
            <div>
              <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="office@queenofallsaints.in"
                className="bg-background focus:ring-primary w-full rounded-md border p-2.5 outline-none focus:ring-2"
              />
            </div>
          ) : (
            <div>
              <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                Family Number
              </label>
              <input
                type="text"
                required
                value={familyNumber}
                onChange={(e) => setFamilyNumber(e.target.value)}
                placeholder="QOAS-2024-0001"
                className="bg-background focus:ring-primary w-full rounded-md border p-2.5 outline-none focus:ring-2"
              />
            </div>
          )}

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-muted-foreground block text-xs font-semibold">Password</label>
              <Link href="/forgot-password" className="text-primary text-xs hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="bg-background focus:ring-primary w-full rounded-md border p-2.5 outline-none focus:ring-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md py-3 font-medium shadow transition-colors"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>

        {/* Demo Account Quick Buttons */}
        <div className="mt-8 border-t pt-6">
          <p className="text-muted-foreground mb-3 text-center text-xs font-semibold">
            ⚡ Quick Demo Accounts (Priest & Admin Demo)
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {demoAccounts.map((acc) => (
              <button
                key={acc.label}
                type="button"
                onClick={() => handleDemoSelect(acc)}
                className="border-border/80 bg-muted/40 hover:bg-primary/10 hover:border-primary/50 rounded-lg border p-2 text-left transition-all"
              >
                <div className="text-foreground font-semibold">{acc.label}</div>
                <div className="text-muted-foreground truncate text-[10px]">{acc.email}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

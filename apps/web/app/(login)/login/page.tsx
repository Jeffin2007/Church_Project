'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, Church, ShieldCheck, UserCheck, Users } from 'lucide-react';
import { saveAuthSession } from '@/lib/auth';
import { findFamilyByUsernameOrCard } from '@/lib/parish-families';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');

  const [loginType, setLoginType] = useState<'email' | 'family'>('email');
  const [email, setEmail] = useState('');
  const [familyNumber, setFamilyNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const demoAccounts = [
    {
      label: 'Parish Priest',
      email: 'priest@queenofallsaints.in',
      pass: 'Priest@QOAS2026!',
      target: '/priest/dashboard',
      role: 'Priest',
      subtext: 'Clergy Console',
    },
    {
      label: 'Super Admin',
      email: 'admin@queenofallsaints.in',
      pass: 'Admin@QOAS2026!',
      target: '/admin/dashboard',
      role: 'Super Admin',
      subtext: 'Parish Administration',
    },
    {
      label: 'Office Staff',
      email: 'office@queenofallsaints.in',
      pass: 'Office@QOAS2026!',
      target: '/admin/dashboard',
      role: 'Office',
      subtext: 'Registry Desk',
    },
    {
      label: 'Anbiyam Leader',
      email: 'robin@queenofallsaints.in',
      pass: 'Anbiyam@QOAS2026!',
      target: '/anbiyam/dashboard',
      role: 'Anbiyam',
      subtext: 'Ward Leadership',
    },
    {
      label: 'C. Thomas (St. Augustine)',
      email: 'qoas101@queenofallsaints.in',
      pass: 'Family@QOAS2026!',
      target: '/family/dashboard',
      role: 'Family Head',
      familyId: '101',
      subtext: 'Card 101 · St. Augustine',
    },
    {
      label: 'A. Adaikalam (St. Anthony)',
      email: 'qoas301@queenofallsaints.in',
      pass: 'Family@QOAS2026!',
      target: '/family/dashboard',
      role: 'Family Head',
      familyId: '301',
      subtext: 'Card 301 · St. Anthony',
    },
    {
      label: 'A. Arokiasamy (Infant Jesus)',
      email: 'qoas601@queenofallsaints.in',
      pass: 'Family@QOAS2026!',
      target: '/family/dashboard',
      role: 'Family Head',
      familyId: '601',
      subtext: 'Card 601 · Infant Jesus',
    },
    {
      label: 'A. Antony (St. Xavier)',
      email: 'qoas701@queenofallsaints.in',
      pass: 'Family@QOAS2026!',
      target: '/family/dashboard',
      role: 'Family Head',
      familyId: '701',
      subtext: 'Card 701 · St. Xavier',
    },
  ];

  const performNavigation = (targetIdentifier: string, targetRolePath?: string) => {
    const matched = demoAccounts.find((a) => a.email.toLowerCase() === targetIdentifier.toLowerCase());
    const matchedFamily = findFamilyByUsernameOrCard(targetIdentifier);

    let role = matched ? matched.role : 'User';
    let familyId: string | undefined = matched?.familyId;

    if (matchedFamily) {
      role = 'Family Head';
      familyId = matchedFamily.cardNo;
    }

    saveAuthSession({
      userId: `usr_${Date.now()}`,
      email: matched ? targetIdentifier : matchedFamily ? `${matchedFamily.username}@queenofallsaints.in` : targetIdentifier,
      role,
      familyId,
      token: `token_${Date.now()}_qoas`,
      loggedInAt: new Date().toISOString(),
    });

    if (redirectParam) {
      router.push(redirectParam);
      return;
    }

    const destination =
      targetRolePath ||
      (matched
        ? matched.target
        : targetIdentifier.includes('priest')
          ? '/priest/dashboard'
          : targetIdentifier.includes('admin') || targetIdentifier.includes('office')
            ? '/admin/dashboard'
            : targetIdentifier.includes('anbiyam')
              ? '/anbiyam/dashboard'
              : targetIdentifier.includes('coordinator')
                ? '/coordinator/dashboard'
                : '/family/dashboard');

    router.push(destination);
  };

  const handleDemoSelect = (acc: (typeof demoAccounts)[0]) => {
    setLoginType('email');
    setEmail(acc.email);
    setPassword(acc.pass);
    setError('');
    setLoading(true);

    saveAuthSession({
      userId: `usr_${Date.now()}`,
      email: acc.email,
      role: acc.role,
      familyId: acc.familyId,
      token: `token_${Date.now()}_qoas`,
      loggedInAt: new Date().toISOString(),
    });

    // Instant non-blocking demo authentication
    setTimeout(() => {
      performNavigation(acc.email, acc.target);
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const identifier = loginType === 'email' ? email.trim() : familyNumber.trim();
      const payload = loginType === 'email' ? { email: identifier, password } : { familyNumber: identifier, password };

      // Set 300ms AbortController timeout so network delays never block UI
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300);

      const apiUrl = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001/api/v1';

      await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }).catch(() => null);

      clearTimeout(timeoutId);
      performNavigation(identifier);
    } catch {
      setError('Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="bg-card text-card-foreground border-border/80 rounded-2xl border p-8 shadow-2xl">
        <div className="space-y-2 text-center">
          <div className="bg-primary/10 text-primary mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
            <Church className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-primary text-3xl font-bold">Parish Portal Login</h1>
          <p className="text-muted-foreground text-xs">Queen of All Saints Roman Catholic Church</p>
          {redirectParam && (
            <div className="bg-gold-500/20 text-gold-700 dark:text-gold-300 border-gold-400/40 mt-2 flex items-center justify-center gap-1.5 rounded-lg border p-2 text-[11px] font-bold">
              <Lock className="h-3.5 w-3.5" /> Please sign in to access your requested page
            </div>
          )}
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
            Email / Username
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
            Family Card No.
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
                Email Address or Username
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="qoas101@queenofallsaints.in or qoas101"
                className="bg-background focus:ring-primary w-full rounded-md border p-2.5 outline-none focus:ring-2"
              />
            </div>
          ) : (
            <div>
              <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                Family Card Number
              </label>
              <input
                type="text"
                required
                value={familyNumber}
                onChange={(e) => setFamilyNumber(e.target.value)}
                placeholder="101 (or QOAS-CARD-101)"
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

        {/* Quick Portal Switcher */}
        <div className="mt-8 border-t pt-6">
          <p className="text-muted-foreground mb-3 text-center text-xs font-semibold flex items-center justify-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Quick Role & Family Portal Switcher
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {demoAccounts.map((acc) => (
              <button
                key={acc.label}
                type="button"
                onClick={() => handleDemoSelect(acc)}
                className="border-border/80 bg-muted/40 hover:bg-primary/10 hover:border-primary/50 rounded-lg border p-2 text-left transition-all"
              >
                <div className="text-foreground font-semibold truncate">{acc.label}</div>
                <div className="text-muted-foreground truncate text-[10px]">{acc.subtext}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="text-muted-foreground p-8 text-center text-xs">Loading login form...</div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Lock,
  ShieldCheck,
  Users,
  Eye,
  EyeOff,
  Cross,
  UserCheck,
  Briefcase,
  AlertCircle,
} from 'lucide-react';
import { saveAuthSession } from '@/lib/auth';
import { authenticateFamily, authenticateStaff } from '@/lib/family-security';
import { logParishActivity } from '@/lib/google-sheets-logger';

type PortalType = 'family' | 'priest' | 'coordinator' | 'admin';

const COORDINATOR_TEAMS = [
  { id: 'coord.youth', label: 'Parish Youth Movement', role: 'Youth Coordinator' },
  { id: 'coord.choir', label: 'Parish Liturgical Choir', role: 'Choir Master / Coordinator' },
  { id: 'coord.catechism', label: 'Sunday Catechism Teachers', role: 'Catechism Director' },
  { id: 'coord.charity', label: 'Society of St. Vincent de Paul (SVP)', role: 'Charity Coordinator' },
  { id: 'coord.altar', label: 'Altar Servers Association', role: 'Liturgy Coordinator' },
  { id: 'coord.volunteers', label: 'Parish Service & Feast Volunteers', role: 'Pastoral Council Coordinator' },
];

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');
  const portalParam = searchParams.get('portal') as PortalType | null;

  const [activePortal, setActivePortal] = useState<PortalType>('family');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCoordTeam, setSelectedCoordTeam] = useState(COORDINATOR_TEAMS[0]?.id ?? 'coord.youth');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sync portal from URL if provided
  useEffect(() => {
    if (portalParam && ['family', 'priest', 'coordinator', 'admin'].includes(portalParam)) {
      setActivePortal(portalParam);
    }
  }, [portalParam]);

  // Clear errors when portal tab changes
  const handleTabChange = (portal: PortalType) => {
    setActivePortal(portal);
    setError('');
    setIdentifier('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activePortal === 'family') {
        const cleanCard = identifier.trim();
        if (!cleanCard) {
          setError('Please enter your Parish Family Card Number (e.g. 101, 151, 701) or Username (e.g. qoas101).');
          setLoading(false);
          return;
        }

        if (!password.trim()) {
          setError('Please enter your password (initial password is your registered mobile number).');
          setLoading(false);
          return;
        }

        // Strictly authenticate against registered families database using cryptographic password hash comparison
        const result = await authenticateFamily(cleanCard, password);

        if (!result.success || !result.family) {
          setError(result.error || 'Authentication failed. Please check your credentials.');
          setLoading(false);
          return;
        }

        const matchedFam = result.family;

        saveAuthSession({
          userId: `user_fam_${matchedFam.cardNo}`,
          email: `${matchedFam.username}@queenofallsaints.in`,
          role: 'Family Head',
          familyId: `QOAS-CARD-${matchedFam.cardNo}`,
          token: result.token || `jwt_fam_${matchedFam.cardNo}_${Date.now()}`,
          loggedInAt: new Date().toISOString(),
        });

        // Log to Google Sheets Activity Logger
        logParishActivity({
          eventType: 'USER_LOGIN',
          familyId: `QOAS-CARD-${matchedFam.cardNo}`,
          familyName: matchedFam.familyName,
          headName: matchedFam.headName,
          anbiyam: matchedFam.anbiyam,
          role: 'Family Head',
          status: 'SUCCESS',
          summary: `Family Head ${matchedFam.headName} (${matchedFam.familyName}) signed in successfully`,
        });

        router.replace(redirectParam || '/family/dashboard');
      } else {
        const result = await authenticateStaff(activePortal, identifier, password, selectedCoordTeam);

        if (!result.success) {
          setError(result.error || 'Authentication failed. Please check your password.');
          setLoading(false);
          return;
        }

        saveAuthSession({
          userId: `user_${activePortal}_${Date.now()}`,
          email: result.email || `${identifier || activePortal}@queenofallsaints.in`,
          role: result.role || 'Staff',
          token: result.token || `jwt_${activePortal}_${Date.now()}`,
          loggedInAt: new Date().toISOString(),
        });

        // Log to Google Sheets Activity Logger
        logParishActivity({
          eventType: 'USER_LOGIN',
          userName: identifier || activePortal,
          role: result.role || 'Staff',
          status: 'SUCCESS',
          summary: `Staff user signed in as ${result.role} (${activePortal})`,
        });

        router.replace(redirectParam || `/${activePortal}/dashboard`);
      }
    } catch {
      setError('Authentication failed. Please verify your credentials and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-6">
        {/* Church Branding Header */}
        <div className="text-center">
          <div className="border-gold-400/60 bg-[hsl(214,70%,16%)] mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 p-1.5 shadow-lg">
            <Image
              src="/images/logo.png"
              alt="Queen of All Saints Logo"
              width={64}
              height={64}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <span className="text-secondary dark:text-gold-400 tracking-widest text-[11px] font-extrabold uppercase">
            Diocese of Tiruchirappalli
          </span>
          <h1 className="font-heading text-foreground mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Queen of All Saints Roman Catholic Church
          </h1>
          <p className="text-primary font-tamil text-xs font-semibold sm:text-sm">
            அனைத்து புனிதர்களின் அரசி ஆலயம் · K.K. Nagar, Tiruchirappalli
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-card border-border relative overflow-hidden rounded-3xl border p-6 shadow-xl sm:p-8">
          {/* Top Portal Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-muted/60 p-1.5 text-xs font-bold sm:grid-cols-4">
            <button
              type="button"
              onClick={() => handleTabChange('family')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 transition-all ${
                activePortal === 'family'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Family</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('priest')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 transition-all ${
                activePortal === 'priest'
                  ? 'bg-secondary text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Cross className="h-3.5 w-3.5" />
              <span>Priest</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('coordinator')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 transition-all ${
                activePortal === 'coordinator'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Coordinator</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('admin')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 transition-all ${
                activePortal === 'admin'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Portal Title & Subtitle */}
          <div className="mt-6 border-b pb-4">
            {activePortal === 'family' && (
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                    Parishioner Access
                  </span>
                </div>
                <h2 className="font-heading mt-1 text-xl font-bold text-foreground">
                  Parish Family Portal Sign In
                </h2>
                <p className="text-muted-foreground text-xs">
                  Access your family register, book Mass intentions, schedule house blessings, and request sacraments.
                </p>
              </div>
            )}

            {activePortal === 'priest' && (
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-[11px] font-bold text-secondary">
                    Clergy & Pastoral Care
                  </span>
                </div>
                <h2 className="font-heading mt-1 text-xl font-bold text-foreground">
                  Parish Priest & Clergy Login
                </h2>
                <p className="text-muted-foreground text-xs">
                  Pastoral management, Mass intention approvals, parish census, and spiritual ministry oversight.
                </p>
              </div>
            )}

            {activePortal === 'coordinator' && (
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                    Team & Ministry Leaders
                  </span>
                </div>
                <h2 className="font-heading mt-1 text-xl font-bold text-foreground">
                  Team Coordinator Portal
                </h2>
                <p className="text-muted-foreground text-xs">
                  Review and accept volunteer applications, assign ministry roles, and manage team activities.
                </p>
              </div>
            )}

            {activePortal === 'admin' && (
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[11px] font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    Parish Administration
                  </span>
                </div>
                <h2 className="font-heading mt-1 text-xl font-bold text-foreground">
                  Super Admin & Registry Desk
                </h2>
                <p className="text-muted-foreground text-xs">
                  Master family registry, offertory accounts, certificates generation, and system settings.
                </p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* PORTAL: FAMILY */}
            {activePortal === 'family' && (
              <div>
                <label className="text-foreground block text-xs font-extrabold uppercase tracking-wider mb-1.5">
                  Family Card Number / Family ID <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 101, 151, 301, 601, 701, 901 or QOAS-CARD-101"
                    className="border-input bg-background focus:ring-primary w-full rounded-xl border p-3 pl-10 text-sm font-semibold tracking-wide outline-none transition-all focus:ring-2"
                  />
                  <Users className="text-muted-foreground absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
                <p className="text-muted-foreground mt-1 text-[11px]">
                  Found on your official Parish Family Card issued by Queen of All Saints Church.
                </p>
              </div>
            )}

            {/* PORTAL: PRIEST */}
            {activePortal === 'priest' && (
              <div>
                <label className="text-foreground block text-xs font-extrabold uppercase tracking-wider mb-1.5">
                  Clergy ID / Username <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. priest or fr.anthony"
                    className="border-input bg-background focus:ring-secondary w-full rounded-xl border p-3 pl-10 text-sm font-semibold tracking-wide outline-none transition-all focus:ring-2"
                  />
                  <Cross className="text-muted-foreground absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
                <p className="text-muted-foreground mt-1 text-[11px]">
                  Authorized for Parish Priest & Assistant Parish Priests.
                </p>
              </div>
            )}

            {/* PORTAL: COORDINATOR */}
            {activePortal === 'coordinator' && (
              <div className="space-y-3">
                <div>
                  <label className="text-foreground block text-xs font-extrabold uppercase tracking-wider mb-1.5">
                    Select Ministry / Organization Team <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCoordTeam}
                      onChange={(e) => setSelectedCoordTeam(e.target.value)}
                      className="border-input bg-background focus:ring-emerald-600 w-full rounded-xl border p-3 pl-10 text-sm font-semibold outline-none transition-all focus:ring-2"
                    >
                      {COORDINATOR_TEAMS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label} ({t.role})
                        </option>
                      ))}
                    </select>
                    <Briefcase className="text-muted-foreground absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="text-foreground block text-xs font-extrabold uppercase tracking-wider mb-1.5">
                    Coordinator Username / ID (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. coordinator or coord.youth"
                      className="border-input bg-background focus:ring-emerald-600 w-full rounded-xl border p-3 pl-10 text-sm font-semibold outline-none transition-all focus:ring-2"
                    />
                    <UserCheck className="text-muted-foreground absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            )}

            {/* PORTAL: ADMIN */}
            {activePortal === 'admin' && (
              <div>
                <label className="text-foreground block text-xs font-extrabold uppercase tracking-wider mb-1.5">
                  Admin Username / ID <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. admin, superadmin, or office"
                    className="border-input bg-background focus:ring-slate-800 w-full rounded-xl border p-3 pl-10 text-sm font-semibold tracking-wide outline-none transition-all focus:ring-2"
                  />
                  <ShieldCheck className="text-muted-foreground absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
                <p className="text-muted-foreground mt-1 text-[11px]">
                  Authorized for Super Administrator and Parish Office Desk.
                </p>
              </div>
            )}

            {/* PASSWORD FIELD (Common to all portals) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-foreground text-xs font-extrabold uppercase tracking-wider">
                  Password <span className="text-rose-500">*</span>
                </label>
                {activePortal === 'family' && (
                  <Link
                    href="/forgot-password"
                    className="text-primary hover:underline text-xs font-semibold"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={
                    activePortal === 'family'
                      ? 'Enter mobile number or password'
                      : 'Enter secret portal password'
                  }
                  className="border-input bg-background focus:ring-primary w-full rounded-xl border p-3 pl-10 pr-10 text-sm font-semibold outline-none transition-all focus:ring-2"
                />
                <Lock className="text-muted-foreground absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground absolute right-3.5 top-1/2 -translate-y-1/2 p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-muted-foreground mt-1 text-[11px]">
                {activePortal === 'family'
                  ? 'Default password is your registered mobile number or Family@QOAS2026!'
                  : activePortal === 'priest'
                    ? 'Default credentials: priest / Priest@QOAS2026!'
                    : activePortal === 'coordinator'
                      ? 'Default credentials: coordinator / Coordinator@QOAS2026!'
                      : 'Default credentials: admin / Admin@QOAS2026!'}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.99] disabled:opacity-50 ${
                activePortal === 'family'
                  ? 'bg-primary hover:bg-primary/90'
                  : activePortal === 'priest'
                    ? 'bg-secondary hover:bg-secondary/90'
                    : activePortal === 'coordinator'
                      ? 'bg-emerald-700 hover:bg-emerald-800'
                      : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
              }`}
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <span>
                  {activePortal === 'family'
                    ? 'Sign In to Parish Family Portal'
                    : activePortal === 'priest'
                      ? 'Sign In as Parish Priest'
                      : activePortal === 'coordinator'
                        ? 'Sign In as Team Coordinator'
                        : 'Sign In to Super Admin Desk'}
                </span>
              )}
            </button>
          </form>

          {/* Security Guarantee */}
          <div className="border-border/60 mt-6 flex items-center justify-center gap-2 border-t pt-4 text-center text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Official Diocese of Tiruchirappalli SSL Encrypted Portal</span>
          </div>
        </div>

        {/* Parish Support & Help Note */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            Need help with your Family Card or login credentials? Contact the Parish Office at{' '}
            <strong className="text-foreground">+91 94421 00000</strong> or visit the office during working hours.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="text-muted-foreground p-8 text-center text-xs">Loading...</div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
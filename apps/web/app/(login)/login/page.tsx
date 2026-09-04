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
  Sparkles,
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
          headName: identifier || activePortal,
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
          <div className="mx-auto mb-3.5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-gold/70 bg-gradient-to-b from-[#001833] to-[#001020] p-2 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            <Image
              src="/images/logo.png"
              alt="Queen of All Saints Logo"
              width={72}
              height={72}
              className="h-full w-full object-contain"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-[11px] font-bold text-gold tracking-widest uppercase mb-2">
            <Cross className="h-3 w-3 text-gold" />
            <span>Diocese of Tiruchirappalli</span>
          </div>

          <h1 className="font-heading text-white text-2xl font-bold tracking-tight sm:text-3xl drop-shadow-sm">
            Queen of All Saints Roman Catholic Church
          </h1>
          <p
            className="text-gold-200/90 mt-1 text-xs font-semibold sm:text-sm"
            lang="ta"
            style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
          >
            அனைத்து புனிதர்களின் அரசி ஆலயம் · K.K. Nagar, Tiruchirappalli
          </p>

          <p className="font-serif text-[11px] italic text-slate-400 mt-2 tracking-wide">
            Ad Majorem Dei Gloriam · Sub Tuum Praesidium
          </p>
        </div>

        {/* Login Card with Harmonized Catholic Sacred Theme */}
        <div className="relative overflow-hidden rounded-3xl border border-gold/35 bg-[#001429]/85 p-6 sm:p-8 text-foreground shadow-2xl backdrop-blur-2xl">
          {/* Top Gold Liturgical Ribbon */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* Unified Sacred Portal Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-gold/25 bg-[#000d1a]/80 p-1.5 text-xs font-bold sm:grid-cols-4 shadow-inner">
            <button
              type="button"
              onClick={() => handleTabChange('family')}
              className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 transition-all ${
                activePortal === 'family'
                  ? 'border border-gold/60 bg-gradient-to-b from-gold/30 via-gold/15 to-gold/5 text-gold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
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
                  ? 'border border-gold/60 bg-gradient-to-b from-gold/30 via-gold/15 to-gold/5 text-gold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
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
                  ? 'border border-gold/60 bg-gradient-to-b from-gold/30 via-gold/15 to-gold/5 text-gold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
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
                  ? 'border border-gold/60 bg-gradient-to-b from-gold/30 via-gold/15 to-gold/5 text-gold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Portal Title & Subtitle */}
          <div className="mt-6 border-b border-slate-700/60 pb-4">
            {activePortal === 'family' && (
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-bold text-gold">
                    Parishioner Access
                  </span>
                </div>
                <h2 className="font-heading mt-2 text-xl font-bold text-white">
                  Parish Family Portal Sign In
                </h2>
                <p className="text-slate-300 text-xs mt-1">
                  Access your family register, book Mass intentions, schedule house blessings, and request sacraments.
                </p>
              </div>
            )}

            {activePortal === 'priest' && (
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-bold text-gold">
                    Clergy & Pastoral Care
                  </span>
                </div>
                <h2 className="font-heading mt-2 text-xl font-bold text-white">
                  Parish Priest & Clergy Sign In
                </h2>
                <p className="text-slate-300 text-xs mt-1">
                  Pastoral care administration, Mass intention confirmations, census register, and spiritual ministry oversight.
                </p>
              </div>
            )}

            {activePortal === 'coordinator' && (
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-bold text-gold">
                    Team & Ministry Leaders
                  </span>
                </div>
                <h2 className="font-heading mt-2 text-xl font-bold text-white">
                  Team Coordinator Portal
                </h2>
                <p className="text-slate-300 text-xs mt-1">
                  Review and accept volunteer applications, assign ministry roles, and manage team activities.
                </p>
              </div>
            )}

            {activePortal === 'admin' && (
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-bold text-gold">
                    Parish Administration
                  </span>
                </div>
                <h2 className="font-heading mt-2 text-xl font-bold text-white">
                  Parish Administration & Registry Desk
                </h2>
                <p className="text-slate-300 text-xs mt-1">
                  Master family registry, offertory accounts, certificates generation, and system administration.
                </p>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs font-semibold text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Unified Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* PORTAL: FAMILY */}
            {activePortal === 'family' && (
              <div>
                <label className="text-slate-200 block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Family Card Number / Family ID <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 101, 151, 301, 601, 701, 901 or QOAS-CARD-101"
                    className="border border-slate-700/80 bg-[#001833]/90 text-white placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/30 w-full rounded-xl p-3 pl-10 text-sm font-semibold tracking-wide outline-none transition-all"
                  />
                  <Users className="text-gold absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
                <p className="text-slate-400 mt-1 text-[11px]">
                  Found on your official Parish Family Card issued by Queen of All Saints Church.
                </p>
              </div>
            )}

            {/* PORTAL: PRIEST */}
            {activePortal === 'priest' && (
              <div>
                <label className="text-slate-200 block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Clergy ID / Username <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. priest or fr.anthony"
                    className="border border-slate-700/80 bg-[#001833]/90 text-white placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/30 w-full rounded-xl p-3 pl-10 text-sm font-semibold tracking-wide outline-none transition-all"
                  />
                  <Cross className="text-gold absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
                <p className="text-slate-400 mt-1 text-[11px]">
                  Authorized for Parish Priest & Assistant Parish Priests.
                </p>
              </div>
            )}

            {/* PORTAL: COORDINATOR */}
            {activePortal === 'coordinator' && (
              <div className="space-y-3">
                <div>
                  <label className="text-slate-200 block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Select Ministry / Organization Team <span className="text-gold">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCoordTeam}
                      onChange={(e) => setSelectedCoordTeam(e.target.value)}
                      className="border border-slate-700/80 bg-[#001833]/90 text-white focus:border-gold focus:ring-2 focus:ring-gold/30 w-full rounded-xl p-3 pl-10 text-sm font-semibold outline-none transition-all"
                    >
                      {COORDINATOR_TEAMS.map((t) => (
                        <option key={t.id} value={t.id} className="bg-[#001429] text-white">
                          {t.label} ({t.role})
                        </option>
                      ))}
                    </select>
                    <Briefcase className="text-gold absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="text-slate-200 block text-xs font-bold uppercase tracking-wider mb-1.5">
                    Coordinator Username / ID (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g. coordinator or coord.youth"
                      className="border border-slate-700/80 bg-[#001833]/90 text-white placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/30 w-full rounded-xl p-3 pl-10 text-sm font-semibold outline-none transition-all"
                    />
                    <UserCheck className="text-gold absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            )}

            {/* PORTAL: ADMIN */}
            {activePortal === 'admin' && (
              <div>
                <label className="text-slate-200 block text-xs font-bold uppercase tracking-wider mb-1.5">
                  Admin Username / ID <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. admin, superadmin, or office"
                    className="border border-slate-700/80 bg-[#001833]/90 text-white placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/30 w-full rounded-xl p-3 pl-10 text-sm font-semibold tracking-wide outline-none transition-all"
                  />
                  <ShieldCheck className="text-gold absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                </div>
                <p className="text-slate-400 mt-1 text-[11px]">
                  Authorized for Super Administrator and Parish Office Desk.
                </p>
              </div>
            )}

            {/* PASSWORD FIELD (Common to all portals) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-200 text-xs font-bold uppercase tracking-wider">
                  Password <span className="text-gold">*</span>
                </label>
                {activePortal === 'family' && (
                  <Link
                    href="/forgot-password"
                    className="text-gold hover:underline text-xs font-semibold"
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
                      ? 'Enter registered mobile number or password'
                      : 'Enter secret portal password'
                  }
                  className="border border-slate-700/80 bg-[#001833]/90 text-white placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/30 w-full rounded-xl p-3 pl-10 pr-10 text-sm font-semibold outline-none transition-all"
                />
                <Lock className="text-gold absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-white absolute right-3.5 top-1/2 -translate-y-1/2 p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4 text-slate-400" />}
                </button>
              </div>
              <p className="text-slate-400 mt-1 text-[11px]">
                {activePortal === 'family'
                  ? 'Default password is your registered mobile number or Family@QOAS2026!'
                  : activePortal === 'priest'
                    ? 'Default credentials: priest / Priest@QOAS2026!'
                    : activePortal === 'coordinator'
                      ? 'Default credentials: coordinator / Coordinator@QOAS2026!'
                      : 'Default credentials: admin / Admin@QOAS2026!'}
              </p>
            </div>

            {/* Dignified Catholic Liturgical Gold CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] py-3.5 text-sm font-extrabold text-[#001429] shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:brightness-105 hover:shadow-[0_6px_30px_rgba(212,175,55,0.45)] transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 animate-spin text-[#001429]" />
                  <span>Signing In...</span>
                </span>
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
          <div className="border-slate-700/60 mt-6 flex items-center justify-center gap-2 border-t pt-4 text-center text-xs text-slate-300">
            <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
            <span>Official Diocese of Tiruchirappalli SSL Encrypted Portal</span>
          </div>
        </div>

        {/* Parish Support & Help Note */}
        <div className="text-center text-xs text-slate-400">
          <p>
            Need assistance with your Family Card or parish credentials? Contact the Parish Office at{' '}
            <strong className="text-gold font-bold">+91 431 2400000</strong> or visit during office hours.
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
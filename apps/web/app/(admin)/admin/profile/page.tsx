'use client';

import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Save,
  CheckCircle2,
  Lock,
  Server,
  Key,
  Eye,
  EyeOff,
  Database,
  Building,
} from 'lucide-react';
import { computeHash, computeHashSync } from '@/lib/family-security';
import { logParishActivity } from '@/lib/google-sheets-logger';

interface AdminProfile {
  name: string;
  nameTa: string;
  roleTitle: string;
  department: string;
  email: string;
  phone: string;
  parishLocation: string;
  parishLocationTa: string;
  systemPermissions: string[];
}

const DEFAULT_ADMIN_PROFILE: AdminProfile = {
  name: 'Super Administrator',
  nameTa: 'தலைமை நிர்வாகி',
  roleTitle: 'Parish Platform Super Admin',
  department: 'Diocese & Parish Central IT Administration',
  email: 'admin@queenofallsaints.in',
  phone: '+91 94432 49671',
  parishLocation: 'Amalapuram, K.K. Nagar, Tiruchirappalli – 620 021',
  parishLocationTa: 'அமலாபுரம், கே.கே. நகர், திருச்சிராப்பள்ளி – 620 021',
  systemPermissions: [
    'PARISHIONER_MANAGEMENT',
    'SACRAMENTS_APPROVAL',
    'FINANCE_AUDIT_LEDGER',
    'BULLETIN_AND_NOTICES',
    'MINISTRY_AND_ANBIYAM_SUPERVISION',
    'SECURITY_ACCESS_CONTROL',
  ],
};

const STORAGE_KEY = 'qoas_admin_profile_v1';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile>(DEFAULT_ADMIN_PROFILE);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null,
  );

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setProfile(JSON.parse(saved));
        } else {
          const res = await fetch('/api/v1/profiles/admin');
          const data = await res.json();
          if (data?.data) {
            setProfile(data.data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
          }
        }
      } catch (err) {
        console.error('Failed to fetch admin profile:', err);
      }
    };
    loadProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));

      // Sync with API
      await fetch('/api/v1/profiles/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      logParishActivity({
        eventType: 'PARISH_NOTICE',
        familyId: 'SUPER_ADMIN',
        status: 'SUCCESS',
        summary: `Super Admin profile updated and synchronized for ${profile.name}`,
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({ type: 'error', text: 'Admin password must be at least 8 characters.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    try {
      const hash = await computeHash(newPassword);
      const syncHash = computeHashSync(newPassword);

      localStorage.setItem('qoas_admin_pwd_hash', hash);
      localStorage.setItem('qoas_admin_pwd_synchash', syncHash);

      logParishActivity({
        eventType: 'PASSWORD_CHANGE',
        familyId: 'SUPER_ADMIN',
        status: 'SUCCESS',
        summary: 'Super Admin credentials updated successfully',
      });

      setPasswordMsg({ type: 'success', text: 'Super Admin password updated successfully!' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordMsg({ type: 'error', text: 'Failed to update credentials.' });
    }
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl border-2 border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-gold-400/50 bg-gold-500/10 text-gold-300 shadow-lg sm:h-24 sm:w-24">
              <ShieldCheck className="h-10 w-10 text-primary dark:text-gold-400" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/20 px-3 py-0.5 text-xs font-bold text-gold-300">
                <Server className="h-3.5 w-3.5" /> {profile.roleTitle}
              </div>
              <h1 className="mt-1 font-display text-2xl font-black text-white sm:text-3xl">
                {profile.name}
              </h1>
              <p className="text-sm font-semibold text-slate-300">
                {profile.department} · Trichy Diocese
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 rounded-2xl border border-white/10 bg-black/30 p-1.5">
            <button
              onClick={() => setActiveTab('profile')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary text-white shadow-md font-black'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Admin Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'security'
                  ? 'bg-primary text-white shadow-md font-black'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Access & Security
            </button>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-3 rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/80 p-4 text-emerald-300 shadow-xl">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" />
          <div>
            <p className="font-bold">Super Admin Profile Synchronized</p>
            <p className="text-xs text-emerald-400/80">
              System credentials and administrative contact data are active across the database.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'profile' ? (
        <form onSubmit={handleSaveProfile} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Admin Details */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                <Building className="h-5 w-5 text-primary" /> Administrative Identity
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Administrator Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    பெயர் (தமிழ்)
                  </label>
                  <input
                    type="text"
                    value={profile.nameTa}
                    onChange={(e) => setProfile({ ...profile, nameTa: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Role & Designation
                  </label>
                  <input
                    type="text"
                    value={profile.roleTitle}
                    onChange={(e) => setProfile({ ...profile, roleTitle: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Department
                  </label>
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Contact & Location */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                <Phone className="h-5 w-5 text-primary" /> Contact & Parish Headquarters
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Admin Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    System Master Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Headquarters Location (English)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={profile.parishLocation}
                      onChange={(e) => setProfile({ ...profile, parishLocation: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    முகவரி (தமிழ்)
                  </label>
                  <input
                    type="text"
                    value={profile.parishLocationTa}
                    onChange={(e) => setProfile({ ...profile, parishLocationTa: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Permissions Matrix */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
              <Database className="h-5 w-5 text-primary" /> Active Super Admin Authorizations
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {profile.systemPermissions.map((perm) => (
                <div
                  key={perm}
                  className="flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-3 text-xs font-bold text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{perm.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-3 text-sm font-black text-white shadow-lg transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50"
              >
                <Save className="h-4 w-4" /> {isSaving ? 'Saving...' : 'Save & Sync Admin Profile'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Security & Password Tab */
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Super Admin Security
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Update master password with SHA-256 encryption.
              </p>
            </div>
          </div>

          {passwordMsg && (
            <div
              className={`mb-6 rounded-2xl p-4 text-xs font-bold ${
                passwordMsg.type === 'success'
                  ? 'border border-emerald-500/40 bg-emerald-950/80 text-emerald-300'
                  : 'border border-rose-500/40 bg-rose-950/80 text-rose-300'
              }`}
            >
              {passwordMsg.text}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                New Master Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 8 chars)"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-4 pr-10 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Confirm Master Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full rounded-2xl bg-primary py-3 text-sm font-black text-white shadow-lg transition-all hover:bg-primary/90 active:scale-95"
              >
                Update Super Admin Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}


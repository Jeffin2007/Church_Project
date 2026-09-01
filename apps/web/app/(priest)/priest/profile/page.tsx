'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Church,
  Mail,
  Phone,
  Clock,
  Save,
  CheckCircle2,
  Lock,
  Calendar,
  Sparkles,
  BookOpen,
  Eye,
  EyeOff,
} from 'lucide-react';
import { computeHash, computeHashSync } from '@/lib/family-security';
import { logParishActivity } from '@/lib/google-sheets-logger';

interface PriestProfile {
  name: string;
  nameTa: string;
  roleTitle: string;
  roleTitleTa: string;
  order: string;
  since: string;
  email: string;
  phone: string;
  emergencyPhone: string;
  officeHours: string;
  officeHoursTa: string;
  bioEn: string;
  bioTa: string;
  photoUrl: string;
}

const DEFAULT_PROFILE: PriestProfile = {
  name: 'Rev. Fr. ArokiyaSwamy O.Praem',
  nameTa: 'அருட்பணி ஆரோக்கியசாமி ஓப்ரேம்',
  roleTitle: 'Parish Priest & Rector',
  roleTitleTa: 'பங்குத் தந்தை & அதிபர்',
  order: 'Norbertine Fathers (O.Praem)',
  since: '2025',
  email: 'priest@queenofallsaints.in',
  phone: '+91 94432 49671',
  emergencyPhone: '+91 94432 49671',
  officeHours: 'Tuesday – Saturday: 9:00 AM – 1:00 PM & 5:00 PM – 8:30 PM',
  officeHoursTa: 'செவ்வாய் – சனி: காலை 9:00 – பிற்பகல் 1:00 & மாலை 5:00 – இரவு 8:30',
  bioEn:
    'Rev. Fr. ArokiyaSwamy O.Praem has served as Parish Priest of Queen of All Saints Roman Catholic Church, K.K. Nagar, Tiruchirappalli since 2025. He guides the parish in the Norbertine tradition of prayer, pastoral visitation, and care for all families across the 13 Anbiyams.',
  bioTa:
    'அருட்பணி ஆரோக்கியசாமி ஓப்ரேம் 2025 முதல் அனைத்து புனிதர்களின் அரசி கத்தோலிக்க ஆலயத்தின் பங்குத்தந்தையாகப் பணியாற்றி வருகிறார். நார்பர்ட் சபையின் இறைவழிபாட்டுப் பாரம்பரியத்தோடும், இல்ல சந்திப்புகளோடும் 13 அன்பியங்களின் குடும்பங்களை ஆன்மீக வழியில் வழிநடத்துகிறார்.',
  photoUrl: '/images/priest/fr-arokiyaswamy.jpg',
};

const STORAGE_KEY = 'qoas_priest_profile_v1';

export default function PriestProfilePage() {
  const [profile, setProfile] = useState<PriestProfile>(DEFAULT_PROFILE);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null,
  );

  useEffect(() => {
    // Load from local storage or API
    const loadProfile = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setProfile(JSON.parse(saved));
        } else {
          const res = await fetch('/api/v1/profiles/priest');
          const data = await res.json();
          if (data?.data) {
            setProfile(data.data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
          }
        }
      } catch (err) {
        console.error('Failed to fetch priest profile:', err);
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
      await fetch('/api/v1/profiles/priest', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      logParishActivity({
        eventType: 'PARISH_NOTICE',
        familyId: 'PARISH_PRIEST',
        status: 'SUCCESS',
        summary: `Parish Priest profile updated and synchronized for ${profile.name}`,
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

    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    try {
      const hash = await computeHash(newPassword);
      const syncHash = computeHashSync(newPassword);

      localStorage.setItem('qoas_priest_pwd_hash', hash);
      localStorage.setItem('qoas_priest_pwd_synchash', syncHash);

      logParishActivity({
        eventType: 'PASSWORD_CHANGE',
        familyId: 'PARISH_PRIEST',
        status: 'SUCCESS',
        summary: 'Parish Priest security credentials updated successfully',
      });

      setPasswordMsg({ type: 'success', text: 'Priest access password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordMsg({ type: 'error', text: 'Failed to update credentials.' });
    }
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Header Banner */}
      <div className="border-gold-400/30 rounded-3xl border-2 bg-gradient-to-r from-[hsl(214,75%,12%)] via-[hsl(214,70%,16%)] to-[hsl(214,75%,12%)] p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-gold-400/50 shadow-lg sm:h-24 sm:w-24">
              <Image
                src={profile.photoUrl || '/images/priest/fr-arokiyaswamy.jpg'}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/20 px-3 py-0.5 text-xs font-bold text-gold-300">
                <Church className="h-3.5 w-3.5" /> {profile.roleTitle}
              </div>
              <h1 className="mt-1 font-display text-2xl font-black text-white sm:text-3xl">
                {profile.name}
              </h1>
              <p
                className="text-sm font-semibold text-gold-300/90"
                style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
              >
                {profile.nameTa} · {profile.order}
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 rounded-2xl border border-white/10 bg-black/20 p-1.5">
            <button
              onClick={() => setActiveTab('profile')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-gold-500 text-slate-950 shadow-md font-black'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Pastoral Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === 'security'
                  ? 'bg-gold-500 text-slate-950 shadow-md font-black'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Security & Access
            </button>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-3 rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/80 p-4 text-emerald-300 shadow-xl">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" />
          <div>
            <p className="font-bold">Profile Synchronized Successfully</p>
            <p className="text-xs text-emerald-400/80">
              Your clergy information is synchronized with the parish database and public records.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'profile' ? (
        <form onSubmit={handleSaveProfile} className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Pastoral Identity Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                <Church className="h-5 w-5 text-primary" /> Pastoral Identity
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Full Name (English)
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Religious Order / Congregation
                    </label>
                    <input
                      type="text"
                      value={profile.order}
                      onChange={(e) => setProfile({ ...profile, order: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Appointed Since
                    </label>
                    <input
                      type="text"
                      value={profile.since}
                      onChange={(e) => setProfile({ ...profile, since: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Official Photo URL
                  </label>
                  <input
                    type="text"
                    value={profile.photoUrl}
                    onChange={(e) => setProfile({ ...profile, photoUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Pastoral Contacts & Office Hours */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
                <Phone className="h-5 w-5 text-primary" /> Contact & Office Schedule
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Priest Mobile Number
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
                    Official Email
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
                    Parish Office Hours (English)
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={profile.officeHours}
                      onChange={(e) => setProfile({ ...profile, officeHours: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    அலுவலக நேரம் (தமிழ்)
                  </label>
                  <input
                    type="text"
                    value={profile.officeHoursTa}
                    onChange={(e) => setProfile({ ...profile, officeHoursTa: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pastoral Biography & Message */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">
              <BookOpen className="h-5 w-5 text-primary" /> Pastoral Biography & Message to Faithful
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Biography (English)
                </label>
                <textarea
                  rows={4}
                  value={profile.bioEn}
                  onChange={(e) => setProfile({ ...profile, bioEn: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  ஆன்மீக செய்தி (தமிழ்)
                </label>
                <textarea
                  rows={4}
                  value={profile.bioTa}
                  onChange={(e) => setProfile({ ...profile, bioTa: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-900 focus:border-primary focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-3 text-sm font-black text-white shadow-lg transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50"
              >
                <Save className="h-4 w-4" /> {isSaving ? 'Synchronizing...' : 'Save & Sync Profile'}
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
                Clergy Access Security
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Update your priest portal password with cryptographic parish encryption.
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
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password (min. 6 chars)"
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
                Confirm New Password
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
                Update Clergy Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}


'use client';

import { useState } from 'react';
import { Home, Phone, Church, Edit3, Save, Clock, Sparkles, Award, Lock } from 'lucide-react';
import { useFamily, ParishFamilyProfile } from '@/context/family-context';

export default function FamilyProfilePage() {
  const { family, updateFamilyProfile, requestAnbiyamChange, sacramentalSummary } = useFamily();

  const [isEditing, setIsEditing] = useState(false);
  const [isAnbiyamModalOpen, setIsAnbiyamModalOpen] = useState(false);
  const [targetAnbiyam, setTargetAnbiyam] = useState('St. Jude Anbiyam');
  const [transferReason, setTransferReason] = useState('');
  const [showSacramentModal, setShowSacramentModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState<ParishFamilyProfile>(family);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateFamilyProfile(formData);
    setIsEditing(false);
  };

  const handleAnbiyamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestAnbiyamChange(targetAnbiyam, transferReason);
    setIsAnbiyamModalOpen(false);
  };

  const availableAnbiyams = [
    'St. Thomas Anbiyam',
    'St. Joseph Anbiyam',
    'St. Jude Anbiyam',
    'St. Mary Anbiyam',
    'St. Francis Xavier Anbiyam',
    'St. Teresa Anbiyam',
  ];

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Top Banner Header */}
      <div className="border-gold-400/40 rounded-3xl border-2 bg-gradient-to-r from-[hsl(214,75%,12%)] via-[hsl(214,70%,16%)] to-[hsl(214,75%,12%)] p-6 text-white shadow-2xl sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-black uppercase tracking-wider">
                <Home className="h-3.5 w-3.5" /> Family Code: {family.familyNumber}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                🟢 {family.status} Family
              </span>
            </div>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
              {family.name}
            </h1>
            <p className="text-sm font-medium text-white/85">
              Head: <span className="text-gold-300 font-bold">{family.headName}</span> · Ward:{' '}
              {family.ward} · {family.anbiyam}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => {
                  setFormData(family);
                  setIsEditing(true);
                }}
                className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-xs font-black text-slate-950 shadow-xl transition-all hover:scale-105"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Register Profile</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white hover:bg-white/20"
              >
                Cancel Editing
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PHASE 1 — Family Register Dashboard Summary Card */}
      <div className="border-gold-400/50 bg-card space-y-6 rounded-3xl border-2 p-6 shadow-2xl sm:p-8">
        <div className="border-border/60 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-2xl font-bold">
              <Church className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-foreground text-xl font-extrabold">
                Catholic Parish Family Register Dashboard
              </h2>
              <p className="text-muted-foreground text-xs">
                Official parish administration summary record for {family.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowSacramentModal(true)}
            className="text-primary text-xs font-bold hover:underline"
          >
            View Member Sacramental Breakdown →
          </button>
        </div>

        {/* 11 Summary Badges Grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {/* 1. Family Number */}
          <div className="bg-muted/40 border-border/60 rounded-2xl border p-3.5 text-center">
            <span className="text-muted-foreground block text-[10px] font-extrabold uppercase">
              🆔 Family Code
            </span>
            <span className="font-heading text-foreground text-sm font-black">
              {family.familyNumber}
            </span>
          </div>

          {/* 2. Registered Since */}
          <div className="border-amber-500/30 bg-amber-500/10 rounded-2xl border p-3.5 text-center">
            <span className="block text-[10px] font-extrabold uppercase text-amber-900 dark:text-amber-300">
              📅 Parish Since
            </span>
            <span className="font-heading text-base font-black text-amber-950 dark:text-amber-200">
              {family.registeredSince || '2012'}
            </span>
          </div>

          {/* 3. Anbiyam */}
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3.5 text-center">
            <span className="block text-[10px] font-extrabold uppercase text-blue-900 dark:text-blue-300">
              ⛪ Anbiyam Ward
            </span>
            <span className="font-heading line-clamp-1 text-base font-black text-blue-950 dark:text-blue-200">
              {family.anbiyam}
            </span>
          </div>

          {/* 4. Total Members */}
          <div className="bg-muted/50 border-border/60 rounded-2xl border p-3.5 text-center">
            <span className="text-muted-foreground block text-[10px] font-extrabold uppercase">
              👥 Total Members
            </span>
            <span className="font-heading text-foreground text-xl font-black">
              {sacramentalSummary.totalMembers}
            </span>
          </div>

          {/* 5. Active Members */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-center">
            <span className="block text-[10px] font-extrabold uppercase text-emerald-900 dark:text-emerald-300">
              🟢 Active Members
            </span>
            <span className="font-heading text-xl font-black text-emerald-950 dark:text-emerald-200">
              {sacramentalSummary.activeMembers}
            </span>
          </div>

          {/* 6. Baptized Members */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-center">
            <span className="block text-[10px] font-extrabold uppercase text-emerald-900 dark:text-emerald-300">
              🕊️ Baptized
            </span>
            <span className="font-heading text-xl font-black text-emerald-950 dark:text-emerald-200">
              {sacramentalSummary.baptizedCount} / {sacramentalSummary.totalMembers}
            </span>
          </div>

          {/* 7. Confirmed Members */}
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-3.5 text-center">
            <span className="block text-[10px] font-extrabold uppercase text-indigo-900 dark:text-indigo-300">
              🔥 Confirmed
            </span>
            <span className="font-heading text-xl font-black text-indigo-950 dark:text-indigo-200">
              {sacramentalSummary.confirmedCount}
            </span>
          </div>

          {/* 8. Married Couples */}
          <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-3.5 text-center">
            <span className="block text-[10px] font-extrabold uppercase text-purple-900 dark:text-purple-300">
              💍 Married Couples
            </span>
            <span className="font-heading text-xl font-black text-purple-950 dark:text-purple-200">
              {sacramentalSummary.marriedCouplesCount}
            </span>
          </div>

          {/* 9. House Blessing Status */}
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-center">
            <span className="block text-[10px] font-extrabold uppercase text-rose-900 dark:text-rose-300">
              🏡 House Blessing
            </span>
            <span className="font-heading text-sm font-black text-rose-950 dark:text-rose-200">
              {family.houseBlessingCompleted ? 'Blessed ✓' : 'Pending'}
            </span>
          </div>

          {/* 10. Census Completed */}
          <div className="rounded-2xl border border-teal-500/30 bg-teal-500/10 p-3.5 text-center">
            <span className="block text-[10px] font-extrabold uppercase text-teal-900 dark:text-teal-300">
              📋 Parish Census
            </span>
            <span className="font-heading text-sm font-black text-teal-950 dark:text-teal-200">
              {family.parishCensusCompleted ? 'Verified ✓' : 'Pending'}
            </span>
          </div>

          {/* 11. Family Status */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-center sm:col-span-2">
            <span className="block text-[10px] font-extrabold uppercase text-emerald-900 dark:text-emerald-300">
              ✨ Family Status
            </span>
            <span className="font-heading text-sm font-black text-emerald-950 dark:text-emerald-200">
              {family.status} Parishioner
            </span>
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Family & Registration Information */}
        <div className="border-border/80 bg-card space-y-6 rounded-3xl border-2 p-6 shadow-xl sm:p-8">
          <div className="border-border/60 flex items-center gap-3 border-b pb-4">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-foreground text-xl font-bold">
                1. Family & Registration Information
              </h2>
              <p className="text-muted-foreground text-xs">
                Basic parish registry identifiers and family leadership
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-xs sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Family Number (Read Only)
              </label>
              <input
                type="text"
                disabled
                value={formData.familyNumber}
                className="bg-muted/70 text-foreground w-full rounded-xl border p-3 font-bold opacity-80"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Registered Since Year
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.registeredSince || '2012'}
                onChange={(e) => setFormData({ ...formData, registeredSince: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Family Name *</label>
              <input
                type="text"
                required
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Head of Family *</label>
              <input
                type="text"
                required
                disabled={!isEditing}
                value={formData.headName}
                onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Spouse Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.spouseName}
                onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Preferred Language
              </label>
              <select
                disabled={!isEditing}
                value={formData.preferredLanguage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferredLanguage: e.target.value as 'English' | 'Tamil',
                  })
                }
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 outline-none focus:ring-2"
              >
                <option value="English">English</option>
                <option value="Tamil">Tamil (தமிழ்)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-muted-foreground mb-1 block font-bold">Street Address *</label>
              <input
                type="text"
                required
                disabled={!isEditing}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Landmark</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Ward / Area *</label>
              <input
                type="text"
                required
                disabled={!isEditing}
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Pincode *</label>
              <input
                type="text"
                required
                disabled={!isEditing}
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Religion *</label>
              <select
                disabled={!isEditing}
                value={formData.religion}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    religion: e.target.value as ParishFamilyProfile['religion'],
                  })
                }
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              >
                <option value="Catholic Christian">Catholic Christian</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Jain">Jain</option>
                <option value="Sikh">Sikh</option>
                <option value="Buddhist">Buddhist</option>
                <option value="Other Christian Denomination">Other Christian Denomination</option>
              </select>
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Christian Denomination
              </label>
              <select
                disabled={!isEditing}
                value={formData.otherChristianDenomination || 'CSI'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    otherChristianDenomination: e.target
                      .value as ParishFamilyProfile['otherChristianDenomination'],
                  })
                }
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              >
                <option value="CSI">
                  Roman Catholic (Latin Rite / Syro-Malabar / Syro-Malankara)
                </option>
                <option value="CSI">CSI (Church of South India)</option>
                <option value="Orthodox">Syrian Orthodox / Jacobite</option>
                <option value="Pentecostal">Pentecostal / Assembly of God</option>
                <option value="Anglican">Anglican / Episcopalian</option>
                <option value="Lutheran">TELC / Evangelical Lutheran</option>
                <option value="Independent Church">Independent Church</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="border-border/80 bg-card space-y-6 rounded-3xl border-2 p-6 shadow-xl sm:p-8">
          <div className="border-border/60 flex items-center gap-3 border-b pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 font-bold text-emerald-500">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-foreground text-xl font-bold">
                2. Contact Information
              </h2>
              <p className="text-muted-foreground text-xs">
                Phone numbers, messaging preferences, and emergency contact details
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-xs sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Mobile Number (Primary) *
              </label>
              <input
                type="text"
                required
                disabled={!isEditing}
                value={formData.headPhone}
                onChange={(e) => setFormData({ ...formData, headPhone: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Alternate Mobile Number
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.alternatePhone}
                onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Primary Email</label>
              <input
                type="email"
                disabled={!isEditing}
                value={formData.headEmail}
                onChange={(e) => setFormData({ ...formData, headEmail: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Emergency Contact Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.emergencyContactName}
                onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Emergency Contact Phone
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.emergencyContactPhone}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyContactPhone: e.target.value })
                }
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Wedding Anniversary
              </label>
              <input
                type="date"
                disabled={!isEditing}
                value={formData.weddingAnniversary || ''}
                onChange={(e) => setFormData({ ...formData, weddingAnniversary: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-2.5 outline-none focus:ring-2"
              />
            </div>

            <div className="flex flex-col justify-center space-y-2 pt-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="whatsAppAvailable"
                  disabled={!isEditing}
                  checked={formData.whatsAppAvailable}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsAppAvailable: e.target.checked })
                  }
                  className="accent-primary h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="whatsAppAvailable" className="text-foreground font-bold">
                  ✅ WhatsApp Active
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="receivesParishMagazine"
                  disabled={!isEditing}
                  checked={formData.receivesParishMagazine}
                  onChange={(e) =>
                    setFormData({ ...formData, receivesParishMagazine: e.target.checked })
                  }
                  className="accent-primary h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="receivesParishMagazine" className="text-foreground font-bold">
                  📖 Subscribed to Parish Magazine
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* PHASE 6 — Census Information (Family Level) */}
        <div className="border-border/80 bg-card space-y-6 rounded-3xl border-2 p-6 shadow-xl sm:p-8">
          <div className="border-border/60 flex items-center gap-3 border-b pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 font-bold text-teal-400">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-foreground text-xl font-bold">
                3. Parish Census & Pastoral Care Information
              </h2>
              <p className="text-muted-foreground text-xs">
                Housing, migration details, house blessing dates, and monthly pastoral visit status
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-xs sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Head Occupation</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.occupationHead || ''}
                onChange={(e) => setFormData({ ...formData, occupationHead: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Spouse Occupation
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.occupationSpouse || ''}
                onChange={(e) => setFormData({ ...formData, occupationSpouse: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Housing Type</label>
              <select
                disabled={!isEditing}
                value={formData.housingType || 'Own House'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    housingType: e.target.value as 'Own House' | 'Rental',
                  })
                }
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              >
                <option value="Own House">Own House</option>
                <option value="Rental">Rental Residence</option>
              </select>
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Migrated From (Native Location)
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.migratedFrom || 'N/A'}
                onChange={(e) => setFormData({ ...formData, migratedFrom: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">
                Date of Last House Blessing
              </label>
              <input
                type="date"
                disabled={!isEditing}
                value={formData.lastHouseBlessingDate}
                onChange={(e) =>
                  setFormData({ ...formData, lastHouseBlessingDate: e.target.value })
                }
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-2.5 outline-none focus:ring-2"
              />
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="houseBlessingCompleted"
                  disabled={!isEditing}
                  checked={formData.houseBlessingCompleted}
                  onChange={(e) =>
                    setFormData({ ...formData, houseBlessingCompleted: e.target.checked })
                  }
                  className="accent-primary h-4 w-4 rounded"
                />
                <label htmlFor="houseBlessingCompleted" className="text-foreground font-semibold">
                  🏡 Annual House Blessing Completed
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="familyPrayerConducted"
                  disabled={!isEditing}
                  checked={formData.familyPrayerConducted}
                  onChange={(e) =>
                    setFormData({ ...formData, familyPrayerConducted: e.target.checked })
                  }
                  className="accent-primary h-4 w-4 rounded"
                />
                <label htmlFor="familyPrayerConducted" className="text-foreground font-semibold">
                  🙏 Regular Family Prayer Conducted
                </label>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="monthlyVisitRequired"
                  disabled={!isEditing}
                  checked={formData.monthlyVisitRequired}
                  onChange={(e) =>
                    setFormData({ ...formData, monthlyVisitRequired: e.target.checked })
                  }
                  className="accent-primary h-4 w-4 rounded"
                />
                <label htmlFor="monthlyVisitRequired" className="text-foreground font-semibold">
                  🕊️ Monthly Priest Pastoral Visit Required
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="parishCensusCompleted"
                  disabled={!isEditing}
                  checked={formData.parishCensusCompleted}
                  onChange={(e) =>
                    setFormData({ ...formData, parishCensusCompleted: e.target.checked })
                  }
                  className="accent-primary h-4 w-4 rounded"
                />
                <label htmlFor="parishCensusCompleted" className="text-foreground font-semibold">
                  📋 Parish Census Verification Completed
                </label>
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="text-muted-foreground mb-1 block font-bold">
                Parish Census Remarks & Pastoral Notes
              </label>
              <textarea
                rows={3}
                disabled={!isEditing}
                value={formData.remarks || ''}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                placeholder="Notes for Parish Office regarding house blessing, elderly care, or intentions..."
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 text-xs outline-none focus:ring-2"
              />
            </div>
          </div>
        </div>

        {/* PHASE 7 — Community / Caste (Strict Catholic Privacy & Parish Office Confidential Record) */}
        <div className="border-gold-400/40 bg-card space-y-5 rounded-3xl border-2 p-6 shadow-xl sm:p-8">
          <div className="border-border/60 flex flex-wrap items-center justify-between gap-2 border-b pb-3">
            <div className="text-gold-300 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-heading text-foreground text-lg font-bold">
                4. Community / Caste Information
              </h3>
            </div>
            <span className="bg-gold-500/10 text-gold-300 border-gold-400/40 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-bold">
              <Lock className="text-gold-400 h-3 w-3" /> Confidential Record — Visible exclusively
              to the Parish Office
            </span>
          </div>

          {/* Galatians 3:28 Banner */}
          <div className="border-gold-400/40 bg-gold-500/10 space-y-2 rounded-2xl border p-5 text-center">
            <p className="font-display text-gold-300 text-sm font-black italic sm:text-base">
              "In Christ there is neither Jew nor Greek, slave nor free, for you are all one in
              Christ Jesus."
            </p>
            <p className="text-gold-400 text-xs font-bold uppercase tracking-widest">
              — Galatians 3:28
            </p>
          </div>

          <div className="bg-muted/50 border-border/60 text-muted-foreground rounded-2xl border p-4 text-xs leading-relaxed">
            <p className="font-medium">
              The Catholic Church affirms the equal divine dignity of every person in Christ Jesus.
              Community category options reflect approved parish register requirements for official
              census record-keeping and administrative purposes.
            </p>
            <p className="text-foreground mt-1 font-bold">
              * Note: Categories reflect parish approved register requirements and are kept strictly
              confidential.
            </p>
          </div>

          <div className="text-muted-foreground flex items-center gap-2 text-[11px] font-semibold">
            <Lock className="text-gold-400 h-3.5 w-3.5 flex-shrink-0" />
            <span>
              Strict Confidentiality & Backend Separation: Visible exclusively to authorized Parish
              Office clergy and administration. Family users cannot freely modify canonical
              Community records post-registration. Contact the Parish Office for official
              corrections.
            </span>
          </div>

          <div className="bg-muted/40 border-border/80 text-muted-foreground flex items-center gap-3 rounded-2xl border p-4 text-xs font-semibold">
            <Lock className="text-gold-400 h-5 w-5 flex-shrink-0" />
            <div>
              <span className="text-foreground block font-bold">Confidential Canonical Record</span>
              <span>
                Managed exclusively by the Parish Office. If a correction is needed, please submit a
                request to the Parish Office.
              </span>
            </div>
          </div>
        </div>

        {/* Section 5: Parish Registration & Anbiyam Assignment */}
        <div className="border-border/80 bg-card space-y-6 rounded-3xl border-2 p-6 shadow-xl sm:p-8">
          <div className="border-border/60 flex items-center gap-3 border-b pb-4">
            <div className="bg-gold-500/10 text-gold-300 flex h-10 w-10 items-center justify-center rounded-xl font-bold">
              <Church className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-foreground text-xl font-bold">
                5. Parish Registration & Anbiyam Assignment
              </h2>
              <p className="text-muted-foreground text-xs">
                Parish tenure, native parish, diocese, and Anbiyam ward allocation
              </p>
            </div>
          </div>

          {/* Anbiyam Status Box & Change Exception */}
          <div className="border-gold-400/40 bg-gold-500/10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-5">
            <div className="space-y-1">
              <span className="text-gold-300 text-[10px] font-black uppercase tracking-wider">
                Current Assigned Anbiyam
              </span>
              <h3 className="font-heading text-foreground text-xl font-bold">{family.anbiyam}</h3>
              <p className="text-muted-foreground text-xs">
                Ward Allocation: {family.ward} · Family Status: {family.status}
              </p>

              {family.anbiyamTransferStatus === 'PENDING_APPROVAL' && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-300">
                  <Clock className="h-4 w-4 animate-spin" />
                  <span>
                    Pending Approval: Requested transfer to {family.anbiyamRequestedChange}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsAnbiyamModalOpen(true)}
              className="border-gold-400/40 hover:bg-gold-500/20 text-gold-300 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all"
            >
              Request Anbiyam Change →
            </button>
          </div>

          <div className="grid gap-6 text-xs sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Native Parish</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.nativeParish}
                onChange={(e) => setFormData({ ...formData, nativeParish: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Diocese</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.diocese}
                onChange={(e) => setFormData({ ...formData, diocese: e.target.value })}
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block font-bold">Family Status</label>
              <select
                disabled={!isEditing}
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as ParishFamilyProfile['status'],
                  })
                }
                className="bg-background focus:ring-primary disabled:bg-muted/30 w-full rounded-xl border p-3 font-semibold outline-none focus:ring-2"
              >
                <option value="Active">Active</option>
                <option value="Temporarily Away">Temporarily Away</option>
                <option value="Moved">Moved</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Controls */}
        {isEditing && (
          <div className="border-border/60 flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="border-border hover:bg-muted rounded-xl border px-5 py-2.5 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-2.5 text-xs font-black text-slate-950 shadow-lg transition-all hover:scale-105"
            >
              <Save className="h-4 w-4" />
              <span>Save Register Changes Immediately</span>
            </button>
          </div>
        )}
      </form>

      {/* Anbiyam Request Modal */}
      {isAnbiyamModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground w-full max-w-lg space-y-6 rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  Request Anbiyam Change
                </h3>
                <p className="text-muted-foreground text-xs">
                  * Note: Anbiyam re-assignments require Parish Office approval.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAnbiyamModalOpen(false)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAnbiyamSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Current Anbiyam
                </label>
                <input
                  type="text"
                  disabled
                  value={family.anbiyam}
                  className="bg-muted/70 w-full rounded-xl border p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Requested Target Anbiyam *
                </label>
                <select
                  required
                  value={targetAnbiyam}
                  onChange={(e) => setTargetAnbiyam(e.target.value)}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                >
                  {availableAnbiyams.map((anb) => (
                    <option key={anb} value={anb}>
                      {anb}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Reason for Transfer Request
                </label>
                <textarea
                  rows={3}
                  value={transferReason}
                  onChange={(e) => setTransferReason(e.target.value)}
                  placeholder="e.g. Relocated residence to Ward 3 near St. Jude Chapel..."
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                />
              </div>

              <div className="border-border flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsAnbiyamModalOpen(false)}
                  className="border-border rounded-xl border px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="from-gold-400 to-gold-600 rounded-xl bg-gradient-to-r px-5 py-2 font-black text-slate-950 shadow transition-all hover:scale-105"
                >
                  Submit Request for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sacramental Breakdown Modal */}
      {showSacramentModal && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground max-h-[85vh] w-full max-w-2xl space-y-6 overflow-y-auto rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  Detailed Family Sacramental Summary
                </h3>
                <p className="text-muted-foreground text-xs">
                  Overview of all registered family members & religious milestones
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSacramentModal(false)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-muted/40 rounded-2xl border p-4 text-xs">
                  <span className="text-primary font-bold">Total Family Members</span>
                  <p className="font-heading text-foreground text-2xl font-bold">
                    {sacramentalSummary.totalMembers}
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
                  <span className="font-bold">Baptized Ratio</span>
                  <p className="font-heading text-2xl font-bold">
                    {sacramentalSummary.baptizedCount} / {sacramentalSummary.totalMembers} (
                    {Math.round(
                      (sacramentalSummary.baptizedCount / sacramentalSummary.totalMembers) * 100,
                    )}
                    %)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-heading text-sm font-bold">Individual Member Records</h4>
                <div className="space-y-2 text-xs">
                  {useFamily().members.map((m) => (
                    <div
                      key={m.id}
                      className="bg-muted/30 border-border/60 flex items-center justify-between rounded-xl border p-3"
                    >
                      <div>
                        <span className="text-foreground font-bold">{m.name}</span>
                        {m.tamilName && (
                          <span className="text-muted-foreground ml-1 text-[11px]">
                            ({m.tamilName})
                          </span>
                        )}
                        <span className="text-muted-foreground block text-[11px]">
                          {m.relation} · {m.gender} · Status: {m.maritalStatus}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {m.baptism.completed && (
                          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                            ✓ Baptized
                          </span>
                        )}
                        {m.firstCommunion.completed && (
                          <span className="bg-gold-500/20 text-gold-300 rounded px-2 py-0.5 text-[9px] font-bold">
                            ✓ 1st Communion
                          </span>
                        )}
                        {m.confirmation.completed && (
                          <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[9px] font-bold text-blue-400">
                            ✓ Confirmed
                          </span>
                        )}
                        {m.marriage.completed && (
                          <span className="rounded bg-purple-500/20 px-2 py-0.5 text-[9px] font-bold text-purple-400">
                            ✓ Married
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-border flex justify-end border-t pt-4">
              <button
                type="button"
                onClick={() => setShowSacramentModal(false)}
                className="bg-primary text-primary-foreground rounded-xl px-5 py-2 text-xs font-bold"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

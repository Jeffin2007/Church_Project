'use client';

import { useState } from 'react';
import { Users, Plus, Edit3, Trash2, CheckCircle2, XCircle, Save, Heart } from 'lucide-react';
import { useFamily, DetailedFamilyMember } from '@/context/family-context';
import {
  calculateAge,
  validateMemberDates,
  SacramentValidationErrors,
} from '@/lib/sacrament-validation';
import { MemberParishTimeline } from '@/components/family/member-parish-timeline';

export default function FamilyMembersPage() {
  const { members, updateMember, addMember, deleteMember, family } = useFamily();
  const [selectedMember, setSelectedMember] = useState<DetailedFamilyMember | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<SacramentValidationErrors>({});

  // Form State for Adding new member
  const [newMemberData, setNewMemberData] = useState<Omit<DetailedFamilyMember, 'id'>>({
    name: '',
    tamilName: '',
    relation: 'Son',
    dob: '2015-01-01',
    gender: 'MALE',
    maritalStatus: 'Single',
    phone: '',
    email: '',
    occupation: 'Student',
    religion: 'Catholic Christian',
    denomination: 'Roman Catholic (Latin Rite)',
    nativeParish: 'Queen of All Saints Church, Trichy',
    diocese: 'Diocese of Tiruchirapalli',
    baptism: {
      completed: true,
      date: '2015-02-01',
      church: 'Queen of All Saints Church',
      parish: 'Queen of All Saints Parish',
      diocese: 'Diocese of Tiruchirapalli',
    },
    firstCommunion: { completed: false, date: '', church: '' },
    confirmation: { completed: false, date: '', church: '' },
    marriage: { completed: false, date: '', church: '', spouseName: '' },
    holyOrders: { type: 'NONE', date: '' },
    religiousProfession: { type: 'NONE', congregation: '', seminary: '' },
    anointingOfSick: { received: false, date: '' },
    isCatechismStudent: true,
    isChoirMember: false,
    isMinistryMember: false,
    isVolunteer: false,
    isYouthMember: false,
    isAltarServer: false,
    isLegionOfMary: false,
    isVincentDePaul: false,
    isFamilyPrayerGroup: true,
    bloodGroup: 'O+',
    emergencyContact: '+91 98765 43210',
    specialNeeds: 'None',
    elderlyAssistance: false,
    homeCommunionRequired: false,
    bedridden: false,
  });

  const handleSaveSacraments = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    // Validate dates
    const errors = validateMemberDates(selectedMember);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    updateMember(selectedMember.id, selectedMember);
    setSelectedMember(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberData.name) return;

    const errors = validateMemberDates(newMemberData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    addMember(newMemberData);
    setIsAddModalOpen(false);
  };

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Header */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Users className="h-4 w-4" /> Catholic Parish Family Register & Sacraments
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Family Members & Sacramental Register
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Complete parish record for registered members under Family Code:{' '}
            <span className="text-primary font-bold">{family.familyNumber}</span> ({family.name})
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setValidationErrors({});
            setIsAddModalOpen(true);
          }}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>+ Register Family Member</span>
        </button>
      </div>

      {/* Grid of Member Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {members.map((m) => {
          const age = calculateAge(m.dob);

          // Calculate sacramental progress %
          const sacList = [
            m.baptism.completed,
            m.firstCommunion.completed,
            m.confirmation.completed,
          ];
          const progress = Math.round((sacList.filter(Boolean).length / sacList.length) * 100);

          return (
            <div
              key={m.id}
              className="border-border/80 bg-card hover:border-primary/60 space-y-6 rounded-3xl border-2 p-6 shadow-xl transition-all"
            >
              {/* Member Header (No profile photo as per Catholic rule - initials emblem) */}
              <div className="border-border/60 flex items-start justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="from-primary via-primary/80 to-secondary text-primary-foreground font-heading flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-black shadow-md">
                    {m.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-foreground text-lg font-bold">{m.name}</h3>
                      {m.tamilName && (
                        <span className="text-muted-foreground text-xs font-semibold">
                          ({m.tamilName})
                        </span>
                      )}
                      <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-[10px] font-bold">
                        {m.relation}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs font-medium">
                      DOB: {m.dob} ·{' '}
                      <span className="text-foreground font-bold">Age: {age} yrs</span> · {m.gender}{' '}
                      · {m.maritalStatus}
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      Jurisdiction: {m.denomination} · Native: {m.nativeParish}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setValidationErrors({});
                      setSelectedMember(m);
                    }}
                    className="text-muted-foreground hover:bg-muted hover:text-primary border-border rounded-xl border p-2 transition-colors"
                    title="Edit Sacraments & Parish Record"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  {m.relation !== 'Head of Family' && (
                    <button
                      type="button"
                      onClick={() => deleteMember(m.id)}
                      className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive border-border rounded-xl border p-2 transition-colors"
                      title="Remove Member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sacramental Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-muted-foreground">Sacramental Initiation Progress</span>
                  <span className="text-primary">{progress}% Complete</span>
                </div>
                <div className="bg-muted h-2.5 w-full overflow-hidden rounded-full">
                  <div
                    className="from-gold-400 to-gold-600 h-full bg-gradient-to-r transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* PHASE 3 — Sacramental Badges Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Baptism */}
                <div
                  className={`rounded-xl border p-2.5 ${
                    m.baptism.completed
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                      : 'border-border/60 bg-muted/30 text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>✝ Baptism</span>
                    {m.baptism.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <XCircle className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                  {m.baptism.completed && (
                    <p className="mt-1 line-clamp-1 text-[10px] text-emerald-300">
                      {m.baptism.date || 'Completed'} ({m.baptism.church || 'Parish'})
                    </p>
                  )}
                </div>

                {/* First Holy Communion */}
                <div
                  className={`rounded-xl border p-2.5 ${
                    m.firstCommunion.completed
                      ? 'border-gold-500/40 bg-gold-500/10 text-gold-300'
                      : 'border-border/60 bg-muted/30 text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>🍞 First Communion</span>
                    {m.firstCommunion.completed ? (
                      <CheckCircle2 className="text-gold-300 h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                  {m.firstCommunion.completed && (
                    <p className="text-gold-400 mt-1 line-clamp-1 text-[10px]">
                      {m.firstCommunion.date || 'Completed'}
                    </p>
                  )}
                </div>

                {/* Confirmation */}
                <div
                  className={`rounded-xl border p-2.5 ${
                    m.confirmation.completed
                      ? 'border-blue-500/40 bg-blue-500/10 text-blue-400'
                      : 'border-border/60 bg-muted/30 text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>🕊 Confirmation</span>
                    {m.confirmation.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    ) : (
                      <XCircle className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                  {m.confirmation.completed && (
                    <p className="mt-1 line-clamp-1 text-[10px] text-blue-300">
                      {m.confirmation.date || 'Completed'}
                    </p>
                  )}
                </div>

                {/* Holy Matrimony */}
                <div
                  className={`rounded-xl border p-2.5 ${
                    m.marriage.completed
                      ? 'border-purple-500/40 bg-purple-500/10 text-purple-400'
                      : 'border-border/60 bg-muted/30 text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>💍 Holy Matrimony</span>
                    {m.marriage.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-purple-400" />
                    ) : (
                      <XCircle className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                  {m.marriage.completed && (
                    <p className="mt-1 line-clamp-1 text-[10px] text-purple-300">
                      {m.marriage.date || 'Completed'}{' '}
                      {m.marriage.spouseName ? `(${m.marriage.spouseName})` : ''}
                    </p>
                  )}
                </div>
              </div>

              {/* Special Vocations & Anointing */}
              {(m.holyOrders?.type !== 'NONE' ||
                m.religiousProfession?.type !== 'NONE' ||
                m.anointingOfSick?.received) && (
                <div className="border-gold-400/30 bg-gold-500/10 text-gold-300 flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3 text-xs font-bold">
                  <span>⭐ Religious Vocation & Sacramental Notes:</span>
                  <div className="flex flex-wrap gap-1">
                    {m.holyOrders?.type !== 'NONE' && (
                      <span className="bg-gold-400 rounded px-2 py-0.5 text-[10px] font-black uppercase text-slate-950">
                        {m.holyOrders.type}
                      </span>
                    )}
                    {m.religiousProfession?.type !== 'NONE' && (
                      <span className="bg-gold-400 rounded px-2 py-0.5 text-[10px] font-black uppercase text-slate-950">
                        {m.religiousProfession.type}
                      </span>
                    )}
                    {m.anointingOfSick?.received && (
                      <span className="rounded bg-rose-500 px-2 py-0.5 text-[10px] font-black uppercase text-white">
                        Anointing Received ({m.anointingOfSick.date})
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* PHASE 4 — Pastoral Information Badges */}
              <div className="space-y-1.5">
                <span className="text-muted-foreground block text-[10px] font-extrabold uppercase tracking-wider">
                  Pastoral Engagement Badges
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {m.isCatechismStudent && (
                    <span className="rounded-md border border-emerald-500/40 bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-400">
                      📖 Catechism Student
                    </span>
                  )}
                  {m.isChoirMember && (
                    <span className="border-gold-400/40 bg-gold-500/20 text-gold-300 rounded-md border px-2 py-1 text-[10px] font-bold">
                      🎵 Choir Member
                    </span>
                  )}
                  {m.isMinistryMember && (
                    <span className="rounded-md border border-blue-500/40 bg-blue-500/20 px-2 py-1 text-[10px] font-bold text-blue-400">
                      ⛪ Lay Ministry
                    </span>
                  )}
                  {m.isVolunteer && (
                    <span className="rounded-md border border-indigo-500/40 bg-indigo-500/20 px-2 py-1 text-[10px] font-bold text-indigo-400">
                      🤝 Parish Volunteer
                    </span>
                  )}
                  {m.isYouthMember && (
                    <span className="rounded-md border border-purple-500/40 bg-purple-500/20 px-2 py-1 text-[10px] font-bold text-purple-400">
                      ✨ Youth Movement
                    </span>
                  )}
                  {m.isAltarServer && (
                    <span className="rounded-md border border-amber-500/40 bg-amber-500/20 px-2 py-1 text-[10px] font-bold text-amber-300">
                      🕯️ Altar Server
                    </span>
                  )}
                  {m.isLegionOfMary && (
                    <span className="rounded-md border border-rose-500/40 bg-rose-500/20 px-2 py-1 text-[10px] font-bold text-rose-400">
                      🌹 Legion of Mary
                    </span>
                  )}
                  {m.isVincentDePaul && (
                    <span className="rounded-md border border-teal-500/40 bg-teal-500/20 px-2 py-1 text-[10px] font-bold text-teal-400">
                      ✝ St. Vincent de Paul
                    </span>
                  )}
                  {m.isFamilyPrayerGroup && (
                    <span className="rounded-md border border-sky-500/40 bg-sky-500/20 px-2 py-1 text-[10px] font-bold text-sky-400">
                      🙏 Family Prayer Group
                    </span>
                  )}
                </div>
              </div>

              {/* PHASE 5 — Medical & Emergency Pastoral Care */}
              {(m.elderlyAssistance ||
                m.homeCommunionRequired ||
                m.bedridden ||
                m.specialNeeds !== 'None') && (
                <div className="space-y-1 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-bold text-rose-300">
                  <div className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-rose-400" />
                    <span>Pastoral & Medical Assistance Required:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                    {m.elderlyAssistance && <span>👵 Elderly Assistance</span>}
                    {m.homeCommunionRequired && <span>🍞 Home Communion Required</span>}
                    {m.bedridden && <span>🛌 Bedridden Pastoral Care</span>}
                    {m.specialNeeds && m.specialNeeds !== 'None' && (
                      <span>♿ Needs: {m.specialNeeds}</span>
                    )}
                  </div>
                </div>
              )}

              {/* PHASE 9 — Parish Milestone Timeline */}
              <MemberParishTimeline member={m} houseBlessingDate={family.lastHouseBlessingDate} />

              {/* Footer */}
              <div className="border-border/40 text-muted-foreground flex flex-wrap items-center justify-between border-t pt-2 text-[11px] font-medium">
                <span>Phone: {m.phone || 'N/A'}</span>
                <span>Blood: {m.bloodGroup || 'Optional'}</span>
                <span>Email: {m.email || 'N/A'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Sacraments & Member Details Modal */}
      {selectedMember && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground max-h-[88vh] w-full max-w-3xl space-y-6 overflow-y-auto rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  Edit Parish Record: {selectedMember.name}
                </h3>
                <p className="text-muted-foreground text-xs">
                  Update personal details, sacraments, and pastoral engagement
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSacraments} className="space-y-6 text-xs">
              {/* Member Basic Info */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={selectedMember.name}
                    onChange={(e) => setSelectedMember({ ...selectedMember, name: e.target.value })}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  />
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Tamil Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ஜோசப் அந்தோணி"
                    value={selectedMember.tamilName || ''}
                    onChange={(e) =>
                      setSelectedMember({ ...selectedMember, tamilName: e.target.value })
                    }
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                  />
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Relationship *
                  </label>
                  <select
                    value={selectedMember.relation}
                    onChange={(e) =>
                      setSelectedMember({
                        ...selectedMember,
                        relation: e.target.value as DetailedFamilyMember['relation'],
                      })
                    }
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  >
                    <option value="Head of Family">Head of Family</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Grandfather">Grandfather</option>
                    <option value="Grandmother">Grandmother</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedMember.dob}
                    onChange={(e) => setSelectedMember({ ...selectedMember, dob: e.target.value })}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                  />
                  {validationErrors.dob && (
                    <p className="text-destructive mt-1 font-bold">{validationErrors.dob}</p>
                  )}
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Marital Status *
                  </label>
                  <select
                    value={selectedMember.maritalStatus}
                    onChange={(e) =>
                      setSelectedMember({
                        ...selectedMember,
                        maritalStatus: e.target.value as DetailedFamilyMember['maritalStatus'],
                      })
                    }
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  >
                    <option value="Single">Single</option>
                    <option value="Married (Church)">Married (Church)</option>
                    <option value="Married (Civil)">Married (Civil)</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Religious / Clergy">Religious / Clergy</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">Occupation</label>
                  <input
                    type="text"
                    value={selectedMember.occupation}
                    onChange={(e) =>
                      setSelectedMember({ ...selectedMember, occupation: e.target.value })
                    }
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                  />
                </div>
              </div>

              {/* Sacramental Tracking Fields */}
              <div className="space-y-4">
                <h4 className="font-heading text-foreground border-border/60 border-b pb-2 text-sm font-bold">
                  Sacramental Register
                </h4>

                {/* 1. Baptism */}
                <div className="bg-muted/30 border-border/60 space-y-3 rounded-2xl border p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-bold text-emerald-400">
                      1. Sacrament of Holy Baptism
                    </span>
                    <label className="flex items-center gap-2 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedMember.baptism.completed}
                        onChange={(e) =>
                          setSelectedMember({
                            ...selectedMember,
                            baptism: { ...selectedMember.baptism, completed: e.target.checked },
                          })
                        }
                        className="accent-primary h-4 w-4 rounded"
                      />
                      <span>Completed</span>
                    </label>
                  </div>
                  {selectedMember.baptism.completed && (
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="text-muted-foreground mb-1 block">Baptism Date</label>
                        <input
                          type="date"
                          value={selectedMember.baptism.date}
                          onChange={(e) =>
                            setSelectedMember({
                              ...selectedMember,
                              baptism: { ...selectedMember.baptism, date: e.target.value },
                            })
                          }
                          className="bg-background w-full rounded-xl border p-2 outline-none"
                        />
                        {validationErrors.baptismDate && (
                          <p className="text-destructive mt-1 font-bold">
                            {validationErrors.baptismDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground mb-1 block">Church Name</label>
                        <input
                          type="text"
                          placeholder="Church Name"
                          value={selectedMember.baptism.church}
                          onChange={(e) =>
                            setSelectedMember({
                              ...selectedMember,
                              baptism: { ...selectedMember.baptism, church: e.target.value },
                            })
                          }
                          className="bg-background w-full rounded-xl border p-2 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-muted-foreground mb-1 block">Parish / Diocese</label>
                        <input
                          type="text"
                          placeholder="Diocese of Trichy"
                          value={selectedMember.baptism.diocese || ''}
                          onChange={(e) =>
                            setSelectedMember({
                              ...selectedMember,
                              baptism: { ...selectedMember.baptism, diocese: e.target.value },
                            })
                          }
                          className="bg-background w-full rounded-xl border p-2 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. First Holy Communion */}
                <div className="bg-muted/30 border-border/60 space-y-3 rounded-2xl border p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-gold-300 text-sm font-bold">
                      2. First Holy Communion
                    </span>
                    <label className="flex items-center gap-2 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedMember.firstCommunion.completed}
                        onChange={(e) =>
                          setSelectedMember({
                            ...selectedMember,
                            firstCommunion: {
                              ...selectedMember.firstCommunion,
                              completed: e.target.checked,
                            },
                          })
                        }
                        className="accent-primary h-4 w-4 rounded"
                      />
                      <span>Completed</span>
                    </label>
                  </div>
                  {selectedMember.firstCommunion.completed && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-muted-foreground mb-1 block">Communion Date</label>
                        <input
                          type="date"
                          value={selectedMember.firstCommunion.date}
                          onChange={(e) =>
                            setSelectedMember({
                              ...selectedMember,
                              firstCommunion: {
                                ...selectedMember.firstCommunion,
                                date: e.target.value,
                              },
                            })
                          }
                          className="bg-background w-full rounded-xl border p-2 outline-none"
                        />
                        {validationErrors.firstCommunionDate && (
                          <p className="text-destructive mt-1 font-bold">
                            {validationErrors.firstCommunionDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground mb-1 block">Church Name</label>
                        <input
                          type="text"
                          placeholder="Church Name"
                          value={selectedMember.firstCommunion.church}
                          onChange={(e) =>
                            setSelectedMember({
                              ...selectedMember,
                              firstCommunion: {
                                ...selectedMember.firstCommunion,
                                church: e.target.value,
                              },
                            })
                          }
                          className="bg-background w-full rounded-xl border p-2 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Confirmation */}
                <div className="bg-muted/30 border-border/60 space-y-3 rounded-2xl border p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-bold text-blue-400">
                      3. Sacrament of Confirmation
                    </span>
                    <label className="flex items-center gap-2 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedMember.confirmation.completed}
                        onChange={(e) =>
                          setSelectedMember({
                            ...selectedMember,
                            confirmation: {
                              ...selectedMember.confirmation,
                              completed: e.target.checked,
                            },
                          })
                        }
                        className="accent-primary h-4 w-4 rounded"
                      />
                      <span>Completed</span>
                    </label>
                  </div>
                  {selectedMember.confirmation.completed && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-muted-foreground mb-1 block">
                          Confirmation Date
                        </label>
                        <input
                          type="date"
                          value={selectedMember.confirmation.date}
                          onChange={(e) =>
                            setSelectedMember({
                              ...selectedMember,
                              confirmation: {
                                ...selectedMember.confirmation,
                                date: e.target.value,
                              },
                            })
                          }
                          className="bg-background w-full rounded-xl border p-2 outline-none"
                        />
                        {validationErrors.confirmationDate && (
                          <p className="text-destructive mt-1 font-bold">
                            {validationErrors.confirmationDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground mb-1 block">Church Name</label>
                        <input
                          type="text"
                          placeholder="Church Name"
                          value={selectedMember.confirmation.church}
                          onChange={(e) =>
                            setSelectedMember({
                              ...selectedMember,
                              confirmation: {
                                ...selectedMember.confirmation,
                                church: e.target.value,
                              },
                            })
                          }
                          className="bg-background w-full rounded-xl border p-2 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Holy Matrimony */}
                <div className="bg-muted/30 border-border/60 space-y-3 rounded-2xl border p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-bold text-purple-400">
                      4. Sacrament of Holy Matrimony
                    </span>
                    <label className="flex items-center gap-2 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedMember.marriage.completed}
                        onChange={(e) =>
                          setSelectedMember({
                            ...selectedMember,
                            marriage: { ...selectedMember.marriage, completed: e.target.checked },
                          })
                        }
                        className="accent-primary h-4 w-4 rounded"
                      />
                      <span>Completed</span>
                    </label>
                  </div>
                  {selectedMember.marriage.completed && (
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="text-muted-foreground mb-1 block">Marriage Date</label>
                        <input
                          type="date"
                          value={selectedMember.marriage.date}
                          onChange={(e) =>
                            setSelectedMember({
                              ...selectedMember,
                              marriage: { ...selectedMember.marriage, date: e.target.value },
                            })
                          }
                          className="bg-background w-full rounded-xl border p-2 outline-none"
                        />
                        {validationErrors.marriageDate && (
                          <p className="text-destructive mt-1 font-bold">
                            {validationErrors.marriageDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-muted-foreground mb-1 block">Spouse Full Name</label>
                        <input
                          type="text"
                          placeholder="Spouse Name"
                          value={selectedMember.marriage.spouseName || ''}
                          onChange={(e) =>
                            setSelectedMember({
                              ...selectedMember,
                              marriage: { ...selectedMember.marriage, spouseName: e.target.value },
                            })
                          }
                          className="bg-background w-full rounded-xl border p-2 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-muted-foreground mb-1 block">Church Name</label>
                        <input
                          type="text"
                          placeholder="Church Name"
                          value={selectedMember.marriage.church}
                          onChange={(e) =>
                            setSelectedMember({
                              ...selectedMember,
                              marriage: { ...selectedMember.marriage, church: e.target.value },
                            })
                          }
                          className="bg-background w-full rounded-xl border p-2 outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* PHASE 4 & 5 Pastoral Engagement & Pastoral Care Checks */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-heading text-foreground border-border/60 border-b pb-2 text-sm font-bold">
                    Pastoral Engagement & Pastoral Care
                  </h4>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <label className="flex items-center gap-2 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedMember.isChoirMember}
                        onChange={(e) =>
                          setSelectedMember({
                            ...selectedMember,
                            isChoirMember: e.target.checked,
                          })
                        }
                        className="accent-primary h-4 w-4 rounded"
                      />
                      <span>🎵 Choir Member</span>
                    </label>

                    <label className="flex items-center gap-2 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedMember.isCatechismStudent}
                        onChange={(e) =>
                          setSelectedMember({
                            ...selectedMember,
                            isCatechismStudent: e.target.checked,
                          })
                        }
                        className="accent-primary h-4 w-4 rounded"
                      />
                      <span>📖 Catechism Student</span>
                    </label>

                    <label className="flex items-center gap-2 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedMember.isAltarServer}
                        onChange={(e) =>
                          setSelectedMember({
                            ...selectedMember,
                            isAltarServer: e.target.checked,
                          })
                        }
                        className="accent-primary h-4 w-4 rounded"
                      />
                      <span>🕯️ Altar Server</span>
                    </label>

                    <label className="flex items-center gap-2 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedMember.elderlyAssistance}
                        onChange={(e) =>
                          setSelectedMember({
                            ...selectedMember,
                            elderlyAssistance: e.target.checked,
                          })
                        }
                        className="accent-primary h-4 w-4 rounded"
                      />
                      <span>👵 Elderly Assistance</span>
                    </label>

                    <label className="flex items-center gap-2 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedMember.homeCommunionRequired}
                        onChange={(e) =>
                          setSelectedMember({
                            ...selectedMember,
                            homeCommunionRequired: e.target.checked,
                          })
                        }
                        className="accent-primary h-4 w-4 rounded"
                      />
                      <span>🍞 Home Communion</span>
                    </label>

                    <label className="flex items-center gap-2 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedMember.bedridden}
                        onChange={(e) =>
                          setSelectedMember({
                            ...selectedMember,
                            bedridden: e.target.checked,
                          })
                        }
                        className="accent-primary h-4 w-4 rounded"
                      />
                      <span>🛌 Bedridden Pastoral Care</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-border flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="border-border rounded-xl border px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2 font-black text-slate-950 shadow transition-all hover:scale-105"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Sacramental & Parish Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground w-full max-w-lg space-y-6 rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  Register New Family Member
                </h3>
                <p className="text-muted-foreground text-xs">
                  Add member to Family Code: {family.familyNumber}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-muted-foreground mb-1 block font-bold">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Agnes Joseph"
                  value={newMemberData.name}
                  onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block font-bold">
                  Tamil Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ஆக்னஸ் ஜோசப்"
                  value={newMemberData.tamilName || ''}
                  onChange={(e) =>
                    setNewMemberData({ ...newMemberData, tamilName: e.target.value })
                  }
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Relationship *
                  </label>
                  <select
                    value={newMemberData.relation}
                    onChange={(e) =>
                      setNewMemberData({
                        ...newMemberData,
                        relation: e.target.value as DetailedFamilyMember['relation'],
                      })
                    }
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  >
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Grandfather">Grandfather</option>
                    <option value="Grandmother">Grandmother</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={newMemberData.dob}
                    onChange={(e) => setNewMemberData({ ...newMemberData, dob: e.target.value })}
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                  />
                  {validationErrors.dob && (
                    <p className="text-destructive mt-1 font-bold">{validationErrors.dob}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">Gender *</label>
                  <select
                    value={newMemberData.gender}
                    onChange={(e) =>
                      setNewMemberData({
                        ...newMemberData,
                        gender: e.target.value as 'MALE' | 'FEMALE' | 'OTHER',
                      })
                    }
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 font-bold outline-none focus:ring-2"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-bold">Occupation</label>
                  <input
                    type="text"
                    placeholder="e.g. Student"
                    value={newMemberData.occupation}
                    onChange={(e) =>
                      setNewMemberData({ ...newMemberData, occupation: e.target.value })
                    }
                    className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                  />
                </div>
              </div>

              <div className="border-border flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="border-border rounded-xl border px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="from-gold-400 to-gold-600 rounded-xl bg-gradient-to-r px-5 py-2 font-black text-slate-950 shadow transition-all hover:scale-105"
                >
                  Register Family Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

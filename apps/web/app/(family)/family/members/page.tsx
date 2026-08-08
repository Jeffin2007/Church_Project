'use client';

import { useState } from 'react';
import { Users, Plus, Edit3, Trash2, CheckCircle2, XCircle, Heart } from 'lucide-react';
import { useFamily, DetailedFamilyMember } from '@/context/family-context';
import { calculateAge } from '@/lib/sacrament-validation';
import { MemberParishTimeline } from '@/components/family/member-parish-timeline';
import { RegisterMemberWorkspace } from '@/components/family/register-member-workspace';

export default function FamilyMembersPage() {
  const { members, deleteMember, family } = useFamily();
  const [selectedMember, setSelectedMember] = useState<DetailedFamilyMember | null>(null);
  const [viewMode, setViewMode] = useState<'directory' | 'register'>('directory');

  if (selectedMember) {
    return (
      <RegisterMemberWorkspace
        memberToEdit={selectedMember}
        onBack={() => setSelectedMember(null)}
        onSuccess={() => setSelectedMember(null)}
      />
    );
  }

  if (viewMode === 'register') {
    return (
      <RegisterMemberWorkspace
        onBack={() => setViewMode('directory')}
        onSuccess={() => setViewMode('directory')}
      />
    );
  }

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
            setViewMode('register');
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
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                      : 'border-border/60 bg-muted/30 text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>✝ Baptism</span>
                    {m.baptism.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                  {m.baptism.completed && (
                    <p className="mt-1 line-clamp-1 text-[10px] text-emerald-900 dark:text-emerald-300 font-medium">
                      {m.baptism.date || 'Completed'} ({m.baptism.church || 'Parish'})
                    </p>
                  )}
                </div>

                {/* First Holy Communion */}
                <div
                  className={`rounded-xl border p-2.5 ${
                    m.firstCommunion.completed
                      ? 'border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-300'
                      : 'border-border/60 bg-muted/30 text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>🍞 First Communion</span>
                    {m.firstCommunion.completed ? (
                      <CheckCircle2 className="text-amber-700 dark:text-amber-400 h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                  {m.firstCommunion.completed && (
                    <p className="text-amber-900 dark:text-amber-300 mt-1 line-clamp-1 text-[10px] font-medium">
                      {m.firstCommunion.date || 'Completed'}
                    </p>
                  )}
                </div>

                {/* Confirmation */}
                <div
                  className={`rounded-xl border p-2.5 ${
                    m.confirmation.completed
                      ? 'border-blue-500/40 bg-blue-500/10 text-blue-900 dark:text-blue-300'
                      : 'border-border/60 bg-muted/30 text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>🕊 Confirmation</span>
                    {m.confirmation.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                    ) : (
                      <XCircle className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                  {m.confirmation.completed && (
                    <p className="mt-1 line-clamp-1 text-[10px] text-blue-900 dark:text-blue-300 font-medium">
                      {m.confirmation.date || 'Completed'}
                    </p>
                  )}
                </div>

                {/* Holy Matrimony */}
                <div
                  className={`rounded-xl border p-2.5 ${
                    m.marriage.completed
                      ? 'border-purple-500/40 bg-purple-500/10 text-purple-900 dark:text-purple-300'
                      : 'border-border/60 bg-muted/30 text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>💍 Holy Matrimony</span>
                    {m.marriage.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-purple-700 dark:text-purple-400" />
                    ) : (
                      <XCircle className="h-4 w-4 opacity-50" />
                    )}
                  </div>
                  {m.marriage.completed && (
                    <p className="mt-1 line-clamp-1 text-[10px] text-purple-900 dark:text-purple-300 font-medium">
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
    </div>
  );
}

'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home,
  CreditCard,
  Users,
  Heart,
  Church,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { AnnouncementWidget } from '@/components/announcements/announcement-widget';
import { CompactDailyReadingsWidget } from '@/components/home/compact-daily-readings';
import { useFamily } from '@/context/family-context';
import { getLiveNextMass } from '@/lib/mass-schedule-helper';

export default function FamilyDashboardPage() {
  const { family, members, massIntentions, homeCommunionVisits } = useFamily();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const liveMass = useMemo(() => getLiveNextMass(currentTime), [currentTime]);

  const digitalServices = [
    {
      label: 'Mass Intention Request',
      href: '/family/mass-intentions',
      icon: Church,
      desc: 'Offer Mass for Thanksgiving, Birthdays, Deceased (₹100 offering)',
      cardBg: 'bg-card border-amber-500/40 hover:border-amber-500 shadow-md hover:shadow-xl',
      iconBg: 'bg-amber-500/20 text-amber-700 dark:text-amber-300',
      titleColor: 'text-slate-900 dark:text-white font-black',
      descColor: 'text-slate-800 dark:text-slate-200 font-bold',
    },
    {
      label: 'Communion for the Sick',
      href: '/family/home-communion',
      icon: Heart,
      desc: 'Request priest home visit for elderly or bedridden family',
      cardBg: 'bg-card border-rose-500/40 hover:border-rose-500 shadow-md hover:shadow-xl',
      iconBg: 'bg-rose-500/20 text-rose-700 dark:text-rose-300',
      titleColor: 'text-slate-900 dark:text-white font-black',
      descColor: 'text-slate-800 dark:text-slate-200 font-bold',
    },
    {
      label: 'Emergency Pastoral Care',
      href: '/family/home-communion',
      icon: ShieldAlert,
      desc: '24/7 Priest emergency phone line for Anointing of the Sick',
      cardBg: 'bg-card border-red-500/50 hover:border-red-500 shadow-md hover:shadow-xl',
      iconBg: 'bg-red-500/25 text-red-700 dark:text-red-300',
      titleColor: 'text-slate-900 dark:text-white font-black',
      descColor: 'text-slate-800 dark:text-slate-200 font-bold',
    },
    {
      label: 'House Blessing Request',
      href: '/family/house-blessing',
      icon: Home,
      desc: 'Schedule annual family house blessing with parish clergy',
      cardBg: 'bg-card border-emerald-500/40 hover:border-emerald-500 shadow-md hover:shadow-xl',
      iconBg: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300',
      titleColor: 'text-slate-900 dark:text-white font-black',
      descColor: 'text-slate-800 dark:text-slate-200 font-bold',
    },
    {
      label: 'Prayer Intention Request',
      href: '/family/prayer-request',
      icon: Sparkles,
      desc: 'Submit family prayer intentions for inclusion in daily community prayers',
      cardBg: 'bg-card border-amber-500/40 hover:border-amber-500 shadow-md hover:shadow-xl',
      iconBg: 'bg-amber-500/20 text-amber-700 dark:text-amber-300',
      titleColor: 'text-slate-900 dark:text-white font-black',
      descColor: 'text-slate-800 dark:text-slate-200 font-bold',
    },
    {
      label: 'Pay Parish Offertory',
      href: '/family/payments',
      icon: CreditCard,
      desc: 'Pay your holy offerings and donations securely with verified receipts',
      cardBg: 'bg-card border-indigo-500/40 hover:border-indigo-500 shadow-md hover:shadow-xl',
      iconBg: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300',
      titleColor: 'text-slate-900 dark:text-white font-black',
      descColor: 'text-slate-800 dark:text-slate-200 font-bold',
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Sacred Welcome Banner */}
      <div className="border-gold-400/40 rounded-3xl border-2 bg-gradient-to-r from-[hsl(214,75%,12%)] via-[hsl(214,70%,16%)] to-[hsl(214,75%,12%)] p-6 sm:p-8 text-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="border-gold-400/40 bg-gold-500/20 text-gold-300 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-black uppercase tracking-widest">
                <Home className="h-3.5 w-3.5" /> {family.anbiyam}
              </div>
              <span className="bg-white/10 text-white/90 border border-white/20 rounded-full px-3 py-1 text-xs font-bold">
                Code: {family.familyNumber}
              </span>
            </div>

            <div>
              <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
                Welcome, {family.name}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-white/80 mt-1">
                Queen of All Saints Roman Catholic Parish · Crawford, Tiruchirappalli
              </p>
            </div>

            {/* List of Family Member Names */}
            <div className="pt-1">
              <span className="text-gold-300 text-xs font-bold uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" /> Registered Family Members ({members.length}):
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="bg-white/15 hover:bg-white/25 border border-white/25 rounded-xl px-3 py-1.5 text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    <span className="font-bold">{m.name}</span>
                    <span className="text-white/75 text-[11px]">({m.relation})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch sm:items-center gap-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center text-xs">
              <span className="text-gold-300 text-[10px] font-bold uppercase">
                {liveMass.isHappeningNow ? 'Live Mass Now' : liveMass.label}
              </span>
              <p className="mt-0.5 text-sm font-bold text-white">
                {liveMass.time} ({liveMass.language} · {liveMass.type})
              </p>
            </div>
            <Link
              href="/family/profile"
              className="from-gold-400 to-gold-600 bg-gradient-to-r text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black shadow-lg text-center transition-all hover:scale-105"
            >
              Manage Family Profile →
            </Link>
          </div>
        </div>
      </div>

      {/* PHASE 10 — Compact Daily Mass Readings Widget */}
      <CompactDailyReadingsWidget />

      {/* Digital Parish Services Grid */}
      <div className="space-y-4">
        <div className="border-border/60 flex items-center gap-2 border-b pb-2">
          <Sparkles className="text-gold-300 h-5 w-5" />
          <h2 className="font-heading text-foreground text-xl font-extrabold">
            Digital Parish Services & Quick Actions
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {digitalServices.map((q) => {
            const Icon = q.icon;
            return (
              <Link
                key={q.label}
                href={q.href}
                className={`group flex items-start gap-4 rounded-3xl border-2 p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl ${q.cardBg}`}
              >
                <div
                  className={`shrink-0 rounded-2xl p-3 transition-transform group-hover:scale-110 ${q.iconBg}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className={`font-heading text-base font-bold ${q.titleColor}`}>{q.label}</h3>
                  <p className={`text-xs font-semibold leading-relaxed ${q.descColor}`}>{q.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column (2 cols) */}
        <div className="space-y-8 lg:col-span-2">
          {/* Active Mass Intentions & Home Visits Status */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Mass Intentions Widget */}
            <div className="border-border/80 bg-card space-y-3 rounded-3xl border-2 p-6 shadow-xl">
              <div className="border-border/60 flex items-center justify-between border-b pb-2">
                <h3 className="font-heading text-foreground flex items-center gap-2 text-base font-bold">
                  <Church className="text-gold-300 h-4 w-4" /> Mass Intentions Status
                </h3>
                <Link
                  href="/family/mass-intentions"
                  className="text-primary text-[11px] font-bold hover:underline"
                >
                  View All →
                </Link>
              </div>

              {massIntentions.length === 0 ? (
                <p className="text-muted-foreground text-xs italic">
                  No active Mass intention requests.
                </p>
              ) : (
                <div className="space-y-2 text-xs">
                  {massIntentions.slice(0, 2).map((mi) => (
                    <div key={mi.id} className="bg-muted/40 space-y-1 rounded-xl border p-2.5">
                      <div className="flex justify-between font-bold">
                        <span className="text-foreground">{mi.requestType}</span>
                        <span className="text-emerald-700 dark:text-emerald-400">
                          ₹{mi.offeringAmount}
                        </span>
                      </div>
                      <p className="text-muted-foreground line-clamp-1 text-[11px]">{mi.title}</p>
                      <span className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" /> {mi.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Home Communion Widget */}
            <div className="border-border/80 bg-card space-y-3 rounded-3xl border-2 p-6 shadow-xl">
              <div className="border-border/60 flex items-center justify-between border-b pb-2">
                <h3 className="font-heading text-foreground flex items-center gap-2 text-base font-bold">
                  <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" /> Home Communion
                  Visits
                </h3>
                <Link
                  href="/family/home-communion"
                  className="text-primary text-[11px] font-bold hover:underline"
                >
                  View All →
                </Link>
              </div>

              {homeCommunionVisits.length === 0 ? (
                <p className="text-muted-foreground text-xs italic">
                  No active home communion requests.
                </p>
              ) : (
                <div className="space-y-2 text-xs">
                  {homeCommunionVisits.slice(0, 2).map((hc) => (
                    <div key={hc.id} className="bg-muted/40 space-y-1 rounded-xl border p-2.5">
                      <div className="flex justify-between font-bold">
                        <span className="text-foreground">{hc.patientName}</span>
                        <span className="text-rose-800 dark:text-rose-300">{hc.reason}</span>
                      </div>
                      <p className="text-muted-foreground text-[11px]">
                        Visit: {hc.preferredDate} ({hc.preferredTime})
                      </p>
                      <span className="inline-flex items-center gap-1 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" /> {hc.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Family Members Directory */}
          <div className="border-border/80 bg-card space-y-4 rounded-3xl border-2 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-foreground flex items-center gap-2 text-lg font-bold">
                <Users className="text-primary h-5 w-5" /> Registered Family Members
              </h3>
              <Link
                href="/family/members"
                className="text-primary text-xs font-bold hover:underline"
              >
                Manage Directory →
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="bg-muted/40 border-border/60 space-y-2 rounded-xl border p-4 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-foreground text-sm font-bold">{m.name}</h4>
                      {m.tamilName && (
                        <p className="text-muted-foreground text-[11px]">{m.tamilName}</p>
                      )}
                    </div>
                    <span className="bg-primary/20 text-primary rounded px-2 py-0.5 text-[10px] font-bold">
                      {m.relation}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {m.baptism.completed && (
                      <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-black uppercase text-emerald-400 dark:text-emerald-300">
                        ✓ Baptism
                      </span>
                    )}
                    {m.firstCommunion.completed && (
                      <span className="rounded border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[9px] font-black uppercase text-amber-400 dark:text-amber-300">
                        ✓ Communion
                      </span>
                    )}
                    {m.confirmation.completed && (
                      <span className="rounded border border-blue-500/40 bg-blue-500/10 px-2 py-0.5 text-[9px] font-black uppercase text-blue-400 dark:text-blue-300">
                        ✓ Confirmation
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Announcement Widget */}
        <div>
          <AnnouncementWidget roleTitle="Parishioner Family" />
        </div>
      </div>
    </div>
  );
}

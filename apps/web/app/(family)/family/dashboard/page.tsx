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
  Clock,
  ChevronRight,
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
      iconBg: 'bg-gold/15 text-gold-700 dark:text-gold-300',
    },
    {
      label: 'Communion for the Sick',
      href: '/family/home-communion',
      icon: Heart,
      desc: 'Request priest home visit for elderly or bedridden family',
      iconBg: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
    },
    {
      label: 'Emergency Pastoral Care',
      href: '/family/home-communion',
      icon: ShieldAlert,
      desc: '24/7 Priest emergency phone line for Anointing of the Sick',
      iconBg: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    },
    {
      label: 'House Blessing Request',
      href: '/family/house-blessing',
      icon: Home,
      desc: 'Schedule annual family house blessing with parish clergy',
      iconBg: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    },
    {
      label: 'Prayer Intention Request',
      href: '/family/prayer-request',
      icon: Sparkles,
      desc: 'Submit family prayer intentions for inclusion in daily community prayers',
      iconBg: 'bg-sky-500/15 text-sky-700 dark:text-sky-300',
    },
    {
      label: 'Pay Parish Offertory',
      href: '/family/payments',
      icon: CreditCard,
      desc: 'Pay holy offerings and donations securely with verified receipts',
      iconBg: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300',
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Sacred Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-[#001833] via-[#002244] to-[#001429] p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-gold/10 filter blur-3xl pointer-events-none" />

        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-bold text-gold tracking-wide">
                <Home className="h-3.5 w-3.5" />
                <span>{family.anbiyam}</span>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                Card: {family.familyNumber}
              </span>
            </div>

            <div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Welcome, {family.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-normal">
                Queen of All Saints Roman Catholic Parish · K.K. Nagar, Tiruchirappalli
              </p>
            </div>

            {/* List of Family Member Names */}
            <div className="pt-1">
              <span className="text-gold text-xs font-semibold block mb-2 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" /> Registered Family Members ({members.length}):
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {members.map((m) => (
                  <div
                    key={m.id}
                    className="border border-white/20 bg-white/10 hover:bg-white/15 rounded-xl px-3 py-1.5 text-xs font-medium text-white flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-slate-300 text-[11px]">({m.relation})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-stretch sm:items-center gap-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center text-xs backdrop-blur-sm">
              <span className="text-gold text-[10px] font-bold uppercase tracking-wider block">
                {liveMass.label}
              </span>
              <p className="mt-0.5 text-sm font-bold text-white">
                {liveMass.time} ({liveMass.type})
              </p>
            </div>
            <Link
              href="/family/profile"
              className="rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-slate-950 px-5 py-2.5 text-xs font-bold shadow-md text-center transition-all hover:scale-105"
            >
              Manage Family Profile →
            </Link>
          </div>
        </div>
      </div>

      {/* Daily Mass Readings Widget */}
      <CompactDailyReadingsWidget />

      {/* Digital Parish Services Grid */}
      <div className="space-y-4">
        <div className="border-border/80 flex items-center gap-2 border-b pb-2">
          <Sparkles className="text-gold h-5 w-5" />
          <h2 className="text-foreground text-lg sm:text-xl font-bold tracking-tight">
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
                className="group flex items-start gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-gold/60 hover:shadow-md"
              >
                <div
                  className={`shrink-0 rounded-xl p-3 transition-transform group-hover:scale-110 ${q.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-foreground font-bold text-sm sm:text-base group-hover:text-primary dark:group-hover:text-gold transition-colors">
                      {q.label}
                    </h3>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/60 transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed font-normal">
                    {q.desc}
                  </p>
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
            <div className="border-border/80 bg-card space-y-3 rounded-2xl border p-5 shadow-sm">
              <div className="border-border/60 flex items-center justify-between border-b pb-2">
                <h3 className="text-foreground flex items-center gap-2 text-sm font-bold">
                  <Church className="text-gold h-4 w-4" /> Mass Intentions Status
                </h3>
                <Link
                  href="/family/mass-intentions"
                  className="text-primary dark:text-gold text-xs font-semibold hover:underline"
                >
                  View All →
                </Link>
              </div>

              {massIntentions.length === 0 ? (
                <p className="text-muted-foreground text-xs italic py-2">
                  No active Mass intention requests.
                </p>
              ) : (
                <div className="space-y-2 text-xs">
                  {massIntentions.slice(0, 2).map((mi) => (
                    <div key={mi.id} className="bg-muted/40 space-y-1 rounded-xl border border-border/60 p-2.5">
                      <div className="flex justify-between font-bold">
                        <span className="text-foreground">{mi.requestType}</span>
                        <span className="text-emerald-700 dark:text-emerald-400">
                          ₹{mi.offeringAmount}
                        </span>
                      </div>
                      <p className="text-muted-foreground line-clamp-1 text-[11px] font-normal">{mi.title}</p>
                      <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" /> {mi.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Home Communion Widget */}
            <div className="border-border/80 bg-card space-y-3 rounded-2xl border p-5 shadow-sm">
              <div className="border-border/60 flex items-center justify-between border-b pb-2">
                <h3 className="text-foreground flex items-center gap-2 text-sm font-bold">
                  <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" /> Home Communion Visits
                </h3>
                <Link
                  href="/family/home-communion"
                  className="text-primary dark:text-gold text-xs font-semibold hover:underline"
                >
                  View All →
                </Link>
              </div>

              {homeCommunionVisits.length === 0 ? (
                <p className="text-muted-foreground text-xs italic py-2">
                  No active home communion requests.
                </p>
              ) : (
                <div className="space-y-2 text-xs">
                  {homeCommunionVisits.slice(0, 2).map((hc) => (
                    <div key={hc.id} className="bg-muted/40 space-y-1 rounded-xl border border-border/60 p-2.5">
                      <div className="flex justify-between font-bold">
                        <span className="text-foreground">{hc.patientName}</span>
                        <span className="text-muted-foreground font-normal">{hc.preferredDate}</span>
                      </div>
                      <p className="text-muted-foreground line-clamp-1 text-[11px] font-normal">{hc.reason}</p>
                      <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-800 dark:text-amber-300">
                        <Clock className="h-3 w-3" /> {hc.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Announcements Section */}
          <AnnouncementWidget />
        </div>

        {/* Right Column: Quick Links & Contact */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm space-y-4">
            <h3 className="text-foreground text-sm font-bold border-b border-border/60 pb-2">
              Parish Pastoral Office
            </h3>
            <div className="text-xs text-muted-foreground space-y-2 font-normal leading-relaxed">
              <p>
                <strong className="text-foreground font-semibold">Parish Priest:</strong> Rev. Fr. ArokiyaSwamy O.Praem
              </p>
              <p>
                <strong className="text-foreground font-semibold">Assistant Priest:</strong> Rev. Fr. Nicolas
              </p>
              <p>
                <strong className="text-foreground font-semibold">Office Hours:</strong> Tuesday – Sunday, 9:00 AM – 1:00 PM
              </p>
              <p>
                <strong className="text-foreground font-semibold">Emergency Desk:</strong> +91 431 2400000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
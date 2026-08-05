'use client';

import Link from 'next/link';
import { Home, CreditCard, FileText, Calendar, Users, HeartHandshake } from 'lucide-react';
import { AnnouncementWidget } from '@/components/announcements/announcement-widget';

export default function FamilyDashboardPage() {
  const familyMembers = [
    {
      name: 'Joseph Anthony',
      role: 'Head of Family',
      gender: 'MALE',
      sacraments: ['Baptism', 'Communion', 'Confirmation', 'Marriage'],
    },
    {
      name: 'Maria Joseph',
      role: 'Spouse',
      gender: 'FEMALE',
      sacraments: ['Baptism', 'Communion', 'Confirmation', 'Marriage'],
    },
    {
      name: 'David Joseph',
      role: 'Son',
      gender: 'MALE',
      sacraments: ['Baptism', 'Communion', 'Confirmation'],
    },
    {
      name: 'Agnes Joseph',
      role: 'Daughter',
      gender: 'FEMALE',
      sacraments: ['Baptism', 'Communion'],
    },
  ];

  const quickLinks = [
    {
      label: 'Pay Monthly Dues',
      href: '/family/payments',
      icon: CreditCard,
      desc: 'August 2026 Dues: ₹500',
      color: 'text-emerald-500',
    },
    {
      label: 'Request Certificate',
      href: '/family/requests',
      icon: FileText,
      desc: 'Baptism, Marriage, etc.',
      color: 'text-primary',
    },
    {
      label: 'Book Priest Appointment',
      href: '/family/appointments',
      icon: Calendar,
      desc: 'Schedule counseling meeting',
      color: 'text-gold-400',
    },
    {
      label: 'Volunteer in Ministry',
      href: '/family/volunteer',
      icon: HeartHandshake,
      desc: 'Join Choir or Youth Movement',
      color: 'text-rose-500',
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8">
      {/* Sacred Welcome Banner */}
      <div className="border-gold-400/40 rounded-3xl border-2 bg-gradient-to-r from-[hsl(214,75%,12%)] via-[hsl(214,70%,16%)] to-[hsl(214,75%,12%)] p-8 text-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="border-gold-400/40 bg-gold-500/20 text-gold-300 inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-black uppercase tracking-widest">
              <Home className="h-3.5 w-3.5" /> St. Thomas Anbiyam · Ward 4
            </div>
            <h1 className="font-display text-3xl font-black text-white sm:text-4xl">
              Welcome, St. Mary Family
            </h1>
            <p className="text-sm font-medium text-white/85">
              Family Code: <span className="text-gold-300 font-bold">QOAS-2024-0001</span> · Family
              Head: Joseph Anthony · 4 Registered Members
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center text-xs">
            <span className="text-gold-300 text-[10px] font-bold uppercase">Today's Mass</span>
            <p className="mt-0.5 text-sm font-bold text-white">06:30 PM (Tamil Novena Mass)</p>
          </div>
        </div>
      </div>

      {/* Quick Service Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((q) => {
          const Icon = q.icon;
          return (
            <Link
              key={q.href}
              href={q.href}
              className="border-border/80 bg-card hover:border-primary group flex items-center gap-4 rounded-2xl border p-5 shadow-lg transition-all hover:-translate-y-1"
            >
              <div className={`bg-muted/60 rounded-xl p-3 ${q.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-foreground group-hover:text-primary text-sm font-bold">
                  {q.label}
                </h3>
                <p className="text-muted-foreground text-xs">{q.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column (2 cols) */}
        <div className="space-y-8 lg:col-span-2">
          {/* Family Directory & Sacraments */}
          <div className="border-border/80 bg-card space-y-4 rounded-2xl border p-6 shadow-xl">
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
              {familyMembers.map((m) => (
                <div
                  key={m.name}
                  className="bg-muted/40 border-border/60 space-y-2 rounded-xl border p-4 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-foreground text-sm font-bold">{m.name}</h4>
                    <span className="bg-primary/20 text-primary rounded px-2 py-0.5 text-[10px] font-bold">
                      {m.role}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {m.sacraments.map((sac) => (
                      <span
                        key={sac}
                        className="rounded border border-emerald-500/40 bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black uppercase text-emerald-400"
                      >
                        ✓ {sac}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dues & Certificate Status */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border-border/80 bg-card space-y-3 rounded-2xl border p-6 shadow-xl">
              <h3 className="font-heading text-foreground flex items-center gap-2 text-base font-bold">
                <CreditCard className="h-4 w-4 text-emerald-500" /> Payment & Dues Summary
              </h3>
              <div className="space-y-2 text-xs">
                <div className="border-border/40 flex justify-between border-b pb-2">
                  <span>August 2026 Monthly Dues</span>
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-400">
                    PAID (₹500)
                  </span>
                </div>
                <div className="border-border/40 flex justify-between border-b pb-2">
                  <span>Feast Donation Offering</span>
                  <span className="bg-gold-500/20 text-gold-300 rounded px-2 py-0.5 font-bold">
                    CONTRIBUTED
                  </span>
                </div>
              </div>
            </div>

            <div className="border-border/80 bg-card space-y-3 rounded-2xl border p-6 shadow-xl">
              <h3 className="font-heading text-foreground flex items-center gap-2 text-base font-bold">
                <FileText className="text-gold-400 h-4 w-4" /> Certificate & Requests
              </h3>
              <div className="space-y-2 text-xs">
                <div className="border-border/40 flex justify-between border-b pb-2">
                  <span>Baptism Certificate (David)</span>
                  <span className="bg-primary/20 text-primary rounded px-2 py-0.5 font-bold">
                    ISSUED
                  </span>
                </div>
                <div className="border-border/40 flex justify-between border-b pb-2">
                  <span>Marriage Certificate Copy</span>
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 font-bold text-amber-400">
                    IN REVIEW
                  </span>
                </div>
              </div>
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

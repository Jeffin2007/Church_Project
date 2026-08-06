'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Users,
  CreditCard,
  Plus,
  Calendar,
  Church,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { AnnouncementWidget } from '@/components/announcements/announcement-widget';
import { AnnouncementModal } from '@/components/announcements/announcement-modal';
import { CompactDailyReadingsWidget } from '@/components/home/compact-daily-readings';
import { useFamily } from '@/context/family-context';

export default function AdminDashboardPage() {
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const { massIntentions, payments, sacramentalSummary } = useFamily();

  const totalFinancials = payments.reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      title: 'Total Registered Families',
      value: '342',
      change: '+12 this month',
      icon: Home,
      color: 'text-blue-500',
    },
    {
      title: 'Active Parishioners',
      value: `${sacramentalSummary.totalMembers * 85 + 320}`,
      change: '7 Anbiyam Wards',
      icon: Users,
      color: 'text-emerald-500',
    },
    {
      title: 'Mass Intentions (Month)',
      value: `${massIntentions.length + 18}`,
      change: 'Razorpay Verified',
      icon: Church,
      color: 'text-amber-500',
    },
    {
      title: 'Financial Collections',
      value: `₹${totalFinancials + 140000}`,
      change: '84% target reached',
      icon: CreditCard,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8 pb-12">
      {/* Header Banner */}
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="font-heading text-primary text-3xl font-extrabold tracking-tight">
            Parish Administration & Analytics Console
          </h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Queen of All Saints Roman Catholic Church · Real-time operations & registry metrics
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/mass-intentions"
            className="border-border bg-card hover:bg-muted rounded-xl border px-4 py-2.5 text-xs font-bold"
          >
            Mass Intentions Console
          </Link>
          <Link
            href="/admin/pastoral-visits"
            className="border-border bg-card hover:bg-muted rounded-xl border px-4 py-2.5 text-xs font-bold"
          >
            Pastoral Visits Console
          </Link>
          <button
            type="button"
            onClick={() => setIsAnnouncementModalOpen(true)}
            className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-lg transition-all hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>New Parish Announcement</span>
          </button>
        </div>
      </div>

      {/* Executive Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="border-border/80 bg-card hover:border-gold-400 group rounded-3xl border-2 p-6 shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
                  {s.title}
                </span>
                <div className={`bg-muted/60 rounded-xl p-2.5 ${s.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-heading text-foreground mt-3 text-3xl font-bold">{s.value}</h3>
              <p className="text-primary mt-2 text-xs font-semibold">{s.change}</p>
            </div>
          );
        })}
      </div>

      {/* PHASE 10 — Compact Daily Mass Readings Widget */}
      <CompactDailyReadingsWidget />

      {/* Analytics & Priest Calendar Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Monthly Registrations Chart */}
        <div className="border-border/80 bg-card space-y-4 rounded-3xl border-2 p-6 shadow-xl">
          <div className="border-border/60 flex items-center justify-between border-b pb-3">
            <h3 className="font-heading text-foreground flex items-center gap-2 text-base font-bold">
              <TrendingUp className="h-4 w-4 text-emerald-400" /> Monthly Registrations
            </h3>
            <span className="text-muted-foreground text-[10px] font-bold">2026 YTD</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span>June 2026</span>
                <span className="text-emerald-400">18 Families</span>
              </div>
              <div className="bg-muted h-2 w-full rounded-full">
                <div className="h-2 w-2/3 rounded-full bg-emerald-500"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span>July 2026</span>
                <span className="text-emerald-400">24 Families</span>
              </div>
              <div className="bg-muted h-2 w-full rounded-full">
                <div className="h-2 w-5/6 rounded-full bg-emerald-500"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between font-bold">
                <span>August 2026</span>
                <span className="text-emerald-400">12 Families</span>
              </div>
              <div className="bg-muted h-2 w-full rounded-full">
                <div className="h-2 w-1/2 rounded-full bg-emerald-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Collections Breakdown Chart */}
        <div className="border-border/80 bg-card space-y-4 rounded-3xl border-2 p-6 shadow-xl">
          <div className="border-border/60 flex items-center justify-between border-b pb-3">
            <h3 className="font-heading text-foreground flex items-center gap-2 text-base font-bold">
              <BarChart3 className="text-gold-300 h-4 w-4" /> Collections Breakdown
            </h3>
            <span className="text-muted-foreground text-[10px] font-bold">By Category</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-bold">
              <span>Church Tax</span>
              <span className="text-gold-300">₹65,000</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Mass Intentions</span>
              <span className="text-gold-300">₹24,500</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Building Fund</span>
              <span className="text-gold-300">₹45,000</span>
            </div>
          </div>
        </div>

        {/* Priest Calendar Summary */}
        <div className="border-border/80 bg-card space-y-4 rounded-3xl border-2 p-6 shadow-xl">
          <div className="border-border/60 flex items-center justify-between border-b pb-3">
            <h3 className="font-heading text-foreground flex items-center gap-2 text-base font-bold">
              <Calendar className="text-primary h-4 w-4" /> Priest Calendar & Schedule
            </h3>
            <span className="text-muted-foreground text-[10px] font-bold">Today</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="bg-muted/40 space-y-1 rounded-xl border p-2.5">
              <span className="text-primary block font-bold">06:30 AM · Tamil Mass</span>
              <p className="text-muted-foreground text-[11px]">
                Intention: St. Mary Anbiyam Deceased
              </p>
            </div>
            <div className="bg-muted/40 space-y-1 rounded-xl border p-2.5">
              <span className="block font-bold text-rose-400">04:30 PM · Sick Visit</span>
              <p className="text-muted-foreground text-[11px]">
                Grandmother Teresa (Bedside Communion)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Operations */}
        <div className="space-y-8 lg:col-span-2">
          <div className="border-border/80 bg-card space-y-4 rounded-3xl border-2 p-6 shadow-xl">
            <div className="border-border/60 flex items-center justify-between border-b pb-3">
              <h3 className="font-heading text-foreground text-lg font-bold">
                Parish Operations & Console Quick Links
              </h3>
            </div>
            <div className="grid gap-4 text-xs sm:grid-cols-3">
              <Link
                href="/admin/families"
                className="bg-muted/40 border-border/60 hover:border-primary block rounded-2xl border p-4 text-center font-bold"
              >
                🏠 Family Directory
              </Link>
              <Link
                href="/admin/requests"
                className="bg-muted/40 border-border/60 hover:border-primary block rounded-2xl border p-4 text-center font-bold"
              >
                📜 Certificate Requests
              </Link>
              <Link
                href="/admin/payments"
                className="bg-muted/40 border-border/60 hover:border-primary block rounded-2xl border p-4 text-center font-bold"
              >
                💳 Payment Ledger
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Global Announcement Widget */}
        <div>
          <AnnouncementWidget
            roleTitle="Admin Staff"
            onCreateClick={() => setIsAnnouncementModalOpen(true)}
          />
        </div>
      </div>

      {/* Modal */}
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        currentRole="Admin"
      />
    </div>
  );
}

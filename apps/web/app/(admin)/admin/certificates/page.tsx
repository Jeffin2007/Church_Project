'use client';

import Link from 'next/link';
import { GraduationCap, Clock, Sparkles, ArrowLeft, ShieldCheck, Database } from 'lucide-react';

export default function AdminCertificatesPage() {
  return (
    <div className="animate-in fade-in space-y-8 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Link href="/admin/dashboard" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Admin Dashboard
        </Link>
        <span>/</span>
        <span className="text-foreground">Certificates Registry</span>
      </div>

      {/* Main Coming Soon Card */}
      <div className="border-border/80 bg-card relative overflow-hidden rounded-3xl border-2 p-8 md:p-14 shadow-2xl text-center">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-300 shadow">
            <Clock className="h-3.5 w-3.5" /> Coming Soon
          </div>

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 border-2 border-primary/30 text-primary shadow-xl">
            <GraduationCap className="h-10 w-10" />
          </div>

          <div className="space-y-3">
            <h1 className="font-heading text-foreground text-3xl md:text-4xl font-extrabold tracking-tight">
              Certificates Issuance & Digital Signatures
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              The automated certificate approval workflow, digital seal verification, and PDF issuance pipeline are currently in preparation. All sacramental certificates continue to be issued directly through the paper parish registers at the parish office.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-4">
            <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 space-y-1">
              <div className="flex items-center gap-2 font-bold text-foreground text-xs">
                <Database className="h-4 w-4 text-primary" /> Register Archiving
              </div>
              <p className="text-muted-foreground text-[11px]">
                Historical baptism, communion, and marriage registers are being indexed for instant search.
              </p>
            </div>
            <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 space-y-1">
              <div className="flex items-center gap-2 font-bold text-foreground text-xs">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Digital Stamp & QR
              </div>
              <p className="text-muted-foreground text-[11px]">
                Official diocesan digital watermark and QR verification system will be attached on release.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
            >
              Return to Admin Console
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

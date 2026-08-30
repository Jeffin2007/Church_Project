'use client';

import Link from 'next/link';
import { FileText, Clock, Sparkles, ArrowLeft, PhoneCall, Mail } from 'lucide-react';

export default function FamilyRequestsPage() {
  return (
    <div className="animate-in fade-in space-y-8 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Link href="/family/dashboard" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
        </Link>
        <span>/</span>
        <span className="text-foreground">Sacrament Requests</span>
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
            <FileText className="h-10 w-10" />
          </div>

          <div className="space-y-3">
            <h1 className="font-heading text-foreground text-3xl md:text-4xl font-extrabold tracking-tight">
              Sacramental Certificate Requests
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Online submission and tracking for official sacramental certificates (Baptism, First Holy Communion, Confirmation, Marriage extracts, and duplicate copies) is currently being integrated and will be available soon.
            </p>
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-left text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-foreground text-sm">
              <Sparkles className="h-4 w-4 text-primary" /> Urgent Inquiries & Physical Collection
            </div>
            <p className="text-muted-foreground">
              For immediate certificate issuance, kindly visit the <strong>Parish Office</strong> in person (Sunday to Saturday: 09:00 AM – 01:00 PM & 05:00 PM – 08:30 PM) or contact our office desk.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-primary font-semibold">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="h-3.5 w-3.5" /> 0431 2459559 / +91 94421 62159
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> office@queenofallsaints.in
              </span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/family/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
            >
              Return to Family Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

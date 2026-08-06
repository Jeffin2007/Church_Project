'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export function CompactDailyReadingsWidget() {
  return (
    <div className="border-gold-400/40 space-y-4 rounded-3xl border-2 bg-gradient-to-r from-[hsl(214,75%,12%)] via-[hsl(214,70%,15%)] to-[hsl(214,75%,12%)] p-6 text-white shadow-xl">
      <div className="border-gold-400/20 flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div className="flex items-center gap-2">
          <div className="bg-gold-500/20 text-gold-300 border-gold-400/40 flex h-8 w-8 items-center justify-center rounded-xl border">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <span className="text-gold-300 block text-[10px] font-black uppercase tracking-widest">
              Liturgy of the Word
            </span>
            <h3 className="font-heading text-lg font-bold text-white">
              Today's Mass Readings & Reflection
            </h3>
          </div>
        </div>

        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3 py-0.5 text-[10px] font-bold text-emerald-300">
          🟢 Ordinary Time
        </span>
      </div>

      <div className="space-y-2 text-xs font-medium leading-relaxed text-slate-200">
        <p className="text-gold-200 font-serif italic">
          "Before listening to Christ in the Eucharist, listen to Him in His Word."
        </p>
        <p className="text-[11px] text-slate-300">
          Read today's official Catholic Scriptures in English & Tamil (தமிழ்) before coming to Holy
          Mass.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/#daily-readings"
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <span>View Full Mass Readings (English & Tamil)</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

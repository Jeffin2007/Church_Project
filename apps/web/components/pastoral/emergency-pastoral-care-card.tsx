'use client';

import React from 'react';
import { PhoneCall, ShieldAlert, MessageSquare } from 'lucide-react';

export function EmergencyPastoralCareCard() {
  const priestPhone = '+91 98765 43210';
  const cleanPhone = '919876543210';

  return (
    <div className="space-y-6 rounded-3xl border-2 border-rose-500/80 bg-gradient-to-br from-rose-950/80 via-slate-900 to-rose-950 p-6 text-white shadow-2xl sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rose-500/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl border border-rose-500/50 bg-rose-500/20 text-rose-400">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[10px] font-black uppercase tracking-widest text-rose-400">
              🚨 Urgent Sacramental Assistance
            </span>
            <h3 className="font-heading text-2xl font-black text-white sm:text-3xl">
              Emergency Pastoral Care (Last Rites)
            </h3>
          </div>
        </div>
        <span className="rounded-full border border-rose-400/50 bg-rose-500/30 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-rose-200">
          24/7 Priest Emergency Line
        </span>
      </div>

      <div className="space-y-3 text-sm font-medium leading-relaxed text-rose-100/90">
        <p>
          If someone is in danger of death or requires the Sacrament of the Anointing of the Sick
          (Last Rites), please contact the Parish Priest immediately.
        </p>
      </div>

      {/* Large Emergency Action Banner */}
      <div className="space-y-4 rounded-2xl border-2 border-rose-400/60 bg-rose-500/20 p-5 text-center shadow-lg">
        <p className="text-xs font-extrabold uppercase tracking-widest text-rose-300">
          📞 EMERGENCY — PLEASE CALL THE PARISH PRIEST IMMEDIATELY
        </p>
        <div className="font-heading text-3xl font-black tracking-wide text-white sm:text-4xl">
          {priestPhone}
        </div>
        <p className="text-xs font-semibold text-rose-200">
          Rev. Fr. Parish Priest · Queen of All Saints Presbytery
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`tel:${priestPhone}`}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-xs font-black text-white shadow-xl transition-all hover:scale-105 hover:bg-rose-500"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Call Priest Now</span>
          </a>

          <a
            href={`https://wa.me/${cleanPhone}?text=EMERGENCY:%20Urgent%20Anointing%20of%20the%20Sick%20(Last%20Rites)%20required.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/60 bg-emerald-600/30 px-6 py-3 text-xs font-bold text-emerald-300 shadow transition-all hover:bg-emerald-600/50"
          >
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp Emergency</span>
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-rose-500/40 bg-rose-950/60 p-4 text-center text-xs font-bold text-rose-200">
        ℹ️ Note: This sacrament should be requested immediately by calling the Parish Priest
        directly. Online bookings or delayed web forms are strictly not permitted for emergency
        pastoral care.
      </div>
    </div>
  );
}

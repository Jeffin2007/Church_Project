'use client';

import { Settings, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="animate-in fade-in max-w-4xl space-y-8">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Settings className="h-4 w-4" /> Global Platform Configuration
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Parish System Settings
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Configure parish metadata, office working hours, online payment Razorpay keys, and SMS
            settings.
          </p>
        </div>

        <button
          type="button"
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Save className="h-4 w-4" />
          <span>Save System Settings</span>
        </button>
      </div>

      <div className="border-border/80 bg-card space-y-6 rounded-2xl border p-6 shadow-xl">
        <h3 className="font-heading text-foreground text-lg font-bold">
          Parish Identity & Address
        </h3>
        <div className="grid gap-4 text-xs sm:grid-cols-2">
          <div>
            <label className="text-muted-foreground mb-1 block font-semibold">
              Parish Full Name
            </label>
            <input
              type="text"
              defaultValue="Queen of All Saints Roman Catholic Church"
              className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="text-muted-foreground mb-1 block font-semibold">
              Diocese / Vicariate
            </label>
            <input
              type="text"
              defaultValue="Diocese of Tiruchirappalli"
              className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="text-muted-foreground mb-1 block font-semibold">
              Office Primary Phone
            </label>
            <input
              type="text"
              defaultValue="+91 431 246 0000"
              className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
            />
          </div>
          <div>
            <label className="text-muted-foreground mb-1 block font-semibold">
              Official Contact Email
            </label>
            <input
              type="email"
              defaultValue="office@queenofallsaints.in"
              className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

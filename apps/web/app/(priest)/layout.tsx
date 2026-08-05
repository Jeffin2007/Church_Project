'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { Church, Calendar, Scroll, Megaphone, CheckSquare, LogOut, Bell } from 'lucide-react';

export default function PriestLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const priestNav = [
    { label: 'Pastoral Dashboard', href: '/priest/dashboard', icon: Church },
    { label: 'Pastoral Calendar', href: '/admin/events', icon: Calendar },
    { label: 'Sacrament Approval', href: '/admin/requests', icon: Scroll },
    { label: 'Certificates Approval', href: '/admin/certificates', icon: CheckSquare },
    { label: 'Parish Notices', href: '/admin/announcements', icon: Megaphone },
  ];

  return (
    <div className="bg-muted/40 text-foreground flex min-h-screen">
      {/* Priest Portal Sidebar */}
      <aside className="border-border/80 fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-[hsl(214,75%,10%)] text-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 p-6">
          <div className="from-gold-400 via-gold-500 to-gold-600 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl font-black text-slate-950 shadow-lg">
            ✝
          </div>
          <div>
            <h2 className="font-heading text-lg font-extrabold leading-tight text-white">
              Parish Priest Portal
            </h2>
            <span className="text-gold-300 block text-[10px] font-extrabold uppercase tracking-wider">
              Pastor & Shepherd Console
            </span>
          </div>
        </div>

        {/* Liturgical Banner Widget */}
        <div className="mx-4 mt-4 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-center text-xs backdrop-blur-md">
          <span className="text-[10px] font-black uppercase text-emerald-400">
            Liturgical Color
          </span>
          <p className="font-heading mt-0.5 text-sm font-bold text-white">
            🟢 Ordinary Time (Green)
          </p>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto p-4 text-xs font-semibold">
          {priestNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  isActive
                    ? 'bg-gold-400 font-black text-slate-950 shadow-lg'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 bg-black/20 p-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
            <p className="text-gold-300 font-bold">Rev. Fr. Parish Priest</p>
            <p className="truncate text-[11px] text-white/70">priest@queenofallsaints.in</p>
          </div>
          <Link
            href="/login"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/20 py-2.5 text-xs font-bold text-red-300 transition-colors hover:bg-red-500/30"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Priest View */}
      <main className="flex-1 overflow-y-auto pl-72">
        <header className="border-border/80 bg-card/85 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-8 backdrop-blur-md">
          <span className="font-heading text-foreground text-sm font-extrabold">
            Queen of All Saints Catholic Church · Trichy
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="border-border/80 text-muted-foreground hover:bg-muted hover:text-foreground relative rounded-xl border p-2"
            >
              <Bell className="text-gold-400 h-4 w-4" />
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl p-8">{children}</div>
      </main>
    </div>
  );
}

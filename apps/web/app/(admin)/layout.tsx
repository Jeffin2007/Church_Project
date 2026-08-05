'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  Home,
  Users,
  UserCheck,
  CreditCard,
  Wallet,
  GraduationCap,
  Calendar,
  FileText,
  Sliders,
  Tag,
  BarChart3,
  Image,
  Video,
  CalendarDays,
  Megaphone,
  Settings,
  ShieldAlert,
  HeartHandshake,
  Music,
  Church,
  MapPin,
  ChevronRight,
  LogOut,
  Bell,
  Search,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const adminNav = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Families', href: '/admin/families', icon: Home },
    { label: 'Family Members', href: '/admin/members', icon: Users },
    { label: 'Users & Roles', href: '/admin/users', icon: UserCheck },
    { label: 'Payments & Dues', href: '/admin/payments', icon: CreditCard },
    { label: 'Finance & Accounts', href: '/admin/finance', icon: Wallet },
    { label: 'Certificates', href: '/admin/certificates', icon: GraduationCap },
    { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { label: 'Sacrament Requests', href: '/admin/requests', icon: FileText },
    { label: 'Request Types', href: '/admin/request-types', icon: Sliders },
    { label: 'Payment Categories', href: '/admin/payment-categories', icon: Tag },
    { label: 'Parish Reports', href: '/admin/reports', icon: BarChart3 },
    { label: 'Gallery Albums', href: '/admin/gallery', icon: Image },
    { label: 'Media & Bulletins', href: '/admin/media', icon: Video },
    { label: 'Events & Feasts', href: '/admin/events', icon: CalendarDays },
    { label: 'Announcements', href: '/admin/announcements', icon: Megaphone },
    { label: 'System Settings', href: '/admin/settings', icon: Settings },
    { label: 'Audit Logs', href: '/admin/audit-logs', icon: ShieldAlert },
    { label: 'Volunteers', href: '/admin/volunteers', icon: HeartHandshake },
    { label: 'Choir Teams', href: '/admin/choirs', icon: Music },
    { label: 'Ministries', href: '/admin/ministries', icon: Church },
    { label: 'Anbiyams', href: '/admin/anbiyams', icon: MapPin },
  ];

  const currentItem = adminNav.find((item) => item.href === pathname) || adminNav[0];

  return (
    <div className="bg-muted/40 text-foreground flex min-h-screen">
      {/* ─── Admin Sidebar ──────────────────────────────────────────── */}
      <aside className="bg-card border-border fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r shadow-xl">
        <div className="border-border/80 flex items-center gap-3 border-b p-5">
          <div className="from-gold-400 via-gold-500 to-gold-600 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-xl font-black text-slate-950 shadow-md">
            ✝
          </div>
          <div>
            <h2 className="font-heading text-primary text-base font-bold leading-tight">
              Queen of All Saints
            </h2>
            <span className="text-gold-400 block text-[10px] font-extrabold uppercase tracking-wider">
              Enterprise Admin Console
            </span>
          </div>
        </div>

        <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto p-3 text-xs font-semibold">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-bold shadow-md'
                    : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 ${isActive ? 'text-primary-foreground' : 'text-primary'}`}
                  />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-80" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-border/80 bg-muted/20 space-y-2 border-t p-4">
          <div className="bg-card border-border/80 rounded-xl border p-3 text-xs shadow-sm">
            <p className="text-foreground font-bold">Administrator Console</p>
            <p className="text-muted-foreground truncate text-[11px]">admin@queenofallsaints.in</p>
          </div>
          <Link
            href="/login"
            className="bg-destructive/10 text-destructive hover:bg-destructive/20 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* ─── Main Content ───────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto pl-72">
        {/* Header Bar */}
        <header className="border-border/80 bg-card/85 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-8 backdrop-blur-md">
          <div className="text-muted-foreground flex items-center gap-2 text-xs font-semibold">
            <Link href="/admin/dashboard" className="hover:text-primary">
              Admin
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-bold">{currentItem.label}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="text-muted-foreground absolute left-3 top-2.5 h-3.5 w-3.5" />
              <input
                type="text"
                placeholder="Search records..."
                className="bg-muted/50 border-border/80 focus:ring-primary h-9 w-60 rounded-xl border pl-9 pr-4 text-xs outline-none focus:ring-2"
              />
            </div>
            <button
              type="button"
              className="border-border/80 text-muted-foreground hover:bg-muted hover:text-foreground relative rounded-xl border p-2"
            >
              <Bell className="h-4 w-4" />
              <span className="bg-gold-400 absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black text-slate-950">
                3
              </span>
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl p-8">{children}</div>
      </main>
    </div>
  );
}

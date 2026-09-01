'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  LayoutDashboard,
  Home,
  Users,
  UserCheck,
  CreditCard,
  Wallet,
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
  Menu,
  X,
} from 'lucide-react';

import { logoutAuth, hasValidSession } from '@/lib/auth';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const verifySession = () => {
      if (!hasValidSession()) {
        window.location.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    };

    verifySession();

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted || !hasValidSession()) {
        verifySession();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('popstate', verifySession);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('popstate', verifySession);
    };
  }, [pathname]);

  const handleLogout = () => {
    setIsOpen(false);
    logoutAuth();
  };

  const adminNav = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Families', href: '/admin/families', icon: Home },
    { label: 'Family Members', href: '/admin/members', icon: Users },
    { label: 'Users & Roles', href: '/admin/users', icon: UserCheck },
    { label: 'Offertory & Payments', href: '/admin/payments', icon: CreditCard },
    { label: 'Finance & Accounts', href: '/admin/finance', icon: Wallet },
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <>
      <div className="border-border/80 flex items-center justify-between border-b p-5">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-gold-400/70 bg-[hsl(214,70%,16%)] p-1 shadow-md">
            <Image
              src="/images/logo.png"
              alt="Queen of All Saints Logo"
              width={40}
              height={40}
              className="h-full w-full object-contain"
            />
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
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto p-3 text-xs font-semibold">
        {adminNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
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
        <button
          type="button"
          onClick={handleLogout}
          className="bg-destructive/10 text-destructive hover:bg-destructive/20 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="bg-muted/40 text-foreground flex min-h-screen flex-col lg:flex-row">
      {/* Backdrop overlay for Mobile Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-in Drawer */}
      <aside
        className={`bg-card border-border fixed inset-y-0 left-0 z-50 flex w-[78vw] max-w-xs flex-col border-r shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="bg-card border-border fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r shadow-xl lg:flex">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto lg:pl-72">
        {/* Header Bar */}
        <header className="border-border/80 bg-card/85 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="border-border text-foreground hover:bg-muted rounded-lg border p-2 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="text-muted-foreground flex items-center gap-2 text-xs font-semibold">
              <Link href="/admin/dashboard" className="hover:text-primary">
                Admin
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-bold">{currentItem.label}</span>
            </div>
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

        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

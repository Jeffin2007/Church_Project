'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import type { ReactNode } from 'react';
import { GlobalSearch } from '@/components/search/global-search';
import { NotificationCenter } from '@/components/notifications/notification-center';

import { logoutAuth, hasValidSession } from '@/lib/auth';

export default function FamilyLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Session guard to prevent unauthorized access and Back button restoration
  useEffect(() => {
    const verifySession = () => {
      if (!hasValidSession()) {
        window.location.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    };

    verifySession();

    // Check on page restore (BFCache back/forward)
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
    logoutAuth('/login');
  };

  const familyNav = [
    { label: 'My Dashboard', href: '/family/dashboard', icon: '📊' },
    { label: 'Family Profile', href: '/family/profile', icon: '🏠' },
    { label: 'Family Members', href: '/family/members', icon: '👥' },
    { label: 'Mass Intentions', href: '/family/mass-intentions', icon: '🍞' },
    { label: 'Home Communion', href: '/family/home-communion', icon: '🍷' },
    { label: 'House Blessing', href: '/family/house-blessing', icon: '🏡' },
    { label: 'Prayer Request', href: '/family/prayer-request', icon: '🙏' },
    { label: 'Parish Events', href: '/family/events', icon: '🎪' },
    { label: 'Dues & Payments', href: '/family/payments', icon: '💳' },
    { label: 'Sacrament Requests', href: '/family/requests', icon: '📜' },
    { label: 'Certificates', href: '/family/certificates', icon: '🎓' },
    { label: 'Appointments', href: '/family/appointments', icon: '📅' },
    { label: 'Parish Ministries', href: '/family/ministries', icon: '⛪' },
    { label: 'Volunteer Signup', href: '/family/volunteer', icon: '🤝' },
  ];

  // Prevent body scroll when drawer is open on mobile
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

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <>
      <div className="border-border flex items-center justify-between border-b p-5">
        <div className="flex items-center gap-3">
          <div className="bg-secondary text-secondary-foreground flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold">
            🏠
          </div>
          <div>
            <h2 className="font-heading text-secondary text-sm font-bold leading-tight">
              Family Portal
            </h2>
            <span className="text-muted-foreground text-[11px]">QOAS-2024-0001</span>
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

      <nav className="flex-1 space-y-1 overflow-y-auto p-3 text-sm font-medium">
        {familyNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                isActive
                  ? 'bg-secondary/15 text-secondary font-bold'
                  : 'text-muted-foreground hover:text-secondary hover:bg-secondary/10'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-border space-y-2 border-t p-3">
        <div className="bg-muted/60 rounded-lg px-3 py-2 text-xs">
          <p className="text-foreground font-semibold">Joseph Anthony</p>
          <p className="text-muted-foreground text-[11px]">Family Head</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-destructive/10 text-destructive hover:bg-destructive/20 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-center text-xs font-semibold transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col lg:flex-row">
      {/* Mobile Top Header Bar */}
      <header className="border-border bg-card sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="border-border text-foreground hover:bg-muted rounded-lg border p-2"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-heading text-secondary text-sm font-bold">Family Portal</span>
        </div>

        <div className="flex items-center gap-2">
          <GlobalSearch />
          <NotificationCenter />
        </div>
      </header>

      {/* Backdrop for Mobile Drawer */}
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

      {/* Desktop Fixed Sidebar */}
      <aside className="bg-card border-border fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r lg:flex">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:pl-64">
        {/* Desktop Top Header Bar */}
        <div className="border-border/60 mb-6 hidden items-center justify-between border-b pb-4 lg:flex">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
              Queen of All Saints Digital Parish
            </span>
          </div>
          <div className="flex items-center gap-3">
            <GlobalSearch />
            <NotificationCenter />
          </div>
        </div>

        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}

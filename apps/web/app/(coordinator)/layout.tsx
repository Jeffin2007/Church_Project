'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import type { ReactNode } from 'react';

export default function CoordinatorLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const coordNav = [
    { label: 'Coordinator Dashboard', href: '/coordinator/dashboard', icon: '📊' },
    { label: 'Ministry Members', href: '/coordinator/members', icon: '👥' },
    { label: 'Events & Activities', href: '/coordinator/events', icon: '📅' },
    { label: 'Volunteer Roster', href: '/coordinator/volunteers', icon: '🤝' },
  ];

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
      <div className="border-border flex items-center justify-between border-b p-5">
        <div className="flex items-center gap-3">
          <div className="bg-secondary/10 text-secondary flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold">
            ⛪
          </div>
          <div>
            <h2 className="font-heading text-secondary text-sm font-bold">Ministry Coordinator</h2>
            <span className="text-muted-foreground text-[11px]">Youth Movement</span>
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

      <nav className="flex-1 space-y-1 p-3 text-sm font-medium">
        {coordNav.map((item) => {
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
          <p className="text-foreground font-semibold">Jeffin Joseph</p>
          <p className="text-muted-foreground text-[11px]">Ministry Coordinator</p>
        </div>
        <Link
          href="/login"
          onClick={() => setIsOpen(false)}
          className="bg-destructive/10 text-destructive hover:bg-destructive/20 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-center text-xs font-semibold transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </Link>
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
          <span className="font-heading text-secondary text-sm font-bold">Coordinator Portal</span>
        </div>
        <span className="text-muted-foreground text-xs font-semibold">Youth Movement</span>
      </header>

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
      <aside className="bg-card border-border fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r lg:flex">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:pl-64">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}

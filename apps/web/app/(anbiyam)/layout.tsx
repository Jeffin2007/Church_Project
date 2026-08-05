import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AnbiyamLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      <aside className="bg-card border-border fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r">
        <div className="border-border flex items-center gap-3 border-b p-5">
          <div className="bg-gold/20 text-gold-700 dark:text-gold-400 flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold">
            🏘️
          </div>
          <div>
            <h2 className="font-heading text-gold-700 dark:text-gold-400 text-sm font-bold">
              Anbiyam Portal
            </h2>
            <span className="text-muted-foreground text-[11px]">St. Thomas Anbiyam</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3 text-sm font-medium">
          {[
            { label: 'Anbiyam Dashboard', href: '/anbiyam/dashboard', icon: '📊' },
            { label: 'My Families', href: '/anbiyam/families', icon: '🏠' },
            { label: 'Meeting Records', href: '/anbiyam/meetings', icon: '📋' },
            { label: 'Activity Reports', href: '/anbiyam/reports', icon: '📈' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-gold-700 dark:hover:text-gold-400 hover:bg-gold/10 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-border space-y-2 border-t p-3">
          <div className="bg-muted/60 rounded-lg px-3 py-2 text-xs">
            <p className="text-foreground font-semibold">Robin Antony</p>
            <p className="text-muted-foreground text-[11px]">Anbiyam Leader</p>
          </div>
          <Link
            href="/login"
            className="bg-destructive/10 text-destructive hover:bg-destructive/20 block w-full rounded-lg py-2 text-center text-xs font-semibold transition-colors"
          >
            Sign Out
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 pl-64">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}

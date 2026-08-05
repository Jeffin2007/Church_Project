import Link from 'next/link';
import type { ReactNode } from 'react';

export default function CoordinatorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      <aside className="bg-card border-border fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r">
        <div className="border-border flex items-center gap-3 border-b p-5">
          <div className="bg-secondary/10 text-secondary flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold">
            ⛪
          </div>
          <div>
            <h2 className="font-heading text-secondary text-sm font-bold">Ministry Coordinator</h2>
            <span className="text-muted-foreground text-[11px]">Youth Movement</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3 text-sm font-medium">
          {[
            { label: 'Coordinator Dashboard', href: '/coordinator/dashboard', icon: '📊' },
            { label: 'Ministry Members', href: '/coordinator/members', icon: '👥' },
            { label: 'Events & Activities', href: '/coordinator/events', icon: '📅' },
            { label: 'Volunteer Roster', href: '/coordinator/volunteers', icon: '🤝' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-secondary hover:bg-secondary/10 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-border space-y-2 border-t p-3">
          <div className="bg-muted/60 rounded-lg px-3 py-2 text-xs">
            <p className="text-foreground font-semibold">Jeffin Joseph</p>
            <p className="text-muted-foreground text-[11px]">Ministry Coordinator</p>
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

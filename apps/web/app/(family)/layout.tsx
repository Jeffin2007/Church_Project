import Link from 'next/link';
import type { ReactNode } from 'react';

export default function FamilyLayout({ children }: { children: ReactNode }) {
  const familyNav = [
    { label: 'My Dashboard', href: '/family/dashboard', icon: '📊' },
    { label: 'Family Profile', href: '/family/profile', icon: '🏠' },
    { label: 'Family Members', href: '/family/members', icon: '👥' },
    { label: 'Dues & Payments', href: '/family/payments', icon: '💳' },
    { label: 'Sacrament Requests', href: '/family/requests', icon: '📜' },
    { label: 'Certificates', href: '/family/certificates', icon: '🎓' },
    { label: 'Appointments', href: '/family/appointments', icon: '📅' },
    { label: 'Payment Receipts', href: '/family/receipts', icon: '🧾' },
    { label: 'Parish Ministries', href: '/family/ministries', icon: '⛪' },
    { label: 'Volunteer Signup', href: '/family/volunteer', icon: '🤝' },
  ];

  return (
    <div className="bg-background text-foreground flex min-h-screen">
      {/* ─── Family Portal Sidebar ─────────────────────────────────── */}
      <aside className="bg-card border-border fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r">
        <div className="border-border flex items-center gap-3 border-b p-5">
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

        <nav className="flex-1 space-y-1 overflow-y-auto p-3 text-sm font-medium">
          {familyNav.map((item) => (
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
            <p className="text-foreground font-semibold">Joseph Anthony</p>
            <p className="text-muted-foreground text-[11px]">Family Head</p>
          </div>
          <Link
            href="/login"
            className="bg-destructive/10 text-destructive hover:bg-destructive/20 block w-full rounded-lg py-2 text-center text-xs font-semibold transition-colors"
          >
            Sign Out
          </Link>
        </div>
      </aside>

      {/* ─── Main Content ───────────────────────────────────────────── */}
      <main className="flex-1 p-8 pl-64">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}

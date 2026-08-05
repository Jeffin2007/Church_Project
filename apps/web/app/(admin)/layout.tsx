import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const adminNav = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { label: 'Families', href: '/admin/families', icon: '🏠' },
    { label: 'Family Members', href: '/admin/members', icon: '👥' },
    { label: 'Payments & Dues', href: '/admin/payments', icon: '💳' },
    { label: 'Payment Categories', href: '/admin/payment-categories', icon: '🏷️' },
    { label: 'Sacrament Requests', href: '/admin/requests', icon: '📜' },
    { label: 'Request Types', href: '/admin/request-types', icon: '⚙️' },
    { label: 'Parish Reports', href: '/admin/reports', icon: '📈' },
    { label: 'Finance & Accounts', href: '/admin/finance', icon: '💰' },
    { label: 'Appointments', href: '/admin/appointments', icon: '📅' },
    { label: 'Certificates', href: '/admin/certificates', icon: '🎓' },
    { label: 'Anbiyams', href: '/admin/anbiyams', icon: '🏘️' },
    { label: 'Ministries', href: '/admin/ministries', icon: '⛪' },
    { label: 'Volunteers', href: '/admin/volunteers', icon: '🤝' },
  ];

  return (
    <div className="bg-muted/40 text-foreground flex min-h-screen">
      {/* ─── Admin Sidebar ──────────────────────────────────────────── */}
      <aside className="bg-card border-border fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r">
        <div className="border-border flex items-center gap-3 border-b p-6">
          <div className="bg-primary text-primary-foreground flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold">
            ✝
          </div>
          <div>
            <h2 className="font-heading text-primary text-base font-bold leading-tight">
              Queen of All Saints
            </h2>
            <span className="text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">
              Admin & Priest Portal
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4 text-sm font-medium">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-border space-y-2 border-t p-4">
          <div className="bg-muted/60 rounded-lg px-3 py-2 text-xs">
            <p className="text-foreground font-semibold">Logged in as Administrator</p>
            <p className="text-muted-foreground truncate text-[11px]">priest@queenofallsaints.in</p>
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
      <main className="flex-1 overflow-y-auto p-8 pl-72">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}

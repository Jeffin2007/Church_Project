import type { ReactNode } from 'react';
import { HeaderNav } from '@/components/ui/header-nav';
import { ParishFooter } from '@/components/ui/parish-footer';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col font-sans">
      {/* ─── Parish Header Navigation ──────────────────────────────── */}
      <HeaderNav />

      {/* ─── Page Content ────────────────────────────────────────── */}
      <main className="flex-1">{children}</main>

      {/* ─── Parish Footer ───────────────────────────────────────── */}
      <ParishFooter />
    </div>
  );
}

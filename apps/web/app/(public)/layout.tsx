import Link from 'next/link';
import type { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      {/* ─── Parish Header Navigation ──────────────────────────────── */}
      <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full font-serif text-xl font-bold">
              ✝
            </div>
            <div>
              <span className="font-heading text-primary text-lg font-bold">
                Queen of All Saints
              </span>
              <span className="text-muted-foreground block text-xs">Roman Catholic Parish</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/history" className="hover:text-primary transition-colors">
              History
            </Link>
            <Link href="/mass-timings" className="hover:text-primary transition-colors">
              Mass Timings
            </Link>
            <Link href="/ministries" className="hover:text-primary transition-colors">
              Ministries
            </Link>
            <Link href="/gallery" className="hover:text-primary transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1"
            >
              Parish Portal Login
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Page Content ────────────────────────────────────────── */}
      <main className="flex-1">{children}</main>

      {/* ─── Parish Footer ───────────────────────────────────────── */}
      <footer className="bg-muted border-border/40 border-t py-8">
        <div className="text-muted-foreground mx-auto max-w-7xl px-4 text-center text-sm sm:px-6 lg:px-8">
          <p className="font-heading text-foreground font-semibold">
            Queen of All Saints Roman Catholic Church
          </p>
          <p className="mt-1">Parish Management & Digital Ministry Platform</p>
          <p className="mt-4 text-xs">© 2026 Queen of All Saints Parish. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { HeaderNav } from '@/components/ui/header-nav';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col font-sans">
      {/* ─── Parish Header Navigation ──────────────────────────────── */}
      <HeaderNav />

      {/* ─── Page Content ────────────────────────────────────────── */}
      <main className="flex-1">{children}</main>

      {/* ─── Parish Footer ───────────────────────────────────────── */}
      <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[hsl(214,75%,12%)] via-[hsl(214,70%,10%)] to-slate-950 py-16 text-white">
        {/* Subtle SVG Grid Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 4v40M4 24h40' stroke='%23C9A227' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          {/* Main Footer Info */}
          <div className="grid items-start gap-8 border-b border-white/10 pb-8 md:grid-cols-3">
            {/* Column 1: Parish Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="from-gold-400 to-gold-600 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br font-bold text-slate-950 shadow-lg">
                  ✝
                </div>
                <div>
                  <p className="font-display text-xl font-bold leading-tight text-white">
                    Queen of All Saints Church
                  </p>
                  <p className="text-gold-300 text-xs font-semibold">Roman Catholic Parish</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/80">
                Diocese of Tiruchirappalli · Serving our community with faith, Eucharistic devotion,
                and love since 1977.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-2">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-wider">
                Quick Navigation
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-white/85">
                <Link href="/" className="hover:text-gold-300 transition-colors">
                  Home
                </Link>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  About Parish
                </Link>
                <Link href="/history" className="hover:text-gold-300 transition-colors">
                  History & Heritage
                </Link>
                <Link href="/mass-timings" className="hover:text-gold-300 transition-colors">
                  Mass Schedule
                </Link>
                <Link href="/ministries" className="hover:text-gold-300 transition-colors">
                  Ministries
                </Link>
                <Link href="/gallery" className="hover:text-gold-300 transition-colors">
                  Photo Gallery
                </Link>
                <Link href="/contact" className="hover:text-gold-300 transition-colors">
                  Contact Office
                </Link>
                <Link
                  href="/about-platform"
                  className="text-gold-400 font-bold transition-colors hover:underline"
                >
                  About Platform
                </Link>
              </div>
            </div>

            {/* Column 3: Contact & Office */}
            <div className="space-y-2 text-xs text-white/80">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-wider">
                Parish Office
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="text-gold-400 h-3.5 w-3.5 shrink-0" />
                <span>Main Sanctuary Road, K.K. Nagar, Trichy – 620021</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="text-gold-400 h-3.5 w-3.5 shrink-0" />
                <span>+91 431 2400000 · Office Desk</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="text-gold-400 h-3.5 w-3.5 shrink-0" />
                <span>office@queenofallsaints.in</span>
              </p>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Restored Developer Badge */}
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/70 sm:flex-row">
            <p>© 2026 Queen of All Saints Parish. All rights reserved.</p>

            {/* Developer Credit Link (Jeffin Josva S) */}
            <Link
              href="/developer"
              className="border-gold-400/50 from-gold-500/20 to-gold-400/10 text-gold-300 hover:bg-gold-500/30 inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-5 py-2 text-xs font-extrabold shadow-[0_0_15px_rgba(201,162,39,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(201,162,39,0.5)]"
            >
              <Sparkles className="text-gold-400 h-4 w-4 animate-pulse" />
              <span>Designed &amp; Developed by Jeffin Josva S</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

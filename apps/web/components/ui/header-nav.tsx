'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, ChevronRight } from 'lucide-react';

export function HeaderNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/history', label: 'History' },
    { href: '/mass-timings', label: 'Mass Timings' },
    { href: '/ministries', label: 'Ministries' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[hsl(214,75%,11%)]/95 shadow-lg backdrop-blur-md supports-[backdrop-filter]:bg-[hsl(214,75%,11%)]/85">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="from-gold-400 via-gold-500 to-gold-600 relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-slate-950 shadow-[0_0_15px_rgba(201,162,39,0.5)] transition-transform duration-300 group-hover:scale-110">
            <span className="font-serif text-2xl font-black">✝</span>
          </div>
          <div>
            <span className="font-display group-hover:text-gold-300 block text-lg font-bold leading-tight tracking-tight text-white transition-colors">
              Queen of All Saints
            </span>
            <span className="text-gold-300/80 block text-[11px] font-semibold uppercase tracking-wider">
              Roman Catholic Parish · Trichy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3.5 py-2 transition-all duration-200 ${
                  isActive
                    ? 'text-gold-300 bg-white/10 font-bold shadow-inner'
                    : 'hover:text-gold-300 text-white/85 hover:bg-white/5'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="bg-gold-400 absolute bottom-0 left-3 right-3 h-0.5 rounded-full shadow-[0_0_8px_#C5973A]" />
                )}
              </Link>
            );
          })}
          <Link
            href="/about-platform"
            className="text-gold-400 hover:text-gold-300 hover:bg-gold-500/10 border-gold-400/30 ml-1 flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <Sparkles className="text-gold-400 h-3.5 w-3.5" />
            <span>Platform</span>
          </Link>
        </nav>

        {/* Right CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="from-gold-400 via-gold-500 to-gold-600 hidden items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-[0_4px_20px_rgba(201,162,39,0.3)] transition-all hover:scale-105 hover:shadow-[0_6px_24px_rgba(201,162,39,0.5)] active:scale-95 sm:inline-flex"
          >
            <span>Parish Portal Login</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl border border-white/20 p-2.5 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="text-gold-300 h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="animate-fade-in-down space-y-2 border-t border-white/10 bg-[hsl(214,75%,10%)] px-4 pb-6 pt-3 shadow-2xl lg:hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-gold-500/20 text-gold-300 border-gold-400/40 border'
                    : 'hover:text-gold-300 text-white/90 hover:bg-white/10'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="text-gold-400/60 h-4 w-4" />
              </Link>
            );
          })}
          <Link
            href="/about-platform"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gold-300 border-gold-400/30 bg-gold-500/10 flex items-center justify-between rounded-xl border px-4 py-3 text-xs font-bold"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="text-gold-400 h-4 w-4" />
              <span>About Platform</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Link>
          <div className="pt-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="from-gold-400 to-gold-600 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r py-3.5 text-xs font-black text-slate-950 shadow-xl"
            >
              <span>Parish Portal Login →</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home | Queen of All Saints Parish',
  description: 'Welcome to Queen of All Saints Roman Catholic Church — Trichy',
};

export default function PublicHomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* ─── Hero Section ─────────────────────────────────────────────── */}
      <section className="from-primary/10 via-primary/5 to-background relative overflow-hidden bg-gradient-to-b py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="border-gold/30 bg-gold/10 text-gold-700 dark:text-gold-400 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold">
              <span>✦ Welcome to Our Parish</span>
            </div>
            <h1 className="font-heading text-primary text-4xl font-bold tracking-tight sm:text-6xl">
              Queen of All Saints Church
            </h1>
            <p className="text-muted-foreground font-serif text-xl italic">
              "To love is to serve, to serve is to witness."
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A vibrant Roman Catholic parish community dedicated to prayer, sacraments, parish
              fellowship, and digital service.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/login"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-medium shadow-lg transition-colors"
              >
                Access Parish Portal →
              </Link>
              <Link
                href="/mass-timings"
                className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-medium transition-colors"
              >
                View Holy Mass Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick Info Cards Section ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1: Mass Timings */}
          <div className="bg-card text-card-foreground border-border/60 rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg text-2xl">
              ⛪
            </div>
            <h3 className="font-heading text-xl font-bold">Holy Mass Schedule</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Daily & Sunday Eucharistic celebrations in Tamil & English.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex justify-between border-b pb-1">
                <span>Sunday Morning:</span>{' '}
                <span className="font-semibold">6:30 AM & 8:30 AM</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>Sunday Evening:</span> <span className="font-semibold">5:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Weekday Mass:</span> <span className="font-semibold">6:30 AM</span>
              </li>
            </ul>
            <Link
              href="/mass-timings"
              className="text-primary mt-4 inline-block text-xs font-semibold hover:underline"
            >
              Full Schedule & Intentions →
            </Link>
          </div>

          {/* Card 2: Anbiyam & Fellowships */}
          <div className="bg-card text-card-foreground border-border/60 rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="bg-secondary/10 text-secondary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg text-2xl">
              🕊️
            </div>
            <h3 className="font-heading text-xl font-bold">Anbiyam Units</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              7 active Anbiyams bringing families together in prayer and mutual assistance.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• St. Thomas Anbiyam</li>
              <li>• St. Joseph Anbiyam</li>
              <li>• Our Lady of Good Health Anbiyam</li>
            </ul>
            <Link
              href="/about"
              className="text-secondary mt-4 inline-block text-xs font-semibold hover:underline"
            >
              Learn about Anbiyams →
            </Link>
          </div>

          {/* Card 3: Sacraments & Request Portal */}
          <div className="bg-card text-card-foreground border-border/60 rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="bg-gold/10 text-gold-700 dark:text-gold-400 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg text-2xl">
              📜
            </div>
            <h3 className="font-heading text-xl font-bold">Sacrament Requests</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Submit digital requests for Baptism, Confirmation, Marriage & Mass Intentions.
            </p>
            <div className="mt-6">
              <Link
                href="/login"
                className="bg-gold/20 text-gold-800 dark:text-gold-300 hover:bg-gold/30 block w-full rounded-md py-2 text-center text-xs font-semibold transition-colors"
              >
                Submit Request via Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Parish History & Heritage Section ───────────────────────────── */}
      <section className="bg-muted/50 border-border/40 border-y py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                Our Sacred History
              </span>
              <h2 className="font-heading text-3xl font-bold">A Legacy of Faith and Devotion</h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded over seven decades ago, Queen of All Saints Parish has been a beacon of
                faith, hope, and charity. From humble beginnings to a thriving parish community of
                hundreds of families, our church continues to honor its sacred heritage.
              </p>
              <div className="pt-2">
                <Link
                  href="/history"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors"
                >
                  Read Full History
                </Link>
              </div>
            </div>

            <div className="bg-card border-border/60 rounded-2xl border p-8 shadow-sm">
              <h4 className="font-heading text-primary text-xl font-bold">Parish Leadership</h4>
              <div className="mt-4 space-y-4 text-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full font-bold">
                    Priest
                  </div>
                  <div>
                    <p className="text-foreground font-semibold">Rev. Fr. Parish Priest</p>
                    <p className="text-muted-foreground text-xs">
                      Parish Administrator & Spiritual Guide
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <p className="text-muted-foreground text-xs">
                    Office Hours: Monday – Saturday (9:00 AM – 1:00 PM, 4:00 PM – 7:00 PM)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

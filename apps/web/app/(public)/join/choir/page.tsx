import type { Metadata } from 'next';
import Link from 'next/link';
import { PARISH } from '@/lib/parish-data';
import { Music, ChevronLeft } from 'lucide-react';
import { buttonClassName } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Join Parish Choir | Queen of All Saints Church',
  description:
    'Request to join one of our six liturgical choir teams at Queen of All Saints Roman Catholic Church, Trichy.',
};

export default function JoinChoirPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(214,75%,10%)] via-[hsl(214,70%,16%)] to-[hsl(214,65%,22%)] py-20 text-white md:py-24">
        <div className="container-sacred relative z-10 mx-auto max-w-5xl text-center">
          <Link
            href="/#ministries"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Parish Home</span>
          </Link>

          <div className="border-gold-400/40 bg-gold-500/20 text-gold-300 mx-auto mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
            <Music className="h-3.5 w-3.5" />
            <span>Voices of Worship · வழிபாட்டு குரல்கள்</span>
          </div>

          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Join Our <span className="text-gradient-gold">Parish Choir</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            Share your gift of song and instrumental music to glorify God at Holy Mass across our 6
            specialized choir teams.
          </p>
        </div>
      </section>

      {/* ── Choir Teams List ── */}
      <section className="container-sacred mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
            Six Choir Teams
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-950 sm:text-4xl dark:text-white">
            Choose Your Choir Team
          </h2>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            Incharge: <span className="text-primary font-bold">Selvan Jeffin Josva S</span> · Parish
            Office: +91 94432 49671
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PARISH.choirTeams.map((team) => (
            <div
              key={team.id}
              className="border-border/80 bg-card hover:border-primary/60 flex flex-col justify-between rounded-2xl border-2 p-6 shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="bg-primary/10 text-primary inline-flex h-10 w-10 items-center justify-center rounded-xl font-bold">
                  <Music className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                  {team.name}
                </h3>
                <p
                  className="text-primary text-xs font-bold"
                  lang="ta"
                  style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                >
                  {team.nameTa}
                </p>
                <p className="text-xs font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                  {team.desc}
                </p>

                <div className="border-border/60 bg-muted/40 space-y-1 rounded-xl border p-3 text-[11px]">
                  <p className="font-bold text-slate-900 dark:text-slate-100">
                    Practice: <span className="text-primary">{team.practiceDay}</span>
                  </p>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    Mass: {team.massesServed}
                  </p>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    Led by: {team.incharge}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/choir/${team.id}`}
                  className={buttonClassName('primary', 'md', 'w-full font-bold shadow-md')}
                >
                  View Details &amp; Apply
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Direct Contact Banner ── */}
      <section className="container-sacred mx-auto max-w-4xl px-4 text-center">
        <div className="border-gold-400/40 rounded-3xl border-2 bg-gradient-to-r from-[hsl(214,75%,12%)] via-[hsl(214,70%,18%)] to-[hsl(214,75%,12%)] p-10 text-white shadow-2xl">
          <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
            Questions About Joining?
          </h3>
          <p className="mt-2 text-sm text-white/90">
            Contact Choir Incharge Selvan Jeffin Josva S or visit the Parish Office after Sunday
            Mass.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919443249671"
              className="bg-gold-400 hover:bg-gold-300 inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-extrabold text-slate-950 shadow-xl transition-all hover:scale-105"
            >
              📞 Call Parish Desk (+91 94432 49671)
            </a>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 text-sm font-bold text-white transition-all hover:bg-white/20"
            >
              Contact Parish Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

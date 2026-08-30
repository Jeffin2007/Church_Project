import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Cross, Flame, Heart, Star, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Holy Mass Timings | Queen of All Saints Parish',
  description:
    'Complete Holy Mass schedule, Confession hours, Novena devotions, and Adoration timings at Queen of All Saints Church, Trichy.',
};

export default function MassTimingsPage() {
  const schedules = [
    {
      title: 'Sunday Eucharist · ஞாயிறு திருப்பலி',
      icon: Cross,
      badge: 'Lord’s Day',
      masses: [
        { time: '6:30 AM', lang: 'Tamil (தமிழ்)', type: 'Morning Mass · திருப்பலி' },
        { time: '8:30 AM', lang: 'English', type: 'High Mass · திருப்பலி' },
        { time: '5:30 PM', lang: 'Tamil (தமிழ்)', type: 'Evening Mass · மாலைத் திருப்பலி' },
      ],
    },
    {
      title: 'Weekday Mass · வாரநாட்கள் திருப்பலி',
      icon: Flame,
      badge: 'Mon – Sat',
      masses: [
        { time: '6:30 AM', lang: 'Tamil (தமிழ்)', type: 'Daily Eucharist · காலைத் திருப்பலி' },
      ],
    },
    {
      title: 'Wednesday Novena · புதன் நவநாள்',
      icon: Star,
      badge: 'Novena Devotion',
      masses: [
        {
          time: '6:00 PM',
          lang: 'Tamil & English',
          type: 'Novena to Our Lady Queen of All Saints',
        },
        { time: '6:30 PM', lang: 'Tamil (தமிழ்)', type: 'Novena Mass · நவநாள் திருப்பலி' },
      ],
    },
    {
      title: 'First Friday Adoration · முதன்மை வெள்ளி',
      icon: Heart,
      badge: 'Eucharistic Adoration',
      masses: [
        { time: '5:30 PM – 6:30 PM', lang: 'Bilingual', type: 'Solemn Holy Hour & Benediction' },
        { time: '6:30 PM', lang: 'Tamil (தமிழ்)', type: 'Sacred Heart Mass' },
      ],
    },
  ];

  const confessions = [
    { day: 'Saturday Evening', time: '5:00 PM – 5:45 PM', details: 'Main Sanctuary Confessional' },
    {
      day: 'Sunday Morning',
      time: 'Before Each Mass (6:00 AM & 8:00 AM)',
      details: 'Priest Sacristy',
    },
    { day: 'Weekdays', time: 'By Appointment', details: 'Parish Office' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(214,75%,12%)] via-[hsl(214,70%,18%)] to-[hsl(214,65%,22%)] py-20 text-white md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M24 4v40M4 24h40' stroke='%23C9A227' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="container-sacred relative z-10 mx-auto max-w-5xl text-center">
          <div className="border-gold-400/40 bg-gold-500/20 text-gold-300 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
            <Clock className="h-3.5 w-3.5" />
            <span>Sacred Liturgy · திருப்பலி நேரங்கள்</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Holy Mass & <span className="text-gradient-gold">Sacrament Schedule</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            Join our parish community for daily Eucharistic celebration, Eucharistic Adoration,
            Novenas, and Confession.
          </p>
          <div className="text-gold-300 mt-4 flex items-center justify-center gap-2 text-sm font-semibold">
            <MapPin className="h-4 w-4" />
            <span>Queen of All Saints Main Sanctuary, K.K. Nagar, Trichy</span>
          </div>
        </div>
      </section>

      {/* Mass Schedule Grid */}
      <section className="container-sacred mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {schedules.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="hover:border-gold-400 group overflow-hidden rounded-2xl border-2 border-slate-800 bg-slate-900 p-8 text-white shadow-2xl transition-all"
              >
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gold-400 flex h-12 w-12 items-center justify-center rounded-xl font-bold text-slate-950 shadow-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                    </div>
                  </div>
                  <span className="bg-gold-500/20 border-gold-400/40 text-gold-300 rounded-full border px-3 py-1 text-xs font-bold">
                    {s.badge}
                  </span>
                </div>

                <div className="space-y-4">
                  {s.masses.map((m) => (
                    <div
                      key={m.time}
                      className="flex items-center justify-between rounded-xl bg-card border border-border/80 p-4 text-foreground shadow-md"
                    >
                      <div>
                        <p className="text-xl font-black text-foreground dark:text-white">{m.time}</p>
                        <p className="text-xs font-semibold text-muted-foreground">{m.lang}</p>
                      </div>
                      <div className="text-right">
                        <span className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
                          {m.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sacrament of Reconciliation / Confession */}
      <section className="container-sacred mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="border-gold-400/40 rounded-3xl border-2 bg-slate-900 p-8 text-white shadow-2xl">
          <div className="mb-6 text-center">
            <span className="bg-gold-500/20 border-gold-400/40 text-gold-300 rounded-full border px-3 py-1 text-xs font-bold">
              Sacrament of Reconciliation
            </span>
            <h3 className="font-display mt-2 text-2xl font-bold text-white">
              Confession Timings · பாவசங்கீர்த்தனம்
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {confessions.map((c) => (
              <div
                key={c.day}
                className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center text-white shadow-xl backdrop-blur-sm"
              >
                <p className="text-base font-extrabold text-white">{c.day}</p>
                <p className="text-gold-300 bg-gold-500/20 border-gold-400/40 mt-1 rounded-md border px-3 py-1.5 text-xs font-bold">
                  {c.time}
                </p>
                <p className="mt-2 text-xs font-medium text-white/80">{c.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Mass Intention CTA */}
      <section className="container-sacred mx-auto max-w-4xl px-4 text-center">
        <div className="border-border/80 bg-card rounded-3xl border-2 p-10 shadow-xl">
          <h3 className="font-display text-foreground text-2xl font-bold md:text-3xl">
            Book Mass Intentions & Sacraments
          </h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Request Holy Mass intentions, Thanksgiving prayers, or Sacrament certificates online via
            the Parish Portal.
          </p>
          <div className="mt-6">
            <Link
              href="/login?redirect=/family/requests"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-12 items-center justify-center rounded-xl px-8 text-sm font-extrabold shadow-xl transition-all hover:scale-105"
            >
              Submit Request via Portal →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

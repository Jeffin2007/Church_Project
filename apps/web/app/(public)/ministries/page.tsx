import type { Metadata } from 'next';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/safe-image';
import { Users, Heart, Music, BookOpen, ShieldCheck, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Parish Ministries | Queen of All Saints Parish',
  description:
    'Explore parish associations, youth movement, Legion of Mary, Vincent de Paul, Altar Servers, and Parish Choir at Queen of All Saints Church.',
};

export default function MinistriesPage() {
  const ministries = [
    {
      title: 'Youth Movement · இளைஞர் இயக்கம்',
      category: 'Youth & Young Adult',
      icon: Flame,
      desc: 'Empowering parish youth through spiritual growth, choir, community service, retreat programs, and leadership training.',
      meeting: 'Every Sunday after 8:30 AM Mass',
      image: '/images/teams/youth/cover.jpg',
    },
    {
      title: 'Legion of Mary · மரியாயின் சேனை',
      category: 'Marian Devotion',
      icon: Heart,
      desc: 'Dedicated to Our Lady through weekly Rosary prayer meetings, home visits for sick and elderly parishioners, and hospital ministry.',
      meeting: 'Every Sunday at 4:00 PM',
      image: '/images/teams/legion-of-mary/cover.jpg',
    },
    {
      title: 'Vincent de Paul Society · அடைக்கல மாதா சங்கம்',
      category: 'Charity & Relief',
      icon: Users,
      desc: 'Charitable aid, monthly ration distribution, medical support, and educational sponsorship for needy parish families.',
      meeting: '1st & 3rd Sunday of each month',
      image: '/images/teams/vincent-de-paul/cover.jpg',
    },
    {
      title: 'Sunday Catechism Teachers · மறைக்கல்வி மன்றம்',
      category: 'Faith Formation',
      icon: BookOpen,
      desc: 'Instructing children in Catholic doctrine, Bible study, First Holy Communion, and Confirmation preparation.',
      meeting: 'Every Sunday at 8:00 AM',
      image: '/images/teams/catechism/cover.jpg',
    },
    {
      title: 'Altar Servers Association · பீடப் பணியாளர் சங்கம்',
      category: 'Liturgical Service',
      icon: ShieldCheck,
      desc: 'Serving at the Holy Altar during Sunday Eucharist, feast celebrations, processions, and liturgical ceremonies.',
      meeting: 'Every Saturday at 4:30 PM',
      image: '/images/teams/altar-servers/cover.jpg',
    },
    {
      title: 'Parish Choir Teams · பங்குப் பாடகர் குழுக்கள்',
      category: 'Sacred Music',
      icon: Music,
      desc: 'Leading liturgical worship and Eucharistic hymns in Tamil and English across 6 specialized choir teams.',
      meeting: 'Weekly Choir Practice',
      image: '/images/teams/choir/cover.jpg',
    },
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
            <Users className="h-3.5 w-3.5" />
            <span>Parish Organizations · பங்கு அமைப்புகள்</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Parish Ministries & <span className="text-gradient-gold">Associations</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            Discover opportunities to serve God, enrich your faith, build community, and share your
            talents at Queen of All Saints Church.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="container-sacred mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className="border-border/80 bg-card hover:border-primary group flex flex-col justify-between overflow-hidden rounded-2xl border-2 shadow-xl transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <SafeImage
                      src={m.image}
                      alt={m.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="bg-gold-400 absolute bottom-3 left-3 rounded-md px-2.5 py-1 text-[11px] font-extrabold text-slate-950 shadow">
                      {m.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-foreground text-lg font-bold leading-snug">
                        {m.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                    <div className="bg-muted text-foreground border-border/50 mt-4 rounded-lg border p-3 text-xs font-semibold">
                      📅 Meeting: {m.meeting}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/login?redirect=/family/ministries`}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold shadow transition-all hover:scale-[1.02]"
                  >
                    Join Ministry →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="container-sacred mx-auto max-w-4xl px-4 text-center">
        <div className="border-gold-400/40 rounded-3xl border-2 bg-gradient-to-r from-[hsl(214,75%,15%)] via-[hsl(214,70%,20%)] to-[hsl(214,75%,15%)] p-10 text-white shadow-2xl">
          <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
            Share Your Talents with Our Community
          </h3>
          <p className="mt-2 text-sm text-white/85">
            Whether in choir, catechism, altar service, or charity, your participation strengthens
            our parish family.
          </p>
          <div className="mt-6">
            <Link
              href="/login?redirect=/family/volunteer"
              className="bg-gold-400 hover:bg-gold-300 inline-flex h-12 items-center justify-center rounded-xl px-8 text-sm font-extrabold text-slate-950 shadow-xl transition-all hover:scale-105"
            >
              Apply as Volunteer / Member →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

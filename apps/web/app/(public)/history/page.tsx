import type { Metadata } from 'next';
import { SafeImage } from '@/components/ui/safe-image';
import { Landmark, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Parish History | Queen of All Saints Parish',
  description:
    'Explore the 100-year history and heritage of Queen of All Saints Roman Catholic Church, Trichy.',
};

export default function HistoryPage() {
  const milestones = [
    {
      year: '1977',
      title: 'Humble Beginnings in K.K. Nagar',
      titleTa: 'கேகேநகரில் துவக்கம்',
      desc: 'The parish journey began in a rented house in K.K. Nagar with a handful of Catholic families gathering for Sunday Eucharist under the guidance of Trichy diocesan priests.',
      image: '/images/history/1977-founding.jpg',
    },
    {
      year: '1985',
      title: 'Solemn Church Consecration',
      titleTa: 'ஆலயப் பிரதிஷ்டை',
      desc: 'Solemn consecration of the main sanctuary and altar dedicated to Our Lady Queen of All Saints by the Bishop of Tiruchirappalli.',
      image: '/images/history/1985-consecration.jpg',
    },
    {
      year: '1995',
      title: 'Parish Growth & Anbiyam Foundation',
      titleTa: 'அன்பியங்களின் உருவாக்கம்',
      desc: 'Establishment of 8 Basic Christian Community (Anbiyam) units across neighborhood zones, establishing daily family Rosary and neighborhood prayer.',
      image: '/images/history/1995-growth.jpg',
    },
    {
      year: '2010',
      title: 'Sanctuary Renovation & Bell Tower',
      titleTa: 'ஆலய புனரமைப்பு',
      desc: 'Comprehensive renovation of the sanctuary interior, marble altar, stained glass windows, and installation of the ceremonial bell tower.',
      image: '/images/history/2010-renovation.jpg',
    },
    {
      year: '2024',
      title: 'Digital Parish Platform Launch',
      titleTa: 'டிஜிட்டல் பங்குத்தளம்',
      desc: 'Pioneering digital administration, online sacrament requests, parish family portal, and live-streamed Eucharistic celebrations.',
      image: '/images/history/present.jpg',
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
            <Landmark className="h-3.5 w-3.5" />
            <span>Heritage & History · பங்கு வரலாறு</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Sacred <span className="text-gradient-gold">Heritage & Legacy</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            Tracing decades of faith, devotion, Eucharistic celebrations, and community growth at
            Queen of All Saints Church, Trichy.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container-sacred mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="before:from-gold-400 before:via-gold-500 before:to-gold-400 relative space-y-12 before:absolute before:inset-0 before:left-8 before:w-1 before:bg-gradient-to-b md:before:left-1/2">
          {milestones.map((m, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={m.year}
                className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="border-gold-400 text-gold-300 absolute left-8 z-10 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 bg-slate-900 shadow-xl md:left-1/2">
                  <span className="text-xs font-black">{m.year}</span>
                </div>
                <div className="ml-16 w-full md:ml-0 md:w-1/2 md:px-8">
                  <div className="border-border/80 bg-card hover:border-primary/50 group overflow-hidden rounded-2xl border-2 p-6 shadow-xl transition-all">
                    <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                      <SafeImage
                        src={m.image}
                        alt={m.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="bg-primary/10 text-primary mb-2 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{m.year} Milestone</span>
                    </div>
                    <h3 className="font-display text-foreground text-xl font-bold">{m.title}</h3>
                    <p
                      className="text-primary mt-0.5 text-xs font-semibold"
                      style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                      lang="ta"
                    >
                      {m.titleTa}
                    </p>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

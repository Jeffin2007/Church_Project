import type { Metadata } from 'next';
import { Calendar } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { ChurchCard } from '@/components/ui/church-card';
import { SafeImage } from '@/components/ui/safe-image';
import { ParishBadge } from '@/components/ui/parish-badge';

export const metadata: Metadata = {
  title: 'Parish History | Queen of All Saints Parish',
  description:
    'Explore the history and sacred heritage of Queen of All Saints Roman Catholic Church, Trichy — from humble beginnings in 1977 to the modern era.',
};

export default function HistoryPage() {
  const milestones = [
    {
      year: '1977',
      title: 'Humble Beginnings in K.K. Nagar',
      titleTa: 'கே.கே. நகரில் துவக்கம்',
      desc: 'The parish journey began in a humble rented house in K.K. Nagar with a handful of Catholic families gathering for Sunday Eucharist under the apostolic guidance of Trichy diocesan priests.',
      image: '/images/history/1977-founding.jpg',
    },
    {
      year: '1985',
      title: 'Solemn Sanctuary Consecration',
      titleTa: 'ஆலயப் பிரதிஷ்டை',
      desc: 'Solemn consecration of the main sanctuary and marble altar dedicated to Our Lady Queen of All Saints by the Most Reverend Bishop of Tiruchirappalli.',
      image: '/images/history/1985-consecration.jpg',
    },
    {
      year: '1995',
      title: 'Parish Growth & Anbiyam Foundation',
      titleTa: 'அன்பியங்களின் உருவாக்கம்',
      desc: 'Establishment of 8 Basic Christian Community (Anbiyam) units across neighborhood zones, establishing daily family Rosary, mutual care, and neighborhood prayer.',
      image: '/images/history/1995-growth.jpg',
    },
    {
      year: '2010',
      title: 'Sanctuary Renovation & Bell Tower',
      titleTa: 'ஆலய புனரமைப்பு & மணி கோபுரம்',
      desc: 'Comprehensive renovation of the sanctuary interior, stained glass windows depicting the mysteries of the Holy Rosary, and installation of the ceremonial bell tower.',
      image: '/images/history/2010-renovation.jpg',
    },
    {
      year: '2024',
      title: 'Digital Parish Platform Launch',
      titleTa: 'டிஜிட்டல் பங்குத்தளம் தொடக்கம்',
      desc: 'Pioneering digital administration, online sacrament requests, parish family portal, and live-streamed Eucharistic celebrations for homebound parishioners.',
      image: '/images/history/present.jpg',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Page Hero */}
      <PageHero
        title="Our Sacred Heritage & History"
        tamilTitle="பங்கு வரலாறு & ஆன்மீக பாரம்பரியம்"
        eyebrow="Decades of Grace · அருளின் ஆண்டுகள்"
        description="Tracing decades of unbroken faith, Eucharistic devotions, Marian intercession, and community growth at Queen of All Saints Church, Trichy."
        backgroundImage="/images/hero/church-altar.webp"
        breadcrumbs={[{ label: 'History & Heritage' }]}
        align="center"
      />

      {/* Timeline Section */}
      <section className="container-sacred max-w-5xl">
        <SectionHeading
          eyebrow="Milestones of Faith"
          title="Parish Timeline"
          tamilTitle="முக்கிய நிகழ்வுகள்"
          subtitle="From a small gathering of families in 1977 to a vibrant parish community of over 1,200 households."
          align="center"
        />

        <div className="relative space-y-12 before:absolute before:inset-0 before:left-8 before:w-1 before:bg-gradient-to-b before:from-gold before:via-primary before:to-secondary md:before:left-1/2">
          {milestones.map((m, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={m.year}
                className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Year Badge on the Central Spine */}
                <div className="absolute left-8 z-10 flex h-14 w-14 sm:h-16 sm:w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-gold bg-[#001833] text-gold shadow-xl md:left-1/2">
                  <span className="font-heading text-xs sm:text-sm font-black">{m.year}</span>
                </div>

                {/* Milestone Content Card */}
                <div className="ml-16 w-full md:ml-0 md:w-1/2 md:px-8">
                  <ChurchCard variant={isEven ? 'gold-trim' : 'burgundy-trim'} hoverEffect className="overflow-hidden p-6 sm:p-7">
                    <div className="relative mb-5 h-48 w-full overflow-hidden rounded-t-[2.5rem] rounded-b-xl border border-gold/30 bg-muted">
                      <SafeImage
                        src={m.image}
                        alt={m.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    <div className="mb-2">
                      <ParishBadge variant="gold" size="sm" icon={<Calendar className="h-3.5 w-3.5" />}>
                        {m.year} Milestone
                      </ParishBadge>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                      {m.title}
                    </h3>
                    <p className="font-tamil text-xs sm:text-sm font-medium text-primary/80 dark:text-gold/80 mt-1">
                      {m.titleTa}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {m.desc}
                    </p>
                  </ChurchCard>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

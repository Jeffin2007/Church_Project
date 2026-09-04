import type { Metadata } from 'next';
import { Calendar, Camera, Sparkles, BookOpen } from 'lucide-react';
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
      image: '/images/history/img_3.webp',
      caption: 'Early assembly of founding parish families, benefactors, and clergy.',
    },
    {
      year: '1985',
      title: 'Solemn Sanctuary Consecration',
      titleTa: 'ஆலயப் பிரதிஷ்டை',
      desc: 'Solemn consecration of the main sanctuary and marble altar dedicated to Our Lady Queen of All Saints by the Most Reverend Bishop of Tiruchirappalli with diocesan concelebrants.',
      image: '/images/history/img_6.webp',
      caption: 'Solemn Consecration Mass under the crucifix with the Bishop and clergy.',
    },
    {
      year: '1995',
      title: 'Parish Growth & Anbiyam Foundation',
      titleTa: 'அன்பியங்களின் உருவாக்கம்',
      desc: 'Establishment of Basic Christian Community (Anbiyam) units across neighborhood zones, establishing daily family Rosary, mutual care, and vibrant community prayer.',
      image: '/images/history/img_5.webp',
      caption: 'Vibrant parish congregation filling the church for solemn liturgy.',
    },
    {
      year: '2010',
      title: 'Sanctuary Renovation & Bell Tower',
      titleTa: 'ஆலய புனரமைப்பு & மணி கோபுரம்',
      desc: 'Comprehensive renovation of the sanctuary interior, stained glass windows depicting the mysteries of the Holy Rosary, and celebration of parish jubilee milestones.',
      image: '/images/history/img_4.webp',
      caption: 'Parish choir and religious sisters ministering during solemn feast services.',
    },
    {
      year: '2024',
      title: 'Digital Parish Platform & Eucharistic Devotion',
      titleTa: 'டிஜிட்டல் பங்குத்தளம் & நற்கருணை பக்தி',
      desc: 'Pioneering digital administration, online sacrament requests, parish family portal, and continuing unbroken perpetual Eucharistic adoration and liturgical devotion.',
      image: '/images/history/img_1.webp',
      caption: 'Solemn Eucharistic celebration at the altar: "என் ஆன்மா ஆண்டவரைப் போற்றுகின்றது".',
    },
  ];

  const vintageArchives = [
    {
      id: 'arch-1',
      title: 'Eucharistic Consecration & Benediction',
      titleTa: 'நற்கருணை ஆராதனை & திருப்பலி',
      era: 'Historical Archive',
      image: '/images/history/img_1.webp',
      desc: 'Priests elevating the Holy Chalice and Ciborium at the altar with the scripture backdrop: "என் ஆன்மா ஆண்டவரைப் போற்றுகின்றது" (My soul magnifies the Lord).',
    },
    {
      id: 'arch-2',
      title: 'Episcopal Visitation & Clergy Reception',
      titleTa: 'ஆயரின் வருகை & அருட்பணியாளர்கள்',
      era: 'Solemn Concelebration',
      image: '/images/history/img_2.webp',
      desc: 'The Most Reverend Bishop arriving with ceremonial garlands accompanied by Trichy diocesan concelebrating priests in traditional white cassocks.',
    },
    {
      id: 'arch-3',
      title: 'Founding Parish Community Assembly',
      titleTa: 'துவக்க கால பங்கு குடும்பங்கள்',
      era: 'Foundation Era (1977)',
      image: '/images/history/img_3.webp',
      desc: 'Pioneering Catholic families, religious sisters, foreign mission benefactors, and parishioners gathered together in faith during the formative years.',
    },
    {
      id: 'arch-4',
      title: 'Liturgical Choir & Sacred Music',
      titleTa: 'பங்கு பாடகற்குழு',
      era: 'Liturgical Heritage',
      image: '/images/history/img_4.webp',
      desc: 'Parish choir members and religious sisters in white liturgical vestments leading the congregation in reverent Marian hymns and choral praises.',
    },
    {
      id: 'arch-5',
      title: 'Solemn Feast Congregation Assembly',
      titleTa: 'திருவிழா திருப்பலி மக்கள் கூட்டம்',
      era: 'Parish Growth',
      image: '/images/history/img_5.webp',
      desc: 'Hundreds of faithful parishioners gathered in reverence, singing and praying in joyful communion within the decorated parish sanctuary.',
    },
    {
      id: 'arch-6',
      title: 'Sanctuary Consecration Mass',
      titleTa: 'ஆலய பிரதிஷ்டை பெருவிழா',
      era: 'Sanctuary Dedication',
      image: '/images/history/img_6.webp',
      desc: 'Solemn Dedication Mass celebrated at the main altar under the Crucifix with the Bishop and Norbertine & Diocesan priests.',
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
                    <div className="relative mb-5 h-56 w-full overflow-hidden rounded-t-[2.5rem] rounded-b-xl border border-gold/30 bg-muted">
                      <SafeImage
                        src={m.image}
                        alt={m.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 text-left">
                        <p className="text-[11px] text-white/90 italic font-medium leading-tight">
                          {m.caption}
                        </p>
                      </div>
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

      {/* Sacred Vintage Archives Section */}
      <section className="container-sacred max-w-6xl">
        <SectionHeading
          eyebrow="Sacred Photographic Archives"
          title="Authentic Historical Treasures"
          tamilTitle="வரலாற்று புகைப்படப் பெட்டகம்"
          subtitle="Original photographs documenting the foundational events, liturgical celebrations, and spiritual milestones of Queen of All Saints Roman Catholic Church."
          align="center"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vintageArchives.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-gold/30 bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-gold backdrop-blur-sm">
                    <Camera className="h-3 w-3" /> {item.era}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h4 className="font-heading text-base font-bold text-foreground">
                  {item.title}
                </h4>
                <p className="font-tamil text-xs font-semibold text-primary/80 dark:text-gold/80 mt-0.5">
                  {item.titleTa}
                </p>
                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

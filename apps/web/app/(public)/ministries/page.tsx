import type { Metadata } from 'next';
import { Users, Heart, Music, BookOpen, ShieldCheck, Flame, Calendar } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { ChurchCard, ChurchCardContent } from '@/components/ui/church-card';
import { ChurchButton } from '@/components/ui/church-button';
import { ParishBadge } from '@/components/ui/parish-badge';
import { SafeImage } from '@/components/ui/safe-image';

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
      badgeVariant: 'burgundy' as const,
      icon: Flame,
      desc: 'Empowering parish youth through spiritual growth, choir, community service, retreat programs, and leadership training.',
      meeting: 'Every Sunday after 8:30 AM Mass',
      image: '/images/teams/youth/cover.jpg',
    },
    {
      title: 'Legion of Mary · மரியாயின் சேனை',
      category: 'Marian Devotion',
      badgeVariant: 'marian' as const,
      icon: Heart,
      desc: 'Dedicated to Our Lady through weekly Rosary prayer meetings, home visits for sick and elderly parishioners, and hospital ministry.',
      meeting: 'Every Sunday at 4:00 PM',
      image: '/images/teams/legion-of-mary/cover.jpg',
    },
    {
      title: 'Vincent de Paul Society · அடைக்கல மாதா சங்கம்',
      category: 'Charity & Relief',
      badgeVariant: 'gold' as const,
      icon: Users,
      desc: 'Charitable aid, monthly ration distribution, medical support, and educational sponsorship for needy parish families.',
      meeting: '1st & 3rd Sunday of each month',
      image: '/images/teams/vincent-de-paul/cover.jpg',
    },
    {
      title: 'Sunday Catechism Teachers · மறைக்கல்வி மன்றம்',
      category: 'Faith Formation',
      badgeVariant: 'ordinary' as const,
      icon: BookOpen,
      desc: 'Instructing children in Catholic doctrine, Bible study, First Holy Communion, and Confirmation preparation.',
      meeting: 'Every Sunday at 8:00 AM',
      image: '/images/teams/catechism/cover.jpg',
    },
    {
      title: 'Altar Servers Association · பீடப் பணியாளர் சங்கம்',
      category: 'Liturgical Service',
      badgeVariant: 'solemnity' as const,
      icon: ShieldCheck,
      desc: 'Serving at the Holy Altar during Sunday Eucharist, feast celebrations, processions, and liturgical ceremonies.',
      meeting: 'Every Saturday at 4:30 PM',
      image: '/images/teams/altar-servers/cover.jpg',
    },
    {
      title: 'Parish Choir Teams · பங்குப் பாடகர் குழுக்கள்',
      category: 'Sacred Music',
      badgeVariant: 'marian' as const,
      icon: Music,
      desc: 'Leading liturgical worship and Eucharistic hymns in Tamil and English across 6 specialized choir teams.',
      meeting: 'Weekly Choir Practice',
      image: '/images/teams/choir/cover.jpg',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Page Hero */}
      <PageHero
        title="Parish Ministries & Associations"
        tamilTitle="பங்கு பக்த சபைகள் & இயக்கங்கள்"
        eyebrow="Active Apostolic Service · நற்பணிகள்"
        description="Discover opportunities to serve God, enrich your faith, build Christian fellowship, and share your talents at Queen of All Saints Church."
        backgroundImage="/images/hero/church-altar.webp"
        breadcrumbs={[{ label: 'Ministries' }]}
        align="center"
      />

      {/* Ministries Grid */}
      <section className="container-sacred">
        <SectionHeading
          eyebrow="Organizations"
          title="Parish Fellowships"
          tamilTitle="பங்கு இயக்கங்கள்"
          subtitle="Every parishioner has a special vocation to build up the Body of Christ through active apostolic service."
          align="center"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m) => {
            const Icon = m.icon;
            return (
              <ChurchCard
                key={m.title}
                variant="gold-trim"
                hoverEffect
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                    <SafeImage
                      src={m.image}
                      alt={m.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <ParishBadge variant={m.badgeVariant} size="sm">
                        {m.category}
                      </ParishBadge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-foreground leading-snug">
                        {m.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {m.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 p-2.5 text-xs font-medium text-foreground">
                      <Calendar className="h-3.5 w-3.5 text-gold shrink-0" />
                      <span>{m.meeting}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <ChurchButton
                    variant="burgundy"
                    size="md"
                    href={`/login?redirect=/family/ministries`}
                    className="w-full"
                  >
                    Join Ministry →
                  </ChurchButton>
                </div>
              </ChurchCard>
            );
          })}
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="container-sacred max-w-4xl">
        <ChurchCard
          variant="gold-trim"
          className="bg-gradient-to-br from-[#001833] via-[#002852] to-[#001833] p-8 sm:p-12 text-white text-center dark:from-[#080C14] dark:via-[#0D131F] dark:to-[#080C14]"
        >
          <ChurchCardContent>
            <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Share Your Talents with Our Community
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-white/85 leading-relaxed">
              Whether in sacred choir, Sunday catechism, altar service, or Vincentian charity, your participation enriches our entire parish family.
            </p>
            <div className="mt-8 flex justify-center">
              <ChurchButton
                variant="gold"
                size="lg"
                href="/login?redirect=/family/volunteer"
              >
                Apply as Volunteer / Member →
              </ChurchButton>
            </div>
          </ChurchCardContent>
        </ChurchCard>
      </section>
    </div>
  );
}

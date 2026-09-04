import type { Metadata } from 'next';
import { Cross, Flame, Heart, Star, MapPin, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { ChurchCard, ChurchCardContent } from '@/components/ui/church-card';
import { ChurchButton } from '@/components/ui/church-button';
import { ParishBadge } from '@/components/ui/parish-badge';

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
      badgeVariant: 'solemnity' as const,
      isHighlight: true,
      masses: [
        { time: '6:30 AM', lang: 'Tamil (தமிழ்)', type: 'Morning Mass · காலைத் திருப்பலி' },
        { time: '8:30 AM', lang: 'English', type: 'Solemn High Mass · ஆங்கிலத் திருப்பலி' },
        { time: '5:30 PM', lang: 'Tamil (தமிழ்)', type: 'Evening Mass · மாலைத் திருப்பலி' },
      ],
    },
    {
      title: 'Weekday Mass · வாரநாட்கள் திருப்பலி',
      icon: Flame,
      badge: 'Mon – Sat',
      badgeVariant: 'ordinary' as const,
      isHighlight: false,
      masses: [
        { time: '6:30 AM', lang: 'Tamil (தமிழ்)', type: 'Daily Eucharist · காலைத் திருப்பலி' },
      ],
    },
    {
      title: 'Wednesday Novena · புதன் நவநாள்',
      icon: Star,
      badge: 'Novena Devotion',
      badgeVariant: 'marian' as const,
      isHighlight: false,
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
      badgeVariant: 'burgundy' as const,
      isHighlight: true,
      masses: [
        { time: '5:30 PM – 6:30 PM', lang: 'Bilingual', type: 'Solemn Holy Hour & Benediction' },
        { time: '6:30 PM', lang: 'Tamil (தமிழ்)', type: 'Sacred Heart Mass' },
      ],
    },
  ];

  const confessions = [
    { day: 'Saturday Evening', time: '5:00 PM – 5:45 PM', details: 'Main Sanctuary Confessional Box' },
    {
      day: 'Sunday Morning',
      time: 'Before Each Mass (6:00 AM & 8:00 AM)',
      details: 'Priest Sacristy',
    },
    { day: 'Weekdays & Anytime', time: 'By Appointment', details: 'Parish Office Desk' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Page Hero */}
      <PageHero
        title="Holy Mass & Liturgy Schedule"
        tamilTitle="பரிசுத்த திருப்பலி & வழிபாட்டு நேரங்கள்"
        eyebrow="Sacred Liturgy · திருவழிபாடு"
        description="Come, worship with our parish community. Daily Eucharistic celebrations, Novenas to Our Lady Queen of All Saints, Eucharistic Adoration, and Reconciliation."
        backgroundImage="/images/hero/church-altar.webp"
        breadcrumbs={[{ label: 'Mass Timings' }]}
        badge={
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-200 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-gold" />
            <span>Main Sanctuary, K.K. Nagar, Trichy</span>
          </div>
        }
        align="center"
      />

      {/* Main Mass Schedule Grid */}
      <section className="container-sacred">
        <SectionHeading
          eyebrow="Holy Eucharist"
          title="Liturgy Schedule"
          tamilTitle="திருப்பலி அட்டவணை"
          subtitle="All parishioners and pilgrims are warmly invited to partake in the Body and Blood of Christ."
          align="center"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {schedules.map((s) => {
            const Icon = s.icon;
            return (
              <ChurchCard
                key={s.title}
                variant={s.isHighlight ? 'gold-trim' : 'standard'}
                hoverEffect
                className="flex flex-col"
              >
                <div className="p-6 sm:p-8">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-primary dark:bg-gold/15 dark:text-gold-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                    <ParishBadge variant={s.badgeVariant} size="sm">
                      {s.badge}
                    </ParishBadge>
                  </div>

                  {/* Mass list */}
                  <div className="mt-5 space-y-3.5">
                    {s.masses.map((m) => (
                      <div
                        key={m.time}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-border/60 bg-muted/40 p-4 transition-colors hover:border-gold/40 dark:bg-muted/20"
                      >
                        <div>
                          <p className="font-mono text-xl font-bold tracking-tight text-foreground">
                            {m.time}
                          </p>
                          <p className="text-xs font-medium text-muted-foreground mt-0.5">
                            {m.lang}
                          </p>
                        </div>
                        <div>
                          <span className="inline-block rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:border-gold/30 dark:bg-gold/15 dark:text-gold-300">
                            {m.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ChurchCard>
            );
          })}
        </div>
      </section>

      {/* Sacrament of Reconciliation / Confession */}
      <section className="container-sacred max-w-5xl">
        <ChurchCard
          variant="gold-trim"
          className="bg-gradient-to-br from-[#001833] via-[#002852] to-[#001833] p-8 sm:p-10 text-white dark:from-[#080C14] dark:via-[#0D131F] dark:to-[#080C14]"
        >
          <div className="text-center mb-8">
            <ParishBadge variant="solemnity" size="sm" className="mb-2">
              Sacrament of Reconciliation
            </ParishBadge>
            <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Confession Timings · பாவசங்கீர்த்தனம்
            </h3>
            <p className="mt-2 text-sm text-white/80 max-w-lg mx-auto">
              Receive the boundless mercy and healing forgiveness of Christ our Lord in the holy Sacrament of Reconciliation.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {confessions.map((c) => (
              <div
                key={c.day}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] p-5 text-center shadow-lg backdrop-blur-sm"
              >
                <p className="font-heading text-base font-bold text-white">{c.day}</p>
                <div className="my-2 rounded-md border border-gold/40 bg-gold/20 px-3 py-1 text-xs font-semibold text-gold-200">
                  {c.time}
                </div>
                <p className="text-xs text-white/75">{c.details}</p>
              </div>
            ))}
          </div>
        </ChurchCard>
      </section>

      {/* Book Mass Intention CTA */}
      <section className="container-sacred max-w-4xl">
        <ChurchCard variant="burgundy-trim" className="p-8 sm:p-12 text-center bg-card">
          <ChurchCardContent>
            <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary dark:text-primary-300 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Mass Offerings & Intentions</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Book Holy Mass Intentions Online
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Request Holy Mass intentions for Thanksgiving, Soul repose, Birthdays, or Anniversaries directly through our secure Parish Portal.
            </p>
            <div className="mt-8">
              <ChurchButton
                variant="burgundy"
                size="lg"
                href="/login?redirect=/family/requests"
              >
                Submit Mass Intention Request →
              </ChurchButton>
            </div>
          </ChurchCardContent>
        </ChurchCard>
      </section>
    </div>
  );
}

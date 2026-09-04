import type { Metadata } from 'next';
import Link from 'next/link';
import { PARISH } from '@/lib/parish-data';
import { Music, Phone, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { ChurchCard, ChurchCardContent } from '@/components/ui/church-card';
import { ChurchButton } from '@/components/ui/church-button';

export const metadata: Metadata = {
  title: 'Join Parish Choir | Queen of All Saints Church',
  description:
    'Request to join one of our six liturgical choir teams at Queen of All Saints Roman Catholic Church, Trichy.',
};

export default function JoinChoirPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Page Hero */}
      <PageHero
        title="Join Our Parish Choir"
        tamilTitle="பங்கு பாடகர் குழுவில் இணையுங்கள்"
        eyebrow="Voices of Worship · வழிபாட்டு குரல்கள்"
        description="Share your God-given talent of singing and music to animate liturgical worship and Eucharistic hymns across our 6 specialized choir teams."
        backgroundImage="/images/hero/church-altar.webp"
        breadcrumbs={[
          { label: 'Ministries', href: '/ministries' },
          { label: 'Join Choir' },
        ]}
        align="center"
      />

      {/* Choir Teams List */}
      <section className="container-sacred">
        <SectionHeading
          eyebrow="Liturgical Choirs"
          title="Choose Your Choir Team"
          tamilTitle="பாடகர் குழுவை தேர்வு செய்யுங்கள்"
          subtitle="Incharge: Selvan Jeffin Josva S · Parish Office: +91 94432 49671"
          align="center"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PARISH.choirTeams.map((team) => (
            <ChurchCard
              key={team.id}
              variant="gold-trim"
              hoverEffect
              className="flex flex-col justify-between p-6 sm:p-7"
            >
              <div className="space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-primary dark:bg-gold/15 dark:text-gold-300">
                  <Music className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {team.name}
                </h3>
                <p className="font-tamil text-xs font-semibold text-primary/80 dark:text-gold/80">
                  {team.nameTa}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {team.desc}
                </p>

                <div className="space-y-1 rounded-xl border border-border/60 bg-muted/40 p-3 text-xs">
                  <p className="font-semibold text-foreground">
                    Practice: <span className="text-primary dark:text-gold">{team.practiceDay}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Mass: {team.massesServed}
                  </p>
                  <p className="text-muted-foreground">
                    Led by: {team.incharge}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <ChurchButton
                  variant="burgundy"
                  size="md"
                  href={`/choir/${team.id}`}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="w-full"
                >
                  View Details &amp; Apply
                </ChurchButton>
              </div>
            </ChurchCard>
          ))}
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="container-sacred max-w-4xl">
        <ChurchCard
          variant="gold-trim"
          className="bg-gradient-to-br from-[#001833] via-[#002852] to-[#001833] p-8 sm:p-12 text-white text-center dark:from-[#080C14] dark:via-[#0D131F] dark:to-[#080C14]"
        >
          <ChurchCardContent>
            <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              Questions About Joining?
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-white/85 leading-relaxed">
              Contact Choir Incharge Selvan Jeffin Josva S or visit the Parish Office after Sunday Holy Mass.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ChurchButton
                variant="gold"
                size="lg"
                href="tel:+919443249671"
                leftIcon={<Phone className="h-4 w-4" />}
              >
                Call Desk (+91 94432 49671)
              </ChurchButton>
              <ChurchButton
                variant="outline"
                size="lg"
                href="/contact"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Contact Parish Office
              </ChurchButton>
            </div>
          </ChurchCardContent>
        </ChurchCard>
      </section>
    </div>
  );
}

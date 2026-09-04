import type { Metadata } from 'next';
import { Compass, Church, Users, Heart, Award, Clock } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';
import { SectionHeading } from '@/components/ui/section-heading';
import { PriestCard } from '@/components/ui/priest-card';
import { ChurchButton } from '@/components/ui/church-button';
import { ChurchCard, ChurchCardContent } from '@/components/ui/church-card';
import { SafeImage } from '@/components/ui/safe-image';

export const metadata: Metadata = {
  title: 'About Us | Queen of All Saints Parish',
  description:
    'Learn about Queen of All Saints Roman Catholic Church, Trichy — our mission, vision, history, and parish community.',
};

export default function AboutPage() {
  const stats = [
    { label: 'Parish Families', value: '1,200+', icon: <Users className="h-5 w-5 text-gold" /> },
    { label: 'Anbiyam Units', value: '8 Active', icon: <Heart className="h-5 w-5 text-gold" /> },
    { label: 'Ministries & Choirs', value: '12 Organisations', icon: <Award className="h-5 w-5 text-gold" /> },
    { label: 'Years of Grace', value: '100+ Years', icon: <Clock className="h-5 w-5 text-gold" /> },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Unified Cathedral Hero */}
      <PageHero
        title="About Queen of All Saints"
        tamilTitle="அனைத்து புனிதர்களின் அரசி ஆலயம் பற்றி"
        eyebrow="Diocese of Tiruchirappalli · திருச்சி மறைமாவட்டம்"
        description="A vibrant Roman Catholic parish family centered on the Holy Eucharist, Marian devotion, Anbiyam prayer fellowships, and loving Gospel service."
        backgroundImage="/images/hero/church-altar.webp"
        breadcrumbs={[{ label: 'About Us' }]}
        align="center"
      />

      
      {/* Sacred Sanctuary & Campus Visual Showcase */}
      <section className="container-sacred">
        <SectionHeading
          eyebrow="Cathedral Sanctuary"
          title="Our Church & Campus"
          tamilTitle="புனித ஆலயம் மற்றும் வளாகம்"
          subtitle="A sacred house of prayer, Eucharistic devotion, and fellowship since 1977."
          align="center"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              <SafeImage
                src="/images/church/exterior.webp"
                alt="Church Exterior"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-heading text-sm font-bold">Main Church Exterior</p>
                <p className="text-[11px] text-white/80">K.K. Nagar, Tiruchirappalli</p>
              </div>
            </div>
          </div>

          <div className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              <SafeImage
                src="/images/hero/church-altar.webp"
                alt="Solemn Altar"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-heading text-sm font-bold">Solemn Sanctuary Altar</p>
                <p className="text-[11px] text-white/80">Consecrated Eucharistic Sanctuary</p>
              </div>
            </div>
          </div>

          <div className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl sm:col-span-2 lg:col-span-1">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              <SafeImage
                src="/images/gallery/community/community-1.jpg"
                alt="Parish Community"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-heading text-sm font-bold">Parish Family Community</p>
                <p className="text-[11px] text-white/80">Over 1,200 Catholic Households</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-sacred">
        <SectionHeading
          eyebrow="Our Sacred Purpose"
          title="Mission & Vision"
          tamilTitle="எங்கள் பணி மற்றும் பார்வை"
          subtitle="Guided by the Holy Spirit and maternal intercession of Mary, Queen of All Saints, we grow together in holiness and brotherly charity."
          align="center"
        />

        <div className="grid gap-8 md:grid-cols-2">
          <ChurchCard variant="gold-trim" hoverEffect className="p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold-600 dark:bg-gold/20 dark:text-gold-400 mb-5">
              <Compass className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
              Our Mission · எங்கள் பணி
            </h3>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              To glorify God through faithful celebration of the Sacraments, vibrant Anbiyam prayer fellowships, and loving service to the poor, sick, and needy in Trichy.
            </p>
          </ChurchCard>

          <ChurchCard variant="marian-trim" hoverEffect className="p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15 text-secondary dark:bg-secondary/25 dark:text-secondary-300 mb-5">
              <Church className="h-6 w-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
              Our Vision · எங்கள் பார்வை
            </h3>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              A united parish family growing in holiness, empowering youth and families, and using digital innovation for parish communion, transparent stewardship, and pastoral care.
            </p>
          </ChurchCard>
        </div>
      </section>

      {/* Parish Statistics Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#001833] via-[#002852] to-[#001833] py-16 text-white dark:from-[#080C14] dark:via-[#0D131F] dark:to-[#080C14] border-y border-gold/20">
        <div className="container-sacred">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 text-center shadow-lg backdrop-blur-sm"
              >
                <div className="mb-2">{s.icon}</div>
                <p className="font-heading text-2xl font-extrabold text-gold sm:text-3xl md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-white/80">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="container-sacred">
        <SectionHeading
          eyebrow="Spiritual Guidance"
          title="Parish Leadership"
          tamilTitle="பங்கு ஆன்மீக தலைமை"
          subtitle="Our priests shepherd the parish family with pastoral dedication, prayerful guidance, and paternal care."
          align="center"
        />

        <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          <PriestCard
            name="Rev. Fr. Arockiasamy"
            tamilName="அருள்பணி. ஆரோக்கியசாமி"
            role="Parish Priest & Administrator"
            tamilRole="பங்குத்தந்தை"
            image="/images/priest/fr-arokiyaswamy.jpg"
            bio="Leading our parish family with spiritual devotion, pastoral wisdom, and commitment to community empowerment through faith, Eucharistic adoration, and prayer."
            motto="Ad Majorem Dei Gloriam"
          />

          <PriestCard
            name="Rev. Fr. Reddinraj"
            tamilName="அருள்பணி. ரெட்டின்ராஜ்"
            role="Assistant Parish Priest"
            tamilRole="உதவி பங்குத்தந்தை"
            image="/images/priest/fr-reddinraj.jpg"
            bio="Guiding youth movements, catechism education, and liturgical devotions with apostolic passion, spiritual counseling, and active youth engagement."
            motto="Cor Jesu, Salus In Te Sperantium"
          />
        </div>
      </section>

      {/* Call to Action Card */}
      <section className="container-sacred max-w-4xl">
        <ChurchCard variant="gold-trim" className="bg-gradient-to-br from-[#800020]/15 via-card to-[#003366]/15 p-8 sm:p-12 text-center">
          <ChurchCardContent>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold text-primary dark:text-gold-300 mb-3">
              <span>Parish Family Community</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Join Our Parish Family
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed">
              Register your family in our parish portal to request sacraments, join local Anbiyam units, access family records, and receive official parish notices.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ChurchButton
                variant="gold"
                size="lg"
                href="/login?redirect=/family/dashboard"
              >
                Register / Parish Login →
              </ChurchButton>
              <ChurchButton
                variant="outline"
                size="lg"
                href="/contact"
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

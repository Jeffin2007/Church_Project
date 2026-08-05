import type { Metadata } from 'next';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/safe-image';
import { Sparkles, Church, Compass, type LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Queen of All Saints Parish',
  description:
    'Learn about Queen of All Saints Roman Catholic Church, Trichy — our mission, vision, history, and parish community.',
};

export default function AboutPage() {
  const stats = [
    { label: 'Parish Families', value: '1,200+' },
    { label: 'Anbiyam Units', value: '8 Active' },
    { label: 'Ministries & Choirs', value: '12 Organisations' },
    { label: 'Years of Grace', value: '100+ Years' },
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
            <Sparkles className="h-3.5 w-3.5" />
            <span>Diocese of Tiruchirappalli · திருச்சி மறைமாவட்டம்</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About <span className="text-gradient-gold">Queen of All Saints</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            A vibrant Roman Catholic parish family centered on the Holy Eucharist, Marian devotion,
            Anbiyam prayer fellowships, and loving Gospel service.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-sacred mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <CardWithGlow
            icon={Compass}
            title="Our Mission · எங்கள் பணி"
            subtitle="To glorify God through faithful celebration of the Sacraments, vibrant Anbiyam prayer fellowships, and loving service to the poor and needy in Trichy."
          />
          <CardWithGlow
            icon={Church}
            title="Our Vision · எங்கள் பார்வை"
            subtitle="A united parish family growing in holiness, empowering youth and families, and using digital innovation for parish communion and pastoral care."
          />
        </div>
      </section>

      {/* Parish Statistics */}
      <section className="bg-gradient-to-r from-slate-900 via-[hsl(214,75%,15%)] to-slate-900 py-16 text-white">
        <div className="container-sacred mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 text-center shadow-xl backdrop-blur-md"
              >
                <p className="font-display text-gold-300 text-3xl font-black md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-white/80">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="container-sacred mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
            Spiritual Guidance
          </p>
          <h2 className="font-display text-foreground text-3xl font-bold sm:text-4xl">
            Parish Leadership
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="border-border/80 bg-card hover:border-primary/50 overflow-hidden rounded-2xl border-2 p-8 shadow-xl transition-all">
            <div className="flex items-center gap-5">
              <div className="border-gold-400 relative h-20 w-20 overflow-hidden rounded-full border-2">
                <SafeImage
                  src="/images/priest/fr-arokiyaswamy.jpg"
                  alt="Rev. Fr. Arockiasamy"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-foreground text-xl font-bold">
                  Rev. Fr. Arockiasamy
                </h3>
                <p className="text-primary text-sm font-semibold">Parish Priest & Administrator</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Serving Queen of All Saints Church
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              Leading our parish family with spiritual devotion, pastoral wisdom, and commitment to
              community empowerment through faith and prayer.
            </p>
          </div>

          <div className="border-border/80 bg-card hover:border-primary/50 overflow-hidden rounded-2xl border-2 p-8 shadow-xl transition-all">
            <div className="flex items-center gap-5">
              <div className="border-gold-400 relative h-20 w-20 overflow-hidden rounded-full border-2">
                <SafeImage
                  src="/images/priest/fr-reddinraj.jpg"
                  alt="Rev. Fr. Reddinraj"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-foreground text-xl font-bold">
                  Rev. Fr. Reddinraj
                </h3>
                <p className="text-primary text-sm font-semibold">Assistant Parish Priest</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Youth Ministry & Catechism Director
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
              Guiding youth movements, catechism education, and liturgical devotions with passion
              and youth engagement.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-sacred mx-auto max-w-4xl px-4 text-center">
        <div className="border-gold-400/40 rounded-3xl border-2 bg-gradient-to-r from-[hsl(214,75%,15%)] via-[hsl(214,70%,20%)] to-[hsl(214,75%,15%)] p-10 text-white shadow-2xl">
          <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
            Join Our Parish Family
          </h3>
          <p className="mt-2 text-sm text-white/85">
            Register your family in our parish portal to request sacraments, join Anbiyams, and
            receive announcements.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/login?redirect=/family/dashboard"
              className="bg-gold-400 hover:bg-gold-300 inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-extrabold text-slate-950 shadow-xl transition-all hover:scale-105"
            >
              Register / Parish Login →
            </Link>
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

function CardWithGlow({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-border/80 bg-card hover:border-primary/50 rounded-2xl border-2 p-8 shadow-xl transition-all">
      <div className="bg-primary/10 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-foreground text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{subtitle}</p>
    </div>
  );
}

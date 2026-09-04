import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/safe-image';
import { PARISH } from '@/lib/parish-data';
import {
  Music,
  Clock,
  Calendar,
  User,
  Sparkles,
  Heart,
  ChevronLeft,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { buttonClassName } from '@/components/ui/button';

interface Props {
  params: Promise<{ id: string }>;
}

// Comprehensive Choir Detail Database mapped to parish choir teams
const CHOIR_DETAILS: Record<
  string,
  {
    patronSaint: string;
    patronSaintTa: string;
    mission: string;
    missionTa: string;
    description: string;
    practiceTime: string;
    practiceVenue: string;
    massService: string;
    coordinator: string;
    phone: string;
    email: string;
    requirements: string[];
    repertoire: string[];
  }
> = {
  'mother-mary': {
    patronSaint: 'Blessed Virgin Mary, Queen of All Saints',
    patronSaintTa: 'அனைத்து புனிதர்களின் அரசி தூய கன்னி மரியா',
    mission:
      'To glorify God and honor Our Lady through solemn Marian devotions, Latin hymns, and reverent choral worship at Holy Mass.',
    missionTa:
      'மாதாவுக்கு அர்ப்பணிக்கப்பட்ட புனித பாடல்களால் இறைவனை மகிமைப்படுத்தி, திருப்பலியில் பக்தியான வழிபாட்டை நடத்துதல்.',
    description:
      'The Mother Mary Choir Team specializes in traditional and contemporary Marian hymns, solemn liturgical chants, and choral arrangements for the Sunday English Mass and feast day novenas. Formed with a deep devotion to Our Blessed Mother, team members lead the congregation in Eucharistic adoration and sacred music.',
    practiceTime: 'Every Friday Evening · 6:45 PM – 8:00 PM',
    practiceVenue: 'Parish Sacristy & Main Choir Loft',
    massService: 'Sunday 6:15 AM English Mass & Marian Novena Masses',
    coordinator: 'Mrs. Gillus Feeliya',
    phone: '+91 94432 49671',
    email: 'queenofallsaintschurch@gmail.com',
    requirements: [
      'Devotion to Our Lady and the Holy Eucharist',
      'Basic singing ability or passion for choral praise',
      'Commitment to Friday evening rehearsals',
      'Punctual attendance at Sunday 6:15 AM English Mass',
    ],
    repertoire: [
      'Ave Maria (Marian Antiphons)',
      'As I Kneel Before You',
      'Immaculate Mary & Holy Queen Hymns',
      'Eucharistic Adoration Canticles',
    ],
  },
  catechism: {
    patronSaint: 'St. John Bosco & Holy Child Jesus',
    patronSaintTa: 'புனித யோவான் போஸ்கோ & குழந்தை இயேசு',
    mission:
      'Nurturing young voices in Catholic worship, teaching children liturgical music, psalms, and Eucharistic reverence from an early age.',
    missionTa:
      'சிறுவர்களின் குரல்களால் இறைவனை துதித்து, சிறுவயதிலேயே கத்தோலிக்க வழிபாட்டு இசையை கற்றுக்கொடுத்தல்.',
    description:
      'Composed of parish children, Sunday school students, and dedicated catechists, the Catechism Choir Team animates the children’s Liturgy with joyful praise. They lead singing during First Holy Communion, Confirmation, and Sunday Catechism Masses, building a lifelong love for sacred music.',
    practiceTime: 'Every Saturday Morning · 9:30 AM – 10:45 AM',
    practiceVenue: 'Parish Catechism Hall',
    massService: 'Sunday Catechism Mass & Sacrament Celebrations',
    coordinator: 'Catechism Teachers & Selvan Jeffin Josva S',
    phone: '+91 94432 49671',
    email: 'queenofallsaintschurch@gmail.com',
    requirements: [
      'Enrolled in Parish Sunday Catechism (Grades 1 – 10)',
      'Eager to learn hymns in Tamil and English',
      'Regular attendance at Saturday practice sessions',
      'Supportive encouragement from parents',
    ],
    repertoire: [
      'Children Eucharistic Hymns',
      'Sacramental Songs of Praise',
      'Tamil Catechism Melodies',
      'Festival Action Songs & Carols',
    ],
  },
  youth: {
    patronSaint: 'Blessed Carlo Acutis & St. Aloysius Gonzaga',
    patronSaintTa: 'அருளாளர் கர்லோ அகுத்திஸ் & புனித அலோசியஸ் கொன்சாகா',
    mission:
      'Empowering young Catholics to express their faith through vibrant choral harmonies, instrumental excellence, and bold gospel worship.',
    missionTa:
      'இளைஞர்களின் திறமைகளை வழிபாட்டு இசையில் பயன்படுத்தி, நம்பிக்கையில் பலப்படச் செய்தல்.',
    description:
      'The Youth Choir brings energy, musical talent, and deep spiritual commitment to the main Sunday Tamil Mass. Featuring four-part vocal harmonies, keyboard, guitar, and rhythm accompaniments, the team engages young parishioners in active parish leadership and retreat music ministry.',
    practiceTime: 'Every Saturday Evening · 5:00 PM – 6:30 PM',
    practiceVenue: 'Parish Center & Sanctuary Choir Gallery',
    massService: 'Sunday 7:30 AM Tamil Mass & Youth Sunday Celebrations',
    coordinator: 'Selvan Christo & Selvan Jeffin Josva S',
    phone: '+91 94432 49671',
    email: 'queenofallsaintschurch@gmail.com',
    requirements: [
      'Parish Youth (Ages 14 – 30)',
      'Vocalists and instrumentalists (Keyboard, Guitar, Percussion)',
      'Active participation in Parish Youth Movement',
      'Regular attendance at Saturday evening rehearsals',
    ],
    repertoire: [
      'Contemporary Tamil Liturgical Hymns',
      'Youth Convention Worship Songs',
      'Responsorial Psalm Melodies',
      'Offertory & Communion Choral Anthems',
    ],
  },
  'women-association': {
    patronSaint: 'St. Anne & St. Elizabeth',
    patronSaintTa: 'புனித அன்னம்மாள் & புனித எலிசபெத்',
    mission:
      'Uniting the women of the parish in prayerful song, uplifting liturgical celebrations through traditional Tamil hymns and Marian devotions.',
    missionTa: 'பங்குப் பெண்களை பாடல்கள் வழியே ஜெபத்தில் ஒன்றிணைத்து வழிபாட்டை செழுமைப்படுத்துதல்.',
    description:
      'Drawn from the Parish Women’s Association (Magalir Mandram), this choir leads devotional singing for weekday Novenas, First Friday Adoration, Thursday Infant Jesus devotions, and parish feast processions. Their mature, reverent voices enrich every devotional gathering in the sanctuary.',
    practiceTime: 'Every Wednesday Evening · 5:00 PM – 6:00 PM',
    practiceVenue: 'Eucharistic Adoration Chapel',
    massService: 'Sunday 9:30 AM Mass, Thursday Novena & First Friday Adoration',
    coordinator: 'Mrs. Shanti & Mrs. DhanaBakiyam',
    phone: '+91 94432 49671',
    email: 'queenofallsaintschurch@gmail.com',
    requirements: [
      'Member of Parish Women’s Association or female parishioner',
      'Love for traditional Tamil Catholic hymns and Marian Rosary chants',
      'Participation in Wednesday rehearsals',
    ],
    repertoire: [
      'Traditional Tamil Novena Hymns',
      'Sacred Heart Adoration Chants',
      'Infant Jesus Devotional Songs',
      'Feast Chariot Procession Hymns',
    ],
  },
  substation: {
    patronSaint: 'St. Sebastian',
    patronSaintTa: 'புனித செபஸ்தியாரால்',
    mission:
      'Serving the local faithful of the Gandhi Nagar sub-station with reverent worship, traditional hymns, and community participation.',
    missionTa: 'காந்திநகர் கிளைப்பங்கு மக்களின் ஞாயிறு வழிபாட்டை இசையால் வழிநடத்துதல்.',
    description:
      'The Sub-Station Choir animates weekly Sunday Mass at the St. Sebastian Chapel in Gandhi Nagar. Bringing together local families, youth, and elders, this choir fosters close-knit community fellowship and active participation in the liturgy.',
    practiceTime: 'Every Sunday Morning · 8:45 AM – 9:15 AM',
    practiceVenue: 'St. Sebastian Chapel, Gandhi Nagar',
    massService: 'Sunday 9:30 AM Gandhi Nagar Sub-Station Holy Mass',
    coordinator: 'Gandhi Nagar Sub-Station Committee & Parish Priest',
    phone: '+91 94432 49671',
    email: 'queenofallsaintschurch@gmail.com',
    requirements: [
      'Resident of Gandhi Nagar or nearby parish Wards',
      'Willingness to lead Sunday morning sub-station liturgy',
      'Punctual attendance at chapel pre-Mass practice',
    ],
    repertoire: [
      'St. Sebastian Feast Hymns',
      'Popular Tamil Mass Hymnals',
      'Community Offertory Songs',
    ],
  },
  'anglo-indian': {
    patronSaint: 'St. Cecilia (Patroness of Sacred Music)',
    patronSaintTa: 'புனித செசீலியா (இசைப் புனிதர்)',
    mission:
      'Preserving rich choral traditions, classical hymns, and sacred Polyphony to enrich the English liturgical worship of Queen of All Saints Parish.',
    missionTa: 'ஆங்கில வழிபாட்டில் பார பாரம்பரிய புனித இசையை பாதுகாத்து வளர்த்தல்.',
    description:
      'The Anglo Indian Choir is renowned for classical organ accompaniment, Christmas carols, Easter anthems, and multi-part English vocal arrangements. They lead solemn singing at the Sunday 6:15 AM English Mass, Christmas Midnight Mass, and Easter Vigil solemnities.',
    practiceTime: 'Every Saturday Evening · 6:30 PM – 7:30 PM',
    practiceVenue: 'Sanctuary Choir Gallery & Organ Loft',
    massService: 'Sunday 6:15 AM English Mass, Christmas Midnight Mass & Easter Vigil',
    coordinator: 'English Speaking Community & Selvan Jeffin Josva S',
    phone: '+91 94432 49671',
    email: 'queenofallsaintschurch@gmail.com',
    requirements: [
      'Fluency in English vocal singing and choral parts',
      'Passion for classical hymns, carols, and liturgical chants',
      'Commitment to Saturday evening gallery rehearsals',
      'Punctuality for early Sunday 6:15 AM Holy Mass',
    ],
    repertoire: [
      'Classical Organ Hymnals & Latin Chants',
      'Traditional Christmas Carols in 4-Part Harmony',
      'Easter Resurrection Anthems',
      'Sacred Heart & Eucharistic Hymns',
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const team = PARISH.choirTeams.find((t) => t.id === id);

  if (!team) {
    return { title: 'Choir Team | Queen of All Saints Parish' };
  }

  return {
    title: `${team.name} | Queen of All Saints Church`,
    description: `${team.desc} — Learn about practice schedule, patron saint, mission, and how to join ${team.name} at Queen of All Saints Church, Trichy.`,
  };
}

export default async function ChoirTeamPage({ params }: Props) {
  const { id } = await params;
  const team = PARISH.choirTeams.find((t) => t.id === id);

  if (!team) {
    notFound();
  }

  const details = CHOIR_DETAILS[id] ?? {
    patronSaint: 'St. Cecilia',
    patronSaintTa: 'புனித செசீலியா',
    mission: 'Glorifying God through sacred music at Holy Mass.',
    missionTa: 'புனித இசையால் இறைவனை மகிமைப்படுத்துதல்.',
    description: team.desc,
    practiceTime: team.practiceDay,
    practiceVenue: 'Parish Sanctuary',
    massService: team.massesServed,
    coordinator: team.incharge,
    phone: '+91 94432 49671',
    email: 'queenofallsaintschurch@gmail.com',
    requirements: [
      'Active parishioner',
      'Love for liturgical music',
      'Regular attendance at weekly rehearsals',
    ],
    repertoire: ['Liturgical Mass Hymns', 'Novena Prayers in Song'],
  };

  return (
    <div className="space-y-16 pb-20">
      {/* ── Hero Banner with Catholic Marian & Burgundy Styling ── */}
      <section className="relative min-h-[380px] overflow-hidden bg-gradient-to-b from-[#800020]/80 via-[#002244]/90 to-[#080C14] py-20 text-white md:py-24">
        {/* Cover image backdrop overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" aria-hidden="true">
          <SafeImage src={team.image} alt={team.name} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#001833]/60 to-transparent" />

        <div className="container-sacred relative z-10 mx-auto max-w-5xl">
          {/* Back link */}
          <Link
            href="/#ministries"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-200 backdrop-blur-md transition-all hover:bg-gold/25 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4 text-gold" />
            <span>Back to Choir Teams</span>
          </Link>

          <div className="grid items-center gap-8 md:grid-cols-3">
            <div className="space-y-4 md:col-span-2">
              <div className="border border-gold/40 bg-gold/15 text-gold-200 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                <Music className="h-3.5 w-3.5 text-gold" />
                <span>Liturgical Choir Ministry · வழிபாட்டு பாடகர் குழு</span>
              </div>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {team.name}
              </h1>
              <p
                className="text-xl font-bold text-gold-300"
                lang="ta"
                style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
              >
                {team.nameTa}
              </p>
              <p className="text-base leading-relaxed text-white/85">{team.desc}</p>
            </div>

            {/* Quick Info Box with Arch Style */}
            <div className="rounded-2xl border-2 border-gold/40 bg-black/40 p-6 backdrop-blur-md shadow-2xl">
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-2.5">
                  <User className="h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <span className="text-xs text-white/60">Choir Coordinator:</span>
                    <p className="font-bold text-white">{team.incharge}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <span className="text-xs text-white/60">Practice Schedule:</span>
                    <p className="font-bold text-white">{team.practiceDay}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Calendar className="h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <span className="text-xs text-white/60">Service at Mass:</span>
                    <p className="font-bold text-gold-300">{team.massesServed}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <section className="container-sacred mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left 2 Cols: Details */}
          <div className="space-y-10 lg:col-span-2">
            {/* Mission & Vision */}
            <div className="border border-gold/30 bg-card rounded-2xl p-8 shadow-md">
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold dark:bg-gold/15 dark:text-gold-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Mission &amp; Purpose
                  </h2>
                  <p
                    className="text-primary text-xs font-semibold dark:text-gold"
                    lang="ta"
                    style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                  >
                    எங்கள் நோக்கம்
                  </p>
                </div>
              </div>
              <p className="text-base font-medium leading-relaxed text-foreground/90">
                {details.mission}
              </p>
              <p
                className="mt-2 text-sm leading-relaxed text-muted-foreground"
                lang="ta"
                style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
              >
                {details.missionTa}
              </p>
            </div>

            {/* Ministry Overview */}
            <div className="border border-border/80 bg-card space-y-4 rounded-2xl p-8 shadow-md">
              <h3 className="font-display text-2xl font-bold text-foreground">
                About the Ministry
              </h3>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground md:text-base">
                {details.description}
              </p>

              {/* Patron Saint */}
              <div className="border border-gold/40 bg-gold/10 mt-6 rounded-xl p-5 dark:bg-gold/15">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-gold shrink-0" />
                  <div>
                    <p className="text-primary text-xs font-bold uppercase tracking-wider dark:text-gold-300">
                      Patron Saint
                    </p>
                    <p className="font-display text-lg font-extrabold text-foreground">
                      {details.patronSaint}
                    </p>
                    <p
                      className="text-xs font-medium text-muted-foreground"
                      lang="ta"
                      style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}
                    >
                      {details.patronSaintTa}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Practice & Mass Service Details */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border border-border/80 bg-card rounded-2xl p-6 shadow-sm">
                <div className="bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold-300 mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl">
                  <Clock className="h-5 w-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-foreground">
                  Weekly Practice Schedule
                </h4>
                <p className="text-primary dark:text-gold mt-2 text-sm font-bold">{details.practiceTime}</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  Venue: {details.practiceVenue}
                </p>
              </div>

              <div className="border border-border/80 bg-card rounded-2xl p-6 shadow-sm">
                <div className="bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary-300 mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl">
                  <Calendar className="h-5 w-5" />
                </div>
                <h4 className="font-display text-lg font-bold text-foreground">
                  Liturgical Service
                </h4>
                <p className="text-secondary dark:text-secondary-300 mt-2 text-sm font-bold">{details.massService}</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">
                  Queen of All Saints Sanctuary
                </p>
              </div>
            </div>

            {/* Repertoire Highlights */}
            <div className="border border-border/80 bg-card rounded-2xl p-8 shadow-sm">
              <h3 className="font-display mb-4 text-xl font-bold text-foreground">
                Repertoire &amp; Sacred Music
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {details.repertoire.map((item) => (
                  <div
                    key={item}
                    className="border border-border/60 bg-muted/40 flex items-center gap-3 rounded-xl p-3.5 text-xs font-bold text-foreground"
                  >
                    <Music className="text-gold h-4 w-4 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Join & Contact Card */}
          <div className="space-y-8">
            {/* Join Choir Card */}
            <div className="border-2 border-gold/40 rounded-3xl bg-card p-8 shadow-xl">
              <div className="text-primary dark:text-gold bg-gold/15 mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-2xl font-extrabold text-foreground">
                How to Join
              </h3>
              <p className="mt-2 text-xs font-medium leading-relaxed text-muted-foreground">
                We welcome dedicated singers and musicians of our parish family.
              </p>

              <div className="my-6 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Requirements:
                </p>
                {details.requirements.map((req) => (
                  <div
                    key={req}
                    className="flex items-start gap-2.5 text-xs font-medium text-muted-foreground"
                  >
                    <CheckCircle2 className="text-gold h-4 w-4 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/join/choir"
                className="w-full inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-gold"
              >
                Request to Join {team.name}
              </Link>
            </div>

            {/* Coordinator Contact Card */}
            <div className="border border-border/80 bg-card rounded-3xl p-8 shadow-md">
              <h3 className="font-heading text-xl font-bold text-foreground">
                Coordinator Contact
              </h3>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                Reach out for practice inquiries or vocal auditions.
              </p>

              <div className="mt-6 space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold-300 flex h-9 w-9 items-center justify-center rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground">
                      Leader
                    </p>
                    <p className="font-bold text-foreground">{team.incharge}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold-300 flex h-9 w-9 items-center justify-center rounded-full">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground">
                      Phone
                    </p>
                    <a
                      href={`tel:${details.phone}`}
                      className="text-primary font-bold hover:underline"
                    >
                      {details.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex h-9 w-9 items-center justify-center rounded-full">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-600 dark:text-slate-400">
                      Email
                    </p>
                    <a
                      href={`mailto:${details.email}`}
                      className="text-primary font-bold hover:underline"
                    >
                      {details.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

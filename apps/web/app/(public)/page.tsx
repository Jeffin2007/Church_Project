import type { Metadata } from 'next';
import { LiturgicalSeasonProvider } from '@/context/liturgical-season-context';
import {
  HeroSection,
  WelcomeSection,
  TodaysMassCard,
  ParishStats,
  FeastCountdown,
  MassTimingsSection,
  ParishPriestSection,
  HistoryTimeline,
  AnbiyamSection,
  MinistriesSection,
  ChoirTeamsSection,
  FeastSection,
  DigitalServicesSection,
  GallerySection,
  ParishInvitation,
} from '@/components/home';

export const metadata: Metadata = {
  title: 'Queen of All Saints — Parish Portal',
  description:
    'Queen of All Saints Roman Catholic Church — Parish Management System. Serving our community with faith and love.',
};

export default function PublicHomePage() {
  return (
    <LiturgicalSeasonProvider>
      <div className="min-h-screen" style={{ backgroundColor: 'hsl(var(--ivory))' }}>
        <main id="main-content" className="relative">
          {/* Hero */}
          <HeroSection />

          {/* Welcome */}
          <div className="relative">
            <WelcomeSection />
            <div className="divider-sacred mx-auto max-w-4xl" />
          </div>

          {/* Today's Mass + Liturgical Integrated */}
          <div className="relative">
            <TodaysMassCard />
          </div>

          {/* Parish Stats */}
          <div className="relative">
            <ParishStats />
          </div>

          {/* Feast Countdown (only shows when appropriate) */}
          <FeastCountdown />

          {/* Mass Schedule */}
          <div className="relative">
            <MassTimingsSection />
            <div className="divider-sacred mx-auto max-w-4xl" />
          </div>

          {/* Parish Priest */}
          <ParishPriestSection />

          {/* History */}
          <HistoryTimeline />

          {/* Anbiyams */}
          <AnbiyamSection />

          {/* Ministries */}
          <MinistriesSection />

          {/* Choir Teams */}
          <ChoirTeamsSection />

          {/* Feast Section */}
          <FeastSection />

          {/* Digital Services */}
          <DigitalServicesSection />

          {/* Gallery */}
          <GallerySection />

          {/* Invitation */}
          <ParishInvitation />
        </main>
      </div>
    </LiturgicalSeasonProvider>
  );
}

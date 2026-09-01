import type { Metadata } from 'next';
import { LiturgicalSeasonProvider } from '@/context/liturgical-season-context';
import { HomepageAnnouncementSection } from '@/components/announcements/homepage-announcement-section';
import {
  HeroSection,
  WelcomeSection,
  TodaysMassCard,
  DailyMassReadingsSection,
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
      <div className="min-h-screen bg-background text-foreground">
        <main id="main-content" className="relative">
          {/* Hero */}
          <HeroSection />

          {/* Welcome */}
          <div className="relative">
            <WelcomeSection />
            <div className="divider-sacred mx-auto max-w-4xl" />
          </div>

          {/* Today's Mass + Liturgical Highlight */}
          <div className="relative">
            <TodaysMassCard />
          </div>

          {/* PHASE 1, 2, 10 — Daily Catholic Mass Readings (English + Tamil) & Spiritual Reflection */}
          <DailyMassReadingsSection />

          {/* Parish Announcements */}
          <div className="container-sacred mx-auto max-w-6xl px-4 py-12">
            <HomepageAnnouncementSection />
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

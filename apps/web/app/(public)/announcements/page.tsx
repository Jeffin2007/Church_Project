import type { Metadata } from 'next';
import { HomepageAnnouncementSection } from '@/components/announcements/homepage-announcement-section';
import { Megaphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Parish Announcements | Queen of All Saints Parish',
  description:
    'Official news, feast announcements, mass timing updates, novena notices, and pastoral communications from Queen of All Saints Catholic Church.',
};

export default function PublicAnnouncementsPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(214,75%,12%)] via-[hsl(214,70%,18%)] to-[hsl(214,65%,22%)] py-20 text-white md:py-24">
        <div className="container-sacred relative z-10 mx-auto max-w-5xl text-center">
          <div className="border-gold-400/40 bg-gold-500/20 text-gold-300 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
            <Megaphone className="h-3.5 w-3.5" />
            <span>Official Communications · பங்கு அறிவிப்புகள்</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Parish Announcements & <span className="text-gradient-gold">News</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            Stay informed with daily mass schedules, novenas, feast celebrations, catechism updates,
            and emergency pastoral notices.
          </p>
        </div>
      </section>

      {/* Main Content Feed */}
      <section className="container-sacred mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <HomepageAnnouncementSection />
      </section>
    </div>
  );
}

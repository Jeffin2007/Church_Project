import type { Metadata } from 'next';
import { DeveloperHero } from '@/components/developer/developer-hero';
import { DeveloperAbout } from '@/components/developer/developer-about';
import { DeveloperAcknowledgements } from '@/components/developer/developer-acknowledgements';
import { DeveloperContact } from '@/components/developer/developer-contact';

export const metadata: Metadata = {
  title: 'Lead Developer — Jeffin Josva S | Queen of All Saints Parish',
  description:
    'Jeffin Josva S — Founder and Lead Architect & Developer of the Queen of All Saints Digital Parish Platform.',
};

export default function DeveloperPage() {
  return (
    <div className="bg-background min-h-screen">
      <main id="main-content" aria-label="Developer acknowledgement page">
        <DeveloperHero />
        <DeveloperAbout />
        <DeveloperAcknowledgements />
        <DeveloperContact />
      </main>
    </div>
  );
}

import type { Metadata } from 'next';
import {
  PlatformHeroSection,
  WhyPlatformSection,
  FamilyBenefitsSection,
  PrivacySection,
  RequestWorkflowSection,
  PaymentWorkflowSection,
  TechnicalSupportSection,
  PlatformClosingSection,
} from '@/components/about-platform';

export const metadata: Metadata = {
  title: 'About This Platform | Queen of All Saints Church',
  description:
    'Learn how the Queen of All Saints Digital Parish Platform helps families, protects your privacy, and simplifies parish services.',
};

export default function AboutPlatformPage() {
  return (
    <div className="bg-background min-h-screen">
      <main id="main-content" aria-label="About the Digital Parish Platform">
        <PlatformHeroSection />
        <WhyPlatformSection />
        <FamilyBenefitsSection />
        <PrivacySection />
        <RequestWorkflowSection />
        <PaymentWorkflowSection />
        <TechnicalSupportSection />
        <PlatformClosingSection />
      </main>
    </div>
  );
}

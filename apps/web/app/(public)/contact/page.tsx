import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Building, Church } from 'lucide-react';
import { ContactForm } from '@/components/contact/contact-form';
import { PageHero } from '@/components/ui/page-hero';
import { ChurchCard } from '@/components/ui/church-card';

export const metadata: Metadata = {
  title: 'Contact Us | Queen of All Saints Parish',
  description:
    'Reach out to Queen of All Saints Church, Trichy — Parish Office address, phone numbers, office hours, and contact form.',
};

export default function ContactPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Page Hero */}
      <PageHero
        title="Contact Parish Office"
        tamilTitle="பங்கு அலுவலக தொடர்பு"
        eyebrow="Pastoral Office · பங்கு நிர்வாகம்"
        description="We are here to serve and support you. Reach out to our parish priest and pastoral staff for inquiries, prayer intentions, and sacrament records."
        backgroundImage="/images/hero/church-altar.webp"
        breadcrumbs={[{ label: 'Contact Office' }]}
        align="center"
      />

      {/* Main Grid: Office Details & Inquiry Form */}
      <section className="container-sacred">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Office Details */}
          <div className="space-y-6">
            <ChurchCard variant="gold-trim" hoverEffect={false} className="p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3 border-b border-border/60 pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-primary dark:bg-gold/15 dark:text-gold-300">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    Parish Office Details
                  </h3>
                  <p className="text-xs text-muted-foreground">Main Sanctuary Complex</p>
                </div>
              </div>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">Parish Address</p>
                    <p className="mt-0.5 text-muted-foreground leading-relaxed">
                      Queen of All Saints Roman Catholic Church
                      <br />
                      Main Sanctuary Road, K.K. Nagar
                      <br />
                      Tiruchirappalli, Tamil Nadu – 620021
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-border/50 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold-300">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">Phone Contacts</p>
                    <p className="mt-0.5 text-muted-foreground">
                      +91 431 2400000 (Office Desk)
                    </p>
                    <p className="text-muted-foreground">
                      +91 431 2400001 (Emergency Pastoral Line)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-border/50 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold-300">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">Email Contacts</p>
                    <p className="mt-0.5 text-muted-foreground">
                      office@queenofallsaints.in
                    </p>
                    <p className="text-muted-foreground">admin@queenofallsaints.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-border/50 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-gold/15 dark:text-gold-300">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">Working Hours</p>
                    <p className="mt-0.5 font-semibold text-primary dark:text-gold">
                      Sunday – Saturday (All 7 Days)
                    </p>
                    <p className="text-muted-foreground">Morning: 9:00 AM – 1:00 PM</p>
                    <p className="text-muted-foreground">Evening: 5:00 PM – 8:30 PM</p>
                  </div>
                </div>
              </div>
            </ChurchCard>

            <ChurchCard
              variant="marian-trim"
              hoverEffect={false}
              className="bg-gradient-to-r from-[#001833] via-[#002852] to-[#001833] p-6 text-white dark:from-[#080C14] dark:via-[#0D131F] dark:to-[#080C14]"
            >
              <div className="flex items-center gap-4">
                <Church className="h-8 w-8 shrink-0 text-gold" />
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">
                    Parish Pastoral Care
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-white/80 leading-relaxed">
                    For sick visits, Viaticum / Anointing of the Sick, or spiritual counseling, the parish priests are available around the clock.
                  </p>
                </div>
              </div>
            </ChurchCard>
          </div>

          {/* Interactive Inquiry Form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, Building, Church } from 'lucide-react';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us | Queen of All Saints Parish',
  description:
    'Reach out to Queen of All Saints Church, Trichy — Parish Office address, phone numbers, office hours, and contact form.',
};

export default function ContactPage() {
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
            <Mail className="h-3.5 w-3.5" />
            <span>Parish Office · பங்கு அலுவலகம்</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Contact <span className="text-gradient-gold">Parish Office</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            We are here to serve you. Reach out to our parish priest and office staff for inquiries,
            pastoral care, and sacrament assistance.
          </p>
        </div>
      </section>

      {/* Main Grid: Office Details & Inquiry Form */}
      <section className="container-sacred mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Office Details */}
          <div className="space-y-6">
            <div className="border-border/80 bg-card rounded-2xl border-2 p-8 shadow-xl">
              <h3 className="font-display text-foreground mb-6 flex items-center gap-3 text-2xl font-black dark:text-white">
                <Building className="text-primary h-6 w-6" />
                <span>Parish Office Details</span>
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-foreground font-black dark:text-white">Parish Address</p>
                    <p className="text-muted-foreground mt-0.5 font-bold leading-relaxed">
                      Queen of All Saints Roman Catholic Church
                      <br />
                      Main Sanctuary Road, K.K. Nagar
                      <br />
                      Tiruchirappalli, Tamil Nadu – 620021
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t pt-4">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-foreground font-black dark:text-white">Phone Numbers</p>
                    <p className="text-muted-foreground mt-0.5 font-bold">
                      +91 431 2400000 (Office Desk)
                    </p>
                    <p className="text-muted-foreground font-bold">
                      +91 431 2400001 (Emergency Pastoral Line)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t pt-4">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-foreground font-black dark:text-white">Email Contacts</p>
                    <p className="text-muted-foreground mt-0.5 font-bold">
                      office@queenofallsaints.in
                    </p>
                    <p className="text-muted-foreground font-bold">admin@queenofallsaints.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t pt-4">
                  <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-foreground font-black dark:text-white">
                      Parish Office Working Hours
                    </p>
                    <p className="text-primary mt-0.5 font-extrabold">
                      Sunday – Saturday (All 7 Days)
                    </p>
                    <p className="text-muted-foreground font-bold">Morning: 9:00 AM – 1:00 PM</p>
                    <p className="text-muted-foreground font-bold">Evening: 5:00 PM – 8:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-gold-400/40 rounded-2xl border-2 bg-gradient-to-r from-slate-900 via-[hsl(214,75%,15%)] to-slate-900 p-6 text-white shadow-xl">
              <div className="flex items-center gap-4">
                <Church className="text-gold-400 h-8 w-8 shrink-0" />
                <div>
                  <h4 className="font-display text-lg font-bold text-white">
                    Parish Pastoral Office
                  </h4>
                  <p className="text-xs text-white/80">
                    For all sacrament inquiries, Mass offerings, and pastoral counseling,
                    parishioners are warmly welcome to visit the parish office during open hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

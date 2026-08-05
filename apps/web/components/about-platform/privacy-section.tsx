'use client';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Card } from '@/components/ui/card';
import { Shield, Lock, UserCheck, Eye, FileSearch, CreditCard, CheckCircle2 } from 'lucide-react';

const COMMITMENTS = [
  {
    icon: Lock,
    title: 'Personal Information is Protected',
    desc: 'All your family information — names, contact details, and sacramental records — is stored in a private, secured database. It is never shared with outside organisations.',
  },
  {
    icon: UserCheck,
    title: 'Only Authorised Staff Can Access Records',
    desc: 'Only the Parish Priest, Parish Office staff, and authorised coordinators have access to parish records. Every person has a specific role with specific permissions.',
  },
  {
    icon: Eye,
    title: 'Role-Based Permissions',
    desc: 'A catechism coordinator can only see catechism records. A finance member can only see financial records. No staff member can access information outside their role.',
  },
  {
    icon: Shield,
    title: 'Secure Authentication',
    desc: 'Every staff login is protected with strong passwords and secure tokens. Unauthorised access is blocked automatically.',
  },
  {
    icon: FileSearch,
    title: 'Audit Logging',
    desc: 'Every action in the system — who accessed a record, who changed a field, and when — is recorded permanently. This ensures complete accountability.',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment Processing',
    desc: 'All online contributions are processed through a certified payment gateway. Your payment card details are never stored on parish servers.',
  },
  {
    icon: CheckCircle2,
    title: 'Parish-Approved Administration',
    desc: 'The entire platform is operated and maintained under the direct oversight of the Parish Priest. Nothing is done without parish authorisation.',
  },
];

export function PrivacySection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-sacred">
        <ScrollReveal animation="fade-in-up">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="border-primary/30 bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-lg">
                <Shield className="text-primary h-10 w-10" aria-hidden="true" />
              </div>
            </div>
            <p className="text-primary mb-4 text-sm font-semibold uppercase tracking-[0.2em]">
              Our Promise to You
            </p>
            <h2 className="font-display text-foreground mb-4 text-4xl font-bold md:text-5xl">
              Privacy <span className="text-gradient-primary">Commitment</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Your family's information is treated with the same confidentiality as a confessional
              seal. Here is exactly how we protect it.
            </p>
          </div>
        </ScrollReveal>
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {COMMITMENTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <ScrollReveal key={c.title} animation="fade-in-up" delay={i * 60} threshold={0.07}>
                <Card className="border-primary/10 hover:border-primary group h-full border-2 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <div className="bg-primary/10 group-hover:bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all group-hover:scale-110">
                    <Icon
                      className="text-primary h-6 w-6 transition-colors group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-display text-foreground mb-3 text-base font-bold leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
        <ScrollReveal animation="fade-in-up" delay={300}>
          <p className="text-muted-foreground mx-auto mt-10 max-w-2xl text-center text-sm italic">
            "Your personal information is your family's property. This platform exists to serve you
            — not to collect, sell, or misuse your data."
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { ChurchButton } from '@/components/ui/church-button';
import { ChurchCard } from '@/components/ui/church-card';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <ChurchCard variant="gold-trim" className="p-8 text-center sm:p-10 space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold-600 dark:bg-gold/20 dark:text-gold-300">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Message Sent Successfully!
        </h3>
        <p className="mx-auto max-w-md text-sm text-muted-foreground leading-relaxed">
          Thank you for reaching out to Queen of All Saints Parish Office. Our pastoral office staff will review your inquiry and respond shortly.
        </p>
        <div className="pt-2">
          <ChurchButton
            variant="outline"
            size="md"
            onClick={() => setSubmitted(false)}
          >
            Send Another Message
          </ChurchButton>
        </div>
      </ChurchCard>
    );
  }

  return (
    <ChurchCard variant="standard" hoverEffect={false} className="p-6 sm:p-8">
      <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
        Send an Inquiry
      </h3>
      <p className="mt-1 text-xs text-muted-foreground font-medium">
        Fill out the form below to send a message directly to the parish office desk.
      </p>

      <form className="mt-6 space-y-4 text-sm" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-foreground">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="John Peter"
            className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-foreground">
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-foreground">
            Contact Phone Number
          </label>
          <input
            type="tel"
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-foreground">
            Subject / Category *
          </label>
          <select className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground outline-none focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all">
            <option>General Inquiry</option>
            <option>Mass Intentions</option>
            <option>Anbiyam Information</option>
            <option>Sacraments &amp; Certificates</option>
            <option>Pastoral Care</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-foreground">
            Message *
          </label>
          <textarea
            rows={4}
            required
            placeholder="Write your message here..."
            className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all resize-y"
          />
        </div>

        <div className="pt-2">
          <ChurchButton
            type="submit"
            variant="burgundy"
            size="lg"
            rightIcon={<Send className="h-4 w-4" />}
            className="w-full"
          >
            Send Message to Office
          </ChurchButton>
        </div>
      </form>
    </ChurchCard>
  );
}

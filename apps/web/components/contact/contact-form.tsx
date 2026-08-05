'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border-gold-400/40 bg-card space-y-4 rounded-2xl border-2 p-8 text-center shadow-xl">
        <div className="bg-gold-500/20 text-gold-500 mx-auto flex h-14 w-14 items-center justify-center rounded-full">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="font-display text-foreground text-2xl font-bold">
          Message Sent Successfully!
        </h3>
        <p className="text-muted-foreground mx-auto max-w-md text-sm leading-relaxed">
          Thank you for reaching out to Queen of All Saints Parish Office. Our office staff will
          review your inquiry and respond shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-xs font-bold shadow"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="border-border/80 bg-card rounded-2xl border-2 p-8 shadow-xl">
      <h3 className="font-display text-foreground mb-2 text-2xl font-bold">Send an Inquiry</h3>
      <p className="text-muted-foreground mb-6 text-xs">
        Fill out the form below to send a message directly to the parish office desk.
      </p>

      <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-semibold">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="John Peter"
            className="bg-background focus:ring-primary w-full rounded-xl border p-3 outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-semibold">
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="john@example.com"
            className="bg-background focus:ring-primary w-full rounded-xl border p-3 outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-semibold">
            Contact Phone Number
          </label>
          <input
            type="tel"
            placeholder="+91 9876543210"
            className="bg-background focus:ring-primary w-full rounded-xl border p-3 outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-semibold">
            Subject / Category *
          </label>
          <select className="bg-background focus:ring-primary w-full rounded-xl border p-3 outline-none focus:ring-2">
            <option>General Inquiry</option>
            <option>Mass Intentions</option>
            <option>Anbiyam Information</option>
            <option>Sacraments &amp; Certificates</option>
            <option>Pastoral Care</option>
          </select>
        </div>

        <div>
          <label className="text-muted-foreground mb-1 block text-xs font-semibold">
            Message *
          </label>
          <textarea
            rows={4}
            required
            placeholder="Write your message here..."
            className="bg-background focus:ring-primary w-full rounded-xl border p-3 outline-none focus:ring-2"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold shadow-xl transition-all hover:scale-[1.01]"
        >
          <Send className="h-4 w-4" />
          <span>Send Message to Office</span>
        </button>
      </form>
    </div>
  );
}

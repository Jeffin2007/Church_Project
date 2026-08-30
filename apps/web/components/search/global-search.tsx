'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Church, Users, CreditCard, Calendar, Heart } from 'lucide-react';
import { useFamily } from '@/context/family-context';

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { family, members, massIntentions, homeCommunionVisits, events, payments } = useFamily();

  const searchResults =
    query.trim().length > 1
      ? [
          ...members
            .filter(
              (m) =>
                m.name.toLowerCase().includes(query.toLowerCase()) ||
                m.relation.toLowerCase().includes(query.toLowerCase()),
            )
            .map((m) => ({
              type: 'Member',
              title: `${m.name} (${m.relation})`,
              subtitle: `Family: ${family.name} · DOB: ${m.dob}`,
              href: '/family/members',
              icon: Users,
            })),
          ...massIntentions
            .filter(
              (mi) =>
                mi.personName.toLowerCase().includes(query.toLowerCase()) ||
                mi.title.toLowerCase().includes(query.toLowerCase()),
            )
            .map((mi) => ({
              type: 'Mass Intention',
              title: `${mi.requestType} — ${mi.personName}`,
              subtitle: `Date: ${mi.preferredDate} · Offering: ₹${mi.offeringAmount}`,
              href: '/family/mass-intentions',
              icon: Church,
            })),
          ...homeCommunionVisits
            .filter(
              (hc) =>
                hc.patientName.toLowerCase().includes(query.toLowerCase()) ||
                hc.reason.toLowerCase().includes(query.toLowerCase()),
            )
            .map((hc) => ({
              type: 'Home Communion',
              title: `Communion Visit: ${hc.patientName}`,
              subtitle: `Reason: ${hc.reason} · Date: ${hc.preferredDate}`,
              href: '/family/home-communion',
              icon: Heart,
            })),
          ...payments
            .filter(
              (p) =>
                p.category.toLowerCase().includes(query.toLowerCase()) ||
                p.description.toLowerCase().includes(query.toLowerCase()),
            )
            .map((p) => ({
              type: 'Payment',
              title: `${p.category} — ₹${p.amount}`,
              subtitle: `Receipt: ${p.receiptNumber} · Date: ${p.date}`,
              href: '/family/payments',
              icon: CreditCard,
            })),
          ...events
            .filter(
              (e) =>
                e.title.toLowerCase().includes(query.toLowerCase()) ||
                e.category.toLowerCase().includes(query.toLowerCase()),
            )
            .map((e) => ({
              type: 'Event',
              title: e.title,
              subtitle: `Venue: ${e.venue} · Date: ${e.date}`,
              href: '/family/events',
              icon: Calendar,
            })),
        ]
      : [];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-muted/40 border-border/80 text-muted-foreground hover:text-foreground hover:border-gold-400/60 inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-bold transition-all"
      >
        <Search className="text-gold-300 h-4 w-4" />
        <span className="hidden sm:inline">Search Parish Register & Services...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
      </button>

      {isOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 p-4 pt-20 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground w-full max-w-2xl space-y-4 overflow-hidden rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-center gap-3 border-b pb-4">
              <Search className="text-gold-300 h-5 w-5" />
              <input
                type="text"
                autoFocus
                placeholder="Type to search families, members, mass intentions, payments, events..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm font-bold outline-none"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground text-xs font-bold"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] space-y-2 overflow-y-auto">
              {query.trim().length <= 1 ? (
                <p className="text-muted-foreground py-8 text-center text-xs italic">
                  Search across Families, Members, Offertory Payments, Events, and Mass
                  Intentions...
                </p>
              ) : searchResults.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center text-xs italic">
                  No matching records found for "{query}".
                </p>
              ) : (
                searchResults.map((res, i) => {
                  const Icon = res.icon;
                  return (
                    <Link
                      key={i}
                      href={res.href}
                      onClick={() => setIsOpen(false)}
                      className="border-border/60 hover:border-gold-400 hover:bg-muted/40 flex items-center gap-3 rounded-2xl border p-3 transition-all"
                    >
                      <div className="bg-muted text-primary rounded-xl p-2.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-gold-300 block text-[10px] font-extrabold uppercase">
                          {res.type}
                        </span>
                        <h4 className="text-foreground truncate text-xs font-bold">{res.title}</h4>
                        <p className="text-muted-foreground truncate text-[11px]">{res.subtitle}</p>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

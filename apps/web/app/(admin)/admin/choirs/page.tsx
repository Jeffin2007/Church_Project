'use client';

import { Music, Plus, Mic } from 'lucide-react';

export default function AdminChoirsPage() {
  const choirs = [
    {
      title: 'St. Cecilia English Choir',
      coordinator: 'Sr. Theresa',
      members: 24,
      practice: 'Saturdays 5:00 PM',
      mass: 'Sunday 8:30 AM Mass',
    },
    {
      title: 'St. Jude Tamil Main Choir',
      coordinator: 'Bro. Arokiaraj',
      members: 36,
      practice: 'Fridays 6:00 PM',
      mass: 'Sunday 6:30 AM Mass',
    },
    {
      title: 'Youth Vocal & Instrumental Ensemble',
      coordinator: 'Jeffin (Youth)',
      members: 18,
      practice: 'Sundays 10:00 AM',
      mass: 'Youth Mass',
    },
    {
      title: 'Children’s Angelic Choir',
      coordinator: 'Mrs. Mary Stella',
      members: 20,
      practice: 'Saturdays 4:00 PM',
      mass: 'First Sunday Mass',
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Music className="h-4 w-4" /> Sacred Music Ministry
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Parish Choirs & Sacred Music Teams
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Manage liturgical choir groups, songbooks, choir practice schedules, and leader
            allocations.
          </p>
        </div>

        <button
          type="button"
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Form New Choir Group</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {choirs.map((ch) => (
          <div
            key={ch.title}
            className="border-border/80 bg-card hover:border-primary/50 space-y-4 rounded-2xl border p-6 shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold">
                  <Mic className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-foreground text-lg font-bold">{ch.title}</h3>
                  <p className="text-muted-foreground text-xs font-medium">
                    Leader: {ch.coordinator}
                  </p>
                </div>
              </div>
              <span className="bg-gold-500/20 text-gold-300 border-gold-400/40 rounded-full border px-3 py-1 text-xs font-bold">
                {ch.members} Members
              </span>
            </div>

            <div className="border-border/40 text-muted-foreground space-y-1 border-t pt-3 text-xs font-semibold">
              <p>📅 Practice: {ch.practice}</p>
              <p>⛪ Liturgy: {ch.mass}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

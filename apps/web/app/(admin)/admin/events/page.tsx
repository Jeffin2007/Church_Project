'use client';

import { CalendarDays, Plus, MapPin, Clock } from 'lucide-react';

export default function AdminEventsPage() {
  const events = [
    {
      title: 'Feast of Queen of All Saints - Flag Hoisting',
      date: 'Fri, Oct 24, 2026',
      time: '06:00 PM',
      location: 'Main Church Flagpole',
      category: 'FEAST',
    },
    {
      title: 'Youth Movement Annual Spiritual Retreat',
      date: 'Sun, Nov 08, 2026',
      time: '09:00 AM',
      location: 'St. Joseph Pastoral Hall',
      category: 'YOUTH',
    },
    {
      title: 'Christmas Carols Practice & Rehearsals',
      date: 'Sat, Dec 12, 2026',
      time: '05:00 PM',
      location: 'Choir Room',
      category: 'CHOIR',
    },
    {
      title: 'Parish Pastoral Council Quarterly Meeting',
      date: 'Sun, Dec 20, 2026',
      time: '11:30 AM',
      location: 'Meeting Room 1',
      category: 'MEETING',
    },
  ];

  return (
    <div className="animate-in fade-in space-y-8">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <CalendarDays className="h-4 w-4" /> Liturgical Calendar & Events
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Parish Events & Feast Calendar
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Schedule liturgical celebrations, feast days, novenas, youth retreats, and council
            meetings.
          </p>
        </div>

        <button
          type="button"
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Add Parish Event</span>
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {events.map((ev) => (
          <div
            key={ev.title}
            className="border-border/80 bg-card hover:border-primary/50 flex flex-col justify-between rounded-2xl border p-6 shadow-xl transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-gold-500/20 text-gold-300 border-gold-400/30 rounded-md border px-2.5 py-1 text-[10px] font-black uppercase">
                  {ev.category}
                </span>
                <span className="text-primary text-xs font-bold">{ev.date}</span>
              </div>
              <h3 className="font-heading text-foreground text-lg font-bold">{ev.title}</h3>
              <div className="text-muted-foreground flex flex-wrap gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {ev.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {ev.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

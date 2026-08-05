'use client';

import { useState } from 'react';
import { Pin, ChevronRight, AlertTriangle, X } from 'lucide-react';

export interface PublicAnnouncement {
  id: string;
  title: string;
  titleTa?: string;
  summary: string;
  content: string;
  category: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT' | 'EMERGENCY';
  publishDate: string;
  isPinned: boolean;
  authorName: string;
}

const PUBLIC_ANNOUNCEMENTS: PublicAnnouncement[] = [
  {
    id: 'pa-1',
    title: 'Parish Annual Feast Novena & Flag Hoisting',
    titleTa: 'பங்குப் பெருவிழா கொடியேற்றம் மற்றும் நவநாள் திருப்பலி',
    summary:
      'Join us for solemn flag hoisting on Friday at 6:00 PM followed by evening Novena Mass.',
    content:
      'The Annual Feast of Queen of All Saints Parish begins on Friday with Flag Hoisting by Most Rev. Bishop. Novena prayers will be conducted daily at 6:30 PM with special homilies by invited preachers. Car Procession will be held on the final feast day.',
    category: 'FEAST',
    priority: 'HIGH',
    publishDate: '2026-08-04',
    isPinned: true,
    authorName: 'Rev. Fr. Parish Priest',
  },
  {
    id: 'pa-2',
    title: 'Emergency Notice: Heavy Rain Mass Timing Adjustment',
    titleTa: 'அவசர அறிவிப்பு: கனமழை காரணமாக திருப்பலி நேர மாற்றம்',
    summary: 'Special evening Mass rescheduled to 5:30 PM due to heavy weather advisory.',
    content:
      'Due to rain alerts issued in Trichy district, evening Holy Mass for Saturday will be celebrated earlier at 5:30 PM. All parishioners are requested to take necessary safety precautions.',
    category: 'EMERGENCY',
    priority: 'EMERGENCY',
    publishDate: '2026-08-05',
    isPinned: true,
    authorName: 'Parish Office',
  },
  {
    id: 'pa-3',
    title: 'Sunday Catechism Enrolment for Academic Year 2026-27',
    titleTa: 'மறைக்கல்வி வகுப்பு சேர்க்கை 2026-27',
    summary:
      'Registrations open for children standards 1 to 12. First Holy Communion prep included.',
    content:
      'Registration forms for Sunday Catechism classes are now available at the parish desk after all Sunday Masses. Classes commence from August 17th. All Catholic children are encouraged to enroll.',
    category: 'CATECHISM',
    priority: 'NORMAL',
    publishDate: '2026-08-02',
    isPinned: false,
    authorName: 'Catechism Team',
  },
];

export function HomepageAnnouncementSection() {
  const [selected, setSelected] = useState<PublicAnnouncement | null>(null);

  const emergencyAlert = PUBLIC_ANNOUNCEMENTS.find((a) => a.priority === 'EMERGENCY');

  return (
    <section className="space-y-8">
      {/* Emergency Alert Banner */}
      {emergencyAlert && (
        <div className="flex animate-pulse items-center justify-between gap-4 rounded-2xl border-2 border-red-500/50 bg-red-950/40 p-4 text-red-100 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500 font-bold text-white">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-red-500 px-2 py-0.5 text-[9px] font-black uppercase text-white">
                  Emergency Notice
                </span>
                <h4 className="font-heading text-sm font-bold text-white">
                  {emergencyAlert.title}
                </h4>
              </div>
              <p className="mt-0.5 line-clamp-1 text-xs text-red-200">{emergencyAlert.summary}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSelected(emergencyAlert)}
            className="flex-shrink-0 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-red-500"
          >
            Read Notice →
          </button>
        </div>
      )}

      {/* Grid of Announcement Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {PUBLIC_ANNOUNCEMENTS.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className={`border-border/80 bg-card hover:border-primary group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border-2 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 ${
              item.isPinned
                ? 'border-gold-400/50 from-gold-500/5 bg-gradient-to-b to-transparent'
                : ''
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-gold-500/20 text-gold-300 border-gold-400/30 inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[10px] font-black uppercase">
                  {item.isPinned && <Pin className="h-3 w-3" />} {item.category}
                </span>
                <span className="text-muted-foreground text-[11px] font-semibold">
                  {item.publishDate}
                </span>
              </div>

              <h3 className="font-heading text-foreground group-hover:text-primary text-base font-bold leading-snug transition-colors">
                {item.title}
              </h3>
              {item.titleTa && (
                <p className="text-muted-foreground text-xs font-medium">{item.titleTa}</p>
              )}
              <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="border-border/40 mt-6 flex items-center justify-between border-t pt-3 text-xs">
              <span className="text-muted-foreground font-semibold">{item.authorName}</span>
              <span className="text-primary inline-flex items-center gap-1 font-bold transition-transform group-hover:translate-x-1">
                Read More <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="border-gold-400/40 bg-card text-card-foreground w-full max-w-xl space-y-6 rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div className="space-y-1">
                <span className="bg-gold-500/20 text-gold-300 rounded px-2.5 py-0.5 text-[10px] font-black uppercase">
                  {selected.category}
                </span>
                <h3 className="font-heading text-foreground text-xl font-bold">{selected.title}</h3>
                {selected.titleTa && (
                  <p className="text-muted-foreground text-xs font-semibold">{selected.titleTa}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-muted/40 text-foreground border-border/60 whitespace-pre-wrap rounded-2xl border p-6 text-sm leading-relaxed">
              {selected.content}
            </div>

            <div className="border-border text-muted-foreground flex items-center justify-between border-t pt-4 text-xs">
              <span>Published by {selected.authorName}</span>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="bg-primary text-primary-foreground rounded-xl px-6 py-2 text-xs font-bold shadow"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

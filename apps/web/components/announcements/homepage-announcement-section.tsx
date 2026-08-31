'use client';

import { useState } from 'react';
import { Pin, ChevronRight, AlertTriangle, X } from 'lucide-react';
import { useAnnouncements, AnnouncementItem } from '@/context/announcement-context';

export function HomepageAnnouncementSection() {
  const { announcements } = useAnnouncements();
  const [selected, setSelected] = useState<AnnouncementItem | null>(null);

  // Filter for public audience items
  const publicItems = announcements.filter(
    (a) => a.audience === 'EVERYONE' || a.audience === 'FAMILIES',
  );

  const emergencyAlert = publicItems.find((a) => a.priority === 'EMERGENCY');

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
        {publicItems.map((item) => (
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
                <span className="bg-amber-100 text-amber-900 border-amber-300 dark:bg-gold-500/20 dark:text-gold-300 dark:border-gold-400/30 inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-[10px] font-black uppercase">
                  {item.isPinned && <Pin className="h-3 w-3" />} {item.category}
                </span>
                <span className="text-slate-600 dark:text-slate-300 text-[11px] font-bold">
                  {item.publishDate}
                </span>
              </div>

              <h3 className="font-heading text-foreground group-hover:text-primary text-base font-extrabold leading-snug transition-colors dark:text-white">
                {item.title}
              </h3>
              {item.titleTa && (
                <p className="text-slate-700 dark:text-slate-300 text-xs font-semibold">{item.titleTa}</p>
              )}
              <p className="text-slate-800 dark:text-slate-200 line-clamp-3 text-xs font-medium leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="border-border/60 mt-6 flex items-center justify-between border-t pt-3 text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-bold">{item.authorName}</span>
              <span className="text-primary inline-flex items-center gap-1 font-black transition-transform group-hover:translate-x-1">
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
                <span className="bg-amber-100 text-amber-900 border-amber-300 dark:bg-gold-500/20 dark:text-gold-300 dark:border-gold-400/40 rounded border px-2.5 py-0.5 text-[10px] font-black uppercase">
                  {selected.category}
                </span>
                <h3 className="font-heading text-foreground text-xl font-bold dark:text-white">{selected.title}</h3>
                {selected.titleTa && (
                  <p className="text-slate-700 dark:text-slate-300 text-xs font-semibold">{selected.titleTa}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-slate-600 hover:bg-muted hover:text-foreground dark:text-slate-300 rounded-full p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-muted/40 text-foreground dark:text-white border-border/60 whitespace-pre-wrap rounded-2xl border p-6 text-sm font-medium leading-relaxed">
              {selected.content}
            </div>

            <div className="border-border text-slate-700 dark:text-slate-300 flex items-center justify-between border-t pt-4 text-xs font-semibold">
              <span>Published by {selected.authorName}</span>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-2 text-xs font-bold shadow"
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

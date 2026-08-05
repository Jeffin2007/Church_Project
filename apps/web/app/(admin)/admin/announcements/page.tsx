'use client';

import { useState } from 'react';
import { Megaphone, Plus } from 'lucide-react';
import { AnnouncementWidget } from '@/components/announcements/announcement-widget';
import { AnnouncementModal } from '@/components/announcements/announcement-modal';

export default function AdminAnnouncementsPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="animate-in fade-in space-y-8">
      <div className="border-border/60 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div>
          <div className="text-primary mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Megaphone className="h-4 w-4" /> Global Announcement Dispatch
          </div>
          <h1 className="font-heading text-foreground text-3xl font-extrabold">
            Parish Announcements & Notices
          </h1>
          <p className="text-muted-foreground text-xs font-medium">
            Publish, pin, and manage broadcast communications for parishioners, staff, and leaders.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-2.5 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105"
        >
          <Plus className="h-4 w-4" />
          <span>Create Announcement</span>
        </button>
      </div>

      <AnnouncementWidget roleTitle="Administrator" onCreateClick={() => setIsOpen(true)} />

      <AnnouncementModal isOpen={isOpen} onClose={() => setIsOpen(false)} currentRole="Admin" />
    </div>
  );
}

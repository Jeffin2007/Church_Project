'use client';

import { useState } from 'react';
import { Megaphone, Pin, Calendar, Tag, ChevronRight, X } from 'lucide-react';
import { useNotifications } from '@/context/notification-context';

export interface AnnouncementItem {
  id: string;
  title: string;
  titleTa?: string;
  content: string;
  summary?: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT' | 'EMERGENCY';
  category: string;
  audience: string;
  authorName?: string;
  authorRole?: string;
  publishDate: string;
  isPinned: boolean;
  isRead?: boolean;
}

const SAMPLE_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Parish Feast Celebration 2026 Novena Schedule',
    titleTa: 'பங்குப் பெருவிழா நவனா திருப்பலி அட்டவணை',
    content:
      'The annual feast of Queen of All Saints Parish will commence with Flag Hoisting on Friday at 6:00 PM. Daily Novena Mass at 6:30 PM followed by Rosary procession. All Anbiyams and Parish Ministries are invited to lead liturgy on their assigned days.',
    summary: 'Annual feast novena prayers & flag hoisting schedule for all parishioners.',
    priority: 'HIGH',
    category: 'FEAST',
    audience: 'EVERYONE',
    authorName: 'Rev. Fr. Parish Priest',
    authorRole: 'Parish Priest',
    publishDate: '2026-08-04T10:00:00Z',
    isPinned: true,
    isRead: false,
  },
  {
    id: 'ann-2',
    title: 'Urgent: Anbiyam Leaders Monthly Meeting',
    titleTa: 'அன்பியத் தலைவர்கள் மாதாந்திரக் கூட்டம்',
    content:
      'All Anbiyam leaders are requested to attend the monthly pastoral coordination meeting this Sunday at 11:30 AM in the Parish Hall. Dues collection reports and feast volunteer allocations will be finalized.',
    summary: 'Monthly pastoral meeting for all Anbiyam leaders this Sunday 11:30 AM.',
    priority: 'URGENT',
    category: 'MEETING',
    audience: 'ANBIYAMS',
    authorName: 'Parish Pastoral Council',
    authorRole: 'Admin',
    publishDate: '2026-08-03T14:30:00Z',
    isPinned: true,
    isRead: false,
  },
  {
    id: 'ann-3',
    title: 'Sunday Catechism & First Holy Communion Enrolment',
    titleTa: 'மறைக்கல்வி மற்றும் முதல் நற்கருணை சேர்க்கை',
    content:
      'Parents seeking First Holy Communion or Confirmation preparation for their children must submit registration forms at the parish office before August 15. Classes begin next Sunday.',
    summary: 'Catechism and First Holy Communion registration open until August 15.',
    priority: 'NORMAL',
    category: 'CATECHISM',
    audience: 'FAMILIES',
    authorName: 'Catechism Coordinator',
    authorRole: 'Coordinator',
    publishDate: '2026-08-01T09:00:00Z',
    isPinned: false,
    isRead: true,
  },
  {
    id: 'ann-4',
    title: 'Parish Maintenance Fund Special Collection',
    titleTa: 'பங்கு பராமரிப்பு நிதி சிறப்பு காணிக்கை',
    content:
      'A special second collection for Church altar restoration and lighting upgrade will be conducted during all Sunday Masses this weekend. Generous contributions are requested.',
    summary: 'Special second collection for altar restoration during weekend Masses.',
    priority: 'NORMAL',
    category: 'FINANCE',
    audience: 'EVERYONE',
    authorName: 'Finance Committee',
    authorRole: 'Admin',
    publishDate: '2026-07-28T08:00:00Z',
    isPinned: false,
    isRead: true,
  },
];

const priorityBadges: Record<string, { bg: string; text: string; border: string }> = {
  EMERGENCY: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/40' },
  URGENT: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/40' },
  HIGH: { bg: 'bg-gold-500/20', text: 'text-gold-300', border: 'border-gold-400/40' },
  NORMAL: { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/40' },
  LOW: { bg: 'bg-slate-500/20', text: 'text-slate-300', border: 'border-slate-500/40' },
};

export function AnnouncementWidget({
  roleTitle = 'Parishioner',
  onCreateClick,
}: {
  roleTitle?: string;
  onCreateClick?: () => void;
}) {
  const { markAsRead } = useNotifications();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const categories = ['ALL', 'FEAST', 'MEETING', 'CATECHISM', 'FINANCE', 'MASS'];

  const filtered = SAMPLE_ANNOUNCEMENTS.filter(
    (item) => filterCategory === 'ALL' || item.category === filterCategory,
  );

  const handleOpenDetails = (item: AnnouncementItem) => {
    setSelectedAnnouncement(item);
    markAsRead(item.id);
  };

  return (
    <div className="border-border/80 bg-card rounded-2xl border p-6 shadow-xl transition-all">
      {/* Widget Header */}
      <div className="border-border/60 mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl font-bold">
            <Megaphone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading text-foreground text-lg font-bold">Parish Announcements</h3>
            <p className="text-muted-foreground text-xs">Live notices targeted for {roleTitle}</p>
          </div>
        </div>

        {onCreateClick && (
          <button
            type="button"
            onClick={onCreateClick}
            className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-4 py-2 text-xs font-black text-slate-950 shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <span>+ Create Announcement</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="mb-4 flex flex-wrap gap-1.5 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-all ${
              filterCategory === cat
                ? 'bg-primary text-primary-foreground shadow'
                : 'bg-muted/60 text-muted-foreground hover:bg-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Announcement List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const badge = priorityBadges[item.priority] || priorityBadges['NORMAL'];

          return (
            <div
              key={item.id}
              onClick={() => handleOpenDetails(item)}
              className={`border-border/60 hover:border-primary/60 hover:bg-primary/5 group cursor-pointer rounded-xl border p-4 transition-all hover:shadow-md ${
                item.isPinned ? 'bg-gold-500/5 border-gold-400/30' : 'bg-card'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.isPinned && (
                      <span className="bg-gold-400/20 text-gold-400 border-gold-400/40 inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-black uppercase">
                        <Pin className="h-3 w-3" /> Pinned
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-black uppercase ${badge.bg} ${badge.text} ${badge.border}`}
                    >
                      {item.priority}
                    </span>
                    <span className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold">
                      <Tag className="h-2.5 w-2.5" /> {item.category}
                    </span>
                  </div>

                  <h4 className="font-heading text-foreground group-hover:text-primary text-sm font-bold transition-colors">
                    {item.title}
                  </h4>
                  {item.titleTa && (
                    <p className="text-muted-foreground text-xs font-medium">{item.titleTa}</p>
                  )}
                  <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                    {item.summary || item.content}
                  </p>
                </div>

                <ChevronRight className="text-muted-foreground group-hover:text-primary h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
              </div>

              <div className="border-border/40 text-muted-foreground mt-3 flex items-center justify-between border-t pt-2 text-[11px] font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {new Date(item.publishDate).toLocaleDateString()}
                </span>
                <span>By {item.authorName || 'Parish Priest'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <div className="border-gold-400/30 bg-card w-full max-w-xl space-y-6 rounded-3xl border-2 p-6 shadow-2xl">
            <div className="border-border flex items-start justify-between border-b pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {selectedAnnouncement.isPinned && (
                    <span className="bg-gold-400/20 text-gold-400 border-gold-400/40 rounded border px-2 py-0.5 text-[10px] font-black">
                      📌 PINNED
                    </span>
                  )}
                  <span className="bg-primary/20 text-primary rounded px-2 py-0.5 text-[10px] font-black uppercase">
                    {selectedAnnouncement.category}
                  </span>
                </div>
                <h3 className="font-heading text-foreground text-xl font-bold">
                  {selectedAnnouncement.title}
                </h3>
                {selectedAnnouncement.titleTa && (
                  <p className="text-muted-foreground text-xs font-semibold">
                    {selectedAnnouncement.titleTa}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedAnnouncement(null)}
                className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/40 text-foreground border-border/60 rounded-2xl border p-5 text-sm leading-relaxed">
                {selectedAnnouncement.content}
              </div>

              <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold">
                <span>
                  Issued by: {selectedAnnouncement.authorName} ({selectedAnnouncement.authorRole})
                </span>
                <span>Target: {selectedAnnouncement.audience}</span>
              </div>
            </div>

            <div className="border-border flex justify-end border-t pt-4">
              <button
                type="button"
                onClick={() => setSelectedAnnouncement(null)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-2.5 text-xs font-bold shadow"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

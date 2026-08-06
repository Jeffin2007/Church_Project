'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useNotifications } from './notification-context';

export interface AnnouncementItem {
  id: string;
  title: string;
  titleTa?: string;
  content: string;
  summary?: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT' | 'EMERGENCY';
  category: string;
  audience:
    'EVERYONE' | 'FAMILIES' | 'MINISTRY_MEMBERS' | 'CHOIR' | 'ANBIYAMS' | 'PRIESTS' | 'ADMINS';
  authorName: string;
  authorRole: 'Super Admin' | 'Parish Priest' | 'Office Admin' | 'Coordinator' | 'Anbiyam Leader';
  publishDate: string;
  expiryDate?: string;
  isPinned: boolean;
  isRead?: boolean;
}

const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Parish Annual Feast Celebration 2026 Novena Schedule',
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
    expiryDate: '2026-08-31',
    isPinned: true,
    isRead: false,
  },
  {
    id: 'ann-2',
    title: 'Urgent: Anbiyam Leaders Monthly Coordination Meeting',
    titleTa: 'அன்பியத் தலைவர்கள் மாதாந்திரக் கூட்டம்',
    content:
      'All Anbiyam leaders are requested to attend the monthly pastoral coordination meeting this Sunday at 11:30 AM in the Parish Hall. Dues collection reports and feast volunteer allocations will be finalized.',
    summary: 'Monthly pastoral meeting for all Anbiyam leaders this Sunday 11:30 AM.',
    priority: 'URGENT',
    category: 'MEETING',
    audience: 'ANBIYAMS',
    authorName: 'Robin Antony (Anbiyam Leader)',
    authorRole: 'Anbiyam Leader',
    publishDate: '2026-08-03T14:30:00Z',
    expiryDate: '2026-08-25',
    isPinned: true,
    isRead: false,
  },
  {
    id: 'ann-3',
    title: 'Youth Movement Leadership & Volunteer Orientation',
    titleTa: 'இளைஞர் இயக்கத் தலைமை மற்றும் தொண்டர் பயிற்சி',
    content:
      'All youth movement members and volunteers are invited to the leadership workshop on Saturday at 4:00 PM. Youth activities for the upcoming feast and Sunday school mentorship will be planned.',
    summary: 'Youth movement orientation & leadership workshop Saturday 4:00 PM.',
    priority: 'NORMAL',
    category: 'YOUTH',
    audience: 'MINISTRY_MEMBERS',
    authorName: 'Jeffin Joseph (Coordinator)',
    authorRole: 'Coordinator',
    publishDate: '2026-08-02T16:00:00Z',
    expiryDate: '2026-08-28',
    isPinned: false,
    isRead: false,
  },
  {
    id: 'ann-4',
    title: 'Sunday Catechism & First Holy Communion Enrolment',
    titleTa: 'மறைக்கல்வி மற்றும் முதல் நற்கருணை சேர்க்கை',
    content:
      'Parents seeking First Holy Communion or Confirmation preparation for their children must submit registration forms at the parish office before August 15. Classes begin next Sunday.',
    summary: 'Catechism and First Holy Communion registration open until August 15.',
    priority: 'NORMAL',
    category: 'CATECHISM',
    audience: 'FAMILIES',
    authorName: 'Office Admin',
    authorRole: 'Office Admin',
    publishDate: '2026-08-01T09:00:00Z',
    expiryDate: '2026-08-20',
    isPinned: false,
    isRead: true,
  },
];

interface AnnouncementContextType {
  announcements: AnnouncementItem[];
  addAnnouncement: (item: Omit<AnnouncementItem, 'id' | 'publishDate'>) => void;
  togglePin: (id: string) => void;
  deleteAnnouncement: (id: string) => void;
  getAnnouncementsForAudience: (audienceRole?: string) => AnnouncementItem[];
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'qoas_global_announcements';

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const { addNotification } = useNotifications();

  // Load persisted announcements from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AnnouncementItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnnouncements(parsed);
        }
      }
    } catch {
      // Fallback to initial
    }
  }, []);

  // Save to localStorage whenever announcements state changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(announcements));
    } catch {
      // localStorage fallback
    }
  }, [announcements]);

  const addAnnouncement = (item: Omit<AnnouncementItem, 'id' | 'publishDate'>) => {
    const newAnnouncement: AnnouncementItem = {
      ...item,
      id: `ann-${Date.now()}`,
      publishDate: new Date().toISOString(),
    };

    // Prepend new announcement (pinned announcements rise to the top automatically)
    setAnnouncements((prev) => [newAnnouncement, ...prev]);

    // Dispatch global toast notification to all active portal views
    addNotification({
      title: item.title,
      message: item.summary || item.content.slice(0, 100),
      type: 'ANNOUNCEMENT',
      priority: item.priority,
    });
  };

  const togglePin = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isPinned: !a.isPinned } : a)),
    );
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  // Memoize filtered announcements by expiration and audience for smooth 60 FPS performance
  const activeAnnouncements = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    return announcements
      .filter((a) => !a.expiryDate || a.expiryDate >= todayStr)
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
      });
  }, [announcements]);

  const getAnnouncementsForAudience = (audienceRole?: string) => {
    if (!audienceRole || audienceRole === 'EVERYONE' || audienceRole === 'Public') {
      return activeAnnouncements;
    }
    return activeAnnouncements.filter(
      (a) => a.audience === 'EVERYONE' || a.audience === audienceRole,
    );
  };

  return (
    <AnnouncementContext.Provider
      value={{
        announcements: activeAnnouncements,
        addAnnouncement,
        togglePin,
        deleteAnnouncement,
        getAnnouncementsForAudience,
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncements() {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error('useAnnouncements must be used within AnnouncementProvider');
  }
  return context;
}

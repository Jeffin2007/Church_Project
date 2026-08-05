'use client';

import { useState } from 'react';
import { Megaphone, X, Eye, Send, FileText } from 'lucide-react';
import { useNotifications } from '@/context/notification-context';
import type { AnnouncementItem } from './announcement-widget';

export function AnnouncementModal({
  isOpen,
  onClose,
  currentRole = 'Admin',
}: {
  isOpen: boolean;
  onClose: () => void;
  currentRole?: string;
}) {
  const { addNotification } = useNotifications();

  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [title, setTitle] = useState('');
  const [titleTa, setTitleTa] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [priority, setPriority] = useState<AnnouncementItem['priority']>('NORMAL');
  const [category, setCategory] = useState<string>('GENERAL');
  const [audience, setAudience] = useState<string>('EVERYONE');
  const [isPinned, setIsPinned] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/v1/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          titleTa,
          content,
          summary: summary || content.slice(0, 140),
          priority,
          category,
          audience,
          isPinned,
          authorRole: currentRole,
        }),
      }).catch(() => null);

      addNotification({
        title: title || 'New Parish Announcement',
        message: summary || content.slice(0, 120),
        type: 'ANNOUNCEMENT',
        priority,
      });

      onClose();
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="border-gold-400/40 bg-card text-card-foreground w-full max-w-2xl overflow-hidden rounded-3xl border-2 shadow-2xl">
        {/* Header */}
        <div className="border-border/80 flex items-center justify-between border-b bg-slate-900/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gold-500/20 text-gold-300 flex h-10 w-10 items-center justify-center rounded-xl font-bold">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-foreground text-lg font-bold">
                Create Parish Announcement
              </h3>
              <p className="text-muted-foreground text-xs">
                Role: {currentRole} · Targeted Dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode(mode === 'edit' ? 'preview' : 'edit')}
              className="border-border hover:bg-muted inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all"
            >
              {mode === 'edit' ? (
                <Eye className="h-3.5 w-3.5" />
              ) : (
                <FileText className="h-3.5 w-3.5" />
              )}
              <span>{mode === 'edit' ? 'Preview' : 'Edit'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-full p-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {mode === 'edit' ? (
          <form onSubmit={handlePublish} className="space-y-4 p-6 text-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                  Title (English / Primary)
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Parish Feast Mass Timings"
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                />
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                  Title (Tamil - Optional)
                </label>
                <input
                  type="text"
                  value={titleTa}
                  onChange={(e) => setTitleTa(e.target.value)}
                  placeholder="e.g. பங்குப் பெருவிழா திருப்பலி நேரம்"
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 text-xs outline-none focus:ring-2"
                >
                  <option value="GENERAL">General</option>
                  <option value="MASS">Mass</option>
                  <option value="FEAST">Feast</option>
                  <option value="PRAYER">Prayer</option>
                  <option value="CATECHISM">Catechism</option>
                  <option value="YOUTH">Youth</option>
                  <option value="MEETING">Meeting</option>
                  <option value="VOLUNTEER">Volunteer</option>
                  <option value="FINANCE">Finance</option>
                  <option value="EMERGENCY">Emergency</option>
                </select>
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as AnnouncementItem['priority'])}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 text-xs outline-none focus:ring-2"
                >
                  <option value="LOW">Low</option>
                  <option value="NORMAL">Normal</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                  <option value="EMERGENCY">Emergency Alert</option>
                </select>
              </div>

              <div>
                <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                  Target Audience
                </label>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 text-xs outline-none focus:ring-2"
                >
                  <option value="EVERYONE">Everyone (Public + Portal)</option>
                  <option value="FAMILIES">Families Only</option>
                  <option value="MINISTRY_MEMBERS">Ministry Members</option>
                  <option value="CHOIR">Choir Members</option>
                  <option value="ANBIYAMS">Anbiyam Leaders & Families</option>
                  <option value="PRIESTS">Priests & Deacons</option>
                  <option value="ADMINS">Admins Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                Summary / Brief Snippet
              </label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief 1-2 sentence preview summary"
                className="bg-background focus:ring-primary w-full rounded-xl border p-2.5 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="text-muted-foreground mb-1 block text-xs font-semibold">
                Full Content
              </label>
              <textarea
                required
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write detailed announcement text..."
                className="bg-background focus:ring-primary w-full rounded-xl border p-3 text-sm outline-none focus:ring-2"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPinned"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="accent-primary h-4 w-4 rounded border-gray-300"
              />
              <label
                htmlFor="isPinned"
                className="text-foreground cursor-pointer text-xs font-semibold"
              >
                📌 Pin to top of announcement lists & dashboards
              </label>
            </div>

            <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={onClose}
                className="border-border hover:bg-muted rounded-xl border px-5 py-2.5 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="from-gold-400 to-gold-600 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-6 py-2.5 text-xs font-black text-slate-950 shadow-lg transition-all hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? 'Publishing...' : 'Publish Announcement'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Preview Mode */
          <div className="space-y-6 p-6">
            <div className="border-gold-400/40 bg-gold-500/10 space-y-3 rounded-2xl border p-6">
              <div className="flex items-center gap-2">
                {isPinned && (
                  <span className="bg-gold-400 rounded px-2 py-0.5 text-[10px] font-black text-slate-950">
                    PINNED
                  </span>
                )}
                <span className="bg-primary/20 text-primary rounded px-2 py-0.5 text-[10px] font-bold">
                  {category}
                </span>
                <span className="rounded bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400">
                  {priority}
                </span>
              </div>
              <h2 className="font-heading text-foreground text-xl font-bold">
                {title || 'Untitled Announcement'}
              </h2>
              {titleTa && (
                <h4 className="text-muted-foreground text-xs font-semibold">{titleTa}</h4>
              )}
              <p className="text-foreground whitespace-pre-wrap text-sm leading-relaxed">
                {content || 'No content written yet.'}
              </p>
              <div className="border-border/50 text-muted-foreground flex justify-between border-t pt-3 text-xs">
                <span>By: {currentRole}</span>
                <span>Target: {audience}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMode('edit')}
                className="bg-primary text-primary-foreground rounded-xl px-6 py-2 text-xs font-bold"
              >
                Return to Editor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

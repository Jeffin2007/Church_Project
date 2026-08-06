'use client';

import { useState } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { useNotifications } from '@/context/notification-context';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-muted/40 border-border/80 text-muted-foreground hover:text-foreground hover:border-gold-400/60 relative inline-flex items-center justify-center rounded-2xl border p-2 text-xs font-bold transition-all"
        aria-label="Notifications"
      >
        <Bell className="text-gold-300 h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-rose-600 text-[10px] font-black text-white shadow-lg">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="animate-in fade-in border-gold-400/40 bg-card text-card-foreground fixed right-4 top-16 z-50 w-[92vw] space-y-3 overflow-hidden rounded-3xl border-2 p-4 shadow-2xl sm:absolute sm:right-0 sm:top-12 sm:w-96">
          <div className="border-border flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Bell className="text-gold-300 h-4 w-4" />
              <h3 className="font-heading text-foreground text-sm font-bold">
                Parish Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="rounded-full border border-rose-500/40 bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300">
                  {unreadCount} Unread
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={markAllAsRead}
              className="text-primary inline-flex items-center gap-1 text-[11px] font-bold hover:underline"
            >
              <CheckCheck className="h-3.5 w-3.5" /> Mark All Read
            </button>
          </div>

          <div className="max-h-[60vh] space-y-2 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-muted-foreground py-6 text-center text-xs italic">
                No notifications right now.
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`space-y-1 rounded-2xl border p-3 text-xs transition-all ${
                    n.isRead
                      ? 'bg-muted/20 border-border/40 text-muted-foreground'
                      : 'bg-gold-500/10 border-gold-400/40 text-foreground'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-foreground text-xs font-bold">{n.title}</span>
                    {!n.isRead && (
                      <button
                        type="button"
                        onClick={() => markAsRead(n.id)}
                        className="text-primary text-[10px] font-bold hover:text-emerald-400"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

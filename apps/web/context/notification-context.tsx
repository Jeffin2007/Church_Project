'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ParishNotification {
  id: string;
  title: string;
  message: string;
  type: 'ANNOUNCEMENT' | 'SACRAMENT' | 'PAYMENT' | 'EVENT' | 'SYSTEM';
  priority?: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT' | 'EMERGENCY';
  createdAt: string;
  isRead: boolean;
  linkUrl?: string;
}

interface NotificationContextType {
  notifications: ParishNotification[];
  unreadCount: number;
  toast: ParishNotification | null;
  addNotification: (notif: Omit<ParishNotification, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissToast: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: ParishNotification[] = [];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<ParishNotification[]>(INITIAL_NOTIFICATIONS);
  const [toast, setToast] = useState<ParishNotification | null>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const addNotification = (notif: Omit<ParishNotification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotif: ParishNotification = {
      ...notif,
      id: `n-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setToast(newNotif);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const dismissToast = () => {
    setToast(null);
  };

  // Auto dismiss toast after 5 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        toast,
        addNotification,
        markAsRead,
        markAllAsRead,
        dismissToast,
      }}
    >
      {children}

      {/* Floating Real-time Toast Banner */}
      {toast && (
        <div className="border-gold-400/40 animate-in fade-in slide-in-from-bottom-5 fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-3 rounded-2xl border bg-slate-900/95 p-4 text-white shadow-2xl backdrop-blur-md">
          <div className="bg-gold-500/20 text-gold-300 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xl font-bold">
            🔔
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-gold-300 text-xs font-bold">{toast.title}</h4>
              <span className="bg-gold-500/20 text-gold-400 rounded px-1.5 py-0.5 text-[9px] font-black uppercase">
                {toast.priority || 'NEW'}
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-white/90">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={dismissToast}
            className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

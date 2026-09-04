/**
 * Google Sheets Activity Logger Client
 * Queen of All Saints Roman Catholic Church
 * 
 * Asynchronously posts real-time website activities (Logins, Profile Updates,
 * Payment Success/Failure, Mass Intentions, Blessings, Anbiyam Transfers)
 * to your Google Apps Script webhook connected to Google Spreadsheet:
 * https://docs.google.com/spreadsheets/d/1YWQzP5BElf8JXzTb1kmpxPnc2aTI-8mq4cfOUb25V7Y/edit
 */

export interface ParishActivityPayload {
  eventType:
    | 'USER_LOGIN'
    | 'USER_LOGOUT'
    | 'PROFILE_UPDATE'
    | 'PASSWORD_CHANGE'
    | 'PAYMENT_SUCCESS'
    | 'PAYMENT_FAILED'
    | 'OFFERTORY_PAID'
    | 'MASS_INTENTION_CREATED'
    | 'MASS_INTENTION_STATUS_UPDATE'
    | 'HOUSE_BLESSING_REQUEST'
    | 'HOME_COMMUNION_REQUEST'
    | 'SACRAMENT_CERTIFICATE_REQUEST'
    | 'ANBIYAM_TRANSFER_REQUEST'
    | 'ANBIYAM_TRANSFER_APPROVED'
    | 'ANBIYAM_TRANSFER_REJECTED'
    | 'PRAYER_REQUEST'
    | 'PARISH_NOTICE';
  familyId?: string;
  familyName?: string;
  headName?: string;
  role?: string;
  anbiyam?: string;
  status?: 'SUCCESS' | 'FAILED' | 'PENDING' | 'APPROVED' | 'REJECTED';
  summary: string;
  data?: Record<string, unknown>;
  timestamp?: string;
}

const LOCAL_STORAGE_LOG_KEY = 'qoas_google_sheets_offline_logs_v1';

/**
 * Dispatches an event to the Google Apps Script webhook.
 * Non-blocking, fails gracefully, and keeps a local cache.
 */
export async function logParishActivity(payload: ParishActivityPayload): Promise<void> {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const fullPayload = {
    ...payload,
    timestamp,
    clientInfo: typeof navigator !== 'undefined' ? `${navigator.userAgent.slice(0, 80)}` : 'Next.js App',
  };

  // 1. Save to local browser audit log for instant inspection
  if (typeof window !== 'undefined') {
    try {
      const existing = localStorage.getItem(LOCAL_STORAGE_LOG_KEY);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(fullPayload);
      localStorage.setItem(LOCAL_STORAGE_LOG_KEY, JSON.stringify(list.slice(0, 100)));
    } catch {
      // Ignore local storage error
    }
  }

  // 2. Transmit to Google Apps Script Webhook
  const webhookUrl =
    process.env.NEXT_PUBLIC_APPS_SCRIPT_WEBHOOK_URL ||
    (typeof window !== 'undefined' ? localStorage.getItem('qoas_apps_script_url') : null);

  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      // Use standard fetch with no-cors or JSON body (Apps script handles JSON text)
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(fullPayload),
        mode: 'no-cors', // Standard for Google Apps Script Web App endpoints
      });
    } catch (err) {
      console.warn('Could not post activity to Google Sheets webhook:', err);
    }
  }
}
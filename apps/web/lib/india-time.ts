'use client';

import { useState, useEffect } from 'react';

export interface IndiaDateParts {
  year: number;
  month: number; // 1-indexed (1 = Jan, ..., 12 = Dec)
  day: number;
  dayOfWeek: number; // 0 = Sunday, ..., 6 = Saturday
  weekday: string;
  weekdayTa: string;
  hours24: number;
  hours12: number;
  minutes: number;
  seconds: number;
  dayPeriod: 'AM' | 'PM';
  totalMinutes: number;
  timeStr: string;
  dateStrEn: string;
  dateStrTa: string;
  rawDate: Date;
}

const WEEKDAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const WEEKDAYS_TA = ['ஞாயிற்றுக்கிழமை', 'திங்கட்கிழமை', 'செவ்வாய்க்கிழமை', 'புதன்கிழமை', 'வியாழக்கிழமை', 'வெள்ளிக்கிழமை', 'சனிக்கிழமை'];

// Global clock offset in milliseconds (Server IST Time - Local Device Time)
let globalClockOffsetMs = 0;
let hasSyncedWithNetwork = false;

/**
 * Synchronizes client clock with Indian Standard Time (IST) from the server / internet.
 */
export async function syncIndiaNetworkTime(): Promise<number> {
  try {
    const startTime = Date.now();
    const res = await fetch('/api/v1/time', { cache: 'no-store' });
    if (!res.ok) throw new Error('API time fetch failed');

    const data = await res.json();
    const endTime = Date.now();
    const roundTrip = (endTime - startTime) / 2;

    if (data.timestamp) {
      const serverTime = data.timestamp + roundTrip;
      globalClockOffsetMs = serverTime - endTime;
      hasSyncedWithNetwork = true;
    }
  } catch {
    // Fallback: try public time API if available
    try {
      const fbRes = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata', { cache: 'no-store' });
      if (fbRes.ok) {
        const fbData = await fbRes.json();
        if (fbData.unixtime) {
          const serverTime = fbData.unixtime * 1000;
          globalClockOffsetMs = serverTime - Date.now();
          hasSyncedWithNetwork = true;
        }
      }
    } catch {
      // If offline or blocked, Intl Asia/Kolkata calculation still provides 100% accurate IST conversion
    }
  }
  return globalClockOffsetMs;
}

/**
 * Returns current Date adjusted for Indian Standard Time network clock skew.
 */
export function getIndiaNow(): Date {
  const localTime = Date.now();
  return new Date(localTime + globalClockOffsetMs);
}

/**
 * Formats and decomposes any Date strictly into Indian Standard Time (Asia/Kolkata) parts.
 */
export function getIndiaDateParts(baseDate: Date = getIndiaNow()): IndiaDateParts {
  const istFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'long',
    hour12: false,
  });

  const parts = istFormatter.formatToParts(baseDate);
  const partMap: Record<string, string> = {};
  for (const part of parts) {
    partMap[part.type] = part.value;
  }

  const weekday = partMap['weekday'] || 'Sunday';
  const dayOfWeek = WEEKDAYS_EN.indexOf(weekday) >= 0 ? WEEKDAYS_EN.indexOf(weekday) : 0;
  const year = parseInt(partMap['year'] || `${baseDate.getFullYear()}`, 10);
  const month = parseInt(partMap['month'] || `${baseDate.getMonth() + 1}`, 10);
  const day = parseInt(partMap['day'] || `${baseDate.getDate()}`, 10);
  const hours24 = parseInt(partMap['hour'] || '0', 10) % 24;
  const minutes = parseInt(partMap['minute'] || '0', 10);
  const seconds = parseInt(partMap['second'] || '0', 10);
  const dayPeriod = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const totalMinutes = hours24 * 60 + minutes;

  const timeStr = `${hours12}:${minutes.toString().padStart(2, '0')} ${dayPeriod}`;

  const dateStrEn = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(baseDate);

  const dateStrTa = new Intl.DateTimeFormat('ta-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(baseDate);

  return {
    year,
    month,
    day,
    dayOfWeek,
    weekday,
    weekdayTa: WEEKDAYS_TA[dayOfWeek] || 'ஞாயிற்றுக்கிழமை',
    hours24,
    hours12,
    minutes,
    seconds,
    dayPeriod,
    totalMinutes,
    timeStr,
    dateStrEn,
    dateStrTa,
    rawDate: baseDate,
  };
}

/**
 * React Hook that provides real-time, live synchronized Indian Standard Time (IST).
 */
export function useIndiaTime(intervalMs: number = 10000): IndiaDateParts {
  const [indiaTime, setIndiaTime] = useState<IndiaDateParts>(() => getIndiaDateParts());

  useEffect(() => {
    // Initial sync
    if (!hasSyncedWithNetwork) {
      syncIndiaNetworkTime().then(() => {
        setIndiaTime(getIndiaDateParts());
      });
    }

    const timer = setInterval(() => {
      setIndiaTime(getIndiaDateParts());
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return indiaTime;
}

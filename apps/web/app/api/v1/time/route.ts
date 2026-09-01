import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date();

  // Indian Standard Time (IST) is UTC+05:30
  const istFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'long',
    hour12: true,
  });

  const parts = istFormatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  for (const part of parts) {
    partMap[part.type] = part.value;
  }

  // Also get 24-hour hour
  const hour24Formatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    hour12: false,
  });
  const hour24 = parseInt(hour24Formatter.format(now), 10) % 24;

  const weekdayIndexMap: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const weekday = partMap['weekday'] || 'Sunday';
  const dayOfWeek = weekdayIndexMap[weekday] ?? 0;
  const year = parseInt(partMap['year'] || `${now.getFullYear()}`, 10);
  const month = parseInt(partMap['month'] || `${now.getMonth() + 1}`, 10);
  const day = parseInt(partMap['day'] || `${now.getDate()}`, 10);
  const hour12 = parseInt(partMap['hour'] || '0', 10);
  const minute = parseInt(partMap['minute'] || '0', 10);
  const second = parseInt(partMap['second'] || '0', 10);
  const dayPeriod = (partMap['dayPeriod'] || (hour24 >= 12 ? 'PM' : 'AM')).toUpperCase();

  return NextResponse.json({
    success: true,
    timezone: 'Asia/Kolkata',
    utcOffset: '+05:30',
    timestamp: now.getTime(),
    iso: now.toISOString(),
    ist: {
      year,
      month,
      day,
      dayOfWeek,
      weekday,
      hour24,
      hour12,
      minute,
      second,
      dayPeriod,
      formattedTime: `${hour12}:${minute.toString().padStart(2, '0')} ${dayPeriod}`,
      formattedDate: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
    },
  });
}

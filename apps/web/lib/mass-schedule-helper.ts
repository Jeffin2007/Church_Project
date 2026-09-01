import { PARISH } from './parish-data';
import { getIndiaDateParts } from './india-time';

export interface NextMassResult {
  isToday: boolean;
  isHappeningNow: boolean;
  label: string;
  labelTa: string;
  dayName: string;
  dayNameTa: string;
  time: string;
  type: string;
  typeTa: string;
  language: string;
  allTodayMassesCompleted: boolean;
  todaySlot: (typeof PARISH.massTimings)[number];
  activeMassTime: string | null;
  currentTimeStr: string;
}

const DOW_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DOW_NAMES_TA = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];

/**
 * Converts a 12-hour AM/PM time string (e.g. '6:15 AM', '6:00 PM', '12:30 PM')
 * into total minutes from start of day (0 - 1439).
 */
export function parseTimeToMinutes(timeStr: string): number {
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) {
    const fallbackParts = timeStr.split(':');
    return parseInt(fallbackParts[0], 10) * 60 + (parseInt(fallbackParts[1], 10) || 0);
  }

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hour < 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }

  return hour * 60 + minute;
}

/**
 * Retrieves the scheduled mass slot for a given day-of-week (0 = Sunday, ..., 6 = Saturday)
 */
export function getSlotForDay(dow: number) {
  return (
    PARISH.massTimings.find((slot) => {
      if (Array.isArray(slot.dow)) return (slot.dow as readonly number[]).includes(dow);
      return slot.dow === dow;
    }) ?? PARISH.massTimings[0]
  );
}

/**
 * Dynamic, time-aware calculation of the NEXT upcoming Holy Mass in Indian Standard Time (IST).
 */
export function getLiveNextMass(nowDate?: Date): NextMassResult {
  const ist = getIndiaDateParts(nowDate);
  const currentDow = ist.dayOfWeek;
  const currentMinutes = ist.totalMinutes;
  const currentTimeStr = ist.timeStr;

  const todaySlot = getSlotForDay(currentDow);

  // 1. Check if any mass is currently in progress (within 45 mins after start)
  for (const mass of todaySlot.masses) {
    const massStartMin = parseTimeToMinutes(mass.time);
    const massEndMin = massStartMin + 45;

    if (currentMinutes >= massStartMin && currentMinutes < massEndMin) {
      return {
        isToday: true,
        isHappeningNow: true,
        label: 'Mass In Progress Now',
        labelTa: 'தற்போது திருப்பலி நடைபெறுகிறது',
        dayName: DOW_NAMES[currentDow],
        dayNameTa: DOW_NAMES_TA[currentDow],
        time: mass.time,
        type: mass.type,
        typeTa: mass.typeTa,
        language: mass.language || 'Tamil',
        allTodayMassesCompleted: false,
        todaySlot,
        activeMassTime: mass.time,
        currentTimeStr,
      };
    }
  }

  // 2. Check upcoming masses today
  for (const mass of todaySlot.masses) {
    const massStartMin = parseTimeToMinutes(mass.time);
    if (massStartMin > currentMinutes) {
      return {
        isToday: true,
        isHappeningNow: false,
        label: 'Next Mass Today',
        labelTa: 'இன்றைய அடுத்த திருப்பலி',
        dayName: DOW_NAMES[currentDow],
        dayNameTa: DOW_NAMES_TA[currentDow],
        time: mass.time,
        type: mass.type,
        typeTa: mass.typeTa,
        language: mass.language || 'Tamil',
        allTodayMassesCompleted: false,
        todaySlot,
        activeMassTime: mass.time,
        currentTimeStr,
      };
    }
  }

  // 3. If all masses for today have completed, transition to TOMORROW'S first mass
  const tomorrowDow = (currentDow + 1) % 7;
  const tomorrowSlot = getSlotForDay(tomorrowDow);
  const tomorrowFirstMass = tomorrowSlot.masses[0];

  return {
    isToday: false,
    isHappeningNow: false,
    label: `Next Mass Tomorrow (${DOW_NAMES[tomorrowDow]})`,
    labelTa: `நாளைய திருப்பலி (${DOW_NAMES_TA[tomorrowDow]})`,
    dayName: DOW_NAMES[tomorrowDow],
    dayNameTa: DOW_NAMES_TA[tomorrowDow],
    time: tomorrowFirstMass.time,
    type: tomorrowFirstMass.type,
    typeTa: tomorrowFirstMass.typeTa,
    language: tomorrowFirstMass.language || 'Tamil',
    allTodayMassesCompleted: true,
    todaySlot,
    activeMassTime: null,
    currentTimeStr,
  };
}

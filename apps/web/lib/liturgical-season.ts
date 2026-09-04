/**
 * Liturgical Season Calculator
 *
 * Determines the current Catholic liturgical season based on the date.
 *
 * Seasons:
 *   marian-feast  — Queen of All Saints Parish Feast (Nov 1–10)
 *   marian        — Any other major Marian feast day
 *   advent        — ~Nov 27 – Dec 24
 *   christmas     — Dec 25 – Jan 12
 *   lent          — Ash Wednesday – Holy Saturday
 *   easter        — Easter – Pentecost
 *   ordinary      — All other time
 */

import { getIndiaDateParts } from './india-time';

export type LiturgicalSeason =
  | 'marian-feast' // Parish annual feast — Queen of All Saints (August & Nov 1–10)
  | 'marian' // Other Marian feast days
  | 'advent'
  | 'christmas'
  | 'lent'
  | 'easter'
  | 'ordinary';

export interface MarianFeastDay {
  month: number;
  day: number;
  name: string;
  nameTa: string;
  prayer: string;
}

export interface SeasonInfo {
  season: LiturgicalSeason;
  label: string;
  labelTa: string;
  /** Tailwind colour token name for badges */
  color: string;
  description: string;
  /** If today is a specific Marian feast, this is populated */
  marianFeast?: MarianFeastDay;
}

// ── Named Marian feast days ───────────────────────────────────────────────────
export const MARIAN_FEAST_DAYS: MarianFeastDay[] = [
  {
    month: 1,
    day: 1,
    name: 'Mary, Mother of God',
    nameTa: 'கடவுளின் தாய் மரியா',
    prayer: 'Holy Mother of God, pray for us.',
  },
  {
    month: 2,
    day: 2,
    name: 'Presentation of the Lord',
    nameTa: 'ஆண்டவரின் காணிக்கை',
    prayer: 'Light of the nations, enlighten our hearts.',
  },
  {
    month: 2,
    day: 11,
    name: 'Our Lady of Lourdes',
    nameTa: 'லூர்து மாதா',
    prayer: 'Our Lady of Lourdes, heal and comfort us.',
  },
  {
    month: 3,
    day: 25,
    name: 'The Annunciation',
    nameTa: 'அறிவிப்பு விழா',
    prayer: 'Hail, full of grace, the Lord is with thee.',
  },
  {
    month: 5,
    day: 13,
    name: 'Our Lady of Fatima',
    nameTa: 'ஃபாத்திமா மாதா',
    prayer: 'Our Lady of Fatima, lead us to peace.',
  },
  {
    month: 5,
    day: 31,
    name: 'Visitation of the Virgin Mary',
    nameTa: 'மரியாவின் சந்திப்பு',
    prayer: 'Blessed are you among women.',
  },
  {
    month: 7,
    day: 16,
    name: 'Our Lady of Mount Carmel',
    nameTa: 'கார்மல் மலை மாதா',
    prayer: 'Our Lady of Mount Carmel, intercede for us.',
  },
  {
    month: 8,
    day: 15,
    name: 'Assumption of Mary',
    nameTa: 'மரியாவின் எடுத்துக்கொள்ளல்',
    prayer: 'Assumed into heaven, pray for us sinners.',
  },
  {
    month: 8,
    day: 22,
    name: 'Queenship of Mary',
    nameTa: 'மரியாவின் அரசி விழா',
    prayer: 'Queen of Heaven, reign in our hearts.',
  },
  {
    month: 9,
    day: 8,
    name: 'Nativity of the Virgin Mary',
    nameTa: 'மரியாவின் பிறப்பு',
    prayer: 'Blessed Virgin Mary, born for our salvation.',
  },
  {
    month: 9,
    day: 15,
    name: 'Our Lady of Sorrows',
    nameTa: 'துக்கத்தின் மாதா',
    prayer: 'Our Lady of Sorrows, comfort all who suffer.',
  },
  {
    month: 10,
    day: 7,
    name: 'Our Lady of the Rosary',
    nameTa: 'ஜெபமாலை மாதா',
    prayer: 'Lead us by your Rosary to eternal life.',
  },
  {
    month: 11,
    day: 1,
    name: 'All Saints',
    nameTa: 'எல்லா புனிதர்களும்',
    prayer: 'Queen of All Saints, intercede for your parish.',
  },
  {
    month: 12,
    day: 8,
    name: 'Immaculate Conception',
    nameTa: 'அமலோற்பவ திருவிழா',
    prayer: 'Immaculate Mary, keep us pure of heart.',
  },
  {
    month: 12,
    day: 12,
    name: 'Our Lady of Guadalupe',
    nameTa: 'குவடலூப்பே மாதா',
    prayer: 'Our Lady of Guadalupe, protect us.',
  },
];

// ── Easter (Gregorian algorithm) ──────────────────────────────────────────────
function easterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m2 = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m2 + 114) / 31);
  const day = ((h + l - 7 * m2 + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function isBetween(date: Date, start: Date, end: Date): boolean {
  return date >= start && date <= end;
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function getLiturgicalSeason(date?: Date): SeasonInfo {
  const targetDate = date ?? new Date();
  const ist = getIndiaDateParts(targetDate);
  const year = ist.year;
  const m = ist.month; // 1-indexed (1 = Jan, 8 = Aug, 11 = Nov)
  const dy = ist.day;

  // ── 1. Queen of All Saints Annual Parish Feast (August — 3rd Friday + 10-day Novena) ──
  if (m === 8) {
    const augFirstDow = new Date(year, 7, 1).getDay(); // 0 = Sun, ..., 5 = Fri
    const firstFriday = 1 + ((5 - augFirstDow + 7) % 7);
    const thirdFriday = firstFriday + 14;
    const novenaEndDay = thirdFriday + 10;

    if (dy >= thirdFriday && dy <= novenaEndDay) {
      return {
        season: 'marian-feast',
        label: 'Annual Feast of Queen of All Saints',
        labelTa: 'அனைத்து புனிதர்களின் அரசி ஆண்டுப் பெருவிழா',
        color: 'blue',
        description: '10-Day Novena & Grand Parish Chariot Feast',
        marianFeast: {
          month: 8,
          day: dy,
          name: 'Annual Feast Novena — Queen of All Saints',
          nameTa: 'ஆண்டுப் பெருவிழா நவநாள் — அனைத்து புனிதர்களின் அரசி',
          prayer: 'Queen of All Saints, pray for our parish family.',
        },
      };
    }
  }

  // ── 2. Queen of All Saints Solemnity of All Saints: Nov 1–10 ────────────
  if (m === 11 && dy >= 1 && dy <= 10) {
    return {
      season: 'marian-feast',
      label: 'Feast of Queen of All Saints',
      labelTa: 'அனைத்து புனிதர்களின் அரசி பெருவிழா',
      color: 'blue',
      description: 'Solemnity of All Saints & Parish Novena',
      marianFeast: MARIAN_FEAST_DAYS.find((f) => f.month === 11 && f.day === 1),
    };
  }

  // ── 3. Other named Marian feast days ────────────────────────────────────
  const todayFeast = MARIAN_FEAST_DAYS.find((f) => f.month === m && f.day === dy);
  if (todayFeast) {
    return {
      season: 'marian',
      label: todayFeast.name,
      labelTa: todayFeast.nameTa,
      color: 'rose',
      description: 'Honouring Our Blessed Mother',
      marianFeast: todayFeast,
    };
  }

  // ── 3. Seasonal boundaries ───────────────────────────────────────────────
  const easter = easterDate(year);
  const christmas = new Date(year, 11, 25);
  const christmasDow = christmas.getDay();
  const adventStart = addDays(christmas, -(christmasDow === 0 ? 28 : christmasDow + 21));
  const adventEnd = new Date(year, 11, 24);
  const ashWednesday = addDays(easter, -46);
  const holySaturday = addDays(easter, -1);
  const pentecost = addDays(easter, 49);
  const isXmasOverNewYear = targetDate <= new Date(year, 0, 12);

  if (isBetween(targetDate, new Date(year, 11, 25), addDays(christmas, 18)) || isXmasOverNewYear) {
    return {
      season: 'christmas',
      label: 'Christmas Season',
      labelTa: 'கிறிஸ்துமஸ் காலம்',
      color: 'red',
      description: 'Joy to the world — Emmanuel has come',
    };
  }
  if (isBetween(targetDate, adventStart, adventEnd)) {
    return {
      season: 'advent',
      label: 'Advent',
      labelTa: 'வருகை காலம்',
      color: 'violet',
      description: 'Preparing our hearts for the coming of the Lord',
    };
  }
  if (isBetween(targetDate, ashWednesday, holySaturday)) {
    return {
      season: 'lent',
      label: 'Lent',
      labelTa: 'தவக்காலம்',
      color: 'purple',
      description: 'A season of prayer, fasting, and almsgiving',
    };
  }
  if (isBetween(targetDate, easter, pentecost)) {
    return {
      season: 'easter',
      label: 'Easter Season',
      labelTa: 'உயிர்ப்பு காலம்',
      color: 'green',
      description: 'Alleluia! Christ is risen',
    };
  }

  return {
    season: 'ordinary',
    label: 'Ordinary Time',
    labelTa: 'சாதாரண காலம்',
    color: 'green',
    description: 'Growing in faith through daily discipleship',
  };
}

// ── Daily liturgical content ──────────────────────────────────────────────────
export interface DailyHighlight {
  type: 'feast-prayer' | 'season-prayer' | 'mass-reminder' | 'novena';
  heading: string;
  headingTa: string;
  body: string;
  bodyTa: string;
  cta?: { label: string; href: string };
}

const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const WEEKDAY_NAMES_TA = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];

export function getDailyHighlight(date: Date = new Date()): DailyHighlight {
  const info = getLiturgicalSeason(date);
  const dow = date.getDay(); // 0=Sun
  const dy = date.getDate();
  const dayEn = WEEKDAY_NAMES[dow];
  const dayTa = WEEKDAY_NAMES_TA[dow];

  // ── Parish Feast novena (Nov 1–10) ─────────────────────────────────────
  if (info.season === 'marian-feast') {
    const novenaDay = dy; // Nov 1 = Day 1, Nov 10 = Day 10
    const isLastDay = dy === 10;
    return {
      type: 'novena',
      heading: isLastDay ? 'Feast Day — Grand Celebration' : `Novena — Day ${novenaDay}`,
      headingTa: isLastDay ? 'பெருவிழா நாள்' : `நொவேனா — ${novenaDay}ஆம் நாள்`,
      body: isLastDay
        ? 'The Grand Procession and Solemn High Mass celebrate Our Lady, Queen of All Saints. Join us today.'
        : 'Queen of All Saints, we come before you with faith and devotion. Intercede for our parish family.',
      bodyTa: isLastDay
        ? 'அனைத்து புனிதர்களின் அரசியாகிய மரியாளே, இன்று உன்னுடைய பெருவிழாவில் உன்னோடு கொண்டாடுகிறோம்.'
        : 'அனைத்து புனிதர்களின் அரசியாகிய மரியாளே, எங்கள் திருவகையை ஆசீர்வதியும்.',
      cta: { label: 'View Feast Schedule', href: '/feast' },
    };
  }

  // ── Specific Marian feast ──────────────────────────────────────────────
  if (info.season === 'marian' && info.marianFeast) {
    return {
      type: 'feast-prayer',
      heading: `Today: ${info.marianFeast.name}`,
      headingTa: info.marianFeast.nameTa,
      body: info.marianFeast.prayer,
      bodyTa: 'மரியாளே, எங்களுக்காக வேண்டிக்கொள்ளும்.',
      cta: { label: 'Mass Schedule', href: '/mass-timings' },
    };
  }

  // ── Sunday reminder ───────────────────────────────────────────────────
  if (dow === 0) {
    return {
      type: 'mass-reminder',
      heading: "Sunday — The Lord's Day",
      headingTa: 'ஞாயிறு — ஆண்டவரின் நாள்',
      body: 'Holy Mass at 6:15 AM, 7:30 AM & 9:00 AM. Come, let us worship together.',
      bodyTa: 'திருப்பலி 6:15, 7:30, 9:00 மணிக்கு. ஆண்டவரை வழிபட வாருங்கள்.',
      cta: { label: 'Mass Timings', href: '#mass-timings' },
    };
  }

  // ── Friday / Lent penance reminder ────────────────────────────────────
  if (dow === 5 || info.season === 'lent') {
    return {
      type: 'season-prayer',
      heading: info.season === 'lent' ? 'Lenten Reflection' : 'Friday — Day of Penance',
      headingTa: info.season === 'lent' ? 'தவக்கால தியானம்' : 'வெள்ளி — தபசு நாள்',
      body: '"Take up your cross daily and follow me." — Luke 9:23',
      bodyTa: '"உங்கள் சிலுவையை எடுத்து என்னைப் பின்பற்றுங்கள்." — லூக்கா 9:23',
    };
  }

  // ── Advent daily ──────────────────────────────────────────────────────
  if (info.season === 'advent') {
    return {
      type: 'season-prayer',
      heading: `${dayEn} — Come, Lord Jesus`,
      headingTa: `${dayTa} — ஆண்டவரே, வாரும்`,
      body: 'Maranatha — Come, Lord Jesus. Make straight the paths in our hearts.',
      bodyTa: 'மரனாத்தா — ஆண்டவரே வாரும். எங்கள் இதயங்களில் நேரான வழி ஆக்கும்.',
    };
  }

  // ── Christmas ────────────────────────────────────────────────────────
  if (info.season === 'christmas') {
    return {
      type: 'season-prayer',
      heading: 'Blessed Christmas Season',
      headingTa: 'கிறிஸ்து பிறப்பு காலம்',
      body: 'Glory to God in the highest, and on earth peace to all people of good will.',
      bodyTa: 'உன்னதங்களில் கடவுளுக்கு மாட்சிமை; பூமியில் நற்சித்தம் உள்ளவர்களுக்கு சமாதானம்.',
    };
  }

  // ── Easter ───────────────────────────────────────────────────────────
  if (info.season === 'easter') {
    return {
      type: 'season-prayer',
      heading: 'Alleluia — He is Risen!',
      headingTa: 'அல்லேலூயா — அவர் உயிர்த்தார்!',
      body: 'Christ is risen, alleluia. He has conquered death and opened the gates of heaven.',
      bodyTa: 'கிறிஸ்து உயிர்த்தார், அல்லேலூயா. மரணத்தை வென்று சொர்க்க வாசலைத் திறந்தார்.',
    };
  }

  // ── Default — weekday daily Mass reminder ────────────────────────────
  return {
    type: 'mass-reminder',
    heading: `${dayEn} — Daily Mass`,
    headingTa: `${dayTa} — தினசரி திருப்பலி`,
    body: 'Daily Mass at 6:30 AM. "Do this in memory of me." — Luke 22:19',
    bodyTa: 'தினசரி திருப்பலி காலை 6:30 மணிக்கு. "என்னை நினைவுகூர இதைச் செய்யுங்கள்."',
    cta: { label: 'Mass Timings', href: '#mass-timings' },
  };
}

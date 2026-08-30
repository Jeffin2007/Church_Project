import stAugustineData from '../../api/prisma/data/st-augustine.json';
import stTheresaData from '../../api/prisma/data/st-theresa.json';
import stAnthonyData from '../../api/prisma/data/st-anthony.json';
import stCeciliaData from '../../api/prisma/data/st-cecilia.json';
import stNorbertData from '../../api/prisma/data/st-norbert.json';
import infantJesusData from '../../api/prisma/data/infant-jesus.json';
import stXavierData from '../../api/prisma/data/st-xavier.json';
import stAlphonsaData from '../../api/prisma/data/st-alphonsa.json';
import jmjData from '../../api/prisma/data/jmj.json';
import stJohnDeBrittoData from '../../api/prisma/data/st-john-de-britto.json';
import angloIndianData from '../../api/prisma/data/anglo-indian.json';
import stJosephData from '../../api/prisma/data/st-joseph.json';
import gandhiNagarData from '../../api/prisma/data/gandhi-nagar.json';

export interface ParishFamilyRecord {
  sNo: number;
  cardNo: string;
  username: string;
  defaultPassword: string | null;
  familyName: string;
  headName: string;
  spouseName: string | null;
  contactNo: string;
  alternateContact?: string;
  address: string;
  anbiyam: string;
}

export const ALL_PARISH_FAMILIES: ParishFamilyRecord[] = [
  ...stAugustineData,
  ...stTheresaData,
  ...stAnthonyData,
  ...stCeciliaData,
  ...stNorbertData,
  ...infantJesusData,
  ...stXavierData,
  ...stAlphonsaData,
  ...jmjData,
  ...stJohnDeBrittoData,
  ...angloIndianData,
  ...stJosephData,
  ...gandhiNagarData,
];

export const ANBIYAM_FAMILIES_MAP: Record<string, ParishFamilyRecord[]> = {
  'st-augustine': stAugustineData,
  'st-theresa': stTheresaData,
  'st-anthony': stAnthonyData,
  'st-cecilia': stCeciliaData,
  'st-norbert': stNorbertData,
  'infant-jesus': infantJesusData,
  'st-xavier': stXavierData,
  'st-alphonsa': stAlphonsaData,
  'jmj': jmjData,
  'st-john-de-britto': stJohnDeBrittoData,
  'anglo-indian': angloIndianData,
  'st-joseph': stJosephData,
  'gandhi-nagar': gandhiNagarData,
};

export function findFamilyByUsernameOrCard(query: string): ParishFamilyRecord | undefined {
  if (!query) return undefined;
  const raw = query.trim();
  const q = raw.toLowerCase();
  const cleanQ = q
    .replace(/^qoas-card-|^card-|^card\s*|^qoas-?\d{4}-?|^qoas-?|^qoas/i, '')
    .replace('@queenofallsaints.in', '')
    .trim();
  const digitsOnly = q.replace(/\D/g, '');
  const queryInt = digitsOnly ? parseInt(digitsOnly, 10) : NaN;

  return ALL_PARISH_FAMILIES.find((f) => {
    const fCard = f.cardNo.toLowerCase().trim();
    const fCardInt = parseInt(fCard.replace(/\D/g, ''), 10);
    const fUser = f.username.toLowerCase().trim();
    const fPhoneDigits = (f.contactNo || '').replace(/\D/g, '');
    const fHead = (f.headName || '').toLowerCase().trim();
    const fFamily = (f.familyName || '').toLowerCase().trim();

    return (
      fUser === q ||
      fUser === cleanQ ||
      fCard === q ||
      fCard === cleanQ ||
      (!isNaN(queryInt) && !isNaN(fCardInt) && queryInt === fCardInt) ||
      `qoas${fCard}` === q ||
      `qoas-card-${fCard}` === q ||
      `qoas-${fCard}` === q ||
      `card ${fCard}` === q ||
      `card-${fCard}` === q ||
      `${fUser}@queenofallsaints.in` === q ||
      `${fCard}@queenofallsaints.in` === q ||
      (digitsOnly && fPhoneDigits && digitsOnly.length >= 7 && fPhoneDigits.includes(digitsOnly)) ||
      (fHead && (fHead === q || fHead === cleanQ || (cleanQ.length > 2 && fHead.includes(cleanQ)))) ||
      (fFamily && (fFamily === q || fFamily === cleanQ || (cleanQ.length > 2 && fFamily.includes(cleanQ))))
    );
  });
}

/**
 * Creates a dedicated, dynamic family record for any custom or new family number
 * guaranteeing that every login has a distinct profile.
 */
export function createDynamicFamilyRecord(query: string): ParishFamilyRecord {
  const raw = query.trim();
  const clean = raw
    .replace(/^qoas-card-|^card-|^card\s*|^qoas-?\d{4}-?|^qoas-?|^qoas/i, '')
    .replace('@queenofallsaints.in', '')
    .trim() || raw;
  const cardNo = clean || '101';

  return {
    sNo: 9999,
    cardNo,
    username: `qoas${cardNo.toLowerCase().replace(/\s+/g, '')}`,
    defaultPassword: 'Family@QOAS2026!',
    familyName: `Family Card #${cardNo}`,
    headName: `Parishioner (Card #${cardNo})`,
    spouseName: null,
    contactNo: '+91 94421 00000',
    alternateContact: '',
    address: 'Queen of All Saints Parish, Tiruchirappalli',
    anbiyam: 'St. Augustine',
  };
}

/**
 * Retrieves existing family record or dynamically builds a unique one.
 */
export function getOrCreateFamilyRecord(query: string): ParishFamilyRecord {
  const existing = findFamilyByUsernameOrCard(query);
  if (existing) return existing;
  return createDynamicFamilyRecord(query);
}

export function searchParishFamilies(term: string): ParishFamilyRecord[] {
  if (!term.trim()) return ALL_PARISH_FAMILIES;
  const q = term.toLowerCase().trim();
  return ALL_PARISH_FAMILIES.filter(
    (f) =>
      f.familyName.toLowerCase().includes(q) ||
      f.headName.toLowerCase().includes(q) ||
      (f.spouseName && f.spouseName.toLowerCase().includes(q)) ||
      f.cardNo.toLowerCase().includes(q) ||
      f.username.toLowerCase().includes(q) ||
      f.contactNo.toLowerCase().includes(q) ||
      f.anbiyam.toLowerCase().includes(q) ||
      f.address.toLowerCase().includes(q),
  );
}


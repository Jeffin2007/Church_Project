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
  const q = query.toLowerCase().trim();
  return ALL_PARISH_FAMILIES.find(
    (f) =>
      f.username.toLowerCase() === q ||
      f.cardNo.toLowerCase() === q ||
      `qoas${f.cardNo}`.toLowerCase() === q,
  );
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

export interface FamilyDataRecord {
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

import stAugustineData from '../../apps/api/prisma/data/st-augustine.json';
import stTheresaData from '../../apps/api/prisma/data/st-theresa.json';
import stAnthonyData from '../../apps/api/prisma/data/st-anthony.json';
import stCeciliaData from '../../apps/api/prisma/data/st-cecilia.json';
import stNorbertData from '../../apps/api/prisma/data/st-norbert.json';
import infantJesusData from '../../apps/api/prisma/data/infant-jesus.json';
import stXavierData from '../../apps/api/prisma/data/st-xavier.json';
import stAlphonsaData from '../../apps/api/prisma/data/st-alphonsa.json';
import jmjData from '../../apps/api/prisma/data/jmj.json';
import stJohnDeBrittoData from '../../apps/api/prisma/data/st-john-de-britto.json';
import angloIndianData from '../../apps/api/prisma/data/anglo-indian.json';
import stJosephData from '../../apps/api/prisma/data/st-joseph.json';
import gandhiNagarData from '../../apps/api/prisma/data/gandhi-nagar.json';

export const ALL_FAMILIES_DATA: FamilyDataRecord[] = [
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

export const ANBIYAMS_DATA_MAP: Record<string, FamilyDataRecord[]> = {
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

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

import stAugustineData from './data/st-augustine.json';
import stTheresaData from './data/st-theresa.json';
import stAnthonyData from './data/st-anthony.json';
import stCeciliaData from './data/st-cecilia.json';
import stNorbertData from './data/st-norbert.json';
import infantJesusData from './data/infant-jesus.json';
import stXavierData from './data/st-xavier.json';
import stAlphonsaData from './data/st-alphonsa.json';
import jmjData from './data/jmj.json';
import stJohnDeBrittoData from './data/st-john-de-britto.json';
import angloIndianData from './data/anglo-indian.json';
import stJosephData from './data/st-joseph.json';
import gandhiNagarData from './data/gandhi-nagar.json';

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
  jmj: jmjData,
  'st-john-de-britto': stJohnDeBrittoData,
  'anglo-indian': angloIndianData,
  'st-joseph': stJosephData,
  'gandhi-nagar': gandhiNagarData,
};

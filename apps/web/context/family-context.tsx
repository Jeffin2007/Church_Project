'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useNotifications } from './notification-context';
import { getActiveSession } from '@/lib/auth';
import { findFamilyByUsernameOrCard } from '@/lib/parish-families';

export interface SacramentDetail {
  completed: boolean;
  date: string;
  church: string;
  parish?: string;
  diocese?: string;
  spouseName?: string;
}

export interface MemberDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
  uploadedAt: string;
}

export interface DetailedFamilyMember {
  id: string;
  name: string;
  tamilName?: string;
  preferredName?: string;
  relation:
    | 'Head of Family'
    | 'Spouse'
    | 'Son'
    | 'Daughter'
    | 'Father'
    | 'Mother'
    | 'Brother'
    | 'Sister'
    | 'Grandfather'
    | 'Grandmother'
    | 'Grandson'
    | 'Granddaughter'
    | 'Son-in-Law / Daughter-in-Law'
    | 'Relative'
    | 'Other';
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  placeOfBirth?: string;
  community?: string;
  nationality?: string;
  maritalStatus:
    | 'Single'
    | 'Married (Church)'
    | 'Married (Civil)'
    | 'Widowed'
    | 'Divorced'
    | 'Religious / Clergy';
  phone: string;
  alternatePhone?: string;
  email: string;
  address?: string;
  city?: string;
  pincode?: string;
  isFamilyHead?: boolean;
  isLivingWithFamily?: boolean;
  parentGuardian?: string;
  schoolInstitution?: string;

  // Education & Work
  educationLevel?: string;
  courseDegree?: string;
  yearOfStudy?: string;
  occupation: string;
  employmentStatus?: string;
  employer?: string;
  designation?: string;

  // Church Jurisdiction
  religion: string;
  denomination: string;
  nativeParish: string;
  diocese: string;

  // Sacraments
  baptism: SacramentDetail & { registerNo?: string; certificateAvailable?: boolean };
  firstCommunion: SacramentDetail & { registerNo?: string };
  confirmation: SacramentDetail & { registerNo?: string };
  marriage: SacramentDetail & { registerNo?: string; certificateAvailable?: boolean };
  holyOrders: {
    type: 'NONE' | 'PRIEST' | 'DEACON';
    date: string;
    church?: string;
    parish?: string;
  };
  religiousProfession: {
    type: 'NONE' | 'BROTHER' | 'SISTER' | 'SEMINARIAN';
    congregation: string;
    seminary: string;
    date?: string;
    church?: string;
    parish?: string;
  };
  anointingOfSick: {
    received: boolean;
    date: string;
    church?: string;
    parish?: string;
  };

  // Pastoral Engagement Badges & Roles
  isCatechismStudent: boolean;
  isChoirMember: boolean;
  isMinistryMember: boolean;
  isVolunteer: boolean;
  isYouthMember: boolean;
  isAltarServer: boolean;
  isLegionOfMary: boolean;
  isVincentDePaul: boolean;
  isFamilyPrayerGroup: boolean;
  anbiyamRole?: string;
  ministryInvolvement?: string;
  choirInvolvement?: string;
  catechismInvolvement?: string;
  youthInvolvement?: string;
  otherParishService?: string;

  // Documents Attached
  documents?: MemberDocument[];

  // Medical & Emergency (Pastoral Care)
  bloodGroup: string;
  emergencyContact: string;
  specialNeeds: string;
  elderlyAssistance: boolean;
  homeCommunionRequired: boolean;
  bedridden: boolean;
}

export interface ParishFamilyProfile {
  familyNumber: string;
  name: string;
  registeredSince: string;
  headName: string;
  spouseName: string;
  address: string;
  landmark: string;
  ward: string;
  pincode: string;
  headPhone: string;
  alternatePhone: string;
  headEmail: string;
  preferredLanguage: 'English' | 'Tamil';
  religion:
    | 'Catholic Christian'
    | 'Hindu'
    | 'Muslim'
    | 'Jain'
    | 'Sikh'
    | 'Buddhist'
    | 'Other Christian Denomination';
  otherChristianDenomination?:
    'CSI' | 'Orthodox' | 'Pentecostal' | 'Anglican' | 'Lutheran' | 'Independent Church' | 'Other';
  communityCaste?:
    'OC' | 'BC' | 'BCM' | 'MBC' | 'SC' | 'SCA' | 'ST' | 'Other' | 'Prefer Not to Say';

  // Parish Registration Information
  nativeParish: string;
  diocese: string;
  status: 'Active' | 'Temporarily Away' | 'Moved' | 'Inactive';

  // Anbiyam Assignment & Pending Transfer Request
  anbiyam: string;
  anbiyamTransferStatus: 'NONE' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  anbiyamRequestedChange?: string;
  anbiyamRequestReason?: string;

  // Pastoral & Census Collection
  occupationHead: string;
  occupationSpouse: string;
  housingType: 'Own House' | 'Rental';
  migratedFrom: string;
  monthlyVisitRequired: boolean;
  houseBlessingCompleted: boolean;
  lastHouseBlessingDate: string;
  familyPrayerConducted: boolean;
  parishCensusCompleted: boolean;
  remarks: string;

  // Contact & Subscriptions
  receivesParishMagazine: boolean;
  whatsAppAvailable: boolean;
  emergencyContactName: string;
  emergencyContactPhone: string;
  weddingAnniversary: string;
}

export interface PriestAppointmentItem {
  id: string;
  priestName: string;
  purpose: string;
  date: string;
  timeSlot: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

export interface SacramentRequestItem {
  id: string;
  certificateType: string;
  memberName: string;
  purpose: string;
  submittedOn: string;
  status: 'PENDING_REVIEW' | 'PROCESSING' | 'READY_FOR_PICKUP' | 'COMPLETED';
}

export interface MassIntentionItem {
  id: string;
  requestType:
    | 'Thanksgiving Mass'
    | 'Birthday Intention'
    | 'Wedding Anniversary'
    | 'Death Anniversary'
    | 'Repose of the Soul'
    | 'Special Intention'
    | 'Health & Healing'
    | 'Examination'
    | 'Family Blessing'
    | 'Other';
  personName: string;
  title: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
  language: 'English' | 'Tamil';
  familyNumber: string;
  familyName: string;
  headName: string;
  mobileNumber: string;
  offeringAmount: number;
  paymentStatus: 'PAID' | 'PENDING';
  transactionId: string;
  status: 'PENDING_CONFIRMATION' | 'APPROVED' | 'REJECTED' | 'MASS_SCHEDULED' | 'COMPLETED';
  assignedMassDate?: string;
  assignedPriest?: string;
  createdAt: string;
}

export interface HomeCommunionItem {
  id: string;
  familyNumber: string;
  familyName: string;
  address: string;
  patientName: string;
  relationship: string;
  age: number;
  mobileNumber: string;
  homePhone?: string;
  reason: 'Elderly' | 'Sick' | 'Bedridden' | 'Recovering after Surgery' | 'Disability' | 'Other';
  preferredDate: string;
  preferredTime: string;
  additionalNotes: string;
  status: 'PENDING_VISIT' | 'VISITED' | 'COMPLETED' | 'CANCELLED';
  assignedPriest?: string;
  createdAt: string;
}

export interface HouseBlessingItem {
  id: string;
  familyNumber: string;
  familyName: string;
  familyMemberName: string;
  newAddress: string;
  landmark: string;
  mobileNumber: string;
  preferredDate: string;
  notes: string;
  status: 'PENDING_SCHEDULING' | 'SCHEDULED' | 'COMPLETED';
  createdAt: string;
}

export interface FamilyPrayerItem {
  id: string;
  familyNumber: string;
  familyName: string;
  category:
    'Healing' | 'Family' | 'Thanksgiving' | 'Examination' | 'Employment' | 'Travel' | 'Other';
  intentionDetails: string;
  keepAnonymous: boolean;
  status: 'SUBMITTED' | 'PRAYED' | 'INCLUDED_IN_MASS' | 'COMPLETED';
  createdAt: string;
}

export interface ParishEventItem {
  id: string;
  title: string;
  category:
    | 'Retreat'
    | 'Youth Camp'
    | 'Catechism Camp'
    | 'Pilgrimage'
    | 'Feast Volunteer'
    | 'Bible Convention';
  date: string;
  time: string;
  venue: string;
  description: string;
  registered: boolean;
  registeredMemberName?: string;
  passCode?: string;
}

export interface CategorizedPaymentItem {
  id: string;
  category:
    | 'Church Tax'
    | 'Sunday Offering'
    | 'Mass Intention'
    | 'Building Fund'
    | 'Charity'
    | 'Feast Contribution'
    | 'Special Donation';
  description: string;
  amount: number;
  date: string;
  status: 'PAID' | 'PENDING';
  receiptNumber: string;
}

const INITIAL_FAMILY_PROFILE: ParishFamilyProfile = buildDefaultFamilyProfile(ALL_PARISH_FAMILIES[0]!);

const INITIAL_FAMILY_MEMBERS: DetailedFamilyMember[] = buildDefaultFamilyHeadMember(ALL_PARISH_FAMILIES[0]!);

const INITIAL_HOUSE_BLESSINGS: HouseBlessingItem[] = [];

const INITIAL_PRAYER_REQUESTS: FamilyPrayerItem[] = [];

const INITIAL_PARISH_EVENTS: ParishEventItem[] = [];

const INITIAL_CATEGORIZED_PAYMENTS: CategorizedPaymentItem[] = [];

const INITIAL_MASS_INTENTIONS: MassIntentionItem[] = [];

const INITIAL_HOME_COMMUNION: HomeCommunionItem[] = [];

const INITIAL_SACRAMENT_REQUESTS: SacramentRequestItem[] = [];

interface FamilyContextType {
  family: ParishFamilyProfile;
  members: DetailedFamilyMember[];
  appointments: PriestAppointmentItem[];
  requests: SacramentRequestItem[];
  massIntentions: MassIntentionItem[];
  homeCommunionVisits: HomeCommunionItem[];
  houseBlessings: HouseBlessingItem[];
  prayerRequests: FamilyPrayerItem[];
  events: ParishEventItem[];
  payments: CategorizedPaymentItem[];

  updateFamilyProfile: (updatedFields: Partial<ParishFamilyProfile>) => void;
  requestAnbiyamChange: (targetAnbiyam: string, reason?: string) => void;
  approveAnbiyamChange: () => void;
  rejectAnbiyamChange: () => void;
  updateMember: (memberId: string, updatedFields: Partial<DetailedFamilyMember>) => void;
  addMember: (newMember: Omit<DetailedFamilyMember, 'id'>) => void;
  deleteMember: (memberId: string) => void;

  addAppointment: (appointment: Omit<PriestAppointmentItem, 'id' | 'status'>) => void;
  addSacramentRequest: (req: Omit<SacramentRequestItem, 'id' | 'submittedOn' | 'status'>) => void;
  addMassIntention: (
    item: Omit<MassIntentionItem, 'id' | 'createdAt' | 'status'>,
    receiptNumber?: string,
  ) => void;
  updateMassIntentionStatus: (
    id: string,
    status: MassIntentionItem['status'],
    assignedMassDate?: string,
    assignedPriest?: string,
  ) => void;
  addHomeCommunionRequest: (item: Omit<HomeCommunionItem, 'id' | 'createdAt' | 'status'>) => void;
  updateHomeCommunionStatus: (
    id: string,
    status: HomeCommunionItem['status'],
    assignedPriest?: string,
  ) => void;

  addHouseBlessingRequest: (item: Omit<HouseBlessingItem, 'id' | 'createdAt' | 'status'>) => void;
  updateHouseBlessingStatus: (id: string, status: HouseBlessingItem['status']) => void;

  addPrayerRequest: (item: Omit<FamilyPrayerItem, 'id' | 'createdAt' | 'status'>) => void;
  updatePrayerRequestStatus: (id: string, status: FamilyPrayerItem['status']) => void;

  registerForEvent: (eventId: string, memberName: string) => void;
  cancelEventRegistration: (eventId: string) => void;

  addPayment: (
    item: Omit<CategorizedPaymentItem, 'id' | 'receiptNumber'> & { receiptNumber?: string },
  ) => void;

  sacramentalSummary: {
    totalMembers: number;
    activeMembers: number;
    baptizedCount: number;
    firstCommunionCount: number;
    confirmedCount: number;
    marriedCouplesCount: number;
    priestsCount: number;
    deaconsCount: number;
    sistersCount: number;
    seminariansCount: number;
    houseBlessingStatus: boolean;
  };
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

const buildDefaultFamilyProfile = (matched: import('@/lib/parish-families').ParishFamilyRecord): ParishFamilyProfile => {
  const anbiyamName =
    matched.anbiyam.includes('Anbiyam') ||
    matched.anbiyam.includes('Community') ||
    matched.anbiyam.includes('Sub-station')
      ? matched.anbiyam
      : `${matched.anbiyam} Anbiyam`;

  return {
    familyNumber: `QOAS-CARD-${matched.cardNo}`,
    name: `${matched.headName} Family`,
    registeredSince: '2015',
    headName: matched.headName,
    spouseName: matched.spouseName || '',
    address: matched.address || 'Queen of All Saints Parish, Tiruchirappalli',
    landmark: `${anbiyamName} Sector`,
    ward: `${matched.anbiyam} Ward`,
    pincode: '620001',
    headPhone: matched.contactNo || '+91 94421 00000',
    alternatePhone: matched.alternateContact || '',
    headEmail: `${matched.username}@queenofallsaints.in`,
    preferredLanguage: 'Tamil',
    religion: 'Catholic Christian',
    communityCaste: 'BC',
    nativeParish: 'Queen of All Saints Church, Crawford',
    diocese: 'Diocese of Tiruchirapalli',
    status: 'Active',
    anbiyam: anbiyamName,
    anbiyamTransferStatus: 'NONE',
    occupationHead: 'Service / Business',
    occupationSpouse: matched.spouseName ? 'Homemaker / Service' : '',
    housingType: 'Own House',
    migratedFrom: 'Tiruchirappalli',
    monthlyVisitRequired: false,
    houseBlessingCompleted: true,
    lastHouseBlessingDate: '2026-01-15',
    familyPrayerConducted: true,
    parishCensusCompleted: true,
    remarks: `Active parish family under ${anbiyamName}.`,
    receivesParishMagazine: true,
    whatsAppAvailable: true,
    emergencyContactName: matched.headName,
    emergencyContactPhone: matched.contactNo || '',
    weddingAnniversary: '',
  };
};

const buildDefaultFamilyHeadMember = (matched: import('@/lib/parish-families').ParishFamilyRecord): DetailedFamilyMember[] => [
  {
    id: `mem-${matched.cardNo}-1`,
    name: matched.headName,
    tamilName: '',
    relation: 'Head of Family',
    dob: '1982-05-15',
    gender: 'MALE',
    maritalStatus: matched.spouseName ? 'Married (Church)' : 'Single',
    phone: matched.contactNo,
    email: `${matched.username}@queenofallsaints.in`,
    occupation: 'Service / Business',
    religion: 'Catholic Christian',
    denomination: 'Roman Catholic (Latin Rite)',
    nativeParish: 'Queen of All Saints Church, Crawford',
    diocese: 'Diocese of Tiruchirapalli',
    isFamilyHead: true,
    isLivingWithFamily: true,
    baptism: {
      completed: true,
      date: '1982-06-15',
      church: 'Queen of All Saints Church',
    },
    firstCommunion: {
      completed: true,
      date: '1992-05-20',
      church: 'Queen of All Saints Church',
    },
    confirmation: {
      completed: true,
      date: '1996-11-20',
      church: 'Queen of All Saints Church',
    },
    marriage: {
      completed: !!matched.spouseName,
      date: matched.spouseName ? '2008-05-18' : '',
      church: matched.spouseName ? 'Queen of All Saints Church' : '',
      spouseName: matched.spouseName || undefined,
    },
    holyOrders: { type: 'NONE', date: '' },
    religiousProfession: { type: 'NONE', congregation: '', seminary: '' },
    anointingOfSick: { received: false, date: '' },
    isCatechismStudent: false,
    isChoirMember: false,
    isMinistryMember: false,
    isVolunteer: true,
    isYouthMember: false,
    isAltarServer: false,
    isLegionOfMary: false,
    isVincentDePaul: false,
    isFamilyPrayerGroup: true,
    bloodGroup: 'B+',
    emergencyContact: matched.contactNo,
    specialNeeds: 'None',
    elderlyAssistance: false,
    homeCommunionRequired: false,
    bedridden: false,
  },
];

export function FamilyProvider({ children }: { children: ReactNode }) {
  const [activeFamilyKey, setActiveFamilyKey] = useState<string>('default');
  const [family, setFamily] = useState<ParishFamilyProfile>(INITIAL_FAMILY_PROFILE);
  const [members, setMembers] = useState<DetailedFamilyMember[]>(INITIAL_FAMILY_MEMBERS);
  const [appointments, setAppointments] = useState<PriestAppointmentItem[]>([]);
  const [requests, setRequests] = useState<SacramentRequestItem[]>(INITIAL_SACRAMENT_REQUESTS);
  const [massIntentions, setMassIntentions] = useState<MassIntentionItem[]>(INITIAL_MASS_INTENTIONS);
  const [homeCommunionVisits, setHomeCommunionVisits] = useState<HomeCommunionItem[]>(INITIAL_HOME_COMMUNION);
  const [houseBlessings, setHouseBlessings] = useState<HouseBlessingItem[]>(INITIAL_HOUSE_BLESSINGS);
  const [prayerRequests, setPrayerRequests] = useState<FamilyPrayerItem[]>(INITIAL_PRAYER_REQUESTS);
  const [events, setEvents] = useState<ParishEventItem[]>(INITIAL_PARISH_EVENTS);
  const [payments, setPayments] = useState<CategorizedPaymentItem[]>(INITIAL_CATEGORIZED_PAYMENTS);

  const { addNotification } = useNotifications();

  // Load from isolated localStorage and synchronize authenticated family
  useEffect(() => {
    try {
      const session = getActiveSession();
      let key = 'default';
      let matchedFam: import('@/lib/parish-families').ParishFamilyRecord | undefined;

      if (session) {
        const lookup = session.familyId || session.email.split('@')[0];
        matchedFam = findFamilyByUsernameOrCard(lookup);
        if (matchedFam) {
          key = `fam_${matchedFam.cardNo}`;
        }
      }

      setActiveFamilyKey(key);

      const sf = localStorage.getItem(`qoas_${key}_family_profile_v6`);
      if (sf) {
        setFamily(JSON.parse(sf));
      } else if (matchedFam) {
        setFamily(buildDefaultFamilyProfile(matchedFam));
      } else {
        setFamily(INITIAL_FAMILY_PROFILE);
      }

      const sm = localStorage.getItem(`qoas_${key}_family_members_v6`);
      if (sm) {
        setMembers(JSON.parse(sm));
      } else if (matchedFam) {
        setMembers(buildDefaultFamilyHeadMember(matchedFam));
      } else {
        setMembers(INITIAL_FAMILY_MEMBERS);
      }

      const shb = localStorage.getItem(`qoas_${key}_house_blessings_v6`);
      if (shb) setHouseBlessings(JSON.parse(shb));

      const spr = localStorage.getItem(`qoas_${key}_prayers_v6`);
      if (spr) setPrayerRequests(JSON.parse(spr));

      const sev = localStorage.getItem(`qoas_${key}_events_v6`);
      if (sev) setEvents(JSON.parse(sev));

      const spay = localStorage.getItem(`qoas_${key}_payments_v6`);
      if (spay) setPayments(JSON.parse(spay));

      const smi = localStorage.getItem(`qoas_${key}_mass_intentions_v6`);
      if (smi) setMassIntentions(JSON.parse(smi));

      const shc = localStorage.getItem(`qoas_${key}_home_communion_v6`);
      if (shc) setHomeCommunionVisits(JSON.parse(shc));

      const sreq = localStorage.getItem(`qoas_${key}_sacrament_requests_v6`);
      if (sreq) setRequests(JSON.parse(sreq));

      const sapt = localStorage.getItem(`qoas_${key}_appointments_v6`);
      if (sapt) setAppointments(JSON.parse(sapt));
    } catch {
      // Fallback
    }
  }, []);

  // Save to isolated localStorage
  useEffect(() => {
    if (!activeFamilyKey) return;
    try {
      localStorage.setItem(`qoas_${activeFamilyKey}_family_profile_v6`, JSON.stringify(family));
      localStorage.setItem(`qoas_${activeFamilyKey}_family_members_v6`, JSON.stringify(members));
      localStorage.setItem(`qoas_${activeFamilyKey}_house_blessings_v6`, JSON.stringify(houseBlessings));
      localStorage.setItem(`qoas_${activeFamilyKey}_prayers_v6`, JSON.stringify(prayerRequests));
      localStorage.setItem(`qoas_${activeFamilyKey}_events_v6`, JSON.stringify(events));
      localStorage.setItem(`qoas_${activeFamilyKey}_payments_v6`, JSON.stringify(payments));
      localStorage.setItem(`qoas_${activeFamilyKey}_mass_intentions_v6`, JSON.stringify(massIntentions));
      localStorage.setItem(`qoas_${activeFamilyKey}_home_communion_v6`, JSON.stringify(homeCommunionVisits));
      localStorage.setItem(`qoas_${activeFamilyKey}_sacrament_requests_v6`, JSON.stringify(requests));
      localStorage.setItem(`qoas_${activeFamilyKey}_appointments_v6`, JSON.stringify(appointments));
    } catch {
      // Fallback
    }
  }, [activeFamilyKey, family, members, houseBlessings, prayerRequests, events, payments, massIntentions, homeCommunionVisits, requests, appointments]);

  const updateFamilyProfile = (updatedFields: Partial<ParishFamilyProfile>) => {
    setFamily((prev) => ({ ...prev, ...updatedFields }));
    addNotification({
      title: 'Family Profile Saved',
      message: 'Parish register profile & contact details updated successfully.',
      type: 'SYSTEM',
      priority: 'LOW',
    });
  };

  const requestAnbiyamChange = (targetAnbiyam: string, reason?: string) => {
    setFamily((prev) => ({
      ...prev,
      anbiyamTransferStatus: 'PENDING_APPROVAL',
      anbiyamRequestedChange: targetAnbiyam,
      anbiyamRequestReason: reason || 'Family requested ward re-assignment',
    }));
    addNotification({
      title: 'Anbiyam Transfer Submitted',
      message: `Request to transfer to ${targetAnbiyam} submitted to Parish Office.`,
      type: 'ANNOUNCEMENT',
      priority: 'NORMAL',
    });
  };

  const approveAnbiyamChange = () => {
    if (!family.anbiyamRequestedChange) return;
    const newAnbiyam = family.anbiyamRequestedChange;
    setFamily((prev) => ({
      ...prev,
      anbiyam: newAnbiyam,
      anbiyamTransferStatus: 'APPROVED',
      anbiyamRequestedChange: undefined,
      anbiyamRequestReason: undefined,
    }));
  };

  const rejectAnbiyamChange = () => {
    setFamily((prev) => ({
      ...prev,
      anbiyamTransferStatus: 'REJECTED',
      anbiyamRequestedChange: undefined,
      anbiyamRequestReason: undefined,
    }));
  };

  const updateMember = async (memberId: string, updatedFields: Partial<DetailedFamilyMember>) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, ...updatedFields } : m)));
    try {
      await fetch(`/api/v1/family/members/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updatedFields.name,
          tamilName: updatedFields.tamilName,
          preferredName: updatedFields.preferredName,
          relation: updatedFields.relation,
          dateOfBirth: updatedFields.dob,
          gender: updatedFields.gender,
          placeOfBirth: updatedFields.placeOfBirth,
          phone: updatedFields.phone,
          alternatePhone: updatedFields.alternatePhone,
          email: updatedFields.email,
          address: updatedFields.address,
          city: updatedFields.city,
          pincode: updatedFields.pincode,
          isFamilyHead: updatedFields.isFamilyHead,
          isLivingWithFamily: updatedFields.isLivingWithFamily,
          parentGuardian: updatedFields.parentGuardian,
          schoolInstitution: updatedFields.schoolInstitution,
          educationLevel: updatedFields.educationLevel,
          courseDegree: updatedFields.courseDegree,
          yearOfStudy: updatedFields.yearOfStudy,
          occupation: updatedFields.occupation,
          maritalStatus: updatedFields.maritalStatus === 'Married (Church)' ? 'MARRIED' : 'SINGLE',
          isBaptized: updatedFields.baptism?.completed,
          baptismDate: updatedFields.baptism?.date,
          baptismParish: updatedFields.baptism?.church,
          receivedFirstCommunion: updatedFields.firstCommunion?.completed,
          firstHolyCommunionDate: updatedFields.firstCommunion?.date,
          firstHolyCommunionParish: updatedFields.firstCommunion?.church,
          isConfirmed: updatedFields.confirmation?.completed,
          confirmationDate: updatedFields.confirmation?.date,
          confirmationParish: updatedFields.confirmation?.church,
          isMarried: updatedFields.marriage?.completed,
          marriageDate: updatedFields.marriage?.date,
          spouseName: updatedFields.marriage?.spouseName,
          marriageParish: updatedFields.marriage?.church,
          documents: updatedFields.documents,
        }),
      });
    } catch {}
  };

  const addMember = async (newMember: Omit<DetailedFamilyMember, 'id'>) => {
    const member: DetailedFamilyMember = {
      ...newMember,
      id: `mem-${Date.now()}`,
    };
    setMembers((prev) => [...prev, member]);

    try {
      const res = await fetch('/api/v1/family/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          familyId: family.familyNumber || 'QOAS-2024-0001',
          name: newMember.name,
          tamilName: newMember.tamilName,
          preferredName: newMember.preferredName,
          relation: newMember.relation,
          gender: newMember.gender,
          dateOfBirth: newMember.dob,
          placeOfBirth: newMember.placeOfBirth,
          community: newMember.community,
          phone: newMember.phone,
          alternatePhone: newMember.alternatePhone,
          email: newMember.email,
          address: newMember.address,
          city: newMember.city,
          pincode: newMember.pincode,
          isFamilyHead: newMember.isFamilyHead,
          isLivingWithFamily: newMember.isLivingWithFamily,
          parentGuardian: newMember.parentGuardian,
          schoolInstitution: newMember.schoolInstitution,
          educationLevel: newMember.educationLevel,
          courseDegree: newMember.courseDegree,
          yearOfStudy: newMember.yearOfStudy,
          occupation: newMember.occupation,
          maritalStatus: newMember.maritalStatus === 'Married (Church)' ? 'MARRIED' : 'SINGLE',
          isBaptized: newMember.baptism?.completed,
          baptismDate: newMember.baptism?.date,
          baptismParish: newMember.baptism?.church,
          receivedFirstCommunion: newMember.firstCommunion?.completed,
          firstHolyCommunionDate: newMember.firstCommunion?.date,
          firstHolyCommunionParish: newMember.firstCommunion?.church,
          isConfirmed: newMember.confirmation?.completed,
          confirmationDate: newMember.confirmation?.date,
          confirmationParish: newMember.confirmation?.church,
          isMarried: newMember.marriage?.completed,
          marriageDate: newMember.marriage?.date,
          spouseName: newMember.marriage?.spouseName,
          marriageParish: newMember.marriage?.church,
          documents: newMember.documents,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.id) {
          setMembers((prev) => prev.map((m) => (m.id === member.id ? { ...m, id: data.id } : m)));
        }
      }
    } catch {}
  };

  const deleteMember = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    fetch(`/api/v1/family/members/${memberId}`, { method: 'DELETE' }).catch(() => {});
  };

  const addAppointment = (appointment: Omit<PriestAppointmentItem, 'id' | 'status'>) => {
    const newApt: PriestAppointmentItem = {
      ...appointment,
      id: `APT-${Date.now().toString().slice(-4)}`,
      status: 'SCHEDULED',
    };
    setAppointments((prev) => [newApt, ...prev]);
    addNotification({
      title: 'Appointment Scheduled',
      message: `Appointment with ${appointment.priestName} booked for ${appointment.date}.`,
      type: 'SYSTEM',
      priority: 'NORMAL',
    });
  };

  const addSacramentRequest = (
    req: Omit<SacramentRequestItem, 'id' | 'submittedOn' | 'status'>,
  ) => {
    const newReq: SacramentRequestItem = {
      ...req,
      id: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      submittedOn: new Date().toISOString().slice(0, 10),
      status: 'PENDING_REVIEW',
    };
    setRequests((prev) => [newReq, ...prev]);
  };

  const addMassIntention = (
    item: Omit<MassIntentionItem, 'id' | 'createdAt' | 'status'>,
    receiptNumber?: string,
  ) => {
    const newItem: MassIntentionItem = {
      ...item,
      id: `MASS-${Date.now()}`,
      status: 'PENDING_CONFIRMATION',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setMassIntentions((prev) => [newItem, ...prev]);
    addNotification({
      title: 'Mass Intention Requested - Pending Priest Confirmation',
      message: `Mass Intention for ${item.personName} (${item.requestType}) on ${item.preferredDate} recorded. Status: Pending Priest Confirmation. Verified Receipt: ${receiptNumber || 'RCP-VERIFIED'}`,
      type: 'SACRAMENT',
      priority: 'HIGH',
    });
  };

  const updateMassIntentionStatus = (
    id: string,
    status: MassIntentionItem['status'],
    assignedMassDate?: string,
    assignedPriest?: string,
  ) => {
    setMassIntentions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              assignedMassDate: assignedMassDate || item.assignedMassDate,
              assignedPriest: assignedPriest || item.assignedPriest,
            }
          : item,
      ),
    );
  };

  const addHomeCommunionRequest = (
    item: Omit<HomeCommunionItem, 'id' | 'createdAt' | 'status'>,
  ) => {
    const newItem: HomeCommunionItem = {
      ...item,
      id: `HC-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'PENDING_VISIT',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setHomeCommunionVisits((prev) => [newItem, ...prev]);
    addNotification({
      title: 'Home Communion Visit Requested',
      message: `Visit requested for ${item.patientName} (${item.reason}).`,
      type: 'ANNOUNCEMENT',
      priority: 'HIGH',
    });
  };

  const updateHomeCommunionStatus = (
    id: string,
    status: HomeCommunionItem['status'],
    assignedPriest?: string,
  ) => {
    setHomeCommunionVisits((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              assignedPriest: assignedPriest || item.assignedPriest,
            }
          : item,
      ),
    );
  };

  const addHouseBlessingRequest = (
    item: Omit<HouseBlessingItem, 'id' | 'createdAt' | 'status'>,
  ) => {
    const newItem: HouseBlessingItem = {
      ...item,
      id: `HB-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'PENDING_SCHEDULING',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setHouseBlessings((prev) => [newItem, ...prev]);
    addNotification({
      title: 'House Blessing Request Submitted',
      message: `House blessing requested for ${item.newAddress}. Status: Pending Scheduling.`,
      type: 'SYSTEM',
      priority: 'HIGH',
    });
  };

  const updateHouseBlessingStatus = (id: string, status: HouseBlessingItem['status']) => {
    setHouseBlessings((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    addNotification({
      title: 'House Blessing Status Updated',
      message: `House blessing ${id} marked as ${status}.`,
      type: 'SYSTEM',
      priority: 'NORMAL',
    });
  };

  const addPrayerRequest = (item: Omit<FamilyPrayerItem, 'id' | 'createdAt' | 'status'>) => {
    const newItem: FamilyPrayerItem = {
      ...item,
      id: `PR-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setPrayerRequests((prev) => [newItem, ...prev]);
    addNotification({
      title: 'Family Prayer Intention Submitted',
      message: `Prayer request (${item.category}) submitted to Parish Priest.`,
      type: 'SYSTEM',
      priority: 'NORMAL',
    });
  };

  const updatePrayerRequestStatus = (id: string, status: FamilyPrayerItem['status']) => {
    setPrayerRequests((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    addNotification({
      title: 'Prayer Intention Updated',
      message: `Prayer request marked as ${status.replace(/_/g, ' ')}.`,
      type: 'SYSTEM',
      priority: 'NORMAL',
    });
  };

  const registerForEvent = (eventId: string, memberName: string) => {
    const pass = `PASS-${Math.floor(1000 + Math.random() * 9000)}`;
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId
          ? { ...ev, registered: true, registeredMemberName: memberName, passCode: pass }
          : ev,
      ),
    );
    addNotification({
      title: 'Parish Event Registration Successful',
      message: `Registered for event. Pass Code: ${pass}`,
      type: 'SYSTEM',
      priority: 'HIGH',
    });
  };

  const cancelEventRegistration = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId
          ? { ...ev, registered: false, registeredMemberName: undefined, passCode: undefined }
          : ev,
      ),
    );
    addNotification({
      title: 'Event Registration Cancelled',
      message: 'Parish event registration cancelled.',
      type: 'SYSTEM',
      priority: 'LOW',
    });
  };

  const addPayment = (
    item: Omit<CategorizedPaymentItem, 'id' | 'receiptNumber'> & { receiptNumber?: string },
  ) => {
    const rcpNumber = item.receiptNumber || 'RCP-VERIFIED';
    const newPay: CategorizedPaymentItem = {
      ...item,
      id: `PAY-${Date.now()}`,
      receiptNumber: rcpNumber,
    };
    setPayments((prev) => [newPay, ...prev]);
    addNotification({
      title: 'Payment Verified (Razorpay)',
      message: `Contribution of ₹${item.amount} (${item.category}) verified by Razorpay. Official Receipt: ${rcpNumber}`,
      type: 'PAYMENT',
      priority: 'HIGH',
    });
  };

  const sacramentalSummary = useMemo(() => {
    const totalMembers = members.length;
    const activeMembers = members.filter((m) => m.maritalStatus !== 'Divorced').length;
    const baptizedCount = members.filter((m) => m.baptism.completed).length;
    const firstCommunionCount = members.filter((m) => m.firstCommunion.completed).length;
    const confirmedCount = members.filter((m) => m.confirmation.completed).length;
    const marriedCouplesCount =
      Math.floor(members.filter((m) => m.marriage.completed).length / 2) || 1;
    const priestsCount = members.filter((m) => m.holyOrders.type === 'PRIEST').length;
    const deaconsCount = members.filter((m) => m.holyOrders.type === 'DEACON').length;
    const sistersCount = members.filter((m) => m.religiousProfession.type === 'SISTER').length;
    const seminariansCount = members.filter(
      (m) => m.religiousProfession.type === 'SEMINARIAN',
    ).length;

    return {
      totalMembers,
      activeMembers,
      baptizedCount,
      firstCommunionCount,
      confirmedCount,
      marriedCouplesCount,
      priestsCount,
      deaconsCount,
      sistersCount,
      seminariansCount,
      houseBlessingStatus: family.houseBlessingCompleted,
    };
  }, [members, family.houseBlessingCompleted]);

  return (
    <FamilyContext.Provider
      value={{
        family,
        members,
        appointments,
        requests,
        massIntentions,
        homeCommunionVisits,
        houseBlessings,
        prayerRequests,
        events,
        payments,
        updateFamilyProfile,
        requestAnbiyamChange,
        approveAnbiyamChange,
        rejectAnbiyamChange,
        updateMember,
        addMember,
        deleteMember,
        addAppointment,
        addSacramentRequest,
        addMassIntention,
        updateMassIntentionStatus,
        addHomeCommunionRequest,
        updateHomeCommunionStatus,
        addHouseBlessingRequest,
        updateHouseBlessingStatus,
        addPrayerRequest,
        updatePrayerRequestStatus,
        registerForEvent,
        cancelEventRegistration,
        addPayment,
        sacramentalSummary,
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within FamilyProvider');
  }
  return context;
}

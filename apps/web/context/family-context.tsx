'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useNotifications } from './notification-context';

export interface SacramentDetail {
  completed: boolean;
  date: string;
  church: string;
  parish?: string;
  diocese?: string;
  spouseName?: string;
}

export interface DetailedFamilyMember {
  id: string;
  name: string;
  tamilName?: string;
  relation:
    | 'Head of Family'
    | 'Spouse'
    | 'Son'
    | 'Daughter'
    | 'Father'
    | 'Mother'
    | 'Grandfather'
    | 'Grandmother'
    | 'Other';
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  maritalStatus:
    | 'Single'
    | 'Married (Church)'
    | 'Married (Civil)'
    | 'Widowed'
    | 'Divorced'
    | 'Religious / Clergy';
  phone: string;
  email: string;
  occupation: string;

  // Church Jurisdiction
  religion: string;
  denomination: string;
  nativeParish: string;
  diocese: string;

  // Sacraments
  baptism: SacramentDetail;
  firstCommunion: SacramentDetail;
  confirmation: SacramentDetail;
  marriage: SacramentDetail;
  holyOrders: {
    type: 'NONE' | 'PRIEST' | 'DEACON';
    date: string;
  };
  religiousProfession: {
    type: 'NONE' | 'BROTHER' | 'SISTER' | 'SEMINARIAN';
    congregation: string;
    seminary: string;
  };
  anointingOfSick: {
    received: boolean;
    date: string;
  };

  // Pastoral Engagement Badges
  isCatechismStudent: boolean;
  isChoirMember: boolean;
  isMinistryMember: boolean;
  isVolunteer: boolean;
  isYouthMember: boolean;
  isAltarServer: boolean;
  isLegionOfMary: boolean;
  isVincentDePaul: boolean;
  isFamilyPrayerGroup: boolean;

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

const INITIAL_FAMILY_PROFILE: ParishFamilyProfile = {
  familyNumber: 'QOAS-2024-0001',
  name: 'St. Mary Family',
  registeredSince: '2012',
  headName: 'Joseph Anthony',
  spouseName: 'Maria Joseph',
  address: '12, Church Street, Cathedral Colony',
  landmark: 'Near Main Grotto & Convent Gate',
  ward: 'North Zone - Ward 4',
  pincode: '620001',
  headPhone: '+91 98765 43210',
  alternatePhone: '+91 98421 88776',
  headEmail: 'familyhead@queenofallsaints.in',
  preferredLanguage: 'Tamil',
  religion: 'Catholic Christian',
  communityCaste: 'BC',
  nativeParish: "St. Mary's Cathedral, Madurai",
  diocese: 'Diocese of Tiruchirapalli',
  status: 'Active',
  anbiyam: 'St. Thomas Anbiyam',
  anbiyamTransferStatus: 'NONE',
  occupationHead: 'Senior Civil Engineer',
  occupationSpouse: 'Higher Secondary School Teacher',
  housingType: 'Own House',
  migratedFrom: 'Madurai Town',
  monthlyVisitRequired: false,
  houseBlessingCompleted: true,
  lastHouseBlessingDate: '2026-01-15',
  familyPrayerConducted: true,
  parishCensusCompleted: true,
  remarks:
    'Family actively leads Sunday psalmody. Requests evening house blessing during October Rosary month.',
  receivesParishMagazine: true,
  whatsAppAvailable: true,
  emergencyContactName: 'Francis Xavier (Brother)',
  emergencyContactPhone: '+91 94431 00099',
  weddingAnniversary: '2006-05-18',
};

const INITIAL_FAMILY_MEMBERS: DetailedFamilyMember[] = [
  {
    id: 'mem-1',
    name: 'Joseph Anthony',
    tamilName: 'ஜோசப் அந்தோணி',
    relation: 'Head of Family',
    dob: '1982-04-12',
    gender: 'MALE',
    maritalStatus: 'Married (Church)',
    phone: '+91 98765 43210',
    email: 'joseph.anthony@queenofallsaints.in',
    occupation: 'Civil Engineer',
    religion: 'Catholic Christian',
    denomination: 'Roman Catholic (Latin Rite)',
    nativeParish: "St. Mary's Cathedral, Madurai",
    diocese: 'Diocese of Tiruchirapalli',
    baptism: {
      completed: true,
      date: '1982-05-20',
      church: "St. Mary's Cathedral",
      parish: "St. Mary's Cathedral Parish",
      diocese: 'Archdiocese of Madurai',
    },
    firstCommunion: {
      completed: true,
      date: '1992-05-10',
      church: "St. Mary's Cathedral",
    },
    confirmation: {
      completed: true,
      date: '1996-11-24',
      church: "St. Mary's Cathedral",
    },
    marriage: {
      completed: true,
      date: '2006-05-18',
      church: 'Queen of All Saints Church, Trichy',
      spouseName: 'Maria Joseph',
    },
    holyOrders: { type: 'NONE', date: '' },
    religiousProfession: { type: 'NONE', congregation: '', seminary: '' },
    anointingOfSick: { received: false, date: '' },
    isCatechismStudent: false,
    isChoirMember: true,
    isMinistryMember: true,
    isVolunteer: true,
    isYouthMember: false,
    isAltarServer: false,
    isLegionOfMary: false,
    isVincentDePaul: true,
    isFamilyPrayerGroup: true,
    bloodGroup: 'O+',
    emergencyContact: '+91 94431 00099',
    specialNeeds: 'None',
    elderlyAssistance: false,
    homeCommunionRequired: false,
    bedridden: false,
  },
  {
    id: 'mem-2',
    name: 'Maria Joseph',
    tamilName: 'மரியா ஜோசப்',
    relation: 'Spouse',
    dob: '1985-09-20',
    gender: 'FEMALE',
    maritalStatus: 'Married (Church)',
    phone: '+91 98421 88776',
    email: 'maria.joseph@queenofallsaints.in',
    occupation: 'School Teacher',
    religion: 'Catholic Christian',
    denomination: 'Roman Catholic (Latin Rite)',
    nativeParish: 'Holy Redeemer Church, Palayamkottai',
    diocese: 'Diocese of Palayamkottai',
    baptism: {
      completed: true,
      date: '1985-10-15',
      church: 'Holy Redeemer Church',
      parish: 'Holy Redeemer Parish',
      diocese: 'Diocese of Palayamkottai',
    },
    firstCommunion: {
      completed: true,
      date: '1995-04-16',
      church: 'Holy Redeemer Church',
    },
    confirmation: {
      completed: true,
      date: '1999-10-24',
      church: 'Holy Redeemer Church',
    },
    marriage: {
      completed: true,
      date: '2006-05-18',
      church: 'Queen of All Saints Church, Trichy',
      spouseName: 'Joseph Anthony',
    },
    holyOrders: { type: 'NONE', date: '' },
    religiousProfession: { type: 'NONE', congregation: '', seminary: '' },
    anointingOfSick: { received: false, date: '' },
    isCatechismStudent: false,
    isChoirMember: true,
    isMinistryMember: true,
    isVolunteer: true,
    isYouthMember: false,
    isAltarServer: false,
    isLegionOfMary: true,
    isVincentDePaul: false,
    isFamilyPrayerGroup: true,
    bloodGroup: 'A+',
    emergencyContact: '+91 98765 43210',
    specialNeeds: 'None',
    elderlyAssistance: false,
    homeCommunionRequired: false,
    bedridden: false,
  },
];

const INITIAL_HOUSE_BLESSINGS: HouseBlessingItem[] = [
  {
    id: 'HB-2026-001',
    familyNumber: 'QOAS-2024-0001',
    familyName: 'St. Mary Family',
    familyMemberName: 'Joseph Anthony',
    newAddress: '12, Church Street, Cathedral Colony',
    landmark: 'Near Main Grotto & Convent Gate',
    mobileNumber: '+91 98765 43210',
    preferredDate: '2026-08-22',
    notes: 'Annual family house blessing and enthronement of Sacred Heart image.',
    status: 'PENDING_SCHEDULING',
    createdAt: '2026-08-05',
  },
];

const INITIAL_PRAYER_REQUESTS: FamilyPrayerItem[] = [
  {
    id: 'PR-2026-001',
    familyNumber: 'QOAS-2024-0001',
    familyName: 'St. Mary Family',
    category: 'Healing',
    intentionDetails: 'Special prayer for rapid recovery of grandmother after knee joint therapy.',
    keepAnonymous: false,
    status: 'INCLUDED_IN_MASS',
    createdAt: '2026-08-05',
  },
];

const INITIAL_PARISH_EVENTS: ParishEventItem[] = [
  {
    id: 'EVT-001',
    title: 'Annual Parish Lenten Spiritual Retreat 2026',
    category: 'Retreat',
    date: '2026-08-20',
    time: '09:00 AM – 04:30 PM',
    venue: 'St. Paul Pastoral Center Auditorium',
    description: 'Day of prayer, confession, holy eucharist, and spiritual renewal.',
    registered: true,
    registeredMemberName: 'Joseph Anthony & Maria Joseph',
    passCode: 'RET-PASS-9901',
  },
  {
    id: 'EVT-002',
    title: 'Diocesan Youth Leadership Camp 2026',
    category: 'Youth Camp',
    date: '2026-09-05',
    time: '08:00 AM',
    venue: 'St. Xavier Youth Hall',
    description: 'Empowering young Catholics for parish leadership and choir ministry.',
    registered: false,
  },
  {
    id: 'EVT-003',
    title: 'Feast of Queen of All Saints Volunteer Team',
    category: 'Feast Volunteer',
    date: '2026-10-20',
    time: '05:00 PM',
    venue: 'Parish Shrine Complex',
    description:
      'Registration for procession security, altar decoration, and prasadam distribution.',
    registered: true,
    registeredMemberName: 'David Joseph',
    passCode: 'FEAST-VOL-3341',
  },
];

const INITIAL_CATEGORIZED_PAYMENTS: CategorizedPaymentItem[] = [
  {
    id: 'PAY-2026-001',
    category: 'Church Tax',
    description: 'August 2026 Monthly Family Parish Tax',
    amount: 500,
    date: '2026-08-01',
    status: 'PAID',
    receiptNumber: 'RCP-2026-8801',
  },
  {
    id: 'PAY-2026-002',
    category: 'Building Fund',
    description: 'Grotto Renovation & Cathedral Maintenance Fund',
    amount: 2000,
    date: '2026-07-15',
    status: 'PAID',
    receiptNumber: 'RCP-2026-7712',
  },
  {
    id: 'PAY-2026-003',
    category: 'Feast Contribution',
    description: 'Annual Patronal Feast Flag Hoisting Sponsorship',
    amount: 1500,
    date: '2026-06-10',
    status: 'PAID',
    receiptNumber: 'RCP-2026-6643',
  },
];

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
  addMassIntention: (item: Omit<MassIntentionItem, 'id' | 'createdAt' | 'status'>) => void;
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

  addPayment: (item: Omit<CategorizedPaymentItem, 'id' | 'receiptNumber'>) => void;

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

const LOCAL_FAMILY_KEY = 'qoas_family_profile_v5';
const LOCAL_MEMBERS_KEY = 'qoas_family_members_v5';
const LOCAL_HOUSE_BLESSINGS_KEY = 'qoas_house_blessings_v5';
const LOCAL_PRAYERS_KEY = 'qoas_prayers_v5';
const LOCAL_EVENTS_KEY = 'qoas_events_v5';
const LOCAL_PAYMENTS_KEY = 'qoas_payments_v5';

export function FamilyProvider({ children }: { children: ReactNode }) {
  const [family, setFamily] = useState<ParishFamilyProfile>(INITIAL_FAMILY_PROFILE);
  const [members, setMembers] = useState<DetailedFamilyMember[]>(INITIAL_FAMILY_MEMBERS);
  const [appointments, setAppointments] = useState<PriestAppointmentItem[]>([]);
  const [requests, setRequests] = useState<SacramentRequestItem[]>([]);
  const [massIntentions, setMassIntentions] = useState<MassIntentionItem[]>([]);
  const [homeCommunionVisits, setHomeCommunionVisits] = useState<HomeCommunionItem[]>([]);
  const [houseBlessings, setHouseBlessings] =
    useState<HouseBlessingItem[]>(INITIAL_HOUSE_BLESSINGS);
  const [prayerRequests, setPrayerRequests] = useState<FamilyPrayerItem[]>(INITIAL_PRAYER_REQUESTS);
  const [events, setEvents] = useState<ParishEventItem[]>(INITIAL_PARISH_EVENTS);
  const [payments, setPayments] = useState<CategorizedPaymentItem[]>(INITIAL_CATEGORIZED_PAYMENTS);

  const { addNotification } = useNotifications();

  // Load from localStorage
  useEffect(() => {
    try {
      const sf = localStorage.getItem(LOCAL_FAMILY_KEY);
      if (sf) setFamily(JSON.parse(sf));

      const sm = localStorage.getItem(LOCAL_MEMBERS_KEY);
      if (sm) setMembers(JSON.parse(sm));

      const shb = localStorage.getItem(LOCAL_HOUSE_BLESSINGS_KEY);
      if (shb) setHouseBlessings(JSON.parse(shb));

      const spr = localStorage.getItem(LOCAL_PRAYERS_KEY);
      if (spr) setPrayerRequests(JSON.parse(spr));

      const sev = localStorage.getItem(LOCAL_EVENTS_KEY);
      if (sev) setEvents(JSON.parse(sev));

      const spay = localStorage.getItem(LOCAL_PAYMENTS_KEY);
      if (spay) setPayments(JSON.parse(spay));
    } catch {
      // Fallback
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_FAMILY_KEY, JSON.stringify(family));
      localStorage.setItem(LOCAL_MEMBERS_KEY, JSON.stringify(members));
      localStorage.setItem(LOCAL_HOUSE_BLESSINGS_KEY, JSON.stringify(houseBlessings));
      localStorage.setItem(LOCAL_PRAYERS_KEY, JSON.stringify(prayerRequests));
      localStorage.setItem(LOCAL_EVENTS_KEY, JSON.stringify(events));
      localStorage.setItem(LOCAL_PAYMENTS_KEY, JSON.stringify(payments));
    } catch {
      // Fallback
    }
  }, [family, members, houseBlessings, prayerRequests, events, payments]);

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

  const updateMember = (memberId: string, updatedFields: Partial<DetailedFamilyMember>) => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, ...updatedFields } : m)));
  };

  const addMember = (newMember: Omit<DetailedFamilyMember, 'id'>) => {
    const member: DetailedFamilyMember = {
      ...newMember,
      id: `mem-${Date.now()}`,
    };
    setMembers((prev) => [...prev, member]);
  };

  const deleteMember = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
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

  const addMassIntention = (item: Omit<MassIntentionItem, 'id' | 'createdAt' | 'status'>) => {
    const newItem: MassIntentionItem = {
      ...item,
      id: `MASS-2026-${Math.floor(100 + Math.random() * 900)}`,
      status: 'PENDING_CONFIRMATION',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setMassIntentions((prev) => [newItem, ...prev]);
    addNotification({
      title: 'Mass Intention Received',
      message: `Mass Intention for ${item.personName} submitted.`,
      type: 'SYSTEM',
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

  const addPayment = (item: Omit<CategorizedPaymentItem, 'id' | 'receiptNumber'>) => {
    const rcp = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPay: CategorizedPaymentItem = {
      ...item,
      id: `PAY-2026-${Math.floor(100 + Math.random() * 900)}`,
      receiptNumber: rcp,
    };
    setPayments((prev) => [newPay, ...prev]);
    addNotification({
      title: 'Payment Received',
      message: `Contribution of ₹${item.amount} (${item.category}) processed. Receipt: ${rcp}`,
      type: 'SYSTEM',
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

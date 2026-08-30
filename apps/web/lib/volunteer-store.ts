/**
 * Volunteer & Ministry Request Store
 * Queen of All Saints Roman Catholic Church
 */

export interface VolunteerRequestItem {
  id: string;
  applicantMember: string;
  familyNumber: string;
  contactPhone: string;
  contactEmail?: string;
  organizationType: 'Youth Movement' | 'Liturgical Choir' | 'Sunday Catechism' | 'Vincent de Paul' | 'Legion of Mary' | 'Altar Servers' | 'Parish Volunteers';
  organizationName: string;
  reason: string;
  skillsOrExperience?: string;
  availability?: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  assignedRole?: string;
  coordinatorNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

const STORAGE_KEY = 'qoas_parish_volunteer_requests_v3';

export const INITIAL_VOLUNTEER_REQUESTS: VolunteerRequestItem[] = [
  {
    id: 'VOL-2026-001',
    applicantMember: 'John Joseph (Son)',
    familyNumber: 'QOAS-CARD-101',
    contactPhone: '+91 94431 88990',
    contactEmail: 'john.joseph@queenofallsaints.in',
    organizationType: 'Youth Movement',
    organizationName: 'Parish Youth Movement',
    reason: 'Desire to lead youth praise & worship, organize annual parish youth retreats, and mentor teens.',
    skillsOrExperience: 'Acoustic Guitar, Public Speaking, Sound Setup',
    availability: 'Sundays & Friday Evenings',
    submittedDate: '2026-08-25',
    status: 'Pending',
  },
  {
    id: 'VOL-2026-002',
    applicantMember: 'Catherine Therese (Daughter)',
    familyNumber: 'QOAS-CARD-151',
    contactPhone: '+91 98940 12345',
    contactEmail: 'catherine.t@queenofallsaints.in',
    organizationType: 'Sunday Catechism',
    organizationName: 'Sunday Catechism Teachers',
    reason: 'Wants to assist in teaching 3rd & 4th grade catechism and prepare children for First Holy Communion.',
    skillsOrExperience: 'Bachelor of Education, Sunday School Graduate',
    availability: 'Sunday Mornings 08:30 AM - 10:30 AM',
    submittedDate: '2026-08-26',
    status: 'Pending',
  },
  {
    id: 'VOL-2026-003',
    applicantMember: 'Maria Joseph (Spouse)',
    familyNumber: 'QOAS-CARD-301',
    contactPhone: '+91 94435 55667',
    contactEmail: 'maria.adaikalam@queenofallsaints.in',
    organizationType: 'Liturgical Choir',
    organizationName: 'Parish Liturgical Choir',
    reason: 'Sings soprano in Sunday 06:30 AM Tamil Mass and wishes to join the parish feast grand choir.',
    skillsOrExperience: 'Carnatic Vocal 4 Years, Psalm Cantoring',
    availability: 'Saturday 06:00 PM Rehearsals & Sunday Masses',
    submittedDate: '2026-08-22',
    status: 'Approved',
    assignedRole: 'Soprano Vocalist & Psalm Cantor',
    coordinatorNotes: 'Audition completed with Choir Master. Welcome to Liturgical Choir!',
    reviewedBy: 'Francis Xavier (Choir Coordinator)',
    reviewedAt: '2026-08-24 18:30',
  },
  {
    id: 'VOL-2026-004',
    applicantMember: 'Antony Arokiasamy (Family Head)',
    familyNumber: 'QOAS-CARD-601',
    contactPhone: '+91 94421 66778',
    contactEmail: 'arokiasamy@queenofallsaints.in',
    organizationType: 'Vincent de Paul',
    organizationName: 'Society of St. Vincent de Paul (SVP)',
    reason: 'Passionate about visiting poor families, distributing monthly ration supplies, and medical charity outreach.',
    skillsOrExperience: 'Parish Volunteer for 8 Years, Community Driving',
    availability: '2nd & 4th Saturdays, Sunday afternoons',
    submittedDate: '2026-08-20',
    status: 'Approved',
    assignedRole: 'Field Relief & Ration Distribution Coordinator',
    coordinatorNotes: 'Approved unanimously in monthly council meeting.',
    reviewedBy: 'S. Rajendran (SVP Coordinator)',
    reviewedAt: '2026-08-21 11:00',
  },
  {
    id: 'VOL-2026-005',
    applicantMember: 'Paul Johnson (Youth)',
    familyNumber: 'QOAS-CARD-901',
    contactPhone: '+91 98421 99001',
    contactEmail: 'paul.jmj@queenofallsaints.in',
    organizationType: 'Altar Servers',
    organizationName: 'Altar Servers Association',
    reason: 'Wants to serve weekday and Sunday Masses at the altar, assist during liturgical benediction.',
    skillsOrExperience: 'Completed Altar Server orientation program',
    availability: 'All weekend Masses & Feast Days',
    submittedDate: '2026-08-27',
    status: 'Pending',
  },
  {
    id: 'VOL-2026-006',
    applicantMember: 'Stella Mary (Spouse)',
    familyNumber: 'QOAS-CARD-701',
    contactPhone: '+91 94433 11223',
    contactEmail: 'stella.antony@queenofallsaints.in',
    organizationType: 'Parish Volunteers',
    organizationName: 'Parish Service & Feast Volunteers',
    reason: 'Help decorate altar for annual church feast, coordinate food distribution, and assist crowd control.',
    skillsOrExperience: 'Floral Decoration, Catering Management',
    availability: 'Annual Novena Days & Feast Week',
    submittedDate: '2026-08-28',
    status: 'Pending',
  },
];

/**
 * Retrieve all volunteer requests
 */
export function getVolunteerRequests(): VolunteerRequestItem[] {
  if (typeof window === 'undefined') return INITIAL_VOLUNTEER_REQUESTS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VOLUNTEER_REQUESTS));
      return INITIAL_VOLUNTEER_REQUESTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load volunteer requests:', err);
    return INITIAL_VOLUNTEER_REQUESTS;
  }
}

/**
 * Save updated volunteer requests and emit reactive event
 */
export function saveVolunteerRequests(requests: VolunteerRequestItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    window.dispatchEvent(new CustomEvent('qoas_volunteer_changed', { detail: requests }));
  } catch (err) {
    console.error('Failed to save volunteer requests:', err);
  }
}

/**
 * Submit a new volunteer request from a family member
 */
export function submitVolunteerRequest(item: Omit<VolunteerRequestItem, 'id' | 'submittedDate' | 'status'>): VolunteerRequestItem {
  const all = getVolunteerRequests();
  const newReq: VolunteerRequestItem = {
    ...item,
    id: `VOL-2026-${Math.floor(100 + Math.random() * 900)}`,
    submittedDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
  };

  const updated = [newReq, ...all];
  saveVolunteerRequests(updated);
  return newReq;
}

/**
 * Team Coordinator accepts/approves a volunteer request
 */
export function approveVolunteerRequest(
  id: string,
  coordinatorName = 'Team Coordinator',
  assignedRole = 'Active Ministry Volunteer',
  notes = 'Approved by Team Coordinator. Welcome to the ministry!',
): VolunteerRequestItem | null {
  const all = getVolunteerRequests();
  let updatedItem: VolunteerRequestItem | null = null;

  const updated = all.map((req) => {
    if (req.id === id) {
      updatedItem = {
        ...req,
        status: 'Approved',
        assignedRole: assignedRole || req.assignedRole || 'Active Ministry Volunteer',
        coordinatorNotes: notes || req.coordinatorNotes || 'Application accepted.',
        reviewedBy: coordinatorName,
        reviewedAt: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      };
      return updatedItem;
    }
    return req;
  });

  if (updatedItem) {
    saveVolunteerRequests(updated);
  }
  return updatedItem;
}

/**
 * Team Coordinator rejects a volunteer request with feedback
 */
export function rejectVolunteerRequest(
  id: string,
  coordinatorName = 'Team Coordinator',
  reason = 'Application could not be accommodated at this time. Please contact the parish office.',
): VolunteerRequestItem | null {
  const all = getVolunteerRequests();
  let updatedItem: VolunteerRequestItem | null = null;

  const updated = all.map((req) => {
    if (req.id === id) {
      updatedItem = {
        ...req,
        status: 'Rejected',
        coordinatorNotes: reason,
        reviewedBy: coordinatorName,
        reviewedAt: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      };
      return updatedItem;
    }
    return req;
  });

  if (updatedItem) {
    saveVolunteerRequests(updated);
  }
  return updatedItem;
}

/**
 * Subscribe to volunteer request updates
 */
export function subscribeToVolunteerRequests(callback: (requests: VolunteerRequestItem[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<VolunteerRequestItem[]>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    } else {
      callback(getVolunteerRequests());
    }
  };

  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(getVolunteerRequests());
    }
  };

  window.addEventListener('qoas_volunteer_changed', handler);
  window.addEventListener('storage', storageHandler);

  return () => {
    window.removeEventListener('qoas_volunteer_changed', handler);
    window.removeEventListener('storage', storageHandler);
  };
}

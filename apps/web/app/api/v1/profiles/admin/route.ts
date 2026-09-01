import { NextResponse } from 'next/server';

export interface AdminProfileData {
  id: string;
  name: string;
  nameTa: string;
  roleTitle: string;
  department: string;
  email: string;
  phone: string;
  parishLocation: string;
  parishLocationTa: string;
  systemPermissions: string[];
  lastLogin: string;
  lastUpdated: string;
}

let adminProfileStore: AdminProfileData = {
  id: 'admin-profile-super',
  name: 'Super Administrator',
  nameTa: 'தலைமை நிர்வாகி',
  roleTitle: 'Parish Platform Super Admin',
  department: 'Diocese & Parish Central IT Administration',
  email: 'admin@queenofallsaints.in',
  phone: '+91 94432 49671',
  parishLocation: 'Amalapuram, K.K. Nagar, Tiruchirappalli – 620 021',
  parishLocationTa: 'அமலாபுரம், கே.கே. நகர், திருச்சிராப்பள்ளி – 620 021',
  systemPermissions: [
    'PARISHIONER_MANAGEMENT',
    'SACRAMENTS_APPROVAL',
    'FINANCE_AUDIT_LEDGER',
    'BULLETIN_AND_NOTICES',
    'MINISTRY_AND_ANBIYAM_SUPERVISION',
    'SECURITY_ACCESS_CONTROL',
  ],
  lastLogin: new Date().toISOString(),
  lastUpdated: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: adminProfileStore,
  });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    adminProfileStore = {
      ...adminProfileStore,
      ...body,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Super Admin profile updated and synchronized successfully.',
      data: adminProfileStore,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update Super Admin profile.' },
      { status: 400 },
    );
  }
}


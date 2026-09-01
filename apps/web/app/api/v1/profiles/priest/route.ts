import { NextResponse } from 'next/server';

export interface PriestProfileData {
  id: string;
  name: string;
  nameTa: string;
  roleTitle: string;
  roleTitleTa: string;
  order: string;
  since: string;
  email: string;
  phone: string;
  emergencyPhone: string;
  officeHours: string;
  officeHoursTa: string;
  bioEn: string;
  bioTa: string;
  photoUrl: string;
  lastUpdated: string;
}

let priestProfileStore: PriestProfileData = {
  id: 'priest-profile-arokiyaswamy',
  name: 'Rev. Fr. ArokiyaSwamy O.Praem',
  nameTa: 'அருட்பணி ஆரோக்கியசாமி ஓப்ரேம்',
  roleTitle: 'Parish Priest & Rector',
  roleTitleTa: 'பங்குத் தந்தை & அதிபர்',
  order: 'Norbertine Fathers (O.Praem)',
  since: '2025',
  email: 'priest@queenofallsaints.in',
  phone: '+91 94432 49671',
  emergencyPhone: '+91 94432 49671',
  officeHours: 'Tuesday – Saturday: 9:00 AM – 1:00 PM & 5:00 PM – 8:30 PM',
  officeHoursTa: 'செவ்வாய் – சனி: காலை 9:00 – பிற்பகல் 1:00 & மாலை 5:00 – இரவு 8:30',
  bioEn:
    'Rev. Fr. ArokiyaSwamy O.Praem has served as Parish Priest of Queen of All Saints Roman Catholic Church, K.K. Nagar, Tiruchirappalli since 2025. He guides the parish in the Norbertine tradition of prayer, pastoral visitation, and care for all families across the 13 Anbiyams.',
  bioTa:
    'அருட்பணி ஆரோக்கியசாமி ஓப்ரேம் 2025 முதல் அனைத்து புனிதர்களின் அரசி கத்தோலிக்க ஆலயத்தின் பங்குத்தந்தையாகப் பணியாற்றி வருகிறார். நார்பர்ட் சபையின் இறைவழிபாட்டுப் பாரம்பரியத்தோடும், இல்ல சந்திப்புகளோடும் 13 அன்பியங்களின் குடும்பங்களை ஆன்மீக வழியில் வழிநடத்துகிறார்.',
  photoUrl: '/images/priest/fr-arokiyaswamy.jpg',
  lastUpdated: new Date().toISOString(),
};

export async function GET() {
  return NextResponse.json({
    success: true,
    data: priestProfileStore,
  });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    priestProfileStore = {
      ...priestProfileStore,
      ...body,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Parish Priest profile updated and synchronized successfully.',
      data: priestProfileStore,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update Parish Priest profile.' },
      { status: 400 },
    );
  }
}


import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: [
        {
          id: 'ev-1',
          title: 'Annual Parish Feast & Grand Car Procession',
          titleTa: 'ஆண்டுப் பெருவிழா & ஆடம்பரத் தேர்பவனி',
          date: '2026-11-01',
          time: '06:00 PM',
          location: 'Main Parish Grounds',
          category: 'Feast',
        },
        {
          id: 'ev-2',
          title: 'Parish Youth Spiritual Lenten Retreat',
          titleTa: 'இளையோர் தவக்கால ஆன்மீக தியானம்',
          date: '2026-03-28',
          time: '09:00 AM - 04:00 PM',
          location: 'Parish Community Hall',
          category: 'Retreat',
        },
      ],
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to load events' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const registrationId = `PASS-${Date.now().toString().slice(-4)}`;

    console.log(`[PARISH SERVER] Event registration recorded:`, {
      registrationId,
      eventId: body.eventId,
      memberName: body.memberName,
      registeredAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Event registration confirmed in server ledger.',
      passCode: registrationId,
      registeredAt: new Date().toISOString(),
      data: body,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
  }
}


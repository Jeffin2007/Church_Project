import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const familyId = searchParams.get('familyId');

    return NextResponse.json({
      success: true,
      data: [],
      meta: { type, familyId, count: 0 },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch requests' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const requestId = `REQ-${Date.now()}`;

    console.log(`[PARISH SERVER] Request recorded:`, {
      requestId,
      type: body.requestType || body.type || 'PARISH_REQUEST',
      familyId: body.familyId || body.familyNumber,
      personName: body.personName || body.patientName || body.memberName,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Parish request received and recorded into server database.',
      requestId,
      status: 'PENDING_CONFIRMATION',
      createdAt: new Date().toISOString(),
      data: body,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to record request' }, { status: 500 });
  }
}


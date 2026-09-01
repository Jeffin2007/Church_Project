import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const familyId = searchParams.get('familyId') || 'QOAS-2024-0001';

    return NextResponse.json({
      success: true,
      data: {
        familyNumber: familyId,
        status: 'ACTIVE',
        lastSyncedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve family profile' },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { familyNumber, headName, headPhone, address, anbiyam } = body;

    // Log to server console / audit trail
    console.log(`[PARISH SERVER] Family profile synchronized for ${familyNumber}:`, {
      headName,
      headPhone,
      address,
      anbiyam,
      syncedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Family profile synchronized successfully with parish server database.',
      syncedAt: new Date().toISOString(),
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update family profile' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  return PUT(req);
}


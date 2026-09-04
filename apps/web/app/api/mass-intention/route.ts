import { NextResponse } from 'next/server';
import { sendMassIntentionConfirmation } from '@/lib/notifications/parish-templates';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { donorName, phone, intentionFor, intentionType, massDate, massTime, amount } = body;

    // 1. Generate Receipt Number
    const receiptNumber = `QOAS-${Date.now().toString().slice(-6)}`;

    // 2. Dispatch WhatsApp confirmation
    await sendMassIntentionConfirmation({
      donorName,
      phone,
      intentionFor,
      intentionType,
      massDate,
      massTime,
      amount,
      receiptNumber,
    });

    return NextResponse.json({
      success: true,
      receiptNumber,
      message: 'Mass intention confirmed and WhatsApp notification sent.',
    });
  } catch (error) {
    console.error('Error processing mass intention:', error);
    return NextResponse.json({ success: false, error: 'Failed to process intention' }, { status: 500 });
  }
}

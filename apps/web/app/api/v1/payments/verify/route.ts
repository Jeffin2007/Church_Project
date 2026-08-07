import { NextResponse } from 'next/server';
import crypto from 'crypto';

const RAZORPAY_KEY_SECRET = process.env['RAZORPAY_KEY_SECRET'] || 'HCVaxXmOk5DzIWyLQqM8VNRs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      amount,
      category,
      purpose,
      familyNumber,
      familyName,
    } = body;

    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    const expectedBuf = Buffer.from(expectedSignature, 'utf-8');
    const actualBuf = Buffer.from(razorpaySignature || '', 'utf-8');

    const isValid =
      expectedBuf.length === actualBuf.length && crypto.timingSafeEqual(expectedBuf, actualBuf);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          code: 'INVALID_SIGNATURE',
          message: 'Razorpay HMAC signature verification failed.',
          timestamp: new Date().toISOString(),
          requestId: `req_${Date.now()}`,
        },
        { status: 400 },
      );
    }

    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const receiptNumber = `RCP-${year}-${randomDigits}`;

    return NextResponse.json({
      success: true,
      data: {
        success: true,
        verified: true,
        paymentId: `PAY-${Date.now()}`,
        receiptNumber,
        transactionId: razorpayPaymentId,
        amount: Number(amount) || 500,
        category: category || 'Parish Contribution',
        description: purpose || 'Parish Contribution',
        familyNumber: familyNumber || 'QOAS-2024-0001',
        familyName: familyName || 'St. Mary Family',
        date: new Date().toISOString().slice(0, 10),
      },
      timestamp: new Date().toISOString(),
      requestId: `req_${Date.now()}`,
    });
  } catch (error: unknown) {
    const errObj = error as { message?: string };
    return NextResponse.json(
      {
        success: false,
        code: 'VERIFICATION_ERROR',
        message: errObj?.message || 'Payment signature verification failed.',
        timestamp: new Date().toISOString(),
        requestId: `req_${Date.now()}`,
      },
      { status: 500 },
    );
  }
}

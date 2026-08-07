import { registerAs } from '@nestjs/config';

export default registerAs('razorpay', () => ({
  keyId:
    process.env['RAZORPAY_KEY_ID'] ??
    process.env['NEXT_PUBLIC_RAZORPAY_KEY_ID'] ??
    'rzp_test_TKZfmutWTC2qVz',
  keySecret: process.env['RAZORPAY_KEY_SECRET'] ?? 'HCVaxXmOk5DzIWyLQqM8VNRs',
  webhookSecret: process.env['RAZORPAY_WEBHOOK_SECRET'] ?? 'qoas_razorpay_webhook_secret_2026',
}));

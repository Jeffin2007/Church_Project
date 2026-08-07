import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { PaymentService } from './payment.service';
import { PrismaService } from '../../database/prisma.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let prismaService: Partial<PrismaService>;
  let configService: Partial<ConfigService>;

  const mockKeyId = 'rzp_test_TKZfmutWTC2qVz';
  const mockKeySecret = 'HCVaxXmOk5DzIWyLQqM8VNRs';

  beforeEach(async () => {
    prismaService = {
      family: {
        findFirst: jest.fn().mockResolvedValue({
          id: 'fam-1',
          familyNumber: 'QOAS-2024-0001',
          name: 'St. Mary Family',
        }),
        create: jest.fn().mockResolvedValue({
          id: 'fam-1',
          familyNumber: 'QOAS-2024-0001',
          name: 'St. Mary Family',
        }),
      },
      paymentCategory: {
        findFirst: jest.fn().mockResolvedValue({
          id: 'cat-1',
          code: 'church_tax',
          nameEn: 'Church Tax',
        }),
        create: jest.fn().mockResolvedValue({
          id: 'cat-1',
          code: 'church_tax',
          nameEn: 'Church Tax',
        }),
      },
      payment: {
        create: jest
          .fn()
          .mockImplementation((args: { data: Record<string, unknown> }) =>
            Promise.resolve({ id: 'pay-123', ...args.data }),
          ),
        findFirst: jest.fn().mockResolvedValue({
          id: 'pay-123',
          familyId: 'fam-1',
          amountPaise: 50000,
          categoryName: 'Church Tax',
          notes: 'August Tax',
          family: { id: 'fam-1', familyNumber: 'QOAS-2024-0001', name: 'St. Mary Family' },
          receipt: null,
        }),
        update: jest
          .fn()
          .mockImplementation((args: { data: Record<string, unknown> }) =>
            Promise.resolve({
              id: 'pay-123',
              categoryName: 'Church Tax',
              notes: 'August Tax',
              ...args.data,
            }),
          ),
      },
      receipt: {
        create: jest.fn().mockResolvedValue({
          id: 'rcp-1',
          receiptNumber: 'RCP-2026-9999',
          transactionId: 'pay_test123',
        }),
      },
    } as unknown as Partial<PrismaService>;

    configService = {
      get: jest.fn((key: string) => {
        if (key === 'razorpay.keyId') return mockKeyId;
        if (key === 'razorpay.keySecret') return mockKeySecret;
        if (key === 'razorpay.webhookSecret') return 'webhook_secret';
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: PrismaService, useValue: prismaService },
        { provide: ConfigService, useValue: configService },
        {
          provide: 'PinoLogger:PaymentService',
          useValue: { info: jest.fn(), error: jest.fn(), warn: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('verifyPayment', () => {
    it('should verify valid Razorpay HMAC SHA-256 signature and issue receipt', async () => {
      const orderId = 'order_test123';
      const paymentId = 'pay_test123';

      const hmac = crypto.createHmac('sha256', mockKeySecret);
      hmac.update(`${orderId}|${paymentId}`);
      const validSignature = hmac.digest('hex');

      const result = await service.verifyPayment({
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        razorpaySignature: validSignature,
        amount: 500,
        category: 'Church Tax',
        purpose: 'August Tax',
      });

      expect(result.success).toBe(true);
      expect(result.verified).toBe(true);
      expect(result.receiptNumber).toBeDefined();
      expect(result.transactionId).toBe(paymentId);
    });

    it('should throw BadRequestException when Razorpay signature is invalid', async () => {
      const orderId = 'order_test123';
      const paymentId = 'pay_test123';
      const invalidSignature = 'invalid_tampered_signature_1234567890abcdef1234567890abcdef';

      await expect(
        service.verifyPayment({
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          razorpaySignature: invalidSignature,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ReceiptService, RawPaymentRecord } from './receipt.service';

describe('ReceiptService', () => {
  let service: ReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReceiptService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'RECEIPT_HMAC_SECRET') {
                return 'TEST_HMAC_SECRET_KEY';
              }
              return null;
            },
          },
        },
      ],
    }).compile();

    service = module.get<ReceiptService>(ReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('mapPaymentCategory & buildReceiptData', () => {
    const baseRecord: RawPaymentRecord = {
      id: 'PAY-1001',
      receiptNumber: 'QOAS-2026-001001',
      payerName: 'John Peter',
      payerPhone: '+919876543210',
      familyId: 'FAM-001',
      amountPaise: 50000,
      paymentMethod: 'UPI',
      transactionId: 'TXN-123456',
      createdAt: '2026-08-09T10:00:00Z',
      family: { anbiyam: 'St. Jude Anbiyam' },
    };

    it('should correctly normalize all 8 canonical payment categories', async () => {
      const categories = [
        { raw: 'Mass Intention', expected: 'Mass Intention' },
        { raw: 'Church Tax', expected: 'Church Tax' },
        { raw: 'Volunteer Support', expected: 'Volunteer Support' },
        { raw: 'Sunday Offertory', expected: 'Sunday Offertory' },
        { raw: 'Feast Contribution', expected: 'Feast Contribution' },
        { raw: 'Building Fund', expected: 'Building Fund' },
        { raw: 'Charity Fund', expected: 'Charity Fund' },
        { raw: 'Other Parish Offering', expected: 'Other Parish Offering' },
      ];

      for (const item of categories) {
        const receipt = await service.buildReceiptData({
          ...baseRecord,
          paymentType: item.raw,
        });
        expect(receipt.payment.type).toBe(item.expected);
      }
    });

    it('should map enum-style and lowercase category variants safely', async () => {
      const variants = [
        { raw: 'MASS_INTENTION', expected: 'Mass Intention' },
        { raw: 'church_tax', expected: 'Church Tax' },
        { raw: 'VOLUNTEER_SUPPORT', expected: 'Volunteer Support' },
        { raw: 'sunday_offertory', expected: 'Sunday Offertory' },
        { raw: 'FEAST_CONTRIBUTION', expected: 'Feast Contribution' },
        { raw: 'building_fund', expected: 'Building Fund' },
        { raw: 'CHARITY_FUND', expected: 'Charity Fund' },
        { raw: 'OTHER_PARISH_OFFERING', expected: 'Other Parish Offering' },
      ];

      for (const item of variants) {
        const receipt = await service.buildReceiptData({
          ...baseRecord,
          paymentType: item.raw,
        });
        expect(receipt.payment.type).toBe(item.expected);
      }
    });

    it('should safely fall back to "Other Parish Offering" for null, undefined, or unknown values', async () => {
      const unknownValues = [null, undefined, '', '   ', 'RANDOM_UNKNOWN_CATEGORY'];

      for (const val of unknownValues) {
        const receipt = await service.buildReceiptData({
          ...baseRecord,
          paymentType: val as string,
        });
        expect(receipt.payment.type).toBe('Other Parish Offering');
      }
    });

    it('should handle registered family receipt with familyId and anbiyam', async () => {
      const receipt = await service.buildReceiptData(baseRecord);
      expect(receipt.payer.name).toBe('John Peter');
      expect(receipt.payer.familyId).toBe('FAM-001');
      expect(receipt.payer.anbiyam).toBe('St. Jude Anbiyam');
      expect(receipt.payer.maskedPhone).toContain('***');
    });

    it('should handle non-registered payer receipt cleanly', async () => {
      const nonRegisteredRecord: RawPaymentRecord = {
        amountPaise: 25000,
        payerName: 'Visitor Payer',
        payerPhone: '9840012345',
        paymentType: 'Sunday Offertory',
      };
      const receipt = await service.buildReceiptData(nonRegisteredRecord);
      expect(receipt.payer.name).toBe('Visitor Payer');
      expect(receipt.payer.familyId).toBeNull();
      expect(receipt.payer.anbiyam).toBeNull();
    });
  });

  describe('Blessing Verse Resolution', () => {
    const baseRecord: RawPaymentRecord = {
      amountPaise: 50000,
      paymentType: 'Mass Intention',
    };

    it('should include Birthday blessing for Mass Intention with Birthday intentionType', async () => {
      const receipt = await service.buildReceiptData({
        ...baseRecord,
        metadata: { intentionType: 'Birthday' },
      });
      expect(receipt.blessing.show).toBe(true);
      expect(receipt.blessing.text).toContain('The LORD bless you and keep you');
      expect(receipt.blessing.verseRef).toContain('Numbers 6:24-25');
    });

    it('should include Wedding Anniversary blessing for Mass Intention with Wedding Anniversary intentionType', async () => {
      const receipt = await service.buildReceiptData({
        ...baseRecord,
        metadata: { intentionType: 'Wedding Anniversary' },
      });
      expect(receipt.blessing.show).toBe(true);
      expect(receipt.blessing.text).toContain('Above all, clothe yourselves with love');
      expect(receipt.blessing.verseRef).toContain('Colossians 3:14');
    });

    it('should not show blessing for other Mass Intention intentionTypes', async () => {
      const receipt = await service.buildReceiptData({
        ...baseRecord,
        metadata: { intentionType: 'For the Soul' },
      });
      expect(receipt.blessing.show).toBe(false);
    });

    it('should not show blessing for non-Mass Intention categories even if intentionType is specified', async () => {
      const receipt = await service.buildReceiptData({
        amountPaise: 50000,
        paymentType: 'Building Fund',
        metadata: { intentionType: 'Birthday' },
      });
      expect(receipt.blessing.show).toBe(false);
    });
  });

  describe('verifyReceiptPublic', () => {
    it('should map category and exclude PII from public verification response', () => {
      const record: RawPaymentRecord = {
        receiptNumber: 'QOAS-2026-009999',
        paymentType: 'Church Tax',
        amountPaise: 120000,
        createdAt: '2026-08-09T10:00:00Z',
        transactionId: 'TXN-999',
        payerName: 'Secret Payer',
        payerPhone: '+919999999999',
        familyId: 'FAM-SECRET',
      };

      const verification = service.verifyReceiptPublic(record, 'test-hash-1234567890');
      expect(verification.isVerified).toBe(true);
      expect(verification.receiptType).toBe('Church Tax');
      expect(verification.receiptNumber).toBe('QOAS-2026-009999');
      expect(verification.amountFormatted).toBe('₹1200.00');

      // Verify strict privacy (no PII fields in return object)
      expect((verification as Record<string, unknown>).payerName).toBeUndefined();
      expect((verification as Record<string, unknown>).payerPhone).toBeUndefined();
      expect((verification as Record<string, unknown>).familyId).toBeUndefined();
    });
  });
});

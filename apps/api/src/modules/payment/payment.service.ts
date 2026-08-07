import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';

import { PrismaService } from '../../database/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { PaymentState } from '@prisma/client';

@Injectable()
export class PaymentService {
  private razorpay: Razorpay;
  private keyId: string;
  private keySecret: string;
  private webhookSecret: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    @InjectPinoLogger(PaymentService.name)
    private readonly logger: PinoLogger,
  ) {
    this.keyId =
      this.configService.get<string>('razorpay.keyId') ||
      process.env['RAZORPAY_KEY_ID'] ||
      process.env['NEXT_PUBLIC_RAZORPAY_KEY_ID'] ||
      'rzp_test_TKZfmutWTC2qVz';
    this.keySecret =
      this.configService.get<string>('razorpay.keySecret') ||
      process.env['RAZORPAY_KEY_SECRET'] ||
      'HCVaxXmOk5DzIWyLQqM8VNRs';
    this.webhookSecret =
      this.configService.get<string>('razorpay.webhookSecret') ||
      process.env['RAZORPAY_WEBHOOK_SECRET'] ||
      'qoas_razorpay_webhook_secret_2026';

    this.razorpay = new Razorpay({
      key_id: this.keyId,
      key_secret: this.keySecret,
    });
  }

  /**
   * Helper to ensure an active Family record exists for database relation constraints
   */
  private async getOrCreateFamily(familyNumber?: string, familyName?: string) {
    const fn = familyNumber || 'QOAS-2024-0001';
    let family = await this.prisma.family.findFirst({
      where: { OR: [{ familyNumber: fn }, { id: fn }] },
    });

    if (!family) {
      // Fallback: search any existing family
      family = await this.prisma.family.findFirst();
    }

    if (!family) {
      // Create a default parish family record
      family = await this.prisma.family.create({
        data: {
          familyNumber: fn,
          name: familyName || 'St. Mary Parish Family',
          headName: familyName || 'Joseph Anthony',
          headPhone: '+919876543210',
          headEmail: 'family@qoas.org',
          address: 'Main Church Road',
        },
      });
    }

    return family;
  }

  /**
   * Helper to get or create Payment Category
   */
  private async getOrCreateCategory(categoryName: string) {
    const slugCode = categoryName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_');

    let category = await this.prisma.paymentCategory.findFirst({
      where: {
        OR: [{ nameEn: { equals: categoryName, mode: 'insensitive' } }, { code: slugCode }],
      },
    });

    if (!category) {
      category = await this.prisma.paymentCategory.create({
        data: {
          code: slugCode,
          nameEn: categoryName,
          nameTa: categoryName,
          descriptionEn: `Contributions for ${categoryName}`,
          receiptPrefix: 'RCP',
        },
      });
    }

    return category;
  }

  /**
   * Create Razorpay Order & DB Payment Record
   */
  async createOrder(dto: CreateOrderDto) {
    try {
      this.logger.info({ category: dto.category, amount: dto.amount }, 'Creating Razorpay order');

      const amountPaise = Math.round(dto.amount * 100);
      const family = await this.getOrCreateFamily(dto.familyNumber, dto.familyName);
      const category = await this.getOrCreateCategory(dto.category);

      // Create Order via official Razorpay SDK
      const razorpayOrder = await this.razorpay.orders.create({
        amount: amountPaise,
        currency: 'INR',
        receipt: `rcp_ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        notes: {
          category: dto.category,
          purpose: dto.purpose,
          familyNumber: family.familyNumber,
          familyName: family.name,
        },
      });

      // Save initial payment record in DB
      const payment = await this.prisma.payment.create({
        data: {
          familyId: family.id,
          categoryId: category.id,
          categoryCode: category.code,
          categoryName: category.nameEn,
          amountPaise,
          currency: 'INR',
          status: PaymentState.CREATED,
          paymentMethod: 'ONLINE_RAZORPAY',
          razorpayOrderId: razorpayOrder.id,
          notes: dto.purpose,
          metadata: {
            contactPhone: dto.contactPhone,
            contactEmail: dto.contactEmail,
            familyNumber: dto.familyNumber || family.familyNumber,
            familyName: dto.familyName || family.name,
          },
        },
      });

      return {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: this.keyId,
        paymentId: payment.id,
      };
    } catch (err: unknown) {
      this.logger.error(err, 'Failed to create Razorpay Order');
      const message =
        err instanceof Error ? err.message : 'Razorpay order creation failed. Please try again.';
      throw new InternalServerErrorException(message);
    }
  }

  /**
   * Verify Razorpay HMAC-SHA256 Signature & Update Payment / Receipt
   */
  async verifyPayment(dto: VerifyPaymentDto) {
    this.logger.info(
      {
        orderId: dto.razorpayOrderId,
        paymentId: dto.razorpayPaymentId,
      },
      'Verifying Razorpay payment signature',
    );

    // Compute expected HMAC SHA-256 signature
    const hmac = crypto.createHmac('sha256', this.keySecret);
    hmac.update(`${dto.razorpayOrderId}|${dto.razorpayPaymentId}`);
    const expectedSignature = hmac.digest('hex');

    const expectedBuf = Buffer.from(expectedSignature, 'utf-8');
    const actualBuf = Buffer.from(dto.razorpaySignature, 'utf-8');

    const isSignatureValid =
      expectedBuf.length === actualBuf.length && crypto.timingSafeEqual(expectedBuf, actualBuf);

    // Look up existing payment record
    let payment = await this.prisma.payment.findFirst({
      where: {
        OR: [
          { razorpayOrderId: dto.razorpayOrderId },
          ...(dto.paymentId ? [{ id: dto.paymentId }] : []),
        ],
      },
      include: {
        family: true,
        receipt: true,
      },
    });

    if (!isSignatureValid) {
      this.logger.warn(
        { orderId: dto.razorpayOrderId, paymentId: dto.razorpayPaymentId },
        'Razorpay Signature Verification Failed',
      );

      if (payment) {
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentState.FAILED },
        });
      }

      throw new BadRequestException(
        'Payment verification failed: Invalid Razorpay cryptographic signature.',
      );
    }

    // Signature is VALID!
    const family = payment?.family
      ? payment.family
      : await this.getOrCreateFamily(dto.familyNumber, dto.familyName);

    const categoryName = dto.category || payment?.categoryName || 'Parish Contribution';
    const amountPaise = payment ? payment.amountPaise : Math.round((dto.amount || 100) * 100);

    if (!payment) {
      const category = await this.getOrCreateCategory(categoryName);
      payment = await this.prisma.payment.create({
        data: {
          familyId: family.id,
          categoryId: category.id,
          categoryCode: category.code,
          categoryName: category.nameEn,
          amountPaise,
          currency: 'INR',
          status: PaymentState.CREATED,
          paymentMethod: 'ONLINE_RAZORPAY',
          razorpayOrderId: dto.razorpayOrderId,
          notes: dto.purpose || 'Online Parish Contribution',
        },
        include: {
          family: true,
          receipt: true,
        },
      });
    }

    // Generate unique receipt number
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const receiptNumber = `RCP-${year}-${randomDigits}`;

    // Update payment record to VERIFIED & COMPLETED
    const updatedPayment = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentState.VERIFIED,
        razorpayPaymentId: dto.razorpayPaymentId,
        razorpaySignature: dto.razorpaySignature,
        paidAmountPaise: amountPaise,
        paidAt: new Date(),
      },
    });

    // Create printable Receipt record in DB if not already existing
    let receipt = payment.receipt;
    if (!receipt) {
      receipt = await this.prisma.receipt.create({
        data: {
          receiptNumber,
          paymentId: payment.id,
          familyId: family.id,
          familyNumber: dto.familyNumber || family.familyNumber,
          familyName: dto.familyName || family.name,
          categoryName: payment.categoryName,
          amountPaise,
          paymentMethod: 'ONLINE_RAZORPAY',
          transactionId: dto.razorpayPaymentId,
          issuedAt: new Date(),
        },
      });
    }

    return {
      success: true,
      verified: true,
      paymentId: updatedPayment.id,
      receiptNumber: receipt.receiptNumber,
      transactionId: dto.razorpayPaymentId,
      amount: amountPaise / 100,
      category: updatedPayment.categoryName,
      description: updatedPayment.notes || dto.purpose || 'Parish Contribution',
      date: new Date().toISOString().slice(0, 10),
    };
  }

  /**
   * Retrieve Payment by ID
   */
  async getPaymentById(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        category: true,
        family: true,
        receipt: true,
      },
    });

    if (!payment) {
      throw new NotFoundException(`Payment record #${id} not found.`);
    }

    return payment;
  }

  /**
   * Handle Webhooks from Razorpay
   */
  async handleWebhook(signature: string, payload: RazorpayWebhookPayload) {
    if (!signature) {
      throw new BadRequestException('Missing x-razorpay-signature header');
    }

    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(JSON.stringify(payload))
      .digest('hex');

    if (expectedSignature !== signature) {
      throw new BadRequestException('Invalid webhook signature');
    }

    const event = payload.event;
    this.logger.info({ event }, 'Processing Razorpay Webhook Event');

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payload?.payment?.entity;
      if (paymentEntity?.order_id && paymentEntity?.id) {
        const paymentRecord = await this.prisma.payment.findFirst({
          where: { razorpayOrderId: paymentEntity.order_id },
        });

        if (paymentRecord && paymentRecord.status !== PaymentState.VERIFIED) {
          await this.prisma.payment.update({
            where: { id: paymentRecord.id },
            data: {
              status: PaymentState.VERIFIED,
              razorpayPaymentId: paymentEntity.id,
              paidAmountPaise: paymentEntity.amount,
              paidAt: new Date(),
            },
          });
        }
      }
    }

    return { status: 'ok', received: true };
  }
}

export interface RazorpayPaymentEntity {
  id?: string;
  order_id?: string;
  amount?: number;
  currency?: string;
  status?: string;
  method?: string;
  email?: string;
  contact?: string;
  notes?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface RazorpayPaymentPayloadContainer {
  entity?: RazorpayPaymentEntity;
}

export interface RazorpayWebhookPayloadContainer {
  payment?: RazorpayPaymentPayloadContainer;
  order?: {
    entity?: {
      id?: string;
      amount?: number;
      status?: string;
      [key: string]: unknown;
    };
  };
  [key: string]: unknown;
}

export interface RazorpayWebhookPayload {
  event: string;
  entity?: string;
  contains?: string[];
  payload?: RazorpayWebhookPayloadContainer;
  created_at?: number;
  [key: string]: unknown;
}

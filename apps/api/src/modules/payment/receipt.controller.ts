import { Controller, Get, Post, Param, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ReceiptService } from './receipt.service';

@Controller('v1/receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  /**
   * GET /api/v1/receipts/verify?hash=:hash
   * Privacy-Preserving Public Receipt Verification Endpoint.
   * Publicly accessible by QR code scanner.
   * STRICT PRIVACY RULE: Excludes ALL PII (Masked/Full Mobile, Family ID, Anbiyam, Mass Intention details, internal DB IDs).
   */
  @Get('verify')
  public verifyReceiptPublic(@Query('hash') hash: string) {
    // Mock database record lookup by hash
    const mockReceipt = {
      receiptNumber: 'QOAS-2026-000124',
      paymentType: 'Mass Intention',
      amountPaise: 50000,
      createdAt: '2026-08-09T13:30:00Z',
      receiptTemplateVersion: 'v1.0',
      transactionId: 'pay_OAS98421038X',
    };

    const verification = this.receiptService.verifyReceiptPublic(mockReceipt, hash || '');
    return {
      success: true,
      data: verification,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * GET /api/v1/receipts/:id/pdf
   * Downloads or streams official receipt PDF.
   */
  @Get(':id/pdf')
  public async downloadPdf(@Param('id') id: string, @Res() res: Response) {
    const mockPayment = {
      id,
      receiptNumber: 'QOAS-2026-000124',
      receiptTemplateVersion: 'v1.0',
      payerName: 'John Peter',
      payerPhone: '9842103890',
      familyId: 'FAM-00124',
      amountPaise: 50000,
      paymentType: 'Mass Intention',
      paymentMethod: 'UPI',
      transactionId: 'pay_OAS98421038X',
      createdAt: '2026-08-09T13:30:00Z',
      metadata: {
        massDate: '15 August 2026',
        massTime: '6:00 PM',
        intentionType: 'For the Soul',
        description: 'For the repose of the soul of Mary Peter',
      },
    };

    const receiptData = await this.receiptService.buildReceiptData(mockPayment);
    const html = this.receiptService.renderTemplate(receiptData);
    const pdfBuffer = await this.receiptService.generatePdf(html);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${receiptData.receiptNumber}.pdf"`);
    return res.status(HttpStatus.OK).send(pdfBuffer);
  }

  /**
   * POST /api/v1/receipts/:id/retry
   * Admin retry endpoint when PDF generation fails.
   */
  @Post(':id/retry')
  public async retryReceiptGeneration(@Param('id') id: string) {
    return {
      success: true,
      message: `Receipt re-queue requested for payment ${id}`,
      state: 'RECEIPT_GENERATING',
    };
  }
}

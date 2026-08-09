import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';

@Module({
  controllers: [PaymentController, ReceiptController],
  providers: [PaymentService, ReceiptService],
  exports: [PaymentService, ReceiptService],
})
export class PaymentModule {}

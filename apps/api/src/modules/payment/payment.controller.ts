import { Controller, Get, Post, Body, Param, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService, RazorpayWebhookPayload } from './payment.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@ApiTags('payments')
@Controller({ path: 'payments', version: '1' })
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-order')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a official Razorpay Order for parish payment' })
  @ApiResponse({ status: 201, description: 'Razorpay order created successfully' })
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.paymentService.createOrder(dto);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify Razorpay payment signature and issue official receipt' })
  @ApiResponse({ status: 200, description: 'Razorpay payment verified and receipt generated' })
  @ApiResponse({ status: 400, description: 'Invalid cryptographic signature' })
  async verifyPayment(@Body() dto: VerifyPaymentDto) {
    return this.paymentService.verifyPayment(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment record by ID' })
  async getPaymentById(@Param('id') id: string) {
    return this.paymentService.getPaymentById(id);
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Handle Razorpay server-to-server webhook events' })
  async handleWebhook(
    @Headers('x-razorpay-signature') signature: string,
    @Body() payload: RazorpayWebhookPayload,
  ) {
    return this.paymentService.handleWebhook(signature, payload);
  }
}

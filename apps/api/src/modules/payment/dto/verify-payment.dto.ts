import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class VerifyPaymentDto {
  @ApiProperty({ description: 'Razorpay Payment ID', example: 'pay_P1x9AbCdeFghIj' })
  @IsString()
  @IsNotEmpty()
  razorpayPaymentId!: string;

  @ApiProperty({ description: 'Razorpay Order ID', example: 'order_P1x8XyzAbcDef' })
  @IsString()
  @IsNotEmpty()
  razorpayOrderId!: string;

  @ApiProperty({ description: 'Razorpay HMAC Signature', example: 'a1b2c3d4e5f6...' })
  @IsString()
  @IsNotEmpty()
  razorpaySignature!: string;

  @ApiPropertyOptional({ description: 'Internal Payment Record ID' })
  @IsString()
  @IsOptional()
  paymentId?: string;

  @ApiPropertyOptional({ description: 'Category Name', example: 'Church Tax' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ description: 'Purpose / Description', example: 'Church Tax Dues' })
  @IsString()
  @IsOptional()
  purpose?: string;

  @ApiPropertyOptional({ description: 'Amount in INR' })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({ description: 'Family Number' })
  @IsString()
  @IsOptional()
  familyNumber?: string;

  @ApiPropertyOptional({ description: 'Family Name' })
  @IsString()
  @IsOptional()
  familyName?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'Amount in INR (Rupees)', example: 500 })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amount!: number;

  @ApiProperty({ description: 'Payment category name', example: 'Church Tax' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({
    description: 'Purpose / description of payment',
    example: 'August 2026 Monthly Family Parish Tax Dues',
  })
  @IsString()
  @IsNotEmpty()
  purpose!: string;

  @ApiPropertyOptional({ description: 'Parish Family Number', example: 'QOAS-2024-0001' })
  @IsString()
  @IsOptional()
  familyNumber?: string;

  @ApiPropertyOptional({ description: 'Family / Donor Name', example: 'St. Mary Family' })
  @IsString()
  @IsOptional()
  familyName?: string;

  @ApiPropertyOptional({ description: 'Contributor Phone', example: '+919876543210' })
  @IsString()
  @IsOptional()
  contactPhone?: string;

  @ApiPropertyOptional({ description: 'Contributor Email', example: 'family@example.com' })
  @IsString()
  @IsOptional()
  contactEmail?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, Matches } from 'class-validator';

import { FAMILY_NUMBER_REGEX } from '@qoas/constants';

export class LoginDto {
  @ApiPropertyOptional({ example: 'john.doe@example.com', description: 'Email address' })
  @IsOptional()
  @IsEmail({}, { message: 'Must be a valid email address' })
  email?: string;

  @ApiPropertyOptional({ example: 'QOAS-2024-0001', description: 'Family registration number' })
  @IsOptional()
  @IsString()
  @Matches(FAMILY_NUMBER_REGEX, { message: 'Family number must match format QOAS-YYYY-NNNN' })
  familyNumber?: string;

  @ApiProperty({ example: 'SecurePass@123', description: 'User password' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(1)
  password!: string;
}

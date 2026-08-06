import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AnnouncementCategory } from '@prisma/client';
import { IsEnum, IsBoolean, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateAnnouncementDto {
  @ApiProperty({ description: 'Announcement title (English)' })
  @IsString()
  titleEn!: string;

  @ApiPropertyOptional({ description: 'Announcement title (Tamil)' })
  @IsString()
  @IsOptional()
  titleTa?: string;

  @ApiProperty({ description: 'Full announcement content text (English)' })
  @IsString()
  contentEn!: string;

  @ApiPropertyOptional({ description: 'Full announcement content text (Tamil)' })
  @IsString()
  @IsOptional()
  contentTa?: string;

  @ApiPropertyOptional({ enum: AnnouncementCategory, default: AnnouncementCategory.GENERAL })
  @IsEnum(AnnouncementCategory)
  @IsOptional()
  category?: AnnouncementCategory;

  @ApiPropertyOptional({ description: 'Is pinned to top of announcement feed', default: false })
  @IsBoolean()
  @IsOptional()
  isPinned?: boolean;

  @ApiPropertyOptional({ description: 'Is published and visible', default: true })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({ description: 'Publish date' })
  @IsDateString()
  @IsOptional()
  publishDate?: Date;

  @ApiPropertyOptional({ description: 'Auto expiration date' })
  @IsDateString()
  @IsOptional()
  expiryDate?: Date;

  @ApiPropertyOptional({ description: 'Primary attachment file URL' })
  @IsString()
  @IsOptional()
  attachmentUrl?: string;
}

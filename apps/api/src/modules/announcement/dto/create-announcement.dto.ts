import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AnnouncementCategory, AnnouncementPriority, AnnouncementAudience } from '@prisma/client';

export class CreateAnnouncementDto {
  @ApiProperty({ description: 'Announcement title (English or primary)' })
  title!: string;

  @ApiPropertyOptional({ description: 'Announcement title Tamil' })
  titleTa?: string;

  @ApiProperty({ description: 'Full announcement content text' })
  content!: string;

  @ApiPropertyOptional({ description: 'Full announcement content Tamil' })
  contentTa?: string;

  @ApiPropertyOptional({ description: 'Short summary for widgets & preview cards' })
  summary?: string;

  @ApiPropertyOptional({ enum: AnnouncementPriority, default: AnnouncementPriority.NORMAL })
  priority?: AnnouncementPriority;

  @ApiPropertyOptional({ enum: AnnouncementCategory, default: AnnouncementCategory.GENERAL })
  category?: AnnouncementCategory;

  @ApiPropertyOptional({ enum: AnnouncementAudience, default: AnnouncementAudience.EVERYONE })
  audience?: AnnouncementAudience;

  @ApiPropertyOptional({
    description: 'Target entity ID (e.g. specific Ministry ID or Anbiyam ID)',
  })
  targetId?: string;

  @ApiPropertyOptional({ description: 'Author User ID' })
  authorId?: string;

  @ApiPropertyOptional({ description: 'Author Display Name' })
  authorName?: string;

  @ApiPropertyOptional({ description: 'Author Role Title' })
  authorRole?: string;

  @ApiPropertyOptional({ description: 'Is pinned to top of announcement feed', default: false })
  isPinned?: boolean;

  @ApiPropertyOptional({ description: 'Is published and visible', default: true })
  isPublished?: boolean;

  @ApiPropertyOptional({ description: 'Publish date' })
  publishDate?: Date;

  @ApiPropertyOptional({ description: 'Auto expiration date' })
  expiryDate?: Date;

  @ApiPropertyOptional({ description: 'Primary attachment file URL' })
  attachmentUrl?: string;

  @ApiPropertyOptional({ description: 'JSON metadata or multiple attachments' })
  attachments?: Record<string, unknown>;
}

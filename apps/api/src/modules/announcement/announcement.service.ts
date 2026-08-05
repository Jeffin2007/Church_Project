import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import {
  AnnouncementCategory,
  AnnouncementPriority,
  AnnouncementAudience,
  Prisma,
} from '@prisma/client';

@Injectable()
export class AnnouncementService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAnnouncementDto) {
    return this.prisma.announcement.create({
      data: {
        title: dto.title,
        titleEn: dto.title,
        titleTa: dto.titleTa,
        content: dto.content,
        contentEn: dto.content,
        contentTa: dto.contentTa,
        summary: dto.summary ?? dto.content.slice(0, 150),
        priority: dto.priority ?? AnnouncementPriority.NORMAL,
        category: dto.category ?? AnnouncementCategory.GENERAL,
        audience: dto.audience ?? AnnouncementAudience.EVERYONE,
        targetId: dto.targetId,
        authorId: dto.authorId,
        authorName: dto.authorName ?? 'Parish Office',
        authorRole: dto.authorRole ?? 'Admin',
        isPinned: dto.isPinned ?? false,
        isPublished: dto.isPublished ?? true,
        publishDate: dto.publishDate ? new Date(dto.publishDate) : new Date(),
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
        attachmentUrl: dto.attachmentUrl,
        attachments: (dto.attachments as Prisma.InputJsonValue) ?? undefined,
      },
    });
  }

  async findAll(query?: {
    category?: AnnouncementCategory;
    priority?: AnnouncementPriority;
    audience?: AnnouncementAudience;
    targetId?: string;
    isPinned?: boolean;
    search?: string;
  }) {
    const where: Prisma.AnnouncementWhereInput = {
      deletedAt: null,
      isPublished: true,
      OR: [{ expiryDate: null }, { expiryDate: { gte: new Date() } }],
    };

    if (query?.category) {
      where.category = query.category;
    }
    if (query?.priority) {
      where.priority = query.priority;
    }
    if (query?.audience) {
      where.audience = query.audience;
    }
    if (query?.targetId) {
      where.targetId = query.targetId;
    }
    if (query?.isPinned !== undefined) {
      where.isPinned = query.isPinned;
    }
    if (query?.search) {
      where.AND = [
        {
          OR: [
            { titleEn: { contains: query.search, mode: 'insensitive' } },
            { contentEn: { contains: query.search, mode: 'insensitive' } },
            { summary: { contains: query.search, mode: 'insensitive' } },
          ],
        },
      ];
    }

    return this.prisma.announcement.findMany({
      where,
      orderBy: [{ isPinned: 'desc' }, { publishDate: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.announcement.findFirst({
      where: { id, deletedAt: null },
    });
    if (!item) {
      throw new NotFoundException(`Announcement with ID "${id}" not found`);
    }
    return item;
  }

  async update(id: string, dto: UpdateAnnouncementDto) {
    await this.findOne(id);
    return this.prisma.announcement.update({
      where: { id },
      data: {
        title: dto.title,
        titleEn: dto.title,
        titleTa: dto.titleTa,
        content: dto.content,
        contentEn: dto.content,
        contentTa: dto.contentTa,
        summary: dto.summary,
        priority: dto.priority,
        category: dto.category,
        audience: dto.audience,
        targetId: dto.targetId,
        authorName: dto.authorName,
        authorRole: dto.authorRole,
        isPinned: dto.isPinned,
        isPublished: dto.isPublished,
        publishDate: dto.publishDate ? new Date(dto.publishDate) : undefined,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
        attachmentUrl: dto.attachmentUrl,
        attachments: (dto.attachments as Prisma.InputJsonValue) ?? undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.announcement.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

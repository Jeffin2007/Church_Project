import { Injectable, NotFoundException } from '@nestjs/common';
import { AnnouncementCategory, Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAnnouncementDto) {
    return this.prisma.announcement.create({
      data: {
        titleEn: dto.titleEn,
        titleTa: dto.titleTa ?? dto.titleEn,
        contentEn: dto.contentEn,
        contentTa: dto.contentTa ?? dto.contentEn,
        category: dto.category ?? AnnouncementCategory.GENERAL,
        isPinned: dto.isPinned ?? false,
        isPublished: dto.isPublished ?? true,
        publishDate: dto.publishDate ? new Date(dto.publishDate) : new Date(),
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
        attachmentUrl: dto.attachmentUrl,
      },
    });
  }

  async findAll(query?: { category?: AnnouncementCategory; isPinned?: boolean; search?: string }) {
    const where: Prisma.AnnouncementWhereInput = {
      deletedAt: null,
      isPublished: true,
      OR: [{ expiryDate: null }, { expiryDate: { gte: new Date() } }],
    };

    if (query?.category) {
      where.category = query.category;
    }
    if (query?.isPinned !== undefined) {
      where.isPinned = String(query.isPinned) === 'true' || query.isPinned === true;
    }
    if (query?.search) {
      where.AND = [
        {
          OR: [
            { titleEn: { contains: query.search, mode: 'insensitive' } },
            { titleTa: { contains: query.search, mode: 'insensitive' } },
            { contentEn: { contains: query.search, mode: 'insensitive' } },
            { contentTa: { contains: query.search, mode: 'insensitive' } },
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
        ...(dto.titleEn !== undefined && { titleEn: dto.titleEn }),
        ...(dto.titleTa !== undefined && { titleTa: dto.titleTa }),
        ...(dto.contentEn !== undefined && { contentEn: dto.contentEn }),
        ...(dto.contentTa !== undefined && { contentTa: dto.contentTa }),
        ...(dto.category !== undefined && { category: dto.category }),
        ...(dto.isPinned !== undefined && { isPinned: dto.isPinned }),
        ...(dto.isPublished !== undefined && { isPublished: dto.isPublished }),
        ...(dto.publishDate !== undefined && { publishDate: new Date(dto.publishDate) }),
        ...(dto.expiryDate !== undefined && {
          expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        }),
        ...(dto.attachmentUrl !== undefined && { attachmentUrl: dto.attachmentUrl }),
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

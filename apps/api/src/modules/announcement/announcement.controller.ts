import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnnouncementCategory } from '@prisma/client';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('announcements')
@Controller({ path: 'announcements', version: '1' })
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @ApiOperation({ summary: 'Create new parish announcement' })
  create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementService.create(createAnnouncementDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get published parish announcements with filters' })
  findAll(
    @Query('category') category?: AnnouncementCategory,
    @Query('isPinned') isPinned?: boolean,
    @Query('search') search?: string,
  ) {
    return this.announcementService.findAll({ category, isPinned, search });
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get announcement by ID' })
  findOne(@Param('id') id: string) {
    return this.announcementService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update announcement' })
  update(@Param('id') id: string, @Body() updateAnnouncementDto: UpdateAnnouncementDto) {
    return this.announcementService.update(id, updateAnnouncementDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete announcement (soft delete)' })
  remove(@Param('id') id: string) {
    return this.announcementService.remove(id);
  }
}

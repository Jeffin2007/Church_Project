import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { FamilyService, CreateFamilyMemberDto } from './family.service';
import { Role } from '../../common/enums/role.enum';
import * as fs from 'fs';
import * as path from 'path';

interface AuthenticatedRequest {
  user?: {
    role?: Role;
  };
}

interface UploadedCertificateFile {
  originalname: string;
  mimetype?: string;
  size?: number;
  buffer?: Buffer;
}

@ApiTags('family')
@Controller({ path: 'family', version: '1' })
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get()
  @ApiOperation({ summary: 'List all active parish families' })
  findAllFamilies(@Request() req: AuthenticatedRequest) {
    const userRole = req.user?.role;
    return this.familyService.findAllFamilies(userRole);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get family profile with registered members' })
  findFamilyById(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const userRole = req.user?.role;
    return this.familyService.findFamilyById(id, userRole);
  }

  @Get(':familyId/members')
  @ApiOperation({ summary: 'List members for a specific family' })
  findMembersByFamily(@Param('familyId') familyId: string, @Request() req: AuthenticatedRequest) {
    const userRole = req.user?.role;
    return this.familyService.findMembersByFamily(familyId, userRole);
  }

  @Post('members')
  @ApiOperation({ summary: 'Register a new family member with sacraments & details' })
  createMember(@Body() dto: CreateFamilyMemberDto, @Request() req: AuthenticatedRequest) {
    const userRole = req.user?.role;
    return this.familyService.createMember(dto, userRole);
  }

  @Put('members/:id')
  @ApiOperation({ summary: 'Update an existing family member profile' })
  updateMember(
    @Param('id') id: string,
    @Body() dto: Partial<CreateFamilyMemberDto>,
    @Request() req: AuthenticatedRequest,
  ) {
    const userRole = req.user?.role;
    return this.familyService.updateMember(id, dto, userRole);
  }

  @Delete('members/:id')
  @ApiOperation({ summary: 'Archive/Delete a family member' })
  deleteMember(@Param('id') id: string) {
    return this.familyService.deleteMember(id);
  }

  // Database-backed registration draft endpoints
  @Post('members/draft')
  @ApiOperation({ summary: 'Save family member registration draft to server database' })
  async saveDraft(@Body() body: { familyId: string; draftData: Record<string, unknown> }) {
    if (!body.familyId || !body.draftData) {
      throw new BadRequestException('familyId and draftData are required');
    }
    await this.familyService.saveDraft(
      body.familyId,
      body.draftData as unknown as import('@prisma/client').Prisma.InputJsonValue,
    );
    return { success: true, message: 'Draft saved to database successfully' };
  }

  @Get('members/draft/:familyId')
  @ApiOperation({ summary: 'Get saved family member registration draft' })
  async getDraft(@Param('familyId') familyId: string) {
    const draft = await this.familyService.getDraft(familyId);
    return { success: true, draft: draft || null };
  }

  // Certificate Document Upload Endpoint
  @Post('members/upload-document')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload scanned sacramental certificate' })
  async uploadCertificate(@UploadedFile() file: UploadedCertificateFile) {
    if (!file) {
      throw new BadRequestException('No certificate file provided');
    }

    // Ensure uploads folder exists inside public/uploads/certificates
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'certificates');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileExt = path.extname(file.originalname) || '.pdf';
    const filename = `cert-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${fileExt}`;
    const filePath = path.join(uploadDir, filename);

    if (file.buffer) {
      fs.writeFileSync(filePath, file.buffer);
    }

    const publicUrl = `/uploads/certificates/${filename}`;

    return {
      success: true,
      document: {
        id: `doc-${Date.now()}`,
        name: file.originalname,
        type: file.mimetype || 'application/pdf',
        size: file.size || (file.buffer ? file.buffer.length : 0),
        url: publicUrl,
        uploadedAt: new Date().toISOString(),
      },
    };
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CmsService } from './cms.service';

@ApiTags('cms')
@Controller({ path: 'cms', version: '1' })
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get()
  @ApiOperation({ summary: 'List cmss — stub, implemented in Sprint 1' })
  findAll(): string {
    return this.cmsService.findAll();
  }
}

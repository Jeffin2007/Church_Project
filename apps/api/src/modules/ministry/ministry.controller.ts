import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MinistryService } from './ministry.service';

@ApiTags('ministry')
@Controller({ path: 'ministry', version: '1' })
export class MinistryController {
  constructor(private readonly ministryService: MinistryService) {}

  @Get()
  @ApiOperation({ summary: 'List ministrys — stub, implemented in Sprint 1' })
  findAll(): string {
    return this.ministryService.findAll();
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FamilyService } from './family.service';

@ApiTags('family')
@Controller({ path: 'family', version: '1' })
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get()
  @ApiOperation({ summary: 'List familys — stub, implemented in Sprint 1' })
  findAll(): string {
    return this.familyService.findAll();
  }
}

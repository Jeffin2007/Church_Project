import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RequestService } from './request.service';

@ApiTags('request')
@Controller({ path: 'request', version: '1' })
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get()
  @ApiOperation({ summary: 'List requests — stub, implemented in Sprint 1' })
  findAll(): string {
    return this.requestService.findAll();
  }
}

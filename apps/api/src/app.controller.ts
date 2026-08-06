import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from './common/decorators/public.decorator';

@ApiTags('root')
@Public()
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API root health & status' })
  root() {
    return {
      success: true,
      message: 'Queen of All Saints Digital Parish API is running',
      version: '1.0',
      environment: 'demo',
    };
  }
}

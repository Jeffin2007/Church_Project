import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getRoot() {
    return {
      success: true,
      message: 'Queen of All Saints Digital Parish API is running',
      version: '1.0',
      environment: 'demo',
    };
  }
}

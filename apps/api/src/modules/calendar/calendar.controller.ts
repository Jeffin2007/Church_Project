import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CalendarService } from './calendar.service';

@ApiTags('calendar')
@Controller({ path: 'calendar', version: '1' })
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  @ApiOperation({ summary: 'List calendars — stub, implemented in Sprint 1' })
  findAll(): string {
    return this.calendarService.findAll();
  }
}

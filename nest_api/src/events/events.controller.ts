import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventDto } from './dto/event.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { LogEntry } from './schemas/log.schema';

@ApiTags('main')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('process-event')
  async processEvent(@Body() dto: EventDto): Promise<void> {
    return this.eventsService.processEvent(dto);
  }

  @Get('logs')
  async getLogs(): Promise<LogEntry[]> {
    return this.eventsService.getAllLogs();
  }
}

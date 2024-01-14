import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './events.controller';
import { LoggingService } from './services/logging.service';
import { LoggingRepository } from './repositories/logging.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { LogEntrySchema } from './schemas/log.schema';
import { StrategyService } from './services/strategy.service';
import { TransportService } from './services/transport.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'logs', schema: LogEntrySchema }]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [EventsController],
  providers: [
    EventsService,
    LoggingService,
    LoggingRepository,
    StrategyService,
    TransportService,
  ],
})
export class EventsModule {}

import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './events.controller';
import { LoggingService } from './services/logging.service';
import { LoggingRepository } from './repositories/logging.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { LogEntrySchema } from './schemas/log.schema';
import { StrategyService } from './services/strategy.service';
import { TransportService } from './services/transport.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'logs', schema: LogEntrySchema }]),
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

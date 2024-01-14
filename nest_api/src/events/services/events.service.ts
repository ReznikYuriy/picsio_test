import { Injectable } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { StrategyService } from './strategy.service';
import { TransportService } from './transport.service';
import { EventDto } from '../dto/event.dto';
import { DESTINATIONS } from './destinations.config';

@Injectable()
export class EventsService {
  constructor(
    private readonly loggingService: LoggingService,
    private readonly strategyService: StrategyService,
    private readonly transportService: TransportService,
  ) {}

  async processEvent(eventDto: EventDto): Promise<void> {
    try {
      const strategy = eventDto.strategy || 'ALL';

      const { possibleDestinations } = eventDto;

      const pdSet = new Set<string>();
      for (const pd of possibleDestinations) {
        const keysArr: string[] = Object.keys(pd);
        keysArr.forEach((item) => pdSet.add(item));
      }
      const logObj = {};
      for (const currentDest of pdSet) {
        const intent = DESTINATIONS.find((item) => item.name === currentDest);
        if (!!intent) {
          const strategyResult = this.strategyService.applyStrategy(
            strategy,
            currentDest,
            possibleDestinations,
          );
          if (strategyResult) {
            await this.transportService.sendPayload(
              intent.transport,
              intent.url,
              eventDto.payload,
            );
          }
          logObj[currentDest] = strategyResult;
        } else {
          console.log('UnknownDestinationError');
          logObj[currentDest] = false;
        }
      }

      await this.loggingService.logRequestAndResponse(eventDto, logObj);
    } catch (error) {
      // Log the error
      await this.loggingService.logRequestAndResponse(eventDto, {
        success: false,
        error: error.message,
      });
      throw error;
    }
  }
}

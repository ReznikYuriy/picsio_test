import { Injectable } from '@nestjs/common';
import { LoggingRepository } from '../repositories/logging.repository';

@Injectable()
export class LoggingService {
  constructor(private readonly logEntryRepo: LoggingRepository) {}

  async logRequestAndResponse(request: any, response: any): Promise<void> {
    return this.logEntryRepo.create(request, response);
  }
}

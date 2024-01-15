import { Injectable } from '@nestjs/common';
import { LoggingRepository } from '../repositories/logging.repository';
import { LogEntry } from '../schemas/log.schema';

@Injectable()
export class LoggingService {
  constructor(private readonly logEntryRepo: LoggingRepository) {}

  async logRequestAndResponse(request: any, response: any): Promise<void> {
    return this.logEntryRepo.create(request, response);
  }

  async getAllLogs(): Promise<LogEntry[]> {
    return this.logEntryRepo.getAllLogs();
  }
}

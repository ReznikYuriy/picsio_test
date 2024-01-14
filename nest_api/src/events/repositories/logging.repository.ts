import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogEntry } from '../schemas/log.schema';

@Injectable()
export class LoggingRepository {
  constructor(@InjectModel('logs') private logEntryModel: Model<LogEntry>) {}

  async create(request: any, response: any): Promise<void> {
    const logEntry = {
      request,
      response,
      timestamp: new Date(),
    };
    await this.logEntryModel.create(logEntry);
  }
}

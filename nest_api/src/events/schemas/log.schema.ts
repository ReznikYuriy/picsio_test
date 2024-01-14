import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogEntryDocument = HydratedDocument<LogEntry>;

@Schema()
export class LogEntry {
  @Prop({ type: Object })
  request: object;

  @Prop({ type: Object })
  response: object;

  @Prop({ type: Date })
  timestamp: Date;
}

export const LogEntrySchema = SchemaFactory.createForClass(LogEntry);

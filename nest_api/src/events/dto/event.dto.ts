export class EventDto {
  payload: Record<string, any>;
  possibleDestinations: Array<Record<string, boolean>>;
  strategy?: string;
}

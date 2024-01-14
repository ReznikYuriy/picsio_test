import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransportService {
  constructor(private readonly httpService: HttpService) {}

  async sendPayload(
    transport: string,
    url: string,
    payload: Record<string, any>,
  ): Promise<void> {
    switch (transport) {
      case 'http.post':
        {
          await this.httpService.post(url, payload);
          console.log('http.post', url);
        }
        break;
      case 'http.get':
        {
          await this.httpService.get(url);
          console.log('http.get', url);
        }
        break;
      case 'http.put':
        {
          this.httpService.put(url, payload);
          console.log('http.put', url);
        }
        break;
      case 'console.log':
        {
          console.log({ payload });
        }
        break;
      case 'console.warn':
        {
          console.warn({ payload });
        }
        break;
      default:
        console.log('Type of transport not defined.');
        break;
    }
  }
}

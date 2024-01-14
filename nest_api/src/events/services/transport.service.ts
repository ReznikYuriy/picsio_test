import { Injectable } from '@nestjs/common';
//import axios from 'axios';

@Injectable()
export class TransportService {
  async sendPayload(
    transport: string,
    url: string,
    payload: Record<string, any>,
  ): Promise<void> {
    console.log({ transport });
    switch (transport) {
      case 'http.post':
        {
          //await axios.post(url, payload);
          console.log('http.post', url);
        }
        break;
      case 'http.get':
        {
          //await axios.get(url, payload);
          console.log('http.get', url);
        }
        break;
      case 'http.put':
        {
          //await axios.put(url, payload);
          console.log('http.put', url);
        }
        break;
      case 'http.put':
        {
          //await axios.put(url, payload);
          console.log('http.put');
        }
        break;
      case 'http.put':
        {
          //await axios.put(url, payload);
          console.log('http.put');
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

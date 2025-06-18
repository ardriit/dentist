import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getData(): Promise<{ id: number; email: string }> {
    const blla = {
      id: 1,
      email: 'test',
    };
    return blla;
  }
}

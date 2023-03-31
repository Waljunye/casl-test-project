import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, based on framework carcass of users and posts app!';
  }
}

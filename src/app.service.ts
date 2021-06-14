import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sayHello(): string {
    return 'This app is a simple uptime monitor that alert you when the ping stops!';
  }
}

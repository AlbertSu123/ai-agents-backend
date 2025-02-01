import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/health')
  healthCheck(): Record<string, any> {
    return { ping: true };
  }
}

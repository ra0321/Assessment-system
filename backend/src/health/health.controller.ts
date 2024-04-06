import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private readonly logger: Logger) {}

  @Get()
  @HealthCheck()
  check() {
    return {
      status: 'OK',
    };
  }
}

import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { ApiHealthIndicator } from './health.indicator';

@Controller({ path: 'health' })
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: ApiHealthIndicator,
    private db: MongooseHealthIndicator,
  ) {}

  @Get('check')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('server'),
      () => this.db.pingCheck('database'),
    ]);
  }
}

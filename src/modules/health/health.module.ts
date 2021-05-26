import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ApiHealthIndicator } from './health.indicator';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [ApiHealthIndicator],
})
export class HealthModule {}

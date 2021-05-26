import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
  HealthCheckService,
  MongooseHealthIndicator,
  TerminusModule,
} from '@nestjs/terminus';
import * as request from 'supertest';
import { HealthController } from 'modules/health/health.controller';
import { ApiHealthIndicator } from 'modules/health/health.indicator';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [
        ApiHealthIndicator,
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn(async (arrayOfCallback) => {
              const checks: Record<string, string>[] = await Promise.all(
                arrayOfCallback.map((callback) => callback()),
              );

              const healthResult = checks.reduce(
                (acc, result) => {
                  return {
                    ...acc,
                    info: { ...acc.info, ...result },
                    details: { ...acc.details, ...result },
                  };
                },
                {
                  status: 'ok',
                  info: {},
                  error: {},
                  details: {},
                },
              );

              return healthResult;
            }),
          },
        },
        {
          provide: MongooseHealthIndicator,
          useValue: {
            pingCheck: jest.fn(() =>
              Promise.resolve({
                database: {
                  status: 'up',
                },
              }),
            ),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health/check (GET)', () => {
    return request(app.getHttpServer()).get('/health/check').expect(200);
  });
});

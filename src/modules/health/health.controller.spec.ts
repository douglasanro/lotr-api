import { Test, TestingModule } from '@nestjs/testing';
import {
  TerminusModule,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ApiHealthIndicator } from './health.indicator';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    healthController = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('health check', () => {
    it('should call health check correctly', () => {
      const expectResult = {
        details: {
          database: {
            status: 'up',
          },
          server: {
            status: 'up',
          },
        },
        error: {},
        info: {
          database: {
            status: 'up',
          },
          server: {
            status: 'up',
          },
        },
        status: 'ok',
      };
      expect(healthController.check()).resolves.toEqual(expectResult);
    });
  });
});

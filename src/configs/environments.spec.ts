import ENVIRONMENTS from './environments';

describe('Environments', () => {
  const oldEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...oldEnv };
  });

  it('should be defined', () => {
    process.env.SERVER_PORT = '8000';
    process.env.MONGODB_URL = 'mongodb://localhost:27017/test';
    const expectedEnvironments = {
      SERVER: {
        PORT: '8000',
      },
      MONGODB: {
        URL: 'mongodb://localhost:27017/test',
      },
    };
    expect(ENVIRONMENTS()).toEqual(expectedEnvironments);
  });

  it('should be defined by default values', () => {
    const expectedEnvironments = {
      SERVER: {
        PORT: '8080',
      },
      MONGODB: {
        URL: '',
      },
    };
    expect(ENVIRONMENTS()).toEqual(expectedEnvironments);
  });
});

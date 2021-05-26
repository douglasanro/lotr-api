export default () => ({
  SERVER: {
    PORT: process.env.SERVER_PORT ?? '8080',
  },
  MONGODB: {
    URL: process.env.MONGODB_URL ?? '',
  },
});

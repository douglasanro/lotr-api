import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import ENVIRONMENTS from 'configs/environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  await app.listen(ENVIRONMENTS().SERVER.PORT);
}
bootstrap();

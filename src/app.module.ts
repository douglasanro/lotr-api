import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './modules/health/health.module';
import ENVIRONMENTS from './configs/environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ENVIRONMENTS],
    }),
    MongooseModule.forRoot(ENVIRONMENTS().MONGODB.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 60000,
    }),
    TerminusModule,
    HealthModule,
  ],
})
export class AppModule {}

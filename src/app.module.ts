import { HealthCheckModule } from './health-check/healthCheck.module';
import { BeetrackModule } from './beetrack/beetrack.module';
import { LoggerModule } from './logger/logger.module';
import { OracleModule } from './oracle/oracle.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    HealthCheckModule,
    BeetrackModule,
    LoggerModule,
    OracleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }

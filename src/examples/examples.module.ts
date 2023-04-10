import { OracleService } from './oracle.service';
import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import WinstonLoggerService from '../logger/logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [OracleModule, ConfigModule],
  exports: [],
  controllers: [],
  providers: [WinstonLoggerService],
})
export class OracleModule {}

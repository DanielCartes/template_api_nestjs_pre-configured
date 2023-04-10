import { OracleService } from './oracle.service';
import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import WinstonLoggerService from '../logger/logger.service';

@Module({
  imports: [LoggerModule],
  exports: [OracleService],
  controllers: [],
  providers: [OracleService, WinstonLoggerService],
})
export class OracleModule {}

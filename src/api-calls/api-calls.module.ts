import { Module } from '@nestjs/common';
import { ApiCallsController } from './api-calls.controller';
import { ApiCallsService } from './api-calls.service';

@Module({
  controllers: [ApiCallsController],
  providers: [ApiCallsService]
})
export class ApiCallsModule {}

import { Module } from '@nestjs/common';
import { ApiCallsModule } from './api-calls/api-calls.module';

@Module({
  imports: [ApiCallsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

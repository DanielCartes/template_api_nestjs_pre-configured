/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { OracleModule } from '../oracle/oracle.module';
import { HealthController } from './healthCheck.controller';

@Module({
    imports: [TerminusModule, OracleModule],
    controllers: [HealthController]
})
export class HealthCheckModule { }

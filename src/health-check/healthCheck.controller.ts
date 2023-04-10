import { Controller, Get, HttpStatus, Res, Response } from '@nestjs/common';
import { OracleService } from '../oracle/oracle.service';

@Controller("health")
export class HealthController {
  constructor(
    private readonly oracleService: OracleService,
  ) {}

  @Get('liveness')
  async liveness(@Res() res) {
    const dbConnectionHealthCheck = await this.oracleService.checkConnection()
    if (dbConnectionHealthCheck) {
      return res.status(HttpStatus.OK).send();
    }
    return res.status(HttpStatus.SERVICE_UNAVAILABLE).send({ message: 'Database connection failed'});
  }

  @Get("readiness")
  async readiness(@Res() res) {
    const dbConnectionHealthCheck = await this.oracleService.checkConnection()
    if (dbConnectionHealthCheck) {
      return res.status(HttpStatus.OK).send();
    }
    return res.status(HttpStatus.SERVICE_UNAVAILABLE).send({ message: 'Database connection failed'});
  }
}
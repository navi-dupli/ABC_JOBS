import { Injectable, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MicroserviceStatusDto } from '../dtos/microservice-status.dto';
import { groupBy } from 'lodash';
import { MicroserviceStatusLiteDto } from '../dtos/microservice-status-lite.dto';
import { MicroserviceStatusService } from '../microservice-status/microservice-status.service';
import * as process from 'process';
import { v4 as uuidv4 } from 'uuid';
import { StoringService } from "./storing-schedule.service";

@Injectable()
export class CheckingScheduleService {
  private readonly logger = new Logger(CheckingScheduleService.name);
  private static readonly _cronCheckInterval = process.env.CRON_CHECK_INTERVAL || CronExpression.EVERY_SECOND;

  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicador: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Cron(CheckingScheduleService._cronCheckInterval, {
    name: 'health_check_checking_job',
    disabled: !process.env.SCHEDULE_CHECKING_STATUS_ENABLED,
  })
  @HealthCheck()
  async healthCheckingJob() {
    this.logger.log(`Checking health status of ${StoringService._instanceId} ${new Date().toISOString()}`);
    try {
      const healthCheckResultPromise: HealthCheckResult = await this.healthCheckService.check([
        () => this.typeOrmHealthIndicador.pingCheck('database', { timeout: 2000 }),
        () => this.memory.checkHeap('memory_heap', 400 * 1024 * 1024),
      ]);
      const date = new Date();
      const microserviceStatusDto: MicroserviceStatusDto = StoringService.mapHealthCheckResultToFirebase(
        healthCheckResultPromise,
        date,
      );
      const documentId = StoringService._instanceId + ':' + microserviceStatusDto.timestamp;
      StoringService._store.set(documentId, microserviceStatusDto);
    } catch (err) {
      this.logger.error(err);
      const date = new Date();
      const microserviceStatusDto: MicroserviceStatusDto = StoringService.mapHealthCheckResultToFirebase(
        {
          error: JSON.stringify(err),
        } as unknown as HealthCheckResult,
        date,
      );
      const documentId = StoringService._instanceId + ':' + microserviceStatusDto.timestamp;
      StoringService._store.set(documentId, microserviceStatusDto);
    }
  }


}

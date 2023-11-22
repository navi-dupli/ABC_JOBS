import { Injectable, Logger } from '@nestjs/common';
import { HealthCheckResult, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Interval } from '@nestjs/schedule';
import { MicroserviceStatusDto } from '../dtos/microservice-status.dto';
import * as process from 'process';
import { StoringService } from './storing-schedule.service';

@Injectable()
export class CheckingScheduleService {
  private readonly logger = new Logger(CheckingScheduleService.name);
  private static readonly _cronCheckInterval = parseInt(process.env.CRON_CHECK_INTERVAL) || 1000;

  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicador: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Interval('health_check_checking_job', CheckingScheduleService._cronCheckInterval)
  async checkStatusJob() {
    if (process.env.SCHEDULE_CHECKING_STATUS_ENABLED === 'true') {
      await this.checkStatus();
    }
  }

  async checkStatus() {
    this.logger.log(`Checking health status of ${StoringService._instanceId} ${new Date().toISOString()}`);
    try {
      const healthCheckResultPromise: HealthCheckResult = await this.healthCheckService.check([
        //() => this.typeOrmHealthIndicador.pingCheck('database', { timeout: 2000 }),
        () => this.memory.checkHeap('memory_heap', 400 * 1024 * 1024),
      ]);
      const date = new Date();
      const microserviceStatusDto: MicroserviceStatusDto = StoringService.mapHealthCheckResultToFirebase(healthCheckResultPromise, date);
      const documentId = StoringService._instanceId + ':' + microserviceStatusDto.timestamp;
      StoringService._store.set(documentId, microserviceStatusDto);
      return microserviceStatusDto;
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
      return microserviceStatusDto;
    }
  }
}

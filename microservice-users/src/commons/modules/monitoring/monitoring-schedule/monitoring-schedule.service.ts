import { Injectable, Logger } from '@nestjs/common';
import { HealthCheckResult, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FirebaseServiceService } from '../firebase-service/firebase-service.service';
import { MicroserviceStatusDto } from '../dtos/microservice-status.dto';
import { groupBy } from 'lodash';
import { MicroserviceStatusLite } from '../dtos/microservice-status-lite';
import { MicroserviceStatusService } from '../microservice-status/microservice-status.service';
import * as process from 'process';

@Injectable()
export class MonitoringScheduleService {
  private readonly _collection = 'hearth-beat-monitoring';
  private readonly logger = new Logger(MonitoringScheduleService.name);
  private readonly _maxRowsToProcess: number = process.env.MAX_ROWS_TO_CHECK
    ? parseInt(process.env.MAX_ROWS_TO_CHECK)
    : 500;
  private readonly _deltaTimeToProcess: number = process.env.DELTA_TIMIE_TO_PROCESS
    ? parseInt(process.env.DELTA_TIMIE_TO_PROCESS)
    : 5000;

  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicador: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private firebaseService: FirebaseServiceService,
    private microserviceStatusService: MicroserviceStatusService,
  ) {}

  @Cron(CronExpression.EVERY_SECOND, {
    name: 'health_check_reporting_job',
    disabled: !process.env.SCHEDULE_REPORTING_STATUS_ENABLED,
  })
  async healthCheckReportingJob() {
    const healthCheckResultPromise: HealthCheckResult = await this.healthCheckService.check([
      () => this.typeOrmHealthIndicador.pingCheck('database', { timeout: 300 }),
      () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
    ]);
    const date = new Date();
    const microserviceStatusDto: MicroserviceStatusDto = this.mapHealthCheckResultToFirebase(
      healthCheckResultPromise,
      date,
    );
    await this.firebaseService.save(
      this._collection,
      microserviceStatusDto.microservice + ':' + microserviceStatusDto.timestamp,
      microserviceStatusDto,
    );
  }

  @Cron(CronExpression.EVERY_SECOND, {
    name: 'health_check_consulting_job',
    disabled: !process.env.SCHEDULE_CONSULTING_STATUS_ENABLED,
  })
  async healthCheckConsultingJob() {
    // consulta os ultimos 5 segundos
    const currentDate = new Date();
    const date = new Date(currentDate.getTime() - this._deltaTimeToProcess);
    const documents = await this.firebaseService.getFiltered(
      this._collection,
      [{ field: 'timestamp', condition: '>=', value: date.toISOString() }],
      this._maxRowsToProcess,
    );
    if (documents.docs) {
      const microserviceStatusDtos = documents.docs.map((doc) => {
        return doc.data() as MicroserviceStatusDto;
      });
      this.reportStatus(microserviceStatusDtos);
    }
  }

  private reportStatus(documents: MicroserviceStatusDto[]) {
    const groupedMicroserviceStatusDtos = groupBy(documents, (dto) => dto.microservice);

    const entries = Object.entries(groupedMicroserviceStatusDtos);
    // Itera sobre los grupos de objetos
    for (const [microservice, microserviceStatus] of entries) {
      const count = microserviceStatus.length;
      const healthyCount = microserviceStatus.filter((dto) => dto.healthy).length;
      const maxTimestamp: string = microserviceStatus.reduce((maxTimestamp, dto) => {
        return dto.timestamp > maxTimestamp ? dto.timestamp : maxTimestamp;
      }, '');

      const microserviceStatusLite: MicroserviceStatusLite = {
        totalStatusRows: count,
        index: count / healthyCount,
        lastCheck: maxTimestamp,
      };
      this.microserviceStatusService.setMicroserviceStatus(microservice, microserviceStatusLite);
    }
    const microservicesStatus = this.microserviceStatusService.getMicroservicesStatus();
    this.logger.log(microservicesStatus.keys());
    this.logger.log(JSON.stringify(microservicesStatus.values()));
  }

  private mapHealthCheckResultToFirebase(healthCheckResult: HealthCheckResult, date: Date): MicroserviceStatusDto {
    return {
      timestamp: date.toISOString(),
      microservice: process.env.NAME || 'unknown',
      instanceId: process.env.INSTANCE_ID || 'localhost',
      status: healthCheckResult.status,
      healthy: healthCheckResult.status === 'ok',
      info: healthCheckResult.info,
      error: healthCheckResult.error,
      healthInfo: healthCheckResult,
    } as MicroserviceStatusDto;
  }
}

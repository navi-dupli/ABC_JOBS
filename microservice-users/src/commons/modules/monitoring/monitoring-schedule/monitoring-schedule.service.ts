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

@Injectable()
export class MonitoringScheduleService {
  private readonly _collectionName = 'hearth-beat-monitoring';
  private readonly logger = new Logger(MonitoringScheduleService.name);
  private readonly _maxRowsToProcess: number = process.env.MAX_ROWS_TO_CHECK
    ? parseInt(process.env.MAX_ROWS_TO_CHECK)
    : 500;
  private readonly _deltaTimeToProcess: number = process.env.DELTA_TIMIE_TO_PROCESS
    ? parseInt(process.env.DELTA_TIMIE_TO_PROCESS)
    : 5000;
  private static readonly _instanceId = process.env.K_REVISION + ':' + uuidv4();
  private static readonly _cronCheckInterval = process.env.CRON_CHECK_INTERVAL || CronExpression.EVERY_SECOND;
  private static readonly _cronReportInterval = process.env.CRON_REPORT_INTERVAL || CronExpression.EVERY_5_SECONDS;
  private static readonly _cronVerifyInterval = process.env.CRON_VERIFY_INTERVAL || CronExpression.EVERY_SECOND;

  private static _store: Map<string, MicroserviceStatusDto> = new Map<string, MicroserviceStatusDto>();

  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicador: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private firebaseService: FirebaseService,
    private microserviceStatusService: MicroserviceStatusService,
  ) {}

  @Cron(MonitoringScheduleService._cronCheckInterval, {
    name: 'health_check_checking_job',
    disabled: !process.env.SCHEDULE_CHECKING_STATUS_ENABLED,
  })
  @HealthCheck()
  async healthCheckingJob() {
    this.logger.log(`Checking health status of ${MonitoringScheduleService._instanceId} ${new Date().toISOString()}`);
    //this.logger.log(`${JSON.stringify(process.env)} env entries`);
    try {
      const healthCheckResultPromise: HealthCheckResult = await this.healthCheckService.check([
        () => this.typeOrmHealthIndicador.pingCheck('database', { timeout: 2000 }),
        () => this.memory.checkHeap('memory_heap', 400 * 1024 * 1024),
      ]);
      const date = new Date();
      const microserviceStatusDto: MicroserviceStatusDto = this.mapHealthCheckResultToFirebase(
        healthCheckResultPromise,
        date,
      );
      const documentId = MonitoringScheduleService._instanceId + ':' + microserviceStatusDto.timestamp;
      MonitoringScheduleService._store.set(documentId, microserviceStatusDto);
    } catch (err) {
      this.logger.error(err);
      const date = new Date();
      const microserviceStatusDto: MicroserviceStatusDto = this.mapHealthCheckResultToFirebase(
        {
          error: JSON.stringify(err),
        } as unknown as HealthCheckResult,
        date,
      );
      const documentId = MonitoringScheduleService._instanceId + ':' + microserviceStatusDto.timestamp;
      MonitoringScheduleService._store.set(documentId, microserviceStatusDto);
    }
  }

  @Cron(MonitoringScheduleService._cronVerifyInterval, {
    name: 'health_check_consulting_job',
    disabled: !process.env.SCHEDULE_VERIFY_STATUS_ENABLED,
  })
  async healthCheckConsultingJob() {
    this.logger.log(`Consulting health status of ${MonitoringScheduleService._instanceId} ${new Date().toISOString()}`);
    // consulta os ultimos 5 segundos
    const currentDate = new Date();
    const date = new Date(currentDate.getTime() - this._deltaTimeToProcess);
    const documents = await this.firebaseService.getFiltered(
      this._collectionName,
      [{ field: 'timestamp', condition: '>=', value: date.toISOString() }],
      this._maxRowsToProcess,
    );
    if (documents.docs) {
      const microserviceStatusDtos = documents.docs.map((doc) => {
        return doc.data() as MicroserviceStatusDto;
      });
      this.shareStatus(microserviceStatusDtos);
    }
  }

  @Cron(MonitoringScheduleService._cronReportInterval, {
    name: 'health_check_reporting_job',
    disabled: !process.env.SCHEDULE_REPORTING_STATUS_ENABLED,
  })
  async reportStatus() {
    const copyStore = new Map<string, any>(MonitoringScheduleService._store);
    MonitoringScheduleService._store.clear();
    this.logger.log(`reporting status: ${copyStore.size} ${new Date().toISOString()}`);
    await this.firebaseService.saveBatch(this._collectionName, copyStore);
  }

  private shareStatus(documents: MicroserviceStatusDto[]) {
    const groupedMicroserviceStatusDtos = groupBy(documents, (dto) => dto.microservice);

    const entries = Object.entries(groupedMicroserviceStatusDtos);
    // Itera sobre los grupos de objetos
    for (const [microservice, microserviceStatus] of entries) {
      const count = microserviceStatus.length;
      const healthyCount = microserviceStatus.filter((dto) => dto.healthy).length;
      const maxTimestamp: string = microserviceStatus.reduce((maxTimestamp, dto) => {
        return dto.timestamp > maxTimestamp ? dto.timestamp : maxTimestamp;
      }, '');

      const microserviceStatusLite: MicroserviceStatusLiteDto = {
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
      microservice: `${process.env.NAME}-app` || 'unknown',
      instanceId: MonitoringScheduleService._instanceId,
      status: healthCheckResult.status || 'down',
      healthy: healthCheckResult.status === 'ok',
      info: healthCheckResult.info || 'unknown',
      error: healthCheckResult.error || 'unknown',
      healthInfo: healthCheckResult || 'unknown',
      instanceRevision: process.env.K_REVISION || 'unknown',
    } as MicroserviceStatusDto;
  }
}

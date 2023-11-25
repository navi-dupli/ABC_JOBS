import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MicroserviceStatusDto } from '../dtos/microservice-status.dto';
import { groupBy } from 'lodash';
import { MicroserviceStatusLiteDto } from '../dtos/microservice-status-lite.dto';
import { MicroserviceStatusService } from '../microservice-status/microservice-status.service';
import * as process from 'process';
import { StoringService } from "./storing-schedule.service";

@Injectable()
export class MonitoringScheduleService {
  private readonly logger = new Logger(MonitoringScheduleService.name);
  private readonly _maxRowsToProcess: number = process.env.MAX_ROWS_TO_CHECK
    ? parseInt(process.env.MAX_ROWS_TO_CHECK)
    : 500;
  private readonly _deltaTimeToProcess: number = process.env.DELTA_TIMIE_TO_PROCESS
    ? parseInt(process.env.DELTA_TIMIE_TO_PROCESS)
    : 5000;
  private static readonly _cronVerifyInterval = process.env.CRON_VERIFY_INTERVAL || CronExpression.EVERY_SECOND;

  constructor(
    private firebaseService: FirebaseService,
    private microserviceStatusService: MicroserviceStatusService,
  ) {}


  @Cron(MonitoringScheduleService._cronVerifyInterval, {
    name: 'health_check_consulting_job',
    disabled: !process.env.SCHEDULE_VERIFY_STATUS_ENABLED,
  })
  async healthCheckConsultingJob() {
    this.logger.log(`Consulting health status of ${StoringService._instanceId} ${new Date().toISOString()}`);
    // consulta os ultimos 5 segundos
    const currentDate = new Date();
    const date = new Date(currentDate.getTime() - this._deltaTimeToProcess);
    const documents = await this.firebaseService.getFiltered(
      StoringService._collectionName,
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

  }

import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { FirebaseService } from '../firebase-service/firebase.service';
import { MicroserviceStatusDto } from '../dtos/microservice-status.dto';
import { groupBy, round } from 'lodash';
import { MicroserviceStatusLiteDto } from '../dtos/microservice-status-lite.dto';
import { MicroserviceStatusService } from '../microservice-status/microservice-status.service';
import * as process from 'process';
import { StoringService } from './storing-schedule.service';

@Injectable()
export class VerifyScheduleService {
  private readonly logger = new Logger(VerifyScheduleService.name);
  private readonly _maxRowsToProcess: number = process.env.MAX_ROWS_TO_CHECK ? parseInt(process.env.MAX_ROWS_TO_CHECK) : 500;
  private readonly _deltaTimeToProcess: number = process.env.DELTA_TIMIE_TO_PROCESS ? parseInt(process.env.DELTA_TIMIE_TO_PROCESS) : 5000;
  private static readonly _cronVerifyInterval: number = parseInt(process.env.CRON_VERIFY_INTERVAL) || 5000;

  constructor(
    private firebaseService: FirebaseService,
    private microserviceStatusService: MicroserviceStatusService,
  ) {}

  @Interval('health_check_consulting_job', VerifyScheduleService._cronVerifyInterval)
  async VerifyStatusJob() {
    if (process.env.SCHEDULE_VERIFY_STATUS_ENABLED === 'true') {
      await this.verifyStatus();
    }
  }

  async verifyStatus(report: boolean = true) {
    this.logger.log(`Consulting health status of ${StoringService._instanceId} ${new Date().toISOString()}`);
    // consulta os ultimos 5 segundos
    const currentDate = new Date();
    const date = new Date(currentDate.getTime() - this._deltaTimeToProcess);
    this.logger.debug(date.getTime() + ' ' + currentDate.getTime());
    const documents = await this.firebaseService.getFiltered(StoringService._collectionName, date.getTime());
    if (documents.docs) {
      const microserviceStatusDtos = documents.docs.map((doc) => {
        return doc.data() as MicroserviceStatusDto;
      });
      this.logger.debug(`Found ${microserviceStatusDtos.length} documents`);
      return this.shareStatus(microserviceStatusDtos, report);
    }
    return null;
  }

  private shareStatus(documents: MicroserviceStatusDto[], report: boolean = true) {
    const groupedMicroserviceStatusDtos = groupBy(documents, (dto) => dto.microservice);

    const entries = Object.entries(groupedMicroserviceStatusDtos);
    const microservicesStatus: Map<string, MicroserviceStatusLiteDto> = new Map<string, MicroserviceStatusLiteDto>();

    // Itera sobre los grupos de objetos
    for (const [microservice, microserviceStatus] of entries) {
      const count = microserviceStatus.length;
      const healthyCount = microserviceStatus.filter((dto) => dto.healthy).length;
      const maxTimestamp: number = microserviceStatus.reduce((maxTimestamp: number, dto) => {
        return dto.time > maxTimestamp ? dto.time : maxTimestamp;
      }, 0);
      //  lógica para contar instancias únicas
      const uniqueInstanceIds: Set<string> = new Set(microserviceStatus.map((dto) => dto.instanceId));
      const uniqueInstanceCount = uniqueInstanceIds.size;

      const microserviceStatusLite: MicroserviceStatusLiteDto = {
        totalStatusRows: count,
        index: round(count / healthyCount, 2),
        lastCheck: maxTimestamp,
        instancesSize: uniqueInstanceCount,
        instances: uniqueInstanceIds,
      };
      microservicesStatus.set(microservice, microserviceStatusLite);
      if (report) {
        // this.logger.verbose(`microservice: ${microservice} ${JSON.stringify(microserviceStatusLite, null, 2)}`);
        this.microserviceStatusService.setMicroserviceStatus(microservice, microserviceStatusLite);
      }
    }
    return this.logStatus(microservicesStatus);
  }

  private logStatus(microserviceStatusDtos: Map<string, MicroserviceStatusLiteDto>) {
    const microservicesStatusObject: any[] = [];

    microserviceStatusDtos.forEach((value, key) => {
      const microserviceStatus = value as unknown;
      microserviceStatus['name'] = key;
      microservicesStatusObject.push(microserviceStatus);
    });

    const microservicesStatusJson = JSON.stringify(microservicesStatusObject, null, 2);
    this.logger.log(microservicesStatusJson);
    return microservicesStatusObject;
  }
}

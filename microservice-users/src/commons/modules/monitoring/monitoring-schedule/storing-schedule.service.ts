import { Injectable, Logger } from '@nestjs/common';
import { HealthCheckResult } from '@nestjs/terminus';
import { MicroserviceStatusDto } from '../dtos/microservice-status.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StoringService {
  private readonly logger = new Logger(StoringService.name);
  static readonly _collectionName = 'hearth-beat-monitoring';
  static readonly _instanceId = process.env.K_REVISION + ':' + uuidv4();

  static _store: Map<string, MicroserviceStatusDto> = new Map<string, MicroserviceStatusDto>();

  constructor() {}

  public static mapHealthCheckResultToFirebase(
    healthCheckResult: HealthCheckResult,
    date: Date,
  ): MicroserviceStatusDto {
    return {
      timestamp: date.toISOString(),
      microservice: `${process.env.NAME}-app` || 'unknown',
      instanceId: StoringService._instanceId,
      status: healthCheckResult.status || 'down',
      healthy: healthCheckResult.status === 'ok',
      info: healthCheckResult.info || 'unknown',
      error: healthCheckResult.error || 'unknown',
      healthInfo: healthCheckResult || 'unknown',
      instanceRevision: process.env.K_REVISION || 'unknown',
    } as MicroserviceStatusDto;
  }
}

import { Injectable, Logger } from '@nestjs/common';

import { Cron, CronExpression } from '@nestjs/schedule';
import { FirebaseService } from '../firebase-service/firebase.service';

import { StoringService } from './storing-schedule.service';

@Injectable()
export class ReportingScheduleService {
  private readonly logger = new Logger(ReportingScheduleService.name);
  private static readonly _cronReportInterval = process.env.CRON_REPORT_INTERVAL || CronExpression.EVERY_5_SECONDS;

  constructor(private firebaseService: FirebaseService) {}

  @Cron(ReportingScheduleService._cronReportInterval, {
    name: 'health_check_reporting_job',
    disabled: !process.env.SCHEDULE_REPORTING_STATUS_ENABLED,
  })
  async reportStatus() {
    const copyStore = new Map<string, any>(StoringService._store);
    StoringService._store.clear();
    this.logger.log(`reporting status: ${copyStore.size} ${new Date().toISOString()}`);
    await this.firebaseService.saveBatch(StoringService._collectionName, copyStore);
  }
}

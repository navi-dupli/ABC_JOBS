import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { FirebaseService } from '../firebase-service/firebase.service';

import { StoringService } from './storing-schedule.service';

@Injectable()
export class ReportingScheduleService {
  private readonly logger = new Logger(ReportingScheduleService.name);
  private static readonly _cronReportInterval = parseInt(process.env.CRON_REPORT_INTERVAL) || 5000;

  constructor(private firebaseService: FirebaseService) {}

  @Interval('health_check_reporting_job', ReportingScheduleService._cronReportInterval)
  async reportStatusJob() {
    if (process.env.SCHEDULE_REPORTING_STATUS_ENABLED === 'true') {
      await this.reportStatus();
    }
  }

  async reportStatus() {
    const copyStore = new Map<string, any>(StoringService._store);
    StoringService._store.clear();
    this.logger.log(`reporting status: ${copyStore.size} ${new Date().toISOString()}`);
    await this.firebaseService.saveBatch(StoringService._collectionName, copyStore);
  }
}

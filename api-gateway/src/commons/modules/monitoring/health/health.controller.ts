import { Controller, Get } from '@nestjs/common';
import { CheckingScheduleService } from '../monitoring-schedule/checking-schedule.service';
import { ReportingScheduleService } from '../monitoring-schedule/reporting-schedule.service';
import { VerifyScheduleService } from '../monitoring-schedule/verify-schedule.service';
import { MicroserviceStatusService } from '../microservice-status/microservice-status.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly service: CheckingScheduleService,
    private readonly reportingService: ReportingScheduleService,
    private readonly verificationService: VerifyScheduleService,
    private readonly microserviceStatus: MicroserviceStatusService,
  ) {}

  @Get()
  healthCheck() {
    return this.service.checkStatus();
  }

  @Get('report')
  status() {
    return this.reportingService.reportStatus();
  }

  @Get('/firestore/dataset')
  async dataset() {
    return await this.verificationService.verifyStatus(false);
  }

  @Get('dataset')
  async firestoreDataset() {
    return this.microserviceStatus.getMicroserviceStatusDataSet();
  }
}

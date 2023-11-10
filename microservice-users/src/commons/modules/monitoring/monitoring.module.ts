import { Logger, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { MonitoringScheduleService } from './monitoring-schedule/monitoring-schedule.service';
import { TerminusModule } from '@nestjs/terminus';
import { ScheduleModule } from '@nestjs/schedule';
import { FirebaseServiceService } from './firebase-service/firebase-service.service';
import { MicroserviceStatusService } from './microservice-status/microservice-status.service';
import * as process from 'process';
import InstanceDto from './dtos/instance.dto';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [MonitoringScheduleService, FirebaseServiceService, MicroserviceStatusService],
})
export class MonitoringModule implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(MonitoringModule.name);
  private instanceId = process.env.INSTANCE_ID || 'localhost';
  private collection = 'abc-microservice-instances';
  private microservice = process.env.NAME;
  private document = this.microservice + ':' + this.instanceId;

  constructor(private service: FirebaseServiceService) {}

  onModuleInit(): any {
    this.logger.log('Monitoring module initialized');
    const instanceData: InstanceDto = {
      id: this.instanceId,
      name: this.document,
      timestamp: new Date(),
      alive: true,
    };
    this.service.save(this.collection, this.document, instanceData);
  }

  async onApplicationShutdown(signal?: string) {
    this.logger.log('Monitoring module shutdown');
    const instanceDocument = (await this.service.get(this.collection, this.document)) as InstanceDto;
    instanceDocument.alive = false;
    instanceDocument.timestamp = new Date();
    this.service.update(this.collection, this.document, instanceDocument);
  }
}

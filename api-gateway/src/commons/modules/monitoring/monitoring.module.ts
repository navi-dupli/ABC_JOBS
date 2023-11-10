import { Logger, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { MonitoringScheduleService } from './monitoring-schedule/monitoring-schedule.service';
import { TerminusModule } from '@nestjs/terminus';
import { FirebaseService } from './firebase-service/firebase.service';
import { MicroserviceStatusService } from './microservice-status/microservice-status.service';
import InstanceDto from './dtos/instance.dto';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [MonitoringScheduleService, FirebaseService, MicroserviceStatusService],
  exports: [MicroserviceStatusService],
})
export class MonitoringModule implements OnModuleInit, OnApplicationShutdown {
  private readonly logger = new Logger(MonitoringModule.name);
  private instanceId = process.env.INSTANCE_ID || 'localhost';
  private collection = 'abc-microservice-instances';
  private microservice = `${process.env.NAME}-app`;
  private document = this.microservice + ':' + this.instanceId;

  constructor(private service: FirebaseService) {}

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

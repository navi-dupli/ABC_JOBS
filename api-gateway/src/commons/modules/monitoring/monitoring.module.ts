import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { MonitoringScheduleService } from './monitoring-schedule/monitoring-schedule.service';
import { TerminusModule } from '@nestjs/terminus';
import { FirebaseService } from './firebase-service/firebase.service';
import { MicroserviceStatusService } from './microservice-status/microservice-status.service';
import InstanceDto from './dtos/instance.dto';
import { ScheduleModule } from '@nestjs/schedule';
import { Firestore } from '@google-cloud/firestore';
import * as process from 'process';
import FirestoreConfig from '../../../firestore.config';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [
    MonitoringScheduleService,
    FirebaseService,
    MicroserviceStatusService,
    {
      provide: Firestore,
      useFactory: () => new Firestore(FirestoreConfig.getFirestoreConfig()),
    },
  ],
  exports: [MicroserviceStatusService],
})
export class MonitoringModule implements OnModuleInit {
  private readonly logger = new Logger(MonitoringModule.name);
  private instanceId = process.env.INSTANCE_ID || 'localhost';
  private collection = 'abc-microservice-instances';
  private microservice = `${process.env.NAME}-app`;
  private document = this.microservice + ':' + this.instanceId;

  constructor(private service: FirebaseService) {}

  async onModuleInit(): Promise<any> {
    this.logger.log('Monitoring module initialized');
    const instanceData: InstanceDto = {
      id: this.instanceId,
      name: this.document,
      timestamp: new Date(),
      alive: true,
    };
    //return await this.service.save(this.collection, this.document, instanceData);
  }
}

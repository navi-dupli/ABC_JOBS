import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { MonitoringScheduleService } from './monitoring-schedule/monitoring-schedule.service';
import { TerminusModule } from '@nestjs/terminus';
import { FirebaseService } from './firebase-service/firebase.service';
import { MicroserviceStatusService } from './microservice-status/microservice-status.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Firestore } from '@google-cloud/firestore';
import FirestoreConfig from '../../../firestore.config';
import { CheckingScheduleService } from "./monitoring-schedule/checking-schedule.service";
import { ReportingScheduleService } from "./monitoring-schedule/reporting-schedule.service";
import { StoringService } from "./monitoring-schedule/storing-schedule.service";
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [
    MonitoringScheduleService,
    CheckingScheduleService,
    ReportingScheduleService,
    StoringService,
    FirebaseService,
    MicroserviceStatusService,
    {
      provide: Firestore,
      useFactory: () => new Firestore(FirestoreConfig.getFirestoreConfig()),
    },
  ],
  exports: [MicroserviceStatusService],
  controllers: [HealthController],
})
export class MonitoringModule implements OnModuleInit {
  private readonly logger = new Logger(MonitoringModule.name);
  private collection = 'abc-microservice-instances';
  private microservice = `${process.env.NAME}-app`;

  constructor(private service: FirebaseService) {}

  async onModuleInit(): Promise<any> {
    this.logger.log('Monitoring module initialized');
   /** const instanceData: InstanceDto = {
      id: this.instanceId,
      name: this.document,
      timestamp: new Date(),
      alive: true,
    };*/
    //return await this.service.save(this.collection, this.document, instanceData);
  }
}

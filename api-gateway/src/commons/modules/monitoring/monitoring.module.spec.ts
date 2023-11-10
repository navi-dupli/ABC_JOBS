import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringModule } from './monitoring.module';
import { MonitoringScheduleService } from './monitoring-schedule/monitoring-schedule.service';
import { FirebaseService } from './firebase-service/firebase.service';
import { TerminusModule } from '@nestjs/terminus';
import { ScheduleModule } from '@nestjs/schedule';

describe('MonitoringModule', () => {
  let module: TestingModule;
  let service: FirebaseService;
  let monitoringModule: MonitoringModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [MonitoringModule, TerminusModule.forRoot(), ScheduleModule.forRoot()],
    }).compile();
    service = module.get<FirebaseService>(FirebaseService);
    monitoringModule = module.get<MonitoringModule>(MonitoringModule);
  });

  it('should be defined', () => {
    const app = module.get<MonitoringModule>(MonitoringModule);
    expect(app).toBeDefined();
  });

  it('should have MonitoringScheduleService', () => {
    const service = module.get<MonitoringScheduleService>(MonitoringScheduleService);
    expect(service).toBeDefined();
  });
  //FirebaseService
  it('should have FirebaseService', () => {
    const service = module.get<FirebaseService>(FirebaseService);
    expect(service).toBeDefined();
  });
  //MicroserviceStatusService
  it('should have MicroserviceStatusService', () => {
    const service = module.get<FirebaseService>(FirebaseService);
    expect(service).toBeDefined();
  });

  it('should report status on init', () => {
    jest.spyOn(service, 'save').mockReturnValue(new Promise((resolve) => resolve()));
    const onModuleInit = monitoringModule.onModuleInit();
    expect(onModuleInit).not.toBeNull();
  });
});

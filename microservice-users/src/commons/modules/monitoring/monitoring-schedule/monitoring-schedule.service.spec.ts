import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringScheduleService } from './monitoring-schedule.service';

describe('MonitoringScheduleService', () => {
  let service: MonitoringScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonitoringScheduleService],
    }).compile();

    service = module.get<MonitoringScheduleService>(MonitoringScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

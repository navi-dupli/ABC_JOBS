import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { CheckingScheduleService } from '../monitoring-schedule/checking-schedule.service';
import { TerminusModule } from '@nestjs/terminus';
import { ScheduleModule } from '@nestjs/schedule';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TerminusModule.forRoot({
          errorLogStyle: 'pretty',
        }),
        ScheduleModule.forRoot(),
      ],
      providers: [CheckingScheduleService],
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

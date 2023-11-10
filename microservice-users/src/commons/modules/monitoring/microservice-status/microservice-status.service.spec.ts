import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceStatusService } from './microservice-status.service';

describe('MicroserviceStatusService', () => {
  let service: MicroserviceStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MicroserviceStatusService],
    }).compile();

    service = module.get<MicroserviceStatusService>(MicroserviceStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

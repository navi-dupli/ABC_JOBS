import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceStatusService } from './microservice-status.service';
import { MicroserviceStatusLiteDto } from '../dtos/microservice-status-lite.dto';

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

  describe('setMicroserviceStatus', () => {
    it('should set microservice status', () => {
      const microservice = 'testMicroservice';
      const status: MicroserviceStatusLiteDto = { index: 0.9, timestamp: new Date() } as unknown as MicroserviceStatusLiteDto;

      service.setMicroserviceStatus(microservice, status);

      expect(service.getMicroserviceStatus(microservice)).toEqual(status);
    });
  });

  describe('getMicroserviceStatus', () => {
    it('should return microservice status', () => {
      const microservice = 'testMicroservice';
      const status: MicroserviceStatusLiteDto = { index: 0.9, timestamp: new Date() } as unknown as MicroserviceStatusLiteDto;

      service.setMicroserviceStatus(microservice, status);

      expect(service.getMicroserviceStatus(microservice)).toEqual(status);
    });

    it('should return undefined if microservice status not set', () => {
      const microservice = 'nonexistentMicroservice';

      expect(service.getMicroserviceStatus(microservice)).toBeUndefined();
    });
  });

  describe('getMicroservicesStatus', () => {
    it('should return all microservices status', () => {
      const microservicesStatus: Map<string, MicroserviceStatusLiteDto> = new Map([
        ['microservice1', { index: 0.9, timestamp: new Date() }],
        ['microservice2', { index: 0.7, timestamp: new Date() }],
      ]) as unknown as Map<string, MicroserviceStatusLiteDto>;

      microservicesStatus.forEach((status, microservice) => {
        service.setMicroserviceStatus(microservice, status);
      });

      expect(service.getMicroservicesStatus()).toEqual(microservicesStatus);
    });
  });

  describe('isMicroserviceHealthy', () => {
    it('should return true if microservice is healthy', () => {
      const microservice = 'healthyMicroservice';
      const status: MicroserviceStatusLiteDto = { index: 0.9, timestamp: new Date() } as unknown as MicroserviceStatusLiteDto;

      service.setMicroserviceStatus(microservice, status);

      expect(service.isMicroserviceHealthy(microservice)).toBe(true);
    });

    it('should return false if microservice is not healthy', () => {
      const microservice = 'unhealthyMicroservice';
      const status: MicroserviceStatusLiteDto = { index: 0.7, timestamp: new Date() } as unknown as MicroserviceStatusLiteDto;

      service.setMicroserviceStatus(microservice, status);

      expect(service.isMicroserviceHealthy(microservice)).toBe(false);
    });

    it('should return false if microservice status not set', () => {
      const microservice = 'nonexistentMicroservice';

      expect(service.isMicroserviceHealthy(microservice)).toBe(false);
    });
  });
});

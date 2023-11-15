import { Test, TestingModule } from '@nestjs/testing';
import { GenericRequestDelegatedService } from './generic-request-delegated.service';
import { MicroserviceEnum, RouteConfig } from '../../../../dynamic-routes.config';
import { Request } from 'express';
import { MicroserviceClientService } from './microservice-client.service';
import { MonitoringModule } from '../../monitoring/monitoring.module';
import { HttpModule } from '@nestjs/axios';
import { of } from 'rxjs';

describe('GenericRequestDelegatedService', () => {
  let service: GenericRequestDelegatedService;
  let microserviceClientService: MicroserviceClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MonitoringModule, HttpModule],
      providers: [
        GenericRequestDelegatedService,
        {
          provide: MicroserviceEnum.COMMONS,
          useClass: MicroserviceClientService,
        },
      ],
    }).compile();

    service = module.get<GenericRequestDelegatedService>(GenericRequestDelegatedService);
    microserviceClientService = module.get<MicroserviceClientService>(MicroserviceEnum.COMMONS);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const microservice = {
    endPoint: 'http://example.com',
    path: MicroserviceEnum.COMMONS,
    microservice: '',
  } as RouteConfig;

  const request = {
    method: 'GET',
    headers: {
      'x-request-id': '123',
      authorization: 'Bearer token',
    },
    originalUrl: '/test',
  } as unknown as Request;

  it('should handle a successful request', (done) => {
    const response = { data: 'Success', status: 200 };
    jest.spyOn(microserviceClientService, 'call').mockImplementation(() => of(response));
    service.delegateRequest(microservice, request).subscribe((result) => {
      expect(result).toEqual(response);
      done();
    });
  });
});

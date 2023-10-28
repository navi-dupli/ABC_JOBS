import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceClientService } from './microservice-client.service';
import { HttpService } from '@nestjs/axios';
import { MicroserviceEnum } from '../../../../dynamic-routes.config';
import { Request } from 'express';
import { of, throwError } from 'rxjs';
import { AxiosError } from 'axios';

describe('MicroserviceClientService', () => {
  let service: MicroserviceClientService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MicroserviceClientService,
        {
          provide: HttpService,
          useValue: {
            request: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MicroserviceClientService>(MicroserviceClientService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should make a successful GET request', async () => {
    const request = {
      headers: {
        'x-request-id': 'ABCJOBS:1233',
        authorization: 'Beare Token',
      },
      method: 'GET',
    } as unknown as Request;
    const response = { status: 200, data: 'Success' };
    (httpService.request as jest.Mock).mockReturnValue(of(response));

    const result = await service.call(MicroserviceEnum.USERS, '/path', 'GET', request).toPromise();

    expect(result).toEqual(response.data);
    expect(httpService.request).toHaveBeenCalledWith(expect.objectContaining({ method: 'GET' }));
  });

  it('should handle a 404 error', async () => {
    const request = {
      headers: {
        'x-request-id': 'ABCJOBS:1233',
        authorization: 'Beare Token',
      },
      method: 'GET',
    } as unknown as Request;

    const errorResponse = { response: { status: 404, statusText: 'Not Found' } } as unknown as AxiosError;
    (httpService.request as jest.Mock).mockReturnValue(throwError(errorResponse));

    try {
      await service.call(MicroserviceEnum.USERS, '/path', 'GET', request).toPromise();
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('Not Found');
    }
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});

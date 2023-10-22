import { Test, TestingModule } from '@nestjs/testing';
import { GenericRequestDelegatedService } from './generic-request-delegated.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { MicroserviceEnum, RouteConfig } from '../../../../dynamic-routes.config';
import { Request } from 'express';

describe('GenericRequestDelegatedService', () => {
  let service: GenericRequestDelegatedService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenericRequestDelegatedService,
        {
          provide: HttpService,
          useValue: {
            request: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GenericRequestDelegatedService>(GenericRequestDelegatedService);
    httpService = module.get<HttpService>(HttpService);
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
    (httpService.request as jest.Mock).mockReturnValue(of(response));
    service.delegateRequest(microservice, request).subscribe((result) => {
      expect(result).toEqual('Success');
      done();
    });
  });

  it('should handle a network error', (done) => {
    const error = new AxiosError('Network Error', '500'); // Simula un error de red
    (httpService.request as jest.Mock).mockReturnValue(throwError(error));

    service.delegateRequest(microservice, request).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.getStatus()).toEqual(503);
        expect(err.getResponse()).toEqual('Network Error');
        done();
      },
    });
  });

  it('should handle a specific HTTP error', (done) => {
    const error = new AxiosError('Error', '503'); // Simula un error HTTP específico
    (httpService.request as jest.Mock).mockReturnValue(throwError(error));
    service.delegateRequest(microservice, request).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.getStatus()).toEqual(503);
        expect(err.getResponse()).toEqual('Network Error');
        done();
      },
    });
  });

  it('should handle an unknown error', (done) => {
    const error = new Error('Unknown Error'); // Simula un error desconocido
    (httpService.request as jest.Mock).mockReturnValue(throwError(error));

    service.delegateRequest(microservice, request).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(InternalServerErrorException);
        expect(err.message).toEqual('Unknown Error');
        done();
      },
    });
  });
});

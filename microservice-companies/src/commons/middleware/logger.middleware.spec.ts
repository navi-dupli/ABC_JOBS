import { Test, TestingModule } from '@nestjs/testing';
import { LoggerMiddleware } from './logger.middleware';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

describe('LoggerMiddleware', () => {
  let loggerMiddleware: LoggerMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerMiddleware, Logger],
    }).compile();

    loggerMiddleware = module.get<LoggerMiddleware>(LoggerMiddleware);
  });

  it('should be defined', () => {
    expect(loggerMiddleware).toBeDefined();
  });

  it('should log request information', () => {
    const loggerSpy = jest.spyOn(loggerMiddleware['logger'], 'log');
    const mockRequest = {
      method: 'GET',
      url: '/test',
      baseUrl: '/test',
      params: { id: '123' },
      headers: {
        'x-request-id': '12345'
      }
    } as unknown as Request;
    const mockResponse = {} as Response;
    const mockNextFunction = jest.fn();

    loggerMiddleware.use(mockRequest, mockResponse, mockNextFunction);

    expect(loggerSpy).toHaveBeenCalledWith('[12345] GET:/test/test?{\"id\":\"123\"}');
    expect(mockNextFunction).toHaveBeenCalled();
  });
});

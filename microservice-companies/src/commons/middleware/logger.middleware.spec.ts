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
      headers: { 'x-request-id': '123' },
      params: { id: '123' },
    } as unknown as Request;
    const mockResponse = {
      on: (event, listener) => listener(),
    } as Response;
    const mockNextFunction = jest.fn();

    loggerMiddleware.use(mockRequest, mockResponse, mockNextFunction);

    expect(loggerSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalled();
  });
  it('should log request information error 500', () => {
    const loggerSpy = jest.spyOn(loggerMiddleware['logger'], 'log');
    const mockRequest = {
      method: 'GET',
      url: '/test',
      baseUrl: '/test',
      headers: { 'x-request-id': '123' },
      params: { id: '123' },
    } as unknown as Request;
    const mockResponse = {
      statusCode: 500,
      on: (event, listener) => listener(),
    } as Response;
    const mockNextFunction = jest.fn();

    loggerMiddleware.use(mockRequest, mockResponse, mockNextFunction);

    expect(loggerSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalled();
  });
  it('should log request information error 400', () => {
    const loggerSpy = jest.spyOn(loggerMiddleware['logger'], 'log');
    const mockRequest = {
      method: 'GET',
      url: '/test',
      baseUrl: '/test',
      headers: { 'x-request-id': '123' },
      params: { id: '123' },
    } as unknown as Request;
    const mockResponse = {
      statusCode: 400,
      on: (event, listener) => listener(),
    } as Response;
    const mockNextFunction = jest.fn();

    loggerMiddleware.use(mockRequest, mockResponse, mockNextFunction);

    expect(loggerSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalled();
  });
  it('should log request information error 300', () => {
    const loggerSpy = jest.spyOn(loggerMiddleware['logger'], 'log');
    const mockRequest = {
      method: 'GET',
      url: '/test',
      baseUrl: '/test',
      headers: { 'x-request-id': '123' },
      params: { id: '123' },
    } as unknown as Request;
    const mockResponse = {
      statusCode: 300,
      on: (event, listener) => listener(),
    } as Response;
    const mockNextFunction = jest.fn();

    loggerMiddleware.use(mockRequest, mockResponse, mockNextFunction);

    expect(loggerSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalled();
  });
  it('should log request information error 200', () => {
    const loggerSpy = jest.spyOn(loggerMiddleware['logger'], 'log');
    const mockRequest = {
      method: 'GET',
      url: '/test',
      baseUrl: '/test',
      headers: { 'x-request-id': '123' },
      params: { id: '123' },
    } as unknown as Request;
    const mockResponse = {
      statusCode: 200,
      on: (event, listener) => listener(),
    } as Response;
    const mockNextFunction = jest.fn();

    loggerMiddleware.use(mockRequest, mockResponse, mockNextFunction);

    expect(loggerSpy).toHaveBeenCalledTimes(1);
    expect(mockNextFunction).toHaveBeenCalled();
  });
});

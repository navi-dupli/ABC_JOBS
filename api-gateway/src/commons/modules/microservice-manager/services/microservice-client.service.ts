import { HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import { RouteConfig } from '../../../../dynamic-routes.config';
import { MicroserviceStatusService } from '../../monitoring/microservice-status/microservice-status.service';
import * as process from 'process';

@Injectable()
export class MicroserviceClientService {
  private readonly logger = new Logger(MicroserviceClientService.name);
  public routeConfig: RouteConfig;

  constructor(
    private readonly httpService: HttpService,
    private readonly microserviceStatusService: MicroserviceStatusService,
  ) {}

  call(
    path: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE',
    originalRequest: Request,
    data?: any,
    timeout?: number,
  ): Observable<any> {
    // Step 1: Check if the microservice is healthy
    this.checkMicroServiceStatus(originalRequest);
    // Step 2: Logging the microservice call
    const url = `${this.routeConfig.endPoint}/${this.routeConfig.path}${path}`;
    this.logger.log(`[${originalRequest.headers['x-request-id']}] Calling ${method}:${url}`);
    // Step 3: build the headers
    const clientHeaders = {
      'x-request-id': originalRequest.headers['x-request-id'],
      authorization: originalRequest.headers['authorization'],
    };
    // Step 5: call the microservice
    return this.httpService
      .request({
        method,
        url,
        data,
        headers: clientHeaders,
        timeout: timeout || parseInt(process.env.REQUEST_TIMEOUT) || 15000,
      } as AxiosRequestConfig)
      .pipe(
        map((response) => {
          // Step 6: Logging the microservice response
          this.logger.log(`[${originalRequest.headers['x-request-id']}] Response ${method}:${url} => ${response.status}`);
          // Step 7: mapping the Axios response and return the data
          return response.data || {};
        }),
        catchError((error): Observable<any> => {
          // Step 8: Logging the microservice error
          this.logger.error(error);
          this.logger.log(`[${originalRequest.headers['x-request-id']}] Response ${method}:${url} => ${error?.response?.status}`);
          if (isAxiosError(error)) {
            // Axios error with network-related issues (e.g., no connection)
            // Step 9: throw the error
            throw new HttpException(error?.response?.statusText || 'Network Error', error?.response?.status || 500);
          }
          if (error?.response?.status) {
            throw new HttpException(error?.response?.statusText, error?.response?.status);
          }
          throw new InternalServerErrorException(error.message, error.stack);
        }),
      );
  }

  /**
   * Check if the microservice is healthy
   * @param originalRequest the original request
   * @private
   */
  private checkMicroServiceStatus(originalRequest: Request) {
    const currentMicroservice = this.routeConfig.path;
    this.logger.log(`[${originalRequest.headers['x-request-id']}] Checking microservice ${currentMicroservice} status`);
    if (
      !!process.env.MONITORING_CHECK_SERVICE_STATUS_ENABLED &&
      !this.microserviceStatusService.isMicroserviceHealthy(currentMicroservice.toString())
    ) {
      this.logger.error(`[${originalRequest.headers['x-request-id']}] Microservice ${currentMicroservice} is not healthy`);
      throw new InternalServerErrorException(`The application is having problems, please try again later`);
    }
  }

  setService(service: RouteConfig) {
    this.routeConfig = service;
  }
}

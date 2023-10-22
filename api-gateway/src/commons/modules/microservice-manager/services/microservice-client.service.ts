import { HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { dynamicRoutesConfig, MicroserviceEnum } from '../../../../dynamic-routes.config';
import { Request } from 'express';
import { isAxiosError } from 'axios';

@Injectable()
export class MicroserviceClientService {
  private readonly logger = new Logger(MicroserviceClientService.name);

  constructor(private readonly httpService: HttpService) {}

  call(
    microservice: MicroserviceEnum,
    path: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    originalRequest: Request,
    data?: any,
    timeout?: number,
  ): Observable<any> {
    const clientHeaders = {
      'x-request-id': originalRequest.headers['x-request-id'],
      authorization: originalRequest.headers['authorization'],
    };
    const microserviceRoute = dynamicRoutesConfig.find((route) => route.path === microservice);
    const url = `${microserviceRoute.endPoint}/${microserviceRoute.path}${path}`;
    this.logger.log(`[${originalRequest.headers['x-request-id']}] Calling ${method}:${url}`);
    return this.httpService
      .request({
        method,
        url,
        data,
        headers: clientHeaders,
        timeout: timeout || parseInt(process.env.REQUEST_TIMEOUT) || 10000,
      })
      .pipe(
        map((response) => {
          this.logger.log(
            `[${originalRequest.headers['x-request-id']}] Response ${method}:${url} => ${response.status}`,
          );
          return response.data || {};
        }),
        catchError((error) => {
          this.logger.log(`[${originalRequest.headers['x-request-id']}] Response ${method}:${url} => ${error?.status}`);
          if (isAxiosError(error)) {
            // Axios error with network-related issues (e.g., no connection)
            throw new HttpException(error?.response?.statusText || 'Network Error', error?.response?.status || 500);
          }
          if (error?.response?.status) {
            throw new HttpException(error?.response?.statusText, error?.response?.status);
          }
          throw new InternalServerErrorException(error.message, error.stack);
        }),
      );
  }
}

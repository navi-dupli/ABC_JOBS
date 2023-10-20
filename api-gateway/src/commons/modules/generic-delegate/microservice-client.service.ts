import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { dynamicRoutesConfig, MicroserviceEnum } from '../../../dynamic-routes.config';
import { Request } from 'express';

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
    const headers = originalRequest.headers;
    headers['content-length'] = null; // Agrega el header con el UUID

    const microserviceRoute = dynamicRoutesConfig.find((route) => route.path === microservice);
    const url = `${microserviceRoute.endPoint}/${microserviceRoute.path}${path}`;
    this.logger.log(`Calling ${url}`);
    return this.httpService
      .request({
        method,
        url,
        data,
        headers: headers,
        // timeout: timeout || parseInt(process.env.REQUEST_TIMEOUT) || 10000,
      })
      .pipe(
        catchError((error) => {
          throw new Error('Error' + error.message);
        }),
      );
  }
}

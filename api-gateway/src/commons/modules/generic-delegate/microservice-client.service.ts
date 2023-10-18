import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { dynamicRoutesConfig, MicroserviceEnum } from '../../../dynamic-routes.config';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

@Injectable()
export class MicroserviceClientService {
  private readonly logger = new Logger(MicroserviceClientService.name);

  call(
    microservice: MicroserviceEnum,
    path: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    opriginalRequest: Request,
    data?: any,
    timeout?: number,
  ): Observable<any> {
    const headers = opriginalRequest.headers;
    const uuidHeader = { 'X-Request-Id': `abcjobs:${uuidv4()}` }; // Agrega el header con el UUID
    headers['content-length'] = null; // Agrega el header con el UUID
    const allHeaders = { ...headers, ...uuidHeader };

    const microserviceRoute = dynamicRoutesConfig.find((route) => route.path === microservice);
    const url = `${microserviceRoute.endPoint}/${microserviceRoute.path}${path}`;
    this.logger.log(`Calling ${url}`);
    return this.httpService
      .request({
        method,
        url,
        data,
        headers: allHeaders,
        timeout: timeout || parseInt(process.env.REQUEST_TIMEOUT) || 10000,
      })
      .pipe(
        catchError((error) => {
          // Aquí puedes manejar los errores de manera centralizada si es necesario
          throw error;
        }),
      );
  }

  constructor(private readonly httpService: HttpService) {}
}

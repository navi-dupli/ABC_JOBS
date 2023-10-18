import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { dynamicRoutesConfig, MicroserviceEnum } from '../../../dynamic-routes.config';

@Injectable()
export class MicroserviceClientService {
  private readonly logger = new Logger(MicroserviceClientService.name);

  constructor(private readonly httpService: HttpService) {}

  call(
    microservice: MicroserviceEnum,
    path: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    data?: any,
    timeout?: number,
  ): Observable<any> {
    const microserviceRoute = dynamicRoutesConfig.find((route) => route.path === microservice);
    const url = `${microserviceRoute.endPoint}/${microserviceRoute.path}${path}`;
    this.logger.log(`Calling ${url}`);
    return this.httpService
      .request({
        method,
        url,
        data,
        timeout: timeout || parseInt(process.env.REQUEST_TIMEOUT) || 10000,
      })
      .pipe(
        catchError((error) => {
          // Aquí puedes manejar los errores de manera centralizada si es necesario
          throw error;
        }),
      );
  }
}

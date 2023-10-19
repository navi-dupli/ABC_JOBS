import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { RouteConfig } from '../../../dynamic-routes.config';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class GenericRequestDelegatedService {
  private readonly logger = new Logger(GenericRequestDelegatedService.name);

  constructor(private readonly httpService: HttpService) {}

  delegateRequest(microservice: RouteConfig, request: Request): Observable<any> {
    const clientHeaders = {
      'x-request-id': request.headers['x-request-id'],
      authorization: request.headers['authorization'],
    };
    const url = this.constructUrlAndMethod(microservice, request);
    this.logger.log(`Delegating to ${request.method}${url}`);
    const requestConfig: AxiosRequestConfig = {
      headers: clientHeaders,
      method: request.method,
      //params: null,
      //timeout: parseInt(process.env.REQUEST_TIMEOUT) || 10000,
      url: url,
    };
    if (request.method.toUpperCase() === 'POST' || request.method.toUpperCase() === 'PUT') {
      requestConfig.data = request.body;
    }
    const requestObservable: Observable<any> = this.httpService.request(requestConfig);

    return requestObservable;
    /*  .pipe(
      catchError((error) => {
        this.logger.log(
          `${error?.response?.status}:${error?.response?.statusText} was received from ${request.originalUrl}`,
        );
        this.logger.error(error);
        return of(new NotFoundException(error));
      }),
    );*/
  }

  private constructUrlAndMethod(routeConfig: RouteConfig, req: Request): string {
    return `${routeConfig.endPoint}${req.originalUrl}`;
  }
}

import { HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { RouteConfig } from '../../../../dynamic-routes.config';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import { catchError } from 'rxjs/operators';

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
    this.logger.log(`Delegating to ${request.method}:${url}`);
    const requestConfig: AxiosRequestConfig = {
      headers: clientHeaders,
      method: request.method,
      //params: null,
      timeout: parseInt(process.env.REQUEST_TIMEOUT) || 10000,
      url: url,
    };
    if (request.method.toUpperCase() === 'POST' || request.method.toUpperCase() === 'PUT') {
      requestConfig.data = request.body;
      this.logger.debug(`Request body: ${JSON.stringify(request.body)}`);
    }
    const requestObservable: Observable<any> = this.httpService.request(requestConfig);

    return requestObservable.pipe(
      map((response) => {
        return response.data; // because we are using axios
      }),
      catchError((error) => {
        this.logger.error(error);
        this.logger.error(
          `${error?.response?.status}:${error?.response?.statusText} was received from ${request.originalUrl}`,
        );
        if (isAxiosError(error)) {
          // Axios error with network-related issues (e.g., no connection)
          throw new HttpException('Network Error', 503);
        }
        if (error?.response?.status) {
          throw new HttpException(error?.response?.statusText, error?.response?.status);
        }
        throw new InternalServerErrorException(error.message, error.stack);
      }),
    );
  }

  private constructUrlAndMethod(routeConfig: RouteConfig, req: Request): string {
    return `${routeConfig.endPoint}${req.originalUrl}`;
  }
}

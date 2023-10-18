import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GenericRequestDelegatedService {
  private readonly logger = new Logger(GenericRequestDelegatedService.name);

  constructor(private readonly httpService: HttpService) {}

  delegateRequest(method: string, url: string, headers: Record<string, any>, body?: any): Observable<any> {
    const uuidHeader = { 'X-Request-Id': `abcjobs:${uuidv4()}` }; // Agrega el header con el UUID
    headers['content-length'] = null; // Agrega el header con el UUID
    const allHeaders = { ...headers, ...uuidHeader };
    const requestObservable: Observable<any> = this.httpService.request({
      method,
      url,
      params: '',
      headers: allHeaders,
      data: body,
      timeout: parseInt(process.env.REQUEST_TIMEOUT) || 10000,
    });

    return requestObservable.pipe(
      catchError((error) => {
        this.logger.log(`${error?.response?.status}:${error?.response?.statusText} was received from ${url}`);
        this.logger.error(error);
        return of(new NotFoundException(error));
      }),
    );
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { RouteConfig } from '../../../../dynamic-routes.config';
import { ModuleRef } from '@nestjs/core';
import { MicroserviceClientService } from './microservice-client.service';

@Injectable()
export class GenericRequestDelegatedService {
  private readonly logger = new Logger(GenericRequestDelegatedService.name);

  constructor(private readonly moduleRef: ModuleRef) {}

  delegateRequest(microservice: RouteConfig, request: Request): Observable<any> {
    const service: MicroserviceClientService = this.moduleRef.get(microservice.path.toString());
    const url = request.originalUrl;
    const method = request.method as 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE';
    const body = request.body;
    if (request.method.toUpperCase() === 'POST' || request.method.toUpperCase() === 'PUT' || request.method.toUpperCase() === 'PATCH') {
      return service.call(url, method, request, body);
    } else {
      return service.call(url, method, request);
    }
  }
}

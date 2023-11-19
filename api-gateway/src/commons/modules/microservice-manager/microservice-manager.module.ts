import { DynamicModule, Global, Logger, Module, Provider } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { MicroserviceClientService } from './services/microservice-client.service';
import { RouteConfig } from '../../../dynamic-routes.config';
import { GenericController } from './controllers/generic.controller';
import { GenericRequestDelegatedService } from './services/generic-request-delegated.service';
import { MicroserviceStatusService } from '../monitoring/microservice-status/microservice-status.service';
import { MonitoringModule } from '../monitoring/monitoring.module';

@Global()
@Module({})
export class MicroserviceManagerModule {
  static forRoot(services: RouteConfig[]): DynamicModule {
    const providers = services.map((service) => {
      return {
        provide: `${service.path.toString()}`,
        imports: [MonitoringModule],
        inject: [HttpService, MicroserviceStatusService],
        useFactory: (httpService: HttpService, microserviceStatusCheck: MicroserviceStatusService) => {
          const microserviceClientServiceInstance = new MicroserviceClientService(httpService, microserviceStatusCheck);
          microserviceClientServiceInstance.setService(service);
          return microserviceClientServiceInstance;
        },
      } as Provider;
    });
    const module = {
      imports: [HttpModule, MonitoringModule],
      controllers: [GenericController],
      module: MicroserviceManagerModule,
      providers: [...providers, Logger, GenericRequestDelegatedService],
      exports: [...providers],
    } as DynamicModule;
    return module;
  }
}

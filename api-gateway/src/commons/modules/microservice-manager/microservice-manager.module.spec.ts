import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceManagerModule } from './microservice-manager.module';
import { HttpModule } from '@nestjs/axios';
import { MicroserviceStatusService } from '../monitoring/microservice-status/microservice-status.service';
import { MicroserviceClientService } from './services/microservice-client.service';
import { GenericController } from './controllers/generic.controller';
import { GenericRequestDelegatedService } from './services/generic-request-delegated.service';
import { MonitoringModule } from '../monitoring/monitoring.module';
import { Logger } from '@nestjs/common';
import { MicroserviceEnum } from '../../../dynamic-routes.config';

describe('MicroserviceManagerModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule, MonitoringModule, MicroserviceManagerModule.forRoot([])],
      controllers: [GenericController],
      providers: [
        GenericRequestDelegatedService,
        Logger,
        MicroserviceStatusService,
        {
          provide: MicroserviceEnum.USERS,
          useClass: MicroserviceClientService,
        },
      ],
    }).compile();
  });

  it('should be defined', () => {
    const service = module.get<MicroserviceManagerModule>(MicroserviceManagerModule);
    expect(service).toBeDefined();
  });

  it('should provide MicroserviceClientService', () => {
    const microserviceClientService = module.get<MicroserviceClientService>(MicroserviceEnum.USERS);
    expect(microserviceClientService).toBeDefined();
    expect(microserviceClientService).toBeInstanceOf(MicroserviceClientService);
    // Agrega más aserciones según tu lógica y configuración
  });

  it('should provide GenericController', () => {
    const controller = module.get<GenericController>(GenericController);
    expect(controller).toBeDefined();
    // Agrega más aserciones según tu lógica y configuración
  });

  it('should provide GenericRequestDelegatedService', () => {
    const service = module.get<GenericRequestDelegatedService>(GenericRequestDelegatedService);
    expect(service).toBeDefined();
    // Agrega más aserciones según tu lógica y configuración
  });
});

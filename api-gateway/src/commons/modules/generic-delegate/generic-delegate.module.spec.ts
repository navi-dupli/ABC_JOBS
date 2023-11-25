import { Test, TestingModule } from '@nestjs/testing';
import { GenericDelegateModule } from './generic-delegate.module';
import { GenericRequestDelegatedService } from './services/generic-request-delegated.service';
import { GenericController } from './controllers/generic.controller';
import { MicroserviceClientService } from '../microservice-manager/services/microservice-client.service';

describe('GenericDelegateModule', () => {
  let module: TestingModule;
  let requestDelegatedService: GenericRequestDelegatedService;
  let genericController: GenericController;
  let microserviceClientService: MicroserviceClientService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [GenericDelegateModule],
    }).compile();

    requestDelegatedService = module.get<GenericRequestDelegatedService>(GenericRequestDelegatedService);
    genericController = module.get<GenericController>(GenericController);
    microserviceClientService = module.get<MicroserviceClientService>(MicroserviceClientService);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should inject GenericRequestDelegatedService', () => {
    expect(requestDelegatedService).toBeDefined();
    expect(requestDelegatedService).toBeInstanceOf(GenericRequestDelegatedService);
  });

  it('should inject GenericController', () => {
    expect(genericController).toBeDefined();
    expect(genericController).toBeInstanceOf(GenericController);
  });

  it('should inject MicroserviceClientService', () => {
    expect(microserviceClientService).toBeDefined();
    expect(microserviceClientService).toBeInstanceOf(MicroserviceClientService);
  });
});

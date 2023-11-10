import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { dynamicRoutesConfig } from '../../dynamic-routes.config';
import { MicroserviceManagerModule } from '../../commons/modules/microservice-manager/microservice-manager.module';
import { HttpModule } from '@nestjs/axios';
import { MicroserviceStatusService } from '../../commons/modules/monitoring/microservice-status/microservice-status.service';

describe('UsersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule, HttpModule, MicroserviceManagerModule.forRoot(dynamicRoutesConfig)],
      providers: [MicroserviceStatusService],
    }).compile();
  });

  it('should be defined', () => {
    const app = module.get<UsersModule>(UsersModule);
    expect(app).toBeDefined();
  });
});

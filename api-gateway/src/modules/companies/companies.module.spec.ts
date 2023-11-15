import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesModule } from './companies.module';
import { CompaniesController } from './companies/companies.controller';
import { CompaniesService } from './services/companies.service';
import { MonitoringModule } from '../../commons/modules/monitoring/monitoring.module';
import { dynamicRoutesConfig } from '../../dynamic-routes.config';
import { MicroserviceManagerModule } from '../../commons/modules/microservice-manager/microservice-manager.module';
import { HttpModule } from '@nestjs/axios';

describe('CompaniesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [CompaniesModule, HttpModule, MonitoringModule, MicroserviceManagerModule.forRoot(dynamicRoutesConfig)],
    }).compile();
  });

  it('should be defined', () => {
    const app = module.get<CompaniesModule>(CompaniesModule);
    expect(app).toBeDefined();
  });

  it('should have CompaniesController', () => {
    const controller = module.get<CompaniesController>(CompaniesController);
    expect(controller).toBeDefined();
  });

  it('should have CompaniesService', () => {
    const service = module.get<CompaniesService>(CompaniesService);
    expect(service).toBeDefined();
  });
});

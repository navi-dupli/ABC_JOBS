import { Test, TestingModule } from '@nestjs/testing';
import { IdentificationModule } from './identification.module';
import { IdentificationController } from './controllers/identification.controller';
import { IdentificationService } from './services/identification.service';
import { TypeOrmSQLITETestingModule } from '../../test-utils/type-orm-sqlite-testing-module';

describe('IdentificationModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [...TypeOrmSQLITETestingModule(), IdentificationModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should resolve IdentificationController', () => {
    const controller = module.get<IdentificationController>(IdentificationController);
    expect(controller).toBeDefined();
  });

  it('should resolve IdentificationService', () => {
    const service = module.get<IdentificationService>(IdentificationService);
    expect(service).toBeDefined();
  });
});

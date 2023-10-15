import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './modules/authz/authz.module';
import { AuthorizedController } from './commons/controllers/authorized/authorized.controller';
import { LocationModule } from './modules/location/location.module';
import { IdentificationModule } from './modules/identification/identification.module';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerMiddleware } from './commons/middleware/logger.middleware';

describe('AppModule', () => {
  let module: TestingModule;
  let app: INestApplication;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication<NestExpressApplication>();
    app.use(LoggerMiddleware);
    await app.init();
  });
  afterAll(async () => {
    await module.close();
  });
  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have AppController defined', () => {
    const controller = module.get<AppController>(AppController);
    expect(controller).toBeDefined();
  });

  it('should have AppService defined', () => {
    const service = module.get<AppService>(AppService);
    expect(service).toBeDefined();
  });

  it('should have TypeOrmModule configured', () => {
    const typeOrmModule = module.get(TypeOrmModule);
    expect(typeOrmModule).toBeDefined();
  });

  it('should have AuthzModule defined', () => {
    const authzModule = module.get(AuthzModule);
    expect(authzModule).toBeDefined();
  });

  it('should have LocationModule defined', () => {
    const locationModule = module.get(LocationModule);
    expect(locationModule).toBeDefined();
  });

  it('should have AuthorizedController defined', () => {
    const authorizedController = module.get(AuthorizedController);
    expect(authorizedController).toBeDefined();
  });

  it('should have  IdentificationModule defined', () => {
    const identificationModule = module.get(IdentificationModule);
    expect(identificationModule).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthzModule } from './modules/authz/authz.module';
import { AuthorizedController } from './commons/controllers/authorized/authorized.controller';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerMiddleware } from './commons/middleware/logger.middleware';
import { TechnicalTestModule } from './modules/technical-test/technical-test.module';

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
  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have TypeOrmModule configured', () => {
    const typeOrmModule = module.get(TypeOrmModule);
    expect(typeOrmModule).toBeDefined();
  });

  it('should have AuthzModule defined', () => {
    const authzModule = module.get(AuthzModule);
    expect(authzModule).toBeDefined();
  });

  it('should have TechnicalTestModule defined', () => {
    const technicalTestModule = module.get(TechnicalTestModule);
    expect(technicalTestModule).toBeDefined();
  });

  it('should have AuthorizedController defined', () => {
    const authorizedController = module.get(AuthorizedController);
    expect(authorizedController).toBeDefined();
  });
});

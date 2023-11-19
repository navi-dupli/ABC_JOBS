import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AuthzModule } from './modules/authz/authz.module';
import { AuthorizedController } from './commons/controllers/authorized/authorized.controller';
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
  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have AuthzModule defined', () => {
    const authzModule = module.get(AuthzModule);
    expect(authzModule).toBeDefined();
  });

  it('should have AuthorizedController defined', () => {
    const authorizedController = module.get(AuthorizedController);
    expect(authorizedController).toBeDefined();
  });
});

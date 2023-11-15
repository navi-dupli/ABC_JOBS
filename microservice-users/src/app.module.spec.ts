import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthzModule } from './modules/authz/authz.module';
import { AuthorizedController } from './commons/controllers/authorized/authorized.controller';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerMiddleware } from './commons/middleware/logger.middleware';
import { UserManagerModule } from './commons/modules/user-manager/user-manager.module';
import { Firestore } from '@google-cloud/firestore';
import { FirebaseService } from './commons/modules/monitoring/firebase-service/firebase.service';

describe('AppModule', () => {
  let module: TestingModule;
  let app: INestApplication;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();
    app = module.createNestApplication<NestExpressApplication>();
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

  it('should have UserManagerModule defined', () => {
    const userManagerModule = module.get(UserManagerModule);
    expect(userManagerModule).toBeDefined();
  });

  it('should have AuthorizedController defined', () => {
    const authorizedController = module.get(AuthorizedController);
    expect(authorizedController).toBeDefined();
  });
});

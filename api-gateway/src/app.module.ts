import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthzModule } from './modules/authz/authz.module';
import { AuthorizedController } from './commons/controllers/authorized/authorized.controller';
import { LoggerMiddleware } from './commons/middleware/logger.middleware';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { MicroserviceManagerModule } from './commons/modules/microservice-manager/microservice-manager.module';
import { dynamicRoutesConfig } from './dynamic-routes.config';
import { CommonsModule } from './modules/commons/commons.module';

@Module({
  imports: [HttpModule, AuthzModule, UsersModule, CompaniesModule, CommonsModule, MicroserviceManagerModule.forRoot(dynamicRoutesConfig)],
  controllers: [AuthorizedController],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

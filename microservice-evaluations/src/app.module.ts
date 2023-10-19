import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthzModule } from './modules/authz/authz.module';
import { AuthorizedController } from './commons/controllers/authorized/authorized.controller';
import { TechnicalTestModule } from './modules/technical-test/technical-test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './commons/middleware/logger.middleware';
import {TestsModule} from "./modules/tests/tests.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => databaseConfig,
    }),
    AuthzModule,
    TechnicalTestModule,
    TestsModule
  ],
  controllers: [AuthorizedController],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

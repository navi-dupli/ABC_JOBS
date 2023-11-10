import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthzModule } from './modules/authz/authz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './commons/middleware/logger.middleware';
import { AuthorizedController } from './commons/controllers/authorized/authorized.controller';
import { UsersModule } from './modules/users/users.module';
import { UserManagerModule } from './commons/modules/user-manager/user-manager.module';
import { UserTestModule } from './modules/user-test/user-test.module';
import { MonitoringModule } from './commons/modules/monitoring/monitoring.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => databaseConfig,
    }),
    AuthzModule,
    UsersModule,
    UserManagerModule,
    UserTestModule,
    MonitoringModule,
  ],
  controllers: [AuthorizedController],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthzModule } from './modules/authz/authz.module';
import { AuthorizedController } from './commons/controllers/authorized/authorized.controller';
import { LocationModule } from './modules/location/location.module';
import { IdentificationModule } from './modules/identification/identification.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './commons/middleware/logger.middleware';
import { AbilityModule } from './modules/ability/abilityModule';
import { AbilityController } from './modules/ability/controllers/ability.controller';
import { AbilityService } from './modules/ability/services/ability.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => databaseConfig,
    }),
    AuthzModule,
    LocationModule,
    IdentificationModule,
    AbilityModule,
  ],
  controllers: [AuthorizedController, AbilityController],
  providers: [Logger, AbilityService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

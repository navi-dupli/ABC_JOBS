import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthzModule } from './modules/authz/authz.module';
import { AuthorizedController } from './commons/controllers/authorized/authorized.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './commons/middleware/logger.middleware';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { InterviewNotesModule } from './modules/interview-notes/interview-notes.module';
import { MonitoringModule } from './commons/modules/monitoring/monitoring.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => databaseConfig,
    }),
    AuthzModule,
    AppointmentModule,
    InterviewNotesModule,
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

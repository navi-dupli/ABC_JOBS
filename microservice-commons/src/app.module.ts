import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa ConfigModule
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa TypeOrmModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './modules/authz/authz.module';
import { AuthorizedController } from './commons/controllers/authorized/authorized.controller';
import { LocationModule } from './modules/location/location.module';
import { IdentificationModule } from './modules/identification/identification.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Configura ConfigModule
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: process.env.DB_TYPE as any,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    AuthzModule,
    LocationModule,
    IdentificationModule,
  ],
  controllers: [AppController, AuthorizedController],
  providers: [AppService],
})
export class AppModule {}

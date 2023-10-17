import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';

let configLoaded: TypeOrmModuleOptions;
if (process.env.NODE_ENV === 'test') {
  configLoaded = {
    type: 'sqlite',
    database: ':memory:',
    synchronize: false,
    dropSchema: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
  };
} else {
  configLoaded = {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: !!process.env.DB_SYNCHRONIZE,
    dropSchema: false,
  };
}
export const databaseConfig: TypeOrmModuleOptions = configLoaded;

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';
import { AuditSubscriber } from './commons/audit/audit.decorator';

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
  const microName = process.env.NAME ? process.env.NAME + '_' : 'dev_';
  const entityPrefix = process.env.NODE_ENV === 'production' ? '' : microName;
  configLoaded = {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    subscribers: [AuditSubscriber],
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: !!process.env.DB_SYNCHRONIZE,
    dropSchema: false,
    logging: !!process.env.DB_LOGGING,
    entityPrefix: entityPrefix,
  };
}
export const databaseConfig: TypeOrmModuleOptions = configLoaded;

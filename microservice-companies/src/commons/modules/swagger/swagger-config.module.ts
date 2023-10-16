import { Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';
// @ts-ignore
import { version } from '../../../../package.json';

@Module({})
export class SwaggerConfigModule {
  static setup(app) {
    const options = new DocumentBuilder()
      .setTitle(process.env.NAME)
      .setDescription(`API to manage ${process.env.NAME} `)
      .setVersion(version)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}

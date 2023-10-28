import { Module } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';

@Module({})
export class SwaggerConfigModule {
  static setup(app) {
    const options = new DocumentBuilder()
      .setTitle(process.env.NAME)
      .setDescription(`API to manage ${process.env.NAME} `)
      .setVersion(process.env.VERSION || 'latest')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${process.env.NAME}-app/api`, app, document);
  }
}

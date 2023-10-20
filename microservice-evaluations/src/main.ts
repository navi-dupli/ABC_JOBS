import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigModule } from './commons/modules/swagger/swagger-config.module';
import * as process from 'process';

async function bootstrap() {
  const port = process.env.PORT || 3003;

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix((process.env.NAME || 'base-path') + '-app');
  SwaggerConfigModule.setup(app);

  await app.listen(port);
  console.info(`>>>>>>>>>>>>>>>>>>>>>> APP NAME: ${process.env.NAME}`);
  console.info(`>>>>>>>>>>>>>>>>>>>>>> APP ENV: ${process.env.NODE_ENV}`);
  console.info(`>>>>>>>>>>>>>>>>>>>>>> Application is running on: http://localhost:${port}`);
}

bootstrap();

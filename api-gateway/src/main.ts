import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigModule } from './commons/modules/swagger/swagger-config.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  SwaggerConfigModule.setup(app);

  await app.listen(port);
  console.info(`>>> APP NAME: ${process.env.NAME}`);
  console.info(`>>> APP ENV: ${process.env.NODE_ENV}`);
  console.info(`>>> Application is running on: http://localhost:${port}/${process.env.NAME}-app/api`);
}

bootstrap();

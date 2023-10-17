import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.info(`>>>>>>>>>>>>>>>>>>>>>> APP NAME: ${process.env.NAME}`);
  console.info(`>>>>>>>>>>>>>>>>>>>>>> APP ENV: ${process.env.NODE_ENV}`);
  console.info(`>>>>>>>>>>>>>>>>>>>>>> Application is running on: http://localhost:${port}`);
}

bootstrap();

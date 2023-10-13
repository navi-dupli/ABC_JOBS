import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config(); // Cargar variables de entorno desde .env

describe('AppModule', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should start the application', async () => {
    expect(app).toBeDefined();
  });
});

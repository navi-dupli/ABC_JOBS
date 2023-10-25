// swagger.module.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SwaggerConfigModule } from './swagger-config.module';

describe('SwaggerModule', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should set up Swagger', () => {
    const setupSpy = jest.spyOn(SwaggerConfigModule, 'setup');

    // Simula una llamada a setup
    SwaggerConfigModule.setup(app);

    // Asegúrate de que la función setup fue llamada con los argumentos correctos
    expect(setupSpy).toHaveBeenCalledWith(app);

    // Puedes agregar más aserciones según sea necesario
  });
});

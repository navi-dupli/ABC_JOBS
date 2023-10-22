// generic.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { GenericController } from './generic.controller';
import { GenericRequestDelegatedService } from '../services/generic-request-delegated.service';
import { dynamicRoutesConfig, RouteConfig } from '../../../../dynamic-routes.config';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('GenericController', () => {
  let genericController: GenericController;
  let genericRequestDelegatedService: GenericRequestDelegatedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenericController],
      providers: [
        {
          provide: GenericRequestDelegatedService,
          useValue: {
            delegateRequest: jest.fn(),
          },
        },
      ],
    }).compile();

    genericController = module.get<GenericController>(GenericController);
    genericRequestDelegatedService = module.get<GenericRequestDelegatedService>(GenericRequestDelegatedService);
  });

  it('should handle requests', () => {
    const fakeRouteConfig: RouteConfig = {
      path: 'example',
      endPoint: 'http://example.com/api',
      microservice: 'example',
    };

    const req = {} as Request;

    // Configura el mock del servicio para devolver un valor falso
    const fakeResponse: Observable<any> = of({ status: 200, data: 'Fake response' });

    (genericRequestDelegatedService.delegateRequest as jest.Mock).mockReturnValue(fakeResponse);
    // Configura dynamicRoutesConfig para que coincida con la ruta en tus pruebas
    dynamicRoutesConfig.push(fakeRouteConfig);

    // Actúa llamando al método del controlador
    genericController.handleAll(req, 'example', {}, {});

    // Realiza las aserciones según la respuesta esperada
    expect(genericRequestDelegatedService.delegateRequest).toHaveBeenCalledWith(fakeRouteConfig, req);
  });

  it('should handle null routeConfig with NotFoundException', () => {
    const req = {} as Request;

    // Configura el mock del servicio para devolver un valor simulado
    (genericRequestDelegatedService.delegateRequest as jest.Mock).mockReturnValue(null); // Simula routeConfig nulo

    // Actúa llamando al método del controlador
    try {
      genericController.handleAll(req, 'nonexistent', {}, {});
    } catch (error) {
      // Verifica si se lanza una excepción NotFoundException
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe('Microservices with path: nonexistent not found');
    }
  });
});

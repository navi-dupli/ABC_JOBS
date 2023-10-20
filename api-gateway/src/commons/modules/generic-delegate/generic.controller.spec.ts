// generic.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { GenericController } from './generic.controller';
import { GenericRequestDelegatedService } from './generic-request-delegated.service';
import { dynamicRoutesConfig, RouteConfig } from '../../../dynamic-routes.config';
import { Request, Response } from 'express';
import { Observable, of } from 'rxjs';

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
    const res = {} as Response;

    // Configura el mock del servicio para devolver un valor falso
    const fakeResponse: Observable<any> = of({ status: 200, data: 'Fake response' });
    const observable: Observable<any> = new Observable((observable) => {
      observable.next({ status: 200, data: 'Fake response' });
      observable.complete();
    });

    (genericRequestDelegatedService.delegateRequest as jest.Mock).mockReturnValue(fakeResponse);
    // Configura dynamicRoutesConfig para que coincida con la ruta en tus pruebas
    dynamicRoutesConfig.push(fakeRouteConfig);

    // Actúa llamando al método del controlador
    genericController.handleAll(req, res, 'example', {}, {});

    // Realiza las aserciones según la respuesta esperada
    expect(genericRequestDelegatedService.delegateRequest).toHaveBeenCalledWith(fakeRouteConfig, req);
  });
});

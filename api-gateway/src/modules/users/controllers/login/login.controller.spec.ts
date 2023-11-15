import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { Request } from 'express';
import { MicroserviceClientService } from '../../../../commons/modules/microservice-manager/services/microservice-client.service';
import { Observable } from 'rxjs';
import { MicroserviceEnum } from '../../../../dynamic-routes.config';
import { HttpModule } from '@nestjs/axios';
import { MonitoringModule } from '../../../../commons/modules/monitoring/monitoring.module';

describe('LoginController', () => {
  let controller: LoginController;
  let microserviceClient: MicroserviceClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, MonitoringModule],
      controllers: [LoginController],
      providers: [
        {
          provide: MicroserviceEnum.USERS,
          useClass: MicroserviceClientService,
        },
      ],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    microserviceClient = module.get<MicroserviceClientService>(MicroserviceEnum.USERS);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should handle login request', async () => {
    const loginDto = { username: 'testuser', password: 'testpassword' };
    const mockResponse: Observable<any> = new Observable<any>((observable) => {
      observable.next({ status: 200, data: 'Login successful' });
      observable.complete();
    });

    jest.spyOn(microserviceClient, 'call').mockReturnValue(mockResponse);
    const request = {
      body: loginDto,
      headers: {},
    } as Request;

    const response = await controller.login(request.body, request);
    const expectedResponse = await mockResponse.toPromise();

    expect(response).toStrictEqual(expectedResponse);
  });
});

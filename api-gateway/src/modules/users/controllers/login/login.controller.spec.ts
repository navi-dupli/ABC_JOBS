import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { Request } from 'express';
import { GenericDelegateModule } from '../../../../commons/modules/generic-delegate/generic-delegate.module';
import { MicroserviceClientService } from '../../../../commons/modules/generic-delegate/services/microservice-client.service';
import { Observable } from 'rxjs';

describe('LoginController', () => {
  let controller: LoginController;
  let microserviceClient: MicroserviceClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GenericDelegateModule],
      controllers: [LoginController],
      providers: [],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    microserviceClient = module.get<MicroserviceClientService>(MicroserviceClientService);
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

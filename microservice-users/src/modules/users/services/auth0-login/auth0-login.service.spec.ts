import { Test, TestingModule } from '@nestjs/testing';
import { Auth0LoginService } from './auth0-login.service';
import { of, throwError } from 'rxjs';
import { LoginDto, Auth0RequestLoginDto, Auth0ResponseLoginDto } from '../../dto/login.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

describe('Auth0LoginService', () => {
  let service: Auth0LoginService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Auth0LoginService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<Auth0LoginService>(Auth0LoginService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the Auth0 API and return the response', async () => {
    const loginDto: LoginDto = {
      email: 'testuser@test.com',
      password: 'testpassword',
    };

    const auth0RequestLoginDto: Auth0RequestLoginDto = Auth0RequestLoginDto.fromLoginDto(loginDto);
    const response: AxiosResponse<Auth0ResponseLoginDto> = {
      data: {
        access_token: 'access_token',
        expires_in: 3600,
        token_type: 'Bearer',
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: null,
    };

    (httpService.post as jest.Mock).mockReturnValue(of(response));

    const result = await service.authenticate(loginDto);

    expect(result).toEqual(response.data);
    expect(httpService.post).toHaveBeenCalledWith(process.env.AUTH0_AUTH_END_POINT, auth0RequestLoginDto);
  });

  it('should handle errors and return null on error', async () => {
    const loginDto: LoginDto = {
      email: 'testuser@test.com',
      password: 'testpassword',
    };

    (httpService.post as jest.Mock).mockReturnValue(throwError(new Error('Test error')));

    const result = await service.authenticate(loginDto);

    expect(result).toBeNull();
    expect(httpService.post).toHaveBeenCalledWith(process.env.AUTH0_AUTH_END_POINT, expect.any(Auth0RequestLoginDto));
  });
});

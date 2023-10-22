import { Test, TestingModule } from '@nestjs/testing';
import { Auth0AuthenticationService } from './auth0-authentication.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import * as jwt from 'jsonwebtoken';

describe('Auth0AuthenticationService', () => {
  const secretKey = 'your-secret-key'; // Cambia esto por tu clave secreta

  let service: Auth0AuthenticationService;
  let httpService: HttpService;

  const now = Date.now();
  const expirationTime = now + 60 * 60 * 1000; // 60 minutos x 60 segundos x 1000 milisegundos
  const payload = {
    exp: expirationTime, // Agrega la fecha de expiración
  };
  const validAccessToken = jwt.sign(payload, secretKey);
  const invalidAccessToken = 'your-invalid-access-token';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Auth0AuthenticationService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<Auth0AuthenticationService>(Auth0AuthenticationService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return null for an invalid access token', (done) => {
    // Configura el mock del servicio HTTP para devolver un token no válido
    (httpService.post as jest.Mock).mockReturnValue(
      of({
        data: { access_token: null },
        status: 500,
      } as AxiosResponse),
    );

    const tokenObje = service.getAccessToken().subscribe((accessToken) => {
      expect(accessToken).toBe(null);
      done();
    });
  });
  it('should return a valid access token', (done) => {
    // Configura el mock del servicio HTTP para devolver un token válido
    (httpService.post as jest.Mock).mockReturnValue(
      of({
        data: { access_token: validAccessToken },
      } as AxiosResponse),
    );

    service.getAccessToken().subscribe((accessToken) => {
      expect(accessToken).toBe(validAccessToken);
      done();
    });
  });

  it('should return a valid access token from cache', (done) => {
    // Configura el mock del servicio HTTP para no ser llamado
    (httpService.post as jest.Mock).mockReturnValue(throwError('No debería llamarse'));

    // Almacenar el token en la caché
    service['accessToken'] = validAccessToken;

    service.getAccessToken().subscribe((accessToken) => {
      expect(accessToken).toBe(validAccessToken);
      done();
    });
  });
});

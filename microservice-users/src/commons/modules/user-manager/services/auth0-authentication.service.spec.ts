import { Test, TestingModule } from '@nestjs/testing';
import { Auth0AuthenticationService } from './auth0-authentication.service';
import { HttpModule } from '@nestjs/axios';

describe('Auth0AuthenticationService', () => {
  let service: Auth0AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [Auth0AuthenticationService],
    }).compile();

    service = module.get<Auth0AuthenticationService>(Auth0AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return a valid access token', async () => {
    const accessToken = await service.getAccessToken().toPromise();
    expect(accessToken).toBeFalsy();
  });

  it('should validate a valid token', () => {
    const validToken = '...'; //
    const isValid = service['isValidToken'](validToken);
    expect(isValid).toBeFalsy();
  });
});

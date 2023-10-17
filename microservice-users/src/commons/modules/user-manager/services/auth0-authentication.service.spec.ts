import { Test, TestingModule } from '@nestjs/testing';
import { Auth0AuthenticationService } from './auth0-authentication.service';

describe('Auth0AuthenticationService', () => {
  let service: Auth0AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth0AuthenticationService],
    }).compile();

    service = module.get<Auth0AuthenticationService>(Auth0AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

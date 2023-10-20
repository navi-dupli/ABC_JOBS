import { Test, TestingModule } from '@nestjs/testing';
import { Auth0LoginService } from './auth0-login.service';

describe('Auth0LoginService', () => {
  let service: Auth0LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth0LoginService],
    }).compile();

    service = module.get<Auth0LoginService>(Auth0LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

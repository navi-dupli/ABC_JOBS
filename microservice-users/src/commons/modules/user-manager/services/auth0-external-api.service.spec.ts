import { Test, TestingModule } from '@nestjs/testing';
import { Auth0ExternalApiService } from './auth0-external-api.service';

describe('Auth0ExternalApiService', () => {
  let service: Auth0ExternalApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth0ExternalApiService],
    }).compile();

    service = module.get<Auth0ExternalApiService>(Auth0ExternalApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

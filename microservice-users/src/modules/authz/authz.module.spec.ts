import { Test, TestingModule } from '@nestjs/testing';
import { AuthzModule } from './authz.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

describe('AuthzModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AuthzModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should export PassportModule', () => {
    const passportModule = module.get(PassportModule);
    expect(passportModule).toBeDefined();
  });

  it('should provide JwtStrategy', () => {
    const jwtStrategy = module.get(JwtStrategy);
    expect(jwtStrategy).toBeDefined();
  });
});

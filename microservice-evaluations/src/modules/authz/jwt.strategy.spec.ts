import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';

dotenv.config();

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('constructor', () => {
    it('should create a valid instance of PassportStrategy', () => {
      expect(strategy).toBeDefined();
    });
  });

  describe('validate', () => {
    it('should return the payload as is', () => {
      const payload = { sub: 'user123', roles: ['admin'] };
      const result = strategy.validate(payload);

      expect(result).toEqual(payload);
    });
  });
});

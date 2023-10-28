import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ability } from '../entities/ability.entity';
import { AbilityService } from './ability.service';

describe('AbilityService', () => {
  let service: AbilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AbilityService,
        {
          provide: getRepositoryToken(Ability),
          useClass: Repository
        },
      ],
    }).compile();

    service = module.get<AbilityService>(AbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

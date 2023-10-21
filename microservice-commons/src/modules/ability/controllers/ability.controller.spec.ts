import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ability } from '../entities/ability.entity';
import { AbilityService } from '../services/ability.service';
import { AbilityController } from './ability.controller';

describe('AbilityController', () => {
  let controller: AbilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbilityController],
      providers: [
        AbilityService,
        {
          provide: getRepositoryToken(Ability),
          useClass: Repository
        },
      ],
    }).compile();

    controller = module.get<AbilityController>(AbilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

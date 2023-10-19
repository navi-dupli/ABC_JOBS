import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalTestService } from './technical-test.service';
import { Repository } from 'typeorm';
import { TechnicalTest } from '../entities/technical-test.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TechnicalTestService', () => {
  let service: TechnicalTestService;
  let repository: Repository<TechnicalTest>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnicalTestService,
        {
          provide: getRepositoryToken(TechnicalTest),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TechnicalTestService>(TechnicalTestService);
    repository = module.get<Repository<TechnicalTest>>(getRepositoryToken(TechnicalTest));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});

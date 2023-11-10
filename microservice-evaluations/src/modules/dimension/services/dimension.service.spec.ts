import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {DimensionService} from "./dimension.service";
import {DimensionEntity} from "../entities/dimension.entity";

describe('DimensionService', () => {
  let service: DimensionService;
  let repository: Repository<DimensionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DimensionService,
        {
          provide: getRepositoryToken(DimensionEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DimensionService>(DimensionService);
    repository = module.get<Repository<DimensionEntity>>(getRepositoryToken(DimensionEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});

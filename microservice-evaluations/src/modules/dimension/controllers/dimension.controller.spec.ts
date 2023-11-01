import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {DimensionController} from "./dimension.controller";
import {DimensionService} from "../services/dimension.service";
import {DimensionEntity} from "../entities/dimension.entity";

describe('DimensionController', () => {
  let controller: DimensionController;
  let service: DimensionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DimensionController],
      providers: [
        DimensionService,
        {
          provide: getRepositoryToken(DimensionEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<DimensionController>(DimensionController);
    service = module.get<DimensionService>(DimensionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});

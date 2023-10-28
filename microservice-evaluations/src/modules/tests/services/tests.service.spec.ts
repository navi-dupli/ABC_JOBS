import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {TestsService} from "./tests.service";
import {Tests} from "../entities/tests.entity";

describe('TestsService', () => {
  let service: TestsService;
  let repository: Repository<Tests>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestsService,
        {
          provide: getRepositoryToken(Tests),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TestsService>(TestsService);
    repository = module.get<Repository<Tests>>(getRepositoryToken(Tests));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});

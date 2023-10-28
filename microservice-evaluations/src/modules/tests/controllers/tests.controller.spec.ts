// cities.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {TestsController} from "./tests.controller";
import {TestsService} from "../services/tests.service";
import {Tests} from "../entities/tests.entity";

describe('TestsController', () => {
  let controller: TestsController;
  let service: TestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestsController],
      providers: [
        TestsService,
        {
          provide: getRepositoryToken(Tests),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<TestsController>(TestsController);
    service = module.get<TestsService>(TestsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});

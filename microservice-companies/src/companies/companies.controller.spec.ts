// cities.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CompaniesController} from "./companies.controller";
import {CompaniesService} from "./companies.service";
import {Company} from "./entity/company.entity";

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        CompaniesService,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});

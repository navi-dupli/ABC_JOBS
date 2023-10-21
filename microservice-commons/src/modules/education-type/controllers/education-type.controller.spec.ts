import { Test, TestingModule } from '@nestjs/testing';
import { EducationTypeController } from './education-type.controller';
import { Repository } from 'typeorm';
import { EducationType } from '../entities/education-type.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EducationTypeService } from '../services/education-type.service';

describe('EducationTypeController', () => {
  let controller: EducationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationTypeController],
      providers: [
        EducationTypeService,
        {
          provide: getRepositoryToken(EducationType),
          useClass: Repository
        },
      ],
    }).compile();

    controller = module.get<EducationTypeController>(EducationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

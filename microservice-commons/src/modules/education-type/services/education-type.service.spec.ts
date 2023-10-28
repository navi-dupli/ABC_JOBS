import { Test, TestingModule } from '@nestjs/testing';
import { EducationTypeService } from './education-type.service';
import { Repository } from 'typeorm';
import { EducationType } from '../entities/education-type.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EducationTypeService', () => {
  let service: EducationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EducationTypeService,
        {
          provide: getRepositoryToken(EducationType),
          useClass: Repository
        },
      ],
    }).compile();

    service = module.get<EducationTypeService>(EducationTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

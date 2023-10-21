import { Test, TestingModule } from '@nestjs/testing';
import { EducationTypeService } from './education-type.service';

describe('EducationTypeService', () => {
  let service: EducationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationTypeService],
    }).compile();

    service = module.get<EducationTypeService>(EducationTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

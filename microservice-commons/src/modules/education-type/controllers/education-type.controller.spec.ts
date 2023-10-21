import { Test, TestingModule } from '@nestjs/testing';
import { EducationTypeController } from './education-type.controller';

describe('EducationTypeController', () => {
  let controller: EducationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationTypeController],
    }).compile();

    controller = module.get<EducationTypeController>(EducationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

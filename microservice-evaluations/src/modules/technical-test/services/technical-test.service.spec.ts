import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalTestService } from './technical-test.service';
import { Repository } from 'typeorm';
import { TechnicalTest } from '../entities/technical-test.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegisterTechnicalTestDto } from '../dto/register-technical-test.dto';

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

  it('should register a technical test', async () => {
    const registerTechTestDto: RegisterTechnicalTestDto = {
      state: "Ejemplo de estado",
      user_id: 123,
      observations: "Ejemplo de observaciones",
      qualify: 5,
      qualifying_user_id: 456,
      test_id: 789
    }; 
    const techTest: TechnicalTest = {
      date: new Date(),
      state: "Ejemplo de estado",
      user_id: 123,
      observations: "Ejemplo de observaciones",
      qualify: 5,
      qualifying_user_id: 456,
      test_id: 789,
      id: 1
    };

    jest.spyOn(service.technicalTestRepository, 'create').mockReturnValue(techTest);
    jest.spyOn(service.technicalTestRepository, 'save').mockResolvedValue(techTest);

    const result = await service.registerTechTest(registerTechTestDto);

    expect(result).toEqual(techTest);
  });

});

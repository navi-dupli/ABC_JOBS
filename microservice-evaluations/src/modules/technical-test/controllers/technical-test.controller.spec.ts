import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalTestController } from './technical-test.controller';
import { TechnicalTestService } from '../services/technical-test.service';
import { TechnicalTest } from '../entities/technical-test.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {RegisterTechnicalTestDto} from "../dto/register-technical-test.dto";

describe('TechnicalTestController', () => {
  let controller: TechnicalTestController;
  let service: TechnicalTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnicalTestController],
      providers: [
        TechnicalTestService,
        {
          provide: getRepositoryToken(TechnicalTest),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<TechnicalTestController>(TechnicalTestController);
    service = module.get<TechnicalTestService>(TechnicalTestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of technical tests', async () => {
    const mockTechTests: TechnicalTest[] = [
      {
        date: new Date(),
        state: "Ejemplo de estado",
        user_id: 123,
        observations: "Ejemplo de observaciones",
        qualify: 5,
        qualifying_user_id: 456,
        test_id: 789,
        id: 1
      }
    ];
    jest.spyOn(service, 'getTechTest').mockResolvedValue(mockTechTests);

    const result = await controller.getTechnicalTest();

    expect(result).toEqual(mockTechTests);
  });

  it('should register a technical test', async () => {
    const registerTechTestDto: RegisterTechnicalTestDto = {
      date: new Date(),
      state: "Ejemplo de estado",
      user_id: 123,
      observations: "Ejemplo de observaciones",
      qualify: 5,
      qualifying_user_id: 456,
      test_id: 789
    };
    const registeredTechTest: TechnicalTest = {
      date: new Date(),
      state: "Ejemplo de estado",
      user_id: 123,
      observations: "Ejemplo de observaciones",
      qualify: 5,
      qualifying_user_id: 456,
      test_id: 789,
      id: 1
    }; 
    jest.spyOn(service, 'registerTechTest').mockResolvedValue(registeredTechTest);

    const result = await controller.registerTechnicalTest(registerTechTestDto);

    expect(result).toEqual(registeredTechTest);
  });

  it('should handle exceptions from service', async () => {
    const registerTechTestDto: RegisterTechnicalTestDto = {
      date: new Date(),
      state: "Ejemplo de estado",
      user_id: 123,
      observations: "Ejemplo de observaciones",
      qualify: 5,
      qualifying_user_id: 456,
      test_id: 789
    };
    const error = new Error('Internal Server Error');
    jest.spyOn(service, 'registerTechTest').mockRejectedValue(error);

    await expect(controller.registerTechnicalTest(registerTechTestDto)).rejects.toThrow(Error);
  });

});

// cities.controller.spec.ts
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

  it('should return an array of companies', async () => {
    const registerTechTestDto = registerTechTestMock();
    const techTest = getRegisterTechTestFromDto(registerTechTestDto);
    const result = [techTest];
    jest.spyOn(service, 'getTechnicalTest').mockResolvedValue(result);

    expect(await controller.getTechnicalTest()).toBe(result);
  });

  it('should create a new company', async () => {
    const registerTechTestDto = registerTechTestMock();
    const result = getRegisterTechTestFromDto(registerTechTestDto);
    jest.spyOn(service, 'registerTechnicalTest').mockResolvedValue(result);

    expect(await controller.registerTechnicalTest(registerTechTestDto)).toBe(result);
  });

});

function registerTechTestMock() {
  const registerTechTestDto: RegisterTechnicalTestDto = {
    "date": new Date(),
    "state": "Ejemplo de estado",
    "user_id": 123,
    "observations": "Ejemplo de observaciones",
    "qualify": 5,
    "qualifying_user_id": 456,
    "test_id": 789
  }
  return registerTechTestDto;
}

function getRegisterTechTestFromDto(registerTechTestDto: RegisterTechnicalTestDto) {
  const result = {
    date: registerTechTestDto.date,
    state: registerTechTestDto.state,
    user_id: registerTechTestDto.user_id,
    observations: registerTechTestDto.observations,
    qualify: registerTechTestDto.qualify,
    qualifying_user_id: registerTechTestDto.qualifying_user_id,
    test_id: registerTechTestDto.test_id
  };
  return result;
}
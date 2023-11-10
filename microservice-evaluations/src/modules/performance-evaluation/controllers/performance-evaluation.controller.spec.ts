import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {PerformanceEvaluationController} from "./performance-evaluation.controller";
import {PerformanceEvaluationService} from "../services/performance-evaluation.service";
import {PerformanceEvaluation} from "../entities/performance-evaluation.entity";
import {PerformanceEvaluationDto} from "../dto/performance-evaluation.dto";

describe('PerformanceEvaluationController', () => {
  let controller: PerformanceEvaluationController;
  let service: PerformanceEvaluationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformanceEvaluationController],
      providers: [
        PerformanceEvaluationService,
        {
          provide: getRepositoryToken(PerformanceEvaluation),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PerformanceEvaluationController>(PerformanceEvaluationController);
    service = module.get<PerformanceEvaluationService>(PerformanceEvaluationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of performance evaluation', async () => {
    const mockTechPerformanceEval: PerformanceEvaluation[] = [
      {
        "performance": "Alto",
        "observations": "NA",
        "project_id": 1,
        "team_id": 1,
        "user_id": 1,
        "qualifying_user_id": 1,
        "dimension_id": 1,
        "id": 1,
        "date": new Date()
      }
    ];
    jest.spyOn(service, 'getPerformanceEvaluations').mockResolvedValue(mockTechPerformanceEval);

    const result = await controller.getPerformanceEval();

    expect(result).toEqual(mockTechPerformanceEval);
  });

  it('should register a technical test', async () => {
    const performanceEvaluationDto: PerformanceEvaluationDto = {
      "performance": "Alto",
      "observations": "NA",
      "project_id": 1,
      "team_id": 1,
      "user_id": 1,
      "qualifying_user_id": 1,
      "dimension_id": 1
    };
    const registerPerformanceEval: PerformanceEvaluation = {
      "performance": "Alto",
      "observations": "NA",
      "project_id": 1,
      "team_id": 1,
      "user_id": 1,
      "qualifying_user_id": 1,
      "dimension_id": 1,
      "id": 1,
      "date": new Date()
    };
    jest.spyOn(service, 'registerPerformanceEvaluation').mockResolvedValue(registerPerformanceEval);

    const result = await controller.registerPerformanceEval(performanceEvaluationDto);

    expect(result).toEqual(registerPerformanceEval);
  });

  it('should handle exceptions from service', async () => {
    const performanceEvaluationDto: PerformanceEvaluationDto = {
      "performance": "Alto",
      "observations": "NA",
      "project_id": 1,
      "team_id": 1,
      "user_id": 1,
      "qualifying_user_id": 1,
      "dimension_id": 1
    };
    const error = new Error('Internal Server Error');
    jest.spyOn(service, 'registerPerformanceEvaluation').mockRejectedValue(error);

    await expect(controller.registerPerformanceEval(performanceEvaluationDto)).rejects.toThrow(Error);
  });

});

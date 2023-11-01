import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {PerformanceEvaluationService} from "./performance-evaluation.service";
import {PerformanceEvaluation} from "../entities/performance-evaluation.entity";
import {PerformanceEvaluationDto} from "../dto/performance-evaluation.dto";

describe('PerformanceEvaluationService', () => {
  let service: PerformanceEvaluationService;
  let repository: Repository<PerformanceEvaluation>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerformanceEvaluationService,
        {
          provide: getRepositoryToken(PerformanceEvaluation),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PerformanceEvaluationService>(PerformanceEvaluationService);
    repository = module.get<Repository<PerformanceEvaluation>>(getRepositoryToken(PerformanceEvaluation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a performance evaluation', async () => {
    const registerPerformanceEval: PerformanceEvaluationDto = {
      "performance": "Alto",
      "observations": "NA",
      "project_id": 1,
      "team_id": 1,
      "user_id": 1,
      "qualifying_user_id": 1,
      "dimension_id": 1
    };
    const performanceEval = {
      "performance": "Alto",
      "observations": "NA",
      "project_id": 1,
      "team_id": 1,
      "user_id": 1,
      "qualifying_user_id": 1,
      "dimension_id": 1,
      "id": 1,
      date: new Date()
    };

    jest.spyOn(service.performanceEvaluationRepository, 'create').mockReturnValue(performanceEval);
    jest.spyOn(service.performanceEvaluationRepository, 'save').mockResolvedValue(performanceEval);

    const result = await service.registerPerformanceEvaluation(registerPerformanceEval);

    expect(result).toEqual(performanceEval);
  });

});

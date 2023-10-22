import { Test, TestingModule } from '@nestjs/testing';
import { CandidateController } from './candidate.controller';
import { CandidateService } from '../../services/candidate/candidate.service';
import { User } from '../../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CandidateController', () => {
  let controller: CandidateController;
  let service: CandidateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidateController],
      providers: [
        CandidateService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CandidateController>(CandidateController);
    service = module.get<CandidateService>(CandidateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the candidateController with query parameters', async () => {
    const skills = [1, 2, 3];
    const languages = ['English', 'Spanish'];
    const countries = [4, 5];
    const education = ['Bachelor', 'Master'];
    const experienceYears = ['1-3', '4-6'];

    const expectedUsers: User[] = []; // Define aquí los usuarios esperados

    jest.spyOn(service, 'search').mockResolvedValue(expectedUsers);

    const result = await controller.search(skills, languages, countries, education, experienceYears);
    expect(result).toEqual(expectedUsers);
  });
});

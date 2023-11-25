import { Test, TestingModule } from '@nestjs/testing';
import { CandidateController } from './candidate.controller';
import { CandidateService } from '../../services/candidate/candidate.service';
import { User } from '../../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from '../../../education/entities/education.entity';
import { Experience } from '../../../experience/entities/experience.entity';
import { UserLanguage } from '../../../userLanguage/entities/userLanguage.entity';
import { UserAbility } from '../../../userAbility/entities/userAbility.entity';

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
        {
          provide: getRepositoryToken(Education),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Experience),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserLanguage),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserAbility),
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

  it('should find a user by id', async () => {
    const expectedUser: User = new User(); // Define aquí el usuario esperado

    jest.spyOn(service, 'findOne').mockResolvedValue(expectedUser);

    const result = await controller.findOne(1);
    expect(result).toEqual(expectedUser);
  });

  it('should add an education to a user', async () => {
    const expectedEducation: Education = new Education(); // Define aquí la educación esperada

    jest.spyOn(service, 'addEducation').mockResolvedValue(expectedEducation);

    const result = await controller.addEducation(1, new Education());
    expect(result).toEqual(expectedEducation);
  });

  it('should add an experience to a user', async () => {
    const expectedExperience: Experience = new Experience(); // Define aquí la experiencia esperada

    jest.spyOn(service, 'addExperience').mockResolvedValue(expectedExperience);

    const result = await controller.addExperience(1, new Experience());
    expect(result).toEqual(expectedExperience);
  });

  it('should add a language to a user', async () => {
    const expectedUser: User = new User(); // Define aquí el usuario esperado

    jest.spyOn(service, 'addLanguage').mockResolvedValue(expectedUser);

    const result = await controller.addLanguage(1, []);
    expect(result).toEqual(expectedUser);
  });

  it('should add a skill to a user', async () => {
    const expectedUser: User = new User(); // Define aquí el usuario esperado

    jest.spyOn(service, 'addSkills').mockResolvedValue(expectedUser);

    const result = await controller.addSkills(1, []);
    expect(result).toEqual(expectedUser);
  });

  it('should add a skill to a user', async () => {
    const expectedUser: User = new User(); // Define aquí el usuario esperado

    jest.spyOn(service, 'addSkills').mockResolvedValue(expectedUser);

    const result = await controller.addSkills(1, []);
    expect(result).toEqual(expectedUser);
  });
});

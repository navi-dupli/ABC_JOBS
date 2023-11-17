import { Test, TestingModule } from '@nestjs/testing';
import { CandidateService } from './candidate.service';
import { User } from '../../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('CandidateService', () => {
  let service: CandidateService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidateService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CandidateService>(CandidateService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the candidateService with query parameters', async () => {
    const skills = [1, 2, 3];
    const languages = ['English', 'Spanish'];
    const countries = [4, 5];
    const education = ['Bachelor', 'Master'];
    const experienceYears = ['1-3', '4-6', '6'];

    const expectedUsers: User[] = [
      {
        id: 1,
        names: 'John',
        surnames: 'Doe',
        email: 'p@p.com',
        picture: 'http://example.com',
        authId: '123456789',
        rol: 'CANDIDATO',
        company_id: null,
        typeIdentificationId: 1,
        nameIdentification: 'Cédula de ciudadanía',
        identification: '123456789',
        phone: '123456789',
        experienceYears: 1,
        education: [],
        languages: [],
        skills: [],
        location: null,
        experiences: [],
        userTests: [],
        address: 'Calle 123',
        dateBirthDate: new Date(),
      },
    ]; // Define aquí los usuarios esperados

    jest.spyOn(userRepository, 'find').mockResolvedValue(expectedUsers);

    const result = await service.search(skills, languages, countries, education, experienceYears);

    expect(result).toEqual(expectedUsers);
  });
});

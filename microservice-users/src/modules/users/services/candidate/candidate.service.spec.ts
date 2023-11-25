import { Test, TestingModule } from '@nestjs/testing';
import { CandidateService } from './candidate.service';
import { User } from '../../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from '../../../education/entities/education.entity';
import { Experience } from '../../../experience/entities/experience.entity';
import { UserLanguage } from '../../../userLanguage/entities/userLanguage.entity';
import { UserAbility } from '../../../userAbility/entities/userAbility.entity';

describe('CandidateService', () => {
  let service: CandidateService;
  let userRepository: Repository<User>;
  let educationRepository: Repository<Education>;
  let experienceRepository: Repository<Experience>;
  let userLanguageRepository: Repository<UserLanguage>;
  let userAbilityRepository: Repository<UserAbility>;

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
      dateBirthday: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<CandidateService>(CandidateService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    educationRepository = module.get<Repository<Education>>(getRepositoryToken(Education));
    experienceRepository = module.get<Repository<Experience>>(getRepositoryToken(Experience));
    userLanguageRepository = module.get<Repository<UserLanguage>>(getRepositoryToken(UserLanguage));
    userAbilityRepository = module.get<Repository<UserAbility>>(getRepositoryToken(UserAbility));
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

    jest.spyOn(userRepository, 'find').mockResolvedValue(expectedUsers);

    const result = await service.search(skills, languages, countries, education, experienceYears);

    expect(result).toEqual(expectedUsers);
  });

  it('should find user', async () => {
    const expectedUser = expectedUsers[0];
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUser);
    const result = await service.findOne(1);
    expect(result).toEqual(expectedUser);
  });

  it('should add education', async () => {
    const expectedUser = expectedUsers[0];
    const expectedEducation: Education = {
      id: 1,
      type: 'Bachelor',
      title: 'Ingeniería de sistemas',
      institution: 'Universidad',
      dateInit: new Date(),
      dateEnd: new Date(),
      user: null,
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUser);
    jest.spyOn(educationRepository, 'save').mockResolvedValue(expectedEducation);
    const result = await service.addEducation(1, expectedEducation);

    expect(result).toEqual(expectedEducation);
  });

  it('should add education throw error not found user', async () => {
    const expectedEducation: Education = {
      id: 1,
      type: 'Bachelor',
      title: 'Ingeniería de sistemas',
      institution: 'Universidad',
      dateInit: new Date(),
      dateEnd: new Date(),
      user: null,
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(educationRepository, 'save').mockResolvedValue(expectedEducation);
    await expect(service.addEducation(1, expectedEducation)).rejects.toThrowError('User not found');
  });

  it('should add experience', async () => {
    const expectedUser = expectedUsers[0];
    const expectedExperience: Experience = {
      id: 1,
      company: 'Company',
      job: 'Position',
      dateInit: new Date(),
      dateEnd: new Date(),
      user: null,
      description: 'Description',
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUser);
    jest.spyOn(experienceRepository, 'save').mockResolvedValue(expectedExperience);
    const result = await service.addExperience(1, expectedExperience);

    expect(result).toEqual(expectedExperience);
  });

  it('should add experience throw error not found user', async () => {
    const expectedExperience: Experience = {
      id: 1,
      company: 'Company',
      job: 'Position',
      dateInit: new Date(),
      dateEnd: new Date(),
      user: null,
      description: 'Description',
    };
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(experienceRepository, 'save').mockResolvedValue(expectedExperience);
    await expect(service.addExperience(1, expectedExperience)).rejects.toThrowError('User not found');
  });

  it('should add language', async () => {
    const expectedUser = expectedUsers[0];
    const expectedLanguage: UserLanguage[] = [
      {
        id: 1,
        name: 'English',
        code: 'EN',
        user: null,
      },
    ];

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUser);
    jest.spyOn(userLanguageRepository, 'findOne').mockResolvedValue(expectedLanguage[0]);
    jest.spyOn(userLanguageRepository, 'save').mockResolvedValue(expectedLanguage[0]);
    const result = await service.addLanguage(1, expectedLanguage);

    expect(result).toEqual(expectedUser);
  });

  it('should add language throw error not found user', async () => {
    const expectedLanguage: UserLanguage[] = [
      {
        id: 1,
        name: 'English',
        code: 'EN',
        user: null,
      },
    ];
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(userLanguageRepository, 'findOne').mockResolvedValue(expectedLanguage[0]);
    jest.spyOn(userLanguageRepository, 'save').mockResolvedValue(expectedLanguage[0]);
    await expect(service.addLanguage(1, expectedLanguage)).rejects.toThrowError('User not found');
  });

  it('should add language no exist language', async () => {
    const expectedUser = expectedUsers[0];
    const expectedLanguage: UserLanguage[] = [
      {
        id: 1,
        name: 'English',
        code: 'EN',
        user: null,
      },
    ];

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUser);
    jest.spyOn(userLanguageRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(userLanguageRepository, 'save').mockResolvedValue(expectedLanguage[0]);
    const result = await service.addLanguage(1, expectedLanguage);

    expect(result).toEqual(expectedUser);
  });

  it('should add language remove language', async () => {
    const expectedUser = expectedUsers[0];
    const user = expectedUsers[0];
    user.languages = [
      {
        id: 2,
        name: 'English',
        user: null,
        code: 'EN',
      },
    ];
    const expectLanguage: UserLanguage[] = [
      {
        id: 1,
        name: 'English',
        code: 'EN',
        user: null,
      },
    ];

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
    jest.spyOn(userLanguageRepository, 'findOne').mockResolvedValue(expectLanguage[0]);
    jest.spyOn(userLanguageRepository, 'save').mockResolvedValue(expectLanguage[0]);
    jest.spyOn(userLanguageRepository, 'remove').mockResolvedValue(expectLanguage[0]);
    const result = await service.addLanguage(1, expectLanguage);

    expect(result).toEqual(expectedUser);
  });

  it('should add ability', async () => {
    const expectedUser = expectedUsers[0];
    const expectedAbility: UserAbility[] = [
      {
        id: 1,
        name: 'English',
        user: null,
        idAbility: 1,
      },
    ];

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUser);
    jest.spyOn(userAbilityRepository, 'findOne').mockResolvedValue(expectedAbility[0]);
    jest.spyOn(userAbilityRepository, 'save').mockResolvedValue(expectedAbility[0]);
    const result = await service.addSkills(1, expectedAbility);

    expect(result).toEqual(expectedUser);
  });

  it('should add ability throw error not found user', async () => {
    const expectedAbility: UserAbility[] = [
      {
        id: 1,
        name: 'English',
        user: null,
        idAbility: 1,
      },
    ];
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(userAbilityRepository, 'findOne').mockResolvedValue(expectedAbility[0]);
    jest.spyOn(userAbilityRepository, 'save').mockResolvedValue(expectedAbility[0]);
    await expect(service.addSkills(1, expectedAbility)).rejects.toThrowError('User not found');
  });

  it('should add ability no exist ability', async () => {
    const expectedUser = expectedUsers[0];
    const expectedAbility: UserAbility[] = [
      {
        id: 1,
        name: 'English',
        user: null,
        idAbility: 1,
      },
    ];

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUser);
    jest.spyOn(userAbilityRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(userAbilityRepository, 'save').mockResolvedValue(expectedAbility[0]);
    const result = await service.addSkills(1, expectedAbility);

    expect(result).toEqual(expectedUser);
  });

  it('should add ability remove ability', async () => {
    const expectedUser = expectedUsers[0];
    const user = expectedUsers[0];
    user.skills = [
      {
        id: 2,
        name: 'English',
        user: null,
        idAbility: 1,
      },
    ];
    const expectedAbility: UserAbility[] = [
      {
        id: 1,
        name: 'English',
        user: null,
        idAbility: 1,
      },
    ];

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUser);
    jest.spyOn(userAbilityRepository, 'findOne').mockResolvedValue(expectedAbility[0]);
    jest.spyOn(userAbilityRepository, 'save').mockResolvedValue(expectedAbility[0]);
    jest.spyOn(userAbilityRepository, 'remove').mockResolvedValue(expectedAbility[0]);
    const result = await service.addSkills(1, expectedAbility);

    expect(result).toEqual(expectedUser);
  });

  it('should update experience years', async () => {
    const expectedUser = expectedUsers[0];
    const experienceYears = 1;
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(expectedUser);
    jest.spyOn(userRepository, 'save').mockResolvedValue({ ...expectedUser, experienceYears: 1 });
    const result = await service.updateExperienceYears(1, experienceYears);
    expect(result.experienceYears).toEqual(1);
  });

  it('should update experience years throw error not found user', async () => {
    const experienceYears = 1;
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
    jest.spyOn(userRepository, 'save').mockResolvedValue({ ...expectedUsers[0], experienceYears: 1 });
    await expect(service.updateExperienceYears(1, experienceYears)).rejects.toThrowError('User not found');
  });
});

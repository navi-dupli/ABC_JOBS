import { Test, TestingModule } from '@nestjs/testing';
import { UserTestService } from './user-test.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTest } from '../entities/user-test.entity';

describe('UserTestService', () => {
  let service: UserTestService;
  let repository: Repository<UserTest>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTestService,
        {
          provide: getRepositoryToken(UserTest),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserTestService>(UserTestService);
    repository = module.get<Repository<UserTest>>(getRepositoryToken(UserTest));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the userTestService with query parameters', async () => {
    const testId = 1;

    const expectedUserTests: UserTest[] = []; // Define aquí los usuarios esperados

    jest.spyOn(repository, 'find').mockResolvedValue(expectedUserTests);

    const userTests = await service.findByTest(testId);

    expect(userTests).toEqual(expectedUserTests);
  });
});

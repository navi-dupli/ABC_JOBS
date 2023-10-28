import { Test, TestingModule } from '@nestjs/testing';
import { UserTestController } from './user-test.controller';
import { UserTestService } from '../services/user-test.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserTest } from '../entities/user-test.entity';
import { Repository } from 'typeorm';

describe('UserTestController', () => {
  let controller: UserTestController;
  let service: UserTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTestController],
      providers: [
        UserTestService,
        {
          provide: getRepositoryToken(UserTest),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UserTestController>(UserTestController);
    service = module.get<UserTestService>(UserTestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the findByTest with query parameters', async () => {
    const testId = 1;

    const expectedUserTests: UserTest[] = []; // Define aquí los usuarios esperados

    jest.spyOn(service, 'findByTest').mockResolvedValue(expectedUserTests);

    const userTests = await controller.findByTest(testId);

    expect(userTests).toEqual(expectedUserTests);
  });
});

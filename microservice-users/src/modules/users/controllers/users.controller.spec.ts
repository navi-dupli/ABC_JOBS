import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserManagerModule } from '../../../commons/modules/user-manager/user-manager.module';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UserController', () => {
  let userController: UsersController;
  let userService: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [UserManagerModule],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an array of users', async () => {
      const mockCreatedUser: User[] = [
        {
          id: 1,
          names: 'John',
          surnames: 'Doe',
          email: 'myemail@gmail.com',
          picture: 'http://example.com',
          authId: '123456789',
        },
      ];
      jest.spyOn(userService, 'findAll').mockResolvedValue(mockCreatedUser);
      const result = await userController.findAll();
      expect(result).toBe(mockCreatedUser);
    });
  });
  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        names: 'John',
        surnames: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        roles: ['user'],
      };

      const mockCreatedUser: User = {
        id: 1,
        names: createUserDto.names,
        surnames: createUserDto.surnames,
        email: createUserDto.email,
        picture: 'http://example.com',
        authId: '123456789',
      };

      jest.spyOn(userService, 'createUser').mockResolvedValue(mockCreatedUser);

      const result = await userController.createUser(createUserDto);
      expect(result).toBe(mockCreatedUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers: User[] = [
        {
          id: 1,
          names: 'John',
          surnames: 'Doe',
          email: 'john.doe@example.com',
          picture: 'http://example.com',
          authId: '123456789',
        },
        {
          id: 2,
          names: 'Jane',
          surnames: 'Doe',
          email: 'jane.doe@example.com',
          picture: 'http://example.com',
          authId: '123456789',
        },
      ];

      jest.spyOn(userService, 'findAll').mockResolvedValue(mockUsers);

      const result = await userController.findAll();
      expect(result).toBe(mockUsers);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserManagerModule } from '../../../commons/modules/user-manager/user-manager.module';
import { CreateUserDto } from '../dto/create-user.dto';
import { Auth0LoginService } from '../services/auth0-login/auth0-login.service';
import { HttpModule } from '@nestjs/axios';

describe('UserController', () => {
  let userController: UsersController;
  let userService: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [UserManagerModule, HttpModule],
      providers: [
        Auth0LoginService,
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
        rol: 'user',
        company_id: null,
        typeIdentificationId: 1,
        nameIdentification: 'Cédula de ciudadanía',
        locationId: null,
        identification: '123456789',
      };

      const mockCreatedUser: User = {
        id: 1,
        names: createUserDto.names,
        surnames: createUserDto.surnames,
        email: createUserDto.email,
        picture: 'http://example.com',
        authId: '123456789',
        rol: createUserDto.rol,
        company_id: null,
        typeIdentificationId: createUserDto.typeIdentificationId,
        nameIdentification: createUserDto.nameIdentification,
        identification: createUserDto.identification,
        phone: null,
        experienceYears: null,
        education: [],
        languages: [],
        skills: [],
        location: null,
        experiences: [],
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
        },
        {
          id: 2,
          names: 'Jane',
          surnames: 'Doe',
          email: 'jane.doe@example.com',
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

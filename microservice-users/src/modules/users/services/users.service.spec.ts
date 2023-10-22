import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Auth0ExternalApiService } from '../../../commons/modules/user-manager/services/auth0-external-api.service';
import { ExternalApiResponseDto, Identity } from '../../../commons/modules/user-manager/dto/external-api.dto';
import { Repository } from 'typeorm';
import { UserManagerModule } from '../../../commons/modules/user-manager/user-manager.module';
import { Auth0LoginService } from './auth0-login/auth0-login.service';
import { Auth0RoleEnum } from '../../../commons/modules/user-manager/enums/role.enum';
import { UserAlreadyExistException } from '../../../commons/exceptions/user-already-exist.exception';
import { Auth0ResponseLoginDto, LoginDto } from '../dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { UserLoginErrorException } from '../../../commons/exceptions/user-login-error.exception';
import { UserLoginFailedException } from '../../../commons/exceptions/user-login-failed.exception';

const fakeIdentity = new Identity('Username-Password-Authentication', 'fakeUserId', 'auth0', false);
const fakeExternalApiResponseDto = new ExternalApiResponseDto(
  false,
  '2023-10-16T20:59:36.925Z',
  'fake.email@example.com',
  false,
  [fakeIdentity],
  'Fake User',
  'fakeUser',
  'http://fake-url-to-picture.png',
  '2023-10-16T20:59:36.925Z',
  'fakeUserId',
  {},
  {},
);

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let auth0service: Auth0ExternalApiService;
  let auth0LoginService: Auth0LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserManagerModule],
      providers: [
        UsersService,
        {
          provide: Auth0ExternalApiService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(fakeExternalApiResponseDto),
            assignRole: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: Auth0LoginService,
          useValue: {
            authenticate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    auth0service = module.get<Auth0ExternalApiService>(Auth0ExternalApiService);
    auth0LoginService = module.get<Auth0LoginService>(Auth0LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        names: 'John',
        surnames: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        rol: Auth0RoleEnum.ADMIN.name,
        company_id: null,
        typeIdentificationId: 1,
        locationId: null,
        identification: '123456789',
        nameIdentification: 'Cédula de ciudadanía',
      };
      const userEntity: User = {
        id: 12341234,
        names: 'John',
        surnames: 'Doe',
        email: 'john.doe@example.com',
        authId: 'asdf',
        picture: 'http://fake-url-to-picture.png',
        rol: 'user',
        company_id: null,
        typeIdentificationId: 1,
        location: null,
        identification: '123456789',
        nameIdentification: 'Cédula de ciudadanía',
        phone: '123456789',
        experienceYears: 1,
        education: [],
        languages: [],
        skills: [],
        experiences: [],
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(repository, 'save').mockResolvedValue(userEntity);
      jest.spyOn(auth0service, 'createUser').mockResolvedValue(fakeExternalApiResponseDto);
      jest.spyOn(auth0service, 'assignRole').mockResolvedValue(null);

      const result = await service.createUser(createUserDto);
      expect(result.authId).toBe('fakeUserId');
    });
    it('should create throw Exception', async () => {
      const createUserDto: CreateUserDto = {
        names: 'John',
        surnames: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        rol: 'user',
        company_id: null,
        typeIdentificationId: 1,
        locationId: null,
        identification: '123456789',
        nameIdentification: 'Cédula de ciudadanía',
      };
      const userEntity: User = {
        id: 12341234,
        names: 'John',
        surnames: 'Doe',
        email: 'john.doe@example.com',
        authId: 'asdf',
        picture: 'http://fake-url-to-picture.png',
        rol: 'user',
        company_id: null,
        typeIdentificationId: 1,
        location: null,
        identification: '123456789',
        nameIdentification: 'Cédula de ciudadanía',
        phone: '123456789',
        experienceYears: 1,
        education: [],
        languages: [],
        skills: [],
        experiences: [],
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(userEntity);

      await expect(service.createUser(createUserDto)).rejects.toThrowError(UserAlreadyExistException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [];
      jest.spyOn(repository, 'find').mockResolvedValue(users);
      const result = await service.findAll();
      expect(result).toBe(users);
    });
  });
  describe('findAllBy', () => {
    it('should return an array of users matching the query', async () => {
      const query = { rol: 'admin' }; // Define un ejemplo de consulta
      const users: User[] = []; // Define un arreglo de usuarios que coinciden con la consulta
      jest.spyOn(repository, 'findBy').mockResolvedValue(users);

      const result = await service.findAllBy(query);
      expect(result).toBe(users);
    });
  });

  describe('findOneBy', () => {
    it('should return a user matching the query', async () => {
      const query = { email: 'john.doe@example.com' }; // Define un ejemplo de consulta
      const user: User = {
        id: 12341234,
        names: 'John',
        surnames: 'Doe',
        email: 'john.doe@example.com',
        authId: 'asdf',
        picture: 'http://fake-url-to-picture.png',
        rol: 'user',
        company_id: null,
        typeIdentificationId: 1,
        location: null,
        identification: '123456789',
        nameIdentification: 'Cédula de ciudadanía',
        phone: '123456789',
        experienceYears: 1,
        education: [],
        languages: [],
        skills: [],
        experiences: [],
      };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

      const result = await service.findOneBy(query);
      expect(result).toBe(user);
    });
  });

  describe('login', () => {
    it('should throw a UserLoginErrorException if token decoding fails', async () => {
      const loginDto: LoginDto = { email: 'john.doe@example.com', password: 'password123' };
      const userLogged = {
        token_type: 'Bearer',
        access_token: 'password123',
        expires_in: 86400,
      } as Auth0ResponseLoginDto; // Esto debe coincidir con el comportamiento del método Auth0LoginService
      const invalidToken: string = 'invalidToken'; // Simula un token JWT inválido que fallará en el decodificador
      jest.spyOn(auth0LoginService, 'authenticate').mockResolvedValue(userLogged);
      //jest.spyOn(jwt, 'sign').mockReturnValue(invalidToken);

      await expect(service.login(loginDto)).rejects.toThrowError(UserLoginErrorException);
    });

    it('should throw a UserLoginFailedException if login fails', async () => {
      const loginDto: LoginDto = { email: 'john.doe@example.com', password: 'password123' };
      jest.spyOn(auth0LoginService, 'authenticate').mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrowError(UserLoginFailedException);
    });

    it('should throw a UserLoginErrorException if user is not found in the local database', async () => {
      const loginDto: LoginDto = { email: 'john.doe@example.com', password: 'password123' };
      const userLogged = {
        token_type: 'Bearer',
        access_token: 'password123',
        expires_in: 86400,
      } as Auth0ResponseLoginDto; // Esto debe coincidir con el comportamiento del método Auth0LoginService
      jest.spyOn(auth0LoginService, 'authenticate').mockResolvedValue(userLogged);
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrowError(UserLoginErrorException);
    });
  });
});

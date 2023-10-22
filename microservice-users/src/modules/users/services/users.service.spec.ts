import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { Auth0ExternalApiService } from '../../../commons/modules/user-manager/services/auth0-external-api.service';
import { ExternalApiResponseDto, Identity } from '../../../commons/modules/user-manager/dto/external-api.dto';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserManagerModule } from '../../../commons/modules/user-manager/user-manager.module';

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserManagerModule],
      providers: [
        UsersService,
        Auth0ExternalApiService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    auth0service = module.get<Auth0ExternalApiService>(Auth0ExternalApiService);
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

      await expect(service.createUser(createUserDto)).rejects.toThrowError(NotFoundException);
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
});

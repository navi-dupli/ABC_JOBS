import { Test, TestingModule } from '@nestjs/testing';
import { Auth0ExternalApiService } from './auth0-external-api.service';
import { HttpModule } from '@nestjs/axios';
import { UserManagerModule } from '../user-manager.module';
import { Auth0RoleEnum } from '../enums/role.enum';
import { of, throwError } from 'rxjs';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ExternalApiResponseDto, Identity } from '../dto/external-api.dto';
import { Auth0UserDto } from '../dto/auth-user.dto';
import { AxiosError, AxiosResponse } from 'axios';
import { CreateUserDto } from '../../../../modules/users/dto/create-user.dto';
import { UserAlreadyExistException } from '../../../exceptions/user-already-exist.exception';

const fakeIdentity = new Identity('Username-Password-Authentication', 'fakeUserId', 'auth0', false);
const fakeExternalApiResponseDto: ExternalApiResponseDto = new ExternalApiResponseDto(
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
describe('Auth0ExternalApiService', () => {
  let service: Auth0ExternalApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, UserManagerModule],
      providers: [],
    }).compile();

    service = module.get<Auth0ExternalApiService>(Auth0ExternalApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user successfully', async () => {
    jest.spyOn(service['authenticationService'], 'getAccessToken').mockReturnValueOnce(of('fake-access-token'));

    const axiosResponse: AxiosResponse<ExternalApiResponseDto> = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: null,
      },
      data: fakeExternalApiResponseDto,
    };
    jest.spyOn(service['httpService'], 'post').mockReturnValueOnce(of(axiosResponse));

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
      phone: '123456789',
      dateBirthday: new Date(),
      address: 'Calle 123',
      experienceYears: 1,
    };
    const result = await service.createUser(Auth0UserDto.fromCreateUserDto(createUserDto));
    expect(result).toBeDefined();
  });

  it('should handle createUser error and throw NotFoundException', async () => {
    jest.spyOn(service['authenticationService'], 'getAccessToken').mockReturnValueOnce(of('fake-access-token'));
    jest.spyOn(service['httpService'], 'post').mockReturnValueOnce(
      throwError({
        response: {
          status: 409,
          data: { message: 'Conflict' },
        },
      }),
    );

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
      phone: '123456789',
      dateBirthday: new Date(),
      address: 'Calle 123',
      experienceYears: 1,
    };

    await expect(service.createUser(Auth0UserDto.fromCreateUserDto(createUserDto))).rejects.toThrowError(
      InternalServerErrorException,
    );
  });
  it('should handle createUser Axios error', async () => {
    jest.spyOn(service['authenticationService'], 'getAccessToken').mockReturnValueOnce(of('fake-access-token'));
    const axiosError = new AxiosError('Conflict', '409', null, null, {
      status: 409,
      data: { message: 'Conflict' },
    } as AxiosResponse);
    jest.spyOn(service['httpService'], 'post').mockReturnValueOnce(throwError(axiosError));

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
      dateBirthday: new Date(),
      phone: '123456789',
      address: 'Calle 123',
      experienceYears: 1,
    };

    await expect(service.createUser(Auth0UserDto.fromCreateUserDto(createUserDto))).rejects.toThrowError(
      UserAlreadyExistException,
    );
  });

  it('should assign role successfully', async () => {
    const axiosResponse: AxiosResponse<ExternalApiResponseDto> = {
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: null,
      },
      data: fakeExternalApiResponseDto,
    };
    jest.spyOn(service['authenticationService'], 'getAccessToken').mockReturnValueOnce(of('fake-access-token'));
    jest.spyOn(service['httpService'], 'post').mockReturnValueOnce(of(axiosResponse));

    const result = await service.assignRole('fake-user-id', Auth0RoleEnum.CANDIDATO);
    expect(result).toBeDefined();
  });

  it('should handle assignRole error and throw NotFoundException', async () => {
    jest.spyOn(service['authenticationService'], 'getAccessToken').mockReturnValueOnce(of('fake-access-token'));
    const axiosError = new AxiosError('Conflict', '409', null, null, {
      status: 409,
      data: { message: 'Conflict' },
    } as AxiosResponse);
    jest.spyOn(service['httpService'], 'post').mockReturnValueOnce(throwError(axiosError));

    await expect(service.assignRole('fake-user-id', Auth0RoleEnum.ADMIN)).rejects.toThrowError(NotFoundException);
  });
});
